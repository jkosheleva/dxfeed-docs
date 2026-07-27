---
title: "Access to dxFeed Market Indicators"
paligoOriginId: "21786"
---

## dxFeed market indicators: events and fields

Data for most of the indicators provided by dxFeed should be requested via **TimeAndSale** event. The main value of each indicator is an integer number located in the **Price** field. Example:

```
#=TimeAndSale EventSymbol Time Sequence ExchangeCode Price Size BidPrice AskPrice SaleConditions Flags
TimeAndSale $DECLRLC 20210209-000959+0300 33:27799 \0 275 0 NaN NaN \NULL 4
```

### Put/Call ratio indicators

This category of indicators are requested via the same **TimeAndSale** event. One difference is that volume of these indicators (sum of Put volume and Call volume) is also available in the **Size** field. Example:

```
#=TimeAndSale EventSymbol Time Sequence ExchangeCode Price Size BidPrice AskPrice SaleConditions Flags
TimeAndSale $CPC 20210208-235848+0300 636:3095 \0 0.6842 5788949 NaN NaN \NULL 4
```

### Top Gainers/Losers indicators

These categories of indicators should be requested via **Configuration **event. The main value is a list of tickers (ten by default) in the **Configuration **field.

```
#=Configuration EventSymbol Version Configuration
Configuration $TOP10LSP 1612818599 AMZN,ALGN,DXCM,MSCI,EQIX,IDXX,SBAC,KSU, GOOG,TDG
```

## Description of indicators groups

| Group | Description |
| --- | --- |
| Put/Call ratio | The ratio between the trading volume of Put and Call options with the same underlying instrument |
| Short-Term Trading Indicator (TRIN) | A prediction of future price movements in the market |
| TICK Indicator | The difference between the number of stocks which have an uptick and stocks with downtick |
| Top Gainers by Absolute Net Change | A list of symbols which have the highest absolute price change as compared with the close price of the previous day |
| Top Losers by Absolute Net Change | A list of symbols which have the lowest absolute price change as compared with the close price of the previous day |
| Top Gainers by Relative Net Change, % | A list of symbols which have the highest relative price net change ascompared with the close price of the previous day |
| Top Losers by Relative Net Change, % | A list of symbols which have the lowest relative price net change as compared with the close price of the previous day |
| Top Gainers by Volume | A list of symbols which have the highest trading volume today |
| Advancing Issues - Declining Issues Difference | Cumulative difference between the number of advancing and declining stocks within a given index |
| Advanced issues | How many assets are currently traded higher than their previous trading day close price |
| Declined Volume | The today’s trading volume of all stocks that currently trade lower than their previous trading day close price |
| New Highs | The number of stocks making new 52-week highs. This indicator provides an immediate score for internal strength or weakness in the market. There are more new highs when the indicator is positive |
| New Lows | The number of stocks making new 52-week lows |
| Declined issues | Advances and declines are the proportion of stocks that closed at a higher versus a lower price as compared to the previous trading day |
| Total volume | The today’s trading volume all instruments that were traded today |
| Unchanged issues | How many instruments currently trade without any change in comparison with their previous trading day close price |
| Advanced Volume | The today’s trading volume of all stocks that are currently traded higher than their previous trading day close price |
| Up Volume - Down Volume Difference | The difference between Advance and Decline volume |

### Composite indicators

Some of the indicators are composite. Composite indicators are those indicators that are based on stocks traded at all СTA/UTP participants. Compare to non-composite indicators: they are based on the trades from the OPOL exchange (e.g. NYSE-listed stocks traded at all CTA/UTP participants vs NYSE-listed stocks traded just at NYSE).

## List of all dxFeed stock market indicators

**Put/Call ratio group**

