---
title: "How to Troubleshoot a Network Connection"
paligoOriginId: "31102"
---

## Overview

dxFeed API solutions such as Java, C, C#, Python, and FIX use the QD endpoint as a gateway for data feeds. This endpoint includes addresses and ports (e.g., demo.dxfeed.com:7300). dxFeed uses a whitelist to filter the incoming traffic to the endpoints.

Network issues generally have a root cause, including issues with:

- Whitelist configuration on our side
- Firewall configurations on your side (e.g., the company’s network policy)
- Network routing between your host and the endpoint

This guide will help you troubleshoot these and similar network connection issues.

## Troubleshooting

To troubleshoot your connection, follow these steps:

1. Check that you're connecting from the whitelisted IP (to see how to request an IP address addition, check this [How to Add IP Address to dxFeed Whitelist](/support/troubleshooting/how-to-add-ip-address-to-dxfeed-whitelist/#how-to-add-ip-address-to-dxfeed-whitelist) article)
2. Substitute the `demo.dxfeed.com` demo address with the provided endpoint's address (for example, it might look like: rt1.ec2.dxfeed.com)
3. Substitute the `7300 <port>` with the provided endpoint's port (for example, 7899)
4. Try to connect to `demo.dxfeed.com:7300` if you can't connect to your endpoint address using the tools (this demo endpoint isn't protected by whitelist and can be used to check for routing issues)

If nothing helps, [report the issue](https://help.dxfeed.com/en/support/how-to-report-an-issue.html) with the tools' output for both a public demo and your endpoint.

### Network connection tools

PowerShell, Netcat, and Telnet are tools for checking network connections on ports. If you can connect from your host to the endpoint using one of them, your application should have no issues with the connection.

#### PowerShell

PowerShell is a tool for Windows, macOS, and Linux. Windows PowerShell is installed on Windows by default.

1. Open PowerShell prompt
2. Enter the Test-NetConnection command
  
  
  
  ```
  Test-NetConnection -ComputerName <address> -Port <port>
  ```
3. If the connection passes, a `TcpTestSucceeded: True` message displays something similar to the following
  
  
  
  ```
  ComputerName     : demo.dxfeed.com 7300
  RemoteAddress    : 208.93.103.170
  RemotePort       : 7300
  InterfaceAlias   : Wi-Fi
  SourceAddress    : 192.168.17.182
  TcpTestSucceeded : True
  ```

#### Netcat

Netcat is a tool for macOS and Linux. The tool reads from and writes network connections using TCP or UDP. Netcat is installed on macOS and Linux by default. So, the steps below work for both:

1. Open Terminal
2. Enter the command
  
  
  
  ```
  nc -vz <address> <port>
  ```
3. If the connection passes
  
  
  
  - For macOS, a `CONNECTED` message displays something similar to the following:
    
    
    
    ```
    nc -vz demo.dxfeed.com 7300
    found 0 associations
    found 1 connections:
         1: flags=82<CONNECTED,PREFERRED>
    outif en4
    src 192.0.0.0 port 59064
    dst 192.0.2.0 port 7300
    rank info not available
    TCP aux info available
    ```
  
  
  
  - For Linux, a success message displays something similar to the following:
    
    
    
    ```
    Connection to demo.dxfeed.com 7300 port [tcp/https] succeeded!
    ```

#### Telnet

Telnet is a tool for Windows, macOS( High Sierra 10.13 and later), and Linux. Use Telnet for communication over the internet or a LAN using a virtual terminal connection. Telnet is installed on Linux and older Mac operating systems by default. But for Windows and macOS, you must install it yourself.

1. Install Telnet if it isn't already installed
2. Open the command prompt
  
  
  
  - For Windows:
    
    
    
    1. Select Start
    2. Choose Run or Search
    3. Enter: cmd.exe
  - For OS X: Select Utilities > Terminal
  - For Linux: Open Terminal
3. Enter the command
  
  
  
  ```
  telnet <address> <port>
  ```
4. If the connection passes, this will be the outputs
  
  
  
  - For Linux or Mac OS
  
  
  
  - For Windows: the successful connection message scrolls by quickly, and you get a blinking cursor on a blank screen. Press **Enter** to return to the command prompt
