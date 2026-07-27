---
title: "Account-related methods"
paligoResourceId: "37654"
---

## Create account

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
https://<server>/api/v1/accounts
```

#### Request body with all parameters

```json
{
     "email": "bob.smith@example.com",
     "metadata": {
        "firstName": "Bob",
        "lastName": "Smith",
        "country": null,
        "state": null,
        "address": null,
        "city": null,
        "zip": null,
        "phone": null,
        "companyName": null,
        "jobTitle": null
    },
        "allowedStatuses": "ALL"
}
```

#### Empty request body

```json
{
    "metadata": {}
}
```

| Parameter | Required | Type | Description | Example |
| --- | --- | --- | --- | --- |
| email | No | String | End user's email address. Please note the email address is saved in lower case. The email parameter is optional. If sent in the request, it will be associated with the created account and displayed in the onboarding wizard and on the personal profile page. If not provided, the user will have to enter and confirm their email when filling their personal data form either in the onboarding wizard or the personal profile page | bob.smith@example.com |
| metadata | Yes | Array | An array of user's personal data that can be further specified in the onboarding wizard. The given parameters are optional. If sent in the request, their values will be automatically substituted into the onboarding wizard form and on the personal profile page. If not, a user will have to enter required values or choose them from the drop-down list |  |
| firstName | No | String | User's first name | Bob |
| lastName | No | String | User's last name | Smith |
| country | No | String | The country where the user is registered. It is advisable that the entered value matches the value from the [List of countries](https://downloads.dxfeed.com/specifications/get.dxfeed_Services_API_List_of_Countries.pdf) | United States of America |
| state | No | String | The state/province where the user from the USA/Canada is registered. It is advisable that the entered value matches the value from the [List of states and provinces](https://downloads.dxfeed.com/specifications/get.dxfeed_Services_API_List_of_the_US_States_and_Canadian_Provinces.pdf) | New York |
| address | No | String | User's address without the country, state, city, and zip/postal code | 620 Eighth Avenue, 1 |
| city | No | String | The city where the user is registered | New York City |
| zip | No | String | The zip or postal code where the user is registered | 10018 |
| phone | No | String | The user's phone number | +1-212-424-72-71 |
| companyName | No | String | Full legal name of the company the user works for or their own (no abbreviations are permitted). Note that the `companyName` corresponds to the **Official Employer Name** in the personal data form on the onboarding wizard page and in the personal profile. | New York Times |
| jobTitle | No | String | The user's job title | Journalist |
| allowedStatuses | No | String | Parameter that defines subscriber status restrictions for a user's account. It may have three values: If a user has to confirm their status via a questionnaire first, they will see the error after answering the questions. If no parameter is sent in the request, there are no restrictions: users can specify themselves as **Professional** or **Non-professional**. | ALL |

### Response

#### Successful response

```json
{
  "accountId": <string>
}
```

where `<accountId>` is a unique account identifier, that should be used in the next request.

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
| 422 Unprocessable Entity | ACCOUNT_ALREADY_EXISTS | Account `<email>` already exists | Use [Get account by email](/dxfeed-retail-products/retail-services-platform/retail-services-platform-api/account-related-methods/#get-account-by-email) |
| 400 Bad Request | BAD_REQUEST | Valid email should be specified | Check the provided email address |

:::note
Our response to violations of agreements or requests from market exchanges includes validating users against the blacklist records:

- New users are validated when they make an attempt to complete a purchase.
- Existing users are validated when they make changes to their personal date.

As part of the blacklist validation, a user may be blocked by the data from the request:

- All pending orders will be disabled. All active subscriptions will be terminated.
- New credentials will not be generated.
- User will not be able to modify personal data on their personal profile page.
:::

## Get account by ID

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
https://<server>/api/v1/accounts/<accountId>
```

### Response

#### Successful response

```json
{
    "id": <string>,
    "email": <string>,
    "status": <string>,
    "subscriberStatus": <string>,
    "dataAccessStatus": <string>
}
```

