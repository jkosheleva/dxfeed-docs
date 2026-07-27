---
title: "Composite Forex Feeds"
paligoOriginId: "26095"
---

## Overview

dxFeed offers a line of composite Forex feeds for a range of currency pairs, emphasizing the feed’s “quality” and methodological transparency. Specifically, each composite feed is a weighted average of a set of source OTC FX feeds (each being a sequence of bid and ask prices), where the source feeds and the weights are carefully selected to optimize the following aspects of the resulting feed:

- Frequency
- Mid-price that aims to reflect the “actual” market state
- Spread width

In other words, the composition aims to average the market data from many providers while assigning the weights in proportion to how much a particular source increases the final quality. This entails, among other things, that the composite feed is “fair” and not “augmented” based on non-existing or implied events in the quote flow.

This product will be of most interest to the customers willing to have real-time access to an accurate outlook on the current state of the FX market.

## Quality metrics

### Frequency

One of the most welcome features for an aggregate feed is to have frequent updates. No consensus exists among market participants on how to define this precisely, but they often feel disturbed when the price does not move for a prolonged period of time (FX markets are expected to be volatile). The composite feed minimizes the time it “idles”, i.e. no bid/ask updates for more than a pre-specified time threshold occur.

### Reference feed distance

It is desirable for the composite FX feed to reflect the “actual” FX market situation. To this end, a reference midpoint feed is utilized, with the following distinguishing properties: for a given currency pair, only large enough quotes affect its mid-price; the bid/ask values from different sources are chosen to minimize the spread width (but only the resulting mid-price is disseminated); additionally, checks are performed to remove erroneous data. The more any other feed is similar to the reference feed, the higher its quality.

### Median spread width

Of two feeds, ceteris paribus, the one with the tighter spread is preferred. This metric is a common proxy to available liquidity, and more liquid environments are generally associated with higher credibility.

## Feed composition

First, for a given currency pair, all available market data providers are considered. The three quality metrics are computed on a representative data sample from each provider. The obtained values are used to rank the providers within each metric, the resulting ranks then are summed. This effectively orders the available source feeds by the sum of ranks.

Next, for K source feeds, different K weight sets are estimated: using the best feed (useful for comparison—it is trivially 1), using the first two best feeds, etc. A weighted average is computed so that it approximates the reference feed as close as possible, i.e. by assigning smaller weights to the feeds that contribute to increasing the distance between the reference and the composite feeds, and vice versa. Technically, the optimization is performed using a numerical routine.

Finally, the three metrics are evaluated on the obtained synthetic feeds and “the best” one is manually selected.

## Dissemination

Composite feed values are recomputed periodically (each T milliseconds), but are disseminated only if the calculated bid or ask prices have changed from the previous time they were computed. The default value for T is 200 milliseconds. It is possible to increase the frequency and set up a separate feed instance if a client requests it. This will incur additional computation and storage costs.

## Example

Suppose 14 source feeds are available for EUR/USD: from EUR/USD:SRC1 to EUR/USD:SRC14. Following the procedure, the source feed ranking is obtained as shown in the illustration below.

![Composite_Forex_Feeds.png](/images/uuid-225eeed3-2f12-46bd-e181-eb7460c2d145.png)

Weights are then assigned iteratively. Let EUR/USD:DXFn denote a composite feed obtained at each step, where n stands for the maximum rank of the constituent source feeds. In the actual data disseminated by dxFeed the symbol is likely to be different.

![Composite_Forex_Feeds_2.png](/images/uuid-33befdf9-c37f-3f9c-d6be-f20bbde63221.png)

For each composite feed EUR/USD:DXF1–14 the three metrics are calculated. No clear winner for this currency pair exists. DXF8 looks like the right choice if high frequency is a priority, and DXF4 might be an option if tighter spreads are preferred. For comparison, in addition to composite feeds based on the optimal set of weights, the performance of equally-weighted composite feeds is measured and presented. For this currency pair, the difference in performance in EUR/USD:DXF1–5 is negligible.

![Composite_Forex_Feeds_3.png](/images/uuid-e9a55f6b-6992-35cd-2b97-f70a41dd7a0b.png)

Finally, it is instructive to compare the selected composite feed against all other source feeds. Clearly, it has the lowest ERMSE, Efreq of all the feeds, although some source feeds do have tighter spreads.

![Composite_Forex_Feeds_4.png](/images/uuid-2009e406-2694-36af-a313-f40e9bb46c83.png)
