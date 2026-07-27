---
title: "Token-Based Authorization"
paligoOriginId: "49401"
---

## Overview

This document is an addition to dxFeed Java/C#/JavaScript/Python APIs and describes a connection using token-based authorization.

## Scope

To provide your customers with dxFeed market data, you can connect to our market data feeds with token-based authentication. It ensures that each request to a server is accompanied by a signed token, which the server verifies for authenticity and only then responds to the request. Thus, your clients get access to allowed market data feeds for a specified period. We do not collect your clients' personal details.

Read more in the following sections:

- [Token](/data-services/real-time-and-delayed-services/token-based-authorization/token/#token)
- [Establishing connection](/data-services/real-time-and-delayed-services/token-based-authorization/establishing-connection/#establishing-connection)
- [Testing](/data-services/real-time-and-delayed-services/token-based-authorization/testing/#testing)
