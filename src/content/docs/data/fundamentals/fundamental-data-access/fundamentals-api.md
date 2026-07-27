---
title: "Fundamentals API"
paligoOriginId: "922"
---

## Overview

The service provides a light-weight interface for retrieval fundamental and corporate action data using dxFeed symbology. The data is collected from multiple source and normalized for convenience.

You can use the data provided by a specific source or a default selection configured by dxFeed team using best practices.

## API usage

There are different kinds of requests that may be submitted to the service:

| **Topic** | **Description** | **Name** |
| --- | --- | --- |
| Snapshot | The service provides the latest available state of the fundamentals per the specified parameters | snapshot-controller |
| History | The service provides the possibility to retrieve the history state of fundamentals value for the specified parameters | history-controller |
| Symbol state change | The service provides information about splits, spin off-s, mergers & acquisition and symbol changes which were identified by the service and match with the defined input parameters | symbol-state-change-controller |
| Category specific controllers | The service provides a possibility to retrieve the data from some specific category | category name specific, like balance-sheet-controller |

For more specific information, please see [swagger documentation](https://tools.dxfeed.com/fs/swagger-ui/index.html).

## List of available attributes

The attributes are organized in categories or types according to their business meaning and the usage pattern in multiple analytical applications.

Follow the [Fundamentals Data Dictionary](/data/fundamentals/fundamentals-data-dictionary/) to get the list of attributes available in every category. Similar information can be found in the [API specification](https://tools.dxfeed.com/fs/swagger-ui/index.html).
