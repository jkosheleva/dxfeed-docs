---
title: "How to Request Tick Data"
paligoOriginId: "908"
---

## Overview of services

You can request tick data from dxFeed using several services:

- [TickData service](#tickdata-service)
- [Candlewebservice](#candlewebservice)
- Direct [API connection](#api-connection)

## TickData service

TickData service allows you to extract tick data for a specified time range. It keeps about 30 hours of data in a local cache and provides access to historical data starting from 2014, subject to your entitlements.

:::note
TickData service is deployed in several regions (NYC, FFM, LON, IST). Requests are automatically routed to the appropriate instance.
:::

### Request structure

TickData request always follows the base structure: [https://tools.dxfeed.com/tickdata?<parameters>](https://tools.dxfeed.com/tickdata?<parameters>)

The base request structure with example values:

| Service address | Record type | Symbol | Start date with time | End Date | Format | Records (optional) | Compression (optional) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [tools.dxfeed.com/tickdata?](http://tools.dxfeed.com/tickdata?) | records=Quote,Trade etc | &symbols=IBM | &start=20220401-110900-0400 | &stop=20220401-111000-0400 | &format=csv or text | &records=MarketMaker | zip or gzip |

### Request parameters

The full list of parameters is available on the [TickData help page](https://tools.dxfeed.com/tickdata?help). The most commonly used parameters include:

- Records: Comma-separated list of event types, e.g., **Quote**, **Trade** (required). See [dxFeed Market Data QD-model of market events](/data-model/market-events/qd-model-of-market-events/#qd-model-of-market-events) or [Java Doc EventType](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/EventType.html) for details.
- Symbols: Comma-separated list of symbols (e.g., `AAPL`, `GOOG`) (required). The full list of symbols is available on [IPF help page](https://tools.dxfeed.com/ipf?help).
- Start: Start time of the extraction (required). Format: `YYYYMMDD-HHMMSS[.sss][zone]`. Time string is parsed similarly to [DateTimeFormatter](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html) that can parse various data formats, like [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) (check [ISO-8601 Formatting Symbols](http://support.sas.com/documentation/cdl/en/lrdict/64316/HTML/default/viewer.htm#a003169814.htm)) and epoch time (should be in milliseconds).
- Stop: Stop time of the extraction (required). It should be later than start time.
- Format: Output format: **csv**, **text**, or **binary** (optional). By default, **text**.
- Compression: Output compression: **none**, **zip**, or **gzip** (optional, recommended for large extractions).

### Examples

Use demo/demo credentials to check the examples:

- [Example](https://tools.dxfeed.com/tickdata?symbols=IBM&records=Quote&start=20220401-110900-0400&stop=20220401-111000-0400) for `IBM` symbols
- [Example](https://tools.dxfeed.com/tickdata?symbols=GOOG&records=Quote&start=20220401-110900-0400&stop=20220401-111000-0400) for `GOOG` symbols

### Entitlements

Access to TickData is controlled by entitlements:

- Service-level access: You must have an active subscription to the TickData service.
- Symbol-level access: Access to specific instruments or markets depends on your entitlements.

If you do not have the required rights, the request will return an empty response or an error.

If you would like to obtain access, please contact your sales manager or use [Contact Sales](https://dxfeed.com/contact-sales/) form on the website.

### How to request regional data

- A request with a regional code returns quotes only from that exchange. A request with a regional code returns quotes only from the exchange specified by that code (for example, `AAPL&Q` in Nasdaq [format](/data-model/symbology-guide/general-provisions/#formats)). See the [Symbology guide](/data-model/symbology-guide/#symbology-guide) for details.
- A request without a regional code (just Quote) returns NBBO — combined quotes from all exchanges.

**Examples**

When using a regional symbol in a URL, replace the `&` character with `%26` to ensure correct parsing.

- Regional quotes: [https://tools.dxfeed.com/tickdata?symbols=AAPL%26Q&records=Quote&start=20240613-110900-0400&stop=20240613-111000-0400&format=csv](https://tools.dxfeed.com/tickdata?symbols=AAPL%26Q&records=Quote&start=20240613-110900-0400&stop=20240613-111000-0400&format=csv)
- NBBO quotes (all exchanges): [https://tools.dxfeed.com/tickdata?symbols=AAPL&records=Quote&start=20240613-110900-0400&stop=20240613-111000-0400&format=csv](https://tools.dxfeed.com/tickdata?symbols=AAPL&records=Quote&start=20240613-110900-0400&stop=20240613-111000-0400&format=csv)

:::note
Regional examples may return an empty response if your entitlements do not include the selected exchange. If this happens, verify your access rights or contact sales.
:::

### TickData extraction performance

The extraction speed depends mainly on:

- Requested time range (_start–stop interval_).
- Number of event types (e.g., Quote, TimeAndSale in one request).

### Performance tips

Take note before requesting complex extractions:

- Test your parameters with a small request first.
- Use compression parameter for large requests to reduce server load and download size.
- Wait for a request to complete before sending the next one.
- URL-encode special characters inside symbols, for example:
  
  
  
  - & → %26
  - + → %2B

## Candlewebservice

Candlewebservice provides aggregated OHLC candles for a given time interval via a REST-like API. See [Candlewebservice](/data-services/aggregated-services/candlewebservice/) for detailed documentation.

## API connection

The direct API connection provides real-time access to dxFeed market data. It supports subscriptions to multiple symbols and provides market depth through Order events. To request depth, see the [dxFeed Order Book](/data-model/market-events/dxfeed-order-book/#dxfeed-order-book) documentation for details.

The direct API connection is used for:

- Live streaming of market events.
- Short-term history: API stores up to **10 days of tick data** in Compact Data Format (CDF), optimized for replay and backfill.

**Example**: Subscribe in real time to the last TimeAndSale event using the [getTimeSeriesPromise](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/api/DXFeed.html) method. See [dxFeed data access solutions](/market-data-api/data-access-solutions/#data-access-solutions) for other supported event types and connection options.
