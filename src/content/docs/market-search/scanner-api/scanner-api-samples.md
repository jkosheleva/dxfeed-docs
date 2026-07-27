---
title: "Scanner API Samples"
paligoOriginId: "35679"
---

## Request

```json
{
	"instrumentCategory": "OPTION",
	"datapoints": [
		{
			"name": "SYMBOL",
			"expr": "symbol"
		},
		{
			"name": "UNDERLIER_SYMBOL",
			"expr": "underlying.symbol"
		},
		{
			"name": "MARKET_EXCHANGE",
			"expr": "officialPlaceOfListing"
		},
		{
			"name": "UNDERLIER_TYPE",
			"expr": "underlying.type"
		},
		{
			"name": "IMPLIED_VOLATILITY_30_DAY",
			"expr": "underlying.atmIv30Day"
		},
		{
			"name": "LAST_PRICE",
			"expr": "underlying.price(session=\"regular\")"
		},
		{
			"name": "OPEN_INTEREST_OPTION",
			"expr": "openInterest"
		},
		{
			"name": "RATIO_IV_TO_SV_1_MONTH",
			"expr": "underlying.atmIv30DayPosInRange / underlying.statVol1Month(session=\"regular\")"
		},
		{
			"name": "STATISTICAL_VOLATILITY_1_MONTH",
			"expr": "underlying.statVol1Month(session=\"regular\")"
		},
		{
			"name": "VOLUME",
			"expr": "underlying.dayVolume(session=\"regular\")"
		},
		{
			"name": "VOLUME_OPTION",
			"expr": "dayVolume"
		},
		{
			"name": "VOLUME_TOTAL_OPTION_10_DAY_AVERAGE",
			"expr": "underlying.optionsTotalVolumeAvg10Day"
		},
		{
			"name": "VOLUME_TOTAL_CALL_RATIO",
			"expr": "underlying.optionsCallVolume(session=\"regular\") / underlying.optionsCallVolumeAvg10Day(session=\"regular\")"
		}
	],
	"outputs": [
		{
			"datapoint": 0
		},
		{
			"datapoint": 1
		},
		{
			"datapoint": 2
		},
		{
			"datapoint": 4
		},
		{
			"datapoint": 5
		},
		{
			"datapoint": 6
		},
		{
			"datapoint": 7
		},
		{
			"datapoint": 8
		},
		{
			"datapoint": 9
		},
		{
			"datapoint": 10
		},
		{
			"datapoint": 11
		},
		{
			"datapoint": 12
		}
	],
	"filters": [
		{
			"datapoint": 3,
			"alternatives": [
				{
					"predicate": "==",
					"args": [
						"STOCK"
					]
				}
			]
		},
		{
			"datapoint": 6,
			"alternatives": [
				{
					"predicate": ">=",
					"args": [
						500
					]
				}
			]
		},
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
		},
		{
			"datapoint": 10,
			"alternatives": [
				{
					"predicate": ">=",
					"args": [
						100
					]
				}
			]
		},
		{
			"datapoint": 11,
			"alternatives": [
				{
					"predicate": ">=",
					"args": [
						1000
					]
				}
			]
		}
	],
	"sorters": [
		{
			"datapoint": 7,
			"reversed": false
		}
	],
	"options": {
		"snapshotSize": 1000
	}
}
{
	"instrumentCategory": "OPTION",
	"datapoints": [
		{
			"name": "SYMBOL",
			"expr": "symbol"
		},
		{
			"name": "UNDERLIER_SYMBOL",
			"expr": "underlying.symbol"
		},
		{
			"name": "MARKET_EXCHANGE",
			"expr": "officialPlaceOfListing"
		},
		{
			"name": "UNDERLIER_TYPE",
			"expr": "underlying.type"
		},
		{
			"name": "IMPLIED_VOLATILITY_30_DAY",
			"expr": "underlying.atmIv30Day"
		},
		{
			"name": "LAST_PRICE",
			"expr": "underlying.price(session=\"regular\")"
		},
		{
			"name": "OPEN_INTEREST_OPTION",
			"expr": "openInterest"
		},
		{
			"name": "RATIO_IV_TO_SV_1_MONTH",
			"expr": "underlying.atmIv30DayPosInRange / underlying.statVol1Month(session=\"regular\")"
		},
		{
			"name": "STATISTICAL_VOLATILITY_1_MONTH",
			"expr": "underlying.statVol1Month(session=\"regular\")"
		},
		{
			"name": "VOLUME",
			"expr": "underlying.dayVolume(session=\"regular\")"
		},
		{
			"name": "VOLUME_OPTION",
			"expr": "dayVolume"
		},
		{
			"name": "VOLUME_TOTAL_OPTION_10_DAY_AVERAGE",
			"expr": "underlying.optionsTotalVolumeAvg10Day"
		},
		{
			"name": "VOLUME_TOTAL_CALL_RATIO",
			"expr": "underlying.optionsCallVolume(session=\"regular\") / underlying.optionsCallVolumeAvg10Day(session=\"regular\")"
		}
	],
	"outputs": [
		{
			"datapoint": 0
		},
		{
			"datapoint": 1
		},
		{
			"datapoint": 2
		},
		{
			"datapoint": 4
		},
		{
			"datapoint": 5
		},
		{
			"datapoint": 6
		},
		{
			"datapoint": 7
		},
		{
			"datapoint": 8
		},
		{
			"datapoint": 9
		},
		{
			"datapoint": 10
		},
		{
			"datapoint": 11
		},
		{
			"datapoint": 12
		}
	],
	"selectors": [
		{
			"select": "type",
			"values": [
				"OPTION"
			]
		}
	],
	"filters": [
		{
			"datapoint": 3,
			"alternatives": [
				{
					"predicate": "==",
					"args": [
						"STOCK"
					]
				}
			]
		},
		{
			"datapoint": 6,
			"alternatives": [
				{
					"predicate": ">=",
					"args": [
						500
					]
				}
			]
		},
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
		},
		{
			"datapoint": 10,
			"alternatives": [
				{
					"predicate": ">=",
					"args": [
						100
					]
				}
			]
		},
		{
			"datapoint": 11,
			"alternatives": [
				{
					"predicate": ">=",
					"args": [
						1000
					]
				}
			]
		}
	],
	"sorters": [
		{
			"datapoint": 7,
			"reversed": false
		}
	],
	"options": {
		"snapshotSize": 1000
	}
}
```

