---
title: "Getting Started"
paligoOriginId: "125174"
---

## Overview

Welcome to dxFeed Knowledge Base. dxFeed is a leading data solutions and index management provider for the global financial industry, both in traditional and crypto markets.

This guide will help you get started with dxFeed trial data, understand your integration path, and navigate the documentation effectively.

If you do not have access yet, please contact the [dxFeed sales team](https://dxfeed.com/contact-sales/) to request trial access.

## Step 1: Choose your integration path

Select the interface based on your use case. If you're not sure which one to choose, your dxFeed sales manager will help you finalize the integration details during onboarding.

If you do not have access credentials yet, you can test the demo dxLink.WebSocket endpoint. See [Step 4: Test your connection](#step-4-test-your-connection)

If you’re just getting started and don’t have a dxFeed contact yet, reach out to the [dxFeed sales team](https://dxfeed.com/contact-sales/).

### B2B vs B2B2C (Retail)

- **B2B**: If you prefer to integrate with dxFeed as a data vendor directly (via API), this model gives you full control over licensing, pricing, and data delivery.
- **B2B2C (Retail)**: If you only need to display market data to your end users, dxFeed will manage most interactions with exchanges, billing, and delivery. We handle compliant user onboarding, subscription management, and technical integration — allowing you to focus on your core product and customer experience.

dxFeed Retail products:

- [Retail eShop](https://get.dxfeed.com/): A standalone B2C portal where end users can manage their own market data subscriptions.
- [Retail Services Platform](/dxfeed-retail-products/retail-services-platform/#retail-services-platform): A B2B solution for integrating market data subscriptions directly into your products.

### Integration methods

The table below provides an overview of available integration methods across both types of clients.

| Method | Description | Typical Use Case |
| --- | --- | --- |
| WebSocket (dxLink) | Real-time data streaming over WebSocket, easy integration, cross-platform | Modern apps, mobile, lightweight clients |
| QD (Quote Distribution Protocol) | Binary over TCP, maximum performance | High-frequency trading and infrastructure |
| Multiplatform API | Pre-built libraries for Java, C++, .NET, Swift, Go | Server-side systems, desktop environments |
| JavaScript API | For browser-based and frontend applications | Web apps, mobile web |
| FIX / REST | Industry standard protocols for trading and workflows | Trading systems, order management |

Read more in the [Data Access Solutions](/market-data-api/data-access-solutions/#data-access-solutions) section.

## Step 2: Access credentials

Once your onboarding is complete, you’ll receive a welcome letter with all necessary connection details.

Check your welcome letter — it contains all the information you need to get started:

- **Connection credentials**: endpoint URLs, IP addresses, login, and password.
- **Instrument Profile (IPF)**: A URL listing all the symbols available to you: [https://tools.dxfeed.com/ipf](https://tools.dxfeed.com/ipf). Use the connection credentials to access the IPF.

If you didn’t receive the welcome letter, check your spam folder or contact your sales manager.

:::note
If you do not have access credentials yet, you can use the demo environment described in [Step 4: Test your connection](#step-4-test-your-connection)
:::

## Step 3: Explore available instruments

Use the Instrument Profile (IPF) to view the full list of instruments available to you. It includes symbol names, types, and metadata and is available at [https://tools.dxfeed.com/ipf](https://tools.dxfeed.com/ipf). Enter the access credentials from the email to log in.

This page reflects the entitlements included in your subscription or trial agreement. Your Service Agreement and welcome email also specify feed types available to you and data coverage.

For additional information, refer to:

- [IPF Webservice documentation](/data-model/reference-data/ipf-webservice/#ipf-webservice)
- [Instrument Profile Format guide](/data-model/reference-data/instrument-profile-format/#instrument-profile-format)
- [Symbology Guide](/data-model/symbology-guide/#symbology-guide)

## Step 4: Test your connection

You can verify that your setup works using a testing tool that matches your integration type. We recommend starting with the Debug console (dxLink.WebSocket) to verify your connection. The demo endpoint is available without access credentials.

- Debug console — a testing tool for dxLink.WebSocket connections, including connection management, error handling, authorization, data exchange for different models.
- dxFeed Viewer — downloadable desktop application for diagnostic and monitoring over QD protocol.
- dxFeed Webservice — browser-based demo interface for REST and JavaScript API testing.

Not sure which tool to use?

- If you're connecting to a URL that starts with `wss://`, you're using WebSocket — use the Debug Console.
- If you received an IP address and port, you're using the QD protocol — use dxFeed Viewer.
- If you're using REST API or JavaScript in the browser, use the dxFeed Webservice.

All demo environments are available without credentials, but we recommend using the credentials from your welcome email for full access.

### Debug console (dxLink.WebSocket)

Use the Debug console to test dxLink.WebSocket connections. This tool simulates a client that connects via the dxLink protocol and handles connection setup, authorization, error handling, and real-time data subscriptions.

Use the demo dxLink.WebSocket endpoint `wss://demo.dxfeed.com/dxlink-ws` to test your own client.

Steps:

1. Open the [Debug Console](https://demo.dxfeed.com/market-data/dxlink-ws/debug/).
2. Click **Connect**.
3. Click **FEED Channel**.
4. Copy a symbol from your [IPF](https://tools.dxfeed.com/ipf) (e.g., AAPL, ESZ4, BTC/USD):
  
  
  
  1. Select event type.
  2. (Optional) Set fromTime.
  3. Click **Add**.

### dxFeed Viewer

dxFeed Viewer is a desktop tool used to test streaming data from QD-based endpoints. It supports:

- Quotes, Trades, Candles, TimeAndSales
- Profiles, Order books, Market Summary, and more

Steps:

1. Install and launch the [dxFeed Viewer](https://dxfeed.com/demo/).
2. Enter endpoints from your welcome letter.
3. Copy a symbol from your [IPF](https://tools.dxfeed.com/ipf) (e.g., AAPL, ESZ4, BTC/USD).
4. Click **Connect** to start streaming data.

You can also preload symbols in the configuration file (dxviewer.cfg) if needed. See the [dxFeed Viewer Guide](/visualization/dxfeed-viewer-guide/#dxfeed-viewer-guide) for details.

:::note
dxFeed Viewer is intended for viewing market data and does not provide an API. To connect to a QD endpoint programmatically, see the [Market Data API Tutorials](/market-data-api/market-data-api-tutorials/#market-data-api-tutorials).
:::

### dxFeed Webservice

Use the dxFeed Webservice to test your setup in a browser. It provides both streaming and snapshot data via [JavaScript and REST APIs](https://demo.dxfeed.com/webservice/).

:::note
The dxFeed Webservice is provided for testing legacy REST and JavaScript APIs. For new integrations, use the [Debug console (dxLink.WebSocket)](#debug-console-dxlinkwebsocket)
:::

Steps:

1. Open the [REST demo](https://demo.dxfeed.com/webservice/rest-demo.jsp) page.
2. Copy a symbol from your [IPF](https://tools.dxfeed.com/ipf) (e.g., AAPL, ESZ4, BTC/USD).
3. Select parameters: data source, time range, format type, and HTTP method.
4. Click **Go** to start streaming data.

:::note
The dxFeed demo Webservice is for testing purposes with delayed data. For production, we recommend integrating via API. Contact your sales manager for details.
:::

Useful links:

- [REST demo](https://demo.dxfeed.com/webservice/rest-demo.jsp) for snapshot & streaming
- [JavaScript API Playground](https://dxfeed.github.io/dxfeed-js-api/playground/subscription) for browser-based testing of JS API
- [REST API Documentation](https://demo.dxfeed.com/webservice/rest/help) for parameters, formats, and endpoint details

## Step 5: Understand the data model

dxFeed delivers market data via a unified event-driven model.

Depending on your access, you may receive:

- Quotes
- Trades
- Candles
- Order books
- Market summaries
- TimeAndSales
- Profiles

Read more about all available event types on the [Market Events](/data-model/market-events/#market-events) page.

## Step 6: Key documentation topics

Here are some of the most important topics included in our documentation:

- [Instrument Profile Format](/data-model/reference-data/instrument-profile-format/#instrument-profile-format)
- [Market Events](/data-model/market-events/#market-events)
- [Symbology Guide](/data-model/symbology-guide/#symbology-guide)
- [Charting aggregations services](/data-services/aggregated-services/candle-types/#candle-types)
- [Historical Services](/data-services/historical-services/#historical-services)
- [Fundamental data](/data/fundamentals/#fundamentals)
- [Java API](https://docs.dxfeed.com/dxfeed/api/index.html)

## Step 7: Troubleshooting

If you're having trouble, try the following:

1. Double-check your connection credentials from the welcome letter.
2. Review your symbol entitlements in the [IPF](https://tools.dxfeed.com/ipf).
3. Test connectivity via the [dxFeed Viewer](https://demo.dxfeed.com/webservice/).

Still stuck? Visit our [Help Desk](https://portal.dxfeed.com) or contact your dxFeed sales manager or the [dxFeed sales team](https://dxfeed.com/contact-sales/).
