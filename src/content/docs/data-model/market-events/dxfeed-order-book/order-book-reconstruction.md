---
title: "Order Book Reconstruction"
paligoOriginId: "33342"
---

## Overview

dxFeed market data feeds (real-time, delayed or historical) allow clients to reconstruct order books, price level aggregations, and aggregations by Market Maker or a data provider. This document describes an order book reconstruction. For reconstruction, you can:

1. Use [com.dxfeed.model.market.OrderBookModel](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/model/market/OrderBookModel.html) class in dxFeed API.
2. Check out **Order** event fields and implement the reconstruction algorithm.

We recommend using dxFeed API because it correctly implements a reconstruction protocol, including snapshot and transaction handling. For an overview of the Order event and other event types available through dxFeed API, see [dxFeed API Market Events](/data-model/market-events/dxfeed-api-market-events/#dxfeed-api-market-events).

## dxFeed API

To get the best and smoothest solution for the order book reconstruction, we recommend using our [dxFeed Java API](https://www.dxfeed.com/dxfeed-apis/). It provides a [com.dxfeed.model.market.OrderBookModel](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/model/market/OrderBookModel.html) class which builds a high-quality order book from a set of [Orders](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/Order.html). This class keeps track of transactions and snapshots, filters data, etc. [Learn more](https://docs.dxfeed.com/dxfeed/api/index.html) about events and classes in dxFeed API.

To read a **full-order-depth.csv** file and transmit data into OrderBookModel use the sample below:

```java
import com.dxfeed.api.DXEndpoint;
import com.dxfeed.api.DXFeed;
import com.dxfeed.event.market.Order;
import com.dxfeed.model.market.OrderBookModel;
import com.dxfeed.model.market.OrderBookModelFilter;

public class FODFromFile {
    public static void main(String[] args) {
        try {
            DXEndpoint endpoint = DXEndpoint.create(DXEndpoint.Role.STREAM_FEED);
            DXFeed feed = endpoint.getFeed();
            OrderBookModel model = new OrderBookModel();
            model.setFilter(OrderBookModelFilter.ALL);
            model.setSymbol("AAPL");
            model.addListener(change -> {
                System.out.println("Buy orders:");
                for (Order order : model.getBuyOrders()) {
                    System.out.println(order);
                }
                System.out.println("Sell orders:");
                for (Order order : model.getSellOrders()) {
                    System.out.println(order);
                }
                System.out.println();
            });
            model.attach(feed);
            //        creates a feed that is ready to read data from file as soon as the following code is invoked:
            endpoint.connect("file:full-order-depth.csv[speed=max]");
            endpoint.awaitNotConnected();
            endpoint.closeAndAwaitTermination();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

Read more about the [com.dxfeed.api.DXEndpoint](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/api/DXEndpoint.html) class.

## Reconstructing an order book without the OrderBookModel class of dxFeed API

You can reconstruct an order book without using the [com.dxfeed.model.market.OrderBookModel](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/model/market/OrderBookModel.html) class in dxFeed API. For this, do the following:

1. Learn about **Index** and **EventFlags** fields to know how to track snapshots, updates, and transactions.
2. Follow the [algorithm](#algorithm).

### Indices

An order book consists of an undefined number of orders. Each exchange specifies ID for each order. Since each exchange uses different IDs, we assign our indices to each order (we put orders in special slots that have indices assigned).

The index of an order distinguishes different entries in the order book.

:::note
An order may move to another index, so this identifier is not permanent. Every event can be a new order, an order modification, or an order cancellation.
:::

#### Index reusing

Every forthcoming **Order** event can reuse the index after its clearing. Index reusing works as follows:

1. Receive a snapshot of all levels. Snapshots start with the `SNAPSHOT_BEGIN (EventFlag.SnapshotBegin = 0x04)` flag and end with the `SNAPSHOT_END (EventFlag.SnapshotEnd = 0x08)` flag or `SNAPSHOT_SNIP` flag.
2. Receive updates in form of **Order** events. Each event has an **Index** value for referencing some order's address.
3. Add a new order if the received Index is unique.
4. Receive the `REMOVE_EVENT (EventFlag.RemoveEvent = 0x02)` flag if an order is cancelled. It has a single meaningful identifier inside – the **Index** value. Ignore other fields such as **Size** in this case.

Modification and partial execution have similar operations:

1. Receive the `REMOVE_EVENT` flag.
2. Receive a new **Order** event.

:::note
You may also conflate these two actions into a single **Order** event with an updated **Size**.
:::

There should be no `REMOVE_EVENT` with an unknown Index, but in case that happens, such an event should be ignored.

### Regional events

Since every regional event indicates exchange (non-zero source ID or exchange code in QD-model), you need to reconstruct an order book for each source ID separately. For example, you need to create two order books, if you have both **order#bzx** and **order#byx** events in your market data feed.

### Event flags applicable to Order event

Event flags define the borders of snapshots and transactions retransmissions:

- `TX_PENDING` indicates a pending transaction update. When `TX_PENDING` is true, it means that an ongoing transaction update, that spans multiple events, is in process.
- `REMOVE_EVENT` indicates that the event with the corresponding index has to be removed.
- `SNAPSHOT_BEGIN` indicates when the loading of a snapshot starts. Snapshot load starts with a new subscription and the first indexed event that arrives for each non-zero source ID on a new subscription may have `SNAPSHOT_BEGIN` set to true. It means that an ongoing snapshot consisting of multiple events is incoming.
- `SNAPSHOT_END` indicates the end of a snapshot. It indicates that the data source has sent all the data about subscription for the corresponding indexed event.
- `SNAPSHOT_SNIP` indicates early termination of a snapshot and is treated as snapshot completion by the reconstruction logic. Unlike `SNAPSHOT_END`, it means a limit on the amount of data was reached and the snapshot may be incomplete. Primarily relevant for time-series events such as candles; generally does not apply to order book events

If an event has multiple flags, they are separated by commas, for example: `EventFlags=SNAPSHOT_BEGIN,TX_PENDING`.

### Snapshots

**Order** event stream consists of snapshots and updates for these snapshots. Snapshots start with the `SNAPSHOT_BEGIN` flag and end with the `SNAPSHOT_END` or `SNAPSHOT_SNIP` flag.

:::note
Due to possible reconnections and retransmissions, the snapshots can overlap each other, so in the event stream the flags can intersect. It is possible to find `SNAPSHOT_END` before `SNAPSHOT_BEGIN`, or it is possible to find `SNAPSHOT_BEGIN` after `SNAPSHOT_BEGIN`, and so on. Therefore, the reconstruction algorithm should extract a complete snapshot ignoring the wrong residues of other snapshots.
:::

When `SNAPSHOT_BEGIN` flag arrives, clear any unprocessed pending events from the previous incomplete sequence. Apply the new snapshot only after `SNAPSHOT_END` or `SNAPSHOT_SNIP` flag.

### Transaction model

Updates of order books happen as a sequence of transactions. If a transaction consists of several events, then all these events except the last one have a `TX_PENDING` flag. If an event does not have a `TX_PENDING` flag, it means that this event finishes the current transaction or, if there is no current transaction, then this event is operated as a single-event transaction.

Snapshots can overlap with order book modifications and transactions. While the snapshot is being transmitted, updates of the order book can occur. There are two consequences:

1. The snapshot can have modifications of the order book.
2. A snapshot update during the transfer can create a transaction until the end of the snapshot (we will add the `TX_PENDING` flag until the end of the snapshot). It means that it will create an artificial transaction until the end of this snapshot.

### TX_PENDING on a snapshot boundary

An event flagged `SNAPSHOT_END` (or `SNIP`) can also carry the `TX_PENDING` flag. In that case, the transaction is not yet complete — it ends only after `TX_PENDING` is cleared in subsequent events. This happens when a live update arrives while a snapshot is being transmitted, creating a gap that is filled after `SNAPSHOT_END`.

:::note
This must not be ignored. When a snapshot has such a gap, `TX_PENDING` will always be set at the snapshot boundary. After `SNAPSHOT_END`, the missing events will be delivered and `TX_PENDING` will be cleared. The transaction is not considered complete until `TX_PENDING` is cleared.
:::

### Examples

#### One transaction

```
Order#NTV,AAPL,20180926-100107.858-0400,0,1219,20180926-100107-0400,854:1,223.31,17,1307,NSDQ,EventFlags=TX_PENDING
```

```
Order#NTV,AAPL,20180926-100107.858-0400,0,1623,20180926-100107-0400,854:2,223.29,59,1303,NSDQ
```

#### Single-event transaction

```
Order#NTV,AAPL,20180926-100107.826-0400,0,723,20180926-100107-0400,822:0,223.07,100,1303,NSDQ
```

#### Two single-event transactions

```
Order#NTV,AAPL,20180926-100107.441-0400,0,2449,20180926-100107-0400,437:0,223.3,100,1307,NSDQ
```

```
Order#NTV,AAPL,20180926-100107.441-0400,0,525,20180926-100107-0400,437:1,223.26,100,1303,NSDQ
```

#### Snapshot transaction

```
=Order#NTV  EventSymbol  Index  Time              Sequence  Price   Size  EventFlags
Order#NTV   AAPL         2023   20230914-152933   498:5     174.76  NaN   EventFlags=SNAPSHOT_BEGIN
Order#NTV   AAPL         2      20230914-151532   423:0     180     10
Order#NTV   AAPL         1      0                 0         NaN     NaN
Order#NTV   AAPL         0      0                 0         NaN     NaN   EventFlags=REMOVE_EVENT,SNAPSHOT_END
```

#### Empty snapshot (single event with both SNAPSHOT_BEGIN and SNAPSHOT_END)

```
=Order#NTV  EventSymbol  Index  Time  Sequence  Price  Size  EventFlags
Order#NTV   AAPL         0      0     0         NaN    NaN   EventFlags=REMOVE_EVENT,SNAPSHOT_BEGIN,SNAPSHOT_END
```

:::note
The book should be fully cleared when empty snapshot is received.
:::

#### Snapshot with TX_PENDING at the boundary

```
=Order#NTV  EventSymbol  Index  Time              Sequence  Price   Size  EventFlags
Order#NTV   AAPL         2023   20230914-152933   498:5     174.76  NaN   EventFlags=SNAPSHOT_BEGIN
Order#NTV   AAPL         3      20230914-151532   426:0     181     11
Order#NTV   AAPL         2      20230914-151531   423:0     180     10
Order#NTV   AAPL         1      0                 0         NaN     NaN   EventFlags=TX_PENDING
Order#NTV   AAPL         0      0                 0         NaN     NaN   EventFlags=TX_PENDING,REMOVE_EVENT,SNAPSHOT_END
Order#NTV   AAPL         3      20230914-151535   420:0     182     12    EventFlags=TX_PENDING
Order#NTV   AAPL         2      20230914-151536   421:0     181     10
```

SNAPSHOT_END carries TX_PENDING, so the transaction continues past the snapshot boundary. The events after SNAPSHOT_END (indices 3 and 2) are part of the same transaction. It completes only when TX_PENDING clears on the last event (index 2).

### Algorithm

The reconstruction algorithm uses a pending queue that accumulates events and applies them transactionally to the reconstructed order book. It tracks incoming event flags and the current accumulation state to determine the next action. The algorithm also defers notifications for completed updates and publishes them after batch processing completes.

The algorithm maintains the following state:

- `pendingEvents` – accumulated events
- `isPartialSnapshot` – snapshot in progress
- `isCompleteSnapshot` – snapshot completed and ready to apply
- `updates` – completed non-snapshot updates accumulated within the current batch

Processing logic is as follows:

```
    public void processEvents(List<E> events) {
        List<E> updates = new ArrayList<>();
        for (E event : events) {
            if (isSnapshotBegin(event)) {
                isPartialSnapshot = true;
                isCompleteSnapshot = false;
                pendingEvents.clear(); // remove any unprocessed leftovers on new snapshot
                if (!updates.isEmpty()) { // if any completed updates exist, save them until the end of batch processing
                    deferNotification(updates, false);
                    updates = new ArrayList<>();
                }
            }
            if (isPartialSnapshot && isSnapshotEndOrSnip(event)) {
                isPartialSnapshot = false;
                isCompleteSnapshot = true;
            }
            pendingEvents.add(event); // defer processing of this event while snapshot in progress or tx pending
            if (isPartialSnapshot || isTxPending(event))
                continue; // waiting for the end of snapshot or updates

            // we have completed updates or snapshot
            if (isCompleteSnapshot) { // completed snapshot
                isCompleteSnapshot = false;
                processSnapshot();
            } else { // completed updates
                updates.addAll(pendingEvents);
            }
            pendingEvents.clear();
        }
        if (!updates.isEmpty())
            deferNotification(updates, false);
        runDeferredNotifications();
    }
```

#### Applying events by Index

When events are applied to the order book:

- If `REMOVE_EVENT` is present, remove the order by Index
- Otherwise, add or update the order by Index

This logic applies both during snapshot processing and transactional update application.

This algorithm also works for reconstructing price levels or aggregations by Market Maker.

#### Threading model

For each instance of DXFeedSubscription, event listeners are never called concurrently. Listeners are invoked serially — the next notification is not delivered until DXFeedEventListener.eventsReceived() completes for the previous one. This guarantees that the order of events within a given DXFeedSubscription instance is preserved.

In practice this means:

- A single handler instance on a single subscription will never receive concurrent calls and requires no synchronization
- If you use only one symbol per subscription, you do not need to write code to handle interleaving events from multiple symbols

If you create multiple subscriptions for the same symbol, each subscription has its own serial listener and events across subscriptions are independent.
