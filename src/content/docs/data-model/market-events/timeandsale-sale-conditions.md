---
title: "TimeAndSale Sale Conditions"
paligoOriginId: "25444"
---

## Overview

Sale Conditions, or Trade Conditions, are flags that dxFeed obtains from exchanges and data vendors. Sale Conditions provide you with a code that contains the principal trading terms and details about the type of trade. Sales condition codes may differ between exchanges, thus below is a list of decodes for different data vendors.

### Statistics

Exchanges distinguish trades in different ways. For example, they may use time: opening of trading, during trading, or additional trading time.

Exchanges also calculate important daily statistics for their instruments, including:

- Open: the trade’s opening price
- High: the day’s highest price
- Low: the day’s lowest price
- Last: the day’s last price
- Close: the closing price
- Volume: the total trading volume

Some trade types don't affect this statistic, such as those that:

- Aren't counted in the volume of trades
- Don't update maximum and minimum prices
- Aren't considered the official opening of trades and don't affect the opening price

The following flag indicates whether a tick contributes to intraday candles:

- isValidTick: normalized SaleCondition flag, if set to **true**, the tick is included in the intraday candle calculation

These analytics also disregard some transactions, because they have zero effects on trading. For example, they don’t consider the previous days’ transactions.

Every exchange has different trading rules for statistics and its own Sale Conditions coding. For instance, US exchanges provide four independent symbols as Sale Conditions. Meanwhile, symbols’ descriptions aren’t identical to that of other US exchanges and depend on exchange rules. For other regions, the Sale Conditions format may be also different. Find descriptions for each exchange in the relevant sections.

## NYSE & NYSE American (CTS)

Below are tables detailing the raw exchange sale conditions for various exchanges, with a specific focus on updating OHLC values and mapping to the dxFeed TimeAndSale.isValidTick flag.

| **Value** | **Description** |
| --- | --- |
| 1 (currently not in use for any sale condition) | Yes, if it is the only qualifying last; or If it is that Participant’s first qualifying last; otherwise No |
| 2 | Yes, if it is the only qualifying last; otherwise No |
| 3 | Yes, if it is the only qualifying last; or If it is from the same participant as the last; or If it is from the LISTING MARKET for that Security; otherwise No |
| 4 | Yes, if it is the first qualifying or only qualifying trade of the day; otherwise No |
| TBD (To Be Determined) | Indicates that the value or processing rule is not currently defined in the exchange specification and may be clarified in future revisions |

