---
title: "Retail Services Platform Callbacks"
paligoOriginId: "61201"
---

## Overview

This page is intended for informing Retail Services platform partners about callbacks that we can enable upon their request.

A callback is a function that allows informing a partner when a certain event happens. It is individually set up for an application and is triggered for an account in the following cases:

1. Subscription(s) is activated.
2. Credentials are generated.
3. Subscriber status is set.
4. Subscription expires in a certain period.
5. Subscription has been terminated.
6. Support engineer transitions an account to pro.
7. Support engineer suspends data access for a user account.

Callbacks are optional, we enable them upon your request on [the integration stage](/dxfeed-retail-products/retail-services-platform/retail-services-platform-onboarding-guide/#retail-services-platform-onboarding-guide).

## Callback specifications

A POST request is sent to the URL specified for each partner with the following parameters:

- `Content-Type: application/json` header
- Optional partner-specific headers in the `<Custom-Header-Name>: <value>` format
- A request body defined for each callback below

### Subscription activation

1. A partner sends the **Activate subscription** request, and the requested subscriptions are successfully activated for an account.
2. The callback sends the account identifier and the activated subscriptions with their expiration timestamps.

```json
{
  "accountId": "<AccountId>",
  "subscriptions": [
    {
      "feedName": "<FeedName1>",
      "endDate": "<timestamp>"
    },
    {
      "feedName": "<FeedNameN>",
      "endDate": "<timestamp>"
    }
  ]
}
```

### Generation of credentials

:::note
This callback is available for applications with credentials generation enabled.
:::

1. The first subscription is activated for an account.
2. Credentials are generated for the account.
3. The callback sends the account identifier, login, and password.

```json
{
  "accountId": "<AccountId>",
  "login": "<GeneratedLogin>",
  "password": "<GeneratedPassword>"
}
```

### Setting subscriber status

1. A user defines their subscriber status as Non-Professional or Professional on the personal data form and submits it.
2. The system associates the selected status with the user account.
3. The callback sends the account identifier and subscriber status.

```json
{
  "accountId": "<AccountId>",
  "subscriberStatus": "<SubscriberStatus>"
}
```

### Subscription expiration

1. A subscription is activated for an account.
2. One of the following actions occurs:

   - A test account is deleted and subscription cancellation is requested.
   - The list of feeds is updated in the **Feed** group.
   - A feed group is deleted.
   - A subscription is canceled via API or the back office.
   - An account is blocked automatically after blacklist validation.
   - An account is blocked by a support engineer in the admin panel.
   - An account is transitioned from non-pro to pro by a support engineer in the admin panel.

3. The callback sends the account identifier and active subscriptions with their expiration timestamps.

```json
{
  "accountId": "<AccountId>",
  "subscriptions": [
    {
      "feedName": "<FeedName1>",
      "endDate": "<timestamp>"
    },
    {
      "feedName": "<FeedNameN>",
      "endDate": "<timestamp>"
    }
  ]
}
```

### Subscription termination

1. A subscription is activated for an account.
2. One of the following actions occurs:

   - The account is blocked by a support engineer in the admin panel.
   - The account is blocked automatically after blacklist validation.
   - The account is transitioned from non-pro to pro by a support engineer in the admin panel.

3. The callback sends the account identifier and terminated subscriptions with their expiration timestamps.

```json
{
  "accountId": "<AccountId>",
  "subscriptions": [
    {
      "feedName": "<FeedName1>",
      "endDate": "<timestamp>"
    },
    {
      "feedName": "<FeedNameN>",
      "endDate": "<timestamp>"
    }
  ]
}
```

### Transitioning a non-professional user to professional

1. A user is set as non-professional.
2. A support engineer transitions the user to professional.
3. The callback sends the account identifier and subscriber status.

```json
{
  "accountId": "<AccountId>",
  "subscriberStatus": "<SubscriberStatus>"
}
```

### Data access suspension

1. A support engineer suspends data access for a user account.
2. The callback sends the account identifier.

```json
{
  "accountId": "<AccountId>"
}
```

## Responses

| Expected response | Other responses |
| --- | --- |
| 200 OK | If a partner's application is not available or an internal error occurs, the responses with the following statuses may be expected.<br/>In such a case, the system resends the request 4 additional times at 10-second intervals until receiving 200 OK response is received or the request limit is reached. |
