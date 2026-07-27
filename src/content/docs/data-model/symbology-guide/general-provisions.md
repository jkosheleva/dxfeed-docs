---
title: "General provisions"
paligoOriginId: "49163"
---

## Introduction

The dxFeed Symbology Guide defines the standard formatting rules for financial instrument symbols across various asset classes and exchanges. This guide covers formatting conventions for equities, options, futures, indices, and other instruments.

## General rules

The symbol formats are used in the symbol field of IPF records and across all dxFeed data services. Symbol formats vary based on the market and the type of data requested. A `SYMBOL` may include the following components:

- Base symbol
- Exchange code (e.g., `&Q`)
- Namespace (e.g., `:US`)
- Expiration date (for derivatives, in YYMMDD format)
- Option type (`C` for Call, `P` for Put)
- Strike price
- Version
- Additional attributes (`{}` for data requests)
- Leg separator (`-` for spread symbols)

:::note
In the following format examples, the `+` (plus sign) character is used as a unit separator to increase the formats’ readability. It is not an actual part of the symbol.
:::

### Instrument type prefixes

dxFeed uses prefixes to identify instrument types:

- `.` for options
- `/` for futures
- `./` for futures options
- `=` for spreads

## Formats

The table below lists the most common symbol formats used in dxFeed data services. For more details about instrument types and field structure, see the [Instrument Profile Format](/data-model/reference-data/instrument-profile-format/#instrument-profile-format) page. Each format includes examples and the typical instrument types it applies to.

| Format | Example | Description |
| --- | --- | --- |
| SYMBOL | IBM,<br/>SPX | Commonly used for: **US equities**, **indices**, and **ETFs**.<br/>Used for both consolidated and direct US exchange feeds, depending on dxFeed data sources (e.g., GOOG from NBASIC). Applicable when data is available in both consolidated and regional formats, or when only one of them is present (e.g., certain US indices) |
| SYMBOL&EXCHANGE_CODE | AAPL&Q | Commonly used for: **US equities**.<br/>Used to request data from consolidated feeds or specific exchange sub-feeds by appending an exchange code to the symbol. See the full list of [Market Identifier Codes](https://www.iso20022.org/market-identifier-codes) |
| SYMBOL:NAMESPACE | /ES:XCME, BTC/USD:CXBITS,<br/>1SXPd:BATE, KCN:CHIA,<br/>BXY:DXI, HAU:DXI, DXBTC:MIAXDX | Commonly used for: **US futures**, **crypto**, **CFDs**, **forex**, **dxFeed indices**, and **EU/APAC equities**.<br/>Adds a namespace with colons to specify the market or exchange. This is the most typical format used for these instruments in dxFeed services.For crypto pairs, formats like BTC/USD:CXBITS are also used.<br/>Most namespaces in our symbols include market identifier codes (MICs). See the full list of [Market Identifier Codes](https://www.iso20022.org/market-identifier-codes) |
| $SYMBOL | $DJI, $NDX | Commonly used for: **indices** and **market indicators**.<br/>The `$` prefix indicates index instruments and is required in most cases. Check the [IPF web service](https://tools.dxfeed.com/ipf) for the final format |
| . + OPTION ROOT + VERSION + EXPIRATION DATE + OPTION TYPE + STRIKE: NAMESPACE | .NVDX250314P140:XEUR,<br/>.UNU25C80:XEUE | Commonly used for: **equity options**, **index options**, and **currency options**.<br/>Starts with the `.` prefix. Includes option root symbol of the underlying instrument, optional version, expiration date (YYMMDD), option type (C/P), strike price, and namespace. `Version` is an optional field and can be left blank if there is only one version.<br/>Note that this format is also used for [OPRA options](/data-model/symbology-guide/equities-futures-options-and-spreads-symbology/us-formats/#us-formats), but without a namespace |
| /SYMBOL:NAMESPACE | /FCE:XMON,<br/>/XU030:TR,<br/>/ES:XCME,<br/>/CL:XNYM | Commonly used for: **futures products**.<br/>Starts with the `/` prefix. Includes a product code and namespace |
| /SYMBOL + EXPIRATION ([Future contract month code](/data-model/symbology-guide/equities-futures-options-and-spreads-symbology/us-formats/#date-modifiers)): NAMESPACE | /ESM25:XCME | Commonly used for:** futures contracts**.<br/>Starts with the `/` prefix. Includes a product code with expiration code and namespace |
| ./ + FUTURES OPTION ROOT + VERSION + EXPIRATION ([Future contract month code](/data-model/symbology-guide/equities-futures-options-and-spreads-symbology/us-formats/#date-modifiers)) + OPTION TYPE + STRIKE: NAMESPACE | ./OG4G25P2965:XCEC,<br/>./EWM25P4850:XCME,<br/>./LOM31P99:XNYM | Commonly used for: **futures options**.<br/>Starts with the `./` prefix for futures options, including option root, expiration date, option type, strike price, and namespace.<br/>`Version` is an optional field and can be left blank if there is only one version |
| BASE CURRENCY/QUOTE CURRENCY: NAMESPACE | EUR/USD:FXCM | Commonly used for: **forex**, **crypto**.<br/>Forex currency pairs are typically formatted using the `/` to separate the base and quote currencies, with a namespace added to specify the provider or market |
| =/SYMBOL1-/SYMBOL2 | =/CLM24 - /CLZ24 | Commonly used for: **future spreads**.<br/>Symbol that defines a futures [spread](/data-model/reference-data/definition-of-spread-instruments/#definition-of-spread-instruments) as the difference between two futures contracts with different expiration dates for the same underlying |
| SYMBOL.ADDITIONAL ATTRIBUTE | AAPL{p=mark, =h},<br/>AAPL{tho=true},<br/>AAPL{=2m,pl=0.2} | Commonly used for: **aggregated (chart) data across all asset classes**.<br/>Some instruments may have additional attributes that are specified with `{}` when using API for data requests.<br/>These attributes allow requesting specific types of candlesticks, such as aggregation periods for charting data or custom date ranges. See the [candle types](/data-services/aggregated-services/candle-types/#candle-types) page for more details |

## Modifiers for specific exchanges

If an exchange code is included in a user’s request, data is shown for US markets. An exchange code is preceded by the `&` (ampersand sign). Check the list of codes in the [Exchange Codes](/data-model/reference-data/exchange-codes/#exchange-codes) article.

Examples:

- `IBM&N`
- `.AAPL120616P255&C`

Refer to the [Equities, Futures, Options, and Spreads symbology](/data-model/symbology-guide/equities-futures-options-and-spreads-symbology/#equities-futures-options-and-spreads-symbology) chapter for listed symbology conventions by regions and exchanges.

We provide data feeds for the following regions:

- [U.S. formats](/data-model/symbology-guide/equities-futures-options-and-spreads-symbology/us-formats/#us-formats)
- Canada formats
- [European formats](/data-model/symbology-guide/equities-futures-options-and-spreads-symbology/european-formats/#european-formats)
- [Turkish formats](/data-model/symbology-guide/equities-futures-options-and-spreads-symbology/turkish-formats/#turkish-formats)
- Australian formats
- Asian formats
- Hong Kong formats
