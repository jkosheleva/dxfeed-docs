---
title: "Tracking-related methods"
paligoResourceId: "37658"
---

## Trial tracking

### Request

#### Headers

```
Authorization: Bearer <API_KEY>
Content-Type: application/json
```

where `<API_KEY>` is a dedicated API Key for the application.

#### Type

POST

#### URL

```
https://<server>/api/v1/track
```

#### Request body

The request body should contain a JSON object with available data concerning the user.

```json
{
     "macAddress": <string>,
     "email": <string>,
     "firstName": <string>,
     "lastName": <string>,
     "phone": <string>
}
```

:::note
All the parameters are optional, but the object itself is required.
:::

##### Examples

1. MAC address is the only available parameter:
1. The only provided information is the email address:
1. The email address along with user first and last names:
1. MAC address, email address, user name, and phone number are provided:
1. No additional information is provided:

### Response

As the result, you should receive a response with HTTP code 200, which indicates that the trial has been successfully saved in the get.dxfeed database.
