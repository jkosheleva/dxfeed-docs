---
title: "REST"
paligoOriginId: "867"
---

## Overview

dxFeed REST API implements a REST (Representational State Transfer) service for the core dxFeed API. There is a simple web frontend that can generate requests to the service and is useful for exploring.

## Usage

Available method: GET/POST

The components of a request are:

| **Argument** | **Data type** | **Example** | **Required** | **Description** |
| --- | --- | --- | --- | --- |
| event | List | Quote,Profile | Required | The type of event (**Quote**, **Trade**, etc). It can be repeated to request multiple events |
| symbol | List | AAPL, GOOG, EUR/USD | Required | The symbol (`IBM`, `MSFT`, etc). It can be repeated to request multiple symbols |
| source | List | NTV, DEX | Optional | See the full [source list](/data-model/market-events/qd-model-of-market-events/) for indexed events. The source can be repeated to request multiple sources. Defaults to DEFAULT |
| fromTime | Datetime | 2018-12-31 | Optional | Start time: the time from which to return events. It is required for time series events. It supports full [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format (e.g., YYYMMDD-HHMMSSZ), or shorter versions of it |
| toTime | Datetime | 20190101 | Optional | End time: the time to which to return events. It is optional for time series events. It supports full [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format (e.g., YYYMMDD-HHMMSSZ), or shorter versions of it |
| indent | None | - | Optional | When true, the result is indented for better readability |
| timeout | Integer | 15 | Optional | The maximum time to wait for events from the data sources. Defaults to 3s |
| format | - | - | Required | The response format, either json or xml |

Please try [demo](https://tools.dxfeed.com/webservice/rest-demo.jsp)

## Candle symbols

**Candle** and **DailyCandle** event types are candle events. They are used with a specially formatted candle symbol.

Sample candle symbols are: `IBM{=d}`,`MSFT{=15m}`,`GOOG{=133t,tho=true}`

The general format of a candle symbol is:

```
<baseSymbol>[&<exchange>]{=[<period>]<type>[,a=s][,price=<priceType>][,tho=true]}
```

The components of candle symbols are:

- `BaseSymbol` - the market symbol (`IBM`,`MSFT`, etc.).
- `Exchange` - the exchange code. Optional. By default, candle is composed from trades/quotes from all exchanges.
- `Period` - the number of aggregation periods of a specified type in each candle. It defaults to 1.
- `Type` - the type of a candle. Supported values are:
  
  
  
  - s - second
  - m - minute
  - h - hour
  - d - day
  - w - week
  - mo - month
  - o - standard option expiration (3rd Friday of the month)
  - y - year
  - v - volume
  - p - price
- `a=s` - changes candle alignment to session.
- `priceType` - the type of the price that is used to build candles. Supported values are:
  
  
  
  - last - last trade price
  - bid - quote bid price
  - ask - quote ask price
  - mark - market price defined as average between quote bid and ask prices
  - s - settlement price
- `tho=true` - requests that candle data should be limited to regular trading session only (and extended session should be ignored).

:::note
By default, candles are aligned to midnight.
:::

The REST service understands candle symbol attributes in any order, default values can be explicitly specified if needed. However, in the resulting JSON or XML document that is returned by the service, eventSymbol property is normalized. This makes a behavior of the web service different from the behavior of dxFeed JavaScript API. The later returns the same event object as this REST API in JSON format, but it always returns symbols in the same string representation as originally requested in the subscription.

**Example**

- Web:

```
https://tools.dxfeed.com/webservice/rest/events.json?events=Trade,Quote&symbols=AAPL,MSFT&fromTime=20190114&toTime=201901014&timeout=60&indent
```

- Bash:

```bash
curl -X POST \
 -u user:password \
 -H 'Accept: application/json' \
 -d "events=Trade,Quote" \
 -d "symbols=AAPL,MSFT" \
 -d "fromTime=2019-01-14" \
 -d "toTime=2019-01-14" \
 -d "indent=" \
 -d "timeout=60" \
 'https://tools.dxfeed.com/webservice/rest/events'
```

**Reply**

```json
{
  "status" : "OK",
  "Quote" : {
    "MSFT" : {
      "eventSymbol" : "MSFT",
      "eventTime" : 0,
      "timeNanoPart" : 0,
      "bidTime" : 1547600358000,
      "bidExchangeCode" : "Q",
      "bidPrice" : 105.0,
      "bidSize" : 1,
      "askTime" : 1547600390000,
      "askExchangeCode" : "Q",
      "askPrice" : 105.25,
      "askSize" : 2,
      "sequence" : 0
    },
    "AAPL" : {
      "eventSymbol" : "AAPL",
      "eventTime" : 0,
      "timeNanoPart" : 0,
      "bidTime" : 1547600393000,
      "bidExchangeCode" : "P",
      "bidPrice" : 153.07,
      "bidSize" : 5,
      "askTime" : 1547600393000,
      "askExchangeCode" : "K",
      "askPrice" : 153.1,
      "askSize" : 37,
      "sequence" : 0
    }
  },
  "Trade" : {
    "MSFT" : {
      "eventSymbol" : "MSFT",
      "eventTime" : 0,
      "timeNanoPart" : 0,
      "exchangeCode" : "Q",
      "price" : 105.01,
      "size" : 2784410,
      "dayVolume" : 31587616,
      "dayTurnover" : 3.3009832E9,
      "sequence" : 0,
      "tickDirection" : "ZERO_UP",
      "extendedTradingHours" : false,
      "time" : 1547586000000
    },
    "AAPL" : {
      "eventSymbol" : "AAPL",
      "eventTime" : 0,
      "timeNanoPart" : 0,
      "exchangeCode" : "Q",
      "price" : 153.07,
      "size" : 1566896,
      "dayVolume" : 28710324,
      "dayTurnover" : 4.3742342E9,
      "sequence" : 0,
      "tickDirection" : "ZERO_UP",
      "extendedTradingHours" : false,
      "time" : 1547586000000
    }
  }
}
```

## Limitations

The limitations of REST API usage

| Metric | Limit |
| --- | --- |
| WebSockets established per minute | 10 |
| HTTP stream subscriptions established per minute | 10 |
| Simultaneous connections | 10 |
| WebSockets/HTTP streams opened simultaneously | 10 |
| Subscription changes per minute(addSubscription) | 100 |
| REST data requests per minute(events.json) | 100 |
| Total number of HTTP requests per minute | 100 |
| B2C usage of B2B service | not allowed |
| Maximum POST request length | 200000 bytes |

:::note
dxFeed may not receive requests if you exceed these limits. You may submit a ticket to the [Help Desk](https://jira.in.devexperts.com/servicedesk/customer/portal/1) as we can provide you with dedicated infrastructure as an additional service per your request.
:::
