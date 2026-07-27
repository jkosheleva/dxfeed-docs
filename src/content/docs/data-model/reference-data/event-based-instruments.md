---
title: "Event-Based Instruments"
paligoOriginId: "139731"
---

## Overview

dxFeed supports the following event-based instrument types:

- EBMARKET — tradable instrument representing a binary outcome within an event. EBMARKET instruments publish real-time market data and may contain prices, volume, and settlement-related fields. Examples include yes/no markets such as “_Will candidate X win?”_.
- EBEVENT — reference instrument representing a real-world event such as a sports event, political event, or economic indicator. Examples include _“US Presidential Election 2028” or “US CPI Release for March 2026”_. An EBEVENT groups one or more EBMARKET instruments representing different outcomes of the same event. Reference data only; does not publish real-time market data.
- EBSERIES — reference instrument representing a general definition of recurring events that share the same structure and rules. Examples include _“Monthly Jobs Report”_ or _“Weekly Initial Jobless Claims”_. Defines metadata, settlement sources, and structure applied to each event instance. Reference data only.

The unified event-based model normalizes event-driven contracts from supported sources into a single IPF structure.

Event-based instruments do not have regular trading sessions. They trade continuously (24x7), similar to crypto instruments.

Example trading schedule:

`EBC(name=EBC; tz=GMT; td=1234567; de=+0000; 0=0000+0000)`

## Instrument hierarchy

Event-based instruments follow a hierarchical structure:

- EBSERIES defines the recurring template or broader topic
- EBEVENT represents a specific event instance within that series
- EBMARKET represents a tradable binary outcome within the event

:::note
For some sources, an EBEVENT may exist without a parent EBSERIES.
:::

## Data model structure

### Book sides

dxFeed publishes both the positive (Yes) and negative (No) outcome books for each EBMARKET instrument. Both bid and ask sides are available for each outcome.

### CME type mapping

Event-based instruments from CME are mapped to the dxFeed unified model as follows:

| Unified type | CME type | Description |
| --- | --- | --- |
| EBSERIES | PRODUCT | Product-level reference entity |
| EBEVENT | FUTURE | Event-level reference entity |
| EBMARKET | OPTION | Both Put and Call options are provided |

### Reference-only instruments

EBEVENT and EBSERIES are reference instruments. They support the hierarchy of the data model but do not publish real-time market data.

EBMARKET is the only tradable instrument type and publishes market data.

## Market data coverage

dxFeed publishes the following market data for EBMARKET instruments:

