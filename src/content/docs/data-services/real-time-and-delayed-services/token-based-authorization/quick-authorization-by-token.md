---
title: "Quick Authorization by Token"
paligoOriginId: "918"
---

## Introduction

This is a short description of token-based authorization. For more detailed information, see the [full description](/data-services/real-time-and-delayed-services/token-based-authorization/#token-based-authorization).

## Token creation

To create a token:

1. Get the secret from dxFeed team.
2. Get Auther API from dxFeed.
3. Use the following code for Java implementation:

```
returnSignedToken.newBuilder()
.setIssuer(issuer)
.setSubject(sessionType)
.setMessage(user)
.setIssuedNow()
.setExpirationFromNow(Duration.ofDays(1))
.toToken().signToken(secret);
```

Where:

- issuer - principal that issued this token
- sessionType - session that you want to provide to your customer
- user - user ID or `<userID>,<filter_1>;…;<filter_n>` if feeds are specified for your connection by dxFeed support team (e.g.,`testuser,opra;cme`)
- secret - the key used for signature validation

For other implementations see [full description](/data-services/real-time-and-delayed-services/token-based-authorization/#token-based-authorization).

## Authorization

To authorize by token:

1. Create a token.
2. Add a token to API request:

**C API**

```
dxf_create_connection_auth_bearer()function
```

**Java API**

```
String address = "endpoint address[login=entitle:" + token + "]";Or (preferably) set global variable and use shorter connection stringAutherLoginHandlerFactory.setAppToken(token);address = "127.0.0.1:7501[login=entitle]";
```

**C# API**

```
NativeConnection (string address, string token,  Action<IDxConnection> disconnectListener) constructor of NativeConnectionclass
```

**Web API**

```
dx.feed.setAuthToken(token);
```
