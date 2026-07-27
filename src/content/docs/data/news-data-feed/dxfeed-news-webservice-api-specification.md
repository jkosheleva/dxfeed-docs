---
title: "dxFeed News Webservice API Specification"
paligoOriginId: "94098"
---

## Overview

We provide a simple RESTful API. All calls are GETs and should be called via https. To access a news feed, make a single API call, and it will be returned with the news headers or a news body.

News Webservice API consists of one main API call that retrieves a list of headers or a specific news body. Please use `/news?help` to list help.

This is a pull-based service that returns a list of news headers along with the last available ID. Use **lastId** field with the subsequent API calls to receive a consistent news feed and to avoid losses.

### Get a list of news headers

Call `/news` to get a list of news headers. The result will contain 2 fields:

- `news` - the list of news messages
- `lastId` - latest available news ID

**Parameters**

| **Parameter** | **Required** | **Description** |
| --- | --- | --- |
| source | Optional | Filter news by the list of news distributors, e.g. `Business Wire` |
| symbol | Optional | Filter news by the list of symbols, e.g. `GOOG,AAPL` |
| feed | Optional | Filter news by the list of news feeds (aggregators), e.g. **acquire** |
| body | Optional | Include news body in result (default=true) |
| limit | Optional | Limit news count by the specified number (default=100). 100 is the highest possible number |
| beforeId | Optional | Show only news that happened before the news with the id specified as **beforeId** |
| afterId | Optional | Show only news that happened after the news with the id specified as **afterId** |
| pollingId | Optional | Poll the news with the id greater than the **pollingId** (**lastId** can be passed as the value) |
| timeout | Optional | Limit time in seconds to wait for a response (default=60) |
| chainId | Optional | Get all articles included in the news chain by **chainId** |
| actualOnly | Optional | Show only the most recent version of the news satisfying the request (default=false) |
| extraAttributes | Optional | Include **extraAttributes** for each news (default=false) |
| latestPerSymbol | Optional | show only the recent news by symbol, **actualOnly** must not be set to false (default=false) |
| timeframe | Optional | Filter out the most recent news according to the specified timeframe |

**Examples of a request**

| **Request** | **Description** |
| --- | --- |
| /news?last=<lastId>&timeout=10 | Wait no longer than 10 seconds to receive news after the last specified ID |
| /news?symbol=CBZ&limit=2 | Show the two latest news headers for symbol CBZ |

**Response**

Service will return a result if available, or an empty list:

```json
{
  "news" : [ {
    "id" : "[news_id]",
    "sourceId" : "[source_id]",
    "title" :  "[news_title]",
    "time" : "[timestamp]",
    "source" : "[source_name]",
    "symbols" : "[list_of_symbols]"
  }, {
    "id" : "[news_id]",
    "sourceId" : "[source_id]",
    "title" :  "[news_title]",
    "time" : "[timestamp]",
    "source" : "[source_name]",
    "symbols" : "[list_of_symbols]"
  } ],
  "lastId" : "[id_of_the_last_news]"
}
```

The response may also contain different tags. See the list of [sample tags below](#sample-tag-values).

### Get body of a particular news

Get news body of the specified news.

**Parameters**

| **Parameter** | **Required** | **Description** |
| --- | --- | --- |
| id | Required | Get news body of the specified news |

**Examples of a request**

`/news?id=[ID_value]` – show contents of news with the specified ID

**Response**

This request returns the same response with body field added.

```json
{
    "id" : "[id_number]",
    "sourceId" : "[source_id]",
    "title" : ,
    "time" : "[timestamp]",
    "source" : "[source_name]",
    "symbols" : "[list_of_symbols]",
    "body" : "[news text]"
}
```

The response may also contain different tags. See the list of sample tags [here](#sample-tag-values).

## Sample tag values

This table lists sample tag values for the news feed:

| **Code** | **Description** |
| --- | --- |
| GC | Publication Geo Focus - Country |
| GR | Publication Geo Focus - Region |
| GB | Publication Geo Focus - Regional Subdivision |
| GS | Publication Geo Focus - State/Province |
| GU | Publication Geo Focus - Urban Area |
| HT | Hash Tag |
| II | Industry code (from the ACME Taxonomy) |
| IN | Publisher/Vendor’s Industry Code |
| IS | Subject code (from the ACME Taxonomy) |
| IX | Industry code (from the ACME Taxonomy) |
| LA | Geo Area |
| LB | Geo SubRegion |
| LC | Geo Country |
| LP | Geo Location in Byline/Placeline |
| LR | Geo Region |
| LS | Geo States/Subdivisions/Provinces |
| LT | Geo County LU/ Geo "Urban" and "Unified" (Cities, States, Countries) |
| LZ | Zip Code |
| MC | Misc Code and "Market Impact" code HOT, DUP, NRC, EDGE |
| PC | Misc. "Publisher Code" |
| PI | Publisher Industry |
| PR | Publisher/Vendor Special Geo Region Code |
| PS | Publisher Source |
| PT | Publisher Type |
| PX | Publisher/Vendor Special Subject |
| RE | Publisher/Vendor’s Original Location (Region) Code - all types |
| RC | Publication Origin Geo Code - Country RR/ Publication Origin Geo Code - Region |
| RB | Publication Origin Geo Code - Subregion |
| RS | Publication Origin Geo Code - State/Province |
| RU | Publication Origin Geo Code - Urban SU/ Publisher/Vendor’s Subject Code |
| TN | "Top News" Indicator |
| XC | Stock Exchange |
| XI | Stock Exchange of Press Release Issuer (used in press releases only) |
| Z | Slugs and other Special Codes |
