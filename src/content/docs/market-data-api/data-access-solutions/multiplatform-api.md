---
title: "Multiplatform API"
paligoOriginId: "90483"
---

## Overview

We use [GraalVM Native Image](https://www.graalvm.org/latest/reference-manual/native-image/) technology and specially written code that wraps Java methods into native ones to get dynamically linked libraries for different platforms (Linux, macOS, and Windows) based on the [latest Java API package](https://dxfeed.jfrog.io/artifactory/maven-open/com/devexperts/qd/dxfeed-api/). Then, the resulting dynamic link library ([dxFeed Graal-native](https://github.com/dxFeed/dxfeed-graal-native-sdk)) is used through C [ABI](https://en.wikipedia.org/wiki/Application_binary_interface) (application binary interface), and we write programming interfaces that describe our business model (similar to Java API). As a result, we get a full-featured, similar performance as with Java API. Regardless of the language, writing the final application logic using API calls will be very similar (only the syntax will be amended, "best practices", specific language restrictions). All API are based on native SDK.

## .Net API structure example

![image-2024-3-7_13-39-21__1_.png](/images/uuid-d9d0bafc-0d14-52ea-555f-d37fba3b6adf.png)

## Multiplatform API list

| Language | Documentation | Requirements | Installation | Samples |
| --- | --- | --- | --- | --- |
| Java | [dxfeed-api](https://github.com/devexperts/QD/tree/master/dxfeed-api) | Java 8 | - | [java-samples](https://github.com/devexperts/QD/tree/master/dxfeed-samples/src/main/java/com/dxfeed/sample) |
| C++ | [dxfeed-graal-cxx-api](https://github.com/dxFeed/dxfeed-graal-cxx-api) | [cxx-requirements](https://github.com/dxFeed/dxfeed-graal-cxx-api?tab=readme-ov-file#requirements) | [cxx-installation](https://github.com/dxFeed/dxfeed-graal-cxx-api?tab=readme-ov-file#installation) | [cxx-samples](https://github.com/dxFeed/dxfeed-graal-cxx-api?tab=readme-ov-file#samples) |
| .Net | [dxfeed-graal-net-api](https://github.com/dxFeed/dxfeed-graal-net-api) | [net-requirements](https://github.com/dxFeed/dxfeed-graal-net-api?tab=readme-ov-file#requirements) | [net-installation](https://github.com/dxFeed/dxfeed-graal-net-api?tab=readme-ov-file#installation) | [net-samples](https://github.com/dxFeed/dxfeed-graal-net-api?tab=readme-ov-file#samples) |
| Swift | [dxfeed-graal-swift-api](https://github.com/dxFeed/dxfeed-graal-swift-api) | [swift-requirements](https://github.com/dxFeed/dxfeed-graal-swift-api?tab=readme-ov-file#requirements) | [swift-installation](https://github.com/dxFeed/dxfeed-graal-swift-api/blob/swift/Package.swift) | [swift-samples](https://github.com/dxFeed/dxfeed-graal-swift-api?tab=readme-ov-file#samples) |
| Go | [dxfeed-graal-go-api](https://github.com/dxFeed/dxfeed-graal-go-api) | [go-requirements](https://github.com/dxFeed/dxfeed-graal-go-api?tab=readme-ov-file#requirements) | [go-installation](https://github.com/dxFeed/dxfeed-graal-go-api?tab=readme-ov-file#installation) | [go-samples](https://github.com/dxFeed/dxfeed-graal-go-api?tab=readme-ov-file#samples) |
