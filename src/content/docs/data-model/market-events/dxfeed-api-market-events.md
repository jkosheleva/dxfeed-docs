---
title: "dxFeed API Market Events"
paligoOriginId: "872"
---

## Overview

dxFeed API delivers market data through events. Events are the application-level abstraction for receiving market data. You connect by URL, subscribe by symbol, and receive typed events such as **Quote**, **Trade**, or **Order **through listeners on a configurable executor.

Delivery semantics are determined by the event interface:

- **LastingEvent** (such as Quote, Trade) delivers the latest known state with automatic conflation
- **TimeSeriesEvent** (such as TimeAndSale, Candle) delivers time-ordered history
- **IndexedEvent** (such as Order) delivers indexed collections with transactional flags. You can use these flags directly or rely on helper models such as [com.dxfeed.model.market.OrderBookModel](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/model/market/OrderBookModel.html) and [com.dxfeed.model.TimeSeriesEventModel](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/model/TimeSeriesEventModel.html) to assemble consistent snapshots

dxFeed API is a high-level wrapper around the QD model. It handles connection management, reconnects, conflation, and threading, so you do not deal with records, contracts, or wire encoding directly.

Each event type is backed by one or more QD records, and the mapping is performed inside the API. The mapping is not always one-to-one. For example, a single Order event class spans exchange-specific feeds (`Order#NTV` for [Nasdaq TotalView](https://www.nasdaq.com/solutions/data/equities/nasdaq-totalview), `Order#GLBX` for [CME Globex](https://www.cmegroup.com/solutions/market-access/globex.html)), aggregate books derived from [MarketMaker records](/data-model/market-events/qd-model-of-market-events/#marketmaker) (Order#AGGREGATE), and synthetic books derived from [Quote records](/data-model/market-events/qd-model-of-market-events/#quote) (Order#COMPOSITE, Order#REGIONAL).

:::note
If you are working with QD records, see [QD Model of Market Events](/data-model/market-events/qd-model-of-market-events/#qd-model-of-market-events).
:::

Market events available through dxFeed API are described below. For the full API reference, see [dxFeed API documentation](https://docs.dxfeed.com/dxfeed/api/index.html).

## Event types

Market events can be divided into several subgroups:

- Events on orders (orders, order book, price-level): **Quote**, **Order**, **SpreadOrder**, **SpreadOrder#ISE**
- Events on transactions (completed or canceled): **Trade**, **TradeETH**, **TimeAndSale**, **Summary**
- Meta-data (auxiliary information): **Configuration**, **TextConfiguration**, **Message**, **TextMessage**
- Calculated data (records for events that came from our service dxPrice): **Candles**, **Greeks**, **TheoPrice**, **Underlying**, **Series**

## Events on orders

### Quote

A Quote is a last event that represents the best bid and ask prices, and other fields that change with each quote. This is the most recent information that is available about the best quote on the market.

By default, the **bidTime** and **askTime** fields are transferred with seconds precision. You can change this behavior using the **dxscheme.bat** system property, which allows two options:

- Seconds (default): transfers the fields with seconds precision
- Millis: transfers the fields with milliseconds precision

[List of properties](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/Quote.html)

### Order

An Order is an event that gives different information on several levels of detail depending on the [Scope](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/Scope.html) flag. The Scope of an order is available via scope property and may have one of the following business model:

- `Scope.Composite` flag — a composite BBO from the whole market. For example, PLB (price level book).
- `Scope.Regional` flag — a regional BBO from a particular exchange or aggregated information. For example, [EOB](/data-model/market-events/dxfeed-order-book/enhanced-order-book/#enhanced-order-book) (Enhanced Order Book).
- `Scope.AGGREGATE` flag — an aggregate given price level or BBO information from a particular market maker.
- `Scope.Order` flag — an individual order on the market.

[List of properties](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/Order.html)

### SpreadOrder

A SpreadOrder is similar to Order event, but it is designed for a multi-leg order. It has a spreadSymbol property that contains the symbol of the actual spread that is being represented by the spread order object. The eventSymbol property contains the underlying symbol that was used in the subscription.

[List of properties](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/SpreadOrder.html)

### SpreadOrder#ISE

As in the case of Order, SpreadOrder is a generic model, and SpreadOrder#ISE is its subclass. The list of fields is the same as those listed in the general SpreadOrder model.

## Events on transactions

### Trade

A Trade is an event that provides prices and the volume of the last transaction in regular trading hours, as well as the total amount per day in the number of securities and in their value. This event does not contain information about all transactions, but only about the last transaction for a single instrument.

[List of properties](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/Trade.html)

:::note
No **Trade** events are provided for Forex symbols. A **Quote** event should be used instead.
:::

### TradeETH

The same set of fields as in the Trade event. When switching to ETH hours, this flag switches to true in both events.

[List of properties](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/TradeETH.html)

### TimeAndSale

TimeAndSale is an event that represents a trade or other market event with a price, like market open/close price. TimeAndSale events are intended to provide information about trades in a continuous-time slice (unlike Trade events which are supposed to provide snapshots about the most recent trade). TimeAndSale events have a unique index that can be used for later correction/cancellation processing.

[List of properties](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/TimeAndSale.html)

### Trade vs TimeAndSale

| **Trade** | **TimeAndSale** |
| --- | --- |
| Updated by aggregated triggers | Updated by exact trade in the market |
| Represents the most recent trade | Represents the end of a transaction |
| Consists of price and size of the last trade, overall day volume and turnover | Consists of a trade or other market event with a price. |

### Summary

Summary event provides the most recent information about the trading session including session highs, lows, etc. There are two goals:

1. To transmit OHLC values.
2. To provide data for charting. OHLC is required for a daily chart, and if an exchange does not provide it, the charting services refer to the Summary event.

Before opening the bidding, the values are reset to N/A or NaN.

[List of properties](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/Summary.html)

## Meta

### Configuration

Configuration is a lasting event with application-specific attachment. Some datafeeds use the **Configuration** event to disseminate additional information not covered by other events.

The **Attachment** field may contain different data depending on the feed:

1. Index constituents for index instruments (from Borsa Istanbul market data feed).
  
  
  
  Example:
  
  
  
  ```
  =Configuration EventSymbol Version Configuration 
  Configuration ZPYTI:TR 1644548400 "ALCTL:TR,ARDYZ:TR,ASELS:TR,INDES:TR,KAREL:TR,LOGO:TR,NETAS:TR,PENTA:TR,TCELL:TR,TTKOM:TR"
  ```
2. [Market-wide circuit breaker](https://www.investopedia.com/terms/c/circuitbreaker.asp) (MWCB) information for some data feeds. It is disseminated under MWCB `MIC` symbol, such as `XNAS` or `XNYS`. MWCB contains `Java Map<String, String>` with the following keys:
  
  
  
  - Decline Level 1, Decline Level 2, Decline Level 3 — breach threshold values for each level
  - Status — if present, this key contains the current MWCB level
  - Timestamp — time of the change
  
  
  
  Example:
  
  
  
  ```
  =Configuration EventSymbol Version Configuration                                                                                                 
  Configuration "Market-Wide Circuit Breaker XNYS" 1644584417 "[Decline Level 1=4188.79, Decline Level 2=3918.54, Decline Level 3=3603.26, Timestamp=20220211-070017-0600]"
  ```
3. Comma-separated symbol lists for some indicators (from Value-Added Processor (VAP)):
  
  
  
  - Top-N symbols are maximally above or below the average market
  - Top-N of advance/declined issues
  
  
  
  Example:
  
  
  
  ```
  =Configuration EventSymbol Version Configuration
  Configuration $TOP10G/Q 1612818599 "AFRM,FLGT,ILMN,LRCX,FCNCA,ZJZZT,COHR,NVAX,NVDA,MSTR rO0ABXQAM0FGUk0sRkxHVCxJTE1OLExSQ1gsRkNOQ0EsWkpaWlQsQ09IUixOVkFYLE5WREEsTVNUUg"
  ```

The Version field contains data for the Configuration version. The version can only increase. This field defines the most current event for the Ticker contract.

[List of properties](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/misc/Configuration.html)

### TextConfiguration

TextConfiguration is a Configuration event with a text payload. It includes additional fields such as time and sequence.

The Version field is used for versioning. When delivered via TICKER, only the latest version is retained.

[List of properties](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/misc/TextConfiguration.html)

### Message

Message is an event that delivers application-specific notifications with an optional attachment. Messages are never conflated and are delivered to all connected subscribers. Messages are not persisted by the system. If a subscriber is not connected when a message is published, the message is not delivered. Message events are intended for notification purposes and should be used together with an external persistence mechanism if reliable delivery is required.

Message events are intended for notification purposes and should not be used as a persistent data transport mechanism.

[List of properties](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/misc/Message.html)

### TextMessage

TextMessage is a Message event with a text payload. It includes additional fields such as time and sequence to distinguish messages.

TextMessage events are never conflated and are delivered to all connected subscribers. They are not persisted by the system.

[List of properties](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/misc/TextMessage.html)

## Profile

A Profile is an event that provides the security instrument description. It represents the most recent information that is available about the traded security on the market at any given moment of time.

[List of properties](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/Profile.html)

## Calculated

### Candles

Candles provide a snapshot of aggregated market data for a specific time period, showing the opening, high, low, and closing prices (OHLC), along with additional metrics like volume, bid/ask volume, and implied volatility. They are used for charting and analyzing price trends and market activity in defined intervals, offering a clear visual representation of market movements.

[List of properties](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/candle/Candle.html)

### Greeks

Greek ratios, or simply Greeks, are differential values that show how the price of an option depends on other market parameters: on the price of the underlying asset, its volatility, etc. Greeks are used to assess the risks of customer portfolios. Greeks are derivatives of the value of securities in different axes. If a derivative is very far from zero, then the portfolio has a risky sensitivity in this parameter.

[List of properties](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/option/Greeks.html)

:::note
Only real‑time Greeks are available via API. If you require a historical extraction of the event, contact your sales manager.
:::

### Series

A series event is a snapshot of computed values that are available for all option series for a given underlying symbol based on the option prices on the market. It represents the most recent information that is available about the corresponding values on the market at any given moment of time.

[List of properties](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/option/Series.html)

### TheoPrice

Theo price is a snapshot of the theoretical option price computation that is periodically performed by dxPrice model-free computation. dxFeed does not send recalculations for all options at the same time, so we provide you with a formula so you can perform calculations based on values from this event.

[List of properties](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/option/TheoPrice.html)

A model may assume that underlyings for all options has the same dividends and interest. And it may be different for all options. The model passes all the parameters to use the formula.

:::note
Only real‑time TheoPrice are available via API. If you require a historical extraction of the event, contact your sales manager.
:::

### Underlying

An Underlying event is a snapshot of computed values that are available for an option underlying symbol based on the options prices on the market.

[List of properties](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/option/Underlying.html)

Please find more detailed information at [Options Analytics Solution](/data/calculated-data/options-analytics-solutions/#options-analytics-solutions).
