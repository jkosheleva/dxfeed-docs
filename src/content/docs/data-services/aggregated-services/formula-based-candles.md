---
title: "Formula-Based Candles"
paligoOriginId: "125725"
---

## Overview

Formula-based candles allow you to apply formulas to price series and build candles that represent spreads, ratios, or synthetic instruments.

This approach is commonly used in professional trading and risk management.

Typical use cases include:

- Compare performance of two or more instruments to see which stock outperforms (for example, Coke vs Pepsi).
- Monitor price differences between related instruments to manage exposure.
- Analyze instruments with different expiries to detect arbitrage opportunities.
- Create custom indices like `(AAPL + MSFT)/2 - QQQ` to compare portfolio vs index.
- Analyze relative strength between instruments.
- Adjust weights, balance exposure, and protect positions.
- Build and test multi-leg strategies across different instruments.

## How formula-based candles work

A formula subscription is represented by a symbol starting with the **=** prefix. When you request such a symbol, dxFeed calculates candles in real time by applying the specified formula to the component instruments.

:::note
Some spreads are already available in the IPF as predefined instruments. If you request such a spread (for example, `=/1YF27:XNYM+/1YG27:XNYM+/1YH27:XNYM`), candles are not calculated in real time but streamed directly from the exchange.
:::

Rules:

