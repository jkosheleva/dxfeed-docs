---
title: "Retail eShop Onboarding Guide"
paligoOriginId: "59478"
---

## Overview

This guide is designed to be used by our partners and provides step-by-step instructions to help them efficiently integrate our service. The outlined process ensures a smooth and successful implementation process.

## Getting started

Our system is represented as two independent services:

1. Subscription platform (dxFeed Retail) responsible for subscription management, entitlement control, and reporting.
2. dxFeed endpoint providing data feeds.

The scheme below briefly describes the overall process of using our service to deliver market data to end users via your application.

![Retail_eShop_Onboarding_Guide.png](/images/uuid-2382e5bf-f9a7-d94c-26df-0a9b27e22a51.png)

The cooperation process takes three steps:

1. Integration: we prepare a trial connection and provide you with technical details
2. Testing: you check the whole scenario in a set-up demo environment
3. Production: release on [get.dxfeed.com](http://get.dxfeed.com)

Follow the instructions below to proceed with the service implementation process.

### Compliance and User Responsibilities

:::note
Be aware that dxFeed Retail is dedicated to maintaining strict compliance with the requirements set by market exchanges and regulatory authorities. As part of this commitment, we reserve the right to take necessary measures in response to violations of agreements or requests from market exchanges.
:::

Take note that, in certain situations, we may be required to respond to requests from market exchanges for information or actions related to user activities. Our response to such instances includes implementing the following measures:

1. Blocking a violating user that results inBlocking a violating user that results in
  
  
  
  1. terminating active subscriptions
  2. disallowing new purchases
  3. preventing making changes to personal data
  4. adding a record to the blacklist to prevent a user from creating a new account with the same personal data on the platform
2. Validating users against the blacklist records:
  
  
  
  1. new users are validated when they make an attempt to complete a purchase
  2. existing users are validated when they make changes to their personal data
3. Verifying information provided by non-professional users to ensure their honest self-identification.

## Integration and Testing

### Integration

During the integration stage, we prepare a trial connection on the `devzone.get.dxfeed.com` environment and provide you with technical details.

#### Trial data endpoints

We open a trial data server for you depending on the type of products you have ordered, like real-time data, historical candle data, etc.

| Product | Data Server |
| --- | --- |
| Real-time data feed trial server | rt14.ec2.dxfeed.com:7502 |
| Historical candle data/TimeAndSale server | [https://rosso.dxfeed.com/candledata](https://rosso.dxfeed.com/candledata) |
| [Instrument Profile Format](/data-model/reference-data/instrument-profile-format/#instrument-profile-format) (IPF) trial server | [https://rosso.dxfeed.com/ipf](https://rosso.dxfeed.com/ipf) |

#### APIs

##### Trial authorization and token generation

The application should request a token from the get.dxFeed portal every time a user logs in to the system.

The token is obtained by sending the following HTTP request:

`https://devzone.get.dxfeed.com/api/v1/token`

For safety reasons, get.dxFeed generates a unique alphanumeric string, or API key. This key is used for authorization and sent in the authorization header.

You can find your trial API key and request parameters in the email with this instruction.

###### Headers

```
Authorization: Bearer <ApiKey>
Content-Type: application/json
```

###### Request Body

Request parameters:

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| login | String | Yes | User’s login to get access to market data |
| password | String | Yes | User’s password to get access to market data |
| withDetails | Boolean | No | Defines whether information on users’ subscriptions is to be returned in the response (=true) or not (=false). Default value is **false** |

**Request with no details**

```json
{
    "login": "<login>",
    "password": "<password>",
    "withDetails": false
}
```

Response in case of success:

```
{
    “status”: “OK”,
    “reason”: null,
    “token”: “<JWT token>”
}
```

Response in case of failure:

```
{
    “status”: “ERROR”,
    “reason”: “<error_reason>”,
    “token”: null
}
```

**Request with details**

```json
{
    "login": "<login>",
    "password": "<password>",
    "withDetails": true
}
```

Response in case of success:

```json
{
    “status”: “OK”,
    “reason”: null,
    “token”: “<JWT token>”
    "details": [
        "<market_data_feed_1>",
        ...,
        "<market_data_feed_N>"
    ]
}
```

Response in case of failure:

```json
{
    “status”: “ERROR”,
    “reason”: “<error_reason>”,
    “token”: null,
    "details": []
}
```

#### Error codes

| Status | Reason | HTTP status | Description |
| --- | --- | --- | --- |
| OK | null | 200 | Token has been successfully generated |
| ERROR | AUTHENTICATION_FAILED | 401 | Authentication has failed due to wrong API key |
| ERROR | INVALID_CREDENTIALS | 200 | These credentials have not been granted to any account for this application |
| ERROR | NO_ACTIVE_SUBSCRIPTIONS | 200 | No active subscriptions belong to specified credentials |

##### Data request at dxFeed

After you receive a token, it is possible to establish a connection with the dxFeed endpoint where a user requests data.

Choose an API function based on your needs: Java, C, C#, JavaScript, WebSocket, or REST.

**Java**

Add `auther-api.jar` to the application’s classpath:

`String address = <IP address>:<host port>[login=entitle:" + token + "];`

Or set a global variable and use a shorter connection string:

```
AutherLoginHandlerFactory.setAppToken(token);
address = "<IP address>:<host port>[login=entitle]";
```

**C**

`dxf_create_connection_auth_bearer()` function.

**C#**

**NativeConnection** (string address, string token, `Action<DxConnection> disconnectListener`) constructor of [com.dxfeed.native.NativeConnection](https://docs.dxfeed.com/net-api/classcom_1_1dxfeed_1_1native_1_1NativeConnection.html#a9436ce25080af2487222685080963eeb) class.

**JavaScript (dxfeed.cometd.js library) API request**

```
dx.feed.setAuthToken(<token>);
```

**WebSocket (on ws-handshake) API request**

```
{ ext: { "com.devexperts.auth.AuthToken": <token> }}
```

**REST API request**

Specify token in the HTTP-header:

`Authorization: Bearer <token>`

The full collection of APIs is available on the [dxFeed Java API](https://dxfeed.com/api/java-api/) page.

## Testing

This is the stage where we check and test the whole E2E scenario. Follow the instructions below:

1. Provide us with access to your application to check the functionality and verify compliance with exchange requirements
2. Provide us with a license so that our support team can address users’ requests
3. Send us your logo in **.svg** and **.png** formats: we need it to place your application on the [get.dxfeed.com](https://get.dxfeed.com/) website

Finally, we send you a link to a preset demo environment.

:::note
Please send us the required information on access and license with your logo in .svg and .png formats.
:::

Please send us the official consent upon the use of your logo and trademark by Devexperts Inc. We will use them for marketing, PR, and advertising purposes, or place them on our sites ([get.dxfeed.com](http://get.dxfeed.com), [dxfeed.com](http://dxfeed.com), etc.). Please fill in the gaps with the date, company name, and representative name and title in the statement below and send it to us. If you have any technical/visual rules about how to place your logo/trademark, feel free to share them with us.

As of `<the date of this email>` I, `<name>`, being the `<title>` of `<company name>`, hereby give consent for the use of `<company name>` logo and trademark by Devexperts Inc. for its marketing, PR, and advertising purposes, including placing on the company’s sites ([get.dxfeed.com](http://get.dxfeed.com), [dxfeed.com](http://dxfeed.com), etc.).

### Compliance with regulatory requirements

:::note
Algo-trading, real-time data streaming, and real-time data export are strongly prohibited.

If your platform provides such functionality, it has to be deactivated when establishing a connection to dxFeed.
:::

#### Branding

Note that due to existing regulatory requirements, you need to add the dxFeed logo to your application/platform to the following places:

- The login window
- The About/Help section
- The bottom of every window that shows dxFeed market data

The logo must be shown when the connection is established. Please see possible ways of placing the logo in the examples below.

Check the [dxFeed logo](https://dxfeed.com/press-kit/).

dxFeed logo in the login window:

![image__2_.png](/images/uuid-da934342-ed98-cbc0-b212-a59e29e47b4e.png)

dxFeed logo in the About section:

![image__1_.png](/images/uuid-cda22d2a-537c-2951-8f90-ea4d23e49e94.png)

dxFeed logo at the bottom of the page with dxFeed market data:

![AppEx1.png](/images/uuid-7140dd74-003f-7594-ae50-488d64b2d911.png)

## Production

Production is the last stage of the process.

After you have tested our functionality and had all technical issues resolved, we grant you access to the production environment and provide you with:

- An API key for the production environment
- URLs for token generation on the production environment
- Real market data endpoints