| SYMBOL | Description |
| --- | --- |
| $CPC | Put/Call ratio for Cboe Total |
| $CPCE | Put/Call ratio for Cboe Equity |
| $CPCI | Put/Call ratio for Cboe Index |
| $PCA | Put/Call ratio for options on NYSE MKT (AMEX) equities |
| $PCALL | Put/Call ratio for all OCC options |
| $PCAR | Put/Call ratio for options on ARCA equities |
| $PCI | Put/Call ratio for all DJI Average constituents options |
| $PCN | Put/Call ratio for options on NYSE equities |
| $PCN/Q | Put/Call ratio for options on NASDAQ equities |
| $PCND | Put/Call ratio for all NASDAQ 100 constituents options |
| $PCRL | Put/Call ratio for all Russell 2000 constituents options |
| $PCSP | Put/Call ratio for all SP500 constituents options |

** Short-Term Trading Indicator (TRIN) group**

| SYMBOL | Description |
| --- | --- |
| $TRIN | NYSE TRIN |
| $TRIN/Q | NASDAQ TRIN |
| $TRINA | NYSE MKT (AMEX) TRIN |
| $TRINAR | NYSE ARCA TRIN |
| $TRINI | DJIA TRIN |
| $TRINND | NASDAQ 100 TRIN |
| $TRINRL | RUSSELL 2000 TRIN |
| $TRINSP | SNP 500 TRIN |
| $TRINUS | ALLUSA TRIN |
| $TRINAC | NYSE MKT (AMEX) Composite TRIN |
| $TRINARC | NYSE ARCA Composite TRIN |
| $TRINC | NYSE Composite TRIN |
| $TRINC/Q | NASDAQ Composite TRIN |
| $TRINIC | DJIA Composite TRIN |
| $TRINNDC | NASDAQ 100 Composite TRIN |
| $TRINRLC | RUSSELL 2000 Composite TRIN |
| $TRINSPC | SNP 500 Composite TRIN |
| $TRINUSC | ALLUSA Composite TRIN |

** TICK Indicator group**

| SYMBOL | Description |
| --- | --- |
| $TICK | NYSE TICK |
| $TICK/Q | NASDAQ TICK |
| $TICKA | NYSE MKT (AMEX) TICK |
| $TICKAR | NYSE ARCA TICK |
| $TIKI | DJIA TICK |
| $TIKND | NASDAQ 100 TICK |
| $TIKRL | RUSSELL 2000 TICK |
| $TIKSP | SNP 500 TICK |
| $TIKUS | ALLUSA TICK |
| $TIKUSC | ALLUSA Composite TICK |
| $TICKAC | NYSE MKT (AMEX) Composite TICK |
| $TICKARC | NYSE ARCA Composite TICK |
| $TICKC | NYSE Composite TICK |
| $TICKC/Q | NASDAQ Composite TICK |
| $TIKIC | DJIA Composite TICK |
| $TIKNDC | NASDAQ 100 Composite TICK |
| $TIKRLC | RUSSELL 2000 Composite TICK |
| $TIKSPC | SNP 500 Composite TICK |

** Top Gainers by Absolute Net Change group**

| SYMBOL | Description |
| --- | --- |
| $TOP10G/Q | NASDAQ Top 10 gainers by absolute net change |
| $TOP10GI | DJI Top 10 gainers by absolute net change |
| $TOP10GN | NYSE Top 10 gainers by absolute net change |
| $TOP10GSP | SNP500 Top 10 gainers by absolute net change |
| $TOP10GUS | ALLUSA Top 10 gainers by absolute net change |

** Top Losers by Absolute Net Change group**

| SYMBOL | Description |
| --- | --- |
| $TOP10L/Q | NASDAQ Top 10 losers by absolute net change |
| $TOP10LI | DJI Top 10 losers by absolute net change |
| $TOP10LN | NYSE Top 10 losers by absolute net change |
| $TOP10LSP | SNP500 Top 10 losers by absolute net change |
| $TOP10LUS | ALLUSA Top 10 losers by absolute net change |

** Top Gainers by Relative Net Change group, %**

| SYMBOL | Description |
| --- | --- |
| $TOP10PG/Q | NASDAQ Top 10 gainers by relative net change |
| $TOP10PGI | DJI Top 10 gainers by relative net change |
| $TOP10PGN | NYSE Top 10 gainers by relative net change |
| $TOP10PGSP | SNP500 Top 10 gainers by relative net change |
| $TOP10PGUS | ALLUSA Top 10 gainers by relative net change |

