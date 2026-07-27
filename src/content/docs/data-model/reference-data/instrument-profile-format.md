---
title: "Instrument Profile Format"
paligoOriginId: "45427"
---

## Overview

The Instrument Profile Format (IPF) is an open format to represent and exchange basic profile information about market instruments or set of field values that define corresponding attributes of the instrument. It provides a standardized framework covering all types of tradable and indicative instruments, including stocks, funds, bonds, indices, futures, and options.

This document describes the IPF data format, detailing its structure, data model, and file formats for data distribution and exchange. Additionally, a dedicated [IPF webservice](/data-model/reference-data/ipf-webservice/#ipf-webservice) is available for viewing, processing, and storing instrument data in this format.

## Data model

Every market instrument is represented by a single profile record as a set of field values that define corresponding attributes of the instrument. The set of defined fields and interpretations of their values form the abstraction layer of the format. Each field is characterized by its name, meaning, applicability to specific instrument types, interpretation rules, and data format. For the purpose of readability and interoperability, all values are represented in textual form even if their primary use is non-textual (e.g. numbers and dates). All values must use a Unicode standard for representation of their textual form.

## Data availability

Except for a few identification fields, many fields are either optional or simply not applicable for a given instrument type. Inapplicable fields shall be ignored if present and they shall be left empty when exported. Also, in many cases, the value of certain fields is not known by the data source. Such fields are considered to have an empty value and they are usually represented by a text of length 0. Empty or missing fields shall be interpreted as undefined or unknown.

## Field types

- Text – value is textual information, such as a company name or exchange code.
- Formatted text – complex fields use proprietary formats, such as a list of exchanges.
- Number – value is a number, such as a contract size or strike price; value can be either integer or floating point; floating point values must use the `.` character as a decimal point; a numeric value of `0` is often considered an empty value.
- Date – value is a date, such as the last trading day or expiration date; value must be formatted using `YYYY-MM-DD`; date 1970-01-01 is often considered an empty value.
- Timestamp – value in the ISO 8601 format; contains date, time, optional milliseconds, and optional timezone. For example, `2020-10-31T16:15:00.000-05:00` where `-05:00` is an offset from UTC.
- Boolean – logical parameter with possible values being `true` or `false`.

## Format extensibility

The format can be extended by the addition of new fields and new literals (enumerated values) for existing fields. All parties working with this format shall be prepared to deal with such extensions. Standard method is to ignore unknown fields as if they were not there. If some known and important field uses an unknown literal then the application can either ignore the profile altogether, replace the unknown literal with some **default** one or show an error to an operator and ask him to resolve the situation.

## Symbology

This format assumes that instrument profiles use symbology as defined on corresponding exchanges and national markets. Extensions and augmentations of **native** symbology are formally beyond the scope of this format. However, there are several common notations that are currently in use:

- Future symbols use the prefix `/` for convenience, e.g. `/ESZ22:XCME`
- Option symbols use the prefix `.` for convenience, e.g. `.GOOG220527C1500`
- Future Option symbols use the prefix `./`, e.g. `./ESM22P4300:XCME`
- Spread symbols use the prefix `=`, e.g. `=/AFRJ19:IFEU-/AFRM19:IFEU`

Learn more about [Symbology Guide](/data-model/symbology-guide/#symbology-guide)

## List of fields

In order to simplify interoperability, the syntax of field names is restricted: names may use only capital Latin letters, decimal digits and underscore character, and they shall start with a Latin letter.

| Field name | Type | Description | Example |
| --- | --- | --- | --- |
| TYPE | Text | Type of instrument. It takes precedence in conflict cases with other fields; mandatory field; may not be empty | `STOCK`, `FUTURE`, `OPTION` |
| SYMBOL | Text | Identifier of instrument; preferable to an international one in the Latin alphabet; mandatory field; may not be empty | `GOOG`, `/YGM9`, `.ZYEAD` |
| TEST_INSTRUMENT | Boolean | Indicates if a symbol is a real tradable asset or a test symbol; if 'true', the symbol is a test symbol |  |
| DESCRIPTION | Text | Description of instrument; preferable to an international one in the Latin alphabet | `Google Inc., Mini Gold Futures,Jun-2009,ETH` |
| LOCAL_SYMBOL | Text | Identifier of instrument in _national_ language; shall be empty if it is the same as the **SYMBOL** field |  |
| LOCAL_DESCRIPTION | Text | Description of instrument in _national_ language; shall be empty if it is the same as the **DESCRIPTION** field |  |
| COUNTRY | Text | Country of origin (incorporation) of corresponding company or parent entity; shall use a two-letter country code from ISO 3166-1 standard; see [ISO 3166-1 on Wikipedia](http://en.wikipedia.org/wiki/ISO_3166-1) | `US`, `DE` |
| OPOL | Text | Official Place Of Listing, the organization that has listed this instrument; instruments with multiple listings shall use separate profiles for each listing; shall use Market Identifier Code (MIC) from ISO 10383 standard (see [ISO 10383 on Wikipedia](http://en.wikipedia.org/wiki/ISO_10383) or [MIC homepage](http://www.iso15022.org/MIC/homepageMIC.htm)) or custom dxFeed values (see [Custom OPOL values](/data-model/reference-data/exchange-codes/#other-opol-values) chapter) | `XNAS` |
| CURRENCY | Text | Currency of quotation, pricing and trading. For Forex data, mainly shall use a three-letter currency code from ISO 4217 standard; see[ ISO 4217 on Wikipedia](https://en.wikipedia.org/wiki/ISO_4217); exclusions: `MUKO`, `M5P`, etc. For cryptocurrencies, shall use the format transferred by exchange | `USD`, `EUR` |
| BASE_CURRENCY | Text | Base currency of currency pair. For Forex data, shall use a three-letter currency code with some exclusions (see **CURRENCY** field). For cryptocurrencies, shall use the format transferred by exchange |  |
| EXCHANGES | Formatted text | List of exchanges where instrument is quoted or traded; shall use the following format:<br/><VALUE> ::= <empty> | <LIST><br/><LIST> ::= <MIC> | <MIC> <semicolon> <LIST><br/>The list shall be sorted by MIC | `ARCX;CBSX;XNAS;XNYS` |
| CFI | Text | Classification of Financial Instruments code; mandatory field for **OPTION** instruments as it is the only way to distinguish Call/Put type, American/European exercise, Cash/Physical delivery; shall use a six-letter CFI code from ISO 10962 standard; allowed to use 'X' extensively and to omit trailing letters (assumed to be 'X'); see [ISO 10962 on Wikipedia](http://en.wikipedia.org/wiki/ISO_10962) | `ESNTPB`, `ESXXXX`, `ES` , `OPASPS` |
| ISIN | Text | International Securities Identifying Number; shall use a twelve-letter code from ISO 6166 standard; see [ISO 6166 on Wikipedia](http://en.wikipedia.org/wiki/ISO_6166) or [ISIN on Wikipedia](http://en.wikipedia.org/wiki/International_Securities_Identifying_Number) | `DE0007100000`, `US38259P5089` |
| SEDOL | Text | Stock Exchange Daily Official List; shall use a seven-letter code assigned by the London Stock Exchange; see [SEDOL on Wikipedia](http://en.wikipedia.org/wiki/SEDOL) or [SEDOL on LSE](http://www.londonstockexchange.com/en-gb/products/informationproducts/sedol/); | `2310967`, `5766857` |
| CUSIP | Text | Committee on Uniform Security Identification Procedures code; shall use a nine-letter code assigned by CUSIP Services Bureau; see [CUSIP on Wikipedia](http://en.wikipedia.org/wiki/CUSIP) | `38259P508` |
| ICB | Number | Industry Classification Benchmark; shall use a four-digit number from ICB catalog; see [ICB on Wikipedia](http://en.wikipedia.org/wiki/Industry_Classification_Benchmark) or [ICB homepage](http://www.icbenchmark.com/) | `9535` |
| SIC | Number | Standard Industrial Classification; shall use a four-digit number from SIC catalog; see [SIC on Wikipedia](http://en.wikipedia.org/wiki/Standard_Industrial_Classification) or [SIC structure](http://www.osha.gov/pls/imis/sic_manual.html). Note that IPF does not display leading zeros in SIC numbers | `52` (stands for `0052`), `7371` |
| UNDERLYING | Text | Primary underlying symbol for options | `C`, `/YGM9` |
| SPC | Number | Shares per contract for options | `1`, `100` |
| ADDITIONAL_UNDERLYINGS | Formatted text | Additional underlyings for options, including additional cash; shall use the following format:<br/><VALUE> ::= <empty> | <LIST><br/><LIST> ::= <AU> | <AU> <semicolon> <space> <LIST><br/><AU> ::= <UNDERLYING> <space> <SPC><br/>The list shall be sorted by UNDERLYING<br/>Each additional underlying has associated parameter called SPC (shares per contract) that specifies how many shares of additional underlying are delivered during settlement of the option. In cases when option delivers additional cash the SPC specifies an amount of how much cash is delivered<br/>**Valid values**<br/>If underlying == `$US`, its value should be processed as additional cash | Example list: `SE 50`, `FIS 53; US$ 45.46` |
| MMY | Text | Maturity month-year as provided for corresponding FIX tag (200); can use several different formats depending on the data source: | `202707`, `20250620`, `202506w3` |
| EXPIRATION | Date | Date of expiration | `2009-01-17` |
| LAST_TRADE | Date | Date of last trading day | `2009-01-16` |
| LAST_TRADE_TIME | Timestamp | Time when the instrument stops trading on its last trading day. This value represents the standard scheduled close time. It is not adjusted for holidays or shortened trading days. The value may be calculated on the dxFeed side or provided by the exchange | `2025-06-20T12:00:00.000+02:00` |
| FINAL_PRICE_FIXING_TIME | Timestamp | Date and time when the final settlement price is being fixed at the expiration of the instrument |  |
| STRIKE | Number | Strike price for options | `80`, `22.5` |
| OPTION_TYPE | Text | Type of option; shall use one of the following values:<br/>STAN = Standard Options<br/>LEAP = Long-term Equity AnticiPation Securities<br/>SDO = Special Dated Options<br/>BINY = Binary Options<br/>FLEX = FLexible EXchange Options<br/>VSO = Variable Start Options<br/>RNGE = Range |  |
| EXCHANGE_DATA | Text | Exchange-specific data required to properly identify an instrument when communicating with an exchange; uses exchange-specific format |  |
| PRICE_INCREMENTS | Formatted text | Minimum allowed price increments with corresponding price ranges; shall use the following format:<br/>Where <INCREMENT> is a price increment in the given price range and <UPPER_LIMIT> is the upper bound of that range. All ranges are listed in the ascending order of upper limits and the last range is considered to extend toward infinity and is therefore specified without upper limit. All increments and limits are finite positive numbers. The case with empty text is a special stub used for **EMPTY** value, it uses sole increment with value **0**.<br/>**Valid values**<br/>All price ranges shall be mutually exclusive and they shall cover entire space from **0** to **infinity**. Therefore all ranges can be represented as a sequence of numbers where increments are interleaved with range limits, with extreme limits (0 and infinity) omitted for short.<br/>**Value display rules** | Increment for all prices is 0.001: `0.001`<br/>If price **<= 3**, increment is 0.01, otherwise increment is 0.05. Example: `0.01 3; 0.05`<br/>If price **<= 3000**, increment is `1`<br/>If **3000 < price <= 5000**, increment is 5 [...]<br/>If price **> 50000000**, increment is 100000. Example: `1 3000; 5 5000; 10 30000; 50 50000; 100 300000; 500 500000; 1000 3000000; 5000 5000000; 10000 30000000; 50000 50000000; 100000` |
| TRADING_HOURS | Formatted text | Trading schedule | `NewYorkUS(rt=0300;0=p04000930r09301600a16002000)` |
| MULTIPLIER | Number | Market value multiplier; the weight that is multiplied by the contracted price when calculating the contracted value. E.g., for HSI and H-Shares Index futures, the contract multiplier is $50 per index point, whereas in a mini-HSI futures contract, it is $10 per index point. For HKEx stock futures contracts, this is one board lot of the underlying stock | `100`, `33.2` |
| INTEREST_RATE | Number | The periodic interest payment that the issuer makes during the life of the bond, denominated in % | `2.68` |
| FIRST_INTEREST_DATE | Date | For fixed coupon rate bonds: the periodic interest payment that the issuer makes during the life of the bond | `2009-01-17` |
| ISSUE_DATE | Date | The date on which an instrument is issued and begins to accrue interest | `2009-01-27` |
| ANNOUNCEMENT_DATE | Date | Date of announcement | `2010-01-16` |
| AUCTION_DATE | Date | Date of auction | `2009-01-16` |
| AUTOCOMPLETE_WEIGHT | Number | Determines the ordering of result profiles in full-text search/symbol-lookup mode (mode=ui), with higher weights leading to higher rankings and appearing first in the results. The instruments are usually weighted depending on their traded volume | `1`, `100` |
| PRODUCT | Text | An instrument which represents the series of futures contracts with the same parameters (underlying, settlement style, expiration period) | `/YG` |
| EXPIRATION_STYLE | Text | Expiration cycle style | Possible values are `Daily`, `Weeklys`, `EOM`, `Quarterlys`, `SemiAnnuallys`, `Yearlys` |
| SETTLEMENT_STYLE | Text | Settlement price determination style | `Open`, `Close`, `Intraday` |
| PRICE_TYPE | Formatted text |  | Possible values are `PerUnit`, `Yield`, `YieldSpread`, `MonetaryAmount` |
| ISSUED_AS_BENCHMARK | Number | <number><period: Y or M> | `30Y`, `20Y`, `12M`, `1M` |
| BENCHMARK_STATUS | Formatted text | **ISSUED_AS_BENCHMARK** and **BENCHMARK_STATUS** fields shall be both filled or both empty | Possible values are `WhenIssued`, `Benchmark`, `OffTheRun` |

### Custom fields

#### CME

The list of custom fields for CME:

| Attribute name | Definition from specification |
| --- | --- |
| FDD | First delivery date. The first date that users will complete delivery |
| LDD | Last delivery date. The last date that users will complete delivery |
| FTD | Clearing first trade date (actual contract trade date) |
| LTD | Last date instrument is tradable across all venues and trade types |
| SD | Final settlement date for futures |
| FND | First notice date. The first date that users will get notified that they have been assigned a delivery |

## List of types

- **BOND** – debt instruments, excluding money market funds; see [Bond on Wikipedia](http://en.wikipedia.org/wiki/Bond_%28finance%29)
- **CATEGORY:FRED** — economic data time series from Federal Reserve Economic Data
- **CERTIFICATE** — investment certificate that allows investors to participate in the price movements of specific securities. Certificates are bonds from the legal prospective, but function similarly to funds, with investor lending money to the issuer and repayment depending on the underlying security's price at the end of the term. [Learn more](https://www.boerse-frankfurt.de/en/know-how/glossary/certificate)
- **CFD** — contract for differences, an arrangement where the differences in the settlement between the open and closing trade prices are cash-settled; see [CFD on Wikipedia](https://en.wikipedia.org/wiki/Contract_for_difference)
- **ETF** — exchange-traded fund; see [ETF on Wikipedia](http://en.wikipedia.org/wiki/Exchange-traded_fund)
- **FOREX** — foreign exchange market or cryptocurrency; see [Forex on Wikipedia](http://en.wikipedia.org/wiki/Forex) and [Cryptocurrency on Wikipedia](https://en.wikipedia.org/wiki/Cryptocurrency)
- **FUTURE** — futures contract, derivative instrument; see [Futures on Wikipedia](http://en.wikipedia.org/wiki/Futures_contract)
- **INDEX** — non-tradable market performance indicators
- **MONEY_MARKET_FUND** — funds that invest in short-term debt instruments; see [Money market fund on Wikipedia](http://en.wikipedia.org/wiki/Money_market_fund)
- **MUTUAL_FUND** — investment funds, excluding ETFs and money market funds; see [Mutual fund on Wikipedia](http://en.wikipedia.org/wiki/Mutual_fund)
- **OPTION** — option contract, derivative instrument; see [Option on Wikipedia](http://en.wikipedia.org/wiki/Option_%28finance%29)
- **OTHER** — miscellaneous instruments that do not fall under any type in this list
- **PRODUCT** — grouping instrument for futures, aka futures product
- **REMOVED** — special instrument type indicating instrument removal (see below)
- **STOCK** — tradable equities, excluding ETFs and mutual funds; see [Stock on Wikipedia](http://en.wikipedia.org/wiki/Stock)
- **SPREAD** — composite virtual instrument consisting of two or several individual instruments that represent multileg order. Learn more about [spread instrument format](/data-model/reference-data/definition-of-spread-instruments/#definition-of-spread-instruments)
- **WARRANT** — derivative that gives the right, but not the obligation, to buy or sell a security at a certain price before expiration

### Event-based instrument types

- **EBMarket** — tradable instrument representing a binary outcome within an event. EBMarket instruments publish real-time market data. Examples include yes/no markets such as _“Will candidate X win?”_. EBMarket instruments may contain prices, volume, and settlement-related attributes.
- **EBEvent** — reference instrument representing a real-world event such as an sports event, political event, or economic indicator. Examples include _“US Presidential Election 2028” or “US CPI Release for March 2026”_. An EBEvent groups one or more EBMarket instruments representing different outcomes of the same event. Reference data only; does not publish real-time market data.
- **EBSeries** — reference instrument representing a general definition of recurring events that share the same structure and rules. Examples include_ “Monthly Jobs Report”_ or _“Weekly Initial Jobless Claims”_. Defines metadata, settlement sources, and structure applied to each event instance. Reference data only.

## Field applicability

|  | **FOREX** | **BOND** | CERTIFICATE | **INDEX** | STOCK | ETF | MUTUAL_FUND | MONEY_MARKET_FUND | PRODUCT | FUTURE | OPTION | SPREAD | OTHER | WARRANT | CFD | CATEGORY:FRED |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TYPE | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M |
| SYMBOL | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M |
| DESCRIPTION | + | + | + | + | + | + | + | + | + | + | + | + | + | + | + | + |
| LOCAL_SYMBOL | + | + | + | + | + | + | + | + | + | + | + | + | + | + | + | + |
| LOCAL_DESCRIPTION | + | + | + | + | + | + | + | + | + | + | + | + | + | + | + | + |
| COUNTRY | + | + | + | + | + | + | + | + | + | + | + | + | + | + | + | + |
| OPOL | + | + | + | + | + | + | + | + | + | + | + | + | + | + | + | + |
| EXCHANGE_DATA | + | + | + | + | + | + | + | + | + | + | + | + | + | + | + | + |
| EXCHANGES | + | + | + | + | + | + | + | + | + | + | + | + | + | + | + | + |
| CURRENCY | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M |
| BASE_CURRENCY | M | - | - | - | - | - | -- | - | - | - | - | - | + | - | - | - |
| CFI | + | + | + | + | + | + | + | + | + | + | M | + | + | + | - | - |
| ISIN* | + | + | + | + | + | + | + | + | - | + | + | + | + | - | - | - |
| SEDOL* | - | + | + | - | + | + | + | + | - | - | - | - | + | - | - | - |
| CUSIP* | - | + | + | - | + | + | + | + | - | - | - | - | + | - | - | - |
| ICB | - | + | + | + | + | + | + | + | + | + | + | - | + | + | - | - |
| SIC | - | + | + | + | + | + | + | + | + | + | + | - | + | + | - | - |
| MULTIPLIER | + | - | + | - | - | - | - | - | - | M | M | M | + | + | + | - |
| PRODUCT | - | - | - | - | - | - | - | - | - | M | + | + | + | - | - | - |
| UNDERLYING | - | - | + | - | - | - | - | - | - | - | M | - | + | M | - | - |
| SPC | - | - | + | - | - | - | - | - | - | - | M | - | + | + | - | - |
| ADDITIONAL_UNDERLYINGS | - | - | - | - | - | - | - | - | - | - | + | - | + | - | - | - |
| MMY | - | + | + | - | - | - | - | - | - | + | + | + | + | + | - | - |
| EXPIRATION | - | + | + | - | - | - | - | - | - | M | M | + | + | + | - | - |
| LAST_TRADE | - | + | + | - | - | - | - | - | - | M | M | + | + | + | - | + |
| LAST_TRADE_TIME | - | + | + | - | - | - | - | - | - | + | + | + | + | + | - | - |
| FINAL_PRICE_FIXING_TIME | - | - | - | - | - | - | - | - | - | + | + | + | + | - | - | - |
| STRIKE | - | - | - | - | - | - | - | - | - | - | M | - | + | + | - | - |
| OPTION_TYPE | - | - | - | - | - | - | - | - | - | - | + | - | + | - | - | - |
| EXPIRATION_STYLE | - | - | - | - | - | - | - | - | - | - | + | - | + | - | - | - |
| SETTLEMENT_STYLE | - | - | + | - | - | - | - | - | - | - | + | - | + | + | - | - |
| PRICE_INCREMENTS | + | + | + | + | + | + | + | + | + | + | + | + | + | + | + | - |
| TRADING_HOURS | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M |
| FIRST_INTEREST_DATE | - | + | + | - | - | - | - | - | - | - | - | - | + | - | - | - |
| INTEREST_RATE | - | + | + | - | - | - | - | - | - | - | - | - | + | - | - | - |
| ISSUE_DATE | - | + | + | - | - | - | - | - | - | - | + | - | + | - | - | - |
| ANNOUNCEMENT_DATE | - | + | - | - | - | - | - | - | - | - | - | - | + | - | - | - |
| AUCTION_DATE | - | + | - | - | - | - | - | - | - | - | - | - | + | - | - | - |
| PRICE_TYPE | - | M | - | - | - | - | - | - | - | - | - | - | + | - | - | - |
| ISSUED_AS_BENCHMARK | - | + | - | - | - | - | - | - | - | - | - | - | + | - | - | - |
| BENCHMARK_STATUS | - | + | - | - | - | - | - | - | - | - | - | - | + | - | - | - |

:::note
Event-based instrument types (EBMarket, EBEvent, EBSeries) use a limited subset of IPF fields. Many traditional security identification and derivative-specific fields (such as ISIN, CFI, UNDERLYING) are not applicable.
:::

Check values for the table above:

| Value | Description |
| --- | --- |
| M | Mandatory field |
| + | Optional field is specified if available |
| - | Inapplicable field is empty |
| * | For some markets, ISIN, CUSIP and SEDOL fields are available only with the corresponding license |

## Snapshot and live updates model

Instrument profiles are usually received as a "snapshot" of all available instruments. Yet, profiles may change, new market instruments may appear at any time (even during trading hours), and existing ones may be removed (after their expiration or maturity). So another streaming ([live updates](/data-model/reference-data/ipf-webservice/ipf-live-updates/#ipf-live-updates)) mode can be used. You can receive an initial snapshot followed by a stream of live updates of changed instrument profiles and additional signals.

To work with the live updates model, do the following:

- Maintain the set of instrument profiles identified by the unique **SYMBOL**.
- Consider a set of instruments as _incomplete_ until the initial snapshot is fully received. This is indicated by the special signal marking Snapshot Complete state.
- Consider all other profiles as live updates after receiving the initial snapshot.
- Add the profile to the set (add action) after you receive it for the unknown symbol.
- Override the previous profile (update action) after you receive it for an existing symbol.
- Remove the profile from the set (delete action) after you receive it with the special **REMOVED** instrument type.
- Send a Heartbeat signal to keep the stream alive, depending on the implementation.

For consistency reasons, a static snapshot must also contain the Snapshot Complete signal for integrity. Depending on the implementation, update and remove actions can appear in any part of a snapshot or live updates stream. Simply process them by the rules above. More than one Snapshot Complete signal can occur in a snapshot or live updates stream.

## File format

Instrument profiles can be written to a file in the format, which is based on a CSV (Comma-Separated Values) format as defined in RFC 4180 - see [CSV on Wikipedia](http://en.wikipedia.org/wiki/Comma-separated_values) or [RFC 4180 homepage](http://www.rfc-editor.org/rfc/rfc4180.txt). The basic CSV format is extended to support several alternating record formats which formally violates CSV restrictions. To avoid possible confusion files in this format shall use an [IPF](https://tools.dxfeed.com/ipf) extension.

The similarities and differences are:

- Each record is located on a separate line. Each line ends with a line break (CRLF). The last line with a record also ends with a line break. Empty lines (parsing artifacts) shall be ignored.
- Records contain fields, separated by commas. The last field must not be followed by a comma.
- Header line is not used. Instead, records can be of 2 variants: metadata and profile.
- Metadata records start with `#` (hash) character and can be either type records or commands (tags) or comments
- Metadata type records define a list of fields used by profile records for a given instrument type.
- Metadata commands represent signalling (e.g. Snapshot Complete) in the file format.
- All other metadata records are considered comments.
- Fields use standard CSV quotation rules by enclosing them in double-quotes.
- UTF-8 encoding is used throughout the entire file.

A metadata type record can be distinguished by the special format of its first field: it starts with `#` character and ends with `::=TYPE` text, and the text in the middle specifies the instrument type. The rest of the metadata type record defines a list of fields (in addition to TYPE) that are used by subsequent profile records for a specified instrument type. Thus, a metadata type record looks like the [BNF](https://en.wikipedia.org/wiki/Backus%E2%80%93Naur_form) definition of a profile record. Note that the **TYPE** field must be the first field for each profile record and it determines what format is used by this record.

The `##COMPLETE` metadata command represents the Snapshot Complete signal. Note that at least one `##COMPLETE` must be present in the file: usually it is located at the end of the file, but can occur in some other place separating the "initial snapshot" part from the live update part of the file. The `##` metadata command represents the Heartbeat signal.

If some line starts with a hash character but does not form a correct metadata record, as described above then this line is considered a comment line and can be safely ignored. Note that a comment line must follow the CSV format in regard to the correct field separation and quotation. In this regard, commenting valid but unused CSV lines works perfectly, but plain comments shall avoid double quote characters or they can easily violate CSV specification. These extensions allow for a single [IPF](https://tools.dxfeed.com/ipf) file to contain profiles for different instrument types with different record formats. They also allow a user to merge several files with different record formats for the same instrument types into a single one because each new metadata record redefines the record format.

## Sample IPF file

```
#STOCK::=TYPE,SYMBOL,DESCRIPTION,CURRENCY
STOCK,GOOG,"Alphabet Inc. - Class C Capital Stock",USD
#FUTURE::=TYPE,SYMBOL,DESCRIPTION,CURRENCY,MULTIPLIER,PRODUCT,LAST_TRADE
FUTURE,/YGM23:IFUS,"Mini Gold Futures - ICUS - Jun23",USD,32.15,/YG:IFUS,2023-06-28
##COMPLETE
```

## Sample IPF from live updates stream

```
# Comment (comments here and below are added for documentation purposes only)
# Metadata type records
#STOCK::=TYPE,SYMBOL,DESCRIPTION,CURRENCY 
#FUTURE::=TYPE,SYMBOL,DESCRIPTION,CURRENCY,MULTIPLIER,PRODUCT,LAST_TRADE 
# Instrument profile records
STOCK,GOOG,"Alphabet Inc. - Class C Capital Stock",USD 
FUTURE,/YGM23:IFUS,"Mini Gold Futures - ICUS - Jun23",USD,32.15,/YG:IFUS,2023-06-28
# Initial snapshot is complete
##COMPLETE
# Profile update: changed description
FUTURE,/YGM23:IFUS,"Mini Gold Futures ICUS, June 2023",USD,32.15,/YG:IFUS,2023-06-28
# Heartbeat command
## 
# FUTURE type is updated: new field CFI is added
#FUTURE::=TYPE,SYMBOL,DESCRIPTION,CURRENCY,CFI,MULTIPLIER,PRODUCT,LAST_TRADE 
# Profile update: new value for CFI field is added
FUTURE,/YGM23:IFUS,"Mini Gold Futures ICUS, June 2023",USD,FXXPSX,32.15,/YG:IFUS,2023-06-28
# Profile removal: profile for /YGM23:IFUS symbol must be removed
REMOVED,/YGM23:IFUS
## 
# etc.
```