<table>
<tr><th rowspan="2"><strong>NYSE CTS code</strong></th><th rowspan="2"><strong>Sale </strong><br/><strong>Condition</strong></th><th colspan="3"><strong>Consolidated</strong></th><th colspan="3"><strong>Participant</strong></th><th rowspan="2">Volume</th><th rowspan="2"><strong>isValidTick</strong></th><th rowspan="2"><strong>Description</strong></th></tr>
<tr><th><strong>Open</strong></th><th><strong>Last</strong></th><th><strong>High/Low</strong></th><th><strong>Open</strong></th><th><strong>Last</strong></th><th><strong>High/Low</strong></th></tr>
<tr><td>Space</td><td>Regular Sale</td><td>4</td><td>Yes</td><td>Yes</td><td>4</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>A trade made without stated conditions is deemed regular way for settlement on the third business day following the transaction date</td></tr>
<tr><td>B</td><td>Average Price Trade</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>Yes</td><td>No</td><td>A trade where the price reported is based upon an average of the prices for transactions in a security during all or any portion of the trading day. Please note that the Nasdaq market center also uses this value to report stopped stock situations</td></tr>
<tr><td>C</td><td>Cash Trade (Same Day Clearing)</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>Yes</td><td>No</td><td>A transaction that calls for the delivery of securities and payment on the same day the trade took place</td></tr>
<tr><td>E</td><td>Automatic Execution</td><td>4</td><td>Yes</td><td>Yes</td><td>4</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>A sale condition code that identifies a NYSE trade that has been automatically executed without the potential benefit of price improvement</td></tr>
<tr><td>F</td><td>Intermarket Sweep Order</td><td>4</td><td>Yes</td><td>Yes</td><td>4</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Intermarket sweep order means a limit order for an NMS stock that meets the following requirements: When routed to a trading center, the limit order is identified as an intermarket sweep order; Simultaneously with the routing of the limit order identified as an intermarket sweep order, one or more additional limit orders, as necessary, are routed to execute against the full displayed size of any protected bid, in the case of a limit order to sell, or the full displayed size of any protected offer, in the case of a limit order to buy, for the NMS stock with a price that is superior to the limit price of the limit order identified as an intermarket sweep order. These additional routed orders also must be marked as intermarket sweep orders</td></tr>
<tr><td>H</td><td>Price Variation Trade</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>Yes</td><td>No</td><td>The Price Variation Trade sale condition code is used to denote a regular market session trade transaction that carries a price that is significantly away from the prevailing consolidated or primary market value at the time of the transaction</td></tr>
<tr><td>I</td><td>Odd Lot Trade</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>Yes</td><td>No</td><td>Odd lot is an order amount for a security that is less than the normal unit of trading for that particular asset. Odd lots are considered to be anything less than the standard units of trade of 1, 10 or 100 shares</td></tr>
<tr><td>K</td><td>Rule 127 (NYSE Only) or Rule 155 (NYSE MKT only)</td><td>4</td><td>Yes</td><td>Yes</td><td>4</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>To qualify as a 155 print, a specialist arranges for the sale of the block at one <strong>clean-up</strong> price or at the different price limits on his book. If the block is sold at a <strong>clean-up</strong> price, the specialist should execute at the same price all the executable buy orders on his book. This Sale Condition is only applicable for AMEX trades</td></tr>
<tr><td>L</td><td>Sold Last (Late Reporting)</td><td>4</td><td>3</td><td>Yes</td><td>4</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Sold Last sale condition modifier is used when a trade prints in sequence but is reported late OR the trade is printed by Amex in conformance to the One or Two Point Rule. A Sold Last transaction should only impact the consolidated last sale price for an issue if the market center reporting the sold last transaction also reported the transaction setting the current last sale price</td></tr>
<tr><td>M</td><td>Market Center Official Close</td><td>No</td><td>No</td><td>No</td><td>No</td><td>Yes</td><td>Yes</td><td>No</td><td>No</td><td>Indicates the Official closing value as determined by a Market Center. This transaction report will contain the market center generated closing price</td></tr>
<tr><td>N</td><td>Reserved</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>TBD</td><td>No</td><td></td></tr>
<tr><td>O</td><td>Market Center Opening Trade</td><td>4</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>The transaction or group of transactions reported as a result of a single-priced opening event by the Market Center</td></tr>
<tr><td>P</td><td>Prior Reference Price</td><td>4</td><td>2</td><td>Yes</td><td>4</td><td>2</td><td>Yes</td><td>Yes</td><td>2</td><td>An executed trade that relates to an obligation to trade at an earlier point in the trading day or that refers to a prior referenced price. This may be the result of an order that was lost or misplaced or was not executed on a timely basis</td></tr>
<tr><td>Q</td><td>Market Center Official Open</td><td>No</td><td>No</td><td>No</td><td>Yes</td><td>No</td><td>Yes</td><td>No</td><td>No</td><td>Indicates the “Official” opening value as determined by a Market Center. This transaction report will contain the market center generated opening priceDirect data recipients that maintain individual market center open values should use this value as the official market center opening value and populate data displays accordingly</td></tr>
<tr><td>R</td><td>Seller</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>Yes</td><td>No</td><td>A Seller’s option transaction is a special transaction that gives the seller the right to deliver the stock at any time within a specific period, ranging from not less than four calendar days to not more than sixty calendar days</td></tr>
<tr><td>T</td><td>Form T (Extended Hours Trade)</td><td>No</td><td>No*</td><td>No</td><td>No</td><td>No*</td><td>No</td><td>Yes</td><td>No*</td><td>A trade executed before or after the regular US market hours. Please note that the Dot-T modifier should be appended to all transactions that occur during the pre- and post-market sessions. The volume of Form-T trades will be included in the calculation of consolidated and market center volume. The price information in Dot-T trades will not be used to update high, low and last sale data for individual securities or indices since they occur outside of normal trade reporting hours.<br/><strong>No</strong>* means Yes when flag ETH=1, No otherwise; see <a href="/data-model/market-events/qd-model-of-market-events/#tradeeth">TradeETH</a></td></tr>
<tr><td>U</td><td>Extended Hours Sold (Out of Sequence)</td><td>No</td><td>No&#42;&#42;</td><td>No</td><td>No</td><td>No&#42;&#42;</td><td>No</td><td>Yes</td><td>No</td><td>Trade reports used to identify extended trading hours trades that are reported more than 90 seconds after execution.<br/><strong>No&#42;&#42;</strong> means 2 when flag ETH=1, No otherwise; see <a href="/data-model/market-events/qd-model-of-market-events/#tradeeth">TradeETH</a></td></tr>
<tr><td>V</td><td>Contingent Trade</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>Yes</td><td>No</td><td>A Sale Condition code used to identify a transaction where the execution of the transaction is contingent upon some event</td></tr>
<tr><td>X</td><td>Cross/Periodic Auction Trade</td><td>4</td><td>Yes</td><td>Yes</td><td>4</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>A Cross/Periodic auction trade a trade transaction resulting from a market center’s crossing session or auction trade</td></tr>
<tr><td>Z</td><td>Sold (Out of Sequence)</td><td>4</td><td>2</td><td>Yes</td><td>4</td><td>2</td><td>Yes</td><td>Yes</td><td>2</td><td>Sold Out of Sequence is used when a trade is printed (reported) out of sequence and at a time different from the actual transaction time</td></tr>
<tr><td>4</td><td>Derivatively Priced</td><td>4</td><td>2</td><td>Yes</td><td>4</td><td>2</td><td>Yes</td><td>Yes</td><td>2</td><td>A transaction that constituted the trade-through was the execution of an order at a price that was not based, directly or indirectly, on the quoted price of the NMS stock at the time of execution and for which the material terms were not reasonably determinable at the time the commitment to execute the order was made</td></tr>
<tr><td>5</td><td>Market Center Reopening Trade</td><td>4</td><td>Yes</td><td>Yes</td><td>4</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>The transaction or group of transactions reported as a result of a single-priced re-opening event by the Market Center</td></tr>
<tr><td>6</td><td>Market Center Closing Trade</td><td>4</td><td>Yes</td><td>Yes</td><td>4</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>The transaction or group of transactions reported as a result of a single-priced closing event by the Market Center</td></tr>
<tr><td>7</td><td>Qualified Contingent Trade</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>Yes</td><td>No</td><td>A transaction consisting of two or more component orders executed as agent or principal where the execution of one component is contingent upon the execution of all other components at or near the same time and the price is determined by the relationship between the component orders and not the current market price for the security</td></tr>
<tr><td>8</td><td>Reserved</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>TBD</td><td>No</td><td></td></tr>
<tr><td>9</td><td>Corrected Consolidated Close (Per Listing Market)</td><td>4</td><td>Yes</td><td>Yes</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>Allowed to be used only by the Listing Market and may be used to adjust the consolidated last sale price. The Corrected Consolidated Close is eligible to set the High, Low and Last for the consolidated statistics and will not update the participant records. Volume will always be reported as zero</td></tr>
</table>

