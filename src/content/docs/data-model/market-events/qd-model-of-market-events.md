---
title: "QD Model of Market Events"
paligoOriginId: "877"
---

## Overview

All events that occur on exchanges (placed and canceled orders, trades, and so on) arrive at dxFeed in vendor-specific formats. dxFeed normalizes them into QD records — structured data units whose fields are defined by the QD scheme. A record groups fields that naturally change together: a Trade record bundles price, size, and time, because all three change in a single market event. This grouping matches how data arrives from exchanges and makes the record the atomic unit of both subscription and update. A client subscribes to a **<record, symbol>** pair (plus time for history) and receives complete record updates rather than per-field changes. QD records are the wire-level representation used by the QTP protocol and by raw QD tools. Many dxFeed API events are backed by one or more QD records, but the mapping is not always one-to-one.

:::note
For clients' access to data feeds we usually provide [dxFeed API](https://www.dxfeed.com/dxfeed-apis) with a simplified set of events model. Since the API uses a simplified model, the mapping between QD records and dxFeed API events is not always one-to-one. See [Model of Event Publishing](/data-model/market-events/model-of-event-publishing/#model-of-event-publishing) for the full mapping.
:::

Records in the QD-model are described below.

## Exchange codes for US Equities and Options

On the US market, different exchanges may trade the same instruments. The cumulative feed of events from all exchanges we call **composite**. Individual events from each exchange we call **regional**. To distinguish regional events, each exchange has a corresponding code. In Europe, there are no regional events: each financial instrument has a different ticker symbol at each European exchange.

