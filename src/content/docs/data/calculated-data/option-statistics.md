---
title: "Option Statistics"
paligoOriginId: "136846"
---

## Overview

**OptionStatisticsData** is a calculated market event that provides intraday aggregated option analytics per underlying symbol. The event aggregates trading activity across all option contracts associated with the specified underlying and is intended for real-time analytical use. Statistics are accumulated during the trading day and reset at the beginning of a new trading day. **OptionStatisticsData** provides aggregated metrics describing option trading activity for the specified underlying instrument.

Key metrics include:

- Implied volatility (IV)
- Historical volatility (HV)
- 52-week IV and HV highs and lows
- Call and put traded volume
- Put/Call ratio
- Volume-weighted average price (VWAP)
- Trade distribution by price position
- Delta-grouped volume distribution

For the complete list of fields included in the **OptionStatisticsData** event, see [Fields](#fields) section.

## Fields

| Field | Description |
| --- | --- |
| EventSymbol | Underlying symbol with `type=optstat` qualifier. Example: `AAPL{type=optstat}` |
| EventTime | Time when the event was generated in the dxFeed system |
| _52wIVHigh | Highest observed implied volatility within the rolling 52-week window |
| _52wIVLow | Lowest observed implied volatility within the rolling 52-week window |
| IV | Current implied volatility of the underlying instrument derived from option market data |
| _52wHVHigh | Highest observed historical volatility within the rolling 52-week window |
| _52wHVLow | Lowest observed historical volatility within the rolling 52-week window |
| HV | Current historical volatility of the underlying instrument calculated using a Close-to-Close model based on logarithmic returns of closing prices |
| putVolume | Total traded put option volume accumulated during the current trading day |
| callVolume | Total traded call option volume accumulated during the current trading day |
| putCallRatio | Ratio of `putVolume` to `callVolume` |
| vwap | Volume-weighted average price of the underlying instrument calculated for the current trading day |
| putBelowBidFrac | Fraction of put option volume traded at or below bid |
| putBetweenMarketFrac | Fraction of put option volume traded between bid and ask |
| putOverAskFrac | Fraction of put option volume traded at or above ask |
| callBelowBidFrac | Fraction of call option volume traded at or below bid |
| callBetweenMarketFrac | Fraction of call option volume traded between bid and ask |
| callOverAskFrac | Fraction of call option volume traded at or above ask |
| totalBelowBidFrac | Fraction of total option volume traded at or below bid |
| totalBetweenMarketFrac | Fraction of total option volume traded between bid and ask |
| totalOverAskFrac | Fraction of total option volume traded at or above ask |
| perDeltaPut | Array representing distribution of put volume grouped by absolute delta ranges (delta buckets) |
| perDeltaCall | Array representing distribution of call volume grouped by absolute delta ranges (delta buckets) |

## Calculation methodology

### Intraday aggregation

All volume-based metrics accumulate during the current trading day and reset at the beginning of a new trading day.

Aggregation is performed per underlying instrument and includes all associated option contracts.

### Implied volatility (IV)

The current implied volatility (IV) is derived from market data.

52-week IV high and low values represent extrema observed within a rolling historical window.

If historical data is insufficient, values are based on the available history.

### Historical volatility (HV)

Historical volatility (HV) is calculated using a Close-to-Close model over a rolling window. By default, the window is 20 trading days.

The calculation is based on logarithmic returns of consecutive closing prices:

```
Xi = log(close(day_i) / close(day_{i-1}))
```

In this formula, `i` represents the trading day index.

Historical volatility is derived as the square root of the variance of these returns.

### Volume metrics

`callVolume` and `putVolume` represent cumulative intraday traded volume.

`putCallRatio` is calculated as follows:

```
putVolume / callVolume
```

If `callVolume` is zero, the ratio value is `NaN`.

`vwap` represents the volume-weighted average price of the underlying instrument for the current trading day.

The value is derived from market data for the underlying instrument.

### Trade classification

Option trades are classified based on trade price relative to bid and ask:

- `price ≤ bid`, the trade is classified as below bid
- `bid < price < ask`, the trade is classified as between market
- `price ≥ ask`, the trade is classified as at or above ask (over ask)

Fractions are calculated relative to the total intraday call or put volume.

### Delta grouping

Option trade volume is grouped by absolute delta values.

The absolute delta range is divided into equal buckets. By default, 10 buckets are used.

Trade size contributes to the corresponding delta bucket.

## Data availability

- If no option trades have occurred during the trading day, volume metrics are zero
- If the required historical data is insufficient, volatility metrics are unavailable
- If the input data required for the calculation is missing at calculation time, the corresponding field may contain `NaN`
- Statistics reset at the beginning of a new trading day

:::note
Historical aggregated **OptionStatisticsData** is not available. The event provides only real-time intraday statistics that reset each trading day. For historical trade-level data, see [OptionSale](/data-model/market-events/qd-model-of-market-events/#optionsale).
:::

## Publication frequency

Statistics are recalculated and published periodically during the trading day.

The default publication interval is approximately 1000 milliseconds (1 second).

## Delivery and subscription

OptionStatisticsData is delivered in QD [Message](/data-model/market-events/qd-model-of-market-events/#message) and [Configuration](/data-model/market-events/qd-model-of-market-events/#configuration) records.

The content of Message and Configuration records is the same. Configuration record includes an additional Version field. Message records provide streaming updates, while Configuration records provide the latest available snapshot of OptionStatisticsData.

Delivery channels:

- **STREAM**: Message records (always enabled)
- **TICKER**: Message records (if `postToTicker = true`) and Configuration records

For details about QD records and delivery channels, see [QD Model of Market Events](/data-model/market-events/qd-model-of-market-events/#qd-model-of-market-events).

To subscribe, use the underlying symbol:

```
UNDERLYING{type=optstat}
```

**Example**

```
qds connect <host>:<port> Message "AAPL{type=optstat}"
```

## Delivery data examples

The following example shows **OptionStatisticsData** delivered via Message for AAPL:

```
==TICKER_DATA
Message AAPL{type=optstat}
OptionStatisticsData{
_52wIVHigh=0.4206,
_52wIVLow=0.1773,
iv=0.3733,
_52wHVHigh=0.33978498103790644,
_52wHVLow=0.09409291321904449,
hv=0.2832313197756366,
putVolume=131373.0,
callVolume=175425.0,
putCallRatio=0.748884138520735,
vwap=220.3780913662957,
putBelowBidFrac=0.3933721148433102,
putBetweenMarketFrac=0.27674985926064927,
putOverAskFrac=0.32987802589604054,
callBelowBidFrac=0.4320724439630976,
callBetweenMarketFrac=0.23634446038433404,
callOverAskFrac=0.3315830956525684,
totalBelowBidFrac=0.41541820906900273,
totalBetweenMarketFrac=0.25373245214515056,
totalOverAskFrac=0.3308493387858467,
perDeltaPut=[
0.13950835053480953,
0.15088009007318445,
0.19807093263276412,
0.08821917808219178,
0.19606680427847625,
0.1262450741227247,
0.04526928129104898,
0.014824544942765997,
0.018239819853631076,
0.022675924188403078
],
perDeltaCall=[
0.27743724377257495,
0.13926864258294255,
0.15128971347890927,
0.1257052456097575,
0.17675510470239345,
0.06999438638670424,
0.0209971818527192,
0.019471866724881916,
0.007666267854408954,
0.011414347034708007
]
}
```

The following example shows **OptionStatisticsData** delivered via Configuration for AAPL:

```
==TICKER_DATA
Configuration AAPL{type=optstat} 0
OptionStatisticsData{
_52wIVHigh=0.4206,
_52wIVLow=0.1773,
iv=0.3733,
_52wHVHigh=0.33978498103790644,
_52wHVLow=0.09409291321904449,
hv=0.2832313197756366,
putVolume=131373.0,
callVolume=175425.0,
putCallRatio=0.748884138520735,
vwap=220.3780913662957,
putBelowBidFrac=0.3933721148433102,
putBetweenMarketFrac=0.27674985926064927,
putOverAskFrac=0.32987802589604054,
callBelowBidFrac=0.4320724439630976,
callBetweenMarketFrac=0.23634446038433404,
callOverAskFrac=0.3315830956525684,
totalBelowBidFrac=0.41541820906900273,
totalBetweenMarketFrac=0.25373245214515056,
totalOverAskFrac=0.3308493387858467,
perDeltaPut=[
0.13950835053480953,
0.15088009007318445,
0.19807093263276412,
0.08821917808219178,
0.19606680427847625,
0.1262450741227247,
0.04526928129104898,
0.014824544942765997,
0.018239819853631076,
0.022675924188403078
],
perDeltaCall=[
0.27743724377257495,
0.13926864258294255,
0.15128971347890927,
0.1257052456097575,
0.17675510470239345,
0.06999438638670424,
0.0209971818527192,
0.019471866724881916,
0.007666267854408954,
0.011414347034708007
]
}
```

If insufficient data is available at the time of calculation, a field may contain `NaN`.
