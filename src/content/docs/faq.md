---
title: "FAQ"
paligoOriginId: "28030"
---

## Data

### Market data delivery

#### Real-time data

##### What delivery options does dxFeed offer for market data transmission?

dxFeed provides various delivery contracts tailored to different needs:

- Ticker (Quote, Trade, Summary, Profile): Offers the most recent known data with minimal delay, ideal for real-time updates.
- Stream (TimeAndSale): Transmits all events losslessly without conflation, suitable for receiving real-time updates without data loss.
- History (Candle, Order): Provides historical event transmission with subsequent updates, suitable for retrieving past data and order book information.

Read more about delivery contracts on the [QDS Tool](/data-services/real-time-and-delayed-services/qds-tool/#qds-tool) page.

##### How to receive market data?

In several ways: through dxLink, which transfers JSON data via a [WebSocket](/market-data-api/data-access-solutions/websocket/#websocket), or via dxFeed proprietary binary protocol, QD (Quote Distribution Protocol), which transmits binary data over TCP.

##### What’s the latency for dxFeed market data feeds?

Our core technology processes a typical event stream at 60 microseconds on average. Delays may result from various factors like the connection quality, the client's code, or the distance between the endpoint and the client.

##### What’s the difference in latency for dxFeed APIs?

Java, C#, and FIX API provide the lowest latency. REST and Python API provide slightly higher latency.

##### How can I measure latency for dxFeed market data feeds?

To measure latency use this QDS command: `qds compare <endpoint1> Quote <symbol> -A <endpoint2> -c stream -s 10`. The **-s** parameter returns statistics for the last _n_ seconds.

Read more about [QDS Tool](/data-services/real-time-and-delayed-services/qds-tool/#qds-tool).

##### Can I receive all data feeds via one endpoint?

Yes. Some data feeds require several endpoints due to technical reasons (e.g., Nasdaq basic and CTA/UTP feeds), and not all data feeds can be merged.

In most cases, having several endpoints will increase the service cost.

##### If I subscribe to the same symbol multiple times, do I need to send multiple unsubscribe requests?

No, a single unsubscribe request is enough.

Each subscription request creates a **topic **identified by the combination of the event type and event symbol. If you send multiple add requests for the same topic, they are treated as updates, not as separate subscriptions. A single remove request for this topic is enough to unsubscribe completely.

##### How many dxLink Feed service channels can I open?

There is no strict limit. However, it is recommended to use a single channel until there is a clear need for another one.

:::note
Avoid opening channels with only a few subscriptions, as this increases resource usage. Multiple channels can be opened within a single connection if different configurations or workloads are required.
:::

Read more about Feed service on the [dxLink](/market-data-api/dxlink/#dxlink) page.

##### When is it advisable to open a new connection to the dxLink Feed service to achieve better throughput?

Open a new connection only if the current one reaches its throughput limit or requires different channel settings.A single dxLink connection can handle up to ~500,000 events per second, depending on available bandwidth.

Read more about Feed service on the [dxLink](/market-data-api/dxlink/#dxlink) page.

##### How many dxLink Feed service subscriptions are allowed within a single connection?

Typical B2C trading apps don't exceed 50,000 subscriptions per user.

The average range is 5,000–15,000 events.

If event types share the same channel configuration (for example, Quotes, Summaries), they can use a single channel.

Read more about Feed service on the [dxLink](/market-data-api/dxlink/#dxlink) page.

##### How can I subscribe to a large set of events in the dxLink Feed service?

To subscribe to a large number of events and symbols, split your subscription requests into smaller chunks: each message shouldn’t exceed 64 KB in size.

For example, to subscribe to 1,000 topics (event + symbol), send five separate subscription messages with 200 topics in each.

dxFeed returns data by batching results across multiple subscriptions and chunks messages to fit within the message size limit, ensuring efficient data delivery and handling.

Read more about Feed service on the [dxLink](/market-data-api/dxlink/#dxlink) page.

##### Where are dxFeed endpoint locations?

dxFeed provides endpoints in major data centers, including Chicago, New York, Frankfurt, Zurich, London, and Istanbul, as well as via global cloud infrastructure.

For more details, see the [Connectivity](https://dxfeed.com/connectivity/) section on our website.

##### How is data compressed?

For historical data, dxFeed has developed an algorithm that uses a compression factor technique to parse, index, and store data in the proprietary Compressed Data Format (CDF) with no data loss.

[Learn more](/data-services/historical-services/#historical-services)

##### What information is available on events and delivery models?

dxFeed provides two models for working with events:

- API event model – used when you work directly with dxFeed APIs. See the [dxFeed API Market Events](/data-model/market-events/dxfeed-api-market-events/#dxfeed-api-market-events) page for the full list of supported event types.
- QD event model – used in QD-based systems. This model has a different structure and applies only in specific integration scenarios. See the [QD Model of Market Events](/data-model/market-events/qd-model-of-market-events/#qd-model-of-market-events) page for details, real-world mapping, and the list of supported events.

Event delivery is defined by delivery contracts (Ticker, Stream, History). Read more about delivery contracts on the [Model of event publishing](/data-model/market-events/model-of-event-publishing/#model-of-event-publishing) page.

##### What is the difference between QD records and dxFeed API events?

- [dxFeed API Market Events](/data-model/market-events/dxfeed-api-market-events/#dxfeed-api-market-events) are the application-level abstraction for receiving market data. The API manages connection, reconnection, conflation, and threading automatically. You connect by URL, subscribe by symbol, and receive typed events such as **Quote**, **Trade**, or **Order** through a listener. This is the recommended path for most applications, with typical throughput up to roughly 100,000 updates per second.
- [QD records](/data-model/market-events/qd-model-of-market-events/#qd-model-of-market-events) are the underlying transport-level data units defined by the QD scheme. Direct access through the QD core API provides finer control and the highest possible throughput up to tens of millions of updates per second, but requires more code and deeper understanding of the data model. This integration path is intended for low-level systems that process very large volumes of market data.

The mapping between events and records is not always one-to-one. A single event class can be backed by several QD records. For example, the Order event spans multiple sources: exchange-specific feeds (`Order#NTV` for [Nasdaq TotalView](https://www.nasdaq.com/solutions/data/equities/nasdaq-totalview), `Order#GLBX` for [CME Globex](https://www.cmegroup.com/solutions/market-access/globex.html), and others) and synthetic books derived from other events.

##### How can I check which fields are available for a specific instrument?

To determine which fields are available for a specific instrument, identify which event types are published for that instrument type with [Event Publishing matrix](/data-model/market-events/model-of-event-publishing/#model-of-event-publishing). Fields are available only for the event types published by the instrument. Fields belonging to unsupported event types will be missing or may return NaN.

Some instrument types, such as FX and CFDs, have additional limitations and do not publish certain event types.

Read more on the [Model of event publishing](/data-model/market-events/model-of-event-publishing/#model-of-event-publishing) page.

##### Why is the Last field missing or NaN for some instruments?

The Last field is available only for instruments that publish **Trade** or **TimeAndSale** events. If these events are not published for a given instrument type, the **Last** field is not available and may return NaN.

Read more on the [Model of event publishing](/data-model/market-events/model-of-event-publishing/#model-of-event-publishing) page.

##### Why is the Volume field unavailable for FX and CFD instruments?

The Volume field is produced only as part of Trade events. FX and CFD instruments do not publish Trade events, so the Volume field is not available for these instruments.

Read more on the [Model of event publishing](/data-model/market-events/model-of-event-publishing/#model-of-event-publishing) page.

##### Why is DayClose available even when Trade events are not published?

**DayClose** is part of the **Summary** event and is not dependent solely on **Trade** events. For instruments that do not publish **Trade** events, **DayClose** may still be populated using official exchange values, if available.

Read more on the [Model of event publishing](/data-model/market-events/model-of-event-publishing/#model-of-event-publishing) page.

##### How does conflation work?

Conflation is the intentional omission of intermediate updates, delivering only the most recent known value for a record. This helps reduce bandwidth and data volume during high market activity while keeping latency low. For example, if quotes _t1_ and _t2_ are received but a newer quote _t3_ arrives before _t2_ is sent, _t2_ is skipped and only _t3_ is delivered. Conflation is applied in Ticker and History contracts, while Stream delivers all events without conflation.

Read more about delivery contracts on the [Model of event publishing](/data-model/market-events/model-of-event-publishing/#model-of-event-publishing) page.

##### Can dxFeed customize aggregation and conflation settings?

Yes, customization is possible. dxFeed market data service supports automatic intelligent conflation, rate throttling, and rate limiting to handle data spikes. These parameters can be configured to match the client’s system performance and bandwidth requirements, ensuring optimal load handling.

#### Aggregated data

##### What aggregation can I get for OHLC data, and how far back does the data go for each interval?

You can get OHLC data for these time intervals: 1 tick, 1 second, 1 minute, 1 hour, and 1 day. Custom intervals are also supported. For instructions on how to request specific intervals, check the [How to request candles](/data-services/aggregated-services/how-to-request-candles/#how-to-request-candles) guide. All intervals you can request are detailed in the [CandleSymbol API documentation](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/candle/CandleSymbol.html).

##### How are Candle events processed?

Candles are sent as snapshots followed by updates, ensuring sequential application of changes.

##### What is a Candle event?

Candle events represent price data over a period, showing open, high, low, close, and volume values. [Learn more](/market-data-api/data-access-solutions/rest/#candle-symbols)

##### Why do some candles have NaN values for open, high, or low?

Some candles may temporarily contain NaN values when there’s not enough market data to calculate all fields. It usually resolves as more data arrives. If the interval ends before that, NaNs may remain. This is expected behavior for trade-based candles.

Quote-based candles (Bid, Ask, Midpoint) are built using available quotes and usually do not contain NaN values.

##### How does alignment work for weekly or monthly candles?

Weekly candles start on Monday, and monthly candles start on the 1st, aligning to the trading period.

##### Why would bidVolume be NaN?

It’s NaN if no new bids were made during that candle’s period.

##### Can dxFeed provide candle data for futures via WebSocket?

Yes, dxFeed supports candle data for futures through [WebSocket](/market-data-api/data-access-solutions/websocket/#websocket). All data available via dxFeed's Java APIs, including candles, can also be accessed via dxLink. dxFeed supports candles for any instrument with available raw data. Read more about [Candle Types](/data-services/aggregated-services/candle-types/#candle-types).

##### Which types of price candles are available?

dxFeed supports multiple price types for candle data, including:

- Last (default) – Built using actual trade prices, representing the last trade price within the interval.
- Bid or Ask-based – Built using quote prices (the highest bid or lowest ask in the interval).
- Midpoint (Mark) – Built using quote prices (the midpoint of bid-ask quotes).

Learn more about candles in the [Aggregated services](/data-services/aggregated-services/#aggregated-services) section.

##### How are candles calculated if there were no trades during the interval?

If no trades occur during a specified candle interval, no candles are generated—this applies to all price types, including Last, Bid, Ask, and Mark. dxFeed does not create empty candles when there is no available data.

Learn more about candles in the [Aggregated services](/data-services/aggregated-services/#aggregated-services) section.

##### What is the difference between =24h and =1d candles?

Although both represent a full-day period, they are built differently:

- `=1d` (daily candle) follows the exchange official trading session and matches its official price and volume statistics.
- `=24h` candle is treated as an intra-day candle. It covers a fixed 24-hour UTC window and is built from individual events (e.g., Quotes, TimeAndSales).

As a result, `=1d` and `=24h` candles may differ in price levels, volume, and event count — even for the same instrument and date.

Learn more about candles in the [Aggregated services](/data-services/aggregated-services/#aggregated-services) section.

##### How are invalid ticks handled in candles?

Invalid ticks are not included in candle price statistics, but for certain feeds they may still contribute to volume-related metrics.

For NYSE & NYSE American (CTS) and Nasdaq (UTDF), additional sale condition checks apply. If those conditions meet certain criteria, the size of the invalid tick is still counted in **volume** and **VWAP** attributes.

[Learn more](/data-model/market-events/timeandsale-sale-conditions/#timeandsale-sale-conditions)

##### Why are some TimeAndSale trades not displayed in intraday charts?

Some trades are intentionally excluded from intraday candle calculation because they are reported late or refer to transactions that occurred earlier. This prevents misleading price spikes or wicks on intraday candles.

Some of these trades may still update daily statistics, such as the High and Low values in the Summary event.

[Learn more](/data-model/market-events/timeandsale-sale-conditions/#timeandsale-sale-conditions)

##### Why can’t I request quote-based candlestick data for sub-minute intervals?

The availability of quote-based candlestick data for sub-minute intervals depends on the data feed used to construct the candles. Some data feeds may only support quote-based aggregation for intervals of one minute or longer. To check the specific aggregation options available for your data feed, please use [Contact Sales](https://dxfeed.com/contact-sales/) form on the website for further assistance.

Learn more about candles in the [Aggregated services](/data-services/aggregated-services/#aggregated-services) section.

##### How are historical candles sorted via WebSocket?

Candles are always sent in descending order by timestamp and cannot be reordered.

##### Is API access provided for historical and aggregated data?

Yes, we provide API access for multiple types of data, including:

- Real-time data: Our APIs deliver real-time market data across various asset classes, ensuring the most up-to-date information.
- Historical data is generally available for various assets, such as index options. Most options data goes back to 2009, but the exact timeframe can vary depending on the underlying asset.
- Aggregated data, such as candle data with mark prices, is available starting with 1-minute intervals. We also support custom aggregations, k-line, or candle format, using price types like the midpoint of bid-ask quotes upon request.

##### Can the first event be a transaction but not part of a snapshot?

Yes, this can happen due to network issues or re-subscriptions, but events are queued and processed correctly afterward.

##### What does the candle timestamp mean?

It marks the start of the session or period, like the first day of a month for monthly candles.

##### What happens if a month starts on a weekend or holiday?

The timestamp will still be the first day of the month, even if no trading occurred.

Learn more about candles in the [Aggregated services](/data-services/aggregated-services/) section.

##### Can I get volume-based or tick-based candles?

Yes, dxFeed delivers various candle types, including volume-based and tick-based candles, along with many others. See the full list of types here: [Candle types](/data-services/aggregated-services/candle-types/#candle-types).

#### Historical data

##### What historical data is available for options, and what types of data are included?

dxFeed provides historical data for options with the highest granularity, including TimeAndSales, Trades, Quotes, Summaries, Theoretical Prices, and more — for every option under a specified underlying. The data follows the [QD model of market events](/data-model/market-events/qd-model-of-market-events/#qd-model-of-market-events) and is available through various services, such as charting tools and the Historical Data Lake Service.

##### How far back does the historical data go?

Historical data is available starting from 1991 for many instruments. Tick-level historical data is generally available from 2009.

The exact availability may vary depending on the asset class and instrument. Please contact your dxFeed sales manager for details specific to your subscription or trial access.

##### Why can’t I request quote-based candlestick data for sub-minute intervals?

The availability of quote-based candlestick data for sub-minute intervals depends on the data feed used to construct the candles. Some data feeds may only support quote-based aggregation for intervals of one minute or longer. To check the specific aggregation options available for your data feed, please use [Contact Sales](https://dxfeed.com/contact-sales/) form on the website for further assistance.

Learn more about candles in the [Aggregated services](/data-services/aggregated-services/) section.

##### Is API access provided for historical and aggregated data?

Yes, we provide API access for multiple types of data, including:

- Real-time data: Our APIs deliver real-time market data across various asset classes, ensuring the most up-to-date information.
- Historical data is generally available for various assets, such as index options. Most options data goes back to 2009, but the exact timeframe can vary depending on the underlying asset.
- Aggregated data, such as candle data with mark prices, is available starting with 1-minute intervals. We also support custom aggregations, k-line, or candle format, using price types like the midpoint of bid-ask quotes upon request.

##### Can I extract historical Greeks?

Historical Greeks are not provided via API downloads. For historical data extractions, please contact your sales manager.

##### Can I request historical data in bulk?

It depends on the type of data:

- Historical tick data: You can request tick-level data in small batches through our APIs. See [Historical Data Access](/data-services/historical-services/historical-data-access/#historical-data-access)
- Candles: You can request historical candles in small batches, mainly for deep charting needs. See [Candlewebservice](/data-services/aggregated-services/candlewebservice/#candlewebservice)

For large-scale data access, please reach out to support.

##### What options are available for accessing historical data?

Historical market data can be delivered through multiple options:

- [Java](/market-data-api/data-access-solutions/multiplatform-api/#multiplatform-api) / [JavaScript](/market-data-api/data-access-solutions/javascript-api/#javascript-api) APIs for streaming, historical access, or market replay
- [REST](/market-data-api/data-access-solutions/rest/#rest) services for on-demand tick, audit, instrument profile, and other data
- [Candlewebservice](/data-services/aggregated-services/candlewebservice/#candlewebservice) for Candle and TimeAndSale data over time periods, sorted appropriately
- [dxFeed Historical Data Lake](https://dxfeed.com/solutions/dxfeed-historical-data-lake/) (HDL) for cloud-based access without massive downloads, with integration via Amazon Data Exchange
- Bulk delivery of petabyte-scale datasets through AWS Snowball
- Data warehouse integrations with Apache Spark, Athena, RedShift, Snowflake, Databricks, and DuckDB for large-scale analytics

[Learn more](/data-services/historical-services/historical-data-access/#historical-data-access)

### Reference data

#### What is IPF?

Instrument Profile Format (IPF) is a service that retrieves a list of securities and related information.

#### Where can I see the full list of symbols I have access to?

1. Go to IPF web service.
2. Use the provided credentials to check your subscription.
3. Use [https://tools.dxfeed.com/ipf?help](https://tools.dxfeed.com/ipf?help) for help.

#### What to do if IPF instruments are unavailable?

For Websocket: Ensure that the symbol is entered correctly.

#### Why can’t I find a symbol in IPF?

This can happen because of one or more of the following:

- The symbol is out of your scope
- The symbol name has changed
- The symbol is no longer traded
- Not all instruments are traded in real-time (e.g., CME block trades)

Please submit a ticket to the [Help Desk](https://portal.dxfeed.com) if you encounter any problems.

#### What does the 'X' in the CFI field in IPF files mean?

The 'CFI' field in IPF files returns 'X' for CME futures contracts due to CME's deviation from the [ISO 10962 standard](https://en.wikipedia.org/wiki/ISO_10962) for Classification of Financial Instruments. dxFeed passes through the CFI values directly from CME without calculation. CME has confirmed they do not strictly follow ISO standards for these codes.

For more details on possible CME CFI code values, see [CME CFI Codes](https://cmegroupclientsite.atlassian.net/wiki/spaces/EPICSANDBOX/pages/457673319/MDP+3.0+-+CFICode+Table+of+Values).

#### How can I find a list of available parameters for IPF?

Use [https://tools.dxfeed.com/ipf?help](https://tools.dxfeed.com/ipf?help) with [demo credentials](#what-are-the-demo-credentials-for-ipf).

#### What are the demo credentials for IPF?

Use demo/demo credentials to check IPF examples.

#### Why do the futures contract month letter, MMY, and Expiration Date sometimes differ between CME and ICE, and how should I interpret them?

The relationship between the contract month letter, `MMY`, and `EXPIRATION_DATE` depends on the exchange and, in some cases, the product class.

For CME, `MMY` generally matches the contract month. For some ICE futures, `MMY` reflects the expiration month instead, so it may differ from the contract month letter.

Always use the `EXPIRATION_DATE` field to determine when a contract stops trading.

[Learn more](/data-model/symbology-guide/#symbology-guide) about exchange symbology.

#### What symbol format is required for accurate data retrieval?

Symbol format depends on data type. Please refer to dxFeed [Symbology Guide](/data-model/symbology-guide/#symbology-guide) for a detailed explanation. Some tips:

- **Options**: Use the [OPRA format](/data-model/symbology-guide/equities-futures-options-and-spreads-symbology/us-formats/#date-modifiers) for U.S. options.
- **Futures and Equities**: Follow specific exchange formats.
- **API Calls**: Properly handle padding and extra characters.

### Calculations and corporate actions

#### How are Greeks calculated?

Black-Scholes and Bjerksund-Stensland models are used to calculate Greeks.

[Learn more](/data/calculated-data/dxliboptions-library/#dxliboptions-library)

#### Are dividends and splits taken into account in the calculations?

Yes, dividends and splits apply to stocks and options.

#### How are historical pricing changes managed?

The system applies splits, dividends, earnings adjustments, and symbol change events to historical data through a smooth transition for unchanged symbols. For symbols with changes, the corresponding events are processed to ensure accurate charting.

#### How are pre-IPO pricing estimates obtained?

Estimated prices are received via text messages from NYSE and Nasdaq during IPOs. New symbols and IPOs are added to the system upon the occurrence of events and the receipt of information from NYSE or Nasdaq. Updates to historical data follow a semi-automatic procedure that occurs between 03:00 and 07:00 ET, depending on the timing of corporate actions published by the source.

#### How can I determine the open price of a stock?

The system first seeks the official open price. If this is unavailable, the open price can be obtained from the first valid trade of the day, from the consolidated event, or from the summary record.

#### How are daily high/low, 52-week high/low, and average volume calculated?

Daily high and low statistics are sourced from the exchange, while the 52-week high and low are derived from daily data. Average volume information is not explicitly provided; however, the VWAP (Volume Weighted Average Price) value can offer additional insights. Refer to the relevant record for details on where this data is contained.

Learn more about [QD Model of Market Events](/data-model/market-events/qd-model-of-market-events/#qd-model-of-market-events).

#### What does dxFeed receive from Nasdaq on the day of the IPO?

For Nasdaq IPOs, dxFeed may receive free format messages prior to the start of trading hours. This is our log format. Example:

```
I 201117 075025.790 [Receiver-bin-ny-utdf-06-B] SIACLine-bin-ny-utdf-06-B - Administrative message: IPO PRICE AT 09:50 DGNS 1000....NASD
```

It says here that the DGNS IPO should start trading (or probably just start accepting bids) at 09:50 and the IPO price is set at $10. We then post this IPO price to Summary.PrevDayClosePrice. When the quotes start going out, you can read the net change relative to the IPO price. In the morning of the IPO, the exchange accepts applications for DGNS. At the end of this process, all received orders are matched with each other and published as one mega-deal. After that, normal trading begins. Here is an example for LAM stocks:

```
#=TimeAndSale EventSymbol EventTime Time Sequence ExchangeCode Price Size BidPrice AskPrice SaleConditions Flags
TimeAndSale DGNS 20201117-102657.311-0500 20201117-102657-0500 311:1 Q 11.23 1032536 NaN NaN "@O X" 22532
```

Read more about the [Nasdaq IPO process](https://www.nasdaqtrader.com/content/productsservices/trading/IPOCross_fs.pdf). dxFeed starts getting data from the exchange on step 4. The exchange determines the exact execution time.

#### When does dxFeed begin distributing market data for a stock after its IPO?

All US exchanges begin publishing market data on the day of IPO. That means, new symbols appear in our data feed only after they have started trading. On the day of the IPO, the new symbol first appears in [IPF](/data-model/reference-data/instrument-profile-format/#instrument-profile-format). A little later, once public trading begins, the quotes begin ticking. The date and time are not provided in the data feed beforehand.

:::note
New instruments begin trading on all US exchanges simultaneously.
:::

That said, we suggest following the exchange’s and/or company’s Twitter accounts since information is usually published there.

:::note
To start receiving market data for the requested symbol on time, be sure you subscribe to it beforehand. For this, you’ll need to wait for dxFeed IPF to update, or use the symbol published on the exchange website.
:::

#### How does dxFeed publish IPO information?

The dxFeed API behavior regarding how IPO information is published at the feed level for CTA/UTP, Nasdaq, Cboe, Borsa Istanbul, and OTCBB exchanges is as follows:

- An indicative Summary event (DayId=0) where only the PrevDayClosePrice field is filled with the IPO price.
- An indicative Trade event for DayId=0, which will include:
  
  
  
  - Price: containing the IPO price.
  - Size: set to NaN as an indicative value.

#### What to do if IPO symbols are unavailable?

- Check a symbol on an exchange
- Check if a symbol is available for public trading
- Check a symbol in [IPF](https://tools.dxfeed.com/ipf)

[Learn more about IPO](https://www.nasdaq.com/solutions/listings/markets/americas/ways-to-list/nasdaq-ipo-execution)

:::note
Symbol will be available in [IPF](https://tools.dxfeed.com/ipf) as soon as the exchange starts a public trading session.
:::

#### How does an IPO work at NYSE?

Learn about the NYSE IPO process [here](https://www.nyse.com/publicdocs/nyse/listing/IPO_infographic.pdf). dxFeed starts getting data from the exchange on step 9. The exchange determines the exact execution time.

#### Can I extract historical Greeks?

Historical Greeks are not provided via API downloads. For historical data extractions, please contact your sales manager.

## Access and support

### Trial and access

#### What is the subscription limit for instrument quotes in dxFeed?

We adjust the limit based on your usage profile over time.

#### Are there any data limits?

The limit on real-time data: the HTTP request header should not exceed 128k for the REST API.

The limit on historical data is historical data market depth. Historical data is available from 2009 for some markets. Some events can be requested only 1000 ticks back.

[Learn more](/market-data-api/data-access-solutions/rest/#rest)

#### What data can I access with dxFeed?

You can access basic instrument information via the [Symbol Lookup](https://symbol-lookup.dxfeed.com/) page. Read more in the [Symbology Guide](/data-model/symbology-guide/#symbology-guide) for more details on how symbols are generated and distributed.To see how reference data for instruments is distributed, use the [IPF Web Service](/data-model/reference-data/ipf-webservice/#ipf-webservice) (credentials: demo/demo). This tool supports filtering and search options.

#### Where can I see the full list of symbols I have access to?

1. Go to IPF web service.
2. Use the provided credentials to check your subscription.
3. Use [https://tools.dxfeed.com/ipf?help](https://tools.dxfeed.com/ipf?help) for help.

#### Do I need a license to use fundamental data?

To use [Morningstar](https://www.morningstar.com/) and [Borsa Istanbul](https://verdauat.borsaistanbul.com/) you need to purchase a license. Please use [Contact Sales](https://www.dxfeed.com/contact-us/) form on the website for details.

#### I already have a production connection, can I create a new trial?

We can add a new trial to your existing production connection. You have no restrictions during the trial period, apart from the duration.

#### How do I switch to production?

Your sales manager will contact you for your feedback when your trial is over. You have up to five business days to decide if you want to switch to production. You will need to sign our data services Customer Agreement contract to complete the switching process.

#### How long is the dxFeed trial?

The trial period is two weeks.

#### Do I need to get an exchange license?

You need to purchase an exchange license if you represent a company.

### Technical support and account

#### Where can I find my account information?

You can find your account information in your welcome letter, or by contacting your account manager.

#### How can I reach dxFeed Support Team?

1. Go to the [Help Desk](https://portal.dxfeed.com).
2. Fill out the form.
3. Wait for the support team to reply to your ticket.

#### Can I use dxFeed API on more than one PC at a time?

Yes, but only from whitelisted IP addresses.

#### How can I change my scope?

Please contact your sales manager or use [Contact Sales](https://www.dxfeed.com/contact-us/) form on the website.
