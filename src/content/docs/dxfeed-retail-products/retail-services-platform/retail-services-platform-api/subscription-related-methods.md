---
title: "Subscription-related methods"
paligoResourceId: "37655"
---

## Activate subscription v1

:::note
If it is defined in the application settings for at least one subscription in an order that it should be activated by an additional request both on the tenant and feed setting levels, the subscription activation consists of two steps: subscription activation on the user side and order confirmation on the application side. To confirm a subscription, it is necessary to get a confirmation id by sending the request for activation.
:::

### Request

#### Headers

```
Authorization: Bearer <API_KEY>
Content-Type: application/json
```

where `<API_KEY>` is a dedicated API Key for the application.

#### Type

POST

#### URL

```
https://<server>/api/v1/accounts/<accountId>/subscriptions
```

where `<accountID>` is the account identifier of the end user in get.dxfeed.

#### Request body

```json
{
    "subscriptions": [
        "<feedName1>",
        ...
        "<feedNameN>"
    ],
    "successRedirectUrl": "<redirectURL>"}
```

| Parameter | Required? | Type | Description | Example |
| --- | --- | --- | --- | --- |
| subscriptions | Yes | Array of strings | A list of subscriptions that should be activated | CMEGROUP |
| successRedirectUrl | No | String | A custom URL to redirect the end user after submitting the personal data form. The URL specified in the application settings is used by default | https://example.com |

### Response

#### Successful response

If an end user has not provided personal data and signed assignments before, and the subscription confirmation is required for a feed(s) according to the application settings, the response will be the following:

```json
{
    "signupPageByTheme": {
        "LIGHT": "<link_light_theme>",
        "DARK": "<link_dark_theme>"
    },
    "confirmationId": "<confirmationId>"
}
```

:::note
The response will not have a `null` confirmation identifier if the confirmation rule is enabled for at least one of the subscriptions used in the request.
:::

One of these two links should be sent to an end user who will be required to provide personal information and sign agreements. The confirmation id is to be further used in the Confirm subscription request.

:::note
Please note that the confirmation id and links are interrelated and if you send a second request, both id and links are updated. If you are intended to use an updated id for sending a request for confirmation, provide a user with an updated link.
:::

Once the user submits the form and the order is confirmed if necessary (in any order):

1. The subscription(s) is(are) activated with an end date in accordance with rules defined for the application in configuration settings.
1. An email with access credentials is automatically sent to the user's email address if it is defined in configuration settings.

:::note
If it is not required to confirm an order according to the feed(s) settings, the response will be the following:
:::

```json
{
    "signupPageByTheme": {
        "LIGHT": "<link_light_theme>",
        "DARK": "<link_dark_theme>"
    },
    "confirmationId": null
}
```

:::note
If a user has already provided all the required personal data and signed the required agreements, but the subscription(s) has(ve) not been confirmed, the following response will be returned:
:::

```json
{
    "signupPageByTheme": null,
    "confirmationId": "<confirmationId>"
}
```

:::note
If a user has already provided all the required personal data and signed the required agreements, and the subscription has been confirmed, the following response will be returned and the subscription(s) will be automatically activated:
:::

```json
{
    "signupPageByTheme": null,
    "confirmationId": null
}
```

#### Failure response

```json
{
    "dateTime": <date_time_string>,
    "errorCode": <integer>,
    "reason": <string>,
    "message": <string>
}
```

Supported failure cases are presented in the following table.

