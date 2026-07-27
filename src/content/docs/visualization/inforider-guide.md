---
title: "Inforider Guide"
paligoOriginId: "946"
---

## Overview

Inforider Terminal is a desktop application for traders, market data analysts, and quants that allows you to monitor and analyze real-time financial market data, finance news, and fundamental information across multiple assets. It also functions as a direct information terminal for accessing dxFeed services without using an API.

## Features

- Visualization of market data
- Built-in data analysis tools, such as graphs and notifications
- Trading strategies testing with historical data
- Access to the following services:
  
  
  
  - Fundamental, charting, and news data feeds
  - Real-time and delayed market data
  - dxPrice Options Analytics Solution
  - OnDemand market replay since 1/1/2010
- Alerts and notifications

:::note
Please remember that Inforider is just a diagnostic tool for several cases.
:::

## Installation

1. Install Oracle [JRE 8](https://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html).
2. Please use [Contact Sales](https://dxfeed.com/contact-sales/) form on the website to get a link to the Inforider installer.
3. Download and unzip the file.
4. Find the InfoRider-version-OperatingSystem. Choose the right file for your operating system: Linux.sh, macos.dmg, or windows.exe.
5. Install the application.

## Configuration

After it launches, a login window will appear. First, you need to enter the connection settings by clicking Connection.

![inforider125.png](/images/uuid-2a88d0fa-5c56-d4ed-cc43-ac639b34d042.png)

1. Type [https://tools.dxfeed.com/ipf](https://tools.dxfeed.com/ipf) in the Instrument Lookup Service.
2. Enable full-text instrument search option. (The fulltext option enables auto-fill of relevant symbols while typing).
3. Enter your endpoint address in the Quote Source field and enable this new address. If you have multiple endpoints you can enter them here and switch between them later.
4. If you have any special data endpoint addresses for Options, Alerts, Fundamentals, or News feeds, specify them in the corresponding fields.
5. Save the connection settings and close the window.

![inforiderpic.png](/images/uuid-2b69c7bd-f8c0-7301-e9e6-ee002b21ffa5.png)

## Connection

1. Wait for the login window to appear.
2. Enter your username and password (same as for [IPF](https://tools.dxfeed.com/ipf) service).
3. Click Log in to start.

:::note
Only connections from whitelisted IPs will be accepted.
:::

## How to check the list of available symbols

1. Go to [https://tools.dxfeed.com/ipf](https://tools.dxfeed.com/ipf).
2. Enter your credentials.
3. The page will list every symbol available for Inforider.

## How to connect with a proxy

1. Set up proxy settings in your system.
2. Set up proxy settings in vmoptions file:
  
  
  
  1. Windows: InfoRider.vmoptions
  2. MacOS: vmoptions.txt (a part of the InfoRider bundle located in the installation folder)
3. Add the following lines to this text file:
  
  
  
  ```
  -Dhttps.proxyHost=someproxy.net
  -Dhttps.proxyPort=3128
  ```

## How to launch Inforider with pre-setup widgets

1. Place the widget file in the `C:\Users\%username%\.InfoRider\<long hash string>\users\xxx\layout` folder (restart Inforider if the xxx folder isn't available).
2. Restart Inforider to load the new layout.

## How to add a new widget

1. Find the **Create new workspace** option in the created widgets list.
2. Open the available widgets list by pressing the **Menu** button in the upper left corner and then select the desired widget.
3. Add the desired symbol.
