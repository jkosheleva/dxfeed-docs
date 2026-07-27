---
title: "iOS Integration Tutorial"
paligoOriginId: "90216"
---

## Overview

This tutorial guides you through the process of creating an iOS app using the dxFeed Swift API to display real-time stock market quotes in a dynamic quote table. You'll learn how to integrate the dxFeed API, and allow users to customize symbol sets.

Below is a demo of the iOS quote table app:

![ios_tut2-ezgif_com-video-to-gif-converter.gif](/images/uuid-acfe9890-40fd-3323-1168-b2febd309175.gif)

## Installation

To build the iOS app, you'll need:

- Xcode environment
- Your preferred UI Framework (UIKit or SwiftUI)
- Contact [dxFeed Solution Delivery team](https://dxfeed.com/contact-us/) for integration.

To install the dependency via Swift package manager, get the Swift package from [GitHub](https://github.com/dxFeed/dxfeed-graal-swift-api).

## Usages

### Receiving market events

Basic usage for receiving [dxFeed API Market Events](/data-model/market-events/dxfeed-api-market-events/#dxfeed-api-market-events):

```javascript
import
DXFeedFramework

extension YourViewController: DXEventListener {
    public func receiveEvents(_ events:
[MarketEvent]) {
        events.forEach { events in
        // refresh UI
        }
    }
}

let endpoint = try
DXEndpoint.builder().withProperty(DXEndpoint.Property.aggregationPeriod.rawValue,
"1").build()
try endpoint.connect("demo.dxfeed.com:7300")
let subscription = try endpoint.getFeed()?.createSubscription(EventCode.quote)
try subscription?.add(listener: yourViewController)
try subscription?.addSymbols("AAPL", "IBM")
```

### Reading instrument profiles

Usage instrument profiles to fetch available symbols:

```javascript
import
DXFeedFramework

let reader = DXInstrumentProfileReader()
let result =
try reader.readFromFile(address:
"https://demo:demo@tools.dxfeed.com/ipf?TYPE=FOREX,STOCK&compression=zip")
// reading stocks and forex instruments
result?.forEach { instrument in
    // refresh UI
}
```

The corresponding file format is explained in detail in the [Instrument Profile Format](/data-model/reference-data/instrument-profile-format/#instrument-profile-format) document. There is a corresponding [Instrument Profile API](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/ipf/package-summary.html) to compose and parse them.

dxFeed symbology is explained in the [Symbology Guide](/data-model/symbology-guide/#symbology-guide).
