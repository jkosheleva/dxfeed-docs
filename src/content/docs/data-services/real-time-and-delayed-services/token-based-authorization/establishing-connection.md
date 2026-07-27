---
title: "Establishing connection"
paligoInternal: true
paligoOriginId: "49550"
---

When the user requests data, establish a connection with dxFeed's endpoint. Use the following functions and specify the token received in the previous step.

## For Java API

Add auther-api.jar to the application’s classpath:

```
String address = "<endpoint address>:<host port>[login=entitle:" + token + "]";
```

Or (preferably) set the global variable and use a shorter connection string:

```
AutherLoginHandlerFactory.setAppToken(token);
address = "<IP address>:<host port>[login=entitle]";
```

## For C API

```
dxf_create_connection_auth_bearer()function
```

## For C# API

```
NativeConnection (string address, string token,  Action<IDxConnection> disconnectListener) constructor of NativeConnectionclass
```

## For JavaScript API (dxfeed.cometd.js library)

```
dx.feed.setAuthToken(token);
```

## For Python API

```
dxfeed.core.DXFeedPy.dxf_create_connection_auth_bearer()
```

The function creates connection to dxeed given URL address and token

| Parameters: | **address** (_str_) – dxFeed URL address<br/>**token** (_str_) – dxFeed token |
| --- | --- |
| Returns: | **cc** – Cython ConnectionClass with information about connection |
| Return type: | [class dxfeed.core.DXFeedPy.ConnectionClass](https://dxfeed.readthedocs.io/en/latest/api.html?highlight=token#dxfeed.core.DXFeedPy.ConnectionClass) |

For more information please read the [documentation](https://dxfeed.readthedocs.io/en/latest/api.html?highlight=token#dxfeed.core.DXFeedPy.dxf_create_connection_auth_bearer).

## For web service

### For Websocket (on ws-handshake)

```
{ ext: { "com.devexperts.auth.AuthToken": <token> }}
```

### For REST API

Specify the token in the HTTP-header:

```
Authorization: Bearer <token>
```

(Deprecated workaround) If a header cannot be set, use URL-parameter:

`<REST-method>.json?access_token=<token>`