| HTTP status | Reason | Message | Follow-up actions |
| --- | --- | --- | --- |
| 401 Unauthorized | AUTHENTICATION FAILED | Authentication has failed due to wrong API key | Check the provided API key |
| 404 Not Found | ACCOUNT_NOT_FOUND | Account `<accountID>` not found. | Check the account ID by email (see [Get account by email](/dxfeed-retail-products/retail-services-platform/retail-services-platform-api/account-related-methods/#get-account-by-email)) or create a new user account (see [Create account](/dxfeed-retail-products/retail-services-platform/retail-services-platform-api/account-related-methods/#create-account)) |
| 409 Conflict | SUBSCRIPTION_ALREADY_ACTIVE | Subscription `<feedName>` already active | Check the status of specified subscriptions for the account using [Get subscriptions](/dxfeed-retail-products/retail-services-platform/retail-services-platform-api/subscription-related-methods/#get-subscriptions) |
| SINGLE_USE_FEED_ACTIVATED_BEFORE | Single-use subscription has been already activated | Check the list of user's expired subscriptions: single-use subscriptions can be activated for a user once in a lifetime |  |
| 400 Bad Request | BAD_REQUEST | Requested feeds `<feedNamete>` are not available for the tenant `<tenantID>` | Ensure that the subscription(s) are spelled correctly in the request |
| Subscriptions should be specified | Check that you have specified subscription(s) in the request body |  |  |
| Requested feeds can't be activated: Two or more feeds have different subscriber status restrictions | Contact the support team to verify your tenant settings |  |  |
| Requested feeds can't be activated: There is a conflict between account subscriber status and tenant subscriber status restrictions | Contact the support team to verify your tenant settings and set professional status restrictions |  |  |
| Requested feeds can't be activated: There is a conflict between account subscriber status and subscriber status restrictions of one or more feeds | Contact the support team to verify your tenant settings |  |  |
| Requested feeds can't be activated: Account subscriber status doesn't align with the tenant subscriber status restrictions | Contact the support team to verify your tenant settings |  |  |
| Requested feeds can't be activated: Account subscriber status doesn't align with subscriber status restrictions of one or more feeds | Contact the support team to verify your tenant settings or professional status restrictions of the feeds from the order |  |  |
| 422 Unprocessable Entity | ACCOUNT_IS_BLOCKED | Account `<accountID>` has been blocked | Account has been restricted due to a violation of our service or exchange policies |

## Activate subscription v2

Activate subscription v2 allows users to specify **endDate** for subscriptions.

### Request

:::note
If it is defined in the application settings for at least one subscription in an order that it should be activated by an additional request both on the tenant and feed setting levels, the subscription activation consists of two steps: subscription activation from the user side and subscription confirmation from the application side. To confirm a subscription, it is necessary to get a confirmation id by sending the request for activation.
:::

#### Headers

```
Authorization: Bearer <API_KEY>
Content-Type: application/json
```

where `<API_KEY>` is a dedicated API Key for the application.

#### Type

POST

#### URL

```
https://<server>/api/v2/accounts/<accountId>/subscriptions
```

where `<accountID>` is the account identifier of the end user in get.dxfeed.

#### Request body

```json
{
    "subscriptions": [
        {
            "feedName": "<FEED_NAME>",
            "endDate": "<END_DATE>"
        }
    ],
    "successRedirectUrl": "<redirectURL>"
}
```

| Parameter | Required? | Type | Description | Example |
| --- | --- | --- | --- | --- |
| subscriptions | Yes | Array | A list of subscriptions that should be activated |  |
| feedName | Yes | String | The subscription name | CME |
| endDate | No | Date time string | The subscription expiration date and time in the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) format. If it is not specified, the subscription end date depends on the default deactivation date specified for the partner's application: End date value should exceed the activation date | 2021-12-22T23:59:59Z 2021-12-22T04:01:28+00:00 |
| successRedirectUrl | No | String | A custom URL to redirect the end user after submitting the personal data form. The URL specified in the application settings is used by default | https://example.com |

### Response

#### Successful response

If an end user has not provided personal data and signed assignments before, and the subscription confirmation is required for a feed(s) according to the application settings, the response will be the following:

```json
{
   "signupPageByTheme": {
     "LIGHT": "<link_light_theme>",
     "DARK": "<link_dark_theme>"
   },
    "confirmationId": "<confirmationId>"
}
```

:::note
The response will not have a `null` confirmation identifier if the confirmation rule is enabled for at least one of the subscriptions used in the request.
:::

One of these two links should be sent to an end user who will be required to provide personal information and sign agreements.

The confirmation id is to be further used in the Confirm subscription request.

:::note
Please note that the confirmation id and links are interrelated and if you send a second request, both id and links are updated. If you are intended to use an updated id for sending a request for confirmation, provide a user with an updated link.
:::

Once the user submits the form and the order is confirmed if necessary (in any order):

1. The subscription(s) is(are) activated immediately.
1. An email with access credentials is automatically sent to the user's email address if it is defined in the configuration settings.

:::note
If it is not required to confirm any subscription according to the application settings, the response will be the following:
:::

```json
{
    "signupPageByTheme": {
        "LIGHT": "<link_light_theme>",
        "DARK": "<link_dark_theme>"
    },
    "confirmationId": null
}
```

:::note
If a user has already provided all the required personal data and signed the required agreements, but the subscription(s) has(ve) not been confirmed, the following response will be returned:
:::

```json
{
    "signupPageByTheme": null,
    "confirmationId": "<confirmationId>"
}
```

:::note
If a user has already provided all the required personal data and signed the required agreements earlier, the following response will be returned and the subscription(s) will be automatically activated.
:::

```json
{
    "signupPageByTheme": null,
    "confirmationId": null
}
```

### Failure response

```json
{
    "dateTime": <date_time_string>,
    "errorCode": <integer>,
    "reason": <string>,
    "message": <string>
}
```

Supported failure cases are presented in the following table.

| HTTP status | Reason | Message | Follow-up actions |
| --- | --- | --- | --- |
| 401 Unauthorized | AUTHENTICATION FAILED | Authentication has failed due to wrong API key | Check the provided API key |
| 404 Not Found | ACCOUNT_NOT_FOUND | Account `<accountID>` not found. | Check the account ID by email (see [Get account by email](/dxfeed-retail-products/retail-services-platform/retail-services-platform-api/account-related-methods/#get-account-by-email)) or create a new user account (see Create account) |
| 409 Conflict | SUBSCRIPTION_ALREADY_ACTIVE | Subscription `<feedName>` already active | Сheck the status of specified subscriptions for the account using Get subscriptions |
| SINGLE_USE_FEED_ACTIVATED_BEFORE | Single-use subscription has been already activated | Сheck the list of user's expired subscriptions: single-use subscriptions can be activated for a user once in a lifetime |  |
| 400 Bad Request | BAD_REQUEST | Subscriptions should be specified | Сheck that you have included `<Subscriptions>` parameter in the request body |
| feedName should be specified | Check that you haven't left a `<feedName>` parameter empty |  |  |
| End date should be set in the future | Set the `<endDate>` value in the future: it should exceed the current date and time |  |  |
| Invalid value for endDate provided | Set the `<endDate>` value by the following format: YYYY-MM-DDThh:mm:ssZ for UTC or YYYY-MM-DDThh:mm:ss±hh:mm |  |  |
| Requested feeds `<feedName>` are not available for the tenant `<tenantID>` | Ensure that the subscription(s) are spelled correctly in the request |  |  |
| 422 Unprocessable Entity | ACCOUNT_IS_BLOCKED | Account`<endDate>` has been blocked | Account has been restricted due to a violation of our service or exchange policies |

## Confirm subscription

:::note
Confirm subscription's URL is v1 or v2 in accordance with the Activate subscription version.
:::

If the application settings define that at least one subscription in an order should be activated by an additional request both on the app and feed setting levels, the order cannot be closed before the following request confirms it.

### Request

#### Headers

```
Authorization: Bearer <API_KEY>
```

where `<API_KEY>` is a dedicated API Key for the application.

#### Type

POST

#### URL

```
https://<server>/api/v1/accounts/<accountId>/subscriptions/confirm
```

where `<accountID>` is the account identifier of the end user in get.dxfeed.

#### Request body

```json
{
    "confirmationId": "<confirmationId>"
}
```

### Responses

#### Successful response

If the subscription is confirmed successfully, you will receive 200 OK HTTP status in the response.

#### Failure response

```json
{
    "dateTime": "<current_timestamp>",
    "errorCode": <integer>,
    "reason": <string>,
    "message": <string>
}
```

Supported failure cases are presented in the following table:

|  |  |  |  |
| --- | --- | --- | --- |
| **HTTP Status** | **Reason** | **Message** | **Follow-up actions** |
| 400 Bad Request | BAD_REQUEST | Confirmation ID must be specified. | Please provide the confirmation id in the request body. |
| 401 Unauthorized | AUTHENTICATION FAILED | Authentication has failed due to wrong API key. | Please check the provided API key. |
| 401 Unauthorized | AUTHENTICATION FAILED | No Authorization header. | Please provide the API key. |
| 404 Not Found | ORDER_NOT_FOUND | Order not found or expired. | Please check the correctness of the provided confirmation id. |
| 404 Not Found | ACCOUNT_NOT_FOUND | Account `<account_id>` not found. | Please check the correctness of the provided account id. |
| 422 Unprocessable Entity | ACCOUNT_IS_BLOCKED | Account `<accountID>` has been blocked | Account has been restricted due to a violation of our service or exchange policies |

## Cancel subscription

### Request

#### Headers

```
Authorization: Bearer <API_KEY>
Content-Type: application/json
```

where `<API_KEY>` is a dedicated API Key for the application.

#### Type

POST

#### URL

```
https://<server>/api/v1/accounts/<accountId>/subscriptions/cancel
```

#### Request body

Specify subscription names to cancel for the user:

```json
{
    "subscriptions": [
        "<feedName1>",
        ...
        "<feedNameN>"
     ]
}
```

### Responses

#### Successful response

If the subscription is canceled successfully, you will receive 200 OK HTTP status in the response.

:::note
Please note the subscriptions will be canceled in accordance with the rule defined for the application in the configuration file.
:::

#### Failure response

```json
{
    "dateTime": <date_time_string>,
    "errorCode": <integer>,
    "reason": <string>,
    "message": <string>
}
```

Supported failure cases are presented in the following table.

| HTTP status | Reason | Message | Follow-up actions |
| --- | --- | --- | --- |
| 401 Unauthorized | AUTHENTICATION FAILED | Authentication has failed due to wrong API key | Check the provided API key |
| 404 Not Found | ACCOUNT_NOT_FOUND | Account `<accountID>` not found. | Check the account ID by email (see [Get account by email](/dxfeed-retail-products/retail-services-platform/retail-services-platform-api/account-related-methods/#get-account-by-email)) or create a new user account (see [Create account](/dxfeed-retail-products/retail-services-platform/retail-services-platform-api/account-related-methods/#create-account)) |
| 404 Not Found | SUBSCRIPTION_NOT_FOUND | Subscription `<feedName>` not found | Check the specified subscriptions in the request and check which subscriptions are active for the account using [Get subscriptions](/dxfeed-retail-products/retail-services-platform/retail-services-platform-api/subscription-related-methods/#get-subscriptions) |
| 409 Conflict | SUBSCRIPTION_IS_EXPIRED | Subscription `<feedName>` already expired | Check the specified subscriptions in the request and they are active for the account using [Get subscriptions](/dxfeed-retail-products/retail-services-platform/retail-services-platform-api/subscription-related-methods/#get-subscriptions) |

## Extend subscription

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
https://<server>/api/v1/accounts/<accountId>/subscriptions/extend
```

where `<accountID>` is the account identifier.

#### Request body

Specify names of active subscriptions to be extended:

```json
{
    "subscriptions": [
        "<feedName1>",
        ...
        "<feedNameN>"
     ]
}
```

### Responses

#### Successful response

If the subscription is extended successfully, you will receive 200 OK HTTP status in the response.

#### Failure response

```json
{
    "dateTime": <date_time_string>,
    "errorCode": <integer>,
    "reason": <string>,
    "message": <string>
}
```

Supported failure cases are presented in the following table.

| HTTP status | Reason | Message | Follow-up actions |
| --- | --- | --- | --- |
| 401 Unauthorized | AUTHENTICATION FAILED | Authentication has failed due to wrong API key. | Check the provided API key |
| 409 Conflict | SUBSCRIPTION_ALREADY_EXTENDED | Subscription `<feedName>` has been already extended. | Check the subscription deactivation date. Note that a subscription can be extended by one period during the current period. The period of extension depends on the default deactivation date set for the application or a feed |
| 422 Unprocessable Entity | SUBSCRIPTION_SETTINGS_ARE_INVALID | Subscription `<feedName>` has invalid settings. | Ensure that the default deactivation date set for the application or a feed is different from "Infinite". Note that subscription to a single-use feed cannot be extended |
| 404 Not Found | ACCOUNT_NOT_FOUND | Account `<accountID>` not found | Check the provided account ID using [Get account by email](/dxfeed-retail-products/retail-services-platform/retail-services-platform-api/account-related-methods/#get-account-by-email) |

## Get subscriptions

This method allows you to retrieve all the subscriptions associated with a certain account.

### Request

#### Headers

```
Authorization: Bearer <API_KEY>
Content-Type: application/json
```

#### Type

GET

#### URL

```
https://<server>/api/v1/accounts/<accountId>/subscriptions
```

where `<accountID>` is the account identifier.

### Responses

#### Successful response

If there are subscriptions associated with the account, they will be returned in the response.

```json
{
    "subscriptions": [
        {
            "name": <string>,
            "status": "EXPIRED" | "ACTIVE",
            "expiresAt": <date_time_string> | null
        }
    ]
}
```

If there is neither an active nor inactive subscription for the account, the empty list is returned.

```json
{
    "subscriptions": []
}
```

#### Failure response

```json
{
    "dateTime": <date_time_string>,
    "errorCode": <integer>,
    "reason": <string>,
    "message": <string>
}
```

Supported failure cases are presented in the following table.

| HTTP status | Reason | Message | Follow-up actions |
| --- | --- | --- | --- |
| 401 Unauthorized | AUTHENTICATION FAILED | Authentication has failed due to wrong API key | Check the provided API key |
| 404 Not Found | ACCOUNT_NOT_FOUND | Account `<accountID>` not found. | Check the provided account ID using [Get account by email](/dxfeed-retail-products/retail-services-platform/retail-services-platform-api/account-related-methods/#get-account-by-email) |
