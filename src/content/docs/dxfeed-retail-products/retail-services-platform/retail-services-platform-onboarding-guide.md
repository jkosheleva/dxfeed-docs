---
title: "Retail Services Platform Onboarding Guide"
paligoOriginId: "58339"
---

## Overview

This guide is designed to be used by our partners and provides step-by-step instructions to help them efficiently integrate our service. The outlined process ensures a smooth and successful implementation process.

## Getting started

Our system consists of two independent services:

- dxFeed Retail Services responsible for subscription management, entitlement control, and reporting.
- dxFeed endpoint providing data feeds.

The scheme below briefly describes the overall process of delivering market data to end users via your application.

![Retail_Services_Platform.png](/images/uuid-ca89edb2-20a0-e03f-8296-38849dfef025.png)

The cooperation process takes three steps:

- Integration: we prepare a trial connection and provide you with technical details
- Testing: you check the whole scenario in a set-up demo environment
- Production release

Follow the instructions below to proceed with the service implementation process.

:::note
Compliance and User Responsibilities

Please be aware that dxFeed Retail is dedicated to maintaining strict compliance with the requirements set by market exchanges and regulatory authorities. As part of this commitment, we reserve the right to take necessary measures in response to violations of agreements or requests from market exchanges.

Please take note that, in certain situations, we may be required to respond to requests from market exchanges for information or actions related to user activities. Our response to such instances includes implementing the following measures:

1. Blocking a violating user that results in
  
  
  
  1. terminating active subscriptions
  2. disallowing new purchases
  3. preventing making changes to personal data
  4. restricting certain API requests associated with activating subscriptions and regenerating account credentials.
2. Validating users against the blacklist records.
3. Verifying information provided by non-professional users to ensure their honest self-identification.
:::

## Integration and Testing

### Integration

During the integration stage, we prepare a trial connection on the `staging.services.get.dxfeed.com` environment and provide you with technical details.

#### Prerequisites

To make the integration process smoother, we ask you to:

1. Answer the [Questionnaire](https://downloads.dxfeed.com/kb/get_dxFeed_Questionnaire.docx)
2. If desired, a partner sends us a bitmap logo of their platform for light and dark modes so that we are able to brand the personal data form for a user. It's optional
3. Let us know if you need to enable callbacks and mail us a URL address to send the callback to. On our side, three events invoke callbacks:
  
  
  
  1. Subscription activation — a subscription has been activated for a user as soon as they provide all the required information, including personal data. The callback includes account ID and the subscription names together with their end dates
  2. Credentials generation — if your application generates credentials (see the [Questionnaire](https://downloads.dxfeed.com/kb/get_dxFeed_Questionnaire.docx)), we forward the credentials to a user via email. We also send you a callback whenever a new account generates credentials. The callback includes the account ID, login, and password
  3. Subscriber status setting — a user has defined a status in the onboarding wizard form. The callback includes the account ID and subscriber status (pro or non-pro)

If you have chosen to enable any callback(s), you should email us the required callback(s) and attach a valid URL address. You may also send us a bitmap logo to brand the onboarding wizard form.

Learn more about the [Retail Services Callbacks](/dxfeed-retail-products/retail-services-platform/retail-services-platform-callbacks/#retail-services-platform-callbacks)

#### Trial data endpoints

We open a trial data server for you depending on the type of products you have ordered, like real-time data, historical candle data, etc.

| Product | Data Server |
| --- | --- |
| Real-time data feed trial server | rt14.ec2.dxfeed.com:7502 |
| Historical candle data/TimeAndSale server | [https://rosso.dxfeed.com/candledata](https://rosso.dxfeed.com/candledata) |
| [Instrument Profile Format](/data-model/reference-data/instrument-profile-format/#instrument-profile-format) (IPF) trial server | [https://rosso.dxfeed.com/ipf](https://rosso.dxfeed.com/ipf) |

#### APIs

For safety reasons, get.dxFeed generates a unique alphanumeric string, or API key. This key is used for authorization and sent in the authorization header for requests in our collections.

We will email you a trial API key with all necessary request parameters once the staging environment is ready.

To help us prepare the staging environment, we ask you to fill in the [Questionnaire](https://downloads.dxfeed.com/kb/get_dxFeed_Questionnaire.docx) and email us other [relevant information](#prerequisites).

##### Subscription management API

You can find the subscription and account management collection of API requests on the [get.dxfeed Services API](/dxfeed-retail-products/retail-services-platform/retail-services-platform-api/#retail-services-platform-api) page.

Use your trial API key from the email for the authorization header and send requests to the `staging.services.get.dxfeed.com` server.

**Trial authorization and token generation**

The application should request a token from the get.dxFeed portal every time a user logs in to the system.

Send one of the [access token-related requests](/dxfeed-retail-products/retail-services-platform/retail-services-platform-api/access-token-related-methods/) from the API collection to get an access token.

#### Data request at dxFeed

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

1. Provide us with test access to your platform to verify compliance with exchange requirements. This also allows our support team to address user support requests
2. Confirm whether you want us to open access to the back office where you can manage accounts and subscriptions to the demanded feeds via user interface

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
- Real market data endpoints

## Additional functionality

### Back Office

If your business needs a more personalized approach to client services and manual subscription management, dxFeed can offer you the Back Office.

Our Back Office provides a user-friendly interface and functionality for managers and administrators. It can even replace subscription management API methods.

It is specially adjusted for your needs and allows you to create user accounts, view account details, and manage subscriptions.
