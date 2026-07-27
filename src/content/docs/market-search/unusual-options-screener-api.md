---
title: "Unusual Options Screener API"
paligoOriginId: "45639"
---

## Overview

dxFeed Unusual Options Screener is a streaming WebSocket-based SaaS API allowing to filter out unusual option **Trade** events-based on user-defined criteria. An application using this API shall execute the following flow:

1. Connect to the appropriate WebSocket endpoint.
2. Subscribe to the required unusual options feed.

## Subscription request

dxFeed Unusual Options Screener subscribes a user to the OPRA feed options **Trade**, **Summary**, and **TimeAndSale** events, merged with CTA/UTP trades. One can subscribe to the unusual options feed of interest, sending a JSON formed message containing following fields:

- **Filters** (optional), where several predefined filters could be specified
- And/or **script** (optional)
- **Symbols** (mandatory), use specific symbols to filter options by certain underlying(s), or `*` for the whole option universe

While optional, either filters or script need to be specified. Scripts are expressions of **out = function** form, where function shall be a boolean function written with [dxScript](/market-search/dxscript/#dxscript). When several **filters** and/or **script** are specified, a merged event is returned if either of them holds true for the event.

## Merged feed fields

When used in the script expressions, merged event fields shall be referenced as **mergedOption.field**. Currently, dxFeed Unusual Options Screener supports the following fields:

| Response payload | Script expression | Description |
| --- | --- | --- |
| us | underlyingSymbol | Symbol of the option underlying |
| up | underlyingPrice | Price of the option underlying at the time of option trade |
| ua | underlyingAskPrice | Best underlying ask price at the time of option trade |
| ub | underlyingBidPrice | Best underlying bid price at the time of option trade |
| uas | underlyingAskSize | Best underlying ask size at the time of the option trade |
| ubs | underlyingBidSize | Best underlying bid size at the time of the option trade |
| s | symbol | Option symbol |
| clp | callPut | Is option call or put, `C` or `P` |
| e | expiration | Option expiration date (day number since 1 January 1970) |
| st | strike | Option strike |
| p | price | Option price |
| sz | size | Option size |
| bp | bidPrice | Option bid |
| ap | askPrice | Option ask |
| sc | saleConditions | Option [TimeAndSale Sale Condition](/data-model/market-events/timeandsale-sale-conditions/#timeandsale-sale-conditions) |
| v | volume | Option trade volume |
| oi | openInterest | Option open interest |
| t | n/a | Option trade timestamp |

## Auxiliary functions

Additionally, to generic dxScript capabilities, dxFeed Unusual Options Screener supports the following functions in the script expression:

- nowDayId() - returns current day number since 1 January 1970
- eventDay() - day number of the original event since 1 January 1970

## Example subscription request

```json
{
  "filters": [
    "dxLarge",
    "dxSpeculative"
  ],
  "script": "out = mergedOption.strike > 50",
  "symbols": [
    "AMZN",
    "TSLA"
  ]
}
```

## Sample response

```json
{
 "us": "BTCUSDT:CXBINA",
 "up": 49904.56704003,
 "s": ".BTC321090321C50000:CXBINA",
 "clp": "C",
 "e": 20210903,
 "st": 50000,
 "p": 633.43,
 "sz": 0.003,
 "bp": 633.43,
 "ap": 744.93,
 "dv": 1.183,
 "oi": 0,
 "t" : 1633342593694
}
```

## Predefined filters

dxFeed Unusual Options Screener supports the following predefined filters:

| Name | Description | Script |
| --- | --- | --- |
| dxOutliers | dxFeed AI-powered proprietary filter | n/a |
| dxLarge | Large option trades | "script": "out = mergedOption.price*mergedOption.size > 10000" |
| dxSpeculative | Speculative trades | "script": "out = mergedOption.price < 0.5 && (mergedOption.expiration - nowDayId() < 14) && mergedOption.size > 50" |

## Ping/Pong

WebSocket specification introduces ping/pong functionality, which is supported by the dxFeed Unusual Options Screener. [Read more](https://datatracker.ietf.org/doc/html/rfc6455#section-5.5.2)
