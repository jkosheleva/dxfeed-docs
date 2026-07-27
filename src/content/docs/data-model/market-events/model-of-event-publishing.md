---
title: "Model of Event Publishing"
paligoOriginId: "876"
---

## Overview

Model of event publishing describes how dxFeed delivers market data. It covers:

- Different delivery contracts defining how events are delivered: full stream, conflated, historical, etc.
- Event classes such as trade, quote, profile, their fields, and which delivery contracts apply.
- Which events are provided for each instrument type (equities, futures, options, etc.) and feed type.
- Daily reset logic: what fields are reset when, how non-trading days are handled, and how open/close/volume values propagate.

This document is intended for developers integrating with dxFeed market data APIs, product managers, and anyone who needs to understand the semantics and timing of published events.

## Data delivery model

| **Contract** | **Description** | Typical use | Example |
| --- | --- | --- | --- |
| Ticker | Delivers the latest known value for each event. It skips intermediate updates to reduce traffic and latency. You always receive the most recent state of the data | Real-time interfaces such as trading terminals or dashboards where only current prices are needed | Latest bid/ask and last sale prices for IBM |
| Stream | Provides every event as it happens. You receive the full sequence of updates in the exact order. This model doesn't skip data and doesn't send an initial snapshot | Analytical tools and monitoring systems that need every event for research, audit, or real-time trend tracking | Sequence of all trades for IBM without data loss |
| History | Delivers a historical snapshot of events valid for a specific time range. After that, you continue to receive real-time updates using the same logic as Ticker | Charting systems, backtesting platforms, or order book reconstruction | Daily candles for IBM from September 1 to September 10, 2011 |

## dxFeed API event classes

An event class represents a specific type of market data event. Each class has a defined set of fields and supports one or more data delivery models.

| **dxFeed API event** | **Corresponding QD records** | Description | **Fields** | Default contract for dxFeed API |
| --- | --- | --- | --- | --- |
| Quote | Quote | Bid/Ask prices for a given instrument | Symbol, Bid Time, Bid Exchange, Bid Price, Bid Size, Ask Time, Ask Exchange, Ask Price, Ask Size | Ticker |
| Trade | Trade | Last Sale price for a given instrument + daily volume.<br/>The Last field is produced only within Trade or TimeAndSale events.<br/>If an instrument does not support these events (for example, FX or CFDs), the Last field is not available and may return NaN | Symbol, Exchange, Time, Price, Size, Volume | Ticker |
| TimeAndSale | TradeHistory | Trade in a tape of trades for a given instrument | Symbol, Time, Sequence, Exchange, Price, Size, Bid Price, Ask Price, Exchange Sale Conditions, Flags (e.g. isValidTick, etc) | Stream |
| Summary | Fundamental, Summary | Open-High-Low-Close values for current day and Close for previous trading day | Symbol, Day Id, Day High Price, Day Low Price, Day Open Price, Day Close Price, Prev Day Id, Prev Day Close Price, Open Interest | Ticker, Stream |
| Order | MarketMaker,<br/>Order | Market depth: Level 2 quote by market maker / regional exchange quote / element of order book | Order: Symbol, Index, Side, Level, Time, Exchange, Market Maker ID, Price, Size MarketMaker: Symbol, Exchange, Market Maker ID, Bid Price, Bid Size, Ask Price, Ask Size | History |
| Profile | Profile | Instrument profile | Symbol, Description, Flags (Is Trading Halted) | Ticker |
| Candle | Candle | Charting OHLCV candle | Symbol, Open, High, Low, Close, Volume, BidVolume, AskVolume, VWAP, Count | History |
| Greeks | Greeks | Option greeks and implied volatility | Delta, Gamma, Rho, Theta, Vega, Volatility, Price | Ticker |
| TheoPrice | TheoPrice | Option theoretical price | Delta, Gamma, Dividend, Interest, Price, Time, UnderlyingPrice | Ticker |
| Underlying | Underlying | Snapshot of computed values that are available for an option underlying symbol based on the option prices on the market | Symbol, Volatility, FrontVolatility, BackVolatility, PutCallRatio | Ticker |
| Series | Series | Snapshot of computed values that are available for all option series for a given underlying symbol based on the option prices on the market | Symbol, Index, Expiration, Volatility, PutCallRatio, ForwardPrice, Dividend, Interest | History |

## Events to be published for different feed types

Each feed type includes a specific combination of event classes.