The list of the codes you can find [here](/data-model/reference-data/exchange-codes/#exchange-codes).

## Records description

Records in the QD-model are described below. If you plan to use [dxFeed API](https://www.dxfeed.com/dxfeed-apis) to process dxFeed market data, please check [this documentation](https://docs.dxfeed.com/dxfeed/api/index.html).

### EventFlags field

Any record may contain an **EventFlags** field that is meant for the reconstruction of order books, options chains, or charts. Its values describe the order in which records are processed. QD text/csv format does not contain this field in the head description, but this flag may appear at the end of any string. If there is no `Event` flag, it is considered false.

:::note
To learn about the order book reconstruction algorithm and corresponding details, see the [dxFeed Order Book Reconstruction](/data-model/market-events/dxfeed-order-book/order-book-reconstruction/#order-book-reconstruction) document.
:::

- `TX_PENDING` indicates a pending transactional update. When `TX_PENDING` is true, it means that an ongoing transaction update, that spans multiple events, is in process.
- `REMOVE_EVENT` indicates that the event with the corresponding index has to be removed.
- `SNAPSHOT_BEGIN` indicates when the loading of a snapshot starts. Snapshot load starts on new subscription and the first indexed event that arrives for each exchange code (in the case of a regional record) on a new subscription may have `SNAPSHOT_BEGIN` set to true. It means that an ongoing snapshot consisting of multiple events is incoming.
- `SNAPSHOT_END` or `SNAPSHOT_SNIP` indicates the end of a snapshot. The difference between `SNAPSHOT_END` and `SNAPSHOT_SNIP` is the following: `SNAPSHOT_END` indicates that the data source sent all the data pertaining to the subscription for the corresponding indexed event, while `SNAPSHOT_SNIP` indicates that some limit on the amount of data was reached and while there still might be more data available, it will not be provided.
- `SNAPSHOT_MODE` instructs dxFeed to use snapshot mode. It is intended to be used only for publishing to activate (if not yet activated) snapshot mode. The difference from `SNAPSHOT_BEGIN` flag is that `SNAPSHOT_MODE` only switches on snapshot mode without starting snapshot synchronization protocol.

## Market data records

### Quote

Snapshot of the best bid and ask prices, and other fields that may change with each quote. It represents the most recent information that is available about the best quote on the market at any given moment.

:::note
If there are no changes to the quote, the last known quote will continue to be displayed, even if it becomes stale. At the start of a new trading day, if the quote is still unchanged, it remains visible but with both bid and ask sizes set to 0.
:::

```
#=Quote, EventSymbol, EventTime, BidTime, BidExchangeCode, BidPrice, BidSize, AskTime, AskExchangeCode, AskPrice, AskSize
Quote, FBGX, 20180926-100000.000-0400, 20180926-095959-0400, Q, 297.01, 25, 20180926-095959-0400, Q, 298.23, 25
```

| **Field** | **Description** |
| --- | --- |
| EventSymbol | Symbol of this event |
| EventTime | Time when this event has been registered in dxFeed system (filled only for historical data; not filled for real-time data feed) |
| BidTime | Time of the last bid change |
| BidExchangeCode | Bid exchange code |
| BidPrice | Bid price |
| BidSize | Bid size |
| AskTime | Time of the last ask change |
| AskExchangeCode | Ask exchange code |
| AskPrice | Ask price |
| AskSize | Ask size |

### Quote&X (regional Quote)

Similar to Quote, but represents the best bid and offer for a given exchange code. For possible values of **X** please refer to the [Exchange codes](/data-model/reference-data/exchange-codes/#exchange-codes) chapter.

```
#=Quote&Z, EventSymbol, EventTime, BidTime, BidPrice, BidSize, AskTime, AskPrice, AskSize
Quote&Z, MU, 20180926-100000.000-0400, 20180926-095959-0400, 44.33, 4, 20180926-095959-0400, 44.34, 1
```

### Profile

A record of a security instrument description. It represents the most recent information that is available about the traded security on the market at any given moment.

```
#=Profile, EventSymbol, EventTime, Beta, Eps, DivFreq, ExdDivAmount, ExdDivDate, HighPrice52, LowPrice52, Shares, FreeFloat, HighLimitPrice, LowLimitPrice, HaltStartTime, HaltEndTime, Flags, Description, StatusReason
Profile, FPI, 20180926-100000.135-0400,0.01985423, -0.06,4, 0.05, 20180928, 9.68,5.15, 3.2867817000000004E7, NaN, NaN, NaN, 0,0,10, "Farmland Partners Inc", "Trading Range Indication"
```

| **Field** | **Description** |
| --- | --- |
| EventSymbol | Symbol of this event |
| EventTime | Time when this event has been registered in dxFeed system (filled only for historical data; not filled for real-time data feed) |
| Beta | The correlation coefficient of the instrument to the S&P500 index (calculated, or received from other data providers) |
| Eps | Earnings per share (the company’s profits divided by the number of shares). The value comes directly from the annual quarterly accounting reports of companies. Available generally for stocks |
| DivFreq | Frequency of cash dividends payments per year (calculated) |
| ExdDivAmount | The amount of the last paid dividend |
| ExdDivDate | Date of the last dividend payment |
| HighPrice52 | The maximum price for 52 weeks (calculated from the current date) |
| LowPrice52 | The minimum price for 52 weeks (calculated from the current date) |
| Shares | Shares outstanding. In general, this is the total number of shares issued by this company (only for stocks) |
| FreeFloat | The number of shares outstanding that are available to the public for trade. This field always has NaN value |
| HighLimitPrice | Maximum (high) allowed price |
| LowLimitPrice | Minimum (low) allowed price |
| HaltStartTime | Start time of the trading halt interval |
| HaltEndTime | End time of the trading halt interval |
| Flags | This field contains several individual [bit flags](https://en.wikipedia.org/wiki/Bit_field) encoded as an integer number the following way: |
| Description | Description of the security instrument |
| StatusReason | The reason why trading is halted |

### Order#X

A record that contains all available depth of market. **X** may stand for:

| Source | Feed |
| --- | --- |
| BATE | Cboe EU BXE (BATE) FOD |
| BYX | Cboe BYX FOD |
| BZX | Cboe BZX FOD |
| bzx | Cboe BZX PLB |
| BXTR | Cboe EU SI (Systematic Internaliser) FOD |
| BI20 | BIST Top20 Orders (Level2+) FOD |
| CHIX | Cboe EU CXE (Chi-X) FOD |
| CEUX | Cboe EU DXE FOD |
| CFE | Cboe CFE FOD |
| C2OX | Cboe C2 FOD |
| DEA | Cboe EDGA FOD |
| DEX | Cboe EDGX FOD |
| dex | Cboe EDGX PLB |
| ERIS | ErisX FOD |
| ESPD | Nasdaq E-speed FOD (for historical data only: 2018/06/01 - 2018/11/18) |
| FAIR | FairX FOD |
| GLBX | Globex FOD |
| glbx | CME Globex PLB |
| ICE | ICE Futures US/EU FOD |
| IST | Borsa Istanbul FOD |
| iex | IEX PLB |
| MEMX | Members Exchange FOD |
| memx | Members Exchange PLB |
| NTV | Nasdaq TotalView FOD |
| ntv | Nasdaq TotalView PLB |
| NFX | Nasdaq NFX FOD (for historical data only: 2017/07/23 - 2020/06/12) |
| GLBX | CME Globex FOD |
| SMFE | SmallEx FOD |
| smfe | SmallEx PLB |
| XNFI | Nasdaq NFI FOD |
| XEUR | Eurex FOD |
| xeur | Eurex PLB |

*FOD — Full order depth, PLB — Price level book

| **Field** | **Description** |
| --- | --- |
| EventSymbol | Symbol of this event |
| EventTime | Time when this event has been registered in dxFeed system (filled only for historical data; not filled for real-time data feed) |
| Void | Additional insignificant field; always 0 |
| Index | Unique index in order book |
| Time | Time of this order |
| Sequence | Sequence of this order, may include milliseconds (e.g., "857:3") |
| Price | Price of this order |
| Size | Size of this order |
| ExecutedSize | Executed size of this analytic order |
| Flags | This field contains several individual [bit flags](https://en.wikipedia.org/wiki/Bit_field) encoded as an integer number the following way: |
| MarketMaker | The value is optional and is one of these based on the best effort basis: |

#### Example

For NTV source:

```
#=Order#NTV, EventSymbol, EventTime, Void, Index, Time, Sequence, Price, Size, Flags, MarketMaker
Order#NTV, A, 20180925-195959.999-0400, 0, 24, 0, 0, NaN, 0, 3, \NULL,EventFlags=SNAPSHOT_BEGIN
```

### OrderImbalance

A record that represents order book statistics during auctions. It reflects the excess of buy or sell orders and provides parameters for a potential auction price, given the current state of the order book.

| **Field** | **Description** |
| --- | --- |
| symbol | Symbol of this event |
| time | Time when this event was generated in the order book |
| sequence | Sequence number of this event |
| eventTime | Time when this event was registered in the dxFeed system |
| refPrice | Reference price used to calculate paired and imbalance sizes. Typically, the consolidated last sale price before the auction or imbalance event |
| pairedSize | Number of shares that are eligible to be matched at the refPrice |
| imbalanceSize | Number of shares that are not matched at the refPrice |
| nearPrice | Hypothetical price at which all interest (including auction and imbalance offset orders) could trade if the auction occurred now |
| farPrice | Hypothetical price at which only auction interest (i.e., all auction orders currently on the book) could trade if the auction occurred now. This price is usually further from the refPrice than nearPrice. |
| Flags | This field contains several individual [bit flags](https://en.wikipedia.org/wiki/Bit_field) encoded as an integer number the following way: |

### MarketMaker

This record contains data aggregated by price (price level book), by Market Maker, or by a bank.

```
#=MarketMaker, EventSymbol, EventTime, ExchangeCode, MarketMaker, BidTime, BidPrice, BidSize, BidCount, AskTime, AskPrice, AskSize, AskCount
MarketMaker, INTC,20180925-195959.999-0400, Q, XGWD, 20180925-160004-0400, 44.36, 0, 0, 20180925-160004-0400, 48.18, 0, 0, EventFlags=SNAPSHOT_BEGIN
```

| **Field** | **Description** |
| --- | --- |
| EventSymbol | Symbol of this event |
| EventTime | Time when this event has been registered in dxFeed system (filled only for historical data; not filled for real-time data feed) |
| ExchangeCode | Exchange code |
| MarketMaker | The MarketMaker field has different meanings in different feeds: |
| BidTime | Time of the last bid change |
| BidPrice | Bid price |
| BidSize | Bid volume |
| BidCount | The sequence of the bid in the aggregated feed |
| AskTime | The time of the last ask change |
| AskPrice | Ask price |
| AskSize | Volume ask |
| AskCount | The sequence of the ask in the aggregated feed |

### Summary

Summary information record about the trading session that includes the session’s highs, lows, etc. It represents the most recent information that is available about the trading session on the market at any given moment.

```
#=Summary, EventSymbol, EventTime, DayId, DayOpenPrice, DayHighPrice, DayLowPrice, DayClosePrice, PrevDayId, PrevDayClosePrice, PrevDayVolume, OpenInterest, Flags
Summary, AON, 20180926-100000.018-0400, 20180926, 155.82, 156, 154.82, NaN, 20180925, 155.81, NaN, 0, 3
```

| **Field** | **Description** |
| --- | --- |
| EventSymbol | Symbol of this event |
| EventTime | Time when this event has been registered in dxFeed system (filled only for historical data; not filled for real-time data feed) |
| DayId | Identifier of the day that this summary represents. DayId reflects the date of the trading session, which changes when a new trading day begins. |
| DayOpenPrice | The first (open) price of the day.<br/>DayOpenPrice is set to:<br/>For details, see the [TimeAndSale sale conditions](/data-model/market-events/timeandsale-sale-conditions/#timeandsale-sale-conditions) page |
| DayHighPrice | Maximum (high) price of the day.<br/>DayHighPrice is set to:<br/>For details, see the [TimeAndSale sale conditions](/data-model/market-events/timeandsale-sale-conditions/#timeandsale-sale-conditions) page |
| DayLowPrice | Minimum (low) price of the day.<br/>DayLowPrice is set to:<br/>For details, see the [TimeAndSale sale conditions](/data-model/market-events/timeandsale-sale-conditions/#timeandsale-sale-conditions) page |
| DayClosePrice | The last (close) price of the day.<br/>DayClosePrice is set to: |
| PrevDayId | Identifier of the previous day.<br/>Updated when at least one trade is received. |
| PrevDayClosePrice | The last (close) price of the previous day.<br/>Updated together with PrevDayId. The value of DayClosePrice is copied over, including its flag type |
| PrevDayVolume | Total volume traded of the previous day.<br/>Updated together with PrevDayId.<br/>The total volume from trades (Trade.Volume) is copied, together with the associated flags |
| OpenInterest | The number of open contracts of the symbol |
| Flags | This field contains several individual [bit flags](https://en.wikipedia.org/wiki/Bit_field) encoded as an integer number the following way:<br/>The values mean:<br/>Settlement price availability may vary by exchange.<br/>Settlement data can be queried via the [Market Data API](/market-data-api/#market-data-api) by type and date. Historical values require specific access permissions |

### Summary&X (regional Summary)

Similar to the Summary record but represents summary information for a given exchange code. For possible values of **X** please refer to the [Exchange codes](/data-model/reference-data/exchange-codes/#exchange-codes) chapter.

```
#=Summary&P, EventSymbol, EventTime, DayId, DayOpenPrice, DayHighPrice, DayLowPrice, DayClosePrice, PrevDayId, PrevDayClosePrice, Flags
Summary&P, MRK, 20180926-100000.006-0400, 20180926, 70.94, 71.14, 70.8, NaN, 20180925, 70.65, 3
```

### Trade

A record of the price and size of the last trade during regular trading hours, along with the overall day volume and day turnover. It represents the most recent information available about the last regular trade on the market at any given moment.

```
#=Trade, EventSymbol, EventTime, Time, Sequence, Price, Size, Tick, Change, Flags, DayVolume, DayTurnover
Trade, BABA, 20180926-100000.002-0400, 20180926-095959-0400, 0, 166.74, 100, 1, 2.48, 0, 929667, NaN
```

| **Field** | **Description** |
| --- | --- |
| EventSymbol | Symbol of this event |
| EventTime | Time when this event has been registered in dxFeed system (filled only for historical data; not filled for real-time data feed) |
| Time | Time of the last trade |
| Sequence | Sequence of the last trade |
| ExchangeCode | Exchange code of the last trade |
| Price | Price of the last trade |
| Size | Size of the last trade |
| Tick | Trend indicator - in which direction price is moving (1 = up, 2 = down, and 0 = undefined) |
| Change | Value equals Price minus **PrevDayClosePrice** (the value of **PrevDayClosePrice** is retrieved from the [Summary](#summary) record) |
| Flags | This field contains several individual [bit flags](https://en.wikipedia.org/wiki/Bit_field) encoded as an integer number the following way: |
| DayVolume | Total volume traded for a day |
| DayTurnover | Total turnover traded for a day |

### Trade&X (regional Trade)

Similar to Trade record but represents trades for a given exchange code. For possible values of **X** please refer to [Exchange codes](/data-model/reference-data/exchange-codes/#exchange-codes) chapter.

```
#=Trade&D, EventSymbol, EventTime, Time, Sequence, Price, Size, Tick, Change, Flags, DayVolume, DayTurnover
Trade&D, BABA, 20180926-100000.002-0400, 20180926-095959-0400, 0, 166.74, 100, 1, 2.48, 0, 929667, NaN
```

### TradeETH

A record of the price and size of the last trade during extended trading hours, and the extended trading hours day volume and day turnover. This record is defined only for symbols (typically stocks and ETFs) that have extended trading hours (ETH, pre-market and post-market trading sessions). It represents the most recent information that is available about ETH last trade on the market at any given moment.

```
#=TradeETH, EventSymbol, EventTime, Time, Sequence, ExchangeCode, Price, Size, Flags, DayVolume, DayTurnover
TradeETH, SPLPpA, 20180926-100154.380-0400, 20180920-160124-0400, 0, D, 22.65, 454, 0, 0, NaN
```

| **Field** | **Description** |
| --- | --- |
| EventSymbol | Symbol of this event |
| EventTime | Time when this event has been registered in dxFeed system (filled only for historical data; not filled for real-time data feed) |
| Time | Time of the last trade |
| Sequence | Sequence of the last trade |
| ExchangeCode | Exchange code of the last trade |
| Price | Price of the last trade |
| Size | Size of the last trade |
| Flags | Same as in the Trade record |
| DayVolume | Total volume traded during extended trading hours |
| DayTurnover | Total turnover traded extended trading hours |

### TradeETH&X (regional TradeETH)

Similar to the TradeETH record but represents ETH trades for a given exchange code. For possible values of **X** please refer to [Exchange codes](/data-model/reference-data/exchange-codes/#exchange-codes) chapter.

```
#=TradeETH&P, EventSymbol, EventTime, Time, Sequence, Price, Size, Flags, DayVolume, DayTurnover
TradeETH&P, CRVS, 20180926-100000.155-0400, 20180815-092803-0400, 0, 9.69, 100, 0, 35, NaN
```

### OptionSale

Represents a trade or other market event with price for each option symbol listed under the specified **Underlying**, like market open/close price, etc. **OptionSale** record provides information about option trades in a continuous time slice with the additional metrics: Option Volatility, Option Delta, and Underlying Price.

**OptionSale** record has a unique index which can be used for later correction/cancellation processing.

| **Field** | **Description** |
| --- | --- |
| EventSymbol | Symbol of this event |
| EventFlags | Transactional event flags |
| Index | Unique index in order book |
| Time | Timestamp of the original event |
| Sequence | Sequence number of this record, may include milliseconds (e.g., "857 :3") |
| ExchangeCode | Exchange code of this **OptionSale** record |
| Price | Price of this **OptionSale** record |
| Size | Size of this **OptionSale** record |
| BidPrice | The current bid price on the market when this **OptionSale** record had occurred |
| AskPrice | The current ask price on the market when this **OptionSale** record had occurred |
| ExchangeSaleConditions | Sale conditions provided for this reocrd by data feed (you can find a list of parameters in the [TimeAndSale Conditions map](/data-model/market-events/timeandsale-sale-conditions/#timeandsale-sale-conditions)) |
| Flags | This field contains several individual flags: |
| UnderlyingPrice | The underlying price at the time when this **OptionSale** record had occurred |
| Volatility | Black-Scholes implied volatility of the record's option |
| Delta | The record's option delta |
| GetOptionSymbol() optionSymbol | The option symbol of this record's option |

### TimeAndSale

Represents a trade or other market event with price, like market open/close price, etc. **TimeAndSale** record is intended to provide information about trades in a continuous time slice (unlike **Trade** records, which are supposed to provide a snapshot of the current last trade).

```
#=TimeAndSale, EventSymbol, EventTime, Time, Sequence, ExchangeCode, Price, Size, BidPrice, AskPrice, SaleConditions, Flags
TimeAndSale, BABA, 20180926-100000.002-0400, 20180926-095959-0400, 872 :33427, D,166.8177, 31,166.71, 166.74, "4 I", 12576
```

<table>
<tr><th><strong>Field</strong></th><th><strong>Description</strong></th></tr>
<tr><td>EventSymbol</td><td>Symbol of this event</td></tr>
<tr><td>EventTime</td><td>Time when this event has been registered in dxFeed system (filled only for historical data; not filled for real-time data feed)</td></tr>
<tr><td>Time</td><td>Timestamp of the original event</td></tr>
<tr><td>Sequence</td><td>Sequence number of this event, may include milliseconds (e.g., "857 :3")</td></tr>
<tr><td>ExchangeCode</td><td>Exchange code of this <strong>TimeAndSale</strong> event</td></tr>
<tr><td>Price</td><td>Price of this <strong>TimeAndSale</strong> event</td></tr>
<tr><td>Size</td><td>Size of this <strong>TimeAndSale</strong> event</td></tr>
<tr><td>BidPrice</td><td>The current bid price on the market when this <strong>TimeAndSale</strong> event had occurred</td></tr>
<tr><td>AskPrice</td><td>The current ask price on the market when this <strong>TimeAndSale</strong> event had occurred</td></tr>
<tr><td>SaleConditions</td><td>Sale conditions provided for this event by data feed (you can find a list of parameters in the <a href="/data-model/market-events/timeandsale-sale-conditions/#timeandsale-sale-conditions">TimeAndSale Conditions map</a>)</td></tr>
<tr><td>Flags</td><td>This field contains several individual <a href="https://en.wikipedia.org/wiki/Bit_field">bit flags</a> encoded as an integer number the following way:</td></tr>
<tr><td>Buyer</td><td rowspan="2">These fields are optional and exclusive to the Borsa Istanbul exchange. The first two letters "BI" indicate Borsa Istanbul, followed by letters directly from the exchange. The list of <a href="https://www.borsaistanbul.com/tr/sayfa/200/piyasa-yapici-uyeler">Borsa Istanbul companies</a>. Possible values include: <code>BIZRY</code>, <code>BIVKY</code>, <code>BIMDS</code></td></tr>
<tr><td>Seller</td></tr>
</table>

### TimeAndSale&X (regional TimeAndSale)

Similar to the TimeAndSale but represents **TimeAndSale** record for a given exchange code. For a list of possible values for **X** please refer to the [Exchange codes](/data-model/reference-data/exchange-codes/#exchange-codes) chapter.

```
#=TimeAndSale&P, EventSymbol, EventTime, Time, Sequence, ExchangeCode, Price, Size, BidPrice, AskPrice, SaleConditions, Flags
TimeAndSale&P, AMZN, 20180802-030000.059-0500, 20180802-030000-0500, 13:0, P, 1799, 1, 1798.97, 1800, "@ TI", 8264
```

## Messages and configuration data records

### Message

A record that delivers application-specific notifications with an optional attachment. Message records are never conflated and are delivered to all connected subscribers. Message records are not persisted by the system. If a subscriber is not connected when a message is published, the message is not delivered. Message records are intended for notification purposes and should not be used as a persistent data transport mechanism.

```
#=Message, EventSymbol, EventTime, Attachment
Message, AAPL{type=optstat}, 20250115-100000.000-0500, "OptionStatisticsData{...}"
```

| **Field** | **Description** |
| --- | --- |
| EventSymbol | Symbol of this record |
| EventTime | Time when this record was created (may be unavailable for real-time data) |
| Attachment | Application-specific payload |

### TextMessage

A Message record with a text payload. TextMessage records are never conflated and are delivered to all connected subscribers. TextMessage records are not persisted by the system. If a subscriber is not connected when a message is published, the message is not delivered.

```
#=TextMessage, EventSymbol, EventTime, Time, Sequence, Text
TextMessage, AAPL, 20250115-100000.000-0500, 20250115-100000.000-0500, 1, "Test message"
```

| **Field** | **Description** |
| --- | --- |
| EventSymbol | Symbol of this record |
| EventTime | TTime when this record was created |
| Time | Time of the message |
| Sequence | Sequence number used to distinguish messages with the same time |
| Text | Text payload |

### Configuration

A record that delivers application-specific configuration data with versioning support. Configuration records are lasting records. When delivered via [TICKER](/data-services/real-time-and-delayed-services/qds-tool/#ticker) contract type, only the latest version is retained. Records with lower version values are ignored.

```
#=Configuration, EventSymbol, EventTime, Version, Attachment
Configuration, AAPL{type=optstat}, 20250115-100000.000-0500, 5, "OptionStatisticsData{...}"
```

| **Field** | **Description** |
| --- | --- |
| EventSymbol | Symbol of this record |
| EventTime | Time when this record was created |
| Version | Version of the configuration. Higher values indicate more recent updates |
| Attachment | Application-specific payload |

### TextConfiguration

A Configuration record with a text payload. TextConfiguration records are lasting records and support versioning. When delivered via [TICKER](/data-services/real-time-and-delayed-services/qds-tool/#ticker) contract type, only the latest version is retained. Records with lower version values are ignored.

```
#=TextConfiguration, EventSymbol, EventTime, Time, Sequence, Version, Text
TextConfiguration, AAPL, 20250115-100000.000-0500, 20250115-100000.000-0500, 1, 3, "Config update"
```

| **Field** | **Description** |
| --- | --- |
| EventSymbol | Symbol of this record |
| EventTime | Time when this record was created |
| Time | Time of the configuration |
| Sequence | Sequence number used to distinguish updates with the same time |
| Version | Version of the configuration |
| Text | Text payload |
