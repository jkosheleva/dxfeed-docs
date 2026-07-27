---
title: "U.S. Formats"
paligoOriginId: "46505"
---

All data feeds for this region have empty country namespaces. Exchange namespaces may be present.

## Date modifiers

A date can be formatted in a number of ways, generally using the YYYYMMDD format. Find more on exceptions in the relevant sections.

In future contracts and options for future contracts, a letter represents the month:

| Month | Code |
| --- | --- |
| January | F |
| February | G |
| March | H |
| April | J |
| May | K |
| June | M |
| July | N |
| August | Q |
| September | U |
| October | V |
| November | X |
| December | Z |

## NYSE

We provide data as is, according to the [NYSE](https://www.nyse.com/publicdocs/nyse/data/NYSE_Symbology_Spec_v1.0c.pdf) symbology documentation (Line format).

## Nasdaq

We convert Nasdaq symbols to NYSE format according to [symbol convention](https://www.nasdaqtrader.com/trader.aspx?id=CQSsymbolconvention), regardless of where they were listed. For example, to subscribe to the `BRK.B` from Nasdaq, you need to use `BRK/B` according to [NYSE notation](https://www.nyse.com/publicdocs/nyse/data/NYSE_Symbology_Spec_v1.0d.pdf).

## Cboe

We convert data to NYSE symbology according to this [symbol convention](https://www.nasdaqtrader.com/trader.aspx?id=CQSsymbolconvention), regardless of where they were listed. If you have any preferred or classified shares, you need to subscribe using the [NYSE notation](https://www.nyse.com/publicdocs/nyse/data/NYSE_Symbology_Spec_v1.0d.pdf).

## OTCBB

We provide the OTCBB feed as is. Note that OTCBB symbols can have a [fifth identifier](https://otce.finra.org/otce/fifth-char-identifier).

## OTC Markets

We provide the OTC Markets feed as is. See the full description from OTC Markets [here](https://www.otcmarkets.com/files/How%20to%20Describe%20your%20Company%20in%20Press%20Releases.pdf).

## OPRA

We comply with the [OSI](https://www.ibkrguides.com/kb/article-972.htm) (Options Symbology Initiative).

According to it, we construct a string format in the following way: `. + OPTION ROOT + EXPIRATION DATE in YYMMDD format + OPTION TYPE (C or P) + STRIKE`

Examples:

- .TSLA220916P1800 — Tesla put option expiring on September 16, 2022, strike 1800
- .1GSAT240216C1.5 — special series call option for GSAT, strike 1.5

:::note
Unlike other option formats in dxFeed, OPRA symbols do not include a namespace.
:::

## CME

dxFeed constructs symbols for all CME securities the following way: `/ + symbol from CME Globex`

1. Future symbols include a two-digit maturity year. This helps avoid confusion between products expiring in the 2010s and in the 2020s.
2. To avoid overlapping product codes from different exchanges, namespaces are added to all symbols.

Example:

| Product Name | CME Symbol | dxFeed Symbol |
| --- | --- | --- |
| E-mini S&P 500 Futures, Mar-19 | ES;ESU1;100 | /ESH19:XCME |
| E-mini S&P 500 Futures (continuous product) | ES | /ES:XCME |
| S&P 500 Options | OS;SPU0 P3375;100 | ./SPU20P3375:XCME |

The list of namespace values match existing MIC values:

- For CME: XCME
- For NYMEX: XNYM
- For COMEX: XCEC
- For CBOT: XCBT
- For CFE: XCBF

The list of attributes applicable to CME contracts:

## ICE

We transform futures and options from this data provider to increase readability. For example, `ESX IMG0026!` to `/ESXG6` and `IYQ EDF1918_OMPA0000030002011918` to `./IYQ.DF819P30`. The original ICE symbols can be found in IPF in the [Field applicability](/data-model/reference-data/instrument-profile-format/#field-applicability) section for exchange data. You also can check the [ICE instrument naming documentation](https://www.theice.com/publicdocs/technology/Instrument_Naming_Convention.pdf).

The namespaces for this feed are:

- :IFEU
- :IFLL
- :IFLO
- :IFLX
- :IFUS

The ICE feed includes a single index: the US Dollar Index. We distribute it as `$DXY:IFUS`.

## Cboe Futures Exchange

dxFeed symbols for CFE are formed according to the following formula: `/product + month + year + namespace (:XCBF)`

| Product Name | CFE Symbol | dxFeed Symbol |
| --- | --- | --- |
| CBOE Volatility Index (VIX) Trade-at-Settlement Futures, May-20 | VXK20 | /VXTK20:XCBF |

You can find the list of Cboe Futures Products at the Cboe [website](https://www.cboe.com/tradable_products/).

Please refer to the [Formats](/data-model/symbology-guide/equities-futures-options-and-spreads-symbology/#equities-futures-options-and-spreads-symbology) chapter for listed symbology conventions by regions and exchanges.