** Top Losers by Relative Net Change group, %**

| SYMBOL | Description |
| --- | --- |
| $TOP10PL/Q | NASDAQ Top 10 losers by relative net change |
| $TOP10PLI | DJI Top 10 losers by relative net change |
| $TOP10PLN | NYSE Top 10 losers by relative net change |
| $TOP10PLSP | SNP500 Top 10 losers by relative net change |
| $TOP10PLUS | ALLUSA Top 10 losers by relative net change |

** Top Gainers by Volume**

| SYMBOL | Description |
| --- | --- |
| $TOP10V/Q | NASDAQ Top 10 gainers by volume |
| $TOP10VI | DJI Top 10 gainers by volume |
| $TOP10VN | NYSE Top 10 gainers by volume |
| $TOP10VSP | SNP500 Top 10 gainers by volume |
| $TOP10VUS | ALLUSA Top 10 gainers by volume |
| $TOP25VOTC | Top 25 gainers by volume from OTCBB/OTC Markets exchanges |

** Advancing Issues - Declining Issues Difference group**

| SYMBOL | Description |
| --- | --- |
| $ADAD | NYSE MKT (AMEX) Advancing Issues - Declining Issues Difference |
| $ADARD | NYSE ARCA Advancing Issues - Declining Issues Difference |
| $ADD | NYSE Advancing Issues - Declining Issues Difference |
| $ADID | DJIA Advancing Issues - Declining Issues Difference |
| $ADNDD | NASDAQ 100 Advancing Issues - Declining Issues Difference |
| $ADNDDC | NASDAQ 100 Composite Advancing Issues - Declining Issues Difference |
| $ADQD | NASDAQ Advancing Issues - Declining Issues Difference |
| $ADRLD | RUSSELL 2000 Advancing Issues - Declining Issues Difference |
| $ADSPD | SNP 500 Advancing Issues - Declining Issues Difference |
| $ADUSD | ALLUSA Advancing Issues - Declining Issues Difference |
| $ADADC | NYSE MKT (AMEX) Composite Advancing Issues - Declining Issues Difference |
| $ADARDC | NYSE ARCA Composite Advancing Issues - Declining Issues Difference |
| $ADDC | NYSE Composite Advancing Issues - Declining Issues Difference |
| $ADIDC | DJIA Composite Advancing Issues - Declining Issues Difference |
| $ADQDC | NASDAQ Composite Advancing Issues - Declining Issues Difference |
| $ADRLDC | RUSSELL 2000 Composite Advancing Issues - Declining Issues Difference |
| $ADSPDC | SNP 500 Composite Advancing Issues - Declining Issues Difference |
| $ADUSDC | ALLUSA Composite Advancing Issues - Declining Issues Difference |

** Advanced Issues**

| SYMBOL | Description |
| --- | --- |
| $ADVA | NYSE MKT (AMEX) Advanced issues |
| $ADVAR | NYSE ARCA Advanced issues |
| $ADVI | DJIA Advanced issues |
| $ADVN | NYSE Advanced issues |
| $ADVN/Q | NASDAQ Advanced issues |
| $ADVND | NASDAQ 100 Advanced issues |
| $ADVRL | RUSSELL 2000 Advanced issues |
| $ADVSP | SNP 500 Advanced issues |
| $ADVUS | ALLUSA Advanced issues |
| $ADVAC | NYSE MKT (AMEX) Composite Advanced issues |
| $ADVARC | NYSE ARCA Composite Advanced issues |
| $ADVIC | DJIA Composite Advanced issues |
| $ADVNC | NYSE Composite Advanced issues |
| $ADVNC/Q | NASDAQ Composite Advanced issues |
| $ADVNDC | NASDAQ 100 Composite Advanced issues |
| $ADVRLC | RUSSELL 2000 Composite Advanced issues |
| $ADVSPC | SNP 500 Composite Advanced issues |
| $ADVUSC | ALLUSA Composite Advanced issues |

** Declined Volume**