- When dividing symbols, enclose at least one (or both) components in brackets.
- Brackets are allowed in both expressions and symbols.
- Numeric division needs to be enclosed in brackets.
- Escape special characters using braces or backslash: **!**, **:**, **;**, **|**, **&**, *****, **?**, **+**, **(**, **)**, **{**, **}**, **<**, **>**, **~**, **“**, **’**, **`**.
- Escape the input string, if it starts with a lower-case character (from **a** to **z**).

Examples:

`=RUT-100*/GCZ25:XCEC`

`=20*/M2KU25:XCME-2*/MNQU25:XCME`

`=200*AAPL-QQQ`

`=V-20*MA`

`=/CLH25:XNYM-/CLF27:XNYM`

### Limitations

There are some limitations to formula components:

- Only the simple math operations are allowed (**+**, **-**, *****, **/**).
- Brackets can be used with both expressions and symbols.
- Spread symbols cannot be used inside formulas.
- A time-based **CandlePeriod** has to be specified when using raw symbols (a time-based candle record used in QD can also be used here) The time period can be set either in the record (`Trade.1min AAPL`) or in the symbol (`Candle AAPL{=m}`). Supported **CandlePeriods**:
  
  
  
  - s (seconds), e.g. `=AAPL+GOOG{=2s}`
  - m (minutes), e.g. `=AAPL+GOOG{=3m}`
  - h (hours), e.g. `=AAPL+GOOG{=h}`
  - d (days), e.g. `=AAPL+GOOG{=10d}`
  - w (weeks), e.g. `=AAPL+GOOG{=w}`
  - mo (months), e.g. `=AAPL+GOOG{=3mo}`
  - y (years), e.g. `=AAPL+GOOG{=y}`
- Candle aggregation rule: a candle is built only if all formula components have at least one valid trade event during the period.
- The following fields are excluded from computations: **count**, **volume**, **vwap**, **bidVolume**, **askVolume**, **implVolatility**, **openInterest**.
- When schedule-related attributes are used (**CandleSession**, **CandleAlignment**), all formula components must share the same schedule.

## Examples

### Candlewebservice

```
https://tools.dxfeed.com/candledata?records=Candle&symbols==[(]AAPL[%2B]GOOG[)]/2%7B=d%7D&start=20220501-000000-0000&stop=20220505-000000-0000
```

### qds-tool

```
java -Ddxscheme.wide=true -jar lib/qds-tools.jar connect localhost:7368 Trade.1hour "=AAPL\+GOOG" 20191212 -c history
```

**Output**

```
=Trade.1hour    EventSymbol     Time                    Sequence   Count   Open        High        Low         Close       Volume  VWAP   BidVolume AskVolume   ImpVolatility
Trade.1hour     =AAPL+GOOG      20191216-150000+0100    0          NaN     1633.7      1635.0019   1629.42     1631.76     NaN     NaN    NaN       NaN         NaN             EventFlags=SNAPSHOT_BEGIN
Trade.1hour     =AAPL+GOOG      20191216-140000+0100    0          NaN     1633.85     1634.29     1624.7401   1632.3501   NaN     NaN    NaN       NaN         NaN
Trade.1hour     =AAPL+GOOG      20191216-130000+0100    0          NaN     1631.48     1632.4899   1631.23     1632.0999   NaN     NaN    NaN       NaN         NaN
Trade.1hour     =AAPL+GOOG      20191216-120000+0100    0          NaN     1631.93     1632.28     1631.85     1632.13     NaN     NaN    NaN       NaN         NaN
Trade.1hour     =AAPL+GOOG      20191214-010000+0100    0          NaN     1624.2199   1624.35     1624.15     1624.35     NaN     NaN    NaN       NaN         NaN
Trade.1hour     =AAPL+GOOG      20191214-000000+0100    0          NaN     1625.14     1625.15     1622.93     1622.9301   NaN     NaN    NaN       NaN         NaN
Trade.1hour     =AAPL+GOOG      20191213-230000+0100    0          NaN     1625.03     1625.19     1622.83     1622.99     NaN     NaN    NaN       NaN         NaN
Trade.1hour     =AAPL+GOOG      20191213-220000+0100    0          NaN     1623.1      1624.79     1621.04     1624.5999   NaN     NaN    NaN       NaN         NaN
Trade.1hour     =AAPL+GOOG      20191213-210000+0100    0          NaN     1625.4001   1627.1      1621.22     1623.09     NaN     NaN    NaN       NaN         NaN
Trade.1hour     =AAPL+GOOG      20191213-200000+0100    0          NaN     1624.5275   1625.95     1622.75     1625.035    NaN     NaN    NaN       NaN         NaN
Trade.1hour     =AAPL+GOOG      20191213-190000+0100    0          NaN     1624.65     1625.23     1622.69     1624.35     NaN     NaN    NaN       NaN         NaN
Trade.1hour     =AAPL+GOOG      20191213-180000+0100    0          NaN     1622.32     1625.98     1621.49     1624.7107   NaN     NaN    NaN       NaN         NaN
Trade.1hour     =AAPL+GOOG      20191213-170000+0100    0          NaN     1617.6      1624.8399   1616.46     1622.41     NaN     NaN    NaN       NaN         NaN
Trade.1hour     =AAPL+GOOG      20191213-160000+0100    0          NaN     1620.8139   1627.8931   1616.82     1618.0279   NaN     NaN    NaN       NaN         NaN
Trade.1hour     =AAPL+GOOG      20191213-150000+0100    0          NaN     1618.534    1622.35     1616.37     1620.39     NaN     NaN    NaN       NaN         NaN
Trade.1hour     =AAPL+GOOG      20191213-140000+0100    0          NaN     1623.79     1625.64     1622.0442   1625.21     NaN     NaN    NaN       NaN         NaN
Trade.1hour     =AAPL+GOOG      20191213-130000+0100    0          NaN     1627.08     1627.32     1622.2      1623        NaN     NaN    NaN       NaN         NaN
Trade.1hour     =AAPL+GOOG      20191213-120000+0100    0          NaN     1632.12     1632.33     1629.21     1629.39     NaN     NaN    NaN       NaN         NaN
Trade.1hour     =AAPL+GOOG      20191213-000000+0100    0          NaN     1622.31     1624.39     1622.31     1624.39     NaN     NaN    NaN       NaN         NaN
Trade.1hour     =AAPL+GOOG      20191212-230000+0100    0          NaN     1621.94     1623.7      1621.94     1623.5      NaN     NaN    NaN       NaN         NaN
Trade.1hour     =AAPL+GOOG      20191212-220000+0100    0          NaN     1621.73     1623.4      1621.42     1623.14     NaN     NaN    NaN       NaN         NaN
Trade.1hour     =AAPL+GOOG      20191212-210000+0100    0          NaN     1616.23     1625.7      1613.53     1620.76     NaN     NaN    NaN       NaN         NaN
Trade.1hour     =AAPL+GOOG      20191212-200000+0100    0          NaN     1616.394    1618.065    1609.74     1615.8471   NaN     NaN    NaN       NaN         NaN
Trade.1hour     =AAPL+GOOG      20191212-190000+0100    0          NaN     1615.79     1618.9456   1614.83     1616.46     NaN     NaN    NaN       NaN         NaN
Trade.1hour     =AAPL+GOOG      20191212-180000+0100    0          NaN     1615.04     1617.53     1610.43     1615.46     NaN     NaN    NaN       NaN         NaN
Trade.1hour     =AAPL+GOOG      20191212-170000+0100    0          NaN     1623.4602   1623.99     1611.92     1615.1155   NaN     NaN    NaN       NaN         NaN
Trade.1hour     =AAPL+GOOG      20191212-160000+0100    0          NaN     1623.49     1628.3349   1620.27     1623.13     NaN     NaN    NaN       NaN         NaN
Trade.1hour     =AAPL+GOOG      20191212-150000+0100    0          NaN     1612.99     1625.13     1610.98     1623.02     NaN     NaN    NaN       NaN         NaN
Trade.1hour     =AAPL+GOOG      20191212-140000+0100    0          NaN     1612.65     1614.68     1611.67     1612.31     NaN     NaN    NaN       NaN         NaN
Trade.1hour     =AAPL+GOOG      20191212-130000+0100    0          NaN     1619.19     1619.28     1617.26     1617.43     NaN     NaN    NaN       NaN         NaN
Trade.1hour     =AAPL+GOOG      20191212-120000+0100    0          NaN     1616.23     1616.88     1616.23     1616.62     NaN     NaN    NaN       NaN         NaN
Trade.1hour     =AAPL+GOOG      20191212-110000+0100    0          NaN     1617.13     1617.36     1616.23     1616.23     NaN     NaN    NaN       NaN         NaN
Trade.1hour     =AAPL+GOOG      20191212-100000+0100    0          NaN     1617.89     1617.97     1617.17     1617.38     NaN     NaN    NaN       NaN         NaN
Trade.1hour     =AAPL+GOOG      20191212-010000+0100    0          NaN     1617.48     1617.53     1617.18     1617.53     NaN     NaN    NaN       NaN         NaN
Trade.1hour     =AAPL+GOOG      20191212-000000+0100    0          NaN     NaN         NaN         NaN         NaN         NaN     NaN    NaN       NaN         NaN             EventFlags=REMOVE_EVENT,SNAPSHOT_END
```

### dxfeed-api

There is a sample called [com.dxfeed.acs.sample.SpreadSymbolSubscriptionSample](https://dxfeed.jfrog.io/artifactory/maven/com/dxfeed/acs-api/) located in acs-api:

```java
public static void main(String[] args) throws InterruptedException {
   if (args.length < 2) {
      System.out.println("Usage: 'java -cp acs-api\\lib\\* com.dxfeed.acs.sample.SpreadSymbolSubscriptionSample " +
         "<endpointAddress> <symbol>'");
      System.out.println("   <address> - endpoint address");
      System.out.println("   <symbol>  - symbol to request");
      System.exit(0);
   }
   String endpointAddress = args[0];
   String symbol = args[1];
   DXEndpoint endpoint = DXEndpoint.create().connect(endpointAddress);
   DXFeed feed = endpoint.getFeed();
   CountDownLatch eventLatch = new CountDownLatch(1);
   long fromTime = Timing.GMT.today().day_start - 10 * TimeUtil.DAY;
   CandleSymbol candleSymbol = CandleSymbol.valueOf(
      symbol,
      CandlePeriod.DAY // specify time based candle period
   );
   DXFeedTimeSeriesSubscription<Candle> sub = feed.createTimeSeriesSubscription(Candle.class);
   sub.addEventListener(events -> {
      System.out.println("Received: " + events);
      eventLatch.countDown();
   });
   sub.setFromTime(fromTime);
   sub.setSymbols(candleSymbol);
   eventLatch.await(5, TimeUnit.SECONDS);
}
```

**Input parameters**

`localhost:7368 =AAPL+GOOG`

**Output**

```
Received: [Candle{=AAPL+GOOG{=d}, eventTime=0, eventFlags=0x4, time=20191216-010000.000, sequence=0, count=0, open=1633.5, high=1636.28, low=1629.65, close=1635.2201, volume=NaN, vwap=NaN, bidVolume=NaN, askVolume=NaN, impVolatility=NaN, openInterest=NaN},Candle{=AAPL+GOOG{=d}, eventTime=0, eventFlags=0x0, time=20191213-010000.000, sequence=0, count=0, open=1619.41, high=1628.3931, low=1614.8, close=1622.98, volume=NaN, vwap=NaN, bidVolume=NaN, askVolume=NaN, impVolatility=NaN, openInterest=NaN},Candle{=AAPL+GOOG{=d}, eventTime=0, eventFlags=0x0, time=20191212-010000.000, sequence=0, count=0, open=1613.72, high=1628.3349, low=1607.821, close=1621.73, volume=NaN, vwap=NaN, bidVolume=NaN, askVolume=NaN, impVolatility=NaN, openInterest=NaN},Candle{=AAPL+GOOG{=d}, eventTime=0, eventFlags=0x0, time=20191211-010000.000, sequence=0, count=0, open=1619.65, high=1622.3, low=1611.17, close=1615.79, volume=NaN, vwap=NaN, bidVolume=NaN, askVolume=NaN, impVolatility=NaN, openInterest=NaN},Candle{=AAPL+GOOG{=d}, eventTime=0, eventFlags=0x0, time=20191210-010000.000, sequence=0, count=0, open=1610.1, high=1620.045, low=1601.9, close=1613.14, volume=NaN, vwap=NaN, bidVolume=NaN, askVolume=NaN, impVolatility=NaN, openInterest=NaN},Candle{=AAPL+GOOG{=d}, eventTime=0, eventFlags=0x0, time=20191209-010000.000, sequence=0, count=0, open=1608.04, high=1630.25, low=1602.75, close=1610.48, volume=NaN, vwap=NaN, bidVolume=NaN, askVolume=NaN, impVolatility=NaN, openInterest=NaN},Candle{=AAPL+GOOG{=d}, eventTime=0, eventFlags=0x8, time=20191206-010000.000, sequence=0, count=0, open=1600.92, high=1615.0, low=1600.74, close=1611.33, volume=NaN, vwap=NaN, bidVolume=NaN, askVolume=NaN, impVolatility=NaN, openInterest=NaN}]
```

**Input parameters**

`localhost:7368 =AAPL/(GOOG)`

**Output**

```
Received: [Candle{=AAPL/(GOOG){=d}, eventTime=0, eventFlags=0x4, time=20191216-010000.000, sequence=0, count=0, open=0.204202, high=0.2052616, low=0.204202, close=0.2052616, volume=NaN, vwap=NaN, bidVolume=NaN, askVolume=NaN, impVolatility=NaN, openInterest=NaN},Candle{=AAPL/(GOOG){=d}, eventTime=0, eventFlags=0x0, time=20191213-010000.000, sequence=0, count=0, open=0.2013873, high=0.204143, low=0.2013873, close=0.204143, volume=NaN, vwap=NaN, bidVolume=NaN, askVolume=NaN, impVolatility=NaN, openInterest=NaN},Candle{=AAPL/(GOOG){=d}, eventTime=0, eventFlags=0x0, time=20191212-010000.000, sequence=0, count=0, open=0.1989539, high=0.2010413, low=0.1989539, close=0.2010413, volume=NaN, vwap=NaN, bidVolume=NaN, askVolume=NaN, impVolatility=NaN, openInterest=NaN},Candle{=AAPL/(GOOG){=d}, eventTime=0, eventFlags=0x0, time=20191211-010000.000, sequence=0, count=0, open=0.1989947, high=0.201313, low=0.1989947, close=0.201313, volume=NaN, vwap=NaN, bidVolume=NaN, askVolume=NaN, impVolatility=NaN, openInterest=NaN},Candle{=AAPL/(GOOG){=d}, eventTime=0, eventFlags=0x0, time=20191210-010000.000, sequence=0, count=0, open=0.2002236, high=0.2002236, low=0.198991, close=0.1996639, volume=NaN, vwap=NaN, bidVolume=NaN, askVolume=NaN, impVolatility=NaN, openInterest=NaN},Candle{=AAPL/(GOOG){=d}, eventTime=0, eventFlags=0x0, time=20191209-010000.000, sequence=0, count=0, open=0.2017877, high=0.2017877, low=0.1980132, close=0.1986662, volume=NaN, vwap=NaN, bidVolume=NaN, askVolume=NaN, impVolatility=NaN, openInterest=NaN},Candle{=AAPL/(GOOG){=d}, eventTime=0, eventFlags=0x8, time=20191206-010000.000, sequence=0, count=0, open=0.200594, high=0.201929, low=0.200459, close=0.201929, volume=NaN, vwap=NaN, bidVolume=NaN, askVolume=NaN, impVolatility=NaN, openInterest=NaN}]
```