- [MarketMaker](/data-model/market-events/qd-model-of-market-events/#marketmaker)
- [Quote](/data-model/market-events/qd-model-of-market-events/#quote)
- [TimeAndSale](/data-model/market-events/qd-model-of-market-events/#timeandsale)
- [Trade](/data-model/market-events/qd-model-of-market-events/#trade)
- [Summary](/data-model/market-events/qd-model-of-market-events/#summary)

:::note
EBEVENT and EBSERIES are reference instruments and do not publish real-time market data.
:::

## Instrument fields

### EBMARKET fields

EBMARKET defines tradable contracts and includes the key fields listed in the table below.

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| SYMBOL | Text | Instrument identifier. Mandatory field. Each source contract is split into two EBMARKET instruments — one per outcome. The outcome side is encoded as a suffix:<br/>For CME instruments, the namespace is merged with the letters `EB` so that EB instruments can be filtered by namespace | 666697-Y:EBPOMA,<br/>666697-N:EBPOMA,<br/>./ECPCEZ26P3.3:EBXCME<br/>[Learn more](/data-model/symbology-guide/equities-futures-options-and-spreads-symbology/us-formats/#us-formats) |
| DESCRIPTION | Text | Market description, constructed from the event title and outcome sub-title in brackets.<br/>For CME instruments, the description is based on the product name and strike price | Will Brentford win the 2025–26 English Premier League?,<br/>Event Contract on North Carolina College Basketball Total Points, 13.5 |
| OPOL | Text | Official place of listing | EBPOMA,<br/>XCME |
| CURRENCY | Text | Currency of quotation, pricing, and trading | USD |
| PRICE_INCREMENTS | Formatted text | Minimum allowed price increment and ranges when applicable | 0.001,<br/>0.01 |
| TRADING_HOURS | Formatted text | Trading schedule | CRYPTO(name=Crypto;tz=GMT;td=1234567;de=+0000;0=0000+0000) |
| RAW_SYMBOL | Text | Native exchange identifier | will-us-withdraw-from-nato-before-2027,<br/>ECG10G617 C4835 |
| EXCHANGE_DATA | Text | Exchange-specific identifier data | 0E,<br/>MTONOG622,<br/>100 |
| STRIKE_TYPE | Text | Defines how the market strike is evaluated | fixed,<br/>other |
| FLOOR_STRIKE | Number | Minimum expiration value that leads to a YES settlement | 13.5 |
| CAP_STRIKE | Number | Maximum expiration value that leads to a YES settlement | 475 |
| EBEVENT | Text | Identifier of the parent event | WHO-WILL-BERNIE-ENDORSE-43347:EBPOMA,<br/>/ECUNEV26:EBXCME |
| FIRST_TRADE_TIME | Timestamp | Time when trading starts on the first trading day | 2025-07-24T00:09:44.861+02:00,<br/>2025-06-20T12:00:00.000+02:00 |
| LAST_TRADE_TIME | Timestamp | Time when trading stops on the last trading day | 2025-07-24T00:09:44.861+02:00,<br/>2025-06-20T12:00:00.000+02:00 |
| EXPIRATION | Date | Expiration date | 2009-01-17,<br/>2009-01-17 |
| EXPECTED_EXPIRATION | Timestamp | Expected expiration time | 2025-08-28T20:45:00.000+02:00,<br/>2025-08-28T00:00:00.000+02:00 |
| CAN_CLOSE_EARLY | Boolean | Indicates whether the market can close early | true |
| FRACTIONAL_TRADING | Boolean | Indicates whether fractional trading is enabled | true |
| TRADING_RULES | Text | Plain-language market rules and resolution conditions | This market resolves to Yes if the listed condition is met,<br/>Trading for College Basketball Point Total Contracts will terminate when the occurrence or non-occurrence of the final value of game points is received to the exchange.<br/>The contract will resolve to **Yes** if total game points is greater than the strike price, it will resolve to **No** if the total game points is less than the strike price. Should the rescheduled event be beyond 7 days, open positions will be voided and premiums returned |

### EBEVENT fields

EBEVENT defines event-level metadata and includes the key fields listed in the table below.

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| SYMBOL | Text | Event identifier. Mandatory field | 43347:EBPOMA,<br/>/ECUNEV26:EBXCME |
| DESCRIPTION | Text | Event description | Will Argentina dollarize by June 30, 2026?,<br/>Total Olympic Medal Count - Norway, Feb-26 |
| OPOL | Text | Official place of listing | EBPOMA,<br/>XCME |
| CURRENCY | Text | Currency of quotation, pricing, and trading | USD |
| TRADING_HOURS | Formatted text | Trading schedule | CRYPTO(name=Crypto;tz=GMT;td=1234567;de=+0000;0=0000+0000) |
| EXCHANGE_DATA | Text | Exchange-specific identifier data | 0E,<br/>MTONOG622,<br/>100 |
| RAW_SYMBOL | Text | Native exchange identifier | will-us-withdraw-from-nato-before-2027,<br/>ECUNEV6 |
| EBSERIES | Text | Identifier of the parent series | TIKTOK-BAN:EBPOMA,<br/>/KCN11:EBXCME |
| TAGS | Formatted text | Tags associated with the event | argentina;Politics;economics;Economy;Finance; Macro Indicators; currency,<br/>COMMODITY;SPORTS;COLLEGE BASKETBALL;POINT TOTAL |
| MUTUALLY_EXCLUSIVE | Boolean | Indicates whether only one or several markets on the event can resolve to Yes | false |
| SETTLEMENT_SOURCES | Formatted text | URLs of official settlement sources | [https://www.nba.com/games ](http://https://www.nba.com/games) |

### EBSERIES fields

EBSERIES defines recurring event structures and includes the key fields listed in the table below.

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| SYMBOL | Text | Series identifier. Mandatory field | 12345:EBPOMA,<br/>/KCN11:EBXCME |
| DESCRIPTION | Text | Series description | NBA,<br/>Total Olympic Medal Count - Norway |
| OPOL | Text | Official place of listing | EBPOMA,<br/>XCME |
| CURRENCY | Text | Currency of quotation, pricing, and trading | USD |
| TRADING_HOURS | Formatted text | Trading schedule | CRYPTO(name=Crypto;tz=GMT;td=1234567;de=+0000;0=0000+0000) |
| RAW_SYMBOL | Text | Native exchange identifier | us-nato-withdrawal |
| CONTRACT_URL | Text | Direct link to the original contract filing published by the source exchange | [https://kalshi-public-docs.s3.us-east-1.amazonaws.com/regulatory/product-certifications/JPPMHOC.pdf](http://https://kalshi-public-docs.s3.us-east-1.amazonaws.com/regulatory/product-certifications/JPPMHOC.pdf) |
| CONTRACT_TERMS | Text | Direct link to the current contract terms published by the source exchange | [https://kalshi-public-docs.s3.amazonaws.com/contract_terms/JPPMHOC.pdf](http://https://kalshi-public-docs.s3.amazonaws.com/contract_terms/JPPMHOC.pdf) |
| ADDITIONAL_PROHIBITIONS | Text | Additional trading restrictions for the series | Persons who are employed by any of the Source Agencies are not permitted to trade on the Contract. Persons who hold any material, non-public information on the Underlying are not permitted to trade on the Contract |

## IPF examples

The following examples illustrate how event-based instruments are represented in IPF.

### EBMARKET example

```
#EBMARKET::=TYPE,SYMBOL,DESCRIPTION,OPOL,CURRENCY,EXPIRATION,PRICE_INCREMENTS,TRADING_HOURS,CAN_CLOSE_EARLY,EBEVENT,EXPECTED_EXPIRATION,FIRST_TRADE_TIME,FRACTIONAL_TRADING,LAST_TRADE_TIME,POLY_CLOB_TOKEN_ID,POLY_ICON,RAW_SYMBOL,STRIKE_TYPE,TRADING_RULES

EBMARKET,WILL-PERSON-CC-WIN-THE-2028-US-PRESIDENTIAL-ELECTION-561330-N:EBPOMA,Will Person CC win the 2028 US Presidential Election?,EBPOMA,USDC,2028-11-07,0.01,CRYPTO(name=Crypto;tz=GMT;td=1234567;de=+0000;0=0000+0000),true,PRESIDENTIAL-ELECTION-WINNER-2028-31552:EBPOMA,2028-11-07T00:00:00Z,2025-07-11T19:07:31.047114Z,true,2028-11-07T00:00:00Z,64613607940360254547055617042343292898477555797938029471863108005101301272136,https://polymarket-upload.s3.us-east-2.amazonaws.com/presidential-election-winner-2024-afdda358-219d-448a-abb5-ba4d14118d71.png,will-person-cc-win-the-2028-us-presidential-election,other,"The 2028 US Presidential Election is scheduled to take place on November 7, 2028. This market will resolve to the person who wins the 2028 US Presidential Election. The resolution source for this market is the Associated Press, Fox News, and NBC. This market will resolve once all three sources call the race for the same candidate. If all three sources haven’t called the race for the same candidate by the inauguration date (January 20, 2029) this market will resolve based on who is inaugurated."
```

### EBEVENT example

```
#EBEVENT::=TYPE,SYMBOL,DESCRIPTION,OPOL,CURRENCY,TRADING_HOURS,EBSERIES,MUTUALLY_EXCLUSIVE,POLY_ICON,RAW_SYMBOL,TAGS

EBEVENT,WILL-EXTENDED-LAUNCH-A-TOKEN-BY-84920:EBPOMA,Will Extended launch a token by ___ ?,EBPOMA,USDC,CRYPTO(name=Crypto;tz=GMT;td=1234567;de=+0000;0=0000+0000),,false,https://polymarket-upload.s3.us-east-2.amazonaws.com/will-extended-launch-a-token-by-D5bpW_p-APnZ.jpg,will-extended-launch-a-token-by,Crypto;Pre-Market;Extended;token launch
```

### EBSERIES example

```
#EBSERIES::=TYPE,SYMBOL,DESCRIPTION,OPOL,CURRENCY,TRADING_HOURS,POLY_ICON,RAW_SYMBOL

EBSERIES,HIGHEST-GROSSING-MOVIE:EBPOMA,Highest Grossing Movie,EBPOMA,USDC,CRYPTO(name=Crypto;tz=GMT;td=1234567;de=+0000;0=0000+0000),,highest-grossing-movie
```
