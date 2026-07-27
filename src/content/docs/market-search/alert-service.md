---
title: "Alert Service"
paligoOriginId: "944"
---

## Overview

The Alert Service is a tool which provides a possibility to be aware about critical changes in the value of the pre-defined indicator for a user-selected instrument.

## Use cases

| **Name** | **Main Scenario** |
| --- | --- |
| Alert activation | After a user sends the message to activate the alert: |
| Alert trigger and deactivation | 1. If the Alert Service identifies a successful trigger check, it sends a notification to the user via WS and deactivates the alert.<br/>2. If the trigger action is not executed, the Alert Service continues monitoring. |
| Alert deactivation by user request | After a user sends a message to deactivate the earlier activated alert, then the Alert Service: |

## Alert status transition

| **Validation name** | **Validation Failure Criterion** | **Event Code** | **Error Code** | **Error Description** |
| --- | --- | --- | --- | --- |
| Parsing a request | The user’s request can’t be parsed by the system: | - | PARSING_ISSUE | The request structure is not valid or the provided values have unexpected data type |
| Not valid client key | The received request has an invalid client key (it does not match any key in the DB) | - | AUTH_ISSUE | The provided client key is invalid |
| The client performs the action with an invalid dxFeed ID | The alert with the dxFeed ID in the client’s request either does not exist or was set up by a different client | - | AUTH_ISSUE | The client tries to perform an action with the alert that does not belong to this client |
| Alert is already deactivated | The alert has a status **deactivated** or **rejected** | VALIDATION_ALERT_WAS_DEACTIVATED_EARLIER | VALIDATION_FAILED | Alert was already deactivated before |
| Limit | The number of active alerts per the client including this new alert exceeds the allowed number of requests per the client | VALIDATION_EXCEED_LIMIT_NUMBER_ACTIVE_ALERTS | VALIDATION_FAILED | Too many active alerts |
| dxSymbol | dxSymbol provided in the alert is NOT available in the instrument list of the Alert Service | VALIDATION_INVALID_SYMBOL | VALIDATION_FAILED | Symbol is not valid |
| Predicate format | Predicate provided in the alert is NOT in the list: **>**, **<**, **>=**, **>=** | VALIDATION_INVALID_PREDICATE | VALIDATION_FAILED | Predicate is not valid |
| Datapoint validity | Datapoint provided in the alert is NOT in the list of supported data points | VALIDATION_INVALID_DATAPOINT | VALIDATION_FAILED | Datapoint is not valid |
| Expiration is in the past | Expiration date is less than the current date/time | VALIDATION_PAST_EXPIRATION_DATE | VALIDATION_FAILED | Expiration date is in the past |
| Alert expiration date | Number of days between activation and expiration dates of the alert exceeds 90 days | VALIDATION_EXCEED_LIMIT_EXPIRATION_DATE | VALIDATION_FAILED | Expiration time of the alert is expected in less than 90 days |

## Alert triggers

| **Trigger Name** | **Trigger category** | **Trigger Activation criterion** | **Event Code** | **Trigger Description** | Frequency |
| --- | --- | --- | --- | --- | --- |
| Financial check | Business | 1. The Alert Service checks every market event that occurs after the alert is activated and can change the value of the datapoint under alert.<br/>2. If the value of the datapoint matches the user-defined criterion, the alert is triggered. | TRIGGER_MARKET_EVENT | The user-defined alert is triggered | Every datapoint update for the symbol |
| Corporate Action check | Business | 1. The Alert Service checks corporate actions for the dxSymbol under alert.<br/>2. If a symbol change, spin-off, or instrument split occurs on the current day, the alert is triggered. | TRIGGER_CORPORATE_ACTION |  | At the end of the post-market (regular if the instrument is not traded in post-market) trading day for the instrument under alert |
| Option expiration | Business | If the current date equals to the expiration date of the instrument, then the alert is triggered | TRIGGER_OPTION_EXPIRED | The option under alert expired | At the end of the post-market (regular if the instrument is not traded in post-market) trading day for the instrument under alert |
| Alert expiration | Technical | At midnight UTC alert service checks: | TRIGGER_ALERT_EXPIRED | Alert is expired | Daily - midnight UTC |
| Symbol in reference data | Technical | If dxSymbol under alert is NOT available in the reference data, then alert is triggered | TRIGGER_SYMBOL_REMOVED | The instrument universe of the service does not include the symbol of the alert | Hourly |

## API notes

### Basic API entities

All dxFeed API responses are constructed based on 3 main structures:

- **alert**: the latest state of the alert in the dxFeed system including its static information

```json
{
    "status": "ACTIVATED",
    "lastEventTime": "string",
    "dxFeedId": "string",
    "externalId": "string",
    "dxSymbol": "string",
    "datapoint": "string",
    "predicate": ">",
    "value": "number",
    "expirationTime": "string",
    "creationTime": "string"
}
```

- **event**: the latest action that happened with the alert in the dxFeed system and the status of the alert after it happened

```json
{
    "eventCode": "string",
    "eventTime": "string",
    "eventValue": 1.2323,
    "alertStatus": "string"
}
```

- **error**: an error description when dxFeed system is not able to process a user’s request

```json
{
    "errorCode": "string",
    "errorDescription": "string",
    "alertValidation": {
        "dxFeedId": "string",
        "externalId": "string",
        "eventCode": "string"
    }
}
```

### Time attributes

All time attributes are expected:

- Either in UTC timezone according to [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) standard
- or UTC time in seconds

### Requests

| **Message Name** | **Request** | **Response (200 OK)** | Response (400 Bad Request) |
| --- | --- | --- | --- |
| Create alert | `POST v1/subscribers/{client key}/alerts`<br/>Expected values: | If an alert in the request passed validations, then the user receives alert information in dxFeed format: | If the Alert Service cannot parse an alert or the alert breaches validation, then the Service returns an error: |
| Deactivate alert | `DELETE v1/subscribers/{client key}/alerts/{dxfeedId}` | If the user’s request is processed by the system, then the latest alert status and alert static are sent: | If the user’s request breaches authentication validation, then the error is returned: |
| All alerts with some specific status | `GET v1/subscribers/{client key}/alerts?status={status}&beforeDxFeedID={beforeDxFeedID}&pageSize={limit}`<br/>The alerts are ordered by dxFeed ID in the descending order | If the client key is valid, then:<br/>If there are no active alerts set by this client, then an empty array is returned |  |
| Events related to some specific alert | `GET v1/subscribers/{client key}/alerts/{dxfeedId}/events`<br/>The events are ordered by event time in descending order | See the event response example below. |  |

#### Event response example

```json
{
  "events": [
    {
      "eventCode": "string",
      "eventTime": "string",
      "eventValue": 1.2323,
      "alertStatus": "string"
    }
  ]
}
```

### Notification messages (WS)

| **Message Name** | **Trigger Message** |
| --- | --- |
| Notification | WS endpoint: `v1/ws/subscribers/{client key}/alert-notifications`<br/>If a trigger is activated, then the Alert Service sends the details of the happened event and the alert static: |

### Error handling scenario for the client

This section presents the minimal set of expected failure handling scenarios which should be implemented by the systems involved in the alerting flow.

- In case the answer to the request is not coming in the reasonable amount of time, then the client is encouraged to send the request with the same ID again.
- The user should be able to handle messages with dxFeed ID that is unknown to the user. Such messages should be ignored by the client.
