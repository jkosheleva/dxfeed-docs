---
title: "Ticket Requirements"
paligoOriginId: "137257"
---

## Overview

When submitting a support ticket, please share the main details about the issue. This helps the team understand the problem and begin investigation immediately.

This allows us to:

- Reduce back-and-forth communication
- Investigate issues faster
- Escalate requests more efficiently to dxFeed, Infrastructure, or other teams

## Key information to provide

To help us begin troubleshooting without delays, please include the following information in the ticket:

- Accurate timestamps. UTC is preferred
- Affected symbols in the correct dxFeed format
- Logs, screenshots, or recordings
- Expected and actual behavior

### Detailed ticket field information

Please include the details below to help us process the request faster.

| Field | Description | Required | Example |
| --- | --- | --- | --- |
| Description | What is the issue | Required | Prices frozen on US30 since 14:30 UTC |
| Environment | For example, Prod, UAT, or Demo | Required | Prod |
| Affected service | Impacted area or product | Required | Market Data, Scanner, Charts, Tick Data |
| Endpoint | Connection or API endpoint | Required | demo.dxfeed.com:7400, [https://demo.dxfeed.com/webservice/rest/](https://demo.dxfeed.com/webservice/rest/) |
| Symbols | Instruments in dxFeed format. Verify symbol format using IPF if needed:<br/>[https://tools.dxfeed.com/ipf?help](https://tools.dxfeed.com/ipf?help) | Required | AAPL, US30, BTC/USD |
| Events | Type of affected data.<br/>See [dxFeed API Market Events](/data-model/market-events/dxfeed-api-market-events/#dxfeed-api-market-events) for details | Required | Quotes, Trades, Candles |
| Time (UTC or local time with time zone) | Time when the issue was observed, including time zone (UTC preferred) | Required | 2026-02-01 14:37 UTC or 16:37 GMT+2 |
| Frequency | How often the issue occurs | Required | Intermittent, Permanent, During market open |
| Evidence | Logs, screenshots, or recordings | Optional | Attached screenshots/logs |
| Expected vs actual | What was expected and what happened instead | Optional | Expected real-time data, actual delay ~5s |

:::note
Not sure about all fields? Fill in what is available. Our team will help complete the remaining details.
:::