We have different categories that are specific for each positions. If a Sale Condition is not required from any one of the categories, the unused Sale Condition Char should be space-filled. The Category hierarchy in the four Char Sale Condition field is currently as follows:

| Category 1<br/>Settlement Type | Category 2<br/>Reason for Trade-Through Exemption / Other Reason | Category 3<br/>Extended Hours / Sequence Type | Category 4<br/>SRO Trade Detail |
| --- | --- | --- | --- |
| Space | Space<br/>(No Trade Through Exempt Reason) | Space<br/>(Not Extended Hours or Sold Out of Sequence) | Space<br/>(No SRO Required Trade Detail) |
| C<br/>Cash Trade (Same Day Clearing) | F<br/>Inter-market Sweep Order | L<br/>Sold Last (Late Reporting) | B<br/>Average Price Trade |
| N<br/>Reserved | O<br/>Market Center Opening Trade | T<br/>Extended Hours Trade | E<br/>Automatic Execution |
| R<br/>Seller | 4<br/>Derivatively Priced | U<br/>Extended Hours Sold (Out of Sequence) | H<br/>Price Variation Trade |
|  | 5<br/>Market Center Reopening Trade | Z<br/>Sold (Out of Sequence) | I<br/>Odd Lot Trade |
|  | 6<br/>Market Center Closing Trade |  | K<br/>Rule 127 (NYSE only) or Rule 155 (NYSE American only) |
|  | 7<br/>Qualified Contingent Trade |  | M<br/>Market Center Official Close |
|  | 8<br/>Reserved |  | P<br/>Prior Reference Price |
|  | 9<br/>Corrected Consolidated Close Price as per Listing Market |  | Q<br/>Market Center Official Open |
|  |  |  | V<br/>Contingent Trade |
|  |  |  | X<br/>Cross / Periodic Auction Trade |

Sale Conditions within the same category are mutually exclusive (e.g., Sale Conditions **C**, **N** or **R** cannot be used in combination).

Sale Condition **U** (Extended Hours Sold – Out of Sequence) cannot be used in combination with any of the Sale Conditions listed in Category 2 – Reason for Trade-Through Exemption (Rule 611).

Sale Conditions **L** (Sold Last – Late Reporting), **O** (Market Center Opening Trade), **P** (Prior Reference Price), and **Z** (Sold – Out of Sequence), are mutually exclusive of each other (i.e., these sale conditions cannot be used in combination).

