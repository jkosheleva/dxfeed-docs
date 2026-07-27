---
title: "Special Functions"
paligoOriginId: "35972"
---

## Relative options

When running requests in the `OPTION` category, it is possible to access any neighboring datapoint option by strike and with the same or opposite type (call vs put). There is a special function to specify how to choose such a relative option.

| Parameter | Type | Default Value | Description |
| --- | --- | --- | --- |
| strikeIntervals | number | 0 | positive or negative integer:<br/>`0` - same strike<br/>`+1` - option with the closest strike that is greater<br/>`-1` - option with the closest strike that is less<br/>`+n` - n'th strike in the greater prices' direction<br/>`-n` - n'th strike in the lower prices' direction |
| isOpposite | boolean | false | `false` call => call, put => put<br/>`true` call => put, put => call |

### Example. Search for a tradeable vertical spread

A vertical spread is an options trading strategy that involves the simultaneous buying and selling of options of the same type (i.e., either puts or calls) and expiry, but at different strike prices. The **vertical** term comes from the strike prices' position. Traders will use a vertical spread when they expect a moderate move in the underlying asset's price. Vertical spreads are mainly directional plays and can be tailored to reflect the trader's view, bearish or bullish, on the underlying asset.

Consider, we want to find a two strikes wide vertical spread with both legs tradable and delta at around .45, where tradable stands for leg open interest being greater than 100. We want these spreads to be sorted by spread price, that is the first leg's price minus the second one's price. For that query, we would format the request as follows:

```json
{
    "instrumentCategory": "OPTION",
    "datapoints": [
        {
            "expr": "underlying.price"
        },
        {
            "expr": "strikePrice"
        },
        {
            "name": "secondLegStrikePrice",
            "expr": "strikePrice(option(strikeIntervals=2))"
        },
        {
            "name": "spreadPrice",
            "expr": "price-price(option(strikeIntervals=2))"
        },
        {
            "expr": "greeks.delta"
        },
        {
            "expr": "openInterest"
        },
        {
            "name": "secondLegDelta",
            "expr": "greeks.delta(option(strikeIntervals=2))"
        },
        {
            "name": "secondLegOpenInterest",
            "expr": "openInterest(option(strikeIntervals=2))"
        }
    ],
    "filters": [
        {
            "datapoint": 4,
            "alternatives": [
                {
                    "predicate": "[]",
                    "args": [
                        "0.43",
                        "0.45"
                    ]
                }
            ]
        },
        {
            "datapoint": 6,
            "alternatives": [
                {
                    "predicate": "[]",
                    "args": [
                        "0.43",
                        "0.45"
                    ]
                }
            ]
        },
        {
            "datapoint": 5,
            "alternatives": [
                {
                    "predicate": ">",
                    "args": [
                        "100"
                    ]
                }
            ]
        },
        {
            "datapoint": 7,
            "alternatives": [
                {
                    "predicate": ">",
                    "args": [
                        "100"
                    ]
                }
            ]
        }
    ],
    "sorters": [
        {
            "datapoint": 3,
            "reversed": true
        }
    ],
    "options": {
        "snapshotSize": 100,
        "allAsOutputs": true
    }
}
```

And the result might look like:

| symbol | underlying.price | strikePrice | secondLegStrikePrice | spreadPrice | greeks.delta | openInterest | secondLegDelta | secondLegOpenInterest |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| .SPY220617C476 | 464.7 | 476 | 478 | 0.65 | 0.446 | 389 | 0.431176 | 1241 |
| .SPX220218C4710 | 4649.27 | 4710 | 4720 | 0.96 | 0.445457 | 235 | 0.434049 | 163 |
| .QQQ220617C406 | 391.52 | 406 | 408 | 2.34 | 0.444805 | 508 | 0.432029 | 838 |
| .SPXW220121C4700 | 4649.27 | 4700 | 4710 | 6.5 | 0.445454 | 786 | 0.430869 | 273 |
| .SPX220121C4700 | 4649.27 | 4700 | 4710 | 8.09 | 0.444977 | 17749 | 0.430869 | 273 |
| .TSLA240119C1900 | 1063.38 | 1900 | 1950 | 9.49 | 0.440436 | 1105 | 0.430127 | 827 |
| .SPXW220218C4710 | 4649.27 | 4710 | 4720 | 33.36 | 0.445756 | 149 | 0.434049 | 163 |

## Scanner results filtering by index constituent symbols

It's possible to narrow down the Scanner results to a list of symbols constituting a public index, like the S&P 500, Russel 2000, etc.

Use a special `inList` predicate to achieve such filtering. This predicate accepts one or many index names as arguments and narrows down the result set to the list of symbols from any index. For example, the following request returns only symbols that are part of the S&P 500, Russel 2000, or both indices:

