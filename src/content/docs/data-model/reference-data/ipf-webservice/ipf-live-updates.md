---
title: "IPF Live Updates"
paligoOriginId: "20461"
---

## Overview

By default [Instrument Profile Format (IPF) Web Service](/data-model/reference-data/instrument-profile-format/#instrument-profile-format) provides the latest known snapshot of the instrument profiles. It is possible to enable **live updates** mode and receive a stream of all profile updates after the initial snapshot.

This functionality is implemented via [HTTP streaming](https://datatracker.ietf.org/doc/html/rfc6202#section-3.2) connection which will be kept alive by the server.

## Methods

You can enable live updates using one of the two methods:

- Specify **live=true** parameter in the URL query: [https://tools.dxfeed.com/ipf?live=true](https://tools.dxfeed.com/ipf?live=true).
- Specify **X-Live: yes** HTTP header in the request.

Note that using live updates is suitable for current updates in **batch** mode (so date parameter should not be specified).

## dxFeed API

Use dxFeed APIs with [com.dxfeed.ipf.live.InstrumentProfileConnection](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/ipf/live/InstrumentProfileConnection.html) class for tracking live updates, e.g. instruments addition and removal.

Note that it is required to check the instrument type. Instrument removal is indicated by sending a profile with type **REMOVED** for the removed symbol.

### Java API

Use [com.dxfeed.ipf.live.InstrumentProfileConnection](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/ipf/live/InstrumentProfileConnection.html) with [com.dxfeed.ipf.live.InstrumentProfileCollector](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/ipf/live/InstrumentProfileCollector.html) to avoid receiving duplicates. All data is loaded in a text file, the collector passes through all data as a filter and transfers changes to the listener.

### .Net API

Use [сom.dxfeed.ipf.live.InstrumentProfileConnection](https://docs.dxfeed.com/net-api/classcom_1_1dxfeed_1_1ipf_1_1live_1_1InstrumentProfileConnection.html) with [com.dxfeed.ipf.live.InstrumentProfileUpdateListener](https://docs.dxfeed.com/net-api/interfacecom_1_1dxfeed_1_1ipf_1_1live_1_1InstrumentProfileUpdateListener.html) for data receiving based on your events subscription.

**[Example](https://github.com/dxFeed/dxfeed-net-api/blob/master/samples/dxf_instrument_profile_live_sample/Program.cs)**

## Command-line tools

You can also use command line tools, such as curl or wget. These allow you to receive new instrument profiles.

### Curl

1. curl -u demo:demo [https://tools.dxfeed.com/ipf?live=true](https://tools.dxfeed.com/ipf?live=true)
2. curl -u demo:demo -H "X-Live:yes" [https://tools.dxfeed.com/ipf](https://tools.dxfeed.com/ipf)

### Wget

1. wget --user demo --password demo -O instruments.ipf [https://tools.dxfeed.com/ipf?live=true](https://tools.dxfeed.com/ipf?live=true)
2. wget --user demo --password demo --header "X-Live: yes" -O instruments.ipf [https://tools.dxfeed.com/ipf](https://tools.dxfeed.com/ipf)
