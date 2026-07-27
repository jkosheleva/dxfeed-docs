---
title: "QDS Tool"
paligoOriginId: "960"
---

## What is QDS

QDS is the open source messaging solution that was designed to deliver millions of quotes on hundreds of thousands of financial instruments to a virtually unlimited number of destinations in a scalable way, while supporting fully individual subscriptions for each recipient. This tool is used to connect to some address with specified subscriptions, and log or tape received data. By default, it just logs all received records to a screen in text format.

## How to Install QDS

To install QDS:

1. Download the application [dxfeed-bin](https://www.dxfeed.com/dxfeed-apis/).
2. Extract it.
3. Create QDS alias in Linux or use a command `java -jar qds-tools.jar`.

## QDS usage

To use QDS:

1. Define a host which should be connected.
2. Define an endpoint on the host.
3. Select arguments, options and symbols.

:::note
To see help on some topic type "Help <topic>". To see list of all articles type "Help contents". Use "Help all" to generate all existing help articles. This article using the description of `qds Help Connect` for example.
:::

Request

`Connect [<options>] <Host>:<Endpoint> <arguments/record name?> <symbols>`

### Basic syntax rules

- Patterns cannot contain special symbols like punctuation marks, quotes, and brackets
- Lowercase latin letters are forbidden at the beginning of the pattern
- Futures symbols starts with `/`
- Option symbols start with `.`
- Spread symbols start with `=`
- Equity option symbols start with `.[^/]*`
- Basic symbol option symbol aka `.[^/]*`
- Future option symbol starts with `./*`
- Indicator or index (non-exchange) starts with `$*`
- Composing by boolean operations `&` (and), `,` (or), `!` (not) can be grouped with `,` (and)
- If pattern ends with `*` then it will match all the symbols with specified prefix

### Options

There are such options as:

```
-l|--log <file>             - Redirect log to a file
-c|--collector <s>          - One of 'ticker' (default), 'stream', 'stream-nwc', 'history', 'all', 'all-nwc', or 'filtered-stream'. Several comma separated values are also allowed
-t|--tape <file>[<opts>]    - Tape incoming data into the specified file. See "Help tape" for more details
-f|--fields <fields>        - Process only fields that end with a string from a given comma-separated list
-q|--quiet                  - Be quiet (do not dump every incoming data record)
-s|--stat <n>               - Log stats on specified periods (in seconds by default)
-h|--html-management <port> - Install JMX HTML management console at a specified port. Deprecated. Use -Djmx.html.port=<port> JVM option instead
-r|--rmi-management <port>  - Install JMX RMI management connector at a specified port. Deprecated. Use -Djmx.rmi.port=<port> JVM option instead
```

### Arguments

There are such arguments as:

```
<address>              - address to connect for data (see "Help address")
<subscription-address> - address to take subscription from
<records>              - record names pattern (see "Help filters")
<symbols>              - comma-separated list of symbols, or "all" for a wildcard subscription
<date-time>            - Date and time for history subscription in a standard format (see "Help time format")
```

### Delivery contracts

There are three types of delivery contracts: Ticker, Stream, and History.

### Ticker

The main essence and the main task of this contract is to deliver the latest value for the record guaranteed (for example, the last Trade of the selected symbol). At the same time, we do not promise to show all prices: for example, if there were 1000 messages per second, our task is to transfer the latest value, and some intermediate values may not be delivered (purposeful omission of intermediate values is called conflation - that is, collapse).

### Stream

A stream contract delivers a stream of events, i.e. all previous events. At the same time, we are not trying to deliver the last known event as quickly as possible. So until you start listening to the data stream, it is impossible to know what the last value was. If you have just connected, and there was no trading for the past 3 minutes, then you will not see any value in the stream contract.

### History

History is a contract, the peculiarity of which is that it delivers not one event, not one chain of events, but a set of events at once for one symbol. (For two other contracts, if you subscribe to a symbol, then you receive the event one by one, and they exist only sequentially. In history, you receive a set of events that exist simultaneously).

**Examples**

Request Trade or Quote

`qds connect host:port Trade/Quote symbol(s)`

`qds connect somehost:7777 Trade*,Quote MSFT,IBM`

This will connect to `somehost:7777`, subscribe to all records which names starts with "Trade" and to record Quote for symbols MSFT and IBM (using ticker collector which is default), and log received records to a screen.

Request historical data

`qds connect -c history host:port Trade.<period> <symbol1>[,<symbol2>,…] [end_date]`

| **Option** | **Sample** | **Description** |
| --- | --- | --- |
| PERIOD | 1min | Requested period. Can be one of: 1min, 5min, 15min, 30min, 1hour, 4hour, 8hour, 12hour, Day, Week, Month. Also can be * (all of them) |
| SYMBOL | IBM | Symbol. You can request several symbols using `,` as delimiter. If there is `&` in a symbol’s name, you need to surround it with []: `DE30[&]C{price=bid},AUS200[&]C{price=bid}`. No space after `,` is needed. Also, you can specify an `all` value |
| END_DATE | 20080101 | Optional parameter. QDS command provides charting data from the latest candle to the first one |

Example of using history subscription (all Trade.Day records about GOOG since the beginning of the year 2008):

`qds connect host:port Trade.Day Symbol date(YYYMMDD) -c history`

`qds connect host:port Trade.Day GOOG 20080101 -c history`

Settlement price for Futures, Options:

`qds connect host:port 'Trade[&]S' /XU0300417:TR`

Charts since desired date/time (Trade.1min, Trade.5min, Trade.30min, Trade.1hour, Trade.Day, Trade.Week, Trade.Month):

`qds connect host:port Trade.Day TCELL:TR -c history 20170417-155632+0300`

`qds connect host:port Trade.Day "USD/TRY{mm=FCFX,price=bid}" -c history`

Chart with Split parameter is used for FX chart only:

`qds connect host:port Trade.Day "GBP/USD{price=bid,split=-2100}" 20180820 -c history`

Quotes (bid, ask):

`qds connect host:port Quote TCELL:TR`

Summary for today (open, high, low prices, previous day close price):

`qds connect host:port Summary TCELL:TR`

Greeks for option including theo price:

`qds connect host:port Greeks TCELL:TR`

Ceiling, Floor for Stocks and Warrants:

`qds connect host:port Profile TCELL:TR -f HighLimitPrice,LowLimitPrice`

The lists of losers, gainers (note that actives are calculated on our side by ranking plugin):

`qds connect host:port Configuration \$"TOP10PL:TR"`

`qds connect host:port Configuration\$"TOP10PG:TR"`

`qds connect host:port Configuration\$"TOP10VM:TR"`

Depth:

`qds connect host:port MarketMaker TCELL:TR -c history`

Time and Sales:

`qds connect host:port TimeAndSale TCELL:TR`

Check receiving Trade ticks:

`qds connect host:port Trade symbol`

Check receiving Profile info:

`qds connect host:port Profile symbol`

Check receiving Fundamental info:

`qds connect host:port Fundamental symbol`

Check receiving Level II quotes (Market Makers ticks):

`qds connect -c history host:port MarketMaker symbol`

Command format for receiving Corporate actions info:

`qds connect -c history host:port MarketMaker /NQ8HG`

`qds connect -c history host:port Trade.1min GOOG 20080111 (yyyyMMdd)`

`qds connect host:port Trade,Quote,Profile,Fundamental YHOO`

Read tape files:

`qds connect file:$(file) Quote all -c stream,ticker`