| SYMBOL | Description |
| --- | --- |
| $DVOA | NYSE MKT (AMEX) Declined volume |
| $DVOAR | NYSE ARCA Declined volume |
| $DVOL | NYSE Declined volume |
| $DVOL/Q | NASDAQ Declined volume |
| $DVOLI | DJIA Declined volume |
| $DVOLND | NASDAQ 100 Declined volume |
| $DVOLRL | RUSSELL 2000 Declined volume |
| $DVOLSP | SNP 500 Declined volume |
| $DVOLUS | ALLUSA Declined volume |
| $DVOAC | NYSE MKT (AMEX) Composite Declined volume |
| $DVOARC | NYSE ARCA Composite Declined volume |
| $DVOLC | NYSE Composite Declined volume |
| $DVOLC/Q | NASDAQ Composite Declined volume |
| $DVOLIC | DJIA Composite Declined volume |
| $DVOLNDC | NASDAQ 100 Composite Declined volume |
| $DVOLRLC | RUSSELL 2000 Composite Declined volume |
| $DVOLSPC | SNP 500 Composite Declined volume |
| $DVOLUSC | ALLUSA Composite Declined volume |

**New Highs**

| SYMBOL | Description |
| --- | --- |
| $AMHGH | NYSE MKT (AMEX) New Highs 1Y |
| $AMHI1M | NYSE MKT (AMEX) New Highs 1M |
| $AMHI1W | NYSE MKT (AMEX) New Highs 1W |
| $AMHI2W | NYSE MKT (AMEX) New Highs 2W |
| $AMHI3M | NYSE MKT (AMEX) New Highs 3M |
| $AMHI6M | NYSE MKT (AMEX) New Highs 6M |
| $AMHI9M | NYSE MKT (AMEX) New Highs 9M |
| $ARHGH | NYSE ARCA New Highs 1Y |
| $ARHI1M | NYSE ARCA New Highs 1M |
| $ARHI1W | NYSE ARCA New Highs 1W |
| $ARHI2W | NYSE ARCA New Highs 2W |
| $ARHI3M | NYSE ARCA New Highs 3M |
| $ARHI6M | NYSE ARCA New Highs 6M |
| $ARHI9M | NYSE ARCA New Highs 9M |
| $ETFHGH | ETF New Highs 1Y |
| $ETFHI1M | ETF New Highs 1M |
| $ETFHI1W | ETF New Highs 1W |
| $ETFHI2W | ETF New Highs 2W |
| $ETFHI3M | ETF New Highs 3M |
| $ETFHI6M | ETF New Highs 6M |
| $ETFHI9M | ETF New Highs 9M |
| $HGHI | DJIA New Highs 1Y |
| $HGHND | NASDAQ 100 New Highs 1Y |
| $HGHRL | RUSSELL 2000 New Highs 1Y |
| $HGHSP | SNP 500 New Highs 1Y |
| $HII1M | DJIA New Highs 1M |
| $HII1W | DJIA New Highs 1W |
| $HII2W | DJIA New Highs 2W |
| $HII3M | DJIA New Highs 3M |
| $HII6M | DJIA New Highs 6M |
| $HII9M | DJIA New Highs 9M |
| $HIND1M | NASDAQ 100 New Highs 1M |
| $HIND1W | NASDAQ 100 New Highs 1W |
| $HIND2W | NASDAQ 100 New Highs 2W |
| $HIND3M | NASDAQ 100 New Highs 3M |
| $HIND6M | NASDAQ 100 New Highs 6M |
| $HIND9M | NASDAQ 100 New Highs 9M |
| $HIRL1M | RUSSELL 2000 New Highs 1M |
| $HIRL1W | RUSSELL 2000 New Highs 1W |
| $HIRL2W | RUSSELL 2000 New Highs 2W |
| $HIRL3M | RUSSELL 2000 New Highs 3M |
| $HIRL6M | RUSSELL 2000 New Highs 6M |
| $HIRL9M | RUSSELL 2000 New Highs 9M |
| $HISP1M | SNP 500 New Highs 1M |
| $HISP1W | SNP 500 New Highs 1W |
| $HISP2W | SNP 500 New Highs 2W |
| $HISP3M | SNP 500 New Highs 3M |
| $HISP6M | SNP 500 New Highs 6M |
| $HISP9M | SNP 500 New Highs 9M |
| $NAHGH | NASDAQ New Highs 1Y |
| $NAHI1M | NASDAQ New Highs 1M |
| $NAHI1W | NASDAQ New Highs 1W |
| $NAHI2W | NASDAQ New Highs 2W |
| $NAHI3M | NASDAQ New Highs 3M |
| $NAHI6M | NASDAQ New Highs 6M |
| $NAHI9M | NASDAQ New Highs 9M |
| $NYHGH | NYSE New Highs 1Y |
| $NYHI1M | NYSE New Highs 1M |
| $NYHI1W | NYSE New Highs 1W |
| $NYHI2W | NYSE New Highs 2W |
| $NYHI3M | NYSE New Highs 3M |
| $NYHI6M | NYSE New Highs 6M |
| $NYHI9M | NYSE New Highs 9M |
| $USHGH | ALLUSA New Highs 1Y |
| $USHI1M | ALLUSA New Highs 1M |
| $USHI1W | ALLUSA New Highs 1W |
| $USHI2W | ALLUSA New Highs 2W |
| $USHI3M | ALLUSA New Highs 3M |
| $USHI6M | ALLUSA New Highs 6M |
| $USHI9M | ALLUSA New Highs 9M |

