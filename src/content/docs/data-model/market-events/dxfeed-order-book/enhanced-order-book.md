---
title: "Enhanced Order Book"
paligoOriginId: "49057"
---

## Overview

The Enhanced Order Book is an extended version of the [Order Book](/data-model/market-events/dxfeed-order-book/#dxfeed-order-book). The Enhanced Order Book's **Order** event has additional fields like **Order ID**, **Action**, **Trade price**, and other data. This allows advanced analytics like tracking separate fields and their status.

## Enhanced Order Book fields

If you work with Enhanced Order Book, you get the standard **Order** fields available as Order events via [dxFeed API Market Events](/data-model/market-events/dxfeed-api-market-events/#dxfeed-api-market-events), and the following additional fields that you can enable to access individual order-level data:

| Field name | Field type | Description |
| --- | --- | --- |
| Action | enum | Meaning of the **Order** event. The Order can be added or replaced, partially or fully executed, etc. |
| ActionTime | timestamp | Time of the last action |
| OrderID | long | ID of this order.<br/>You receive Order IDs in the standard exchange's form with no additional remapping. [Read more](#additional-info-about-order-ids) about possible Order IDs assignments of different exchanges |
| AuxOrderID | long | Additional Order ID for this order. It contains a link to another Order ID - aggressor or replacement. Read more about [Aggressor order processing](#aggressor-order-processing) |
| TradeID | long | Trade (Order Execution) ID (Trade-related field) |
| TradePrice | decimal | Trade price (Trade-related field) |

:::note
By default, the operation mode for receiving additional data for the Enhanced Order Book is disabled. To enable, use the JVM properties `-Ddxscheme.fob=true` flag.
:::

:::note
The same fields are available as Order records at the transport level. See [QD Model of Market Events](/data-model/market-events/qd-model-of-market-events/#qd-model-of-market-events).
:::

### Order Action types

The [com.dxfeed.event.market.OrderAction](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/OrderAction.html) field is an enumerated constant that describes the meanings of the Order event actions. These Order Actions are various operations that you can execute with orders in the Extended Order Book. The only exceptions are **TRADE** and **BUST**.

Order Action's possible values:

| Order Action | Action Type | Description |
| --- | --- | --- |
| [UNDEFINED](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/OrderAction.html#UNDEFINED) | Empty new fields, conflate events, etc. | The default enum value for backward compatibility with the Order Book. This action derives from other **Order** fields |
| [NEW](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/OrderAction.html#NEW) | Add a new order | New Order is entered into the Order Book |
| [REPLACE](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/OrderAction.html#REPLACE) | Replace an order | A modified order with maintained price-time priority. For example, the order re-enters the Order Book. Note that the **Order** event does not change its ID: |
| [MODIFY](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/OrderAction.html#MODIFY) | Modify or partially cancel an order | A modified order has no change in its price-time priority |
| [DELETE](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/OrderAction.html#DELETE) | Delete an order | This action type fully cancels and removes an order from the Order Book |
| [PARTIAL](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/OrderAction.html#PARTIAL) | Partial order execution | Size is usually reduced due to partial order execution |
| [EXECUTE](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/OrderAction.html#EXECUTE) | Full order execution | Fully execute and delete an order. The size is **0** |
| [TRADE](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/OrderAction.html#TRADE) | Non-Book Trade | This Trade doesn't refer to any entry in the Order Book. **OrderID** is empty |
| [BUST](https://docs.dxfeed.com/dxfeed/api/com/dxfeed/event/market/OrderAction.html#BUST) | Trade Bust | Prior **TRADE**/**ORDER** execution. **BUST** doesn't refer to any entry in the Order Book. **OrderID** is empty |

The table below defines Order Action types and their applicable properties:

| Action | Price, Side, Time | Size | Action Time | Order ID | Trade ID | Trade Price, Trade Size | Aux Order ID |
| --- | --- | --- | --- | --- | --- | --- | --- |
| UNDEFINED | (1) | (1) | - | - | - | - | - |
| NEW | M | M | M | M | - | - | + (3) |
| REPLACE | M (2) | M | M | M | - | - | - |
| MODIFY | M | M | M | M | - | - | - |
| DELETE | M | 0 | M | M | - | - | + (4) |
| PARTIAL | M | M | M | M | + | M | + (5) |
| EXECUTE | M | 0 | M | M | + | M | + (5) |
| TRADE | - | 0 | M | - | + | M | - |
| BUST | - | 0 | M | - | M | - | - |

Check values for the table above:

| Value | Description |
| --- | --- |
| M | Mandatory field |
| + | Optional field is specified if available |
| - | Inapplicable field is empty |
| (1) | Fields are filled according to previous dxFeed API version requirements |
| (2) | Symbol and Side remain the same |
| (3) | Predecessor order replaces Order ID, if available |
| (4) | Successor order replaces Order ID, if available |
| (5) | Aggressor Order ID, if available |

:::note
Fields such as **Symbol**, **Index** are always filled for all new events. Time and Sequence are always filled for all new events except **TRADE**/**BUST**.
:::

The [Order Action sample](#order-action-sample) section contains a sample sequence of Order Actions.

## Enhanced Order Book order processing details

### Maintenance

:::note
Treat all unknown Order Actions as **UNDEFINED** for compatibility, i.e. derive processing logic from other fields.
:::

To determine orders' matching and execution priority, sort them by **Price**, **Time**, and **Sequence** on each Enhanced Order Book side separately. To maintain the Enhanced Order Book, check [Order Action types](#order-action-types) and process with the Order Books' **Order** event for compatibility.

The Order Action state machine diagram:

![Enhanced_Order_Book.png](/images/uuid-cee174ac-bfc8-63fc-64b7-f5dba84ca2d7.png)

Ignore **TRADE** and **BUST** Order Actions since they do not refer to existing orders in the Enhanced Order Book.

### Order executions

Whenever a new order execution occurs, the new trade-related event disseminates (either **PARTIAL**, **EXECUTE**, or **TRADE**).

Each Order Book execution (a book trade) has an order size value equal to the actual size of the order resting in the Order Book after the execution.

- For regular orders (with no hidden volume), calculate the new size value as non-negative: `new Size = old Size - new TradeSize`.
- Since a part of the order volume is hidden for [iceberg orders](https://www.investopedia.com/terms/i/icebergorder.asp#:~:text=Iceberg%20orders%20are%20large%20orders,type%20of%20order%20is%20executed.), the exchange may update corresponding fields differently: the **TradeSize** may be larger than the order's size before the execution and the resulting size (after the execution) may even increase. Note that an iceberg order may change its position in the Enhanced Order Book (its **Time** field may change). For example, see [CME documentation](https://www.cmegroup.com/education/display-quantity-order-overview.html) and [the example](#iceberg-order-sample) below.

For user convenience, the **ExecutedSize** accumulates all known executed order volume. Calculate the **ExecutedSize** as a sum of all known **TradeSize**. Don't clear this field on **DELETE** or **REPLACE** actions.

**BUST** action processing depends on exchange regulations (if day volume, high/low prices need adjustments, etc).

### Snapshot retrieval

With the Extended Order Book, you receive some extra events. It happens due to non-conflated dissemination when retrieving an initial Order Book snapshot. The Order Book has these events but with `Size=0` not to break backward compatibility.

Note that the Order Book snapshot disseminates with events containing Action Types corresponding to the last action for each Order Book entry.

It is possible to receive the Order Book snapshot not only at the start. Process it like an initial snapshot and discard the previous Order Book state to receive a snapshot at any time during normal work. Usually, such snapshots occur due to reconnections in the uplink chain or global synchronization/reset distributed by the exchange feed.

#### Initial snapshot sample

Consider the Order Book for some symbol , e.g. `IBM`:

| Bid Order ID | Bid Price | Bid Size | Priority | Ask Size | Ask Price | Ask Order ID |
| --- | --- | --- | --- | --- | --- | --- |
| 1001 | 100.0 | 10 | 1 | 20 | 105.0 | 1020 |
| 1050 | 100.0 | 20 | 2 | 10 | 110.0 | 1005 |
| 2009 | 95.0 | 50 | 3 | - | - | - |

The following **Order** event's snapshot from dxFeed API represents the above book state:

| Index | Action | Order ID | Symbol | Side | Price | Size | Executed Size | Trade ID | Trade Price | Trade Size | Comment |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | UNDEFINED | - | IBM | - | - | 0 | - | - | - | - | EVENT_REMOVE |
| 1 | TRADE | - | IBM | - | - | 0 | 0 | 30240 | 105.5 | 50 | "Old" Non-Book Trade |
| 2 | PARTIAL | 1001 | IBM | Buy | 100.0 | 10 | 10 | 30300 | 100.0 | 10 | Partially-filled Order |
| 3 | NEW | 1050 | IBM | Buy | 100.0 | 20 | 0 | - | - | - | New Order |
| 4 | MODIFY | 2009 | IBM | Buy | 95.0 | 50 | 0 | - | - | - | New Order |
| 5 | NEW | 1020 | IBM | Sell | 105.0 | 20 | 0 | - | - | - | New Order |
| 6 | NEW | 1005 | IBM | Sell | 110.0 | 10 | 0 | - | - | - | New Order |
| 7 | EXECUTE | 1010 | IBM | Buy | 100.0 | 0 | 20 | 30280 | 100.0 | 10 | "Old" Fully-executed Order |
| 8 | DELETE | 1060 | IBM | Sell | 115.0 | 0 | - | - | - | - | "Old" Cancelled Order |

:::note
You may still receive old events due to non-conflated order dissemination.
:::

### Aggressor order processing

Usually, aggressor order is not manifest itself in the stream of **Order** events. All induced trades disseminate as events for their passive order counterparts. Most exchange protocols don't provide information about aggressive orders, but if they do (for example, CME), the new data model provides:

- **Trade action** events for passive order contain the aggressor's Order ID in **AuxOrderID** field
- No dissemination for the **Order** event if the aggressor order is fully executed. The new data model publishes trade-related **Order** event for passive order
- The trade size for the **ExecutedSize** field if the aggressor order isn't fully executed and enters the Order Book

## Enhanced Order Book samples

### Order action sample

The **Order** event represents an abstract sequence of Order Actions. See the Order Action sample with omitted **Symbol=IBM** and **Side=Buy** in the following table:

<table>
<tr><th>Description</th><th>Action</th><th>Order ID</th><th>Price</th><th>Size</th><th>Executed Size</th><th>AuxOrder ID</th><th>Trade ID</th><th>Trade Price</th><th>Trade Size</th></tr>
<tr><td>New order #10001 for "Buy 100 IBM @ 123.35"</td><td>NEW</td><td>10001</td><td>123.35</td><td>100</td><td>0</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td>Reduce size for #10001 by 20</td><td>MODIFY</td><td>10001</td><td>123.35</td><td>80</td><td>0</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td>Update order #10001 with "Buy 100 IBM @ 123.45"</td><td>REPLACE</td><td>10001</td><td>123.45</td><td>100</td><td>0</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td>Order #10001 is executed for 20 with Trade #50001 and Price 123.44</td><td>PARTIAL</td><td>10001</td><td>123.45</td><td>80</td><td>20</td><td>-</td><td>50001</td><td>123,44</td><td>20</td></tr>
<tr><td>Order #10001 is executed for 80 with Trade #50002 by aggressor Order #10020</td><td>EXECUTE</td><td>10001</td><td>123.45</td><td>0</td><td>100</td><td>10020</td><td>500002</td><td>123,45</td><td>80</td></tr>
<tr><td>Non-Book Trade #50010 for "Buy 1000 IBM @ 123.7"</td><td>TRADE</td><td>-</td><td>-</td><td>0</td><td>0</td><td>-</td><td>50010</td><td>123,7</td><td>1000</td></tr>
<tr><td>Trade Bust for #50010</td><td>BUST</td><td>-</td><td>-</td><td>0</td><td>0</td><td>-</td><td>50010</td><td>-</td><td>-</td></tr>
<tr><td>New order #10002 for "Buy 100 IBM @ 123.55"</td><td>NEW</td><td>10002</td><td>123.55</td><td>100</td><td>0</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td rowspan="2">Cancel/Replace order #10002 with new order #10003 for "Buy 120 IBM @ 123.66"</td><td>DELETE</td><td>10002</td><td>123.55</td><td>100</td><td>0</td><td>10003</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td>NEW</td><td>10003</td><td>123.66</td><td>100</td><td>0</td><td>10002</td><td>-</td><td>-</td><td>-</td></tr>
</table>

### Iceberg order sample

The below example shows the typical process of the iceberg order. Consider the situation that:

1. There is an executed order `#1006`. It's already partially executed for `80` and the latest trade is `10.`
  
  
  
  ![Iceberg_1.png](/images/uuid-ab7092fd-f24f-9a85-67ec-0bb0cedc10ff.png)
2. When the new order ID `#1007` comes, Icebergs usually re-enter the Order Book and lose their price-time priority. Therefore, the order and action time increase, and the executed size grows. The action and all other data remain the same.
  
  
  
  ![Iceberg_2.png](/images/uuid-201fec63-de01-53e6-c9e5-035a5084a9aa.png)

## Additional info about Order IDs

You receive Order IDs in the standard exchange's form with no additional remapping. Note that all exchanges have different rules about Order ID assignment:

- Some exchanges have Order IDs that are unique globally across all securities. For example, [Nasdaq TotalView](https://www.nasdaq.com/solutions/nasdaq-totalview) exchange.
- Some exchanges have Order IDs that are unique only per instrument. Two orders with the same Order IDs may exist for different instruments.
- Some exchanges have Order IDs that are unique only per instrument per side. The same Order ID may exist on both (buy and sell) sides of the book for one instrument. For example, [Borsa Istanbul](https://www.borsaistanbul.com/en/) exchange.
- Most exchanges reuse Order IDs. The time period for reusing an Order ID may vary from one day to one week or more. Therefore, data can be valid only during some specific trade days.
