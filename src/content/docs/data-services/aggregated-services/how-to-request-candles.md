---
title: "How to Request Candles"
paligoOriginId: "887"
---

## Overview

dxFeed Aggregated Data Services provides different types of aggregations that are available:

- Via [Candlewebservice](/data-services/aggregated-services/candlewebservice/#candlewebservice) for requesting Candle data for a particular time period in the past with from-to period.
- Through any supported API ([ Java API](https://dxfeed.com/api/java-api/), [Webservice](https://dxfeed.com/api/javascript-and-rest-apis/), etc.) for requesting historical Candle data with live updates from a particular period in the past. This method has fewer restrictions to the data depth, both in numbers of candles and aggregations.

## Request format

The general format of a candle symbol is:

```
<baseSymbol>[&]<exchange>{=[<period>]<type>[,a=s][,price=<priceType>][,tho=true]}
```

Request arguments

| Argument | Value | Description | Required |
| --- | --- | --- | --- |
| type | String | The type of candle | Required |
| tho=true | String | Requests that candle data is being limited to regular trading session only (and extended session ignored) | Optional. By default, all trades/quotes are included |
| priceType | String | The type of the price that is used to build candles | Optional (Required for FOREX). By default, last trade price is used |
| period | 1 | The number of aggregation periods of a specified type in each candle | Optional, it is set to 1 by default |
| exchange | String | The exchange code | Optional, By default, candle is composed from trades/quotes from all exchanges |
| baseSymbol | String | The market symbol (like `IBM`, `MSFT`, etc) | Required |
| a=s | String | Changes candle alignment to trading session | Optional. By default, candles are aligned to midnight |

Type supported values are:

- t - tick
- s- second
- m - minute
- h - hour
- d - day
- w - week
- mo - month
- o - standard option expiration (3rd Friday of the month)
- y - year
- v - volume
- p - price

priceType supported values are:

- last - last trade price
- bid - quote bid price
- ask - quote ask price
- mark - market price defined as average between quote bid and ask prices
- s - settlement price

Please try [demo](https://tools.dxfeed.com/webservice/chart-demo.jsp)

## Examples

### Java Example 1

```java
import java.io.*;
import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.*;
import java.util.concurrent.TimeUnit;
import com.devexperts.util.TimeFormat;
import com.dxfeed.api.*;
import com.dxfeed.event.candle.*;
 
public class CandleSub {
    static int eventsProcessed;
    public static final CandlePeriod PERIOD = CandlePeriod.valueOf(2, CandleType.HOUR);
 
    public static void main(String[] args) throws InterruptedException, IOException {
        new CandleSub().start(args);
    }
 
    private void start(String[] args) throws InterruptedException, IOException {
 
        DXEndpoint endpoint = DXEndpoint.create(DXEndpoint.Role.FEED);
        DXFeed feed = endpoint.getFeed();
 
        // subscribe to a specified event and symbol
        DXFeedTimeSeriesSubscription<Candle> sub = feed.createTimeSeriesSubscription(Candle.class);
        sub.addEventListener(new CandleListener());
 
        sub.setFromTime(System.currentTimeMillis() - TimeUnit.DAYS.toMillis(10));
        CandleSymbol eurUsd = CandleSymbol.valueOf("EUR/USD", CandlePrice.BID, PERIOD);
        sub.addSymbols(eurUsd); // "EUR/USD{price=bid}");
 
 
        String QD_ADDRESS = "10.10.10.10:1010"; // Endpoint
        endpoint.connect(QD_ADDRESS);
 
        // wait until file is completely parsed
        endpoint.awaitNotConnected();
 
        // close endpoint when we're done
        // this method will gracefully close endpoint, waiting while data processing completes
        endpoint.closeAndAwaitTermination();
    }
 
    private class CandleListener implements DXFeedEventListener<Candle> {
 
        public void eventsReceived(List<Candle> candles) {
            for (Candle candle : candles) {
                eventsProcessed++;
                CandleSymbol symbol = candle.getEventSymbol();
                if (candle.getTime() + PERIOD.getPeriodIntervalMillis() > System.currentTimeMillis())
                    ; // skipping unfinished candle
                else
                    System.out.println("Got candle for symbol " + symbol + " : " + candle);
            }
        }
    }
 }
```

### Java Example 2

```java
import java.io.*;
import java.util.*;
import java.util.concurrent.TimeUnit;
 
import com.dxfeed.api.*;
import com.dxfeed.event.candle.*;
import com.dxfeed.promise.Promise;
 
public class CandleGetViaPromise {
    static int eventsProcessed;
    public static final CandlePeriod PERIOD = CandlePeriod.valueOf(1, CandleType.DAY);
 
    public static void main(String[] args) throws InterruptedException, IOException {
        new CandleGetViaPromise().start(args);
    }
 
    private void start(String[] args) throws InterruptedException, IOException {
 
        DXEndpoint endpoint = DXEndpoint.create(DXEndpoint.Role.FEED);//.user("username").password("password");
        String QD_ADDRESS = "10.10.10.10:1010"; // Endpoint
        endpoint.connect(QD_ADDRESS);
 
        DXFeed feed = endpoint.getFeed();
 
        String symbol = "EUR/USD";
        CandleSymbol eurUsd = CandleSymbol.valueOf(symbol, CandlePrice.BID, PERIOD);
 
        endpoint.connect(QD_ADDRESS);
 
        Thread.sleep(5000L);
 
        long fromTime = System.currentTimeMillis() - TimeUnit.DAYS.toMillis(10);
        long toTime = System.currentTimeMillis() - TimeUnit.DAYS.toMillis(5);
 
        List<Candle> onlySelectedCandles = feed.getTimeSeriesIfSubscribed(Candle.class, eurUsd, fromTime, toTime);
        printAndCountCandles(onlySelectedCandles, "[GET SUBSCRIBED] ");
 
        Promise<List<Candle>> requested = feed.getTimeSeriesPromise(Candle.class, eurUsd, fromTime, toTime);
        requested.await();
        printAndCountCandles(requested.getResult(), "[GET VIA PROMISE] ");
 
        // wait until file is completely parsed
        endpoint.awaitNotConnected();
 
        // close endpoint when we're done
        // this method will gracefully close endpoint, waiting while data processing completes
        endpoint.closeAndAwaitTermination();
    }
 
    private void printAndCountCandles(List<Candle> candles, String prefix) {
        int nCandles = 0;
        System.out.println("Got prefix: " + prefix + " and candles: " + candles);
        if (candles == null) {
            System.out.println("Got null candles - exiting");
            return;
        }
        for (Candle candle : candles) {
            eventsProcessed++;
            nCandles++;
            CandleSymbol symbol = candle.getEventSymbol();
            if (candle.getTime() + PERIOD.getPeriodIntervalMillis() > System.currentTimeMillis()) {
                ; // skipping unfinished candle
            } else {
                System.out.println(prefix + "Got candle for symbol " + symbol + " : " + candle);
            }
        }
        System.out.println(prefix + "Totally got " + nCandles + " candles");
    }
}
```

### C#

```java
using com.dxfeed.api;
using com.dxfeed.api.data;
using com.dxfeed.api.events;
using com.dxfeed.native;
using com.dxfeed.ipf;
using System.Collections.Generic;
using System;
using System.Globalization;

namespace CandleSample
{
    public class Program
    {
        private static void Main(string[] args)
        {
            var QDEndpoint = "demo.dxfeed.com:7300";

            var IPFfile = "https://tools.dxfeed.com/ipf?SYMBOL=IBM,MSFT";
            var user = "demo";
            var password = "demo";

            var reader = new InstrumentProfileReader();
           
            IList<InstrumentProfile> profiles;

            profiles = reader.ReadFromFile(IPFfile, user, password);

            List<string> candleSymbols = new List<string> { };

            using (var con = new NativeConnection(QDEndpoint, _ => { }))
            {
                var fromTime = extractDateTimeFromString("20230101", "yyyymmdd");

                IDxSubscription candleSubscription = con.CreateSubscription(fromTime, new CandleListener());

                for (var index = 0; index < profiles.Count; index++)
                {
                    var symbol = profiles[index].GetSymbol();

                    candleSymbols.Add(aggregate(symbol, "{=d}"));
                }

                candleSubscription.AddSymbols(candleSymbols.ToArray());

                Console.ReadLine();

                candleSubscription.Dispose();
            }

        }

        private class CandleListener : IDxCandleListener
        {
            public void OnCandle<TB, TE>(TB candles)
                where TB : IDxEventBuf<TE>
                where TE : IDxCandle
            {
                foreach (var candle in candles)
                {
                    /*
                     * (0x04) SNAPSHOT_BEGIN indicates when the loading of a snapshot starts. Snapshot load starts on new subscription and
                     * the first indexed event that arrives for each exchange code (in the case of a regional record) on a new
                     * subscription may have SNAPSHOT_BEGIN set to true. It means that an ongoing snapshot consisting of multiple
                     * events is incoming
                     */
                    
                    if (candle.EventFlags == EventFlag.SnapshotBegin)
                        Console.WriteLine("SNAPSHOT STARTS HERE\n");

                    Console.WriteLine(candle);

                    /*
                     * (0x08) SNAPSHOT_END or (0x10) SNAPSHOT_SNIP indicates the end of a snapshot. The difference between SNAPSHOT_END and
                     * SNAPSHOT_SNIP is the following: SNAPSHOT_END indicates that the data source sent all the data pertaining to
                     * the subscription for the corresponding indexed event, while SNAPSHOT_SNIP indicates that some limit on the
                     * amount of data was reached and while there still might be more data available, it will not be provided.
                     * 
                     * (0x02) REMOVE_EVENT indicates that the event with the corresponding index has to be removed
                     */

                    if (((int)candle.EventFlags) == (((int)EventFlag.RemoveEvent) + ((int)EventFlag.SnapshotEnd)) ||
                        ((int)candle.EventFlags) == (((int)EventFlag.RemoveEvent) + ((int)EventFlag.SnapshotSnip)))
                        Console.WriteLine("\nSNAPSHOT ENDS HERE\n");
                }
            }
        }

        public static string aggregate(string symbol, string aggregation)
        {
            return symbol + aggregation;
        }

        public static DateTime extractDateTimeFromString(string date, string format)
        {
            return DateTime.ParseExact(date, format, CultureInfo.InvariantCulture, DateTimeStyles.AssumeUniversal);
        }
    }
}
```

### REST

```bash
curl -X GET -u IPFlogin:IPFpassword "https://tools.dxfeed.com/webservice/rest/events.json?events=Candle&symbols=MSFT&sources=NYSE&indent"
{
  "status" : "OK",
  "Candle" : {
    "MSFT" : [ {
      "eventSymbol" : "MSFT",
      "eventTime" : 0,
      "eventFlags" : 0,
      "index" : 6659879986868184211,
      "time" : 1550624144000,
      "sequence" : 189587,
      "count" : 1,
      "open" : 108.17,
      "high" : 108.17,
      "low" : 108.17,
      "close" : 108.17,
      "volume" : 447.0,
      "vwap" : "NaN",
      "bidVolume" : "NaN",
      "askVolume" : "NaN",
      "impVolatility" : "NaN"
    } ]
  }
```
