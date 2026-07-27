---
title: "dxFeed Java API Tutorial"
paligoOriginId: "864"
---

## Overview

This tutorial covers the basics of dxFeed Java API and explains [Quote](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/Quote.html), [Trade](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/Trade.html), and [TimeAndSale](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/TimeAndSale.html) events. For full description of dxFeed Java API, check out [dxFeed documentation](https://www.dxfeed.com/api-documentation/java-api-doc/).

## Basics

This part explains how to create a connection to a data source, how to create a subscription to market data events and how to receive them.

### Prerequisites

dxFeed API works under Java SE 8 or later version. The latest version of Java SE is recommended for the best performance. You need to download the latest release of [dxFeed Java API](https://www.dxfeed.com/dxfeed-apis/) from dxFeed website. Download **dxfeed-bin.zip** file and unpack it to any directory. For samples, download **dxfeed-samples.zip** file.

Getting the latest version opens access to all the latest features of API, but there is no need to update each time the new version comes out, unless you want to use some of the newer features. The binary QDS transfer protocol (QTP) is stable and compatible across all QDS and dxFeed API releases.

### Sample code walkthrough

The simplest sample code for dxFeed API is shown below in its completeness. Cut-and-paste this piece of code into a file named **PrintQuoteEvents.java** and you get a program that connects to the specified data source address and prints quotes for the specified market symbol on the console.

```java
import java.util.*;

import com.dxfeed.api.*;
import com.dxfeed.event.market.*;

public class PrintQuoteEvents {
        public static void main(String[] args) throws InterruptedException {
                String address = args[0];
                String symbol = args[1];
                DXFeed feed = DXEndpoint.create().connect(address).getFeed();
                DXFeedSubscription sub = feed.createSubscription(Quote.class);
                sub.addEventListener(new DXFeedEventListener() {
                        public void eventsReceived(List events) {
                                for (Quote quote : events)
                                        System.out.println(quote);
                        }
                });
                sub.addSymbols(symbol);
                while (!Thread.interrupted())
                        Thread.sleep(1000);
        }
}
```

[com.dxfeed.api.DXEndpoint](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/api/DXEndpoint.html) object is created on line 10. It is the object that manages network connections and the lifecycle of the corresponding resources. It is instructed to connect to the address that was specified as the first program argument via connect method and the reference to the [com.dxfeed.api.DXFeed](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/api/DXFeed.html) object is retrieved. DXFeed is the object that represents the data feed in your application. [com.dxfeed.api.DXFeedSubscription<E>](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/api/DXFeedSubscription.html) for [com.dxfeed.event.market.Quote](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/Quote.html) events is created on line 11. A single DXFeed instance can have multiple subscriptions attached to it. A typical modular application has a single instance of DXFeed and multiple subscriptions. Each module has its own subscription for the market data that it needs. dxFeed API implements each subscription via a separate agent in QDS core collector as explained in [Introduction into QDS architecture](https://www.dxfeed.com/introduction-into-qds-architecture/). The core aggregates all subscription requests and a total subscription is sent to the upstream data provider when connection is established. Incoming data is multiplexed to all interested agents. A typical GUI application creates a separate subscription for each individual graphical component that needs marked data. A typical web-based application creates a separate subscription for each session and keeps a reference to the corresponding subscription object in the session object. DXFeedSubscription is [Serializable](https://docs.oracle.com/javase/1.5.0/docs/api/java/io/Serializable.html) to facilitate session replication in highly available web-server configurations.

A listener for incoming events is installed on lines 12-17. [eventsReceived](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/api/DXFeedEventListener.html) method on line 13 is invoked in a separate background thread that is provided from dxFeed API thread pool by default. You can customize thread pool with [DXEndpoint.executor](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/api/DXEndpoint.html) method. It is Ok to have long-running or blocking operations in eventReceived method. The next batch of events for a given subscription is not delivered until a previous batch was processed, but events for different subscriptions are delivered concurrently as long as there are free threads in the pool.

Quote is an example of [LastingEvent](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/LastingEvent.html). They are never queued inside QDS code and your code is guaranteed to always get the most recent quote. Stale quotes are dropped as soon as newer quotes arrive, so your implementation of `eventsReceived` method never has to deal with multiple quotes for the same market symbol in the same batch of events. The other feature of lasting events, is that you receive the snapshot of the most recent event as soon as you subscribe to it. That is why it is important to install subscription listener first (line 12) and then subscribe to a particular symbol (line 18) with [addSymbols](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/api/DXFeedSubscription.html) method.

Lines 19-20 are there to simply keep this simple program running forever. If you run this program with `demo.dxfeed.com:7300` SPY arguments, you’ll see a number of log lines indicating the initialization of QDS, connection process, and quotes from the dxFeed free demo feed for SPDR S&P 500 ETF that are printed with a statement on line 15.

### Asynchronous behavior and error handling

There is no error-handling code in the above sample, because none is needed. All necessary error-handling is fully encapsulated in dxFeed API. QTP network connections use periodic heartbeat messages to detect connectivity problems. If connectivity problem is detected then an automated reconnection routine is initiated. As soon as new connection is established, all subscriptions are automatically sent to the remote data provider node and the most recent market information (quote in our example) is received. Data listeners are notified on new events only if data had actually changed while connection was lost.

That’s why the [DXEndpoint.connect](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/api/DXEndpoint.html) method, for example, does not declare any exceptions. It throws an unchecked runtime exception (an instance of [IllegalArgumentException](https://docs.oracle.com/javase/1.5.0/docs/api/java/lang/IllegalArgumentException.html)) if the syntax of the specified address string is invalid, which likely indicates a configuration problem with the software. However, it does not declare any checked exceptions (like [IOException](https://docs.oracle.com/javase/1.5.0/docs/api/java/io/IOException.html)) to indicate a failure to connect to the data source, because the invocation of this method only initiates the connection. This method does not block. DNS lookup, connection and reconnection process proceeds in the background and automatically recovers from any errors it encounters.

The subscription if handled in an asynchronous way, too, so an invocation of [DXFeedSubscription.addSymbols](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/api/DXFeedSubscription.html) method on line 18 only initiates a process to subscribe to specified symbols. It does not block and does not throw exceptions. Event listeners get immediate notification when this event is already available locally because some other subscription has subscribed to it, but otherwise the event will come at some later time. If you subscribe to non-existing or invalid symbol this notification never arrives.

### Symbology

Applications that are using dxFeed API typically perform some application-specific steps to retrieve a list of valid market symbol, like reading them from a configuration file or to their symbol or portfolio database. dxFeed symbology is explained in the [Symbology Guide](/data-model/symbology-guide/#symbology-guide) and is based on symbols that are assigned by a specific exchanges, with a goal to keep world-wide recognizable symbols of US stocks, ETFs and indices intact. So, subscribing on `IBM` symbol gets you market data for International Business Machines, `GOOG` for Google, `SPX` for S&P 500 index, etc.

dxFeed provides comprehensive lists of all available symbols from all available exchanges in Instrument Profile Files (.ipf). The corresponding file format is explained in detail in the [Instrument Profile Format](/data-model/reference-data/instrument-profile-format/#instrument-profile-format) document. There is a corresponding [Instrument Profile API](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/ipf/package-summary.html) to compose and parse them.

## Quotes, Trades and TimeAndSale events

### Quotes

A quote in dxFeed represents snapshot of the best (top of book) bid and ask prices, and other fields that change with each quote. It is encapsulated in dxFeed API [com.dxfeed.event.market.Quote](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/Quote.html) object. Two most important properties of the quote are bid and ask prices that can be retrieved with the corresponding [getBidSize](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/Quote.html#getBidSize--) and [getAskPrice](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/Quote.html#getAskSize--) methods. Quotes are disseminated by exchanges based on the best active orders in their book for a given market symbol. Bid price is the highest price of the order to buy, and ask price is the lowest price of the order to sell. The size of orders to buy at the highest price and the size of orders to sell at the lowest price can be retrieve with [getBidSize](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/Quote.html#getBidSize--) and [getAskPrice](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/Quote.html#getAskSize--) methods. dxFeed keeps last known bid and ask prices when market for the corresponding instrument closes, but their sizes are set to NaN before the new trading day starts to distinguish fresh quotes on the new trading day from the stale ones on the previous trading day.

All tradable instruments typically have quotes, but indices and indicators typically don’t have them. There are exceptions, though. For example, mutual funds can be traded, but are usually not quoted and provide only their net asset value per share — the price they can be traded at. Some [Cboe CSMI indices](https://www.dxfeed.com/market-data/indices/cboe-streaming-market-indexes/) like `SPX` (Standard & Poors 500) cannot be traded directly (only their derivatives can), but do include bid and ask price computed by Cboe. However, the size of those prices is set to NaN, because they do not represent real buy and sell orders on the exchange.

A common approach to pricing options and other instruments that don’t trade often, but have active market markers who maintain a small spread between bid and ask price, is to take an average between bid and ask price and use it as a proxy for a true market price of an instrument. This is also known as mid price.

### Trades

A trade happens when an order to buy meets an order to sell at the same price. Information about the last trade is encapsulated in dxFeed API [com.dxfeed.event.market.Trade](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/Trade.html) object. Its most important property, the price of the last trade, can be retrieved with [getPrice](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/TradeBase.html#getPrice--) method. The last trade price is often cited as the price for the stock and serves as a basis for an official closing price for stocks. You’d see it on sites like [Yahoo Finance](https://finance.yahoo.com/) and [Google Finance](https://www.google.com/finance). Note, that just like a quote, it is a [lasting event](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/LastingEvent.html) in dxFeed API and represents a snapshot of the last known information. It is used to display or to process the most recent data like the finance web-sites above. If the task is to process or to display a table of all trades, [com.dxfeed.event.market.TimeAndSale](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/TimeAndSale.html) event in dxFeed API shall be used. It provides a continuous stream of all trade-like events that exchange reports together with an original exchange-specific conditions.

The difference between Trade and TimeAndSale is highlighted in a case when trade is busted by exchange. In this case, TimeAndSale reports a separate [Cancel](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/TimeAndSale.html#isCancel--) event that refers to the TimeAndSale event that was canceled. At the same time, Trade event is updated. If the canceled trade was the last trade, then the last trade price reverts to the price of the previous trade.

### Exchange codes

In US markets listed stocks and options trade on multiple exchanges. Quotes and trades that dxFeed provides for the corresponding symbols like `YHOO` and `GOOG` represent NBBO (national best bid and offer) and consolidated trade feed, correspondingly. Each exchange has a character codes as explained in the [Symbology Guide](/data-model/symbology-guide/#symbology-guide). This code is available for bid, ask, and last trade prices via [getBidExchangeCode](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/Quote.html#getBidExchangeCode--), [getAskExchangeCode](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/Quote.html#getAskExchangeCode--) and [getExchangeCode](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/TradeBase.html#getExchangeCode--) methods correspondingly.
