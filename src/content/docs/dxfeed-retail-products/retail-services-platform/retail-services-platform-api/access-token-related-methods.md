---
title: "Access token-related methods"
paligoResourceId: "37656"
---

## Request token by account ID

### Request

#### Headers

```
Authorization: Bearer <API_KEY>
Content-Type: application/json
```

#### Type

POST

#### URL

```
https://<server>/api/v1/token
```

#### Request body

##### Example of not requesting details

```json
{
    "accountId": <string>
}
```

##### Example of requesting details

```json
{
    "accountId": <string>,
    "withDetails": true | false
}
```

| Parameter | Type | Required? | Description |
| --- | --- | --- | --- |
| accountId | String | Yes | A user's account identifier |
| withDetails | Boolean | No | Defines whether information on what is enabled for the user on dxFeed is to be returned in the response (=true) or not (=false). **false** is used by default |

### Responses

#### Successful response

```json
{
     "status": "OK",
     "reason": null,
     "token": "<token>"
 }
```

##### Response in case of requested details

```json
{
     "status": "OK",
     "reason": null,
     "token":  "<token>",
     "details": [
         "<QD_filter_1>",
         ...
         "<QD_filter_N>"
     ]
 }
```

| Parameter | Type | Description | Example |
| --- | --- | --- | --- |
| status | String | The response status; `OK` or `ERROR` | OK |
| reason | String | The error reason. `null` is used for a successful response | null |
| token | String | The key required for authorization in dxFeed to obtain market data. `null` is used for an error response | Z2V0LmR4ZmVlZCxvcHRpbXVzLW5vbnBybywsMTYxNzMwMTU0MywxNjE3MjYzMTU1LE9wd GltdXNGbG93fDEzNyxvZkNNRWZvZA.qXIi81l9daBGu9xMGkhxAOiytU24UeWwLRJHRc4jkoT |
| details | Array of strings | A list of QD filters enabled on the dxFeed side for the user | [CMEGROUP, CME] |

#### Failure response

```json
{
    "status": "ERROR",
    "reason": "<error_reason>",
    "token": null
}
```

##### In case of requested details

```json
{
    "status": "ERROR",
    "reason": "<error_reason>",
    "token": null,
    "details": []
}
```

##### In case of failure due to BAD_REQUEST

```json
{
    "status": "ERROR",
    "reason": "<error_reason>",
    "token": null
}
```

Supported failure cases are presented in the following table.

| HTTP status | Reason | Description |
| --- | --- | --- |
| 401 Unauthorized | AUTHENTICATION_FAILED | Authentication has failed due to wrong apiKey |
| 400 Bad Request | BAD_REQUEST | AccountId is `null` or empty or the outdated format `<tenantId>\|<accountId>` is used incorrectly |
| 200 OK | ACCOUNT_NOT_FOUND | The specified account does not exist |
| 200 OK | NO_ACTIVE_SUBSCRIPTIONS | There are no active subscriptions associated with the specified accountId |
| 200 OK | DATA_ACCESS_SUSPENDED | Data access is suspended for the account: no data is returned via active subscriptions |

## Request token by credentials

### Request

#### Headers

```
Authorization: Bearer <API_KEY>
Content-Type: application/json
```

#### Type

POST

#### URL

```
https://<server>.get.dxfeed.com/api/v1/token
```

#### Request body

##### Example of not requesting details

```json
{
    "login": "<login>",
    "password": "<password>"
}
```

##### Example of requesting details

```json
{
    "login": "<login>",
    "password": "<password>",
    "withDetails": false
}
```

| Parameter | Type | Required? | Description |
| --- | --- | --- | --- |
| login | String | Yes | A user's login used for access to market data |
| password | String | Yes | A user's password used for access to market data |
| withDetails | Boolean | No | Defines whether information on what is enabled for the user on dxFeed is to be returned in the response (=true) or not (=false). **false** is used by default |

### Responses

#### Successful response

```json
{
     "status": "OK",
     "reason": null,
     "token": "<token>"
 }
```

##### In case of requested details:

```json
{
     "status": "OK",
     "reason": null,
     "token":  "<token>",
     "details": [
         "<QD_filter_1>",
         ...
         "<QD_filter_N>"
     ]
 }
```

| Parameter | Type | Description | Example |
| --- | --- | --- | --- |
| status | String | The response status: `OK` or `ERROR` | OK |
| reason | String | The error reason. `null` is used for a successful response | null |
| token | String | The key required for authorization in dxFeed to obtain market data. `null` is used for an error response | Z2V0LmR4ZmVlZCxvcHRpbXVzLW5vbnBybywsMTYxNzMwMTU0MywxNjE3MjYzMTU1LE9wd GltdXNGbG93fDEzNyxvZkNNRWZvZA.qXIi81l9daBGu9xMGkhxAOiytU24UeWwLRJHRc4jkoT |
| details | Array of strings | A list of QD filters enabled on the dxFeed side for the user | [CMEGROUP, CME] |

#### Failure response

```json
{
    "status": "ERROR",
    "reason": "<error_reason>",
    "token": null
}
```

##### In case of requested details

```json
{
    "status": "ERROR",
    "reason": "<error_reason>",
    "token": null,
    "details": []
}
```

##### In case of failure due to BAD_REQUEST

```json
{
    "status": "ERROR",
    "reason": "<error_reason>",
    "token": null
}
```

Supported failure cases are presented in the following table.

| HTTP status | Reason | Description |
| --- | --- | --- |
| 401 Unauthorized | AUTHENTICATION_FAILED | Authentication has failed due to wrong apiKey |
| 400 Bad Request | BAD_REQUEST | Login and/or password are null or empty |
| 200 OK | INVALID_CREDENTIALS | These credentials have not been granted to any account for this application |
| 200 OK | NO_ACTIVE_SUBSCRIPTIONS | There are no active subscriptions associated with the specified credentials |
| 200 OK | DATA_ACCESS_SUSPENDED | Data access is suspended for the account: no data is returned via active subscriptions |
