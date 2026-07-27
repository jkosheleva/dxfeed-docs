---
title: "Fundamentals Web Service"
paligoOriginId: "923"
---

## Access via dxFeed web service

To access fundamentals, use login and password provided by the [dxFeed sales team](https://dxfeed.com/contact-us/). The data is delivered either in visual tables or in JSON formats. [Web service](https://demo.dxfeed.com/morningstar-demo/) interface:

![msget2](/images/uuid-504c1c82-a4fe-8c60-08b3-79fbceac84aa.png)

1. An instrument input line. A symbol can be entered either in common format or Morningstar format (ShareID). This field is case-sensitive.
2. Data tables. You can select the required data tables to be listed. Multiple selections are allowed.
3. Time range. It frames a time range in the scope of which data will be filtered.
4. Data output. The results are sorted from the earliest to the latest.

On the screenshot, the following data is provided: ValuationRatios for `AAPL` from 2016 to 2019.

### Restrictions and usage

#### Symbols

You can specify multiple instruments in one request. Symbols shall be separated with commas.

#### Date range

Not all tables can be filtered by time range. The list of tables that may be filtered:

- AlphaBeta
- ConsensusEstimates
- ConsensusRecommendations
- EarningRatiosAOR
- EarningRatiosRestate
- EarningReportsAOR
- EarningReportsRestate
- FinancialStatementsAOR
- FinancialStatementsRestate
- HistoricalReturns
- OperationRatiosAOR
- OperationRatiosRestate
- OwnershipDetails
- OwnershipSummary
- ValuationRatios

#### Date format

Date format is YYYY/MM/DD, where:

- MM and DD are optional
- **History_from** field: default value is 1 for MM and DD (example: 2019 = 2019/1/1; 2018/3=2018/3/1)
- **History_to** field: default value is the last available date (of month, year): (example: 2019 = 2019/12/31; 2018/1=2018/1/31)

#### JSON output

You can also request information in json format:

| **Argument** | **Description** |
| --- | --- |
| json=1 | Returns data in the json-format. If not specified, web page will be returned |
| indent=1 | Adds indentations that make json-format data more readable |
| ids=XXX,YYY | Lists data for specified symbols. You can specify several symbols separated by commas |
| tables=XXX,YYY | Lists specified data table. You can specify several table separated by commas |
| date_from=YYYY/MM/DD | Shows historical data from the specified date |
| date_to=YYYY/MM/DD | Shows historical data until the specified date |

#### Examples

- [The request of CashDividends for IBM](https://demo.dxfeed.com/morningstar-demo/?ids=IBM&tables=CashDividends&json=1&indent=1)
- [The request of ShareClass and StockSplits for MSFT, AAPL, GOOG](https://demo.dxfeed.com/morningstar-demo/?ids=MSFT,AAPL,GOOG&tables=ShareClass,StockSplits&json=1&indent=1)
- [The request of OwnershipSummary for AAPL](https://demo.dxfeed.com/morningstar-demo/?ids=AAPL&tables=OwnershipSummary&json=1&indent=1&date_from=2015/1/30&date_to=2015)
