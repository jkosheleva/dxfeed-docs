---
title: "ORCS Historical Order Book Aggregation Service"
paligoOriginId: "910"
---

## Overview

The Order Book Aggregations service (ORCS) provides users with an overview of historical evolution of an order book. It delivers information about order book changes throughout a specified period, minimizing transferred volume by aggregating data.

A one-day order book for `AAPL`, for example, can vary in volume from 200 to 500 MB, effectively making it impossible for such an order book to be useful for terminals: users will most likely (depending on their connection) have to wait for a significant period of time. To mitigate this, we have developed ORCS. This service can compress data while maintaining a sufficient level of granularity, bringing the total volume of an AAPL order book at 1 second granularity to just 20-25 MB. And the volume can be even less if a higher granularity is selected.

## How it works

The ORCS service sends events that show a volume movement for a particular price level starting at the beginning of the trading day. In case a new order is received, ORCS adds its size and count to an object and transmits a new event. When the order is executed or cancelled, ORCS subtracts the significant fields from the total day value. Thus, the volume movement event is generated on each raw order event.

To reduce the amount of transferred data one can subscribe to a higher granularity of volume movements. For example, if you want to display the whole day you most likely don’t need a granularity of less than 30 seconds.

**Procedure**

1. First, ORCS sends a snapshot of all price-levels with non-zero volume for the first requested time point (`fromTime`).
2. When a price-level changes ORCS sends new events with the defined updates granularity. If just one price level has changed through the whole interval, just one event will be delivered.

This snapshot should be supported. If you receive a new event for a price-level, you need to update a previous price level or add a new one.

**Features**

- Significantly reduces data volume to be transferred.
- You can pick the granularity according to your needs and demands.
- It’s possible to request deep historical data.
- Additional feature: granularity request for NBBO data from CTA/UTP to compare with TotalView top of book.
- May be combined with trade-based Price level candles: this allows to build a full historical market data profile for analysis and backtesting.

## Application and use cases

- ORCS may be used in trading terminals and viewers that visualize order books in time.
- Besides order books we store other data that allows to build various indicators using ORCS. We can build Market profile indicators that show non-executed volume inside each price level.
- With ORCS data you can build a heatmap and read liquidity like a map. It shows the historical limit order book (historical liquidity). With the help of the heatmap you can quickly grasp which price levels are trusted by the market and rapidly react to changes in sentiment.
- Our service also allows detecting [order imbalances](https://www.investopedia.com/terms/o/order-imbalance.asp).

## Technical info

### Available feeds

- [Nasdaq TotalView](https://www.dxfeed.com/market-data/equities-etfs/nasdaq-totalview/)
- [Cboe EDGX Depth](https://www.dxfeed.com/market-data/equities-etfs/cboe-edgx-equities/#:~:text=or%20routed%20orders.-,Cboe%20EDGX%20Depth,-Cboe%20EDGX%20Depth)
- [ICE US](https://www.dxfeed.com/market-data/futures/ice-futures-us/)
- [ICE EU](https://www.dxfeed.com/market-data/futures/ice-futures-europe/)
- CME Group ([CME](https://www.dxfeed.com/market-data/futures/cme/), [CBOT](https://www.dxfeed.com/market-data/futures/cbot/), [NYMEX](https://www.dxfeed.com/market-data/futures/nymex/), [COMEX](https://www.dxfeed.com/market-data/futures/comex/))
- [Borsa Istanbul Equities](https://www.dxfeed.com/market-data/equities-etfs/borsa-istanbul-equities/)
- [Borsa Istanbul Futures](https://www.dxfeed.com/market-data/futures/borsa-istanbul-futures/)
- [Eurex](https://www.dxfeed.com/market-data/futures/eurex-futures/)

### Available aggregations

- 1 second
- 5 second
- 15 seconds
- 1 minute
- 1 day
- Сustom aggregations

### History depth

- 2 weeks

### Access

- RMI

For the full description of dxFeed ORCS API, read the corresponding documentation in the Java section of the [dxFeed documentation page](https://www.dxfeed.com/api-documentation/).
