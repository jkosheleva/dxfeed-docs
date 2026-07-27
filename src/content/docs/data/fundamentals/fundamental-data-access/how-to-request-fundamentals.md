---
title: "How to request Fundamentals"
paligoOriginId: "913"
---

## How to request Fundamental data

1. Go to your IPF or Morningstar website.
2. Find a symbol or event (ShareID).
3. Figure out if a symbol is in a US, EU or Asian region.
4. Choose a type of corporate action.
5. Make a request via web service or Java API.

Please try [demo](https://demo.dxfeed.com/morningstar-demo/msget) access to fundamentals.

The data is delivered either in visual tables or in JSON formats. Web service interface:

![msget1](/images/uuid-d5426c21-6fd4-77e3-8f3c-deb75c8f3952.png)

- An instrument input line. A symbol can be entered either in common format or Morningstar format (ShareID). This field is case-sensitive.
- Data tables. You can select the required data tables to be listed. Multiple selections are allowed.
- Time range. It frames a time range in the scope of which data will be filtered.
- Data output. The results are sorted from the earliest to the latest.

:::note
Only IBM, AAPL, MSFT, GOOG, XOM symbols are available.
:::

### Corporate Calendars Event Types

Every corporate action has its own code.

| **Event Type number** | **Event** |
| --- | --- |
| 1 | General Meeting |
| 3 | Annual Meeting |
| 4 | Investor day/meeting, stockholder meeting |
| 5 | Conference call |
| 6 | Declaration of quarterly cash dividend |
| 7 | First quarter sales report |
| 8 | Second quarter sales report |
| 9 | Third quarter sales |
| 10 | Fourth quarter sales/earnings |

### Examples

**JSON format**

Request arguments

| **Argument** | **Value** | **Description** | **Required** |
| --- | --- | --- | --- |
| json | 1 | Return data in the json-format | Optional, without it will return web-page |
| indent | 1 | Return pretty formatted data | Optional, without it will return web-page |
| tables | String | Return data from particular table | Optional, without it will return ShareClass |
| ids | String | Return data for particular symbol set | Optional, without it will return web-page |

Tables and IDs may be used with commas. To find a table, you have to check the actual name in [web service](https://tools.dxfeed.com/morningstar/msget).

Use the provided credentials to check mesh tests:

- [The request of CashDividends for IBM](https://tools.dxfeed.com/morningstar/msget?json=1&ids=IBM&tables=CashDividends&json=1&indent=1)
- [The request of ShareClass and StockSplits for MSFT, AAPL, GOOG](https://tools.dxfeed.com/morningstar/msget?ids=MSFT,AAPL,GOOG&tables=ShareClass,StockSplits&json=1&indent=1)
- [The request of OwnershipSummary for AAPL](https://tools.dxfeed.com/morningstar/msget?ids=AAPL&tables=OwnershipSummary&json=1&indent=1&date_from=2015/1/30&date_to=2015)
- [The request of ShareClass for MSFT](https://tools.dxfeed.com/morningstar-demo/msget?ids=MSFT&tables=ShareClass&json=1)

:::note
Separate all of them by a comma if you need to request several symbols or IDs.
:::
