---
title: "Trading Hours"
paligoOriginId: "919"
---

## Overview

The Trading Schedule API provides access to detailed trading schedules for financial instruments. It represents the trading week as a continuous 24/7 timeline that covers all market sessions.

Trading hours are available in the `TRADING_HOURS` field of the [Instrument Profile File (IPF)](/data-model/reference-data/instrument-profile-format/#instrument-profile-format) and can be viewed in the Schedule Viewer web tool or retrieved programmatically through the Java API.

Session boundaries (such as start and end times)  are defined as part of a continuous week, rather than isolated daily sessions. This helps ensure accurate tracking of all trading events, including pre-open activities and extended trading sessions.

## How to work with trading hours

Trading schedules are available through two interfaces:

- [Java API](#schedule-api-via-java)
- [Schedule Viewer web tool](#schedule-viewer)

### Schedule API via Java

To request trading hours, use the Schedule class in the Java API. The data is read from the TRADING_HOURS field in IPF profiles.

**Example**

```java
import com.dxfeed.ipf.InstrumentProfile;
import com.dxfeed.ipf.InstrumentProfileReader;
import com.dxfeed.schedule.Schedule;
import com.dxfeed.schedule.SessionFilter;

import java.io.IOException;
import java.util.List;

public class TradingHoursReadingFromIPF {
    public static void main(String[] args) {
        try {
            String URL = "https://tools.dxfeed.com/ipf?SYMBOL=*/PAZ20:XNYM*";
            String login = "login";
            String password = "password";
            List<InstrumentProfile> profiles = new InstrumentProfileReader().readFromFile(URL, login, password);
            for (InstrumentProfile instrumentProfile : profiles) {
                Schedule schedule = Schedule.getInstance(instrumentProfile);
                System.out.println(instrumentProfile.getSymbol() + " " + schedule.toString() + " " +
                        schedule.getNearestSessionByTime(System.currentTimeMillis(), SessionFilter.REGULAR));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### Schedule Viewer

Use the Schedule Viewer to view and decode trading schedules in a browser either in JSON format or a human-friendly table in HTML format.

To request trading hours, use [https://tools.dxfeed.com/schedule-view](https://tools.dxfeed.com/schedule-view).

**Examples**

- JSON format: [https://tools.dxfeed.com/schedule-view?symbol=AAPL&format=json](https://tools.dxfeed.com/schedule-view?symbol=AAPL&format=json)
- Human-readable HTML table: [https://tools.dxfeed.com/schedule-view?symbol=AAPL&format=html](https://tools.dxfeed.com/schedule-view?symbol=AAPL&format=html)

**Response structure**

JSON response includes:

- symbol — instrument symbol
- schedule — schedule definition string
- timezone — time zone for session times
- sessions — array of session intervals with start and end times (pre-market, regular, after-market)

Use [https://tools.dxfeed.com/schedule-view?help](https://tools.dxfeed.com/schedule-view?help) for help.