[Learn more](https://www.ctaplan.com/publicdocs/ctaplan/CTS_Pillar_Output_Specification.pdf)

## Nasdaq (UTDF)

| **Value** | **Description** |
| --- | --- |
| 1 | UTDF Subscribers should only update the field values if the trade is the first or only last sale eligible trade transaction of the business day from any UTP participant |
| 2 | UTDF subscribers should update consolidated last sale field if received prior to the End of Last Sale Eligibility Control Message (16:00:10). After End of Last Sale Eligibility Control Message is received the transaction would only update the market center-specific last sale value but not the consolidated last sale value |
| 3 | Please note that direct data recipients, which maintain individual market center open values, should use the “Q” value as the official market center opening value and populate data displays accordingly*<br/>*dxFeed follows this rule. Participant Close price is updated based on condition "M" correspondingly |
| A | Internal dxFeed rule. If current Open price in Summary is NaN, this field is considered as Yes, otherwise No |
| TBD (To Be Determined) | Indicates that the value or processing rule is not currently defined in the exchange specification and may be clarified in future revisions |

<table>
<tr><th rowspan="2"><strong>Nasdaq UTDF code</strong></th><th rowspan="2"><strong>Sale Condition</strong></th><th colspan="3"><strong>Consolidated</strong></th><th colspan="3"><strong>Participant</strong></th><th rowspan="2"><strong>Volume</strong></th><th rowspan="2"><strong>isValidTick</strong></th><th rowspan="2">Description</th></tr>
<tr><th><strong>Open</strong></th><th><strong>Last</strong></th><th><strong>High/Low</strong></th><th><strong>Open</strong></th><th><strong>Last</strong></th><th><strong>High/Low</strong></th></tr>
<tr><td>@</td><td>Regular Sale</td><td>A</td><td>Yes</td><td>Yes</td><td>A</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>A trade made without stated conditions is deemed regular way for settlement on the third business day following the transaction date</td></tr>
<tr><td>A</td><td>Acquisition</td><td>A</td><td>Yes</td><td>Yes</td><td>A</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>A transaction made on the Exchange as a result of an Exchange acquisition</td></tr>
<tr><td>B</td><td>Bunched Trade</td><td>A</td><td>Yes</td><td>Yes</td><td>A</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>A trade representing an aggregate of two or more regular trades in a security occurring at the same price either simultaneously or within the same 60-second period, with no individual trade exceeding 10,000 shares</td></tr>
<tr><td>C</td><td>Cash Trade (Same Day Clearing)</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>Yes</td><td>No</td><td>A transaction that calls for the delivery of securities and payment on the same day the trade took place</td></tr>
<tr><td>D</td><td>Distribution</td><td>A</td><td>Yes</td><td>Yes</td><td>A</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Sale of a large block of stock in such a manner that the price is not adversely affected</td></tr>
<tr><td>E</td><td>Placeholder</td><td>No</td><td>TBD</td><td>TBD</td><td>No</td><td>TBD</td><td>TBD</td><td>TBD</td><td>No</td><td></td></tr>
<tr><td>F</td><td>Intermarket Sweep</td><td>A</td><td>Yes</td><td>Yes</td><td>A</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Intermarket sweep order means a limit order for an NMS stock that meets the following requirements: When routed to a trading center, the limit order is identified as an intermarket sweep order; Simultaneously with the routing of the limit order identified as an intermarket sweep order, one or more additional limit orders, as necessary, are routed to execute against the full displayed size of any protected bid, in the case of a limit order to sell, or the full displayed size of any protected offer, in the case of a limit order to buy, for the NMS stock with a price that is superior to the limit price of the limit order identified as an intermarket sweep order. These additional routed orders also must be marked as intermarket sweep orders</td></tr>
<tr><td>G</td><td>Bunched Sold Trade</td><td>A</td><td>1</td><td>Yes</td><td>A</td><td>1</td><td>Yes</td><td>Yes</td><td>1</td><td>A bunched trade that is reported late</td></tr>
<tr><td>H</td><td>Price Variation Trade</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>Yes</td><td>No</td><td>The Price Variation Trade sale condition code is used to denote a regular market session trade transaction that carries a price that is significantly away from the prevailing consolidated or primary market value at the time of the transaction</td></tr>
<tr><td>I</td><td>Odd Lot Trade</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>Yes</td><td>No</td><td>Odd lot is an order amount for a security that is less than the normal unit of trading for that particular asset. Odd lots are considered to be anything less than the standard units of trade of 1, 10 or 100 shares</td></tr>
<tr><td>K</td><td>Rule 155 Trade (AMEX)</td><td>A</td><td>Yes</td><td>Yes</td><td>A</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>To qualify as a 155 print, a specialist arranges for the sale of the block at one <strong>clean-up</strong> price or at the different price limits on his book. If the block is sold at a <strong>clean-up</strong> price, the specialist should execute at the same price all the executable buy orders on his book. This Sale Condition is only applicable for AMEX trades</td></tr>
<tr><td>L</td><td>Sold Last</td><td>A</td><td>2</td><td>Yes</td><td>A</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Sold Last sale condition modifier is used when a trade prints in sequence but is reported late OR the trade is printed by Amex in conformance to the One or Two Point Rule. A Sold Last transaction should only impact the consolidated last sale price for an issue if the market center reporting the sold last transaction also reported the transaction setting the current last sale price</td></tr>
<tr><td>M</td><td>Market Center Official Close</td><td>No</td><td>No</td><td>No</td><td>A</td><td>Yes</td><td>Yes</td><td>No</td><td>No</td><td>Indicates the Official closing value as determined by a Market Center. This transaction report will contain the market center generated closing price</td></tr>
<tr><td>N</td><td>Reserved</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>TBD</td><td>No</td><td>A transaction that calls for the delivery of securities between one and four days (to be agreed by both parties to the trade – the number of days are not noted with the transaction) after the trade date</td></tr>
<tr><td>O</td><td>Opening Prints</td><td>A</td><td>Yes</td><td>Yes</td><td>A</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>The transaction or group of transactions reported as a result of a single-priced opening event by the Market Center</td></tr>
<tr><td>P</td><td>Prior Reference Price</td><td>A</td><td>1</td><td>Yes</td><td>A</td><td>1</td><td>Yes</td><td>Yes</td><td>1</td><td>An executed trade that relates to an obligation to trade at an earlier point in the trading day or that refers to a prior referenced price. This may be the result of an order that was lost or misplaced or was not executed on a timely basis</td></tr>
<tr><td>Q</td><td>Market Center Official Open</td><td>No</td><td>No</td><td>No</td><td>Yes</td><td>No</td><td>Yes</td><td>No</td><td>No</td><td>Indicates the “Official” opening value as determined by a Market Center. This transaction report will contain the market center generated opening priceDirect data recipients that maintain individual market center open values should use this value as the official market center opening value and populate data displays accordingly</td></tr>
<tr><td>R</td><td>Seller</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>Yes</td><td>No</td><td>A Seller’s option transaction is a special transaction that gives the seller the right to deliver the stock at any time within a specific period, ranging from not less than four calendar days to not more than sixty calendar days</td></tr>
<tr><td>S</td><td>Split Trade</td><td>A</td><td>Yes</td><td>Yes</td><td>A</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>An execution in two markets when the specialist or Market Maker in the market first receiving the order agrees to execute a portion of it at whatever price is realized in another market to which the balance of the order is forwarded for execution</td></tr>
<tr><td>T</td><td>Form T (Extended Hours Trade)</td><td>No</td><td>No*</td><td>No</td><td>No</td><td>No*</td><td>No</td><td>Yes</td><td>No*</td><td>A trade executed before or after the regular US market hours. Please note that the Dot-T modifier should be appended to all transactions that occur during the pre- and post-market sessions. The volume of Form-T trades will be included in the calculation of consolidated and market center volume. The price information in Dot-T trades will not be used to update high, low and last sale data for individual securities or indices since they occur outside of normal trade reporting hours.<br/><strong>No</strong>* means Yes when flag ETH=1, No otherwise; see <a href="/data-model/market-events/qd-model-of-market-events/#tradeeth">TradeETH</a></td></tr>
<tr><td>U</td><td>Extended trading hours (Sold Out of Sequence)</td><td>No</td><td>No&#42;&#42;</td><td>No</td><td>No</td><td>No&#42;&#42;</td><td>No</td><td>Yes</td><td>No</td><td>Trade reports used to identify extended trading hours trades that are reported more than 90 seconds after execution.<br/><strong>No&#42;&#42;</strong> means 1 when flag ETH=1, No otherwise; see <a href="/data-model/market-events/qd-model-of-market-events/#tradeeth">TradeETH</a></td></tr>
<tr><td>V</td><td>Contingent Trade</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>Yes</td><td>No</td><td>The Stock-Option Trade sale condition code is used to identify cash equities transactions which are related to options transactions and therefore potentially subject to cancellation if market conditions of the options leg(s) prevent the execution of the stock-option order at the price agreed upon</td></tr>
<tr><td>W</td><td>Average Price Trade</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>Yes</td><td>No</td><td>A trade where the price reported is based upon an average of the prices for transactions in a security during all or any portion of the trading day. Please note that the Nasdaq market center also uses this value to report stopped stock situations</td></tr>
<tr><td>X</td><td>Cross/Periodic Auction Trade</td><td>A</td><td>Yes</td><td>Yes</td><td>A</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>A Cross/Periodic auction trade a trade transaction resulting from a market center’s crossing session or auction trade</td></tr>
<tr><td>Y</td><td>Yellow Flag Regular Trade</td><td>A</td><td>Yes</td><td>Yes</td><td>A</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Market Centers will have the ability to identify regular trades being reported during specific events as out of the ordinary by appending a new sale condition code Yellow Flag ("Y") on each transaction reported to the Nasdaq SIP. The new sale condition ".Y" will be eligible to update all market center and consolidated statistics</td></tr>
<tr><td>Z</td><td>Sold (out of sequence)</td><td>A</td><td>1</td><td>Yes</td><td>A</td><td>1</td><td>Yes</td><td>Yes</td><td>1</td><td>Sold Out of Sequence is used when a trade is printed (reported) out of sequence and at a time different from the actual transaction time</td></tr>
<tr><td>1</td><td>Stopped Stock (Regular Trade)</td><td>A</td><td>Yes</td><td>Yes</td><td>A</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>In accordance with Amex Rule 109, a stopped stock transaction may occur under several circumstances, including when an Amex Specialist executes market-at-the-close orders in a stock, where the Specialist is holding simultaneously both buy and sell market-at-the-close orders. The Specialist is required, under section (d) of the rule, to report the "pair off" transaction as stopped stock. In addition a stopped stock transaction may occur when a Broker, trying to get a better price for the customer’s market order than the currently available price, asks the Specialist to "stop the stock". The Specialist guarantees the Broker the current "stopped" price but does not immediately execute the order. The order is used by the Specialist to improve the quote in order to obtain a better price. If the next trade is at the "stopped" price, the order is "elected" and executed by the Specialist at the stopped price rather than at an improved price. The execution at the stopped price is designated as stopped stock</td></tr>
<tr><td>4</td><td>Derivatively Priced</td><td>A</td><td>1</td><td>Yes</td><td>A</td><td>1</td><td>Yes</td><td>Yes</td><td>1</td><td>A transaction that constituted the trade-through was the execution of an order at a price that was not based, directly or indirectly, on the quoted price of the NMS stock at the time of execution and for which the material terms were not reasonably determinable at the time the commitment to execute the order was made</td></tr>
<tr><td>5</td><td>Re-Opening Prints</td><td>A</td><td>Yes</td><td>Yes</td><td>A</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>The transaction or group of transactions reported as a result of a single-priced re-opening event by the Market Center</td></tr>
<tr><td>6</td><td>Closing Prints</td><td>A</td><td>Yes</td><td>Yes</td><td>A</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>The transaction or group of transactions reported as a result of a single-priced closing event by the Market Center</td></tr>
<tr><td>7</td><td>Qualified Contingent Trade (“QCT”)</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>Yes</td><td>No</td><td>A transaction consisting of two or more component orders executed as agent or principal where the execution of one component is contingent upon the execution of all other components at or near the same time and the price is determined by the relationship between the component orders and not the current market price for the security</td></tr>
<tr><td>8</td><td>Placeholder For 611Exempt</td><td>No</td><td>TBD</td><td>TBD</td><td>No</td><td>TBD</td><td>TBD</td><td>TBD</td><td>No</td><td></td></tr>
<tr><td>9</td><td>Corrected Consolidated Close (per listing market)</td><td>A</td><td>Yes</td><td>Yes</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>Allowed to be used only by the Listing Market and may be used to adjust the consolidated last sale price. The Corrected Consolidated Close is eligible to set the High, Low and Last for the consolidated statistics and will not update the participant records. Volume will always be reported as zero</td></tr>
</table>

Each position in the Sale Condition field corresponds to a specific category. If a Sale Condition is not specified for a category, the corresponding character position should be space-filled. The category hierarchy within the four-character Sale Condition field is as follows:

| Category 1<br/>Settlement Type | Category 2<br/>Reason for Trade-Through Exemption | Category 3<br/>Extended Hours or Sold | Category 4<br/>SRO Trade Detail |
| --- | --- | --- | --- |
| @<br/>Regular Trade | Space<br/>(No Trade Through Exempt Reason) | Space<br/>(Not Extended Hours or Sold Out of Sequence) | Space<br/>(No SRO Required Trade Detail) |
| C<br/>Cash | F<br/>Inter-market Sweep | T<br/>Form T (Extended Hours Trade) | 1<br/>Stopped Stock |
| N<br/>Reserved | O<br/>Opening Prints | L<br/>Sold Last | A<br/>Acquisition |
| R<br/>Seller | 4<br/>Derivatively Priced | Z<br/>Sold (Out of Sequence) | B<br/>Bunched |
| Y<br/>Yellow Flag | 5<br/>Re-Opening Prints | U<br/>Extended Trading Hours – Sold Out of Sequence | D<br/>Distribution |
|  | 6<br/>Closing Prints |  | E<br/>Placeholder Future |
|  | 7<br/>Qualified Contingent Trade |  | G<br/>Bunched Sold Trade |
|  | 8<br/>Placeholder for 611 Exempt |  | H<br/>Price Variation Trade |
|  | 9<br/>Corrected Consolidated Close Price as per Listing Market |  | I<br/>Odd Lot Trade |
|  |  |  | K<br/>Rule 155 |
|  |  |  | M<br/>Market Center Official Close |
|  |  |  | P<br/>Prior Reference Price |
|  |  |  | Q<br/>Market Center Official Open |
|  |  |  | S<br/>Split Trade |
|  |  |  | V<br/>Contingent Trade |
|  |  |  | W<br/>Average Price Trade |
|  |  |  | X<br/>Cross / Periodic Auction Trade |

Sale Conditions within the same category are mutually exclusive. For example, Sale Conditions **C**, **N**, and **R** cannot be used in combination.

Sale Condition **U** (Extended Trading Hours – Sold Out of Sequence) cannot be used in combination with any other Sale Condition listed in Category 3 – Extended Hours or Sold.

Sale Condition **A** (Acquisition) cannot be used in combination with any other Sale Condition listed in Category 4 – SRO Trade Detail.

[Learn more](https://www.utpplan.com/DOC/UtpBinaryOutputSpec.pdf)

## OTCBB (TDDS)

| **Value** | **Description** |
| --- | --- |
| 1 | "*" in OTCBB specification. If there is a 1 in the table below, market data vendors should only update the field values if the trade is the first last sale eligible trade of the business day |
| 2 | "**" in OTCBB specification. If there is a 2 in the table below, market data vendors should only update the value if the original message was received prior to 16:00:10 |
| A | Internal dxFeed rule. If current Open price in Summary is NaN, this field is considered as Yes, otherwise No |

<table>
<tr><th rowspan="2"><strong>OTCBB TDDS symbol</strong></th><th rowspan="2"><strong>Sale Condition</strong></th><th colspan="3">Consolidated</th><th colspan="3">Participant</th><th rowspan="2"><strong>Volume</strong></th><th rowspan="2"><strong>isValidTick</strong></th><th rowspan="2">Description</th></tr>
<tr><td><strong>Open</strong></td><td><strong>Last</strong></td><td><strong>High/Low</strong></td><td><strong>Open</strong></td><td><strong>Last</strong></td><td><strong>High/Low</strong></td></tr>
<tr><td>@</td><td>Regular Sale</td><td>A</td><td>Yes</td><td>Yes</td><td>A</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Indicates a trade with no associated conditions</td></tr>
<tr><td>C</td><td>Cash Sale</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>Yes</td><td>No</td><td>A transaction that calls for the delivery of securities and payment on the same day the trade took place</td></tr>
<tr><td>R</td><td>Seller</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>Yes</td><td>No</td><td>A Seller’s option transaction is a special transaction that gives the seller the right to deliver the stock at any time within a specific period, ranging from not less than four calendar days to not more than sixty calendar days</td></tr>
<tr><td>Z</td><td>Executed During Normal Market Hours and Trade Reported Late</td><td>A</td><td>1</td><td>Yes</td><td>A</td><td>1</td><td>Yes</td><td>Yes</td><td>1</td><td>Sold Out of Sequence is used when a trade is printed (reported) out of sequence and at a time different from the actual transaction time</td></tr>
<tr><td>T</td><td>Executed Outside Normal Market Hours</td><td>No</td><td>No*</td><td>No</td><td>No</td><td>No*</td><td>No</td><td>Yes</td><td>No*</td><td>A trade executed before or after the regular US market hours. Please note that the Dot-T modifier should be appended to all transactions that occur during the pre- and post-market sessions. The volume of Form-T trades will be included in the calculation of consolidated and market center volume. The price information in Dot-T trades will not be used to update high, low and last sale data for individual securities or indices since they occur outside of normal trade reporting hours.<br/><strong>No*</strong> means Yes when flag ETH=1, No otherwise; see <a href="/data-model/market-events/qd-model-of-market-events/#tradeeth">TradeETH</a></td></tr>
<tr><td>U</td><td>Executed Outside Normal Market Hours and Trade Reported Late</td><td>No</td><td>No&#42;&#42;</td><td>No</td><td>No</td><td>No&#42;&#42;</td><td>No</td><td>Yes</td><td>No</td><td>Trade reports used to identify extended trading hours trades that are reported more than 90 seconds after execution<br/><strong>No&#42;&#42;</strong> means 1 when flag ETH=1, No otherwise; see <a href="/data-model/market-events/qd-model-of-market-events/#tradeeth">TradeETH</a></td></tr>
<tr><td>I</td><td>Odd Lot Trade</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>Yes</td><td>No</td><td>Odd lot is an order amount for a security that is less than the normal unit of trading for that particular asset. Odd lots are considered to be anything less than the standard units of trade of 1, 10 or 100 shares</td></tr>
<tr><td>W</td><td>Average Price Trade</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>Yes</td><td>No</td><td>A trade where the price reported is based upon an average of the prices for transactions in a security during all or any portion of the trading day. Please note that the Nasdaq market center also uses this value to report stopped stock situations</td></tr>
<tr><td>P</td><td>Prior Reference Price</td><td>A</td><td>1</td><td>Yes</td><td>A</td><td>1</td><td>Yes</td><td>Yes</td><td>1</td><td>An executed trade that relates to an obligation to trade at an earlier point in the trading day or that refers to a prior referenced price. This may be the result of an order that was lost or misplaced or was not executed on a timely basis</td></tr>
</table>

[Learn more](https://www.finra.org/sites/default/files/2023-03/TDDS-2.1-Specification-v1.1.pdf)

## Eurex

<table>
<tr><th colspan="2">TradeCondition (set)</th></tr>
<tr><td><strong>Value</strong></td><td><strong>Sale Condition</strong></td></tr>
<tr><td>U</td><td>Exchange Last</td></tr>
<tr><td>R</td><td>Opening Price</td></tr>
<tr><td>AX</td><td>High Price</td></tr>
<tr><td>AY</td><td>Low Price</td></tr>
<tr><td>AJ</td><td>Official Closing Price</td></tr>
<tr><td>AW</td><td>Last Auction Price</td></tr>
<tr><td>BD</td><td>Previous Closing Price</td></tr>
<tr><td>XR</td><td>Retail price</td></tr>
</table>

- AW = Last Auction Price cannot be combined with any other value and has its own entry in order to convey the auction type through TrdType (828).
- BB = Midpoint price is used to report prices resulting from Volume Discovery Orders (VDO) executed at midpoint (applicable for cash market products only).

<table>
<tr><th colspan="3">TradeCondition (set) that is only present for MDEntryType 2 = Trade</th></tr>
<tr><td><strong>Value</strong></td><td><strong>Sale Condition</strong></td><td><strong>Description</strong></td></tr>
<tr><td>a</td><td>Volume only</td><td>Used for coherent entries from direct matching of complex instruments (mutually exclusive with U).Trade Volume Reporting (T7 EMDI), Derivatives Only</td></tr>
<tr><td>k</td><td>Out of sequence</td><td>Mutually exclusive with U. It is used for trades entered manually by Market Supervision, CLIP trades outside BBO which are reported as Liquidity Improvement Cross and for simple instrument Off-Book trades which are part of a basket trade</td></tr>
<tr><td>SA</td><td>Special Auction</td><td>Indicates a Special Auction Price and is only applicable for trading model Continuous Auction Specialist. For federal bonds the Special Auction indicator is used for prices determined with Bundesbank participation</td></tr>
<tr><td>BC</td><td>Trading On Terms Of Issue</td><td>Only applicable for cash market products</td></tr>
<tr><td>TC</td><td>Trade At Close</td><td>Used for trade prices resulting from Trade At Close security trading phase and is applicable for cash market instruments only</td></tr>
</table>

## OPRA

For OPRA, Sale Condition may contain two letters:

- The first letter represents the session indicator. See the table below.

| OPRA code | Description |
| --- | --- |
| - | RTH (Regular OPRA Session) |
| X | Indicates an issue |
| 1 | Indicates Monday |
| 2 | Indicates Tuesday |
| 3 | Indicates Wednesday |
| 4 | Indicates Thursday |
| 5 | Indicates Friday |

- The second letter represents the trade type. See the table below.

| OPRA code | Type | Description |
| --- | --- | --- |
| A | CANC | Transaction previously reported (other than as the last or opening report for the particular option contract) is now to be cancelled |
| B | OSEQ | Transaction is being reported late and is out of sequence; i.e., later transactions have been reported for the particular option contract |
| C | CNCL | Transaction is the last reported for the particular option contract and is now cancelled |
| D | LATE | Transaction is being reported late, but is in the correct sequence; i.e., no later transactions have been reported for the particular option contact |
| E | CNCO | Transaction was the first one (opening) reported this day for the particular option contract. Although later transactions have been reported, this transaction is now to be cancelled |
| F | OPEN | Transaction is a late report of the opening trade and is out of sequence; i.e., other transactions have been reported for the particular option contract |
| G | CNOL | Transaction was the only one reported this day for the particular option contract and is now to be cancelled |
| H | OPNL | Transaction is a late report of the opening trade, but is in the correct sequence; i.e., no other transactions have been reported for the particular option contract |
| I | AUTO | Transaction was executed electronically. Prefix appears solely for information; process as a regular transaction |
| J | REOP | Transaction is a reopening of an option contract in which trading has been previously halted. Prefix appears solely for information; process as a regular transaction |
| S | ISOI | Transaction was the execution of an order identified as an Intermarket Sweep Order. Process like normal transaction |
| a | SLAN | Single Leg Auction Non ISO<br/>Transaction was the execution of an electronic order which was “stopped” at a price and traded in a two sided auction mechanism that goes through an exposure period. Such auctions mechanisms include and not limited to Price Improvement, Facilitation or Solicitation Mechanism |
| b | SLAI | Single Leg Auction ISO<br/>Transaction was the execution of an Intermarket Sweep electronic order which was “stopped” at a price and traded in a two sided auction mechanism that goes through an exposure period. Such auctions mechanisms include and not limited to Price Improvement, Facilitation or Solicitation Mechanism marked as ISO |
| c | SLCN | Single Leg Cross Non ISO<br/>Transaction was the execution of an electronic order which was “stopped” at a price and traded in a two sided crossing mechanism that does not go through an exposure period. Such crossing mechanisms include and not limited to Customer to Customer Cross and QCC with a single option leg |
| d | SCLI | Single Leg Cross ISO<br/>Transaction was the execution of an Intermarket Sweep electronic order which was “stopped” at a price and traded in a two sided crossing mechanism that does not go through an exposure period. Such crossing mechanisms include and not limited to Customer to Customer Cross |
| e | SLFT | Single Leg Floor Trade<br/>Transaction represents a non-electronic trade executed on a trading floor. Execution of Paired and Non-Paired Auctions and Cross orders on an exchange floor are also included in this category |
| f | MLET | Multi Leg autoelectronic trade<br/>Transaction represents an electronic execution of a multi leg order traded in a complex order book |
| g | MLAT | Multi Leg Auction<br/>Transaction was the execution of an electronic multi leg order which was “stopped” at a price and traded in a two sided auction mechanism that goes through an exposure period in a complex order book. Such auctions mechanisms include and not limited to Price Improvement, Facilitation or Solicitation Mechanism |
| h | MLCT | Multi Leg Cross<br/>Transaction was the execution of an electronic multi leg order which was “stopped” at a price and traded in a two sided crossing mechanism that does not go through an exposure period. Such crossing mechanisms include and not limited to Customer to Customer Cross and QCC with two or more options legs |
| i | MLFT | Multi Leg floor trade<br/>Transaction represents a non-electronic multi leg order trade executed against other multi-leg order(s) on a trading floor. Execution of Paired and Non-Paired Auctions and Cross orders on an exchange floor are also included in this category |
| j | MESL | Multi Leg autoelectronic trade against single leg(s)<br/>Transaction represents an electronic execution of a multi Leg order traded against single leg orders/ quotes |
| k | TLAT | Stock Options Auction<br/>Transaction was the execution of an electronic multi leg stock/options order which was “stopped” at a price and traded in a two sided auction mechanism that goes through an exposure period in a complex order book. Such auctions mechanisms include and not limited to Price Improvement, Facilitation or Solicitation Mechanism |
| l | MASL | Multi Leg Auction against single leg(s)<br/>Transaction was the execution of an electronic multi leg order which was “stopped” at a price and traded in a two sided auction mechanism that goes through an exposure period and trades against single leg orders/ quotes. Such auctions mechanisms include and not limited to Price Improvement, Facilitation or Solicitation Mechanism |
| m | MFSL | Multi Leg floor trade against single leg(s)<br/>Transaction represents a non-electronic multi leg order trade executed on a trading floor against single leg orders/ quotes. Execution of Paired and Non-Paired Auctions on an exchange floor are also included in this category |
| n | TLET | Stock Options autoelectronic trade<br/>Transaction represents an electronic execution of a multi leg stock/options order traded in a complex order book |
| o | TLCT | Stock Options Cross<br/>Transaction was the execution of an electronic multi leg stock/options order which was “stopped” at a price and traded in a two sided crossing mechanism that does not go through an exposure period. Such crossing mechanisms include and not limited to Customer to Customer Cross |
| p | TLFT | Stock Options floor trade<br/>Transaction represents a non-electronic multi leg order stock/options trade executed on a trading floor in a Complex order book. Execution of Paired and Non -Paired Auctions and Cross orders on an exchange floor are also included in this category |
| q | TESL | Stock Options autoelectronic trade against single leg(s)<br/>Transaction represents an electronic execution of a multi Leg stock/options order traded against single leg orders/ quotes |
| r | TASL | Stock Options Auction against single leg(s)<br/>Transaction was the execution of an electronic multi leg stock/options order which was “stopped” at a price and traded in a two sided auction mechanism that goes through an exposure period and trades against single leg orders/ quotes. Such auctions mechanisms include and not limited to Price Improvement, Facilitation or Solicitation Mechanism |
| s | TFSL | Stock Options floor trade against single leg(s)<br/>Transaction represents a non-electronic multi leg stock/options order trade executed on a trading floor against single leg orders/ quotes. Execution of Paired and Non -Paired Auctions on an exchange floor are also included in this category |
| t | CBMO | Multi Leg Floor Trade of Proprietary Products<br/>Transaction represents execution of a proprietary product non-electronic multi leg order with at least 3 legs. The trade price may be outside the current NBBO |
| u | MCTP | Multilateral Compression Trade of Proprietary Products<br/>Transaction represents an execution in a proprietary product done as part of a multilateral compression. Trades are executed outside of regular trading hours at prices derived from end of day markets. Trades do not update Open, High, Low, and Closing Prices |
| v | EXHT | Extended Hours Trade<br/>Transaction represents a trade that was executed outside of regular market hours. Trades do not update Open, High, Low, and Closing Prices |

## CME Group

For CME available Sale Conditions:

'B' == Block Trade

'P' == Exchange for Physical

'R' == Exchange for Risk

## ICE Futures

For ICE the first letter of Sale Condition indicates IsSystemPricedLeg (Indicate if it is a system priced leg, ‘Y’ or ‘N’). Space == 'N'. **S** and **C** == 'Y'.

| **SystemPricedLegType Description** | **SystemPricedLegType code** |
| --- | --- |
| N/A | Space |
| System Priced Crack Spread Leg | C |
| System Priced Leg | S |

The second letter represents the trade type:

| **Trade Type Description** | **Trade Type** |
| --- | --- |
| Normal | Space |
| Block | K |
| EFS | S |
| EFP | E |
| EFP/EFS | O |
| EOO | Q |
| EFM | I |
