---
title: "Scanner Queries"
paligoOriginId: "35971"
---

## Scanner Queries description

A Scanner query is a JSON schema query with the following properties.

| Property | Type | Description | Expected values |
| --- | --- | --- | --- |
| instrumentCategory* | String | The configuration includes one category | instrumentCategory: `OPTION`<br/>or<br/>instrumentCategory: `UNDERLYINGS` |
| datapoints | Array | Requested datapoints. In further query schema parts, a specific index references each datapoint as defined in this property | See [ScanQuery.Datapoints](#scanquerydatapoints) for details |
| selectors | Array | JSON with select and value properties | See [ScanQuery.Selectors](#scanqueryselectors) for details |
| filters | Array | Filters applied to the query | See [ScanQuery.Filters](#scanqueryfilters) for details |
| sorters | Array | Sorting criteria applied to the query. It is represented as a set of sorters, where each sorter references a datapoint by its 0-based index as defined by the datapoints' value. The default order is descending or ascending if the reversed option is set to **true** | The value format is: |
| Property | Type | Sorters |
| datapoint* | integer($int32); | Datapoint index in datapoint array (0-based) |
| reversed | boolean | Determines if the sorting result should be regular (descending) or reversed (ascending). False by default |
| outputs | Array | Datapoint indices to include in the output | The value format is: |
| options | Array | Additional query options. Currently, Scanner API supports only one option - snapshotSize integer($int32), which specifies the maximum results to be returned | The value format is: |

## ScanQuery.Datapoints

Each datapoint consists of two parts, a datapoint name (_name_) and a datapoint expression (_expr_). dxFeed Scanner supports 150+ pre-built datapoints; [here](https://downloads.dxfeed.com/specifications/dxFeed_Options_Scanner_Datapoint_Reference.pdf) is the full list. To build custom datapoints using functions and pre-built datapoints, you can use [dxScript expressions](https://script.dxfeed.com/).

Please routinely check the supported pre-built datapoints list [here](https://downloads.dxfeed.com/specifications/dxFeed_Options_Scanner_Datapoint_Reference.pdf) and the /docs/datapoints/ endpoint since new Scanner releases sometimes result in datapoint updates.

### Datapoint parameters

The dxFeed Scanner technical indicators support parametrized calculation. A user can specify **candleCount**, **candlePeriod**, **timePeriod** and **session** parameters to display its calculation.

- **candlePeriod** parameter defines candle type for calculations using:
  
  
  
  - **1m** – for 1-minute candle
  - **2m** – for 2-minute candle
  - **3m** – for 3-minute candle
  - **4m** – for 4-minute candles
  - **5m** – for 5-minute candles
  - **10m** – for 10-minute candle
  - **15m** – for 15-minute candle
  - **30m** – for 30-minute candle
  - **1h** – for 1-hour candle
  - **2h** – for 2-hour candle
  - **4h** – for 4-hour candle
  - **1d** – for 1-day candle
  - **1w** – for 1-week candle
  - **1mo** – for 1-month candle
  - **1y** – for 1-year candle
- **candleCount** parameter defines the requested number of candles used for calculation. If the number of candles exceeds the amount of historical data available for the instrument, the datapoint is calculated using the maximum number of candles available.
- **session** parameter defines the session types used for calculations:
  
  
  
  - all (default if the parameter is not specified) – regular, pre-market, and post-market
  - regular – only regular
- **timePeriod** parameter defines the calendar period for the candles' number restrictions:
  
  
  
  - **1d** – all fully finished candles in the defined number of calendar days will be taken, any number of calendar days can be defined
  - **1w** – all fully finished candles in the defined number of calendar weeks will be taken, any number of weeks can be defined
  - **1mo** – all fully finished candles in the defined number of calendar months will be taken, any number of months can be defined
  - **1y** – all fully finished candles in the defined number of calendar years will be taken, any number of years can be defined
  - **ytd** – all fully finished candles between the start of the year and the requested date will be taken

### Example. Ratio between ATM IV and statistical volatility for a month

To get the ratio between ATM Implied Volatility and statistical volatility for one month, use the following datapoint:

```json
{
    "name": "RATIO_IV_TO_SV_1_MONTH",
    "expr": "underlying.atmIv30Day / underlying.statVol1Month(session=\"regular\")"
}
```

### Example. Total call volume ratio to the average for 10 days

To calculate the options session call volume ratio to the 10 days average, use the following datapoint:

```json
{
    "name": "VOLUME_TOTAL_CALL_RATIO",
    "expr": "underlying.optionsCallVolume(session=\"regular\") / underlying.optionsCallVolumeAvg10Day(session=\"regular\")"
}
```

## ScanQuery.Selectors

:::note
This section is obsolete. Please refer to it for backward compatibility only. Please refer to [Appendix B, Migrate selectors to filters](/market-search/scanner-api/selectors-to-filters-migration/#selectors-to-filters-migration) for details on how to implement functionality using filters.
:::

This function is deprecated, relevant features shall be now implemented with [ScanQuery.Filters](#scanqueryfilters) functionality. See also [Appendix A, Special functions](/market-search/scanner-api/special-functions/#special-functions).

Scanner API optimized the selectors to narrow down the set of symbols on which the search is performed. You can use type (e.g. `OPTION`, `ETF`, `STOCK`), symbol (e.g. `AAPL`, `FB`, `.AMZN190628C1300`, etc.), and underlying for derivatives (`AAPL`, `FB`) to limit the set of instruments you work with.

| Property | Type | Description | Expected values |
| --- | --- | --- | --- |
| select* | string | Selector type | `type`<br/>`symbol`<br/>`underlying` |
| values* | array | Selector values to apply | Depending on selector type and the symbol universe dxFeed Scanner works with |

### Example. Selecting options only

```
"selectors": [
    {
        "select": "type",
        "values": [
            "OPTION"
        ]
    }
]
```

## ScanQuery.Filters

Filters are search criteria built on datapoints. In each filter, you can define a datapoint and criteria (alternatives property) that the datapoint shall match.

- Combine several alternatives using `OR` operation for the selected datapoint to meet any alternative
- Filters themselves are combined using `AND` operation for the selected symbol datapoint to meet all alternatives.

| Property | Type | Description |
| --- | --- | --- |
| datapoint* | integer($int32) | Datapoint index in datapoint array (0-based). If this is the only provided filter property, then the specified datapoint must have a boolean type |
| not | Boolean | Whether the filter should be negated. False by default |
| alternatives | Array | Alternatives for the filtered datapoint: |
| predicate* | Predicate name. The following values are allowed:<br/>`==` - equality, requires one argument, works for all primitive and enum types<br/>`<` - checks if the datapoint value is less than the given single numeric argument<br/>`<=` - checks if the datapoint value is less than or equal to the given single numeric argument<br/>`>` - checks if the datapoint value is greater than the given single numeric argument<br/>`>=` - checks if the datapoint value is greater than or equal to the given single numeric argument<br/>`[]` - checks if the datapoint value is between two numeric arguments (inclusive)<br/>`anyOf` - checks if the datapoint value equals to any of the arguments |
| args* | One or more predicate arguments |
| not | Whether the alternative should be negated. Boolean. False by default |

### Example. Filtering a datapoint to be greater than 1.5

```
"filters": [
    {
        "datapoint": 7,
        "alternatives": [
            {
                "predicate": ">=",
                "args": [
                    1.5
                ]
            }
        ]
    }
]
```
