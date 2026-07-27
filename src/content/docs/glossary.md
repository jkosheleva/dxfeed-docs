---
title: "Glossary"
paligoOriginId: "144490"
---

## Overview

This glossary provides an overview of key terms used across dxFeed products, including market data, data delivery, analytics, and infrastructure. It focuses on commonly used concepts in dxFeed B2B solutions.

Core concepts reflect the underlying data infrastructure, delivery mechanisms, and analytics used by institutional clients and partners.

Retail solutions (also referred to as B2B2C or get) are built on top of this infrastructure and are [documented separately](/dxfeed-retail-products/dxfeed-retail-products-glossary/#dxfeed-retail-products-glossary).

:::note
Use browser search (Ctrl+F) to quickly find specific terms.
:::

## Core concepts and data delivery

<table>
<tr><th>Term</th><th>Description</th></tr>
<tr><td colspan="2"><strong>Core entities</strong></td></tr>
<tr><td>Instrument / Symbol / Security / Asset / Ticker</td><td>Financial instrument such as stock, future, option, CFD, or other asset</td></tr>
<tr><td>Symbol description</td><td>Human-readable instrument name</td></tr>
<tr><td colspan="2"><strong>Snapshot and subscription</strong></td></tr>
<tr><td>Subscription</td><td>Request to receive market data for specific symbols or event types</td></tr>
<tr><td>Snapshot (state)</td><td>Representation of data at a specific point in time</td></tr>
<tr><td>Snapshot (file)</td><td>File containing persisted application state, typically used for recovery</td></tr>
<tr><td>Snapshot request</td><td>Request for current known state of data at a point in time rather than full event-by-event stream</td></tr>
<tr><td>Empty snapshot</td><td>Snapshot response that contains no data for requested symbol, event type, or subscription scope</td></tr>
<tr><td colspan="2"><strong>Data distribution</strong></td></tr>
<tr><td>Quote Distribution (QD)</td><td>Protocol and data model used for real-time market data distribution</td></tr>
<tr><td>Quote Distribution System (QDS)</td><td>High-performance Java library implementing QD for real-time market data distribution</td></tr>
<tr><td>QD Transport Protocol (QTP)</td><td>Wire transport protocol used for QD data exchange. It handles schema negotiation, heartbeats, and bidirectional data and subscription message flow</td></tr>
<tr><td>Financial Information eXchange (FIX)</td><td>Standard protocol for financial data exchange</td></tr>
<tr><td>WebSocket (WS)</td><td>Bidirectional communication protocol for real-time data streaming</td></tr>
<tr><td>Server-Sent Events (SSE)</td><td>Unidirectional streaming protocol from server to client</td></tr>
<tr><td colspan="2"><strong>Data delivery contracts</strong></td></tr>
<tr><td>Contract (QD)</td><td>Data delivery mode in QD that defines how market data is stored and delivered to consumers. It includes Ticker, Stream, and History contracts<br/><a href="/data-services/real-time-and-delayed-services/qds-tool/#delivery-contracts">Learn more</a></td></tr>
<tr><td>Ticker (data contract)</td><td>QD contract that delivers latest value per symbol. Intermediate updates may be replaced by newer ones (auto-conflation).<br/>Use cases: trading screens, dashboards, real-time quotes</td></tr>
<tr><td>Stream (data contract)</td><td>QD contract that delivers every event sequentially without conflation<br/>Use cases: trade logging, audit trails, tape recording</td></tr>
<tr><td>History (data contract)</td><td>QD contract for time-indexed data that typically starts with snapshot and continues with incremental updates<br/>Use cases: charts, time-series, order book reconstruction</td></tr>
<tr><td>Conflation</td><td>Technique that reduces data volume by keeping the latest value and discarding intermediate updates. It happens automatically in ticker and may also be applied in other delivery flows depending on configuration</td></tr>
<tr><td colspan="2"><strong>Connectivity and distribution</strong></td></tr>
<tr><td>dxLink</td><td>dxFeed client-facing connectivity and streaming technology used to deliver market data to external consumers<br/><a href="/market-data-api/dxlink/#dxlink">Learn more</a></td></tr>
<tr><td>Multiplexor (mux, mx)</td><td>Market data distribution component that aggregates upstream feeds and redistributes them to downstream clients or systems</td></tr>
<tr><td>Backbone / Upstream</td><td>Upstream market data sources or the upstream layer of on-prem multiplexors and distribution topology</td></tr>
<tr><td>Streaming connection</td><td>Persistent client connection used to receive real-time or incremental updates continuously</td></tr>
<tr><td>Session</td><td>Logical authenticated client interaction with API or streaming service, often associated with connection state and permissions</td></tr>
<tr><td>Reconnect</td><td>Process of re-establishing client connection after disconnect, timeout, or network failure</td></tr>
<tr><td>Connection drop</td><td>Unexpected interruption of active client connection</td></tr>
<tr><td colspan="2"><strong>Security and access</strong></td></tr>
<tr><td>Authentication</td><td>Process of verifying identity of client, user, or application</td></tr>
<tr><td>Authorization</td><td>Process of determining what authenticated client, user, or application is allowed to access</td></tr>
<tr><td>Entitlements</td><td>Set of permissions that determines which exchanges, products, symbols, event types, or environments client, user, or application is allowed to access.<br/>It is related but distinct from authentication and authorization</td></tr>
<tr><td>Access token</td><td>Credential used by client to authenticate API requests for limited period of time. <a href="/data-services/real-time-and-delayed-services/token-based-authorization/#token-based-authorization">Learn more</a> about Token-Based Authorization<br/>Synonym: API token</td></tr>
<tr><td colspan="2"><strong>Latency</strong></td></tr>
<tr><td>Latency</td><td>Delay between an event and its delivery</td></tr>
<tr><td>Data latency</td><td>Time delay between market event occurring upstream and same event being delivered to consumer</td></tr>
<tr><td>End-to-end latency</td><td>Total delay from source to client</td></tr>
<tr><td>Upstream latency</td><td>Delay between event occurring at exchange or provider and that event reaching dxFeed infrastructure</td></tr>
<tr><td>Downstream latency</td><td>Delay between data entering dxFeed infrastructure and same data being delivered to client or downstream system</td></tr>
<tr><td>Time to First Data (TTFD)</td><td>Elapsed time between connection establishment, authentication, or subscription and first useful market data event received by client</td></tr>
<tr><td>Data gap</td><td>Missing period in market data series where expected updates, trades, quotes, or candles are absent</td></tr>
</table>

## Market data

<table>
<tr><th>Term</th><th>Description</th></tr>
<tr><td>Quote</td><td>Market data update representing current top-of-book state for instrument, including bid and ask prices<br/>Common industry terms: L1, BBO (Best Bid and Offer)</td></tr>
<tr><td>Bid / Ask</td><td>Highest buy price and lowest sell price currently available for instrument</td></tr>
<tr><td>TimeAndSale</td><td>Stream of individual trade events with timestamps, prices, and sizes</td></tr>
<tr><td>Real-time (RT)</td><td>Market data delivered without delay</td></tr>
<tr><td>Delayed data</td><td>Market data delivered with a time delay, typically 15 minutes or more depending on exchange terms</td></tr>
<tr><td>Historical data</td><td>Market data from past time periods, typically used for backtesting, charting, and research</td></tr>
<tr><td>Tick</td><td>Single market data update representing trade, quote, or order book change</td></tr>
<tr><td>Tick data</td><td>Time-ordered sequence of individual market data events such as trades or quotes, without candle or bar aggregation.<br/>Also TickData is a dxFeed service for historical extractions. See <a href="/data-services/historical-services/how-to-request-tick-data/#how-to-request-tick-data">How to Request Tick Data</a></td></tr>
<tr><td>Intraday data</td><td>Market data aggregated or recorded within trading day at intervals smaller than one day</td></tr>
<tr><td>Daily data</td><td>Market data aggregated into day-based intervals, typically one bar or record per trading day</td></tr>
<tr><td>End of Day (EOD)</td><td>Market data aggregated for a full trading day.<br/>For example, an automatic daily data extraction</td></tr>
<tr><td colspan="2"><strong>Event types</strong></td></tr>
<tr><td>Quote event</td><td>dxFeed event type representing quote data<br/><a href="/data-model/market-events/dxfeed-api-market-events/#quote">Learn more</a></td></tr>
<tr><td>TimeAndSale event</td><td>dxFeed event type representing time and sale data<br/><a href="/data-model/market-events/dxfeed-api-market-events/#timeandsale">Learn more</a></td></tr>
<tr><td>Trade event</td><td>dxFeed event type representing trade data<br/><a href="/data-model/market-events/dxfeed-api-market-events/#trade">Learn more</a></td></tr>
<tr><td>Greeks event</td><td>dxFeed event type representing option Greeks data<br/><a href="/data-model/market-events/dxfeed-api-market-events/#greeks">Learn more</a></td></tr>
<tr><td colspan="2"><strong>Order book</strong></td></tr>
<tr><td>Price Level Book (PLB) / Full Order Depth (FOD) / Full Order Book (FOB)</td><td>Full list of buy and sell orders in market<br/>Common industry terms:</td></tr>
<tr><th>dxFeed term</th><th>Common industry term</th></tr>
<tr><td>Price Level Book (PLB)</td><td>L2 / MBP (Market By Price)</td></tr>
<tr><td>Full Order Depth (FOD)</td><td>L3 / MBO (Market By Order)</td></tr>
<tr><td>Full Order Book (FOB)</td><td>Enhanced Order Book (EOB)</td></tr>
<tr><td>Depth of Market (DOM)</td><td>View of market liquidity showing orders at multiple price levels</td></tr>
<tr><td>Price Level (PL)</td><td>Specific price point in order book</td></tr>
<tr><td colspan="2"><strong>Market state</strong></td></tr>
<tr><td>National Best Bid and Offer (NBBO)</td><td>Best available bid and ask prices across market</td></tr>
<tr><td>Cross</td><td>Market condition where bid price exceeds ask price</td></tr>
<tr><td>Stale Data</td><td>Market data that is no longer updating as expected and may not reflect current market state</td></tr>
<tr><td>Tape (QD Tape)</td><td>Recorded stream of market data that can be replayed</td></tr>
</table>

## Trading sessions

For detailed information about trading sessions and schedules, see [Trading Hours](/data-services/real-time-and-delayed-services/trading-hours/#trading-hours)

| Term | Description |
| --- | --- |
| Regular Trading Hours (RTH) | Standard exchange hours |
| Extended Trading Hours (ETH) | Pre-market and after-hours trading period |
| Global Trading Hours (GTH) | Extended global trading period |
| Trading Hours Only (THO) | Data limited to trading hours only.<br/>For example, candles limited to trading hours |

## Instruments

<table>
<tr><th>Term</th><th>Description</th></tr>
<tr><td>Contract for Difference (CFD)</td><td>Derivative instrument that allows trading price movements without owning the underlying asset</td></tr>
<tr><td>Continuous futures</td><td>Synthetic instrument combining consecutive futures contracts into a single continuous series</td></tr>
<tr><td>Warrant</td><td>Derivative security giving holder right to buy or sell underlying instrument under defined conditions</td></tr>
<tr><td>Exchange-Traded Fund (ETF)</td><td>Fund traded on an exchange similarly to stock</td></tr>
<tr><td colspan="2"><strong>Options-related terms</strong></td></tr>
<tr><td>Index Option</td><td>Option whose underlying is market index rather than individual stock or future</td></tr>
<tr><td>0 DTE</td><td>0 days to expiration</td></tr>
<tr><td>ITM / OTM / ATM (option)</td><td>In-the-money, out-of-the-money, and at-the-money</td></tr>
<tr><td>HIRO (Index)</td><td>Hedging Impact Real-Time index measuring aggregate hedging pressure from options market makers on underlying asset</td></tr>
<tr><td colspan="2"><strong>Markets and asset classes</strong></td></tr>
<tr><td>Forex (FX)</td><td>Foreign exchange market</td></tr>
<tr><td>Crypto (CX)</td><td>Cryptocurrency market</td></tr>
</table>

## Analytics and fundamentals

<table>
<tr><th>Term</th><th>Description</th></tr>
<tr><td colspan="2"><strong>Option analytics</strong></td></tr>
<tr><td>Greeks</td><td>Option risk measures describing sensitivity to price, volatility, time, and other parameters</td></tr>
<tr><td>Delta</td><td>Option Greek measuring sensitivity of option value to changes in underlying price</td></tr>
<tr><td>Gamma</td><td>Option Greek measuring how delta changes as underlying price changes</td></tr>
<tr><td>Theta</td><td>Option Greek measuring sensitivity of option value to passage of time</td></tr>
<tr><td>Vega</td><td>Option Greek measuring sensitivity of option value to changes in implied volatility</td></tr>
<tr><td>Rho</td><td>Option Greek measuring sensitivity of option value to changes in interest rates</td></tr>
<tr><td colspan="2"><strong>Corporate actions</strong></td></tr>
<tr><td>Corporate Actions (CA)</td><td>Events that affect securities, such as dividends, splits, or spin-offs</td></tr>
<tr><td>CD</td><td>Regular cash dividend corporate action subtype</td></tr>
<tr><td>SC</td><td>Special cash dividend corporate action subtype</td></tr>
<tr><td>SS</td><td>Stock split corporate action subtype</td></tr>
<tr><td>SD</td><td>Stock dividend corporate action subtype</td></tr>
<tr><td>SP</td><td>Spin-off corporate action subtype</td></tr>
<tr><td colspan="2"><strong>Volatility metrics</strong></td></tr>
<tr><td>IV</td><td>Implied volatility</td></tr>
<tr><td>HV</td><td>Historical volatility</td></tr>
<tr><td>SV</td><td>Statistical volatility</td></tr>
<tr><td>IVR</td><td>Implied volatility rank</td></tr>
<tr><td colspan="2"><strong>Pricing models</strong></td></tr>
<tr><td>Bjerksund-Stensland (BJS) Model</td><td>Option pricing model used for American-style options</td></tr>
<tr><td>Black-Scholes (BS) Model</td><td>Widely used option pricing model primarily for European-style options</td></tr>
<tr><td colspan="2"><strong>Fundamentals</strong></td></tr>
<tr><td>Earnings Per Share (EPS)</td><td>Company profit divided by number of outstanding shares</td></tr>
<tr><td>Beta</td><td>Metric estimating how strongly security price tends to move relative to a benchmark or broader market</td></tr>
<tr><td>Dividend</td><td>Distribution paid by company or fund to holders of security</td></tr>
<tr><td>Ex-dividend date</td><td>Date on which buyer is no longer entitled to receive next announced dividend</td></tr>
<tr><td>Ex-Dividend Amount</td><td>Dividend amount associated with ex-dividend event for security</td></tr>
<tr><td>Upcoming Dividend</td><td>Dividend information announced in advance for future ex-dividend or payment cycle</td></tr>
</table>

## Identifiers and symbology

<table>
<tr><th>Term</th><th>Description</th></tr>
<tr><td colspan="2"><strong>Identifiers</strong></td></tr>
<tr><td>Financial Instrument Global Identifier (FIGI)</td><td>Globally unique identifier for financial instruments. See <a href="https://www.openfigi.com/">OpenFIGI</a></td></tr>
<tr><td>CUSIP</td><td>US security identifier</td></tr>
<tr><td>ISIN</td><td>International security identifier</td></tr>
<tr><td>Classification system for financial instruments (CFI)</td><td>Classification system for financial instruments</td></tr>
<tr><td>Reuters Instrument Code (RIC)</td><td>Identifier used by Refinitiv</td></tr>
<tr><td>Exchange Price Information Code (EPIC)</td><td>Instrument identifier used by some data providers.<br/>Example: IG</td></tr>
<tr><td>OPOL</td><td>Official Original Place of Listing</td></tr>
<tr><td>Instrument Profile Format (IPF)</td><td>Format used to describe instrument metadata. <a href="/data-model/reference-data/instrument-profile-format/#instrument-profile-format">Learn more</a></td></tr>
</table>

## Data formats and storage

<table>
<tr><th>Term</th><th>Description</th></tr>
<tr><td colspan="2"><strong>Storage and replay</strong></td></tr>
<tr><td>Compressed Data Format (CDF)</td><td>Compressed file format used for storing market data</td></tr>
<tr><td>Tape</td><td>QD data file that can be saved and replayed by qds-tools. See <a href="/data-services/real-time-and-delayed-services/qds-tool/#qds-tool">QDS Tool</a></td></tr>
<tr><td>Backfill</td><td>Process of restoring, reloading, or correcting missing or inaccurate historical data</td></tr>
<tr><td colspan="2"><strong>Filters and query parameters</strong></td></tr>
<tr><td>QD filter</td><td>Part of QD connection string that filters inbound or outgoing messages</td></tr>
<tr><td>IPF filter</td><td>Part of QD filter that refers to specific IPF stored locally or available at URL</td></tr>
<tr><td>fromTime</td><td>Request parameter or boundary timestamp indicating start time for historical data retrieval</td></tr>
<tr><td>Timestamp</td><td>Time value associated with market data event or historical record</td></tr>
</table>

## Charting and aggregation

| Term | Description |
| --- | --- |
| Chart data | Historical or streaming data intended for chart visualization, typically in candle form |
| Candle | Aggregated chart data record representing open, high, low, close, and usually volume for a defined interval. [Learn more](/data-services/aggregated-services/) |
| Bar | Aggregated market data interval used in charting |
| OHLC | Open, High, Low, Close — four core price values of a candle or bar |

## Cloud and infrastructure

<table>
<tr><th>Term</th><th>Description</th></tr>
<tr><td>Amazon Web Services (AWS)</td><td>Cloud computing platform providing infrastructure and services</td></tr>
<tr><td>Google Cloud Platform (GCP)</td><td>Cloud infrastructure platform by Google</td></tr>
<tr><td>Oracle Cloud Infrastructure (OCI)</td><td>Cloud infrastructure platform by Oracle</td></tr>
<tr><td colspan="2"><strong>AWS core services</strong></td></tr>
<tr><td>Elastic Compute Cloud (EC2)</td><td>Cloud computing platform providing infrastructure and services in AWS</td></tr>
<tr><td>Simple Storage Service (S3)</td><td>Object storage in AWS</td></tr>
<tr><td>Identity and Access Management (IAM)</td><td>Service controlling permissions and access to AWS resources</td></tr>
<tr><td>Virtual Private Cloud (VPC)</td><td>Isolated AWS network environment</td></tr>
<tr><td colspan="2"><strong>Load balancers</strong></td></tr>
<tr><td>Elastic Load Balancer (ELB)</td><td>Distributes incoming traffic across multiple targets</td></tr>
<tr><td>Application Load Balancer (ALB)</td><td>Routes HTTP and HTTPS traffic based on rules</td></tr>
<tr><td>Network Load Balancer (NLB)</td><td>For low-latency TCP and UDP traffic</td></tr>
<tr><td colspan="2"><strong>Infrastructure terms</strong></td></tr>
<tr><td>Auto Scaling Group (ASG)</td><td>Cloud mechanism for automatically scaling resources</td></tr>
<tr><td>CloudFront (CF)</td><td>Content delivery network</td></tr>
<tr><td>Virtual Machine (VM)</td><td>Software-based machine that runs applications and operating systems</td></tr>
<tr><td>Relational Database Service (RDS)</td><td>Manages cloud database service</td></tr>
<tr><td>Virtual Private Network (VPN)</td><td>Secure network used to access internal infrastructure</td></tr>
<tr><td>DC naming</td><td>Shorthand for data center locations or colocation facilities used in technical and operational discussions, such as NY4, CHI1, CHI2</td></tr>
<tr><td colspan="2"><strong>Service models</strong></td></tr>
<tr><td>Software as a Service (SaaS)</td><td>Software delivery model</td></tr>
<tr><td>Infrastructure as a Service (IaaS)</td><td>Infrastructure delivery model</td></tr>
</table>

## AI and data science

| Term | Description |
| --- | --- |
| Artificial Intelligence (AI) | Field focused on building systems that perform tasks typically associated with human intelligence |
| Machine Learning (ML) | Subset of AI focused on models and algorithms that learn patterns from data |
| Large Language Model (LLM) | Machine learning model trained on large volumes of text, typically used for text generation, summarization, search assistance, and similar tasks |
