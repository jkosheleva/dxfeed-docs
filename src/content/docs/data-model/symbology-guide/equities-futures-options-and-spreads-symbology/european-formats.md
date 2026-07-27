---
title: "European Formats"
paligoOriginId: "46741"
---

## Cboe Europe

dxFeed symbols for Cboe Europe consist of the product name and a corresponding namespace separated by a colon. Example:

| Product Name | Cboe Europe Symbol | dxFeed Symbol |
| --- | --- | --- |
| Anheuser-Busch InBev SA/NV | ABIb | ABIb:BATE |
| Daimler AG | DAId | DAId:CHIX |

Cboe supports the Uniform Symbology methodology. This symbology consists of an instrument code followed by a single lowercase letter designating the primary listing market center.

Learn more about a Uniform Symbology description and find links to more documentation on [Wikipedia](https://en.wikipedia.org/wiki/Uniform_Symbology).

Namespaces for Cboe Europe exchanges:

- For BXE: BATE
- For CXE: CHIX
- For TRF: BXTR
- For DXE: CEUX

## Eurex

dxFeed symbols for Eurex are formed according to the following formula: `/product + maturity date + :namespace XEUR`

Check the list of [Eurex products](https://www.eurex.com/ex-en/markets/productSearch).

### Example

| Product Name | Eurex Symbol | dxFeed Symbol |
| --- | --- | --- |
| EURO STOXX 50® Index Options<br/>OESX SI 20241220 CS EU P 2050 0 | OESX | OESX241220P2050:XEUR |
| Jenoptik<br/>JEN SI 20191115 PS AM C 28.00 0 | JEN | JEN191115C28:XEUR |

## Euronext Futures

The symbols are formed according to the following formula: `Symbol = /<product_code><maturity_date><market_segment_mic_code>/rootMYY:namespace`

- `<product_code>` can be found in the [Derivatives Quote vendor codes](https://live.euronext.com/en/products/equity-derivatives) Excel spreadsheet under “contract code”

In `<maturity_date>`:

- The month is represented by a letter. See [Date modifiers](/data-model/symbology-guide/equities-futures-options-and-spreads-symbology/us-formats/#date-modifiers).

- The year is represented by its last two numbers

- The day is optional: myy[dd]

- `<market_segment_mic_code>` is the MIC/OPOL code

## ICE Futures EU

The symbols are transformed in the same manner as the ICE symbols. The namespaces for ICE Futures EU are:

- :IFEU
- :IFLL
- :IFLO
- :IFLX
