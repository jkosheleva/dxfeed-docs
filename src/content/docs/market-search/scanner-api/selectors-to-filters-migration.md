---
title: "Selectors to Filters Migration"
paligoOriginId: "35678"
---

## Introduction

The **selector** mechanism is deprecated in the Scanner HTTP API and will be removed in the near future.

The original selectors' purpose was to allow filtering specific datapoints using a given list of values. This was not initially possible to do using regular filters. Now, though, filters support a predicate `anyOf` that allows the selectors' functionality replication.

## Mapping between selectors and expressions

| Selector name | Datapoint expression |
| --- | --- |
| symbol | symbol |
| type | type |
| underlying | underlying.symbol |

## Examples

### Request with selectors

The following is a request example with selectors in the body:

```json
{
    "instrumentCategory": "UNDERLYING",
    "selectors": [
        {
            "select": "type",
            "values": [
                "STOCK",
                "ETF"
            ]
        }
    ],
    "datapoints": [
        {
            "expr": "price"
        }
    ],
    "filters": [
        {
            "datapoint": 0,
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
    "outputs": [
        {
            "datapoint": 0
        }
    ]
}
```

### Refactored request without selectors

To archive the same result using a filter, we need to remove the **selectors'** field from the request and instead add a datapoint and a corresponding filter.

The following is an updated request example without selectors:

```json
{
    "instrumentCategory": "UNDERLYING",
    "datapoints": [
        {
            "expr": "price"
        },
        {
            "expr": "type"
        }
    ],
    "filters": [
        {
            "datapoint": 0,
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
            "datapoint": 1,
            "alternatives": [
                {
                    "predicate": "anyOf",
                    "args": [
                        "STOCK",
                        "ETF"
                    ]
                }
            ]
        }
    ],
    "outputs": [
        {
            "datapoint": 0
        }
    ]
}
```

Several things changed:

- **selectors'** field was removed from the body
- a new entry was added to the **datapoints** field; this datapoint uses the values of the **select** as an **expr**
- a new entry was added to the **filters** field; the new filter refers to the new datapoint and uses the `anyOf` predicate

The exact same migration procedure can be applied for other selectors, mapping the old **select** to the **expr** specified in the table above.

If the same request has multiple selectors, you need to create a separate datapoint and filter for each one.

:::note
Unless the user has explicitly specified they want to see the new datapoint and filter in the results, we only add it to the request and not into the outputs section.
:::

:::note
You should never include datapoints with symbol expression to the outputs. The actual symbols are always available in the response as JSON object keys. Requesting them additionally in the outputs adds unneeded traffic and processing.
:::