| Parameter | Description |
| --- | --- |
| id | Alphanumerical account identifier |
| email | User's email |
| status | Current state of a user account which can take two possible values: |
| subsciberStatus | User's professional position that affects a list of feeds available for subscription and feed prices: |
| dataAccessStatus | Current state of a user account's access to data via active subscriptions: |

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
| 404 Not Found | ACCOUNT_NOT_FOUND | Account `<accountID>` not found | Try to find account by email (see [Get account by email](/dxfeed-retail-products/retail-services-platform/retail-services-platform-api/account-related-methods/#get-account-by-email)) or сreate a new user account (see [Create new account](/dxfeed-retail-products/retail-services-platform/retail-services-platform-api/account-related-methods/#create-account)) |

## Get account by email

### Request

#### Headers

```
Authorization: Bearer <API_KEY>
Content-Type: application/json
```

where <API_KEY> is a dedicated API Key for the application.

#### Type

GET

#### URL

```
https://<server>/api/v1/accounts/by-email/<email>
```

where `<email>` is the email address of the end user.

### Response

#### Successful response

If the account is found in the system, its ID is returned in the response.

```json
{
    "id": <string>,
    "email": <string>,
    "status": <string>,
    "subscriberStatus": <string>,
    "dataAccessStatus": <string>
}
```

| Parameter | Description |
| --- | --- |
| id | Alphanumerical account identifier |
| email | User's email |
| status | Current state of a user account which can take two possible values: |
| subsciberStatus | User's professional position that affects a list of feeds available for subscription and feed prices: |
| dataAccessStatus | Current state of a user account's access to data via active subscriptions: |

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
| 404 Not Found | ACCOUNT_NOT_FOUND | Account `<email hidden>` not found | Create a new user account (see [Create new account](/dxfeed-retail-products/retail-services-platform/retail-services-platform-api/account-related-methods/#create-account)) |
| 400 Bad Request | BAD_REQUEST | Valid email should be specified | Check the provided email address |

## Reset account password

### Request

#### Header

```
Authorization: Bearer <API_KEY>
```

where `<API_KEY>` is a dedicated API Key for the application.

#### Type

POST

#### URL

```
https://<server>/api/v1/accounts/<accountId>/reset-password
```

where `<accountID>` is the account identifier of the end user in get.dxfeed.

### Responses

#### Successful response

If the password is regenerated successfully (or not generated because the user has neither login nor password yet), you will receive 200 OK HTTP status in the response.

The new password will be sent by email or through the callback invoker depending on the application configuration settings.

:::note
Please note the password will be reset only if it has already been generated for the user, i.e. credentials generation is enabled for the application and at least one subscription was activated for the user.
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
| 404 Not Found | ACCOUNT_NOT_FOUND | Account `<accountID>` not found | Try to find account by email (see [Get account by email](/dxfeed-retail-products/retail-services-platform/retail-services-platform-api/account-related-methods/#get-account-by-email)) or сreate a new user account (see [Create new account](/dxfeed-retail-products/retail-services-platform/retail-services-platform-api/account-related-methods/#create-account)) |
| 422 Unprocessable Entity | CREDENTIALS_GENERATION_DISABLED | Credentials generation disabled | Check whether the credentials generation is enabled for your application |
| 422 Unprocessable Entity | ACCOUNT_IS_BLOCKED | Account `<accountID>` has been blocked | Account has been restricted due to a violation of our service or exchange policies |

## Change email

### Request

#### Header

```
Authorization: Bearer <API_KEY>
```

where `<API_KEY>` is a dedicated API Key for the application.

#### Type

POST

#### URL

```
https://<server>/api/v1/accounts/<accountId>/change-email
```

where `<accountID>` is the account identifier of the end user in get.dxfeed.

#### Request body

```json
{
    "email": "new.bob.smith@example.com"
}
```

| Parameter | Required? | Type | Description | Example |
| --- | --- | --- | --- | --- |
| email | Yes | String | New, previously not specified end user's email address. Please note the email address is saved in lower case | new.bob.smith@example.com |

### Responses

#### Successful response

If the email is changed successfully, you will receive 200 OK HTTP status in the response.

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
| 400 Bad Request | BAD_REQUEST | Email should be specified | Check that you specified an email address |
| Valid email should be specified | Check that you specified an email address in the following format: **local-part@domain** |  |  |
| 422 Unprocessable Entity | CREDENTIALS_GENERATION_DISABLED | Credentials generation disabled | Try to find the account by ID (see the [Get account by ID](/dxfeed-retail-products/retail-services-platform/retail-services-platform-api/account-related-methods/#get-account-by-id) section) to check which email associates with it and make sure that a new email doesn't match the one specified earlier |