**New Lows**

| SYMBOL | Description |
| --- | --- |
| $AMLO1M | NYSE MKT (AMEX) New Lows 1M |
| $AMLO1W | NYSE MKT (AMEX) New Lows 1W |
| $AMLO2W | NYSE MKT (AMEX) New Lows 2W |
| $AMLO3M | NYSE MKT (AMEX) New Lows 3M |
| $AMLO6M | NYSE MKT (AMEX) New Lows 6M |
| $AMLO9M | NYSE MKT (AMEX) New Lows 9M |
| $AMLOW | NYSE MKT (AMEX) New Lows 1Y |
| $ARLO1M | NYSE ARCA New Lows 1M |
| $ARLO1W | NYSE ARCA New Lows 1W |
| $ARLO2W | NYSE ARCA New Lows 2W |
| $ARLO3M | NYSE ARCA New Lows 3M |
| $ARLO6M | NYSE ARCA New Lows 6M |
| $ARLO9M | NYSE ARCA New Lows 9M |
| $ARLOW | NYSE ARCA New Lows 1Y |
| $ETFLO1M | ETF New Lows 1M |
| $ETFLO1W | ETF New Lows 1W |
| $ETFLO2W | ETF New Lows 2W |
| $ETFLO3M | ETF New Lows 3M |
| $ETFLO6M | ETF New Lows 6M |
| $ETFLO9M | ETF New Lows 9M |
| $ETFLOW | ETF New Lows 1Y |
| $LOI1M | DJIA New Lows 1M |
| $LOI1W | DJIA New Lows 1W |
| $LOI2W | DJIA New Lows 2W |
| $LOI3M | DJIA New Lows 3M |
| $LOI6M | DJIA New Lows 6M |
| $LOI9M | DJIA New Lows 9M |
| $LOND1M | NASDAQ 100 New Lows 1M |
| $LOND1W | NASDAQ 100 New Lows 1W |
| $LOND2W | NASDAQ 100 New Lows 2W |
| $LOND3M | NASDAQ 100 New Lows 3M |
| $LOND6M | NASDAQ 100 New Lows 6M |
| $LOND9M | NASDAQ 100 New Lows 9M |
| $LORL1M | RUSSELL 2000 New Lows 1M |
| $LORL1W | RUSSELL 2000 New Lows 1W |
| $LORL2W | RUSSELL 2000 New Lows 2W |
| $LORL3M | RUSSELL 2000 New Lows 3M |
| $LORL6M | RUSSELL 2000 New Lows 6M |
| $LORL9M | RUSSELL 2000 New Lows 9M |
| $LOSP1M | SNP 500 New Lows 1M |
| $LOSP1W | SNP 500 New Lows 1W |
| $LOSP2W | SNP 500 New Lows 2W |
| $LOSP3M | SNP 500 New Lows 3M |
| $LOSP6M | SNP 500 New Lows 6M |
| $LOSP9M | SNP 500 New Lows 9M |
| $LOWI | DJIA New Lows 1Y |
| $LOWND | NASDAQ 100 New Lows 1Y |
| $LOWRL | RUSSELL 2000 New Lows 1Y |
| $LOWSP | SNP 500 New Lows 1Y |
| $NALO1M | NASDAQ New Lows 1M |
| $NALO1W | NASDAQ New Lows 1W |
| $NALO2W | NASDAQ New Lows 2W |
| $NALO3M | NASDAQ New Lows 3M |
| $NALO6M | NASDAQ New Lows 6M |
| $NALO9M | NASDAQ New Lows 9M |
| $NALOW | NASDAQ New Lows 1Y |
| $NYLO1M | NYSE New Lows 1M |
| $NYLO1W | NYSE New Lows 1W |
| $NYLO2W | NYSE New Lows 2W |
| $NYLO3M | NYSE New Lows 3M |
| $NYLO6M | NYSE New Lows 6M |
| $NYLO9M | NYSE New Lows 9M |
| $NYLOW | NYSE New Lows 1Y |
| $USLO1M | ALLUSA New Lows 1M |
| $USLO1W | ALLUSA New Lows 1W |
| $USLO2W | ALLUSA New Lows 2W |
| $USLO3M | ALLUSA New Lows 3M |
| $USLO6M | ALLUSA New Lows 6M |
| $USLO9M | ALLUSA New Lows 9M |
| $USLOW | ALLUSA New Lows 1Y |

