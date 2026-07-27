---
title: "System Monitoring and Telemetry Integration"
paligoOriginId: "111477"
---

## Overview

dxFeed provides an internal monitoring system to ensure system availability, capacity, stability, and latency. Customers can integrate their own monitoring solutions by extracting metrics from dxFeed system to set up custom alerts and automate telemetry processing.

## Telemetry and data integration

Each dxFeed system component publishes telemetry in a standard `tag=value` format known as MARS. This data can be:

- Displayed in real-time dashboards (e.g., Zabbix)
- Used for historical analysis (e.g., Grafana)
- Parsed at the API level for automated processing

## Access and customization

Authenticated external users can access telemetry data during initial integration or upon request. The available metrics cover a wide range of monitoring use cases, ensuring flexibility for different operational needs.

## Monitoring metrics

The table below provides a brief excerpt of the most commonly requested monitoring metrics. A more comprehensive list is available upon request.

| ID# | MARS node name | Description |
| --- | --- | --- |
| 1 | <root> | From -Dmars.root + "YYYYmmdd-HHmmss.sss" |
| 2 | <gateRootNode> | <root>+ '.' + gate name |
| 14 | <gateRootNode>.recovery.snapshotStatus | Status of the latest attempt to load/persist a recovery snapshot |
| 15 | <gateRootNode>.received | Rate of received messages per second |
| 24 | <gateRootNode>.invalidTradingHours | Number of instruments with invalid trading hours |
| 33 | <gateRootNode>.requestsStat | Requests statistics |
| 40 | <gateRootNode>.requestsMade | Average number of requests per second since last update |
| 73 | <gateRootNode>.eventsPublished | Average number of published events per second |
| 132 | <gateRootNode>.errors | Rate of errors in messages per second |
| 159 | <gateRootNode>.unknown | Rate of unknown message types per second |
| 162 | <gateRootNode>.produced | Rate of produced messages per second |
| 227 | <gateRootNode>.connection | State of gate connection |