```json
{
  "instrumentCategory": "UNDERLYING",
  "datapoints": [
    {
      "expr": "symbol"
    }
  ],
  "filters": [
    {
      "datapoint": 0,
      "alternatives": [
        {
          "predicate": "inList",
          "args": ["SP500", "Russell2000"]
        }
      ]
    }
  ]
}
```

To retrieve a full list of supported indices, use the [IPF](/data-model/reference-data/ipf-webservice/how-to-request-ipf/#how-to-request-ipf) request with [ipf?help&lists](https://tools.dxfeed.com/ipf?help&lists). For a list of index constituent symbols, use IPF request with **ipf?lists=LISTNAME** syntax. For example, [ipf?lists=SP500](https://tools.dxfeed.com/ipf?lists=SP500) returns symbols for the S&P 500 index constituents.

:::note
Use demo/demo credentials to check IPF examples.
:::

## Crossover detection

### Crossover function

A crossover is an event where an indicator and a price, or multiple indicators overlap and cross each other. In technical analysis, crossovers confirm patterns and trends, such as reversals and breakouts. The dxFeed Scanner supports crossover analysis for equities indicators with a special cross function. First, this function takes two parameters, either two indicators cross _(ind1, ind2)_ or an indicator and a constant cross (_ind1, c_). Then, it returns the provided indicators’ latest crossover timestamp.

An example of a crossover function for alligator lips and linear regression technical indicators:

```
cross(
   ind1 = alligatorLips(candleCount=100, candlePeriod="1d", session="all"),
   ind2 = linearRegressionStatic(candleCount=100, candlePeriod="1d", session="all")
)
```

An example of a crossover function for alligator jaw and a constant:

```
cross(
   ind = alligatorJaw(candleCount=100, candlePeriod="1d", session="all"),
   c = 100.0
)
```

### Defining crossover search depth

For most datapoints, crossover search depth is based on the candle count indicator parameter. However, not all indicators specify the search depth. For example, **vwap** indicator contains the optional parameter **takeCount**, which defines the search depth. The query results in an error if a parameter is required but not specified. Conversely, if you provide an unrequired parameter, it gets ignored. To check the exact requirements of a particular datapoint, please refer to the datapoints documentation, available at /docs/datapoints/ endpoint.

Use the lowest **candleCount** parameter available if they don't match.

An example of a crossover function with **takeCount** parameter specified:

```
cross(
  ind = vwap(candleCount=3, candlePeriod="1d", session="all"),
  c = 100.0,
  takeCount = 100
)
```

## Date datapoints and helper functions

The Scanner publishes date-aware datapoints and two utility functions so you can measure calendar-day distances inside a query.

### Datapoint variants

- **[datapoint]Ymd** — number, date as an eight-character string in YYYYMMDD format.

Example: **expirationYmd** datapoint, with sample value `20250101`, representing Jan 1, 2025.

:::note
The string is serialized as a number in the JSON output and is sorted as a number if added to query sorters.
:::

- **[datapoint] **— optionally, the same datapoint might be available in **Unix** format, represented in milliseconds since the Unix epoch at 00:00 UTC on the given day.

Example: **expiration** datapoint, with sample value `1735689600000`, representing Jan 1, 2025.

Both variants represent the same calendar date; choose whichever fits your arithmetic or UI needs.

### Special datapoint nowYMD

- **Type**: YYYYMMDD string
- **Time zone**: America/New_York
- **Scope**: Evaluated once per request; every row sees the same value
- **Example**: on 1 Jan 2025, at 09:00 ET, `nowYMD = 20250101`

### Functions

| Function | Signature | Returns | Purpose |
| --- | --- | --- | --- |
| days | days(from, to) | _int_ | Calendar-day difference: _to − from_. Accepts YYYYMMDD strings or **…Ymd** datapoints |
| daysFromNow | daysFromNow(date) | _int_ | Convenience wrapper for **days(nowYMD, date)**. Positive values are returned for dates in future, negative for dates in past |

### Usage examples (JSON request fragments)

```
// Days between an explicit date and option expiration
"datapoints": [
  { "expr": "days(\"20250101\", expirationYmd)" }
]// Days until option expiration relative to *today*
"datapoints": [
  { "expr": "daysFromNow(expirationYmd)" }
]// Same as above, written explicitly
"datapoints": [
  { "expr": "days(nowYMD, expirationYmd)" }
]
```

:::note
Only **calendar** days are counted; time-of-day is ignored.
:::

:::note
A result of **0** means both dates fall on the same day.
:::

:::note
If you need to use the numeric (epoch-millisecond) variant with these functions, cast it to YYYYMMDD first.
:::