**Declined issues**

| SYMBOL | Description |
| --- | --- |
| $DECA | NYSE MKT (AMEX) Declined issues |
| $DECAR | NYSE ARCA Declined issues |
| $DECLI | DJIA Declined issues |
| $DECLND | NASDAQ 100 Declined issues |
| $DECLRL | RUSSELL 2000 Declined issues |
| $DECLSP | SNP 500 Declined issues |
| $DECLUS | ALLUSA Declined issues |
| $DECN | NYSE Declined issues |
| $DECN/Q | NASDAQ Declined issues |

**Composite Declined issues**

| SYMBOL | Description |
| --- | --- |
| $DECAC | NYSE MKT (AMEX) Composite Declined issues |
| $DECARC | NYSE ARCA Composite Declined issues |
| $DECLIC | DJIA Composite Declined issues |
| $DECLNDC | NASDAQ 100 Composite Declined issues |
| $DECLRLC | RUSSELL 2000 Composite Declined issues |
| $DECLSPC | SNP 500 Composite Declined issues |
| $DECLUSC | ALLUSA Composite Declined issues |
| $DECNC | NYSE Composite Declined issues |
| $DECNC/Q | NASDAQ Composite Declined issues |

**Total volume**

| SYMBOL | Description |
| --- | --- |
| $TVOA | NYSE MKT (AMEX) Total volume |
| $TVOAR | NYSE ARCA Total volume |
| $TVOL | NYSE Total volume |
| $TVOL/Q | NASDAQ Total volume |
| $TVOLI | DJIA Total volume |
| $TVOLND | NASDAQ 100 Total volume |
| $TVOLRL | RUSSELL 2000 Total volume |
| $TVOLSP | SNP 500 Total volume |
| $TVOLUS | ALLUSA Total volume |

**Composite Total volume**

| SYMBOL | Description |
| --- | --- |
| $TVOAC | NYSE MKT (AMEX) Composite Total volume |
| $TVOARC | NYSE ARCA Composite Total volume |
| $TVOLC | NYSE Composite Total volume |
| $TVOLC/Q | NASDAQ Composite Total volume |
| $TVOLIC | DJIA Composite Total volume |
| $TVOLNDC | NASDAQ 100 Composite Total volume |
| $TVOLRLC | RUSSELL 2000 Composite Total volume |
| $TVOLSPC | SNP 500 Composite Total volume |
| $TVOLUSC | ALLUSA Composite Total volume |

**Unchanged issues**

