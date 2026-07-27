---
title: "Some Chart Types You Can Build with dxFeed Data"
paligoOriginId: "888"
---

## Overview

This page presents multiple chart types that you can build using the dxFeed Aggregated Data Services. Various platforms define their own ways of displaying this information, and the following examples are only a subset.

## Line, mountain or baseline charts

The simple, basic type of chart, displaying just one data point for each specific moment in time. With the dxFeed Aggregated Data Services, this data point can be not just the price, but also volume, implied volatility or open interest. Any candle type can be used for this purpose depending on the needs (see [Aggregated Services](/data-services/aggregated-services/#aggregated-services) article in the dxFeed Knowledge Base).

![dxfeed-chart-01-line.png](/images/uuid-c4a87e4d-2147-204d-9629-a0ed4e095e75.png)

![dxfeed-chart-02-mountain.png](/images/uuid-586c5b13-bf7a-a12b-bd63-d498ce98bda2.png)

![dxfeed-chart-03-baseline.png](/images/uuid-ffbc6f5c-cdeb-ab3e-e1be-41aa6a1ad8f1.png)

## Bar, candlestick or hollow candlestick chart

Bar or candlestick charts are the most popular chart type, both with professional and non-professional traders.

- The candles displayed on the graph can be [time-](/data-services/aggregated-services/candle-types/#time-based-candles), [tick-](/data-services/aggregated-services/candle-types/#tick-based-candles) or [volume-based](/data-services/aggregated-services/candle-types/#volume-based-candles).
- OHLC prices are defined by the market trades, ask, bid or mark prices — see [how to request the data](/data-services/aggregated-services/candle-types/#price-level-candles) from dxFeed.
- The aggregates can include the events that happened [just during regular trading hours](/data-services/aggregated-services/candle-types/#parameters-that-are-applicable-for-all-types-of-candles) or during both regular and extended trading hours.

![dxfeed-chart-04-bar.png](/images/uuid-e166816e-9dc5-1abb-693e-fa0c536cbfc8.png)

![dxfeed-chart-05-hollow.png](/images/uuid-5cffde43-fe96-6fdb-da48-7002f4049052.png)

![dxfeed-chart-06-candlestick.png](/images/uuid-ca51a222-e8a2-9138-56d4-6e9c5be8ce75.png)

## Point and figure chart

These charts are independent of time and are determined only by price movement:

- The X columns indicate upward price movement.
- The O columns indicate downward price movement Whether an X or an O is drawn depends on the direction of the price movement. A new X/O is drawn after a price moves a specific amount of points, and a new box is drawn after the price changes direction and changes by a user-defined amount.

dxFeed allows you to configure and receive a new candle after any price change - please use [price-based](/data-services/aggregated-services/candle-types/#price-based-candles) and [price-momentum](/data-services/aggregated-services/candle-types/#price-momentum-candles) candles to display the Point and Figure chart. dxFeed candles also allow you to display OHLC and volume of every specific X or O.

![dxfeed-chart-07-point.png](/images/uuid-454bf48e-d476-fd84-f9d6-6c97bfd9be18.png)

## Renko

This is one of the most popular chart types, allowing the viewer to concentrate only on price actions.

This is a type of chart that is built using just the price movement instead of both price and standardized time intervals like most charts. A new brick is created when the price moves a specified price amount, and each one is positioned at a 45-degree angle (up or down) to the prior brick. An "up" brick is typically colored white or green, while a "down" brick is typically colored black or red. Read more on [Investopedia](https://www.investopedia.com/terms/r/renkochart.asp).

dxFeed Aggregated Data Services have [Renko candles](/data-services/aggregated-services/candle-types/#renko-candles) that allow you to define the Renko box size.

![dxfeed-chart-08-renko.png](/images/uuid-b22cbe1d-5b60-ad00-eb3e-331185588467.png)

## Volume delta by price increment chart

The Volume delta by price increment chart displays the bid or ask trade volume per every time-aggregated candlestick. The candlestick is divided into boxes per a specific price increment.

dxFeed provides all of the information required to draw such charts via [price level candles](/data-services/aggregated-services/candle-types/#price-level-candles), that allow you to:

- Define the time-aggregate and the price increment of the candlestick
- Receive bid and ask volumes per every candle

![dxfeed-chart-09-delta.png](/images/uuid-d5e8082c-b44c-e989-cf87-727eb84beb9b.png)

## Cumulative volume charts

Cumulative Delta chart shows the difference between buy and sell volume per a specific time aggregate. The data required for construction can be received via the standard dxFeed [time-based candles](/data-services/aggregated-services/candle-types/#time-based-candles).

![dxfeed-chart-10-cumulative.png](/images/uuid-a386fb3b-83eb-9409-78f2-208de101bf95.png)

## Volume profile chart

Volume Profile provides you with tools for price action and trading volume analyses in parallel. To build charts of this type using dxFeed data:

- Request the standard [time-based](/data-services/aggregated-services/candle-types/#time-based-candles) candles of the required granularity (45 min in the picture below) to display the candle series
- Or request the [price level candles](/data-services/aggregated-services/candle-types/#price-level-candles) of the required granularity (15 hours in the picture below) and price increment to display the volume profile

Every dxFeed candle also carries respective bid/ask volume information, providing you with still more insights.

![dxfeed-chart-15-volumeprofile.png](/images/uuid-082d4569-aa16-3350-df5f-cca94db9d426.png)

## Options expiration frequency chart

The options expiration frequency chart is an advanced chart useful to experienced option traders. It is supported by a limited set of platforms. The chart allows option traders to build such candlestick graphs that the time for aggregation depends on the frequency of option expiration:

- Weekly options expiring on Wednesday will be displayed by weekly-aggregated candles that start on Thursday
- Standard options expiring every 3rd Friday of the month will be displayed by monthly-aggregated candles that start on the 4th Monday of the month

You can use dxFeed [option expiration candles](/data-services/aggregated-services/candle-types/#option-expiration-candles) to display charts of this type.

## Historical market depth chart

Market data contains information not only about realized trades but also about the orders waiting to be matched. Some advanced traders analyze the evolution of the order book, using this data to predict the future price movement.

dxFeed provides a special charting solution named [ORCS](/data-services/aggregated-services/orcs-historical-order-book-aggregation-service/#orcs-historical-order-book-aggregation-service) to present data of this type on a graph. You can draw the Historical Market Depth graphs with any number of price levels and in historical periods receive updates of every price level with predefined frequency. Screenshot from [dxFeed Bookmap platform](https://bookmap.dxfeed.com/) is displayed below:

![heatmap](/images/uuid-9b82e049-03e7-6afc-ed90-14f2a417a436.png)

## More information for your charts

### Volume: CandleVolume, EquiVolume, Arms CandleVolume charts

Volume is a really popular characteristic to be displayed on a chart. There are variations of the popular candlestick chart, including:

- CandleVolume: in addition to the OHLC the respective trading volume is drawn at the bottom of the graph
- EquiVolume: the candlestick width represents the trading volume for the respective period
- Arms CandleVolume: combines the width and the original candle sticks on one chart

![dxfeed-chart-11-equivolume.png](/images/uuid-967c6e94-e193-3442-0cd9-13a3fa5539ee.png)

![dxfeed-chart-12-arms.png](/images/uuid-01337323-2eb5-559f-0ca8-cbfffd9672f5.png)

![dxfeed-chart-14-candlevolume.png](/images/uuid-de4a718c-4db5-69f7-c2a5-fe5d5fe00e1c.png)

### Options, open interest and implied volatility

Every dxFeed options candle contains information about the option’s implied volatility and open interest. This information can be really supportive for option trades if it’s added to the standard candlestick chart or additionally drawn using Line or Mountain charts.
