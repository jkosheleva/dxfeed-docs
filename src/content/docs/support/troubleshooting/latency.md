---
title: "Latency"
paligoOriginId: "917"
---

## How to reduce latency

There are two main options which can reduce latency:

- Optimizing connection
- Optimizing data

## Optimizing connection

### Colocation

You may choose your latency based on a simple approach: if the connection is closer to dxFeed infrastructure, the latency is less:

```
Colocation -> Amazon -> Internet
```

dxFeed offers a colocation option: you can be connected to the nearest data center in order to reduce ping. Check our [connectivity page](https://www.dxfeed.com/connectivity/) to find the nearest center to you.

### Increasing speed

dxFeed can provide a huge amount of data per second. But it is impossible to provide more data than a customer can receive. Thus, dxFeed advises increasing the speed of connection. An acceptable connection speed starts from 1MBit/Sec.

### Cross connection

In order to reduce data package losses and disconnects, dxFeed offers a cross-connection. Usually, cross-connection consists of a public and a private connection.

## Optimizing Data

For users that are far from our servers and claim to have acceptable bandwidth (not less than 1 MBit/Sec):

- Breaking down a single request for 1 day of data to multiple requests (for example, to 1 hour of data) and querying them one by one.
- Breaking down a single request for 1 day of data to multiple requests (for example, to 1 hour of data) and querying several of them in parallel (e.g., 3 parallel flows).
- Place new frontend servers closer, in order to reduce the chance of packet drops.

### Data granularity

Granularity means the level of detail of your data within the data structure. [Learn more](http://en.dwhwiki.info/glossary/g/granularity) about granularity.

Granularity usage:

- Split one day into 24 segments (by hour)
- Query most recent segments with the highest granularity
- Query the oldest segments with the smallest granularity
- Analyze preliminary user behavior