**Equities**

| **Original Feed Event** | **dxFeed Event** |
| --- | --- |
| BBO Quote (bid/ask) | Quote |
| Regional Quote (bid/ask) | Quote, Order |
| Trade (last sale) | Trade, TradeETH, TimeAndSale |
| Trade conditions change messages | Trade, TradeETH |
| Volume setting events (trades, explicit volume update messages) | Trade, TradeETH |
| OHLC setting events: trades, explicit hi/lo update messages, explicit summary messages, etc. | Summary |
| Instrument definition | Profile |
| Trading halt/resume messages | Profile |
| Depth: order books, price levels, market maker quotes | Order |
| Charting aggregations | Candle |

**Indices and indicators**

| **Original Feed Event** | **dxFeed Event** |
| --- | --- |
| Index value | Trade, TimeAndSale |
| Bid index value, Ask index value (where available, calculated by bid/ask of index components) | Quote |
| Volume setting events (trades, explicit volume update messages) | Trade |
| OHLC setting events: trades, explicit hi/lo update messages, explicit summary messages, etc. | Summary |
| Instrument definition | Profile |
| Charting aggregations | Candle |

:::note
The **Size** value is always NaN in **Trade** and **TimeAndSale** events because indices and indicators are not tradable. **AskSize** and **BidSize** are always NaN if the Quote event is published.
:::

**Futures**

| **Original Feed Event** | **dxFeed Event** |
| --- | --- |
| Quote (bid/ask) | Quote |
| Trade (last sale) | Trade, TimeAndSale |
| Trade conditions change messages | Trade |
| Volume setting events (trades, explicit volume update messages) | Trade |
| OHLC setting events: trades, explicit hi/lo update messages, explicit summary messages, etc. | Summary |
| Instrument definition | Profile |
| Depth: order books, price levels | Order |
| Charting aggregations | Candle |

**Options**

| **Original Feed Event** | **dxFeed Event** |
| --- | --- |
| BBO Quote (bid/ask) | Quote |
| Regional Quote (bid/ask) | Quote |
| Trade (last sale) | Trade, TradeETH, TimeAndSale |
| Trade conditions change messages | Trade, TradeETH |
| Volume setting events (trades, explicit volume update messages) | Trade, TradeETH |
| OHLC setting events: trades, explicit hi/lo update messages, explicit summary messages, etc. | Summary |
| Instrument definition | Profile |
| Charting aggregations | Candle |
| Greeks and IV | Greeks |
| Theoretical prices | TheoPrice |
| VIX-volatilities, P/C ratios | Underlying, Series |

**Spreads**

| **Original Feed Event** | **dxFeed Event** |
| --- | --- |
| Quote (bid/ask) | Quote |
| Trade (last sale) | Trade, TimeAndSale |
| Volume setting events (trades, explicit volume update messages) | Trade |
| OHLC setting events: trades, explicit hi/lo update messages, explicit summary messages, etc. | Summary |
| Instrument definition | Profile |
| Charting aggregations | Candle |
| Greeks and IV | Greeks |
| Theoretical prices | TheoPrice |

**FX**

| **Original Feed Event** | **dxFeed Event** |
| --- | --- |
| Quote (bid/ask) | Quote |
| Trade (last sale) | Trade, TimeAndSale |
| Volume setting events | Trade |
| Market depth | Order |
| OHLC setting events: trades, explicit hi/lo update messages, explicit summary messages, etc. | Summary |
| Instrument definition | Profile |
| Charting aggregations | Candle |

:::note
FX instruments do not publish **Trade** or **TimeAndSale** events. Because of this, fields derived exclusively from these events, such as **Last** and **Volume**, are not available.
:::

:::note
The values of **Size**, **BidSize**, and **AskSize** values equal to 1 represent the minimum trade quantity on exchanges that do not publish actual sizes.

The values of **Size**, **BidSize**, or **AskSize** values equal to NaN indicate that there are no buyers or sellers willing to participate in the trade. In such cases, dxFeed still shows a price that is either calculated by the exchange or based on the last trade.
:::

**CFD**

| Original Feed Event | dxFeed Event |
| --- | --- |
| Quote (bid/ask) | Quote |
| Market depth | Order |
| OHLC setting events: explicit hi/lo update messages, explicit summary messages, etc. | Summary |
| Instrument definition | Profile |
| Charting aggregations | Candle |

