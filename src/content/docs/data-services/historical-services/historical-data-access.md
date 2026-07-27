---
title: "Historical Data Access"
paligoOriginId: "906"
---

The following APIs are now available for the service:

- [dxFeed Java API](https://docs.dxfeed.com/dxfeed/api/index.html?_ga=2.138553267.1203540304.1637848613-885720032.1637049753) gives control over the full functionality of dxFeed real-time, historical, and aggregated data (including market replay).
- dxFeed web service and JavaScript [API](https://www.dxfeed.com/dxfeed-apis/). JavaScript API mirrors dxFeed Java API in JavaScript and provides easy widgets and shortcuts to integrate streaming market data into web apps.
- [REST web services and APIs](https://dxfeed.com/api/javascript-and-rest-apis/):
  
  
  
  - [Instrument profile web service](http://tools.dxfeed.com/ipf) providing essential symbol attributes and symbol discovery.
  - [onDemand tick data extraction web service](http://tools.dxfeed.com/onDemand/data) extracts tick data for given symbols, time, and event types from our cloud storage.
  - [onDemand tick data audit web service](http://tools.dxfeed.com/onDemand/data) extracts data from onDemand cloud storage for given symbols, events, and timeframes keeping the order. Used for trade audit purposes primarily, currently provides access to only 1 month of data on all symbols. Limitations are configurable.

:::note
Use [demo credentials](/faq/#what-are-the-demo-credentials-for-ipf) to check IPF examples.
:::
