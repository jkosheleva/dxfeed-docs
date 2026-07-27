---
title: "Profile-related methods"
paligoResourceId: "37657"
---

## Get profile page

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
https://<server>/api/v1/accounts/<account_id>/profile-link
```

### Responses

#### Successful response

```json
{
    "profilePageByTheme": {
        "LIGHT": "<URL>",
        "DARK": "<URL>"
    },
    "expiresAt": <date_time_string>
 }
```

| Parameter | Type | Description |
| --- | --- | --- |
| profilePageByTheme | Object | Map of profile pages where key corresponds to the theme name and value is the URL of the link |
| expiresAt | String | Date and time defining when the links expire |

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
| 401 Unauthorized | AUTHENTICATION_FAILED | Authentication has failed due to wrong API key | Check the provided API key |
| 404 Not Found | ACCOUNT_NOT_FOUND | Account `<accountID>` not found. | Try to find account by email (see [Get account by email](/dxfeed-retail-products/retail-services-platform/retail-services-platform-api/account-related-methods/#get-account-by-email)) or сreate a new user account (see [Create new account](/dxfeed-retail-products/retail-services-platform/retail-services-platform-api/account-related-methods/#create-account)) |

:::note
For further details about the personal profile page accessed through a link obtained via this request, please follow [the link](/dxfeed-retail-products/retail-services-platform/retail-services-platform-personal-profile/).
:::