| SYMBOL | Description |
| --- | --- |
| $UNCA | NYSE MKT (AMEX) Unchanged issues |
| $UNCAR | NYSE ARCA Unchanged issues |
| $UNCHI | DJIA Unchanged issues |
| $UNCHND | NASDAQ 100 Unchanged issues |
| $UNCHRL | RUSSELL 2000 Unchanged issues |
| $UNCHSP | SNP 500 Unchanged issues |
| $UNCHUS | ALLUSA Unchanged issues |
| $UNCN | NYSE Unchanged issues |
| $UNCN/Q | NASDAQ Unchanged issues |

**Composite Unchanged issues**

| SYMBOL | Description |
| --- | --- |
| $UNCAC | NYSE MKT (AMEX) Composite Unchanged issues |
| $UNCARC | NYSE ARCA Composite Unchanged issues |
| $UNCHIC | DJIA Composite Unchanged issues |
| $UNCHNDC | NASDAQ 100 Composite Unchanged issues |
| $UNCHRLC | RUSSELL 2000 Composite Unchanged issues |
| $UNCHSPC | SNP 500 Composite Unchanged issues |
| $UNCHUSC | ALLUSA Composite Unchanged issues |
| $UNCNC | NYSE Composite Unchanged issues |
| $UNCNC/Q | NASDAQ Composite Unchanged issues |

**Advanced Volume**

| SYMBOL | Description |
| --- | --- |
| $UVOA | NYSE MKT (AMEX) Advanced volume |
| $UVOAR | NYSE ARCA Advanced volume |
| $UVOL | NYSE Advanced volume |
| $UVOL/Q | NASDAQ Advanced volume |
| $UVOLI | DJIA Advanced volume |
| $UVOLND | NASDAQ 100 Advanced volume |
| $UVOLRL | RUSSELL 2000 Advanced volume |
| $UVOLSP | SNP 500 Advanced volume |
| $UVOLUS | ALLUSA Advanced volume |

**Advanced Volume**

| SYMBOL | Description |
| --- | --- |
| $UVOAC | NYSE MKT (AMEX) Composite Advanced volume |
| $UVOARC | NYSE ARCA Composite Advanced volume |
| $UVOLC | NYSE Composite Advanced volume |
| $UVOLC/Q | NASDAQ Composite Advanced volume |
| $UVOLIC | DJIA Composite Advanced volume |
| $UVOLNDC | NASDAQ 100 Composite Advanced volume |
| $UVOLRLC | RUSSELL 2000 Composite Advanced volume |
| $UVOLSPC | SNP 500 Composite Advanced volume |
| $UVOLUSC | ALLUSA Composite Advanced volume |

**Advanced Volume**

| SYMBOL | Description |
| --- | --- |
| $VOLAD | NYSE MKT (AMEX) Up Volume - Down Volume Difference |
| $VOLARD | NYSE ARCA Up Volume - Down Volume Difference |
| $VOLD | NYSE Up Volume - Down Volume Difference |
| $VOLID | DJIA Up Volume - Down Volume Difference |
| $VOLNDD | NASDAQ 100 Up Volume - Down Volume Difference |
| $VOLQD | NASDAQ Up Volume - Down Volume Difference |
| $VOLRLD | RUSSELL 2000 Up Volume - Down Volume Difference |
| $VOLSPD | SNP 500 Up Volume - Down Volume Difference |
| $VOLUSD | ALLUSA Up Volume - Down Volume Difference |
| $VOLUSDC | ALLUSA Composite Up Volume - Down Volume Difference |
| $VOLADC | NYSE MKT (AMEX) Composite Up Volume - Down Volume Difference |
| $VOLARDC | NYSE ARCA Composite Up Volume - Down Volume Difference |
| $VOLDC | NYSE Composite Up Volume - Down Volume Difference |
| $VOLIDC | DJIA Composite Up Volume - Down Volume Difference |
| $VOLNDDC | NASDAQ 100 Composite Up Volume - Down Volume Difference |
| $VOLQDC | NASDAQ Composite Up Volume - Down Volume Difference |
| $VOLRLDC | RUSSELL 2000 Composite Up Volume - Down Volume Difference |
| $VOLSPDC | SNP 500 Composite Up Volume - Down Volume Difference |
