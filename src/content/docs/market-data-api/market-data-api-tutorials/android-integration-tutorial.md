---
title: "Android Integration Tutorial"
paligoOriginId: "90078"
---

## Overview

This tutorial guides you through the process of creating an Android app using the dxFeed Java API to display real-time stock market quotes in a dynamic quote table. You'll learn how to integrate the dxFeed API, and allow users to customize symbol sets.

Below is a demo of the Android quote table app:

![and_tut-ezgif_com-video-to-gif-converter.gif](/images/uuid-9c15f4c0-e0af-a170-c49f-4330f1133ecc.gif)

## Source code

You can find the latest source code samples for Android on [GitHub](https://github.com/dxFeed/dxfeed-android-samples).

## Installation

To build the Android app, you'll need:

- Android Studio IDE environment
- Your preferred UI Framework (Compose or XML Views)
- Contact [dxFeed Solution Delivery team](https://dxfeed.com/contact-us/) for integration.

To install dependency via Gradle package manager:

1. Configure repository: Add information about the new repository in `settings.gradle` file in the `dependencyResolutionManagement` section:
  
  
  
  ```
  maven {
      url 'https://dxfeed.jfrog.io/artifactory/maven-open'
  }
  ```
2. Add dependencies: Include the following dependencies in the `build.gradle` file under the `dependencies` section:
  
  
  
  ```
  implementation 'com.devexperts.qd:dxlink-websocket:3.332'
  implementation('com.devexperts.mdd:auther-api:476') {
      exclude module:"qds-monitoring"
  }
  ```

## Usages

### Receiving market events

Basic usage for receiving [dxFeed API Market Events](/data-model/market-events/dxfeed-api-market-events/#dxfeed-api-market-events):

```java
import
com.dxfeed.api.DXEndpoint
import com.dxfeed.event.market.MarketEvent
import com.dxfeed.event.market.Quote

val endpoint = DXEndpoint
    .newBuilder()
   
.withProperty("dxfeed.aggregationPeriod", "1")
    .build()
endpoint.connect("demo.dxfeed.com:7300")
val subscription = endpoint?.feed?.createSubscription(Quote::class.java)
subscription?.addEventListener {
    it.forEach { event ->
        // refresh UI
    }
}
subscription?.addSymbols("AAPL", "IBM")
```

### Reading instrument profiles

Usage instrument profiles to fetch available symbols:

```java
import
com.dxfeed.ipf.InstrumentProfile
import com.dxfeed.ipf.InstrumentProfileReader

val reader = InstrumentProfileReader()
val results =
reader.readFromFile("https://demo:demo@tools.dxfeed.com/ipf?TYPE=FOREX,STOCK&compression=zip")
// reading stocks and forex instruments
results.forEach {
    // refresh UI
}
```

The corresponding file format is explained in detail in the [Instrument Profile Format](/data-model/reference-data/instrument-profile-format/#instrument-profile-format) document. There is a corresponding [Instrument Profile API](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/ipf/package-summary.html) to compose and parse them.

dxFeed symbology is explained in the [Symbology Guide](/data-model/symbology-guide/#symbology-guide).
