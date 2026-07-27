---
title: "dxFeed Order Book"
paligoOriginId: "40591"
---

## Overview

The Order Book is a market data depth that provides you with an insight into order flow for different analytics. dxFeed Order Book's **Order** event provides a list of orders for a particular security, including shows of every single quote and order at every price level for stocks. By default, the order sizes don't reflect the "real" order size as reserve/iceberg orders are often placed with a limited showing shares number in the Order Book.

dxFeed provides two data modes for the Order Book:

- **Full Order Depth (FOD)** — delivers individual order data identified by `Index` field and does not include Order IDs or action types. You reconstruct the order book yourself using `Index` and `EventFlags` fields with snapshot and transaction handling. To reconstruct an order book using FOD, see [Order Book Reconstruction](/data-model/market-events/dxfeed-order-book/order-book-reconstruction/#order-book-reconstruction).
- **Enhanced Order Book (EOB)** — an extension of FOD that delivers individual order-level data, including Order IDs, action types, and trade prices. EOB uses the same reconstruction algorithm as FOD and additionally enables per-order tracking, execution history, and aggressor order information. EOB is also referred to as Full Order Book (FOB) and requires explicit enablement via `-Ddxscheme.fob=true`. To work with individual orders and execution data, see [Enhanced Order Book](/data-model/market-events/dxfeed-order-book/enhanced-order-book/#enhanced-order-book).

To reconstruct an order book, you can use the `OrderBookModel` class in dxFeed API or implement the reconstruction algorithm manually using `Index` and `EventFlags` fields. For details, see [Order Book Reconstruction](/data-model/market-events/dxfeed-order-book/order-book-reconstruction/#order-book-reconstruction).

## Order Book fields

The **Order** event carries the core set of fields used across both FOD and EOB modes. For a complete field reference, see [QD Model of Market Events](/data-model/market-events/qd-model-of-market-events/#qd-model-of-market-events) and [dxFeed API Market Events](/data-model/market-events/dxfeed-api-market-events/#dxfeed-api-market-events).
