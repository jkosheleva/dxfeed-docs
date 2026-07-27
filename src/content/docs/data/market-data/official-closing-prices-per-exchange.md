---
title: "Official closing prices per exchange"
paligoOriginId: "861"
---

## Overview

The final closing price on any exchange may deviate from the price of the last trade because of corrections and adjustments made by the exchange itself. With this product we provide an official closing price per exchange. It allows you to identify all stages of the closing price value change by tracking all updates from the market close to the adjustments of corporate actions.

## Benefits

With this product, analysts can identify:

- The reasons behind the differences between the final closing price and the market’s last trade price
- The frequency that exchanges perform corrections of the closing price with
- The ways the closing prices get adjusted if a corporate action happens

## What do we provide

We deliver the data daily in three files:

- Non-adjusted closing prices equal to the price of the last trade on the market
- Official closing prices declared by the exchange at the end of the trading day
- Final closing prices formed by the exchange as it incorporates the effect of a corporate action into the official closing price

As a part of this product, dxFeed also provides additional data, providing more power for analysis and investigation:

- Paid dividends
- Split adjustment factor per instrument

## Example

The sample files provide more insights on the distributed data structure and close price evolution. They are built as of 13 of April 2020 and cover the following cases:

- No dividends and no splits occurred on 20200414 (the next trading day to as of date). `Symbol=TEST_NO`.
- Only dividend were paid on 20200414. `Symbol=TEST_CD`. Let’s assume that payment value was **0.5**.
- Only stock split occurred on 20200414. `Symbol=TEST_SS`. Let’s assume that multiplier was **2**.
- Both dividend and stock split were declared on 20200414. `Symbol=TEST_CD_SS`. It’s a rare case but still may happen. Let’s assume that payment value was **0.5** and multiplier was **2**.

In the sample files you can find the exact data format provided in every case:

- [20200413-1645.txt](https://downloads.dxfeed.com/kb/20200413-1645.txt)
- [20200413-2015.txt](https://downloads.dxfeed.com/kb/20200413-2015.txt)
- [20200414-0600.txt](https://downloads.dxfeed.com/kb/20200414-0600.txt)
