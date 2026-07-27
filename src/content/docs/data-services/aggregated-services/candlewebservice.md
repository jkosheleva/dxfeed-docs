---
title: "Candlewebservice"
paligoOriginId: "25875"
---

## Overview

Candlewebservice provides Candle and TimeAndSale data for particular time period in the past with from-to period via REST-like API. Request structure is similar to [How to Request TickData](/data-services/historical-services/how-to-request-tick-data/#how-to-request-tick-data).

## Request structure

Available parameters for the Candlewebservice request:

- records - record names enumaration (Candle or TimeAndSale)
- symbols - comma-separated list of symbols (e.g. `AAPL{=d},GOOG{=d},NFLX`). Read the [How to Request Candles](/data-services/aggregated-services/how-to-request-candles/#how-to-request-candles) and [CandleSymbol](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/candle/CandleSymbol.html) articles to get more information
- start - start time as `YYYYMMDD-HHMMSS[.sss][zone]`(time string is parsed similarly to DateTimeFormatter that is capable of parsing various data formats, like [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) some examples) and epoch time (should be in milliseconds). Depending on your permissions, there may be a limit on how far back the start date can be set
- stop - stop time as `YYYYMMDD-HHMMSS[.sss][zone]` (stop time should be higher than start time). The stop date should be greater than the start date, with a maximum range of seven days
- format - output format - text, csv or binary (optional, text by default)
- compression - output compression - none, zip or gzip (optional, none by default)

To get help with data extraction for the specified parameters as a tape in the specified format use [https://tools-demo.dxfeed.com/candledata-preview?<parameters>](https://tools-demo.dxfeed.com/candledata-preview?<parameters>). Extracts data for the specified parameters as a tape in the specified format. The full list of parameters is available on the [help page](https://tools-demo.dxfeed.com/candledata-preview?help).

The result list is sorted by **<EventSymbol,Time,Sequence>** fields.

## Examples

Use demo/demo credentials to check examples. Using a demo account provides reduced history depth and available symbols. Therefore, time period for start and stop parameters should be close to a current day. Find more detailed information at  [Aggregated Data Services Overview](/data-services/aggregated-services/candle-types/#candle-types).

### Candle Request Example

To request Candle data, use the following URL structure. Note that dates must be updated manually to ensure the link remains valid: [https://tools-demo.dxfeed.com/candledata-preview?records=Candle&symbols=IBM{=d}&start=20210506-030000&stop=20210510-100000](https://tools-demo.dxfeed.com/candledata-preview?records=Candle&symbols=IBM{=d}&start=20210506-030000&stop=20210510-100000)

#### Response

```

==HISTORY_DATA

=Candle EventSymbol    EventTime      Time    Sequence       Count   Open    High    Low     Close   Volume  VWAP    BidVolume       AskVolume   ImpVolatility   OpenInterest

Candle  IBM{=d} 20210506-200000.000-0400      20210506-200000-0400   0      27632   145.92  146.14   144.57  145.46  7003467 145.4513332162505   2140438 3094891 0.2221  NaN   EventFlags=SNAPSHOT_BEGIN

Candle  IBM{=d} 20210506-200000.000-0400      20210506-200000-0400   0      27632   145.92  146.14   144.57  145.46  7003467 145.4513332162505   2140438 3094891 0.2221  NaN

Candle  IBM{=d} 20210509-200000.000-0400      20210509-200000-0400   0      24466   145.8   148.38   145.8   146.17  6983377 147.0019104184122   2361835 3441675 0.2384  NaN   EventFlags=SNAPSHOT_END
```

### TimeAndSale Request Example

[https://tools-demo.dxfeed.com/candledata-preview?records=TimeAndSale&symbols=IBM&start=20210510-093000&stop=20210510-093100](https://tools-demo.dxfeed.com/candledata-preview?records=TimeAndSale&symbols=IBM&start=20210510-093000&stop=20210510-093100) to request TimeAndSale data.

#### Response

```

==HISTORY_DATA

=TimeAndSale   EventSymbol    EventTime      Time     Sequence       ExchangeCode     Price   Size    BidPrice        AskPrice        SaleConditions   Flags     Buyer      Seller

TimeAndSale    IBM     20210510-093000.136-0400       20210510-093000-0400    136:338   Z     145.93  22     145.64   145.94  "   I"  12320   \NULL    \NULL     EventFlags=SNAPSHOT_BEGIN

TimeAndSale    IBM     20210510-093000.214-0400       20210510-093000-0400    214:339   K     145.91  1       145.64  145.94  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093000.214-0400       20210510-093000-0400    214:340   K     145.91  6       145.64  145.94  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093000.214-0400       20210510-093000-0400    214:341   K     145.91  6       145.64  145.94  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093000.275-0400       20210510-093000-0400    275:342   Q     146     74      145.64  145.94  " O I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093000.275-0400       20210510-093000-0400    275:343   Q     146     74      145.64  145.94  "   Q"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093000.450-0400       20210510-093000-0400    450:344   K     145.91  3       145.64  145.94  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093000.495-0400       20210510-093000-0400    495:345   K     145.91  1       145.64  145.94  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093000.656-0400       20210510-093000-0400    656:346   K     145.91  1       145.64  145.94  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093000.815-0400       20210510-093000-0400    815:347   K     145.94  2       145.64  145.94  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093001.257-0400       20210510-093001-0400    257:349   N     145.8   141968  145.64  145.94  " O  "  12580   \NULL    \NULL

TimeAndSale    IBM     20210510-093001.257-0400       20210510-093001-0400    257:350   N     145.8   141968  145.64  145.94  "   Q"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093001.258-0400       20210510-093001-0400    258:458   D     145.94  69      145.8   145.93  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093001.259-0400       20210510-093001-0400    259:459   D     145.94  10      145.8   145.93  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093001.268-0400       20210510-093001-0400    268:352   N     145.81  100     145.64  145.94  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093001.270-0400       20210510-093001-0400    270:354   N     145.84  2289    145.8   145.84  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093001.271-0400       20210510-093001-0400    271:355   N     145.84  8       145.8   145.84  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093001.271-0400       20210510-093001-0400    271:356   N     145.84  10      145.8   145.84  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093001.271-0400       20210510-093001-0400    271:357   N     145.84  45      145.8   145.84  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093001.271-0400       20210510-093001-0400    271:359   N     145.84  100     145.8   145.84  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093001.272-0400       20210510-093001-0400    272:361   Q     145.8   97      145.8   145.84  " F I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093001.272-0400       20210510-093001-0400    272:363   Q     145.8   3       145.8   145.84  " F I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093001.273-0400       20210510-093001-0400    273:360   N     145.8   12      145.8   145.84  " F I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093001.273-0400       20210510-093001-0400    273:362   N     145.8   79      145.8   145.84  " F I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093001.275-0400       20210510-093001-0400    275:364   N     145.84  68      145.8   145.84  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093001.280-0400       20210510-093001-0400    280:366   N     145.84  980     145.81  145.84  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093001.285-0400       20210510-093001-0400    285:367   Z     145.81  11      145.81  145.88  " F I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093001.323-0400       20210510-093001-0400    323:381   D     145.86  1       145.81  145.88  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093001.342-0400       20210510-093001-0400    342:368   Q     145.845 17      145.81  145.88  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093001.342-0400       20210510-093001-0400    342:369   Q     145.82  83      145.81  145.88  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093001.345-0400       20210510-093001-0400    345:371   V     145.81  100     145.81  145.88  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093001.413-0400       20210510-093001-0400    413:372   Z     145.81  5       145.81  145.88  " F I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093001.426-0400       20210510-093001-0400    426:373   Z     145.81  1       145.81  145.88  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093001.449-0400       20210510-093001-0400    449:374   Z     145.88  1       145.81  145.88  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093001.505-0400       20210510-093001-0400    505:375   Z     145.81  38      145.81  145.88  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093001.513-0400       20210510-093001-0400    513:377   D     145.87  100     145.81  145.88  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093001.514-0400       20210510-093001-0400    514:385   D     145.88  121     145.81  145.88  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093001.783-0400       20210510-093001-0400    783:378   N     145.86  1       145.81  145.88  "   I"  12320   \NULL    \NULL
  
TimeAndSale    IBM     20210510-093001.785-0400       20210510-093001-0400    785:379   U     145.88  99      145.81  145.88  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093001.802-0400       20210510-093001-0400    802:380   N     145.88  16      145.81  145.88  "   I"  12320   \NULL    \NULL
 
TimeAndSale    IBM     20210510-093001.875-0400       20210510-093001-0400    875:398   D     145.82  100     145.81  145.88  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093001.875-0400       20210510-093001-0400    875:453   D     145.8101 97     145.8   145.93  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093002.007-0400       20210510-093002-0400    7:399     D     145.64  1       145.81  145.88  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093002.065-0400       20210510-093002-0400    65:383    D     145.88  100     145.81  145.88  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093002.258-0400       20210510-093002-0400    258:386   J     145.87  50      145.81  145.88  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093002.282-0400       20210510-093002-0400    282:387   J     145.87  1       145.81  145.88  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093002.290-0400       20210510-093002-0400    290:388   J     145.87  1       145.81  145.88  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093002.290-0400       20210510-093002-0400    290:389   Z     145.82  1       145.81  145.88  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093002.292-0400       20210510-093002-0400    292:390   J     145.87  1       145.81  145.88  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093002.292-0400       20210510-093002-0400    292:391   Z     145.82  1       145.81  145.88  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093002.293-0400       20210510-093002-0400    293:392   Z     145.82  1       145.81  145.88  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093002.293-0400       20210510-093002-0400    293:393   J     145.87  1       145.81  145.88  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093002.295-0400       20210510-093002-0400    295:394   J     145.87  1       145.81  145.88  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093002.295-0400       20210510-093002-0400    295:395   J     145.87  1       145.81  145.88  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093002.361-0400       20210510-093002-0400    361:396   N     145.82  1       145.81  145.88  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093002.462-0400       20210510-093002-0400    462:400   Z     145.81  1       145.81  145.88  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093002.462-0400       20210510-093002-0400    462:401   Q     145.845 90      145.81  145.88  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093002.463-0400       20210510-093002-0400    463:402   J     145.87  1       145.81  145.88  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093002.551-0400       20210510-093002-0400    551:411   Z     145.87  100     145.81  145.88  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093002.552-0400       20210510-093002-0400    552:404   P     145.88  100     145.81  145.88  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093002.552-0400       20210510-093002-0400    552:405   P     145.88  100     145.81  145.88  "   Q"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093002.552-0400       20210510-093002-0400    552:406   P     145.88  2       145.81  145.88  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093002.552-0400       20210510-093002-0400    552:408   N     145.88  700     145.81  145.88  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093002.552-0400       20210510-093002-0400    552:409   P     145.88  98      145.81  145.88  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093002.552-0400       20210510-093002-0400    552:413   N     145.88  100     145.81  145.88  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093002.552-0400       20210510-093002-0400    552:414   J     145.88  80      145.81  145.88  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093002.552-0400       20210510-093002-0400    552:416   N     145.88  100     145.81  145.88  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093002.585-0400       20210510-093002-0400    585:417   Z     145.82  1       145.81  145.9   "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093002.586-0400       20210510-093002-0400    586:418   Z     145.82  1       145.81  145.9   "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093002.586-0400       20210510-093002-0400    586:419   Z     145.82  3       145.81  145.9   "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093002.603-0400       20210510-093002-0400    603:420   N     145.88  87      145.81  145.93  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093002.603-0400       20210510-093002-0400    603:421   P     145.88  2       145.81  145.93  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093002.603-0400       20210510-093002-0400    603:422   K     145.88  1       145.81  145.93  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093002.603-0400       20210510-093002-0400    603:423   Q     145.88  7       145.81  145.93  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093002.802-0400       20210510-093002-0400    802:424   D     145.64  1       145.84  145.93  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093002.804-0400       20210510-093002-0400    804:815   D     145.88  1       146.01  146.08  " Z I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.096-0400       20210510-093003-0400    96:425    D     145.64  1       145.84  145.93  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.297-0400       20210510-093003-0400    297:426   D     145.64  1       145.84  145.93  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.398-0400       20210510-093003-0400    398:837   D     145.88  1       146.03  146.09  " Z I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.511-0400       20210510-093003-0400    511:428   D     145.85  100     145.84  145.93  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.511-0400       20210510-093003-0400    511:493   D     145.8407 2      145.83  145.9   "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.524-0400       20210510-093003-0400    524:516   D     145.8   8       145.77  145.88  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.524-0400       20210510-093003-0400    524:553   D     145.8   1       145.83  145.93  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.524-0400       20210510-093003-0400    524:554   D     145.8   1       145.83  145.93  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.524-0400       20210510-093003-0400    524:639   D     145.8   2       145.91  145.96  " 4ZI"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.524-0400       20210510-093003-0400    524:640   D     145.8   15      145.91  145.96  " 4ZI"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.524-0400       20210510-093003-0400    524:641   D     145.8   38      145.91  145.96  " 4ZI"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.524-0400       20210510-093003-0400    524:642   D     145.8   1       145.91  145.96  " 4ZI"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.525-0400       20210510-093003-0400    525:517   D     145.8   10      145.77  145.88  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.525-0400       20210510-093003-0400    525:555   D     145.8   3       145.83  145.93  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.525-0400       20210510-093003-0400    525:556   D     145.8   2       145.83  145.93  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.525-0400       20210510-093003-0400    525:643   D     145.8   4       145.91  145.96  " 4ZI"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.525-0400       20210510-093003-0400    525:644   D     145.8   38      145.91  145.96  " 4ZI"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.525-0400       20210510-093003-0400    525:645   D     145.8   45      145.91  145.96  " 4ZI"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.526-0400       20210510-093003-0400    526:518   D     145.8   1       145.77  145.88  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.526-0400       20210510-093003-0400    526:557   D     145.8   2       145.83  145.93  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.526-0400       20210510-093003-0400    526:558   D     145.8   10      145.83  145.93  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.526-0400       20210510-093003-0400    526:559   D     145.8   1       145.83  145.93  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.526-0400       20210510-093003-0400    526:646   D     145.8   153     145.91  145.96  " 4Z "  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.526-0400       20210510-093003-0400    526:647   D     145.8   10      145.91  145.96  " 4ZI"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.526-0400       20210510-093003-0400    526:648   D     145.8   1       145.91  145.96  " 4ZI"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.527-0400       20210510-093003-0400    527:519   D     145.8   10      145.77  145.88  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.527-0400       20210510-093003-0400    527:560   D     145.8   50      145.83  145.93  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.527-0400       20210510-093003-0400    527:561   D     145.8   159     145.83  145.93  " 4  "  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.527-0400       20210510-093003-0400    527:649   D     145.8   10      145.91  145.96  " 4ZI"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.527-0400       20210510-093003-0400    527:650   D     145.8   1       145.91  145.96  " 4ZI"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.527-0400       20210510-093003-0400    527:651   D     145.8   5       145.91  145.96  " 4ZI"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.527-0400       20210510-093003-0400    527:652   D     145.8   1       145.91  145.96  " 4ZI"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.569-0400       20210510-093003-0400    569:429   D     145.93  80      145.81  145.93  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.859-0400       20210510-093003-0400    859:880   D     145.85  1       146.03  146.09  "  ZI"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.884-0400       20210510-093003-0400    884:883   D     145.85  1       146.04  146.09  "  ZI"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.896-0400       20210510-093003-0400    896:430   N     145.88  84      145.81  145.93  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.896-0400       20210510-093003-0400    896:432   N     145.88  484     145.88  145.93  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.897-0400       20210510-093003-0400    897:433   V     145.88  15      145.88  145.93  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.898-0400       20210510-093003-0400    898:435   V     145.88  185     145.88  145.93  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093003.898-0400       20210510-093003-0400    898:436   V     145.88  15      145.8   145.93  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093004.054-0400       20210510-093004-0400    54:443    D     145.865 6       145.8   145.93  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093004.158-0400       20210510-093004-0400    158:891   D     145.88  1       146.03  146.09  "  ZI"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093004.495-0400       20210510-093004-0400    495:441   D     145.93  137     145.8   145.93  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093004.496-0400       20210510-093004-0400    496:437   N     145.88  3       145.8   145.93  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093004.496-0400       20210510-093004-0400    496:438   N     145.9   10      145.8   145.93  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093004.496-0400       20210510-093004-0400    496:439   N     145.92  44      145.8   145.93  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093004.618-0400       20210510-093004-0400    618:442   N     145.92  11      145.8   145.93  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093004.764-0400       20210510-093004-0400    764:953   D     145.93  1       145.99  146.06  "  ZI"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093005.056-0400       20210510-093005-0400    56:577    D     145.8   26      145.85  145.93  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093005.061-0400       20210510-093005-0400    61:708    D     145.8   50      145.88  145.96  " 4ZI"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093005.063-0400       20210510-093005-0400    63:709    D     145.8   8       145.88  145.96  " 4ZI"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093005.063-0400       20210510-093005-0400    63:710    D     145.8   30      145.88  145.96  " 4ZI"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093005.117-0400       20210510-093005-0400    117:578   D     145.8   10      145.85  145.93  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093005.119-0400       20210510-093005-0400    119:579   D     145.8   5       145.85  145.93  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093005.121-0400       20210510-093005-0400    121:580   D     145.8   1       145.85  145.93  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093005.121-0400       20210510-093005-0400    121:711   D     145.8   2       145.88  145.96  " 4ZI"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093005.121-0400       20210510-093005-0400    121:712   D     145.8   1       145.88  145.96  " 4ZI"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093005.121-0400       20210510-093005-0400    121:713   D     145.8   2       145.88  145.96  " 4ZI"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093005.121-0400       20210510-093005-0400    121:714   D     145.8   1       145.88  145.96  " 4ZI"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093005.122-0400       20210510-093005-0400    122:581   D     145.8   3       145.85  145.93  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093005.122-0400       20210510-093005-0400    122:582   D     145.8   1       145.85  145.93  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093005.122-0400       20210510-093005-0400    122:715   D     145.8   1       145.88  145.96  " 4ZI"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093005.122-0400       20210510-093005-0400    122:716   D     145.8   10      145.88  145.96  " 4ZI"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093005.122-0400       20210510-093005-0400    122:717   D     145.8   2       145.88  145.96  " 4ZI"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093005.122-0400       20210510-093005-0400    122:718   D     145.8   1       145.88  145.96  " 4ZI"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093005.122-0400       20210510-093005-0400    122:719   D     145.8   1       145.88  145.96  " 4ZI"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093005.123-0400       20210510-093005-0400    123:583   D     145.8   1       145.85  145.93  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093005.123-0400       20210510-093005-0400    123:584   D     145.8   1       145.85  145.93  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093005.123-0400       20210510-093005-0400    123:585   D     145.8   3       145.85  145.93  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093005.123-0400       20210510-093005-0400    123:720   D     145.8   2       145.88  145.96  " 4ZI"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093005.123-0400       20210510-093005-0400    123:721   D     145.8   3       145.88  145.96  " 4ZI"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093005.123-0400       20210510-093005-0400    123:722   D     145.8   1       145.88  145.96  " 4ZI"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093005.124-0400       20210510-093005-0400    124:723   D     145.8   2       145.88  145.96  " 4ZI"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093005.125-0400       20210510-093005-0400    125:574   D     145.8   75      145.85  145.93  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093005.127-0400       20210510-093005-0400    127:984   D     145.93  1       146     146.03  "  ZI"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093005.209-0400       20210510-093005-0400    209:444   D     145.8   1       145.8   145.93  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093005.431-0400       20210510-093005-0400    431:445   D     145.8   1       145.8   145.93  "   I"  12352    \NULL   \NULL

TimeAndSale    IBM     20210510-093005.670-0400       20210510-093005-0400    670:1004  D     145.93  1       145.97  146.03  "  ZI"  12352    \NULL   \NULL

TimeAndSale    IBM     20210510-093005.675-0400       20210510-093005-0400    675:1001  D     145.93  1       145.97  146.03  "  ZI"  12352    \NULL   \NULL

TimeAndSale    IBM     20210510-093005.740-0400       20210510-093005-0400    740:446   V     145.86  12      145.8   145.93  "   I"  12352    \NULL   \NULL

TimeAndSale    IBM     20210510-093005.744-0400       20210510-093005-0400    744:447   V     145.85  4       145.8   145.93  "   I"  12352    \NULL   \NULL

TimeAndSale    IBM     20210510-093005.777-0400       20210510-093005-0400    777:455   D     145.92  87      145.8   145.93  "   I"  12320    \NULL   \NULL

TimeAndSale    IBM     20210510-093005.777-0400       20210510-093005-0400    777:457   D     145.92  100     145.8   145.93  "    "  12324    \NULL   \NULL

TimeAndSale    IBM     20210510-093005.778-0400       20210510-093005-0400    778:449   V     145.92  100     145.8   145.93  "    "  12324    \NULL   \NULL

TimeAndSale    IBM     20210510-093005.778-0400       20210510-093005-0400    778:450   V     145.93  13      145.8   145.93  "   I"  12320    \NULL   \NULL

TimeAndSale    IBM     20210510-093005.778-0400       20210510-093005-0400    778:452   J     145.92  100     145.8   145.93  "    "  12324    \NULL   \NULL

TimeAndSale    IBM     20210510-093005.993-0400       20210510-093005-0400    993:454   N     145.92  45      145.8   145.93  "   I"  12320    \NULL   \NULL

TimeAndSale    IBM     20210510-093006.170-0400       20210510-093006-0400    170:1111  D     145.92  1       146.07  146.14  "  ZI"  12352    \NULL   \NULL

TimeAndSale    IBM     20210510-093006.527-0400       20210510-093006-0400    527:492   D     145.8   1       145.82  145.9   "  4I"  12608    \NULL   \NULL

TimeAndSale    IBM     20210510-093006.600-0400       20210510-093006-0400    600:513   D     145.8   1       145.77  145.92  "  4I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093006.669-0400       20210510-093006-0400    669:514   D     145.8   1       145.77  145.92  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093006.764-0400       20210510-093006-0400    764:461   D     145.865 262     145.8   145.93  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093006.764-0400       20210510-093006-0400    764:463   D     145.865 100     145.8   145.93  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093006.975-0400       20210510-093006-0400    975:464   D     145.64  1       145.8   145.93  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.034-0400       20210510-093007-0400    34:465    Q     145.86  20      145.8   145.93  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.088-0400       20210510-093007-0400    88:466    Q     145.85  20      145.8   145.93  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.088-0400       20210510-093007-0400    88:467    Q     145.85  20      145.84  145.93  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.089-0400       20210510-093007-0400    89:471    Q     145.84  20      145.84  145.93  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.089-0400       20210510-093007-0400    89:473    J     145.84  100     145.84  145.93  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.089-0400       20210510-093007-0400    89:475    Z     145.84  100     145.84  145.93  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.089-0400       20210510-093007-0400    89:476    Q     145.88  10      145.84  145.93  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.089-0400       20210510-093007-0400    89:477    Q     145.9   90      145.84  145.93  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.089-0400       20210510-093007-0400    89:478    Q     145.84  10      145.84  145.93  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.090-0400       20210510-093007-0400    90:469    N     145.84  100     145.84  145.93  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.090-0400       20210510-093007-0400    90:470    P     145.84  69      145.84  145.93  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.090-0400       20210510-093007-0400    90:479    K     145.87  1       145.84  145.93  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.090-0400       20210510-093007-0400    90:480    Q     145.87  10      145.84  145.92  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.090-0400       20210510-093007-0400    90:481    Q     145.84  10      145.8   145.88  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.090-0400       20210510-093007-0400    90:483    Q     145.88  100     145.82  145.88  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.090-0400       20210510-093007-0400    90:484    Q     145.9   10      145.82  145.88  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.090-0400       20210510-093007-0400    90:485    Q     145.86  45      145.86  145.88  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.090-0400       20210510-093007-0400    90:486    Q     145.86  55      145.82  145.88  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.090-0400       20210510-093007-0400    90:487    Q     145.86  10      145.82  145.92  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.090-0400       20210510-093007-0400    90:488    Q     145.86  1       145.82  145.92  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.090-0400       20210510-093007-0400    90:489    Z     145.86  10      145.82  145.92  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.091-0400       20210510-093007-0400    91:490    N     145.84  1       145.82  145.92  " F I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.091-0400       20210510-093007-0400    91:491    Q     145.86  40      145.82  145.92  " F I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.140-0400       20210510-093007-0400    140:494   Q     145.83  90      145.83  145.9   "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.140-0400       20210510-093007-0400    140:496   Q     145.83  100     145.83  145.9   "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.140-0400       20210510-093007-0400    140:498   Q     145.81  110     145.8   145.81  "  F "  12580   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.140-0400       20210510-093007-0400    140:499   Q     145.81  10      145.8   145.87  " F I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.140-0400       20210510-093007-0400    140:500   Q     145.81  10      145.8   145.87  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.140-0400       20210510-093007-0400    140:501   P     145.8   7       145.8   145.87  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.140-0400       20210510-093007-0400    140:503   N     145.8   2493    145.8   145.87  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.140-0400       20210510-093007-0400    140:504   P     145.8   1       145.8   145.87  " F I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.140-0400       20210510-093007-0400    140:505   N     145.8   24      145.8   145.87  " F I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.140-0400       20210510-093007-0400    140:506   Z     145.8   99      145.8   145.87  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.140-0400       20210510-093007-0400    140:507   Q     145.8   1       145.77  145.87  " F I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.140-0400       20210510-093007-0400    140:509   Q     145.8   100     145.77  145.87  " F  "  12612   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.171-0400       20210510-093007-0400    171:510   N     145.83  50      145.77  145.93  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.226-0400       20210510-093007-0400    226:511   K     145.89  1       145.77  145.92  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.276-0400       20210510-093007-0400    276:512   N     145.86  1       145.77  145.92  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093007.527-0400       20210510-093007-0400    527:544   D     145.89  1       145.8   145.93  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093008.214-0400       20210510-093008-0400    214:515   D     145.8   1       145.77  145.88  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093008.961-0400       20210510-093008-0400    961:520   V     145.86  1       145.77  145.88  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093009.326-0400       20210510-093009-0400    326:568   D     145.8609 1      145.85  145.92  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093009.820-0400       20210510-093009-0400    820:522   N     145.86  100     145.77  145.88  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093009.820-0400       20210510-093009-0400    820:524   Q     145.86  100     145.77  145.88  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093009.820-0400       20210510-093009-0400    820:526   N     145.88  110     145.78  145.88  "  F "  12580   \NULL    \NULL

TimeAndSale    IBM     20210510-093009.820-0400       20210510-093009-0400    820:528   Q     145.87  100     145.78  145.88  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093009.820-0400       20210510-093009-0400    820:529   Q     145.88  11      145.78  145.88  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093009.820-0400       20210510-093009-0400    820:531   Q     145.88  200     145.78  145.88  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093009.820-0400       20210510-093009-0400    820:532   U     145.88  1       145.8   145.88  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093009.820-0400       20210510-093009-0400    820:534   Z     145.86  100     145.8   145.88  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093009.820-0400       20210510-093009-0400    820:535   Z     145.87  3       145.8   145.88  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093009.820-0400       20210510-093009-0400    820:536   Z     145.88  3       145.8   145.88  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093009.820-0400       20210510-093009-0400    820:539   V     145.86  99      145.8   145.89  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093009.820-0400       20210510-093009-0400    820:540   V     145.86  1       145.8   145.89  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093009.821-0400       20210510-093009-0400    821:538   P     145.88  100     145.8   145.88  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093009.821-0400       20210510-093009-0400    821:542   D     145.858 100     145.8   145.93  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093010.113-0400       20210510-093010-0400    113:543   D     145.93  1       145.8   145.93  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093010.821-0400       20210510-093010-0400    821:546   Q     145.87  100     145.8   145.93  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093010.821-0400       20210510-093010-0400    821:548   Q     145.86  100     145.8   145.87  "  F "  12580   \NULL    \NULL

TimeAndSale    IBM     20210510-093010.821-0400       20210510-093010-0400    821:550   Q     145.85  100     145.82  145.93  "  F "  12612   \NULL    \NULL

TimeAndSale    IBM     20210510-093010.821-0400       20210510-093010-0400    821:552   Q     145.84  100     145.82  145.93  "  F "  12612   \NULL    \NULL

TimeAndSale    IBM     20210510-093011.105-0400       20210510-093011-0400    105:562   Q     145.88  4       145.83  145.93  " F I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093011.214-0400       20210510-093011-0400    214:563   Q     145.88  50      145.83  145.93  " F I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093011.214-0400       20210510-093011-0400    214:564   Q     145.88  17      145.83  145.93  " F I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093011.296-0400       20210510-093011-0400    296:570   D     145.92  100     145.85  145.92  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093011.404-0400       20210510-093011-0400    404:565   Z     145.92  1       145.85  145.92  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093011.404-0400       20210510-093011-0400    404:566   K     145.9   1       145.85  145.92  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093011.404-0400       20210510-093011-0400    404:567   K     145.9   7       145.85  145.92  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093011.528-0400       20210510-093011-0400    528:572   Q     145.92  100     145.85  145.93  "  F "  12580   \NULL    \NULL

TimeAndSale    IBM     20210510-093011.530-0400       20210510-093011-0400    530:573   Q     145.92  25      145.85  145.93  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093012.236-0400       20210510-093012-0400    236:576   D     145.896 100     145.85  145.93  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093012.383-0400       20210510-093012-0400    383:607   D     145.64   1      145.86  145.96  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093012.495-0400       20210510-093012-0400    495:792   D     145.9111 1      145.97  146.09  "  ZI"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093012.501-0400       20210510-093012-0400    501:587   J     145.92  100     145.85  145.93  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093012.501-0400       20210510-093012-0400    501:589   P     145.93  100     145.85  145.93  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093012.501-0400       20210510-093012-0400    501:590   Z     145.93  50      145.85  145.93  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093012.501-0400       20210510-093012-0400    501:591   N     145.92  50      145.85  145.93  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093012.501-0400       20210510-093012-0400    501:592   N     145.93  50      145.85  145.93  "   I"  12320   \NULL    \NULL
  
TimeAndSale    IBM     20210510-093012.501-0400       20210510-093012-0400    501:594   J     145.93  100     145.85  145.93  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093012.501-0400       20210510-093012-0400    501:596   K     145.92  100     145.85  145.93  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093012.501-0400       20210510-093012-0400    501:598   Y     145.92  100     145.85  145.93  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093012.501-0400       20210510-093012-0400    501:600   Q     145.93  100     145.85  145.94  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093012.501-0400       20210510-093012-0400    501:602   Q     145.93  100     145.87  145.94  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093012.501-0400       20210510-093012-0400    501:603   K     145.93  1       145.87  145.94  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093012.502-0400       20210510-093012-0400    502:605   K     145.94  311     145.87  145.96  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093012.502-0400       20210510-093012-0400    502:606   N     145.94  50      145.87  145.96  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093012.542-0400       20210510-093012-0400    542:793   D     145.9533 1      145.97  146.09  "  ZI"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093012.542-0400       20210510-093012-0400    542:794   D     145.9533 1      145.97  146.09  "  ZI"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093012.895-0400       20210510-093012-0400    895:608   D     145.64   1      145.86  145.96  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093013.201-0400       20210510-093013-0400    201:609   D     145.8    1      145.86  145.96  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093013.685-0400       20210510-093013-0400    685:610   D     145.64   1      145.86  145.96  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093014.167-0400       20210510-093014-0400    167:611   D     145.91   2      145.86  145.96  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093014.430-0400       20210510-093014-0400    430:636   D     145.74   1      145.92  145.96  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093014.430-0400       20210510-093014-0400    430:637   D     145.74   1      145.92  145.96  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093014.431-0400       20210510-093014-0400    431:638   D     145.74   1      145.92  145.96  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093014.616-0400       20210510-093014-0400    616:612   K     145.96  17      145.86  145.96  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093014.616-0400       20210510-093014-0400    616:613   V     145.96  17      145.86  145.96  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093014.681-0400       20210510-093014-0400    681:614   N     145.95  19      145.86  145.96  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093015.328-0400       20210510-093015-0400    328:615   D     145.8   1       145.86  145.96  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093015.526-0400       20210510-093015-0400    526:616   D     145.8   1       145.86  145.96  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093016.259-0400       20210510-093016-0400    259:620   D     145.96  100     145.86  145.96  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093016.266-0400       20210510-093016-0400    266:618   D     145.91  150     145.86  145.96  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093016.621-0400       20210510-093016-0400    621:621   P     145.95   1      145.91  145.96  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093016.725-0400       20210510-093016-0400    725:622   D     145.9101 1      145.91  145.96  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093016.777-0400       20210510-093016-0400    777:623   D     145.96  200     145.91  145.96  " 7 V"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093016.845-0400       20210510-093016-0400    845:625   N     145.96  100     145.91  145.96  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093016.845-0400       20210510-093016-0400    845:627   N     145.96  100     145.91  145.96  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093016.846-0400       20210510-093016-0400    846:629   N     145.96  100     145.91  145.96  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093016.846-0400       20210510-093016-0400    846:631   N     145.96  100     145.91  145.96  "  F "  12580   \NULL    \NULL

TimeAndSale    IBM     20210510-093016.846-0400       20210510-093016-0400    846:632   K     145.96  83      145.91  145.96  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093016.846-0400       20210510-093016-0400    846:634   N     145.96  100     145.91  145.96  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093016.846-0400       20210510-093016-0400    846:635   N     145.96  92      145.92  145.96  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093017.699-0400       20210510-093017-0400    699:653   D     145.9316 1      145.92  145.96  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093017.791-0400       20210510-093017-0400    791:654   D     145.94   1      145.92  145.96  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093018.613-0400       20210510-093018-0400    613:655   P     145.93  18      145.93  145.96  " F I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093018.613-0400       20210510-093018-0400    613:657   Q     145.93  100     145.93  145.96  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093018.613-0400       20210510-093018-0400    613:658   Q     145.93  10      145.91  145.96  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093018.613-0400       20210510-093018-0400    613:659   Q     145.95  10      145.91  145.96  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093018.682-0400       20210510-093018-0400    682:661   D     145.945 100     145.93  145.96  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093018.885-0400       20210510-093018-0400    885:662   N     145.96  50      145.93  145.96  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093018.885-0400       20210510-093018-0400    885:663   N     145.96  50      145.93  145.96  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093018.885-0400       20210510-093018-0400    885:664   N     145.96  58      145.93  145.96  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093018.885-0400       20210510-093018-0400    885:665   N     145.96  50      145.93  145.96  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093018.885-0400       20210510-093018-0400    885:667   N     145.96  108     145.93  145.96  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093018.885-0400       20210510-093018-0400    885:668   N     145.96  58      145.93  145.96  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093018.885-0400       20210510-093018-0400    885:669   N     145.96  42      145.93  145.96  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093018.885-0400       20210510-093018-0400    885:670   N     145.96  13      145.93  145.96  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093018.885-0400       20210510-093018-0400    885:671   N     145.96  50      145.93  145.96  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093018.885-0400       20210510-093018-0400    885:672   Q     145.96  37      145.93  145.96  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093018.888-0400       20210510-093018-0400    888:674   N     145.96  137     145.94  145.96  " F  "  12580   \NULL    \NULL

TimeAndSale    IBM     20210510-093018.888-0400       20210510-093018-0400    888:676   N     145.96  217     145.94  145.96  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093018.889-0400       20210510-093018-0400    889:678   N     145.96  100     145.94  145.96  " F  "  12580   \NULL    \NULL

TimeAndSale    IBM     20210510-093018.965-0400       20210510-093018-0400    965:680   K     145.94  100     145.94  145.96  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093018.965-0400       20210510-093018-0400    965:682   Q     145.94  100     145.94  145.96  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093018.965-0400       20210510-093018-0400    965:684   Q     145.94  100     145.94  145.96  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093018.965-0400       20210510-093018-0400    965:685   Q     145.94  10      145.94  145.96  " F I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093018.990-0400       20210510-093018-0400    990:687   D     145.93  100     145.9   145.96  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093018.998-0400       20210510-093018-0400    998:688   J     145.96  23      145.9   145.96  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093019.361-0400       20210510-093019-0400    361:689   D     145.8   1       145.9   145.96  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093019.476-0400       20210510-093019-0400    476:691   D     145.93  100     145.9   145.96  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093019.479-0400       20210510-093019-0400    479:693   D     145.93  1900    145.9   145.96  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093019.555-0400       20210510-093019-0400    555:694   D     145.8   1       145.9   145.96  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093019.793-0400       20210510-093019-0400    793:695   D     145.959 18      145.9   145.96  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093020.055-0400       20210510-093020-0400    55:697    J     145.9   100     145.9   145.96  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093020.056-0400       20210510-093020-0400    56:699    Q     145.9   100     145.9   145.94  " F  "  12612   \NULL    \NULL

TimeAndSale    IBM     20210510-093020.056-0400       20210510-093020-0400    56:701    N     145.89  100     145.89  145.94  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093020.056-0400       20210510-093020-0400    56:703    N     145.88  100     145.88  145.94  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093020.056-0400       20210510-093020-0400    56:705    N     145.87  100     145.88  145.94  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093020.057-0400       20210510-093020-0400    57:706    K     145.86   8      145.87  145.94  " F I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093020.061-0400       20210510-093020-0400    61:707    D     145.8846 1      145.87  145.94  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093020.326-0400       20210510-093020-0400    326:725   V     145.94  100     145.88  145.96  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093020.328-0400       20210510-093020-0400    328:727   N     145.95  100     145.88  145.96  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093020.648-0400       20210510-093020-0400    648:729   Y     145.95  100     145.88  145.96  " F  "  12580   \NULL    \NULL

TimeAndSale    IBM     20210510-093020.864-0400       20210510-093020-0400    864:744   D     145.96  1       145.93  145.99  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093022.803-0400       20210510-093022-0400    803:730   N     145.95  50      145.89  145.96  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093022.803-0400       20210510-093022-0400    803:731   N     145.96  48      145.89  145.96  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093022.803-0400       20210510-093022-0400    803:732   Q     145.96  3       145.89  145.96  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093022.803-0400       20210510-093022-0400    803:733   Q     145.96  97      145.89  145.96  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093022.803-0400       20210510-093022-0400    803:734   Q     145.96  14      145.89  145.96  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093022.803-0400       20210510-093022-0400    803:735   Z     145.96  5       145.89  145.96  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093022.803-0400       20210510-093022-0400    803:736   N     145.96  84      145.89  145.96  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093022.803-0400       20210510-093022-0400    803:738   N     145.96  113     145.89  145.99  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093022.804-0400       20210510-093022-0400    804:739   P     145.99  50      145.92  145.99  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093022.804-0400       20210510-093022-0400    804:740   Z     145.99  1       145.92  145.99  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093022.804-0400       20210510-093022-0400    804:741   P     145.99  2       145.92  145.99  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093022.804-0400       20210510-093022-0400    804:742   N     145.99  10      145.92  145.99  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093023.353-0400       20210510-093023-0400    353:743   D     145.921 10      145.92  145.99  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093024.938-0400       20210510-093024-0400    938:745   U     145.99  3       145.93  145.99  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093024.974-0400       20210510-093024-0400    974:746   D     145.948 1       145.93  145.99  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.474-0400       20210510-093025-0400    474:795   D     145.99  5	      145.97  146.08  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.899-0400       20210510-093025-0400    899:791   D     145.8   1       145.98  146.09  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.950-0400       20210510-093025-0400    950:801   D     145.99  200     145.99  146.08  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.954-0400       20210510-093025-0400    954:748   N     145.99  300     145.93  146     "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.954-0400       20210510-093025-0400    954:750   N     145.99  143     145.93  146     "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.954-0400       20210510-093025-0400    954:752   C     145.99  100     145.93  146     "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.954-0400       20210510-093025-0400    954:753   Z     145.99  7       145.93  146     "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.954-0400       20210510-093025-0400    954:754   Q     145.99  10      145.95  146     "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.954-0400       20210510-093025-0400    954:756   U     146     100     145.96  146     "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.955-0400       20210510-093025-0400    955:758   Z     146     100     145.96  146     " F  "  12580   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.955-0400       20210510-093025-0400    955:759   K     146     5       145.96  146     " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.955-0400       20210510-093025-0400    955:760   K     146     1       145.96  146     " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.955-0400       20210510-093025-0400    955:761   K     146     1       145.96  146     " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.955-0400       20210510-093025-0400    955:762   N     146     3       145.96  146     "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.955-0400       20210510-093025-0400    955:764   N     146     100     145.96  146     "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.955-0400       20210510-093025-0400    955:765   K     146     1       145.96  146     " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.955-0400       20210510-093025-0400    955:766   K     146     7       145.96  146     " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.955-0400       20210510-093025-0400    955:768   K     146     100     145.96  146     " F  "  12580   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.955-0400       20210510-093025-0400    955:769   K     146     1       145.96  146     " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.955-0400       20210510-093025-0400    955:770   P     146     1       145.97  146     "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.955-0400       20210510-093025-0400    955:771   P     146     8       145.97  146     "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.955-0400       20210510-093025-0400    955:772   P     146     5       145.97  146     "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.955-0400       20210510-093025-0400    955:773   P     146     45      145.97  146     "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.955-0400       20210510-093025-0400    955:774   P     146     50      145.97  146     "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.955-0400       20210510-093025-0400    955:776   N     146     2137    145.97  146     "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.955-0400       20210510-093025-0400    955:778   X     146     100     145.97  146     "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.956-0400       20210510-093025-0400    956:779   K     146.05  5       145.99  146.05  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.956-0400       20210510-093025-0400    956:781   K     146.05  263     145.99  146.05  " F  "  12580   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.956-0400       20210510-093025-0400    956:782   K     146.05  8       145.99  146.09  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.956-0400       20210510-093025-0400    956:783   D     146     1       145.99  146.09  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.956-0400       20210510-093025-0400    956:784   K     146.05  65      145.99  146.09  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.956-0400       20210510-093025-0400    956:785   N     146.08  30      145.99  146.09  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.956-0400       20210510-093025-0400    956:786   P     146.09  18      145.99  146.09  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.956-0400       20210510-093025-0400    956:788   K     146.1   152     145.99  146.09  " F  "  12580   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.956-0400       20210510-093025-0400    956:790   D     146.015 1       146.02  146.09  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.957-0400       20210510-093025-0400    957:789   Q     146.08  2       146.02  146.09  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093025.965-0400       20210510-093025-0400    965:797   D     146.09  3       145.97  146.08  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093026.005-0400       20210510-093026-0400    5:796     D     145.64  1       145.97  146.08  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093026.162-0400       20210510-093026-0400    162:799   Q     146.07  100     145.97  146.08  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093027.373-0400       20210510-093027-0400    373:802   D     145.8   1       145.98  146.08  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093027.658-0400       20210510-093027-0400    658:803   D     145.8   1       145.98  146.08  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093027.806-0400       20210510-093027-0400    806:804   Y     146.06  2       145.98  146.08  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093027.806-0400       20210510-093027-0400    806:805   Y     146.07  98      145.98  146.08  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093027.806-0400       20210510-093027-0400    806:811   D     146.08  100     146     146.09  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093027.806-0400       20210510-093027-0400    806:813   D     146.08  100     146.01  146.09  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093027.807-0400       20210510-093027-0400    807:807   C     146.08  100     145.98  146.08  " F  "  12580   \NULL    \NULL

TimeAndSale    IBM     20210510-093027.832-0400       20210510-093027-0400    832:809   D     146.03  200     145.98  146.08  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093028.051-0400       20210510-093028-0400    51:814    D     146.01  1	      146.01  146.08  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093028.651-0400       20210510-093028-0400    651:816   D     145.8   1       146.03  146.09  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093028.676-0400       20210510-093028-0400    676:817   D     145.8   1       146.03  146.09  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093028.849-0400       20210510-093028-0400    849:818   N     146.09  7       146.03  146.09  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093029.549-0400       20210510-093029-0400    549:819   D     145.8   1       146     146.09  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093029.596-0400       20210510-093029-0400    596:820   D     146.04  1       146     146.09  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093029.615-0400       20210510-093029-0400    615:821   D     146     1       146     146.08  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093030.818-0400       20210510-093030-0400    818:865   D     146.0371 309    146     146.09  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093031.450-0400       20210510-093031-0400    450:822   D     146.0405 16     146     146.08  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093031.705-0400       20210510-093031-0400    705:823   Q     146.02   41     146     146.08  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093032.154-0400       20210510-093032-0400    154:824   D     145.8    1      146     146.08  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093032.497-0400       20210510-093032-0400    497:830   D     146.08  100     146     146.08  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093032.501-0400       20210510-093032-0400    501:826   D     146.04  100     146     146.08  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093032.543-0400       20210510-093032-0400    543:833   D     146.08  100     146     146.08  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093032.545-0400       20210510-093032-0400    545:828   D     146.04  100     146     146.08  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093033.012-0400       20210510-093033-0400    12:831    Q     146.02  8       146     146.08  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093034.030-0400       20210510-093034-0400    30:834    D     145.8   1       146     146.08  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093034.217-0400       20210510-093034-0400    217:835   Q     146.04  17      146     146.08  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093034.643-0400       20210510-093034-0400    643:836   D     145.8   1       146.03  146.09  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093035.218-0400       20210510-093035-0400    218:839   P     146.03  100     146.03  146.09  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093035.218-0400       20210510-093035-0400    218:841   N     146.03  100     146.03  146.09  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093035.218-0400       20210510-093035-0400    218:843   Q     146.03  100     146.03  146.04  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093035.218-0400       20210510-093035-0400    218:844   Q     146.03  1       146.03  146.04  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093035.218-0400       20210510-093035-0400    218:846   J     146.03  100     146.03  146.04  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093035.218-0400       20210510-093035-0400    218:848   Z     146.03  100     146.02  146.04  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093035.219-0400       20210510-093035-0400    219:850   Q     146.03  149     146     146.04  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093035.746-0400       20210510-093035-0400    746:852   D     146.045 100     146     146.09  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093036.220-0400       20210510-093036-0400    220:853   Q     146     58      146     146.09  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093036.869-0400       20210510-093036-0400    869:855   V     146.055 111     146.02  146.09  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093037.220-0400       20210510-093037-0400    220:856   Q     146.02  91      146.02  146.09  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093037.539-0400       20210510-093037-0400    539:857   D     146.09  1       146.01  146.09  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093037.569-0400       20210510-093037-0400    569:858   D     146.09  1       146.01  146.09  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093037.574-0400       20210510-093037-0400    574:859   D     146.09  1       146.01  146.09  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093037.576-0400       20210510-093037-0400    576:860   D     146.09  1       146.01  146.09  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093037.582-0400       20210510-093037-0400    582:861   D     146.09  1       146.01  146.09  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093037.587-0400       20210510-093037-0400    587:862   D     146.09  1       146.01  146.09  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093037.683-0400       20210510-093037-0400    683:863   D     146.05  30      146.01  146.09  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093038.116-0400       20210510-093038-0400    116:866   D     146.0219 3      146.01  146.09  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093038.846-0400       20210510-093038-0400    846:868   N     146.07  100     146.01  146.09  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093038.846-0400       20210510-093038-0400    846:869   N     146.08  3       146.01  146.09  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093038.846-0400       20210510-093038-0400    846:870   C     146.07  17      146.01  146.09  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093038.846-0400       20210510-093038-0400    846:871   Z     146.07  8       146.01  146.09  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093038.846-0400       20210510-093038-0400    846:872   Q     146.07  13      146.01  146.09  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093039.268-0400       20210510-093039-0400    268:877   D     146.0502 100    146.03  146.09  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093039.545-0400       20210510-093039-0400    545:874   V     146.055  300    146.02  146.09  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093040.071-0400       20210510-093040-0400    71:875    D     146.09  50      146.03  146.09  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093040.267-0400       20210510-093040-0400    267:879   D     146.0727 100    146.03  146.09  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093040.705-0400       20210510-093040-0400    705:881   D     146.09  1       146.03  146.09  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093040.779-0400       20210510-093040-0400    779:882   Q     146.08  13      146.04  146.09  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093040.863-0400       20210510-093040-0400    863:884   D     146.03  1       146.03  146.09  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093041.284-0400       20210510-093041-0400    284:885   D     146.09  1       146.03  146.09  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093042.176-0400       20210510-093042-0400    176:886   D     146.09  1       146.03  146.09  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093042.878-0400       20210510-093042-0400    878:887   D     146.09  1       146.03  146.09  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093042.965-0400       20210510-093042-0400    965:888   D     146.09  1       146.03  146.09  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093043.053-0400       20210510-093043-0400    53:889    D     146.09  1       146.03  146.09  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093043.159-0400       20210510-093043-0400    159:890   D     146.09  1       146.01  146.09  "   I"  12320   \NULL    \NULL
 
TimeAndSale    IBM     20210510-093043.927-0400       20210510-093043-0400    927:892   Q     146.04  24      146.03  146.09  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093044.241-0400       20210510-093044-0400    241:893   D     146.09  1       146.03  146.09  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093044.927-0400       20210510-093044-0400    927:894   Q     146.04  3       146.03  146.09  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093045.479-0400       20210510-093045-0400    479:895   D     146.0435 1      146.03  146.09  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093045.686-0400       20210510-093045-0400    686:896   D     146.09  1       146.03  146.09  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093046.358-0400       20210510-093046-0400    358:897   Q     146.04  20      146.02  146.09  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093046.358-0400       20210510-093046-0400    358:898   Q     146.03  1       146.02  146.09  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093046.358-0400       20210510-093046-0400    358:899   U     146.05  5       146.02  146.09  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093047.305-0400       20210510-093047-0400    305:900   D     146.09  1       146.02  146.09  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093047.359-0400       20210510-093047-0400    359:901   N     146.04  5       146.02  146.09  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093047.359-0400       20210510-093047-0400    359:902   N     146.03  7       146.02  146.09  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093047.359-0400       20210510-093047-0400    359:903   P     146.03  7       146.02  146.09  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093047.359-0400       20210510-093047-0400    359:904   P     146.03  18      146.02  146.09  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093047.359-0400       20210510-093047-0400    359:905   Q     146.03  78      146.02  146.09  "   I"  12352   \NULL    \NULL
 
TimeAndSale    IBM     20210510-093047.359-0400       20210510-093047-0400    359:906   Q     146.03  21      146.02  146.09  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093047.359-0400       20210510-093047-0400    359:908   Q     146.02  100     146.02  146.09  " F  "  12612   \NULL    \NULL

TimeAndSale    IBM     20210510-093047.359-0400       20210510-093047-0400    359:909   K     146.03  4       146.02  146.09  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093047.359-0400       20210510-093047-0400    359:910   K     146.03  1       146.01  146.09  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093047.359-0400       20210510-093047-0400    359:911   K     146.03  4       146.01  146.09  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093047.360-0400       20210510-093047-0400    360:912   P     146.01  4       146.01  146.05  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093047.360-0400       20210510-093047-0400    360:913   K     146     95      146     146.05  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093047.360-0400       20210510-093047-0400    360:914   P     146     2       146     146.05  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093047.360-0400       20210510-093047-0400    360:915   P     146     14      146     146.05  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093047.360-0400       20210510-093047-0400    360:916   K     146     5       146     146.05  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093047.360-0400       20210510-093047-0400    360:918   K     146     100     146     146.04  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093047.360-0400       20210510-093047-0400    360:919   Q     146     42      146     146.04  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093047.360-0400       20210510-093047-0400    360:921   Q     146     195     145.99  146.04  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093047.939-0400       20210510-093047-0400    939:922   D     146.08  1       145.96  146.08  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093048.063-0400       20210510-093048-0400    63:930    D     145.8   1       145.99  146.07  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093048.360-0400       20210510-093048-0400    360:923   Q     145.96  13      145.96  146.08  " F I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093048.730-0400       20210510-093048-0400    730:924   D     145.996 20      145.98  146.07  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093049.149-0400       20210510-093049-0400    149:926   D     146.015 500     145.96  146.07  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093049.360-0400       20210510-093049-0400    360:927   Q     145.96  44      145.95  146.06  " F I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093049.534-0400       20210510-093049-0400    534:931   D     145.8   1       145.99  146.07  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093049.569-0400       20210510-093049-0400    569:929   V     146.03  100     145.99  146.07  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093049.885-0400       20210510-093049-0400    885:932   D     146.07  1       145.99  146.07  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093050.132-0400       20210510-093050-0400    132:933   P     146.05  5       145.99  146.07  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093050.136-0400       20210510-093050-0400    136:934   D     146.07  1       145.99  146.07  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093050.361-0400       20210510-093050-0400    361:935   Q     145.99  72      145.99  146.06  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093050.978-0400       20210510-093050-0400    978:937   Y     145.99  100     145.98  146.07  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093050.992-0400       20210510-093050-0400    992:938   D     146.06  1       145.98  146.06  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093051.325-0400       20210510-093051-0400    325:954   D     145.9877 5      145.99  146.05  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093051.363-0400       20210510-093051-0400    363:939   N     145.98  50      145.98  146.03  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093051.363-0400       20210510-093051-0400    363:941   Q     145.98  100     145.96  145.99  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093051.363-0400       20210510-093051-0400    363:943   Q     145.98  100     145.96  145.99  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093051.363-0400       20210510-093051-0400    363:944   Z     145.97  13      145.95  145.99  " F I"  12576   \NULL    \NULL

TimeAndSale    IBM     20210510-093051.363-0400       20210510-093051-0400    363:945   Z     145.97  37      145.95  145.99  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093051.363-0400       20210510-093051-0400    363:946   N     145.96  46      145.95  145.99  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093051.363-0400       20210510-093051-0400    363:947   N     145.96  23      145.95  145.99  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093051.363-0400       20210510-093051-0400    363:948   Q     145.99  95      145.96  145.99  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093051.363-0400       20210510-093051-0400    363:949   Q     145.99  10      145.96  145.99  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093051.364-0400       20210510-093051-0400    364:950   K     145.99  10      145.96  145.99  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093051.364-0400       20210510-093051-0400    364:951   Q     145.98  10      145.96  145.99  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093051.364-0400       20210510-093051-0400    364:952   Q     145.98  20      145.96  146.07  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093052.003-0400       20210510-093052-0400    3:956     V     146.01  200     145.99  146.03  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093052.306-0400       20210510-093052-0400    306:957   Q     146.02  5       145.99  146.03  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093052.306-0400       20210510-093052-0400    306:958   Q     146.02  40      145.99  146.03  "   I"  12320   \NULL    \NULL
 
TimeAndSale    IBM     20210510-093052.306-0400       20210510-093052-0400    306:959   Q     146.03  9       145.99  146.03  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093052.306-0400       20210510-093052-0400    306:960   Q     146.03  55      145.99  146.03  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093052.306-0400       20210510-093052-0400    306:961   Q     146.03  45      145.99  146.03  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093052.306-0400       20210510-093052-0400    306:963   U     146.03  100     145.99  146.04  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093052.306-0400       20210510-093052-0400    306:965   P     146.04  100     146     146.04  "    "  12324   \NULL    \NULL

TimeAndSale    IBM     20210510-093052.306-0400       20210510-093052-0400    306:966   N     146.07  86      146.02  146.09  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093052.306-0400       20210510-093052-0400    306:968   V     146.03  176     146.02  146.09  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093052.307-0400       20210510-093052-0400    307:970   D     146.03  100     146.01  146.09  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093052.364-0400       20210510-093052-0400    364:973   Q     146.03  10      146.02  146.07  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093052.365-0400       20210510-093052-0400    365:972   N     146.03  100     146.02  146.07  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093052.471-0400       20210510-093052-0400    471:974   D     145.8   1       146.01  146.04  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093052.679-0400       20210510-093052-0400    679:975   Y     146.03  38      146     146.07  "   I"  12352    \NULL   \NULL

TimeAndSale    IBM     20210510-093052.679-0400       20210510-093052-0400    679:976   Y     146.03  62      146     146.07  " F I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093052.939-0400       20210510-093052-0400    939:979   K     146     100     146     146.03  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093052.939-0400       20210510-093052-0400    939:981   Q     146     100     145.99  146.03  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093052.940-0400       20210510-093052-0400    940:977   P     146      1      146     146.03  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093053.625-0400       20210510-093053-0400    625:982   D     146.0078 37     146     146.03  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093053.933-0400       20210510-093053-0400    933:983   D     146.0299 68     146     146.03  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093054.612-0400       20210510-093054-0400    612:985   D     145.8    1      146     146.03  " 4 I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093054.819-0400       20210510-093054-0400    819:987   Q     146     100     146     146.03  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093054.819-0400       20210510-093054-0400    819:989   Q     146     100     145.99  146.03  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093055.334-0400       20210510-093055-0400    334:991   D     146     100     145.97  146.03  "    "  12356   \NULL    \NULL

TimeAndSale    IBM     20210510-093055.357-0400       20210510-093055-0400    357:992   D     146.03  1       145.98  146.03  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093055.658-0400       20210510-093055-0400    658:993   D     146.03  1       145.96  146.03  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093056.669-0400       20210510-093056-0400    669:994   Q     145.98  1       145.96  146.01  " F I"  12608   \NULL    \NULL

TimeAndSale    IBM     20210510-093057.545-0400       20210510-093057-0400    545:995   D     146.03  1       145.96  146.03  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093057.919-0400       20210510-093057-0400    919:9I"   D     146.03  69      145.96 146.03   "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093058.166-0400       20210510-093058-0400    166:997   D     146.03  1       145.96  146.03  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093058.453-0400       20210510-093058-0400    453:998   Z     145.97  1       145.96  146.03  "   I"  12352   \NULL    \NULL

TimeAndSale    IBM     20210510-093059.549-0400       20210510-093059-0400    549:999   Z     146.02  1       145.97  146.03  "   I"  12320   \NULL    \NULL

TimeAndSale    IBM     20210510-093059.549-0400       20210510-093059-0400   549:1000   Z     146.02  1       145.97  146.03  "   I"  12320   \NULL    \NULL      EventFlags=SNAPSHOT_END
```

### Java parsing sample

Below is a Java sample that parses responses with different compression formats from Candlewebservice:

```java
package com.devexperts.mdd.candlewebservice.sample;

import com.devexperts.io.ByteArrayInput;
import com.devexperts.io.ByteArrayOutput;
import com.devexperts.io.StreamCompression;
import com.devexperts.io.URLInputStream;
import com.devexperts.qd.DataIterator;
import com.devexperts.qd.DataRecord;
import com.devexperts.qd.QDContract;
import com.devexperts.qd.QDFactory;
import com.devexperts.qd.ng.RecordCursor;
import com.devexperts.qd.ng.RecordSource;
import com.devexperts.qd.qtp.AbstractQTPParser;
import com.devexperts.qd.qtp.BinaryQTPParser;
import com.devexperts.qd.qtp.MessageConsumerAdapter;
import com.devexperts.qd.qtp.MessageType;
import com.devexperts.qd.qtp.text.TextDelimiters;
import com.devexperts.qd.qtp.text.TextQTPParser;
import com.dxfeed.api.impl.EventDelegateFlags;
import com.dxfeed.event.candle.Candle;
import com.dxfeed.event.candle.CandleDelegate;
import com.dxfeed.event.market.TimeAndSale;
import com.dxfeed.event.market.TimeAndSaleDelegate;

import java.io.IOException;
import java.io.InputStream;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

/**
 * Demonstrates how to parse response from CandleData service. Best practices:
 * <ul>
 *     <li>Request data in binary format: 'format=binary'</li>
 *     <li>Request compressed data: 'compression=zip'</li>
 * </ul>
 * It allows to noticeably reduce amount of transferred data and time of the response.
 * <p>
 * Sample shows only how to extract {@link Candle} events from the response and doesn't act as best practice
 * for near-lying things, e.g. establishing connection, getting the response and so on.
 */
public class CandleDataResponseReader {
    private static final DataRecord CANDLE_RECORD = QDFactory.getDefaultScheme().findRecordByName("Candle");
    private static final DataRecord TIME_AND_SALE_RECORD = QDFactory.getDefaultScheme().findRecordByName("TimeAndSale");

    private CandleDataResponseReader() {
    }

    public static void main(String[] args) throws IOException {
        // below is a sample for BASIC auth method, auth method doesn't affect data in response
        String user = "user";
        String password = "password";

        // recommended way to request candles
        String candlesUrl = "https://tools.dxfeed.com/candledata?records=Candle&symbols=AIV{=d}&start=20201201-000000&stop=20210101-000000";
        requestBinaryCandles(candlesUrl + "&format=binary&compression=zip", user, password);
        // sample for csv, can be used for debugging purposes
        requestCsvCandles(candlesUrl + "&format=csv&compression=zip", user, password);

        // recommended way to request TimeAndSale
        String tnsUrl = "https://tools.dxfeed.com/candledata?records=TimeAndSale&symbols=AAPL&start=20210504-120000&stop=20210504-130000";
        requestBinaryTns(tnsUrl + "&format=binary&compression=zip", user, password);
        // sample for csv, can be used for debugging purposes
        requestCsvTns(tnsUrl + "&format=csv&compression=zip", user, password);
    }

    private static void requestBinaryCandles(String url, String user, String password) throws IOException {
        byte[] bytes = responseToBytes(url, user, password);
        System.out.println("Received binary: " + bytes.length + " bytes");
        // parser is not thread safe and it's better to create parser for each processing thread
        BinaryQTPParser parser = new BinaryQTPParser(QDFactory.getDefaultScheme());
        List<Candle> result = getCandlesFromStream(bytes, parser);
        System.out.println("Received candles count: " + result.size());
    }

    private static void requestBinaryTns(String url, String user, String password) throws IOException {
        byte[] bytes = responseToBytes(url, user, password);
        System.out.println("Received binary: " + bytes.length + " bytes");
        // parser is not thread safe and it's better to create parser for each processing thread
        BinaryQTPParser parser = new BinaryQTPParser(QDFactory.getDefaultScheme());
        List<TimeAndSale> result = getTnsFromStream(bytes, parser);
        System.out.println("Received tns count: " + result.size());
    }

    private static void requestCsvCandles(String url, String user, String password) throws IOException {
        byte[] bytes = responseToBytes(url, user, password);
        System.out.println("Received binary: " + bytes.length + " bytes");
        // parser is not thread safe and it's better to create parser for each processing thread
        TextQTPParser parser = new TextQTPParser(QDFactory.getDefaultScheme(), MessageType.STREAM_DATA);
        parser.setDelimiters(TextDelimiters.COMMA_SEPARATED);
        List<Candle> result = getCandlesFromStream(bytes, parser);
        System.out.println("Received candles count: " + result.size());
    }

    private static void requestCsvTns(String url, String user, String password) throws IOException {
        byte[] bytes = responseToBytes(url, user, password);
        System.out.println("Received binary: " + bytes.length + " bytes");
        // parser is not thread safe and it's better to create parser for each processing thread
        TextQTPParser parser = new TextQTPParser(QDFactory.getDefaultScheme(), MessageType.STREAM_DATA);
        parser.setDelimiters(TextDelimiters.COMMA_SEPARATED);
        List<TimeAndSale> result = getTnsFromStream(bytes, parser);
        System.out.println("Received tns count: " + result.size());
    }

    private static byte[] responseToBytes(String url, String user, String password) throws IOException {
        URLConnection connection = URLInputStream.openConnection(URLInputStream.resolveURL(url), user, password);
        // any library or java 9+ to extract bytes from the input stream
        return zipToByteArray(connection);
    }

    private static byte[] zipToByteArray(URLConnection connection) throws IOException {
        StreamCompression streamCompression = StreamCompression.ZIP;
        InputStream inputStream = streamCompression.decompress(connection.getInputStream());
        ByteArrayOutput bao = new ByteArrayOutput();
        int nRead;
        byte[] data = new byte[16384];
        while ((nRead = inputStream.read(data, 0, data.length)) != -1) {
            bao.write(data, 0, nRead);
        }
        return bao.toByteArray();
    }

    private static List<Candle> getCandlesFromStream(byte[] bytes, AbstractQTPParser parser) {
        parser.setInput(new ByteArrayInput(bytes));
        // candle delegate is thread safe
        CandleDelegate candleDelegate = new CandleDelegate(CANDLE_RECORD, QDContract.HISTORY, EnumSet.noneOf(EventDelegateFlags.class));
        List<Candle> result = new ArrayList<>();
        parser.parse(new MessageConsumerAdapter() {
            public void processData(DataIterator iterator, MessageType message) {
                RecordSource source = (RecordSource) iterator;
                RecordCursor cursor;
                while ((cursor = source.next()) != null) {
                    result.add(candleDelegate.createEvent(cursor));
                }
            }
        });
        return result;
    }

    private static List<TimeAndSale> getTnsFromStream(byte[] bytes, AbstractQTPParser parser) {
        parser.setInput(new ByteArrayInput(bytes));
        // candle delegate is thread safe
        TimeAndSaleDelegate tnsDelegate = new TimeAndSaleDelegate(TIME_AND_SALE_RECORD, QDContract.HISTORY, EnumSet.noneOf(EventDelegateFlags.class));
        List<TimeAndSale> result = new ArrayList<>();
        parser.parse(new MessageConsumerAdapter() {
            public void processData(DataIterator iterator, MessageType message) {
                RecordSource source = (RecordSource) iterator;
                RecordCursor cursor;
                while ((cursor = source.next()) != null) {
                    result.add(tnsDelegate.createEvent(cursor));
                }
            }
        });
        return result;
    }
}
```

## Flags

- `EvengtFlags=SNAPSHOT_BEGIN` means that it's a beginning of historical snapshot for particular symbol.
- `EvengtFlags=SNAPSHOT_END` means that historical snapshot has ended for particular symbol and no more events will appear for this symbol.

## Recommendations

Use binary format and zip compression to improve response time. Please check allowance of used API for this purpose.

Some formal agreements:

- It's possible to request number of symbols limited by standard GET request rules
- Regexp and patterns are not allowed and such requests will be treated like request only for particular symbol
- The service is intended to deliver historical snapshots of data and NOT for multiple polls to emulate live data streaming

:::note
Note that:

- To receive Candle Data, specify the aggregation type only in the symbol. 'records' attribute must be equal to **Candle** or **TimeAndSale**. Records with aggregation type, specified in the event, like **Trade.1min**, **Trade.Day**, **DailyCandle**, etc., are not supported. For example, the correct request is `records=Candle&symbols=IBM{=d}`.
- This service shows all processed events till passed stop time (e.g. doesn't have a delay in 5 minutes - 1 day like **TickData**).
:::

## URL encoding

If you use a URL request to get [IPF](https://tools.dxfeed.com/ipf), some URL chapters should be encoded because characters are not used in their special role. URL encoding of a character consists of a `%` symbol, followed by the two-digit hexadecimal representation (case-insensitive) of the ISO-Latin code point for the character.

| Character | Code Points (Hex) | Code Points (Dec) |
| --- | --- | --- |
| Ampersand ("&") | 26 | 38 |
| Colon (":") | 3A | 58 |
| Comma (",") | 2C | 44 |
| Dollar ("$") | 24 | 36 |
| Equals ("=") | 3D | 61 |
| Forward slash/Virgule ("/") | 2F | 47 |
| Plus ("+") | 2B | 43 |
| Question mark ("?") | 3F | 63 |
| Semi-colon (";") | 3B | 59 |

**Examples**

- "&" = "%26"
- "+" = "%2B"

Please refer to [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986) and its [errata](https://www.rfc-editor.org/errata_search.php?rfc=3986).
