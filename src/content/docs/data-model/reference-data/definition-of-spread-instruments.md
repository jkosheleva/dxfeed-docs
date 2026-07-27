---
title: "Definition of Spread Instruments"
paligoOriginId: "871"
---

## Overview

This document describes an open format to represent and exchange basic profile information about spreads. The format provides a common framework to represent necessary information and define the data model.

## Description

In dxFeed market data feeds, the spread is a composite virtual instrument consisting of two or more individual instruments. In financial markets, these instruments are not actual securities - they represent multi-leg orders. A multi-leg order is an order in which executions aim to be delivered simultaneously for each leg and in proportion to the leg ratio. Each spread may be of a different type: calendar, butterfly, condor, ratio spread, etc.

When a trade on a spread occurs, usually there are also trades on legs published.

For a detailed explanation of spreads in a CME feed please refer to the instruments documentation on the [CME website](https://www.cmegroup.com/confluence/display/EPICSANDBOX/Spreads+and+Combinations+Available+on+CME+Globex).

## List of fields

Every instrument is represented by a single profile record as a set of field values that define corresponding attributes of the instrument. Depending on the feed, some fields are not applicable, skipped, or empty.

This is the list of all available fields for spreads from CME, ICE and Eurex data feeds:

```
#SPREAD::=TYPE,SYMBOL,DESCRIPTION,COUNTRY,OPOL,EXCHANGE_DATA,EXCHANGES,CURRENCY,CFI,ISIN,MULTIPLIER,PRODUCT,MMY,EXPIRATION,LAST_TRADE,PRICE_INCREMENTS,TRADING_HOURS,CME_SPREAD,CORRECT_DF,EUREX_UNDERLYING,LTD
```

| **Type** | **Description** |
| --- | --- |
| TYPE | Type of instrument |
| SYMBOL | Formula that defines the spread instrument. See [SYMBOL field](#symbol-field). |
| DESCRIPTION | Description of the instrument provided by the exchange |
| COUNTRY | Country of origin (incorporation) of corresponding company or parent entity |
| OPOL | Official Place Of Listing, the organization that have listed this instrument |
| EXCHANGE_DATA | Exchange-specific data required to properly identify instrument when communicating with exchange; uses exchange-specific format |
| EXCHANGES | List of exchanges where instrument is quoted or traded. For spreads, it is usually the same as OPOL |
| CURRENCY | Currency of quotation, pricing and trading |
| CFI | Classification of Financial Instruments code |
| ISIN | International Securities Identifying Number |
| MULTIPLIER | Market value multiplier |
| PRODUCT | An instrument which represents the series of futures contracts with the same parameters (underlying, settlement style, expiration period). If several products are available for a spread, they are specified, separated by semicolons |
| MMY | Maturity month-year |
| EXPIRATION | Date of expiration |
| LAST_TRADE | Date of last trading day |
| PRICE_INCREMENTS | Minimum allowed price increments with corresponding price ranges |
| TRADING_HOURS | Trading schedule |
| CME_SPREAD | Formula of the instrument, represented in internal exchange identifiers (should be ignored) |
| CORRECT_DF | Custom CME field, please ignore. Usually empty |
| EUREX_UNDERLYING | Custom Eurex field |
| LTD | Last trade date. Usually empty |

## SYMBOL field

For spreads, the `SYMBOL` field shows the formula that defines an instrument. It specifies the combination, side, and ratio of each leg:

1. Subtraction (`-`) means sell this leg.
2. Addition (`+`) means buy this leg.
3. Multiplication (`*`) defines the ratio relative to other legs.

Each spread leg can optionally include a price after the symbol using the `@` sign: `<Symbol>[@<Price>]`.

### Examples

A full spread example:

```text
SPREAD,=./SBV25C20:IFUS-0.52*/SBV25:IFUS@18.6-./SBV25P16:IFUS
```

`=/SO3H20:IFLL-/SO3Z20:IFLL` means:

- `/SO3H20:IFLL` (side = buy, ratio = 1)
- `/SO3Z20:IFLL` (side = sell, ratio = 1)

`=./EW3N19C3000:XCME+./EW3Q19P2840:XCME-./EW3Q19C3030:XCME-3./EW3N19P2865:XCME` means:

- `./EW3N19C3000:XCME` (side = buy, ratio = 1)
- `./EW3Q19P2840:XCME` (side = buy, ratio = 1)
- `./EW3Q19C3030:XCME` (side = sell, ratio = 1)
- `./EW3N19P2865:XCME` (side = sell, ratio = 3)

### Canonical ordering

Spread legs are always sorted canonically to ensure consistency across feeds:

1. By coefficient in descending order: **3×A + 2×B + C - D - 2×E - 3×F**
2. For equal positive coefficients, lexicographically from A to Z: **A + B + C + D + E + F - Z**
3. For equal negative coefficients, in reverse lexicographic order from Z to A: **Z - F - E - D - C - B - A**

### CME

For CME spreads, native symbology reflects canonical ordering. The canonical symbol appears in the `CME_SPREAD` field in IPF. The spread structure follows Repeating Group 5 in the [CME MDP 3.0 Security Definition](https://www.cmegroup.com/confluence/display/EPICSANDBOX/MDP+3.0+Security+Definition).

:::note
CME symbols show trade direction by order, for example `MBTJ5-MBTK5`, without `+` or `-`. dxFeed symbols use explicit `+` and `-` signs to indicate side.
:::

Example:

```text
#SPREAD::=TYPE,SYMBOL,EXCHANGE_DATA,CME_SPREAD
SPREAD,=/MBTK25:XCME-/MBTJ25:XCME,BF;MBTJ5-MBTK5;1,-1*42007178+1*42035829
##COMPLETE
```

This example buys `MBTK25` and sells `MBTJ25`. `MBTK25` goes first because it has the higher coefficient (`+1`).

### ICE

For ICE spreads, native symbology retains the exchange order in simple spreads, for example `=A-B`.
