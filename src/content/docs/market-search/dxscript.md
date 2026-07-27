---
title: "dxScript"
paligoOriginId: "30598"
---

## Overview

dxScript is a programming language for time-series processing. Programs written in dxScript are:

- Small due to declarative syntax and fully automatic type-inference
- Comprehensive due to transparent series referencing

Programs in dxScrpt describe a calculation that needs to be performed on each iteration over the series. They are not supposed to process all the data in a series at once due to the infinite series' nature. In that sense, it's as if the program is a mapping from the input-series into the output-series.

### Calculation

Consider the following example. Let `N` be an infinite series of natural numbers: `1, 2, 3, ...` . The program or the calculation is a multiplication by `2`, i.e. `f(x) = x * 2` in pseudocode. The function mapping over the series `N` yields a result-series: `2, 4, 6, ...`. dxScript allows implicit series processing description. Therefore the same transformation written in dxScript looks almost identical.

```
out = N * 2
```

## Features

The language strives for reading and writing simplicity. Some supporting features include:

- Static type-safety: helpful feedback before running any code
- Type inference: no need to spell out types, only the code that matters
- Transparent time-series: any value can be a series with access to all the history
- Default parameter values: no need to repeat industry standards every time
- Built-in records: return more values and group data in-place
- First-class functions: parametrizing not only data but also behavior

## Use cases

There are many dxFeed services already bring dxScript into the users' hands:

- [dxFeed Radar](https://radar.dxfeed.com/)
- [Options Scanner](/market-search/options-scanner/#options-scanner) and Stock Scanner. Read more about the [Scanner API](/market-search/scanner-api/#scanner-api).
- [Alert Service](/market-search/alert-service/#alert-service)

Please use [Contact Sales](https://dxfeed.com/contact-sales/) form on the website to get your demo access.

## Scripts

Programs in dxScript language are written as scripts. Each script can define one or more functions. You can use the functions for direct data processing or within other functions.

[Read more](https://script.dxfeed.com/docs/scripts) about scripts.

## Expressions

Use expressions on the right-hand side of definitions and inside other expressions.

[Read more](https://script.dxfeed.com/docs/exprs) about basic operations and different expression types.

## Types

dxScript's type system includes the following categories:

- Primitive types
- Enum types
- Record types
- Function types

[Read more](https://script.dxfeed.com/docs/types) about each type.

## Prelude

Prelude is a set into modules that are pre-imported in every dxScript program.

[Learn more](https://script.dxfeed.com/docs/prelude)

## Function examples

dxScript function examples:

```
fun mean {
    in a = 0
    in b = 0
    out = (a + b) / 2
}
```

```
fun change {
    in x = 0
    out = x - x[1]
}
```

```
fun minmax {
    in a = 0
    in b = 0
    out mn = if (a < b) a else b
    out mx = if (b < a) a else b
}
```

An example of how dxScript can be used to implement a widely used Relative Strength Indicator (RSI):

```python
// Relative Strength Indicator
fun RSI {
  in x: number
  in n = 14
  in avg = &ema
  def change = x - x[1]
  def net = change.avg(n)
  def total = change.abs.avg(n)
  def ratio = if (total != 0) net / total else 0
  out = 50 * (ratio + 1)
}
```
