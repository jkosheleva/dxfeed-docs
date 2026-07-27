---
title: "dxFeed News Webservice API Usages"
paligoOriginId: "61697"
---

## Usages

### Get a list of news

Call `/data` to get the list of recent news by query parameters.

:::note
If there is nothing found that matches your request, **polling** will be automatically enabled. If you would rather not wait, please add the **pollingTimeout** parameter to the request.
:::

#### Parameters

| **Parameter** | **Required** | **Description** |
| --- | --- | --- |
| symbol | Optional | Filter news by the list of symbols |
| feed | Optional | Filter news by the list of news feeds (aggregators) |
| source | Optional | Filter news by the list of news distributors |
| limit | Optional | Limit the news count in the response |
| pollingTimeout | Optional | Time to wait for the results of the request in the polling mode. The request will be canceled by timeout |
| body | Optional | Include news body in result |
| extraAttributes | Optional | Include extraAttributes for each news |
| actualOnly | Optional | Show only the most recent version of the news satisfying the request. Method excludes the **prior corrections** from the response and shows the most recent version for the current request |

#### Response

| Code | Description |
| --- | --- |
| 200 | Returns a [news list](#newslist), that satisfy the request parameters |
| 400 | Bad request |
| 401 | Authorization information is missing or invalid |
| 404 | A news with the specified ID was not found |
| 5XX | Unexpected error |

### Get a list of news before a specific news ID

Call `/data?beforeId=...&` to navigate back in the history. It shows news, that satisfy the parameters of the request and appeared before the news with the ID specified as **beforeId**. You may want to use the **beforeId** from the previous response to go deeper in the history (if available).

#### Parameters

| **Parameter** | **Required** | **Description** |
| --- | --- | --- |
| beforeId | Optional | Show only news that happened before the news with the ID specified as **beforeId**. Pass `...&beforeId=<beforeId>` from the previous response to navigate to the next page |
| body | Optional | Include news body in result |
| source | Optional | Get news from the specified news provider |
| symbol | Optional | Get news based on the specified symbol |
| feed | Optional | Get news based on the specified news feed (aggregator) |
| limit | Optional | Limit news count by the specified number (default=100). 100 is the highest possible number |
| pollingTimeout | Optional | Time to wait for the results of the request in the polling mode. The request will be canceled by timeout |
| extraAttributes | Optional | Include extraAttributes for each news |
| actualOnly | Optional | Show only the most recent version of the news satisfying the request. Method excludes the **prior corrections** from the response and shows the most recent version for the current request |

#### Response

| Code | Description |
| --- | --- |
| 200 | Returns a [news list](#newslist), that satisfy the request parameters |
| 400 | Bad request |
| 401 | Authorization information is missing or invalid |
| 404 | A news with the specified ID was not found |
| 5XX | Unexpected error |

### Get a list of news after a specific news ID

Call `/data?afterId=...&` to navigate forward in the history. It shows news, that satisfy the parameters of the request and appeared after the news with the ID specified as **afterId**. You may want to use the **afterId** from the previous response to go forward in the history (if available).

#### Parameters

| **Parameter** | **Required** | **Description** |
| --- | --- | --- |
| afterId | Optional | Show only news that happened after the news with the ID specified as **afterId**. Pass `<...&afterId=<afterId>` from the previous response to navigate to the previous page |
| body | Optional | Include news body in result |
| source | Optional | Get news from the specified news provider |
| symbol | Optional | Get news based on the specified symbol |
| feed | Optional | Get news based on the specified news feed (aggregator) |
| limit | Optional | Limit news count by the specified number (default=100). 100 is the highest possible number |
| pollingTimeout | Optional | Time to wait for the results of the request in the polling mode. The request will be canceled by timeout |
| extraAttributes | Optional | Include extraAttributes for each news |
| actualOnly | Optional | Show only the most recent version of the news satisfying the request. Method excludes the **prior corrections** from the response and shows the most recent version for the current request |

#### Response

| Code | Description |
| --- | --- |
| 200 | Returns a [news list](#newslist), that satisfy the request parameters |
| 400 | Bad request |
| 401 | Authorization information is missing or invalid |
| 404 | A news with the specified ID was not found |
| 5XX | Unexpected error |

### Get a list of chained news

Call `/data?chainId=...&` to get a list of articles included in the news chain by `chainId`.Provides all news which are related to the same **chainId**.

#### Parameters

| **Parameter** | **Required** | **Description** |
| --- | --- | --- |
| chainId | Optional | Get all articles included in the news chain by **chainId** |
| body | Optional | Include news body in result |
| beforeId | Optional | beforeId<br/>Show only news that happened before the news with the ID specified as **beforeId**. Pass `...&beforeId=<beforeId>` from the previous response to navigate to the next page |
| afterId | Optional | Show only news that happened after the news with the ID specified as **afterId**. Pass `<...&afterId=<afterId>` from the previous response to navigate to the previous page |
| limit | Optional | Limit news count by the specified number (default=100). 100 is the highest possible number |
| pollingTimeout | Optional | Time to wait for the results of the request in the polling mode. The request will be canceled by timeout |
| extraAttributes | Optional | Include extraAttributes for each news |
| actualOnly | Optional | Show only the most recent version of the news satisfying the request. Method excludes the **prior corrections** from the response and shows the most recent version for the current request |

#### Response

| Code | Description |
| --- | --- |
| 200 | Returns a [news list](#newslist), that satisfy the request parameters |
| 400 | Bad request |
| 401 | Authorization information is missing or invalid |
| 404 | A news with the specified ID was not found |
| 5XX | Unexpected error |

### Get a list of last news

Call `/data?pollingId=...&` to get a list of the most recent news with long-polling technique. It shows the news which satisfy the query parameters and enables long-polling mode when **lastId** parameter is specified. The response will be returned when there's at least one news, that satisfies the parameters of the request, appeared since the **lastId**. If there are no news satisfying the request the connection will be closed after the **timeout** (60 seconds, by default). The timeout can be modified and passed as an additional query parameter.

#### Parameters

| **Parameter** | **Required** | **Description** |
| --- | --- | --- |
| pollingId | Optional | Pass `...&pollingId=<lastId>` from the previous response to enable long-polling mode for the most recent news. The response will be returned when there's at least one news, that satisfies the parameters of the request and has an id later than pollingId. If there are no news satisfying the request the connection will be closed after the **timeout**. |
| chainId | Optional | Get all articles included in the news chain by **chainId** |
| body | Optional | Include news body in result |
| source | Optional | Get news from the specified news provider |
| symbol | Optional | Get news based on the specified symbol |
| feed | Optional | Get news based on the specified news feed (aggregator) |
| limit | Optional | Limit news count by the specified number (default=100). 100 is the highest possible number |
| pollingTimeout | Optional | Time to wait for the results of the request in the polling mode. The request will be canceled by timeout |
| extraAttributes | Optional | Include **extraAttributes** for each news |
| actualOnly | Optional | Show only the most recent version of the news satisfying the request. Method excludes the **prior corrections** from the response and shows the most recent version for the current request |
| latestPerSymbol | Optional | Show only the recent news by symbol, **actualOnly** must not be set to false (default=false) |
| timeframe | Optional | Timeframe filter out the most recent news according to the specified timeframe |

#### Response

| Code | Description |
| --- | --- |
| 200 | Returns a [news list](#newslist), that satisfy the request parameters |
| 400 | Bad request |
| 401 | Authorization information is missing or invalid |
| 404 | A news with the specified ID was not found |
| 5XX | Unexpected error |

### Get body of particular news

Call `/data?Id=` to get the contents of the specified news by **ID**.

#### Parameters

| **Parameter** | **Required** | **Description** |
| --- | --- | --- |
| ID | Optional | Filter news by ID |
| body | Optional | Include news body in result |
| extraAttributes | Optional | Include **extraAttributes** for each news |

#### Response

| Code | Description |
| --- | --- |
| 200 | Returns a [news list](#newslist), that satisfy the request parameters |
| 400 | Bad request |
| 401 | Authorization information is missing or invalid |
| 404 | A news with the specified ID was not found |
| 5XX | Unexpected error |

### Get help

Call `/data?help` to list help on the news service functionality.

#### Parameters

| **Parameter** | **Required** | **Description** |
| --- | --- | --- |
| help | Optional | Provides the help on the [news](#news) service functionality |

#### Help

| Code | Description |
| --- | --- |
| 200 | Returns the help screen contents |
| 400 | Bad request |
| 401 | Authorization information is missing or invalid |
| 404 | A news with the specified ID was not found |
| 5XX | Unexpected error |

## Schemas

### Newslist

Service will return a result if available, or an empty list:

```json
{
  "news": [
    {
      "id": "string",
      "sourceId": "string",
      "title": "string",
      "time": "2023-05-05T14:00:07.950Z",
      "body": "string",
      "extraAttributes": {"string"},
      "source": "string",
      "symbols": [
        "string"
      ],
      "tags": {
        "otherTags": [
          "string"
        ]
      },
      "action": "Correct",
      "reason": [
        "Body",
        "Meta"
      ],
      "originalId": "string",
      "chainId": "string"
    }
  ],
  "lastId": "string",
  "beforeId": "string",
  "afterId": "string"
}
```

### News

Service will return a result if available, or an empty list:

```json
  {
  "id": "string",
  "sourceId": "string",
  "title": "string",
  "time": "2023-05-05T14:00:07.964Z",
  "body": "string",
  "extraAttributes": {"string"},
  "source": "string",
  "symbols": [
    "string"
  ],
  "tags": {
    "otherTags": [
      "string"
    ]
  },
  "action": "Correct",
  "reason": [
    "Body",
    "Meta"
  ],
  "originalId": "string",
  "chainId": "string"
}
```

### Help

| **Code** | **Description** |
| --- | --- |
| 200 | Usage: /data<br/>Usage: /data?help<br/>Prints this help screen<br/>Usage: /data?id=<id><br/>Get news by ID.<br/>Usage: /data?<parameters><br/>Poll for news with the specified filter<br/>Available parameters:<br/>Note that requested parameters can be adjusted by the server |
| Parameter | Description |
| symbol | Filter news by the list of symbols, e.g. **GOOG,AAPL** |
| source | Filter news by the list of news distributors, e.g. **Business Wire** |
| feed | Filter news by the list of news feeds (aggregators), e.g. **acquire** |
| body | Include news body in result (default=true) |
| limit | Limit news count by the specified number (default=100) |
| pollingId | Poll the news with the ID greater than the **pollingId**<br/>(**lastId **can be passed as the value). |
| pollingTimeout | Time to wait for the results of the polling request |
| beforeId | Show only news that happened before the news with the ID specificed as **beforeId** |
| afterId | Show only news that happened after the news with the ID specificed as **afterId**. For long-polling use **lastId** |
| actualOnly | Show only the most recent version of the news satisfying the request |
| chainId | Get all articles included in the news chain by **chainId** |
| extraAttributes | Include extraAttributes for each news |
| last | Is deprecated, use **pollingId** |
| timeout | Is deprecated, use **pollingTimeout** |
| 400 | Bad request |
| 401 | Error 401 Unauthorized |