## Response, snapshot

```json
{
    "outputNames": [
        "SYMBOL",
        "UNDERLIER_SYMBOL",
        "MARKET_EXCHANGE",
        "IMPLIED_VOLATILITY_30_DAY",
        "LAST_PRICE",
        "OPEN_INTEREST_OPTION",
        "RATIO_IV_TO_SV_1_MONTH",
        "STATISTICAL_VOLATILITY_1_MONTH",
        "VOLUME",
        "VOLUME_OPTION",
        "VOLUME_TOTAL_OPTION_10_DAY_AVERAGE",
        "VOLUME_TOTAL_CALL_RATIO"
    ],
    "entries": [
        {
            "symbol": ".LLY210319C200",
            "outputs": [
                ".LLY210319C200",
                "LLY",
                "BATO",
                0.4582537027697168,
                208.15,
                2060,
                5.2591509629209,
                0.1888967835442762,
                2990271,
                709,
                19432.828571428574,
                1.8236217044220673
            ]
        },
        {
            "symbol": ".LLY210319C202.5",
            "outputs": [
                ".LLY210319C202.5",
                "LLY",
                "BATO",
                0.4582537027697168,
                208.15,
                765,
                5.2591509629209,
                0.1888967835442762,
                2990271,
                524,
                19432.828571428574,
                1.8236217044220673
            ]
        }
    ]
}
```
