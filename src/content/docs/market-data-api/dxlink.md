---
title: "dxLink"
paligoOriginId: "125310"
---

## dxLink Overview

dxLink is the next-generation access layer for working with dxFeed market data services. It provides a unified, scalable, and secure interface for consuming real-time and historical data across multiple platforms.

Designed to meet the needs of modern client-facing applications, dxLink ensures efficient data delivery even over slow networks or mobile connections by using smart algorithms and back-pressure handling.

dxLink supports:

- WebSocket-based streaming and request/response models
- Token-based authentication
- SDKs for JavaScript, Java, .NET, C++, and Swift
- Integration in B2B and B2B2C environments. It serves as the backbone for dxFeed [Retail](/dxfeed-retail-products/#dxfeed-retail-products) services and IaaS solutions.

On top of dxLink, clients can also use [dxScript](/market-search/dxscript/#dxscript) — an embedded scripting engine for on-the-fly analysis and event generation. dxScript enables technical indicators, conditional triggers, and custom logic to be executed directly in the data stream, reducing downstream processing.

## Benefits

dxLink is a cloud-native access solution for scalable, secure, and developer-friendly delivery of dxFeed market data. It provides a single interface for consuming real-time and historical data across platforms, with features that simplify integration and ensure stable performance even under challenging network conditions.

Key benefits include:

- Unified access to real-time and historical data via a single endpoint
- Cloud scalability with autoscaling and intelligent load balancing
- Resilience under high load and slow or unstable network conditions
- Built-in observability with real-time metrics and alerting tools
- Enterprise-grade security, including TLS 1.3 and fine-grained access control

:::note
For maximum throughput and ultra-low latency in B2B systems, consider using[ Quote Distribution model](/data-model/market-events/qd-model-of-market-events/#qd-model-of-market-events).
:::

### Supported platforms and protocols

dxLink is available on the following platforms:

- JavaScript SDK
- Java SDK
- .NET SDK
- C++ SDK
- Swift SDK

Each SDK implements a shared application protocol and handles authentications, reconnects, and subscriptions.

## When to use dxLink

Use dxLink if you:

- Build a web or mobile application that requires dxFeed market data
- Need a single endpoint for subscribing to real-time quotes, DOM, greeks, or candles
- Want to avoid low-level transport protocols
- Require authentication, session control, and observability

## Getting started

To connect to dxLink:

1. Contact your sales manager to request trial or production access. Once approved, your welcome letter will contain information about your WebSocket endpoint (e.g. [wss://your-endpoint.dxfeed.com](wss://your-endpoint.dxfeed.com/)). Read more on the [Getting Started](/getting-started/#getting-started) page.
2. Choose how to connect. Use one of the SDKs or connect directly via API by y complying with the protocol.
3. Test your setup:
  
  
  
  1. Open the [debug console](https://demo.dxfeed.com/market-data/dxlink-ws/debug/).
  2. Connect using the WebSocket endpoint from the welcome letter (e.g. [wss://your-endpoint.dxfeed.com](wss://your-endpoint.dxfeed.com/)).
  3. Verify that the connection is established and data can be received.
  4. Alternatively, use the demo endpoint for testing (e.g. [wss://demo.dxfeed.com/market-data/dxlink-ws](wss://demo.dxfeed.com/market-data/dxlink-ws)).
4. Start working. Connect and obtain market data.

## Authentication and access control

dxLink uses various authentication systems and supports multiple access modes, and session types. The platform is flexible and can integrate with different environments.

### B2B integration

For B2B clients, authentication and access control typically involve the following methods:

- Static access tokens
- Dynamic tokens per system
- Whitelisted IPs or pre-negotiated entitlements

### B2B2C integration

In B2B2C scenarios, access is typically user-based:

- Short-living tokens per user
- Token access and permissions

### Access levels

Access levels are configurable for all models and define available features, data environments, and privileges. See [Token-based authorization](/data-services/real-time-and-delayed-services/token-based-authorization/#token-based-authorization) for details.

Examples:

- `demo`: token for testing purposes, with access to delayed data and demo endpoints
- `prod`: production token with access to live data and production infrastructure
- `custom`: token configured with specific entitlements and rules tailored for your setup

## dxLink services

dxLink provides access to several key services.

### Feed service

Feed service delivers real-time market data for all supported exchanges and asset classes. It provides continuous updates for quotes, greeks, and candles.

Key features:

- Real-time market data for all supported exchanges and asset classes (see the [full list](https://dxfeed.com/market-data/)).
- Channel-based model (subscribe → receive updates)
- Highly optimized data format

### Depth of market (DOM) service

DOM service provides detailed order book data, allowing you to see market depth beyond the best bid and ask. It supports price-level views and is suitable for trading systems that require granular market visibility.

Key features:

- Market by price (Level II) data
- Suitable for high-frequency interfaces
- Supports selective subscription and filtering
