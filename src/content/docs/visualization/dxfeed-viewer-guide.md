---
title: "dxFeed Viewer Guide"
paligoOriginId: "945"
---

## Overview

dxFeed Viewer is a desktop diagnostic tool for monitoring dxFeed market data. It allows viewing the main streaming data classes provided by dxFeed: **Quote** (bid/ask), **Trade** (last sale), **Summary** (OHLC, Previous Close, Open Interest), **Profile** (Description, Trading Halts), **Order** (price levels or full order book) and **TimeAndSale** information together with a tick chart.

dxFeed Viewer supports:

- Regional quotes. For example `AAPL&Q`, `AAPL&V`
- Custom symbols

You can change or add symbols in two ways:

- Replace the currently selected symbol using the symbol selector in the top bar
- Add symbols to the [Watch list](#watch-list) to monitor multiple instruments simultaneously

If no data is available for a symbol, dxFeed Viewer shows no market data state but keeps the symbol in the widget.

## Installation

Requirements:

- 64-bit operating system (Windows 64-bit or macOS ARM/x64)
- Network connectivity to dxFeed endpoints

To install the application:

1. Download the latest [dxFeed Viewer installer](https://www.dxfeed.com/demo/).
2. Run the installer and follow the on-screen instructions.
3. Open **dxFeed Viewer**.

:::note
On first launch, dxFeed Viewer uses the default endpoints configuration and opens the main workspace with standard widgets.
:::

## Connection

dxFeed Viewer connects to a configured endpoint and uses it as the data source for widgets. Active endpoints act as data sources for all widgets: dxFeed Viewer subscribes to market data from all enabled endpoints and displays available data across the application.

By default, dxFeed Viewer is initialized with the demo endpoint: `demo.dxfeed.com:7300`.

To connect to the feed:

1. Open the endpoint configuration from the top bar.
2. Configure endpoints and enable them using the green toggle button (see the [Adding and enabling endpoints](#adding-and-enabling-endpoints) section for step-by-step instructions).
3. Check that the endpoint address is shown as active in the top bar.

![dxViewer.png](/images/uuid-434315c6-ac9e-2e05-f176-036b873dcb13.png)

## Managing endpoints

You can change the configured endpoints or add new ones based on your environment and access rights.

Endpoints are managed using the **top bar** in dxFeed Viewer.

### Adding and enabling endpoints

To configure endpoints:

1. Open the endpoint configuration in the **top bar**.
2. In the **Endpoints** dialog, enter an endpoint address in the following format: `endpoint:port`. For example, `prod.dxfeed.com:7300`.
3. Click **Add** to save the endpoint.
4. Repeat this step to add additional endpoints as needed.
5. Enable or disable endpoints using the green toggle button next to the endpoint name.

When an endpoint is enabled, dxFeed Viewer:

- Subscribes to market data for all symbols used in widgets.
- Displays available data from all active endpoints.

If all endpoints are disabled, dxFeed Viewer stops receiving data until at least one endpoint is enabled.

:::note
dxFeed Viewer allows using multiple endpoints in a single session. This setup is intended for advanced use cases.

If the same instrument is available from multiple endpoints, dxFeed Viewer combines the data into a single stream for that instrument. Data from different endpoints is merged and may arrive in an interleaved order, which can lead to inconsistent or non-deterministic updates in widgets.
:::

### Endpoint library

dxFeed Viewer includes an endpoint library that stores frequently used endpoints and aliases.

To open the endpoint library:

1. Open the endpoint library from the top bar.
2. In the library:
  
  
  
  1. Add or remove endpoints from your saved list.
  2. Search endpoints by alias or by direct address.

## Viewing market data by symbol

To view market data, add one or more symbols to dxFeed Viewer.

To check symbols:

1. Add symbols manually by typing a symbol in the **Symbol** field.
2. dxFeed Viewer shows dynamic suggestions based on [IPF](/data-model/reference-data/instrument-profile-format/#instrument-profile-format) data.
3. If a typed symbol is not present in IPF:
  
  
  
  1. dxFeed Viewer shows the typed string at the top of the suggestion list.
  2. This entry is labeled as **Custom**.

If IPF data is available, the symbol selector suggests known instruments as you type. Without IPF, dxFeed Viewer allows adding any symbol as **custom** and does not perform symbol validation.

IPF access can be configured using credentials in the following format: `username:password`, entered in the IPF library field in the top bar.

![username_password.png](/images/uuid-2a136bbe-630b-1930-65c5-7a27469d6e1f.png)

After selecting a symbol:

- If dxFeed has market data for this symbol on the configured endpoints, dxFeed Viewer displays the data in the relevant widgets
- If there is no data, fields remain empty and **No data** indicator is shown for this symbol

:::note
Stock symbols may be added with **&**. For example, `IBM&N`.
:::

## Widgets

dxFeed Viewer provides widgets for analyzing market data by symbol. Widgets are based on dxFeed market events and display data received from active endpoints.

You can rearrange widgets within the workspace to customize the layout. The application also lets you collapse and expand widgets to focus on specific views while keeping others available.

The top-right 

![button.png](/images/uuid-0a77db6e-8d9d-9dad-13dc-5decd2d2b292.png)

 button collapses or expands the widget area.

When collapsed, the following tabs are shown: Chart, Order Book, Time and Sales.

![dxFeed_Viewer_image1.png](/images/uuid-d53e7770-5447-3e90-f6eb-9aa825aa2f48.png)

### Watch List

The Watch List widget displays selected instruments in a single table and updates their market data in real time.

To add symbols:

1. Click the 
  
  ![button_2.png](/images/uuid-812483d2-9731-0cfe-ce3e-5e73a4569fae.png)
  
   column settings button in the top right corner.
2. Select the data points to display in the table.
3. To remove a symbol from the list, hover over it in the list and click the `X` icon.

![Watch_List.png](/images/uuid-091a5f05-f741-50c4-c36a-97251ab60725.png)

:::note
Use the CSV export icon in the top right corner to download the entire list.
:::

### Order Book

The Order Book widget displays order book data for a selected symbol in real time. It shows aggregated price levels or individual orders, depending on the selected data source and data availability.

To select a symbol:

1. Click the symbol selector in the top bar of the dxFeed Viewer.
2. Start typing the symbol name in the search field to see suggestions. Use instrument type filters to narrow results, such as stocks, futures, forex, ETFs, options, and other supported asset classes.
3. Select a symbol to display order book data. The widget shows data for one symbol at a time.

To configure the Order Book view, adjust the following settings in the top right corner of the widget:

- **Source**: Select the type of order book data to display. Available sources correspond to different Order scopes, such as Composite, Regional, Aggregate, and Order. Specific source codes such as NTV, NFX, or XNFI represent particular Order scopes.
- **Throttling**: Select how often the widget updates the displayed data. For example, 0.5 sec, 1 sec, 2 sec, or 5 sec.
- **Lot size**: Filter orders by lot size. For example, 100 (normal), 1 (odd), or All.
- **Color scheme**: Select the color theme for the widget. For example, Blue, Green, or Red.

See [dxFeed Order Book](/data-model/market-events/dxfeed-order-book/#dxfeed-order-book) and [Order events](/data-model/market-events/dxfeed-api-market-events/#order) pages for details.

### Chart

The Chart widget visualizes market data for a selected symbol in real time. It displays price movements over time and updates dynamically as new market data arrives.

To select a symbol:

1. Click the symbol selector in the top bar of the dxFeed Viewer.
2. Start typing the symbol name in the search field to see suggestions. Use instrument type filters to narrow results, such as stocks, futures, forex, ETFs, options, and other supported asset classes.
3. Select a symbol to display its market data on the chart. The widget shows data for one symbol at a time.

To configure the chart, adjust the following settings in the top right corner of the Chart widget:

- **Aggregation**: Select the aggregation interval for the displayed data. For example, 15m.
- **Period**: Select the time range to display on the chart. For example, 1D.
- **Chart type**: Select the visualization type. For example, Candle.
- **Price type**:
  
  
  
  - Quote-based prices (bid, ask, mark) are available for some data feeds
  - Trade-based prices (last or no price type) are not available for Forex feeds
- **Volume**: Toggle the volume display on or off.

![Chart.png](/images/uuid-125240fd-3626-df48-82c3-b94f18addc04.png)

:::note
Use the CSV export icon in the top right corner to download chart data.
:::

### Time and Sales

The Time and Sales widget allows you to observe recent trades for a selected symbol. It displays a limited set of recent [TimeAndSale](/data-model/market-events/dxfeed-api-market-events/#timeandsale) events (up to the most recent 1000 events, depending on data availability) and continuously updates the list as new trades occur.

To select a symbol:

1. Click the symbol selector in the top bar of the dxFeed Viewer.
2. Start typing the symbol name in the search field to see suggestions. Use instrument type filters to narrow results, such as stocks, futures, forex, ETFs, options, and other supported asset classes.
3. Select a symbol to display its trade data. The widget shows data for one symbol at a time.

To configure the display, adjust the following settings in the top right corner of the Time and Sales widget:

- **Time format**: Select the timestamp format with **seconds** or **milliseconds** precision (for example, Time With Seconds).
- **Tick filter**: Select which ticks to display (for example, **Valid**).
- **Displayed fields**: Select which columns appear in the table.

See [Composite Equities Feeds](/data/market-data/composite-feeds/composite-equities-feeds/#composite-equities-feeds) for details.

![Time_and_Sales__2_.png](/images/uuid-291a63f5-b16c-f12c-03e9-bffcfba4dd77.png)

## Other information

:::note
dxFeed Viewer is intended for diagnostics and testing purposes and may not reflect production behavior in all scenarios.
:::