:::note
CFD instruments follow the same event publishing model as FX instruments. They publish **Quote**, **Summary**, **Profile**, and **Candle** events, but don’t publish **Trade** or **TimeAndSale** events. As a result, fields derived exclusively from **Trade** or **TimeAndSale** events aren’t available.
:::

**Feed types and events matrix**

|  | Quote | Trade | TradeETH | TimeAndSale | Order | Summary | Profile | Candle | Greeks | TheoPrice | Underlying | Series |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Equities** | o | o | o | o | o | o | o | o |  |  | o |  |
| **Indices** |  | o |  | o |  | o | o | o |  |  |  |  |
| **Futures** | o | o |  | o | o | o | o | o |  |  | o |  |
| **Options** | o | o |  | o | o | o | o | o | o | o |  | o |
| **Spreads** | o | o |  | o |  | o | o | o | o | o |  |  |
| **FX** | o | * |  | * |  | * |  | o |  |  |  |  |

*** **Trade, TradeETH, and TimeAndSale events are published only for cryptocurrency instruments. FX and CFD instruments don't publish these events.

## Daily reset (rollover) procedures

Daily rollover can happen per-instrument (e.g. futures could have different rollover times depending on contract and venue) or could happen simultaneously for all instruments on the market during after-hours (e.g. NYSE equities). Time of the rollover is defined by trading schedules on the given market.

Rollover affects the **Summary** event which contains the OHLC for the current day and close value for the day the instrument traded previously. Also, rollover (reset) zeroes Volume field in Trade event and **Bid.Size** and **Ask.Size** fields in Quote event.

For instruments that do not publish **Trade** or **TimeAndSale** events, such as FX and CFDs, fields derived from these events, including **Last** and **Volume**, are not available. As a result, the **DayClose** value can only be populated from official exchange values, if such values are provided.

:::note
For futures, Settlement date replaces the last trade in Close when it arrives.
:::

Summary consists of current and historical parts:

- [Current](#current)
- [Historical](#historical)

### Current

The fields **DayId**, **OpenInterest**, **DayOpen.Price**, **DayHigh.Price**, **DayLow.Price** , and **DayClose.Price** are linked to either the current trading day or the previous trading day - when a new day has not begun yet. The day is shown in the **DayId** field.

1. These fields form a logical group linked to one trading day.
2. These fields are linked to a trading day, not a trading session.
3. These fields are linked to a trading days only, non-trading days are omitted (fields keep their current values during non-trading days).
4. These fields are linked to a trading day regardless of whether the instrument was actually traded this day or not.
5. Transition to the next trading day is done during trading pause (rollover).

#### Schedule

1. Before the start of the next trading day (before the first trading session of the new trading day) these fields are prepared for a new day. **DayId** is set to a new day, **OpenInterest** retains its current value (special field), all the OHLC-fields are reset to NaN. Ideally this happens at the given time before trading starts, e.g. 1 hour. In reality, it depends on the type of instrument, exchange, and protocol specialties. E.g. stocks are reset at midnight, options - at 6am, futures - 5-10 mins before open on individual schedules.
2. **DayOpen**, **DayHigh**, and **DayLow** are updated as soon as trading starts - either with official exchange values (if available) or calculated values. **DayClose** remains NaN.
3. Next step is divided into a-b:
  
  
  
  After trading closes, **DayClose** is filled - with the official close price, if available, or the last trade price.
  
  
  
  If the given instrument did not trade this day, all fields contain NaN.

In the case where an exchange sends a ClosePrice, but we had no sign of a trade in this instrument this day, we update the close price with the official value nevertheless.

Fields keep these values until a new trading day starts, where the whole procedure starts over from the step 1.

**OpenInterest** is a special field used for options and futures, it’s never reset. Formally it’s in the current group of fields and should be read as "open interest on the start of the current day.

:::note
If an instrument does not publish **Trade** or **TimeAndSale** events, for example FX or CFDs, the **Last** field is not available and **DayClose** can only be populated from official exchange values, if such values are provided.
:::

### Historical

The fields **PrevDayId** and **PrevDayClose.Price** are linked to the last trading day before **DayId** when this instrument was traded. That day is identified by the **PrevDayId** field.

The algorithm for filling these fields is simple: **DayId** and **DayClose.Price** are copied into them when preparing for the new trading day (see the first step in the [Schedule](#schedule) above) when **DayClose.Price** is not NaN.
