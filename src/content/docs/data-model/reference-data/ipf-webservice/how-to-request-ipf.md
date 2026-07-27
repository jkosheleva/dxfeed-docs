---
title: "How to Request IPF"
paligoOriginId: "915"
---

## How to request IPF

To request [IPF](https://tools.dxfeed.com/ipf):

1. Go to [IPF web service](https://tools.dxfeed.com/ipf?help).
2. Enter your password and login.
3. Use parameters to make a request.
4. Check that the last line text in the output is "##COMPLETE". Otherwise, you receive an incomplete file.

:::note
Use demo/demo credentials to check [the list of available parameters](https://tools.dxfeed.com/ipf?help).
:::

## Wildcards

Text format supports wildcards like ***** - multiple characters and **?** - one character. For example:

```bash
curl -X GET \
-u user:password \
'https://tools.dxfeed.com/ipf?SYMBOL=?TOP10*&DESCRIPTION=*NASDAQ*'
```

This request returns all Top10 indices for Nasdaq.

```
#INDEX::=TYPE,SYMBOL,DESCRIPTION,COUNTRY,OPOL,CURRENCY,TRADING_HOURS
INDEX,$TOP10L/Q,NASDAQ Top 10 losers by absolute net change,US,dxFeed,USD,dxFeedUS(0=09301610)
INDEX,$TOP10PG/Q,NASDAQ Top 10 gainers by relative net change,US,dxFeed,USD,dxFeedUS(0=09301610)
INDEX,$TOP10PL/Q,NASDAQ Top 10 losers by relative net change,US,dxFeed,USD,dxFeedUS(0=09301610)
INDEX,$TOP10G/Q,NASDAQ Top 10 gainers by absolute net change,US,dxFeed,USD,dxFeedUS(0=09301610)
INDEX,$TOP10V/Q,NASDAQ Top 10 gainers by volume,US,dxFeed,USD,dxFeedUS(0=09301610) ==COMPLETE
```

## Request Examples

### Stock

Supported methods: `GET`

#### Web

[Request example](https://tools.dxfeed.com/ipf?TYPE=FUTURE&PRODUCT=/ES:XCME&fields=DESCRIPTION,CURRENCY,MULTIPLIER)

#### Bash

```bash
curl -X GET -u user:password 'https://tools.dxfeed.com/ipf?TYPE=STOCK&SYMBOL=GOOG&fields=SYMBOL,DESCRIPTION,CURRENCY'
```

#### Reply

```
#STOCK::=TYPE,SYMBOL,DESCRIPTION,CURRENCY
STOCK,GOOG,Alphabet Inc. - Class C Capital Stock,USD
```

### Futures

#### Web

[Request example](http://tools.dxfeed.com/ipf?TYPE=FUTURE&SYMBOL=/YGM??:IFUS&fields=DESCRIPTION,CURRENCY,MULTIPLIER,PRODUCT,LAST_TRADE)

#### Bash

```bash
curl -X GET \
-u user:password \
'https://tools.dxfeed.com/ipf?TYPE=FUTURE&SYMBOL=/YGM??:IFUS&fields=DESCRIPTION,CURRENCY,MULTIPLIER,PRODUCT,LAST_TRADE'
```

#### Response

```
#FUTURE::=TYPE,SYMBOL,DESCRIPTION,CURRENCY,MULTIPLIER,PRODUCT,LAST_TRADE
FUTURE,/ESZ25:XCME,"E-mini S&P 500 Futures, Dec-25",USD,50,/ES:XCME,2025-12-19
FUTURE,/ESU22:XCME,"E-mini S&P 500 Futures, Sep-22",USD,50,/ES:XCME,2022-09-16
FUTURE,/ESZ22:XCME,"E-mini S&P 500 Futures, Dec-22",USD,50,/ES:XCME,2022-12-16
FUTURE,/ESM22:XCME,"E-mini S&P 500 Futures, Jun-22",USD,50,/ES:XCME,2022-06-17
FUTURE,/ESH24:XCME,"E-mini S&P 500 Futures, Mar-24",USD,50,/ES:XCME,2024-03-15
FUTURE,/ESZ24:XCME,"E-mini S&P 500 Futures, Dec-24",USD,50,/ES:XCME,2024-12-20
FUTURE,/ESM24:XCME,"E-mini S&P 500 Futures, Jun-24",USD,50,/ES:XCME,2024-06-21
FUTURE,/ESZ26:XCME,"E-mini S&P 500 Futures, Dec-26",USD,50,/ES:XCME,2026-12-18
FUTURE,/ESU23:XCME,"E-mini S&P 500 Futures, Sep-23",USD,50,/ES:XCME,2023-09-15
FUTURE,/ESH23:XCME,"E-mini S&P 500 Futures, Mar-23",USD,50,/ES:XCME,2023-03-17
FUTURE,/ESZ23:XCME,"E-mini S&P 500 Futures, Dec-23",USD,50,/ES:XCME,2023-12-15
FUTURE,/ESM23:XCME,"E-mini S&P 500 Futures, Jun-23",USD,50,/ES:XCME,2023-06-16
##COMPLETE
```
