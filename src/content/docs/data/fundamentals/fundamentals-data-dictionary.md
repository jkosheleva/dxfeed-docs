---
title: "Fundamentals Data Dictionary"
paligoOriginId: "77508"
---

## Introduction

dxFeed Fundamentals service provides a REST API for retrieving fundamental and corporate action data using dxFeed symbology. The data is collected from multiple sources and normalized for user convenience. This document is a reference guide for all attributes accessible through the Fundamentals API. It is an essential companion for those engaging with the API to navigate available data, understand the API's underlying data structure, and utilize the API efficiently. The API responses include a set of fixed attributes and extensions with additional information.

Fixed attributes include essential information that remains constant across all responses. These attributes serve as the foundation for understanding the entity and its properties. Extensions are customizable sections that consist of key-value pairs with additional information about the entity. Extensions can vary based on the source and the context of the provided data.

Each controller offers a particular type of data. There are also composite controllers that combine the data of multiple types:

1. The Snapshot endpoints are used for querying only the latest records from one or multiple endpoints. Latest is defined based on the effective date of the reported data.
2. The Symbol State Change endpoints are used for querying the combined information about a stock split and spinoff from the “corporate-action” endpoint, merger and acquisition events from the “merger-and-acquisition” endpoint, and symbol changes from the “reference-change” endpoint.
3. The History endpoints are used for querying the historical records from one or multiple endpoints.

## Alpha Beta

The Alpha Beta endpoints are used for querying the alpha and beta metrics of an instrument.

<table>
<tr><th>Attribute name</th><th>Data type</th><th>Description</th></tr>
<tr><td colspan="3"><strong>Fixed fields</strong></td></tr>
<tr><td>ymd</td><td>Integer</td><td>A month-end date for which the data is effective.</td></tr>
<tr><td>eventTime</td><td>Long</td><td>The timestamp when the event has been registered in the dxFeed system.</td></tr>
<tr><td>dxSymbol</td><td>String</td><td>A unique combination of characters representing a security on a stock exchange. Follows dxFeed symbology.</td></tr>
<tr><td>sid</td><td>String</td><td>The internal security ID. Unique across all data providers.</td></tr>
<tr><td>period</td><td>String</td><td>Represents time period related to the data, e.g., the end of a quarter or fiscal year for the financial statements. Combination of numerical values and letters. For example, '10M' represents a duration of 10 months, while '1Y' represents a duration of 1 year.</td></tr>
<tr><td>alpha</td><td>Double</td><td>The measurement of an instrument's performance relative to its benchmark index, expressing the excess return or underperformance in percentage terms.</td></tr>
<tr><td>beta</td><td>Double</td><td>The measurement of an instrument's historical volatility compared to a market index.</td></tr>
<tr><td>disabled</td><td>Boolean</td><td>Technical status of a record. Mostly set to "false".</td></tr>
<tr><td>source</td><td>String</td><td>The data provider ID.</td></tr>
<tr><td colspan="3"><strong>Extension fields</strong></td></tr>
<tr><td>rSquare</td><td>String</td><td>A statistical measure that shows how much a security's movements are related to changes in a benchmark index, expressed as a percentage.</td></tr>
<tr><td>nonDivBeta</td><td>String</td><td>Same as beta but excludes dividends from its calculation and only takes the price into account.</td></tr>
<tr><td>nonDivRSquare</td><td>String</td><td>Same as rSquare but excludes dividends from its calculation and only takes the price into account.</td></tr>
<tr><td>nonDivAlpha</td><td>String</td><td>Same as alpha but excludes dividends from its calculation and only takes the price into account.</td></tr>
</table>

## Asset Classification

The Asset Classification endpoints are used for querying industry classification data of a company, e.g., industry, sector, or economy sphere codes.

<table>
<tr><th>Attribute name</th><th>Data type</th><th>Description</th></tr>
<tr><td colspan="3"><strong>Fixed fields</strong></td></tr>
<tr><td>eventTime</td><td>Long</td><td>The timestamp when the event has been registered in the dxFeed system.</td></tr>
<tr><td>dxSymbol</td><td>String</td><td>A unique combination of characters representing a security on a stock exchange. Follows dxFeed symbology.</td></tr>
<tr><td>sid</td><td>String</td><td>The internal security ID. Unique across all data providers.</td></tr>
<tr><td>cid</td><td>String</td><td>The internal company ID. Unique across all data providers.</td></tr>
<tr><td>sicCode</td><td>String</td><td>The code that indicates the company's type of business according to the Standard Industrial Classification (SIC).</td></tr>
<tr><td>naceCode</td><td>String</td><td>The code that indicates the company's type of business according to the Statistical Classification of Economic Activities in the European Community</td></tr>
<tr><td>naicsCode</td><td>String</td><td>The code that indicates the company's type of business according to the North American Industry Classification System (NAICS).</td></tr>
<tr><td>cannaicsCode</td><td>String</td><td>Same as naicsCode but specifically for Canadian classifications.</td></tr>
<tr><td>srcEconomySphereCode</td><td>String</td><td>Morningstar classification of a company by economic sphere.</td></tr>
<tr><td>srcIndustryCode</td><td>String</td><td>Morningstar classification of a company by industry code.</td></tr>
<tr><td>srcIndustryGroupCode</td><td>String</td><td>Morningstar classification of a company industry by group code.</td></tr>
<tr><td>srcSectorCode</td><td>String</td><td>Morningstar classification of a company by sector.</td></tr>
<tr><td>ext</td><td>String</td><td></td></tr>
<tr><td>disabled</td><td>Boolean</td><td>Technical status of a record. Mostly set to "false".</td></tr>
<tr><td>source</td><td>String</td><td>The data provider ID.</td></tr>
</table>

## Balance Statement

The Balance Statement endpoints are used for querying a company’s balance sheet data. A balance sheet represents a company's financial position for a day at its fiscal year-end, for example, the last day of its accounting period. The balance sheet data provides the basis for computing rates of return for investors and evaluating a company's capital structure.

<table>
<tr><th>Attribute name</th><th>Data type</th><th>Description</th></tr>
<tr><td colspan="3"><strong>Fixed fields</strong></td></tr>
<tr><td>ymd</td><td>Integer</td><td>The end date of the reporting period. Typically, it falls on the last day of the quarter.</td></tr>
<tr><td>eventTime</td><td>Long</td><td>The timestamp when the event has been registered in the dxFeed system.</td></tr>
<tr><td>dxSymbol</td><td>String</td><td>A unique combination of characters representing a security on a stock exchange. Follows dxFeed symbology.</td></tr>
<tr><td>sid</td><td>String</td><td>The internal security ID. Unique across all data providers.</td></tr>
<tr><td>cid</td><td>String</td><td>The internal company ID. Unique across all data providers.</td></tr>
<tr><td>period</td><td>String</td><td>Represents time period related to the data, e.g., the end of a quarter or fiscal year for the financial statements. Combination of numerical values and letters. For example, '10M' represents a duration of 10 months, while '1Y' represents a duration of 1 year.</td></tr>
<tr><td>reportType</td><td>String</td><td>A type of the relevant report which takes values "AOR" (As Originally Reported) or "RESTATED" in case of a company corrects data from previous reports. For more detailed typing, refer to a "reportSubType" field.</td></tr>
<tr><td>reportSubType</td><td>String</td><td>Further typing for the "reportType" field, takes the following values: "P" indicates that the financial information is preliminary and subject to change. "A" indicates that the financial information is considered final and has been reviewed and adjusted as necessary. "R" indicates that one or more of a company's previous financial statements have been revised to correct an error, and the information is considered final. "TTM" indicates that the financial information covers the trailing 12 months, whether it is originally reported or restated.</td></tr>
<tr><td>currencyCode</td><td>String</td><td>Currency in which the amounts in this controller are expressed. ISO three-character code.</td></tr>
<tr><td>cash</td><td>Double</td><td>The line item of the balance statement that represents cash and any other highly liquid instruments that can be quickly converted to cash.</td></tr>
<tr><td>currentAssets</td><td>Double</td><td>The line item of the balance statement that represents the assets of the company that can be converted into cash within a brief timeframe, typically one year.</td></tr>
<tr><td>currentDebt</td><td>Double</td><td>The line item of the balance statement that represents the portion of the company's long-term debt that is scheduled to be repaid within the next year.</td></tr>
<tr><td>commonStock</td><td>Double</td><td>The line item of the balance statement that represents the total value of common stock issued by the company at its nominal value.</td></tr>
<tr><td>preferredStock</td><td>Double</td><td>The line item of the balance statement that represents the total value of preferred stock issued by the company at its nominal value..</td></tr>
<tr><td>totalStock</td><td>Double</td><td>The line item of the balance statement that How many shares the company is allowed to issue under its charter including common and preferred stock.</td></tr>
<tr><td>commonStockEquity</td><td>Double</td><td>The line item of the balance statement that extends the "commonStock" and encompasses the entire equity attributable to common stockholders. It includes not only the nominal value of the common stock but also additional items like paid-in capital associated with the issuance of common stock or retained earnings.</td></tr>
<tr><td>preferredStockEquity</td><td>Double</td><td>The line item of the balance statement that extends the "preferredStock" and encompasses the entire equity attributable to preferred stockholders. It includes not only the nominal value of the preferred stock but also additional items like paid-in capital associated with the issuance of preferred stock or retained earnings.</td></tr>
<tr><td>totalStockEquity</td><td>Double</td><td>The line item of the balance statement that represents the aggregate value of the equity from preferred stocks and the equity from common stocks.</td></tr>
<tr><td>totalLiabilities</td><td>Double</td><td>Projected future expenses associated with current obligations of a business entity to transfer assets or deliver services to external parties due to past transactions or occurrences. This encompasses liabilities and commitments, excluding any obligations to minority interest.</td></tr>
<tr><td>totalAssets</td><td>Double</td><td>Sum of all assets, as recorded in the Balance Sheet.</td></tr>
<tr><td>stockholdersEquity</td><td>Double</td><td>The difference between assets and liabilities. The equity financing of a company.</td></tr>
<tr><td>cashAndEquivalents</td><td>Double</td><td>Investment which company has reported as cash equivalents. (Marketable securities; certificates of deposit; bankers' acceptances; commercial paper; bank deposits; time deposit; and treasury bills (regardless of maturity).</td></tr>
<tr><td>filingDate</td><td>String</td><td>The date on which the company officially submitted the financial report with the relevant regulatory authority.</td></tr>
<tr><td>disabled</td><td>Boolean</td><td>Technical status of a record. Mostly set to "false".</td></tr>
<tr><td>source</td><td>String</td><td>The data provider ID.</td></tr>
<tr><td colspan="3"><strong>Extension fields</strong></td></tr>
<tr><td>fiscalYearEndMonth</td><td>String</td><td>A numerical representation of the month that marks the end of a company's fiscal year. For instance, "fiscalYearEndMonth" = 9, indicates that the fiscal year ends in September.</td></tr>
</table>

## Cash Flow Statement

The Cash Flow Statement endpoints are used for querying a company’s cash flow data. The cash flow statement tracks the inflow and outflow of cash, providing insights into a company's financial health and operational efficiency during a particular period.

<table>
<tr><th>Attribute name</th><th>Data type</th><th>Description</th></tr>
<tr><td colspan="3"><strong>Fixed fields</strong></td></tr>
<tr><td>ymd</td><td>Integer</td><td>The end date of the reporting period. Typically, it falls on the last day of the quarter.</td></tr>
<tr><td>eventTime</td><td>Long</td><td>The timestamp when the event has been registered in the dxFeed system.</td></tr>
<tr><td>dxSymbol</td><td>String</td><td>A unique combination of characters representing a security on a stock exchange. Follows dxFeed symbology.</td></tr>
<tr><td>sid</td><td>String</td><td>The internal security ID. Unique across all data providers.</td></tr>
<tr><td>cid</td><td>String</td><td>The internal company ID. Unique across all data providers.</td></tr>
<tr><td>period</td><td>String</td><td>Represents time period related to the data, e.g., the end of a quarter or fiscal year for the financial statements. Combination of numerical values and letters. For example, '10M' represents a duration of 10 months, while '1Y' represents a duration of 1 year.</td></tr>
<tr><td>reportType</td><td>String</td><td>A type of the relevant report which takes values "AOR" (acronym for As Originally Reported) or "RESTATED" in case of a company corrects data from previous reports. For more detailed typing, refer to a "reportSubType" field.</td></tr>
<tr><td>reportSubType</td><td>String</td><td>Further typing for the "reportType" field takes the following values: "P" Indicates that the financial information is preliminary and subject to change. "A" indicates that the financial information is considered final and has been reviewed and adjusted as necessary."R" indicates that one or more of a company's previous financial statements have been revised to correct an error, and the information is considered final. "TTM" indicates that the financial information covers the trailing 12 months, whether it is originally reported or restated.</td></tr>
<tr><td>currencyCode</td><td>String</td><td>Currency in which the amounts in this controller are expressed. ISO three-character code.</td></tr>
<tr><td>capitalExpenditure</td><td>Double</td><td>Capital Expenditure (CapEx) is the line item of the cash flow statement that represents the financial resources allocated by a company towards acquiring, enhancing, and sustaining tangible assets such as real estate, facilities, infrastructure, technology, or machinery. These funds are typically deployed for initiating new ventures or expanding existing operations.</td></tr>
<tr><td>financingCashFlow</td><td>Double</td><td>The line item of the cash flow statement that represents a form of business financing in which a loan made to a company is backed by a company's expected cash flows.</td></tr>
<tr><td>investingCashFlow</td><td>Double</td><td>The line item of the cash flow statement that represents the overall shift in a company's cash balance due to various factors, including profits or losses from financial market investments and subsidiary operations, alongside alterations stemming from expenditures on capital assets like plant and equipment.</td></tr>
<tr><td>operatingCashFlow</td><td>Double</td><td>The line item of the cash flow statement that represents the measure of the amount of cash generated by a company's normal business operations. Operating cash flow indicates whether a company can generate sufficient positive cash flow to maintain and grow its operations, otherwise, it may require external financing for capital expansion.</td></tr>
<tr><td>freeCashFlow</td><td>Double</td><td>The line item of the cash flow statement that represents the cash that a company generates after accounting for cash outflows to support operations and maintain its capital assets.</td></tr>
<tr><td>filingDate</td><td>String</td><td>The date on which the company officially submitted the financial report with the relevant regulatory authority.</td></tr>
<tr><td>disabled</td><td>Boolean</td><td>Technical status of a record. Mostly set to "false".</td></tr>
<tr><td>source</td><td>String</td><td>The data provider ID.</td></tr>
<tr><td colspan="3"><strong>Extension fields</strong></td></tr>
<tr><td>fiscalYearEndMonth</td><td>String</td><td>A numerical representation of the month that marks the end of a company's fiscal year. For instance, "fiscalYearEndMonth" = 9, indicates that the fiscal year ends in September.</td></tr>
</table>

## Company Profile

The Company Profile endpoints are used for querying general information about a company. The data is provided per instrument.

<table>
<tr><th>Attribute name</th><th>Data type</th><th>Description</th></tr>
<tr><td colspan="3"><strong>Fixed fields</strong></td></tr>
<tr><td>name</td><td>String</td><td>The name of the company.</td></tr>
<tr><td>eventTime</td><td>Long</td><td>The timestamp when the event has been registered in the dxFeed system.</td></tr>
<tr><td>dxSymbol</td><td>String</td><td>A unique combination of characters representing a security on a stock exchange. Follows dxFeed symbology.</td></tr>
<tr><td>sid</td><td>String</td><td>The internal security ID. Unique across all data providers.</td></tr>
<tr><td>cid</td><td>String</td><td>The internal company ID. Unique across all data providers.</td></tr>
<tr><td>description</td><td>String</td><td>The business description of the company.</td></tr>
<tr><td>address</td><td>String</td><td>The address of the company's headquarters, as stated in the most recent report.</td></tr>
<tr><td>email</td><td>String</td><td>The email address of the company.</td></tr>
<tr><td>phone</td><td>String</td><td>The phone number of the company's headquarters, as stated in the most recent report.</td></tr>
<tr><td>url</td><td>String</td><td>The website address of the company's headquarters, as stated in the most recent report.</td></tr>
<tr><td>disabled</td><td>Boolean</td><td>Technical status of the record. Mostly set to "false".</td></tr>
<tr><td>source</td><td>String</td><td>The data provider ID.</td></tr>
<tr><td colspan="3"><strong>Extension fields</strong></td></tr>
<tr><td>totalEmployeeNumber</td><td>String</td><td>The total number of employees in the company, as stated in the most recent report.</td></tr>
</table>

## Consensus Estimate

The Consensus Estimate endpoints are used for querying the forecast of a company's EPS for the target period.

<table>
<tr><th>Attribute name</th><th>Data type</th><th>Description</th></tr>
<tr><td colspan="3"><strong>Fixed fields</strong></td></tr>
<tr><td>ymd</td><td>Integer</td><td>The effective date of the reported data.</td></tr>
<tr><td>eventTime</td><td>Long</td><td>The timestamp when the event has been registered in the dxFeed system.</td></tr>
<tr><td>dxSymbol</td><td>String</td><td>A unique combination of characters representing a security on a stock exchange. Follows dxFeed symbology.</td></tr>
<tr><td>sid</td><td>String</td><td>The internal security ID. Unique across all data providers.</td></tr>
<tr><td>period</td><td>String</td><td>Represents time period related to the data, e.g., the end of a quarter or fiscal year for the financial statements. Combination of numerical values and letters. For example, '10M' represents a duration of 10 months, while '1Y' represents a duration of 1 year.</td></tr>
<tr><td>currencyCode</td><td>String</td><td>Currency in which the amounts in this controller are expressed. ISO three-character code.</td></tr>
<tr><td>referencePeriod</td><td>String</td><td>The fiscal time frame associated with a specific event. Combination of numerical values and letters. For example, 'Q1 2025' represents the first quarter of fiscal year 2025 for a specific company.</td></tr>
<tr><td>adjustedEPSMean</td><td>Double</td><td>The company's projected adjusted EPS mean.</td></tr>
<tr><td>adjustedEPSMedian</td><td>Double</td><td>The company's projected adjusted EPS median.</td></tr>
<tr><td>reportedEPSMean</td><td>Double</td><td>The company's projected reported EPS mean.</td></tr>
<tr><td>reportedEPSMedian</td><td>Double</td><td>The company's projected reported EPS median.</td></tr>
<tr><td>ext</td><td>String</td><td></td></tr>
<tr><td>disabled</td><td>Boolean</td><td>Technical status of a record. Mostly set to "false".</td></tr>
<tr><td>source</td><td>String</td><td>The data provider ID.</td></tr>
</table>

## Corporate Action

The Corporate Action endpoints are used for querying the information about dividend, stock split, and spinoff events. Please note that there are separate endpoints for merger and acquisition, as well as reference change events.

<table>
<tr><th>Attribute name</th><th>Data type</th><th>Description</th></tr>
<tr><td colspan="3"><strong>Fixed fields</strong></td></tr>
<tr><td>exYmd</td><td>Integer</td><td>The effective date of the corporate action. Ex-dividend date for dividends.</td></tr>
<tr><td>eventTime</td><td>Long</td><td>The timestamp when the event has been registered in the dxFeed system.</td></tr>
<tr><td>dxSymbol</td><td>String</td><td>A unique combination of characters representing a security on a stock exchange. Follows dxFeed symbology.</td></tr>
<tr><td>sid</td><td>String</td><td>The internal security ID. Unique across all data providers.</td></tr>
<tr><td>type</td><td>String</td><td>The category of the corporate action that can take one of the following values: "DIVIDEND", "SPINOFF", or "STOCK_SPLIT".</td></tr>
<tr><td>subType</td><td>String</td><td>A sub-category of a company's event. Can take one of the following values: "CD" for regular cash dividends, "SC" for special cash dividends, "SS" for stock splits, "ST" for short-term capital gains, "LT" for long-term capital gains, "SD" for stock dividends, which occur when dividend payment to shareholders consists of additional shares rather than cash.</td></tr>
<tr><td>adjustmentValue</td><td>Double</td><td>The ratio for adjusting share price in case of "SPINOFF" or "STOCK_SPLIT" events. It is also a dividend amount in the related "currencyCode" in case of "DIVIDEND" events.</td></tr>
<tr><td>disabled</td><td>Boolean</td><td>Technical status of a record. Mostly set to "false".</td></tr>
<tr><td>source</td><td>String</td><td>The data provider ID.</td></tr>
<tr><td colspan="3"><strong>Extension fields</strong></td></tr>
<tr><td>declarationDate</td><td>String</td><td>The date on which the Board of Directors publicly declares the details of the corporate action.</td></tr>
<tr><td>numberOfShares</td><td>String</td><td>The total number of shares distributed to existing shareholders of a parent company in connection with the spinoff.</td></tr>
<tr><td>splitFrom</td><td>String</td><td>The initial or pre-split state of the shares in the context of a stock split. Indicates the number of shares before the split event.</td></tr>
<tr><td>name</td><td>String</td><td>The name of the group of extension fields. Explains the context of the provided extension attributes.</td></tr>
<tr><td>recordDate</td><td>String</td><td>The date on which shareholders recorded in the shareholder register are eligible to get dividends.</td></tr>
<tr><td>childSid</td><td>String</td><td>The "sid" of the spun off company.</td></tr>
<tr><td>splitTo</td><td>String</td><td>The post-split state of the shares in the context of a stock split. Indicates the number of shares after the split event.</td></tr>
<tr><td>childDxSymbol</td><td>String</td><td>The "dxSymbol" of the spun off company.</td></tr>
<tr><td>currencyCode</td><td>String</td><td>Currency in which the amounts in this controller are expressed. ISO three-character code.</td></tr>
<tr><td>frequency</td><td>String</td><td>The frequency of dividend payments within a year. Can take one of the following values: "0" for Unspecified, "1" for Annually, "2" for Semi-annually, "3" for Trimesterly, "4" for Quarterly, "6" for Every two months, "12" for Monthly, "26" for Every two weeks, "52" for Weekly, "104" for Twice a week, and "365" for Daily frequency.</td></tr>
<tr><td>payDate</td><td>String</td><td>The date on which a company disburses the actual payments or benefits to its shareholders or investors as a result of the declared corporate action.</td></tr>
</table>

## Corporate Calendar

The Corporate Calendar endpoints are used for querying information about key company events, e.g., earnings releases, annual reports, general meetings, etc.

<table>
<tr><th>Attribute name</th><th>Data type</th><th>Description</th></tr>
<tr><td colspan="3"><strong>Fixed fields</strong></td></tr>
<tr><td>ymd</td><td>Integer</td><td>The date of the corporate event.</td></tr>
<tr><td>eventTime</td><td>Long</td><td>The timestamp when the event has been registered in the dxFeed system.</td></tr>
<tr><td>dxSymbol</td><td>String</td><td>A unique combination of characters representing a security on a stock exchange. Follows dxFeed symbology.</td></tr>
<tr><td>sid</td><td>String</td><td>The internal security ID. Unique across all data providers.</td></tr>
<tr><td>cid</td><td>String</td><td>The internal company ID. Unique across all data providers.</td></tr>
<tr><td>referencePeriod</td><td>String</td><td>The fiscal time frame associated with a specific event. Combination of numerical values and letters. For example, 'Q1 2025' represents the first quarter of fiscal year 2025 for a specific company.</td></tr>
<tr><td>eventType</td><td>String</td><td>The type of the company event. Can take one of the following values: "GENERAL_MEETING", "BOARD_MEETING", "SHAREHOLDER_MEETING", "INDUSTRY_CONFERENCE", "CORPORATE_ACTION", "SALES_CALL", "ANALYST_MEETING", "BUSINESS_CALL", "GUIDANCE_CALL", "ANNUAL_REPORT", "EARNING" or "UNKNOWN".</td></tr>
<tr><td>announceType</td><td>String</td><td>The type of the company announcement. Can take one of the following values: "ANNUAL_RESULTS", "COMPANY_MEETING", "CONFERENCE_CALL", "RELEASE", "UNKNOWN".</td></tr>
<tr><td>announceTime</td><td>String</td><td>The timing of the company announcement. Can take one of the following values: "PRE_MARKET" refers to an announcement before the market open. "POST_MARKET" refers to an announcement after the market close. "UNKNOWN" indicates that there is no data available, or the announcement is made during market hours.</td></tr>
<tr><td>startTime</td><td>Long</td><td>The kick-off time of a company event. If corresponds to "00:00" in the GMT time zone, it means that the event's start time is unknown and was not provided by the data provider.</td></tr>
<tr><td>endTime</td><td>Long</td><td>The time when a company event is finished.</td></tr>
<tr><td>status</td><td>String</td><td>The status of the event. Can take one of the following values: "CONFIRMED" for the past events as well as for the future events that have been confirmed by the company. "ESTIMATED" for the future events that haven't been confirmed and where the date has been estimated based on the previous year's event. "UNKNOWN" for the events without confirmed or estimated date.</td></tr>
<tr><td>disabled</td><td>Boolean</td><td>Technical status of a record. Mostly set to "false".</td></tr>
<tr><td>source</td><td>String</td><td>The data provider ID.</td></tr>
<tr><td colspan="3"><strong>Extension fields</strong></td></tr>
<tr><td>eventUrl</td><td>String</td><td>The web link for the event.</td></tr>
<tr><td>eventOnlineLink</td><td>String</td><td>The link for online connection to the event.</td></tr>
<tr><td>eventPhoneLink</td><td>String</td><td>The link for phone connection to the event.</td></tr>
</table>

## Crypto Reference

The Crypto Reference endpoints are used for querying crypto instruments covered by the Fundamentals API, including general information about each instrument.

<table>
<tr><th>Attribute name</th><th>Data type</th><th>Description</th></tr>
<tr><td colspan="3"><strong>Fixed fields</strong></td></tr>
<tr><td>eventTime</td><td>Long</td><td>The timestamp when the event has been registered in the dxFeed system.</td></tr>
<tr><td>dxSymbol</td><td>String</td><td>A combination of characters representing a cryptocurrency. It is based on ticker. It is important to note that with the rapid growth of the crypto ecosystem, some tokens appear to have the same tickers, and therefore the same symbols, as others. For example, Wrapped Bitcoin (WBTC) and WorldBTC (WBTC). We encourage using the sid in your requests since the sid is strictly unique. You can first request the crypto-reference controller using dxSymbol, then choose the necessary cryptocurrency with the help of assetName, and use its sid. Another option is using srcRank or marketCap from the crypto-summary controller to select the most popular cryptocurrency among the ones with the same dxSymbol.</td></tr>
<tr><td>sid</td><td>String</td><td>The internal security ID. Unique across all data providers.</td></tr>
<tr><td>assetName</td><td>String</td><td>The name of this cryptocurrency.</td></tr>
<tr><td>dateAdded</td><td>Integer</td><td>Timestamp of when this cryptocurrency was added by the data provider.</td></tr>
<tr><td>minable</td><td>Boolean</td><td>A boolean attribute that indicates whether a cryptocurrency can be mined.</td></tr>
<tr><td>platformName</td><td>String</td><td>Metadata about the parent cryptocurrency platform this cryptocurrency belongs to if it is a token, otherwise null.</td></tr>
<tr><td>numberOfMarketPairs</td><td>Integer</td><td>The number of active trading pairs available for this cryptocurrency across supported exchanges.</td></tr>
<tr><td>disabled</td><td>Boolean</td><td>Technical status of a record. Mostly set to "false".</td></tr>
<tr><td>source</td><td>String</td><td>The data provider ID.</td></tr>
<tr><td colspan="3"><strong>Extension fields</strong></td></tr>
<tr><td>tags</td><td>String</td><td>Array of tags associated with this cryptocurrency.</td></tr>
</table>

## Crypto Summary

The Crypto Summary endpoints are used for querying the information about crypto instruments that is updated on a daily basis, e.g., market capitalization.

<table>
<tr><th>Attribute name</th><th>Data type</th><th>Description</th></tr>
<tr><td colspan="3"><strong>Fixed fields</strong></td></tr>
<tr><td>ymd</td><td>Integer</td><td>Year, month and date of the last time when this cryptocurrency's market data was updated.</td></tr>
<tr><td>eventTime</td><td>Long</td><td>The timestamp when the event has been registered in the dxFeed system.</td></tr>
<tr><td>dxSymbol</td><td>String</td><td>A combination of characters representing a cryptocurrency. It is based on ticker. It is important to note that with the rapid growth of the crypto ecosystem, some tokens appear to have the same tickers, and therefore the same symbols, as others. For example, Wrapped Bitcoin (WBTC) and WorldBTC (WBTC). We encourage using the sid in your requests since the sid is strictly unique. You can first request the crypto-reference controller using dxSymbol, then choose the necessary cryptocurrency with the help of assetName, and use its sid. Another option is using srcRank or marketCap from the crypto-summary controller to select the most popular cryptocurrency among the ones with the same dxSymbol.</td></tr>
<tr><td>sid</td><td>String</td><td>The internal security ID. Unique across all data providers.</td></tr>
<tr><td>time</td><td>Long</td><td>Timestamp of the last time when this cryptocurrency's market data was updated.</td></tr>
<tr><td>marketCap</td><td>Double</td><td>Market capitalization in USD. Calculated as latest trade price x circulating supply</td></tr>
<tr><td>marketCapDominance</td><td>Double</td><td>Market cap dominance in USD.</td></tr>
<tr><td>marketCapByTotalSupply</td><td>Double</td><td>The market cap by total supply.</td></tr>
<tr><td>fullyDilutedMarketCap</td><td>Double</td><td>Fully diluted market cap in USD.</td></tr>
<tr><td>maxSupply</td><td>Double</td><td>Our best approximation of the maximum amount of coins that will ever exist in the lifetime of the currency.</td></tr>
<tr><td>circulatingSupply</td><td>Double</td><td>Approximate number of coins currently in circulation.</td></tr>
<tr><td>totalSupply</td><td>Double</td><td>Approximate total amount of coins in existence right now (minus any coins that have been verifiably burned).</td></tr>
<tr><td>tvl</td><td>Double</td><td>Total Value Locked.</td></tr>
<tr><td>tvlRatio</td><td>Double</td><td>Percentage of Total Value Locked.</td></tr>
<tr><td>volume24h</td><td>Double</td><td>Trading volume in USD for the rolling 24 hours.</td></tr>
<tr><td>volumeChange24h</td><td>Double</td><td>Change in the volume in USD for the rolling 24 hours.</td></tr>
<tr><td>pricePercentChange24h</td><td>Double</td><td>Percentage change in the trading price in USD for the rolling 24 hours.</td></tr>
<tr><td>disabled</td><td>Boolean</td><td>Technical status of a record. Mostly set to "false".</td></tr>
<tr><td>source</td><td>String</td><td>The data provider ID.</td></tr>
<tr><td colspan="3"><strong>Extension fields</strong></td></tr>
<tr><td>percentPriceChange90d</td><td>String</td><td>90 day trading price percentage change in USD.</td></tr>
<tr><td>percentPriceChange1h</td><td>String</td><td>Deprecated. 1 hour trading price percentage change in USD.</td></tr>
<tr><td>percentPriceChange30d</td><td>String</td><td>30 day trading price percentage change in USD.</td></tr>
<tr><td>volume30d</td><td>String</td><td>Rolling 30 day adjusted volume in USD.</td></tr>
<tr><td>volume7d</td><td>String</td><td>Rolling 7 day adjusted volume in USD.</td></tr>
<tr><td>percentPriceChange60d</td><td>String</td><td>60 day trading price percentage change in USD.</td></tr>
<tr><td>srcRank</td><td>String</td><td>Ranking of cryptocurrencies, where srcRank=1 corresponds to the most popular cryptocurrency (Bitcoin), and higher values correspond to less popular cryptocurrencies. Mostly is based on the market capitalization and trading volume for each cryptocurrency. Among cryptocurrencies with the same dxSymbol, srcRank can be used to distinguish between the most popular currency and its small clones that use the same ticker.</td></tr>
<tr><td>percentPriceChange7d</td><td>String</td><td>7 day trading price percentage change in USD.</td></tr>
</table>

## Earning

The Earning endpoints are used for querying the schedule of a company’s earnings releases, including estimated and actual EPS values.

<table>
<tr><th>Attribute name</th><th>Data type</th><th>Description</th></tr>
<tr><td colspan="3"><strong>Fixed fields</strong></td></tr>
<tr><td>ymd</td><td>Integer</td><td>The effective date of the reported data.</td></tr>
<tr><td>eventTime</td><td>Long</td><td>The timestamp when the event has been registered in the dxFeed system.</td></tr>
<tr><td>dxSymbol</td><td>String</td><td>A unique combination of characters representing a security on a stock exchange. Follows dxFeed symbology.</td></tr>
<tr><td>sid</td><td>String</td><td>The internal security ID. Unique across all data providers.</td></tr>
<tr><td>cid</td><td>String</td><td>The internal company ID. Unique across all data providers.</td></tr>
<tr><td>referencePeriod</td><td>String</td><td>The fiscal time frame associated with a specific event. Combination of numerical values and letters. For example, 'Q1 2025' represents the first quarter of fiscal year 2025 for a specific company.</td></tr>
<tr><td>announceType</td><td>String</td><td>The category of a company event, such as "CONFERENCE_CALL", or "RELEASE".</td></tr>
<tr><td>eps</td><td>Double</td><td>The actual EPS value announced by the company. Based on data availability, it is determined using the following priority order: "adjustedDilutedEpsPreliminary", "reportedDilutedEpsPreliminary", "reportedDilutedEpsFinal", or "adjustedDilutedEpsFinal".</td></tr>
<tr><td>reportedDilutedEpsFinal</td><td>Double</td><td>Diluted EPS calculated according to GAAP, as reported in finalized financial statements (report_sub_type: R or A).</td></tr>
<tr><td>adjustedDilutedEpsFinal</td><td>Double</td><td>Non-GAAP diluted EPS reported in finalized financial statements (report_sub_type: R or A). Adjusted EPS excludes specific expenses or incomes to provide a normalized earnings figure, offering a clearer view of the company’s performance. For instance, significant one-time expenses required under GAAP are removed to better reflect ongoing business operations and value.</td></tr>
<tr><td>reportedDilutedEpsPreliminary</td><td>Double</td><td>Diluted earnings per share (EPS) calculated according to GAAP, as reported in preliminary financial statements (report_sub_type: P).</td></tr>
<tr><td>adjustedDilutedEpsPreliminary</td><td>Double</td><td>Non-GAAP diluted EPS reported in preliminary financial statements (report_sub_type: P). Adjusted EPS excludes specific expenses or incomes to provide a normalized earnings figure, offering a clearer view of the company’s performance. For instance, significant one-time expenses required under GAAP are removed to better reflect ongoing business operations and value.</td></tr>
<tr><td>estimatedEPS</td><td>Double</td><td>Estimated EPS value from the Consensus Estimate data (reportedEPSMedian or adjustedEPSMedian if the reported value is not available).</td></tr>
<tr><td>announceTime</td><td>String</td><td>The timing of the company announcement. Can take one of the following values: "PRE_MARKET" refers to the announcement before the market open. "POST_MARKET" refers to announcement after the market close. "UNKNOWN" indicates that there is no data available, or the announcement is made during market hours.</td></tr>
<tr><td>startTime</td><td>Long</td><td>The kick-off time of a company event. If corresponds to "00:00" in the GMT time zone, it means that the event's start time is unknown and was not provided by the data provider.</td></tr>
<tr><td>endTime</td><td>Long</td><td>The time when a company event is finished.</td></tr>
<tr><td>status</td><td>String</td><td>The status of an event. It is "CONFIRMED" for past events and for future events with an announced date. If there's no announced date for a future event, the status is "ESTIMATED" based on the previous year's event.</td></tr>
<tr><td>currencyCode</td><td>String</td><td>Currency in which the amounts in this controller are expressed. ISO three-character code.</td></tr>
<tr><td>disabled</td><td>Boolean</td><td>Technical status of a record. Mostly set to "false".</td></tr>
<tr><td>source</td><td>String</td><td>The data provider ID.</td></tr>
<tr><td colspan="3"><strong>Extension fields</strong></td></tr>
<tr><td>eventUrl</td><td>String</td><td>The web link for the event.</td></tr>
</table>

## Earning Ratio

The Earning Ratio endpoints are used for querying a set of growth metrics of a company’s performance over a specified period. CurrencyCode is not published here since all values in this controller are ratio based values, not expressed in any currency.

<table>
<tr><th>Attribute name</th><th>Data type</th><th>Description</th></tr>
<tr><td colspan="3"><strong>Fixed fields</strong></td></tr>
<tr><td>ymd</td><td>Integer</td><td>The end date of the reporting period. Typically, it falls on the last day of the quarter.</td></tr>
<tr><td>eventTime</td><td>Long</td><td>The timestamp when the event has been registered in the dxFeed system.</td></tr>
<tr><td>dxSymbol</td><td>String</td><td>A unique combination of characters representing a security on a stock exchange. Follows dxFeed symbology.</td></tr>
<tr><td>sid</td><td>String</td><td>The internal security ID. Unique across all data providers.</td></tr>
<tr><td>period</td><td>String</td><td>Represents time period related to the data, e.g., the end of a quarter or fiscal year for the financial statements. Combination of numerical values and letters. For example, '10M' represents a duration of 10 months, while '1Y' represents a duration of 1 year.</td></tr>
<tr><td>reportType</td><td>String</td><td>A type of the relevant report which takes values "AOR" (As Originally Reported) or "RESTATED" in case of a company corrects data from previous reports. For more detailed typing, refer to a "reportSubType" field.</td></tr>
<tr><td>reportSubType</td><td>String</td><td>Further typing for the "reportType" field, takes the following values: "P" indicates that the financial information is preliminary and subject to change. "A" indicates that the financial information is considered final and has been reviewed and adjusted as necessary. "R" indicates that one or more of a company's previous financial statements have been revised to correct an error, and the information is considered final. "TTM" indicates that the financial information covers the trailing 12 months, whether it is originally reported or restated.</td></tr>
<tr><td>normalizedBasicEPSGrowth</td><td>Double</td><td>The rate at which a company’s normalized basic EPS is increasing or decreasing, expressed as a percentage.</td></tr>
<tr><td>disabled</td><td>Boolean</td><td>Technical status of a record. Mostly set to "false".</td></tr>
<tr><td>source</td><td>String</td><td>The data provider ID.</td></tr>
<tr><td colspan="3"><strong>Extension fields</strong></td></tr>
<tr><td>fiscalYearEndMonth</td><td>String</td><td>A numerical representation of the month that marks the end of a company's fiscal year. For instance, "fiscalYearEndMonth" = 9, indicates that the fiscal year ends in September.</td></tr>
</table>

## Earning Report

The Earning Report endpoints are used for querying a company’s earning report data, in particular metrics related to earnings and distributions on a per-share basis, e.g., EPS (incl. basic, diluted, normalized), DPS.

<table>
<tr><th>Attribute name</th><th>Data type</th><th>Description</th></tr>
<tr><td colspan="3"><strong>Fixed fields</strong></td></tr>
<tr><td>ymd</td><td>Integer</td><td>The end date of the reporting period. Typically, it falls on the last day of the quarter.</td></tr>
<tr><td>eventTime</td><td>Long</td><td>The timestamp when the event has been registered in the dxFeed system.</td></tr>
<tr><td>dxSymbol</td><td>String</td><td>A unique combination of characters representing a security on a stock exchange. Follows dxFeed symbology.</td></tr>
<tr><td>sid</td><td>String</td><td>The internal security ID. Unique across all data providers.</td></tr>
<tr><td>period</td><td>String</td><td>Represents time period related to the data, e.g., the end of a quarter or fiscal year for the financial statements. Combination of numerical values and letters. For example, '10M' represents a duration of 10 months, while '1Y' represents a duration of 1 year.</td></tr>
<tr><td>reportType</td><td>String</td><td>A type of the relevant report which takes values "AOR" (acronym for As Originally Reported) or "RESTATED" in case of a company corrects data from previous reports. For more detailed typing, refer to a "reportSubType" field.</td></tr>
<tr><td>reportSubType</td><td>String</td><td>Further typing for the "reportType" field takes the following values: "P" indicates that the financial information is preliminary and subject to change."A" indicates that the financial information is considered final and has been reviewed and adjusted as necessary."R"indicates that one or more of a company's previous financial statements have been revised to correct an error, and the information is considered final. "TTM" indicates that the financial information covers the trailing 12 months, whether it is originally reported or restated.</td></tr>
<tr><td>currencyCode</td><td>String</td><td>Currency in which the amounts in this controller are expressed. ISO three-character code.</td></tr>
<tr><td>DPS</td><td>Double</td><td>Dividend per share is a financial metric used to measure the dividends a company pays to its shareholders on a per-share basis. DPS = total dividend payment/total number of shares outstanding.</td></tr>
<tr><td>totalDPS</td><td>Double</td><td>Total dividend per share is a similar to "DPS", but includes into the calculation the special, one-time dividends.</td></tr>
<tr><td>basicEPS</td><td>Double</td><td>Basic Earnings Per Share is a financial metric that represents the portion of a company's profit attributable to each outstanding share of its common stock. basicEPS = (Net Income - Preferred Dividends)/ Weighted Average Number of Common Shares Outstanding.</td></tr>
<tr><td>dilutedEPS</td><td>Double</td><td>Diluted Earnings Per Share is a financial metric that measures the potential impact of the conversion of dilutive securities, such as stock options, convertible bonds, or stock warrants, on a company's earnings per share. dilutedEPS = (Net Income - Preferred Dividends)/ Weighted Average Number of Diluted Common Shares Outstanding</td></tr>
<tr><td>normalizedBasicEPS</td><td>Double</td><td>Normalized Basic Earnings Per Share refers to "basicEPS" that has been adjusted to account for unusual or non-recurring items, providing a clearer picture of a company's ongoing or core profitability. normalizedBasicEPS = Normalized Earnings / Basic Weighted Average Shares Outstanding</td></tr>
<tr><td>normalizedDilutedEPS</td><td>Double</td><td>Normalized Diluted Earnings Per Share refers to "dilutedEPS" that has been adjusted to remove one-time and unusual items, to provide investors with a more accurate measure of the company's true earnings. normalizedDiltuedEPS = Normalized Earnings / Diluted Weighted Average Shares Outstanding.</td></tr>
<tr><td>reportedNormalizedBasicEPS</td><td>Double</td><td>Reported Normalized Basic Earning Per Share refers to "normalizedBasicEPS" as reported by the company in the financial statements.</td></tr>
<tr><td>reportedNormalizedDilutedEPS</td><td>Double</td><td>Reported Normalized Diluted Earning Per Share refers to "normalizedDilutedEPS" as reported by the company in the financial statements.</td></tr>
<tr><td>filingDate</td><td>String</td><td>The date on which the company officially submitted the financial report with the relevant regulatory authority.</td></tr>
<tr><td>disabled</td><td>Boolean</td><td>Technical status of a record. Mostly set to "false".</td></tr>
<tr><td>source</td><td>String</td><td>The data provider ID.</td></tr>
<tr><td colspan="3"><strong>Extension fields</strong></td></tr>
<tr><td>fiscalYearEndMonth</td><td>String</td><td>A numerical representation of the month that marks the end of a company's fiscal year. For instance, "fiscalYearEndMonth" = 9, indicates that the fiscal year ends in September.</td></tr>
</table>

## Economic Calendar

The Economic Calendar endpoints are used for querying the schedule of significant economic events and indicators that may affect market movements. The data is not related to a particular instrument but to the market as a whole.

<table>
<tr><th>Attribute name</th><th>Data type</th><th>Description</th></tr>
<tr><td colspan="3"><strong>Fixed fields</strong></td></tr>
<tr><td>ymd</td><td>Integer</td><td>The date of a release of an economic event or indicator.</td></tr>
<tr><td>eventTime</td><td>Long</td><td>The timestamp when the event has been registered in the dxFeed system.</td></tr>
<tr><td>dxSymbol</td><td>String</td><td>A unique combination of characters representing economic event or indicator.</td></tr>
<tr><td>sid</td><td>String</td><td>The internal event ID. Unique across all data providers.</td></tr>
<tr><td>srcType</td><td>String</td><td>A type of an economic event or indicator.</td></tr>
<tr><td>subType</td><td>String</td><td>A subtype of an economic event or indicator.</td></tr>
<tr><td>countryCode</td><td>String</td><td>ISO 3-letter country code representing the country of an economic event or indicator.</td></tr>
<tr><td>type</td><td>String</td><td>To be deleted.</td></tr>
<tr><td>currencyCode</td><td>String</td><td>Currency in which the amounts in this controller are expressed. ISO three-character code.</td></tr>
<tr><td>actual</td><td>String</td><td>The actual value of an economic event or indicator at a particular point-in-time or period after the revision (if applicable).</td></tr>
<tr><td>consensus</td><td>String</td><td>A data provider's own projections about the value of an economic event or indicator.</td></tr>
<tr><td>forecast</td><td>String</td><td>An average forecasted value of an economic event or indicator collected from a representative group of economists.</td></tr>
<tr><td>revised</td><td>String</td><td>A value of an economic event or indicator for the previous period, before the revision.</td></tr>
<tr><td>unit</td><td>String</td><td>A unit of value for an economic event or indicator.</td></tr>
<tr><td>srcReferencePeriod</td><td>String</td><td>Represents the time period related to the data in abbreviated format. Economic indicators can be periodic which are reported over specific time period, or point-in-time which are relevant at a specific point in time, usually the date of the effective measurement.</td></tr>
<tr><td>referenceTime</td><td>Long</td><td>Same as srcReferencePeriod, but indicates the exact date and time when the economic indicator is relevant.</td></tr>
<tr><td>srcTime</td><td>Long</td><td>The date and time of a release of an economic event or indicator.</td></tr>
<tr><td>importance</td><td>String</td><td>An importance level which a data provider has assigned to an event, that can take one of the following values: "LOW", "MEDIUM", "HIGH".</td></tr>
<tr><td>disabled</td><td>Boolean</td><td>Technical status of a record. Mostly set to "false".</td></tr>
<tr><td>source</td><td>String</td><td>The data provider ID.</td></tr>
<tr><td colspan="3"><strong>Extension fields</strong></td></tr>
<tr><td>calendarId</td><td>String</td><td>A unique ID of the record used by a data provider.</td></tr>
<tr><td>previous</td><td>String</td><td>A value of an economic event or indicator for the previous period, after the revision (if applicable).</td></tr>
<tr><td>eventUrl</td><td>String</td><td>An event hyperlink from a data provider.</td></tr>
<tr><td>eventSource</td><td>String</td><td>The source of an economic event or indicator.</td></tr>
<tr><td>srcUpdateTime</td><td>String</td><td>The date and time when a record was inserted or changed from a data provider.</td></tr>
</table>

## Historical Return

The Historical Return endpoints are used for querying the historical return data for a particular instrument over a period.

<table>
<tr><th>Attribute name</th><th>Data type</th><th>Description</th></tr>
<tr><td colspan="3"><strong>Fixed fields</strong></td></tr>
<tr><td>ymd</td><td>Integer</td><td>The effective date of the reported data.</td></tr>
<tr><td>eventTime</td><td>Long</td><td>The timestamp when the event has been registered in the dxFeed system.</td></tr>
<tr><td>dxSymbol</td><td>String</td><td>A unique combination of characters representing a security on a stock exchange. Follows dxFeed symbology.</td></tr>
<tr><td>sid</td><td>String</td><td>The internal security ID. Unique across all data providers.</td></tr>
<tr><td>period</td><td>String</td><td>Represents time period related to the data, e.g., the end of a quarter or fiscal year for the financial statements. Combination of numerical values and letters. For example, '10M' represents a duration of 10 months, while '1Y' represents a duration of 1 year.</td></tr>
<tr><td>totalReturn</td><td>Double</td><td>The total return that an investment produced over a specific period, including dividends received. The value is expressed as a percentage of the amount invested.</td></tr>
<tr><td>ext</td><td>String</td><td></td></tr>
<tr><td>disabled</td><td>Boolean</td><td>Technical status of a record. Mostly set to "false".</td></tr>
<tr><td>source</td><td>String</td><td>The data provider ID.</td></tr>
</table>

## Income Statement

The Income Statement endpoints are used for querying a company’s income statement data. Income statement represents a company’s revenues and expenses during a particular period.

<table>
<tr><th>Attribute name</th><th>Data type</th><th>Description</th></tr>
<tr><td colspan="3"><strong>Fixed fields</strong></td></tr>
<tr><td>ymd</td><td>Integer</td><td>The end date of the reporting period. Typically, it falls on the last day of the quarter.</td></tr>
<tr><td>eventTime</td><td>Long</td><td>The timestamp when the event has been registered in the dxFeed system.</td></tr>
<tr><td>dxSymbol</td><td>String</td><td>A unique combination of characters representing a security on a stock exchange. Follows dxFeed symbology.</td></tr>
<tr><td>sid</td><td>String</td><td>The internal security ID. Unique across all data providers.</td></tr>
<tr><td>cid</td><td>String</td><td>The internal company ID. Unique across all data providers.</td></tr>
<tr><td>period</td><td>String</td><td>Represents time period related to the data, e.g., the end of a quarter or fiscal year for the financial statements. Combination of numerical values and letters. For example, '10M' represents a duration of 10 months, while '1Y' represents a duration of 1 year.</td></tr>
<tr><td>reportType</td><td>String</td><td>A type of the relevant report which takes values "AOR" (acronym for As Originally Reported) or "RESTATED" in case of a company corrects data from previous reports. For more detailed typing, refer to a "reportSubType" field.</td></tr>
<tr><td>reportSubType</td><td>String</td><td>Further typing for the "reportType" field takes the following values: "P" Indicates that the financial information is preliminary and subject to change. "A" indicates that the financial information is considered final and has been reviewed and adjusted as necessary."R" indicates that one or more of a company's previous financial statements have been revised to correct an error, and the information is considered final. "TTM" indicates that the financial information covers the trailing 12 months, whether it is originally reported or restated.</td></tr>
<tr><td>currencyCode</td><td>String</td><td>Currency in which the amounts in this controller are expressed. ISO three-character code.</td></tr>
<tr><td>netIncome</td><td>Double</td><td>The line item of the income statement that represents the total profit or loss a company has earned during a specific period after all expenses and revenues have been accounted for. It includes all of the company's continuing and discontinued operations, as well as any other income or charges, such as extraordinary items, accounting changes, tax loss carry forwards, and other gains and losses.</td></tr>
<tr><td>totalRevenue</td><td>Double</td><td>The line item of the income statement that represents the total amount of income the company earns from its business operations, before deducting any expenses, taxes, or other costs.</td></tr>
<tr><td>grossProfit</td><td>Double</td><td>The profit a company makes after deducting the costs associated with producing and selling its products or the costs associated with its services.</td></tr>
<tr><td>operatingIncome</td><td>Double</td><td>Income derived from regular business operations, calculated by subtracting the cost of revenue and operating expenses. This figure excludes income generated from any investment activities.</td></tr>
<tr><td>operatingExpense</td><td>Double</td><td>Operating expenses encompass the main recurring expenditures related to central operations, excluding the cost of goods sold, incurred to facilitate sales generation.</td></tr>
<tr><td>filingDate</td><td>String</td><td>The date on which the company officially submitted the financial report with the relevant regulatory authority.</td></tr>
<tr><td>disabled</td><td>Boolean</td><td>Technical status of a record. Mostly set to "false".</td></tr>
<tr><td>source</td><td>String</td><td>The data provider ID.</td></tr>
<tr><td colspan="3"><strong>Extension fields</strong></td></tr>
<tr><td>ebit</td><td>String</td><td>The line item of the income statement that represents Earnings Before Interest and Taxes. It is a measure of a company's operating profitability and is calculated by subtracting operating expenses, excluding interest and taxes, from its total revenue.</td></tr>
<tr><td>ebitda</td><td>String</td><td>The line item of the income statement that represents Earnings Before Interest, Taxes, Depreciation, and Amortization. It is a measure of a company's operating performance and is calculated by subtracting operating expenses, excluding interest, taxes, depreciation, and amortization from its total revenue.</td></tr>
<tr><td>fiscalYearEndMonth</td><td>String</td><td>A numerical representation of the month that marks the end of a company's fiscal year. For instance, "fiscalYearEndMonth" = 9, indicates that the fiscal year ends in September.</td></tr>
</table>

## Insider Ownership Summary

The Insider Ownership Summary endpoints are used for querying the periodic information of how the company insiders are involved with an instrument, including the ownership details, and trading activities.

<table>
<tr><th>Attribute name</th><th>Data type</th><th>Description</th></tr>
<tr><td colspan="3"><strong>Fixed fields</strong></td></tr>
<tr><td>ymd</td><td>Integer</td><td>The effective date of the reported data.</td></tr>
<tr><td>eventTime</td><td>Long</td><td>The timestamp when the event has been registered in the dxFeed system.</td></tr>
<tr><td>dxSymbol</td><td>String</td><td>A unique combination of characters representing a security on a stock exchange. Follows dxFeed symbology.</td></tr>
<tr><td>sid</td><td>String</td><td>The internal security ID. Unique across all data providers.</td></tr>
<tr><td>insiderSharesHeld</td><td>Double</td><td>The total number of shares of the company's stock that are held by the company's insiders.</td></tr>
<tr><td>insiderPercentHeld</td><td>Double</td><td>The percentage of shares of the company's stock that are held by the company's insiders.</td></tr>
<tr><td>insiderSharesBought</td><td>Double</td><td>The total number of shares of the company's stock that were bought by the company's insiders in a given time period.</td></tr>
<tr><td>insiderSharesSold</td><td>Double</td><td>The number of shares of the company's stock that were sold by the company's insiders during a given time period.</td></tr>
<tr><td>insiderNumberOfBuys</td><td>Double</td><td>The number of times the insiders purchased shares of their company's stock within a given time period.</td></tr>
<tr><td>insiderNumberOfSells</td><td>Double</td><td>The number of times the insiders sold shares of their company's stock within a given time period.</td></tr>
<tr><td>ext</td><td>String</td><td></td></tr>
<tr><td>disabled</td><td>Boolean</td><td>Technical status of a record. Mostly set to "false".</td></tr>
<tr><td>source</td><td>String</td><td>The data provider ID.</td></tr>
</table>

## Institutional Ownership Summary

The Institutional Ownership Summary endpoints are used for querying the periodic information of how the institutional owners are involved with an instrument, including the ownership details, and trading activities.

<table>
<tr><th>Attribute name</th><th>Data type</th><th>Description</th></tr>
<tr><td colspan="3"><strong>Fixed fields</strong></td></tr>
<tr><td>ymd</td><td>Integer</td><td>The effective date of the reported data.</td></tr>
<tr><td>eventTime</td><td>Long</td><td>The timestamp when the event has been registered in the dxFeed system.</td></tr>
<tr><td>dxSymbol</td><td>String</td><td>A unique combination of characters representing a security on a stock exchange. Follows dxFeed symbology.</td></tr>
<tr><td>sid</td><td>String</td><td>The internal security ID. Unique across all data providers.</td></tr>
<tr><td>institutionSharesHeld</td><td>Double</td><td>The total number of shares of the company's stock that are held by institutions.</td></tr>
<tr><td>institutionPercentHeld</td><td>Double</td><td>The percentage of shares of the company's stock that are held by institutions.</td></tr>
<tr><td>institutionSharesBought</td><td>Double</td><td>The total number of shares of the company's stock that were bought by institutions in a given time period.</td></tr>
<tr><td>institutionSharesSold</td><td>Double</td><td>The number of shares of the company's stock that were sold by institutions during a given time period.</td></tr>
<tr><td>institutionNumberOfHolders</td><td>Double</td><td>The number of institutions that hold shares of the company's stock.</td></tr>
<tr><td>ext</td><td>String</td><td></td></tr>
<tr><td>disabled</td><td>Boolean</td><td>Technical status of a record. Mostly set to "false".</td></tr>
<tr><td>source</td><td>String</td><td>The data provider ID.</td></tr>
</table>

## Instrument Daily Summary

The Instrument Daily Summary endpoints are used for querying additional information about a particular instrument that is updated on a daily basis, e.g., market capitalization or enterprise value. The amounts in this controller are expressed in the currency presented in the Instrument Reference controller.

<table>
<tr><th>Attribute name</th><th>Data type</th><th>Description</th></tr>
<tr><td colspan="3"><strong>Fixed fields</strong></td></tr>
<tr><td>ymd</td><td>Integer</td><td>The effective date of the reported data.</td></tr>
<tr><td>eventTime</td><td>Long</td><td>The timestamp when the event has been registered in the dxFeed system.</td></tr>
<tr><td>dxSymbol</td><td>String</td><td>A unique combination of characters representing a security on a stock exchange. Follows dxFeed symbology.</td></tr>
<tr><td>sid</td><td>String</td><td>The internal security ID. Unique across all data providers.</td></tr>
<tr><td>marketCap</td><td>Double</td><td>A financial measure that reflects the total value of a company's common shares available for trading on the stock market. This value is calculated by multiplying the current market price per share by the total number of outstanding common shares. For companies with ADR share classes, Market Cap is calculated as the price multiplied by the ordinary shares outstanding divided by the ADR ratio.</td></tr>
<tr><td>enterpriseValue</td><td>Double</td><td>A financial metric that represents the theoretical value of a company if it were to be acquired by another business entity. It takes into account the market capitalization (market cap) of the company as well as its outstanding debt and other financial obligations.</td></tr>
<tr><td>ext</td><td>String</td><td></td></tr>
<tr><td>disabled</td><td>Boolean</td><td>Technical status of a record. Mostly set to "false".</td></tr>
<tr><td>source</td><td>String</td><td>The data provider ID.</td></tr>
</table>

## Instrument Reference

The Instrument Reference endpoints are used for querying instruments covered by the Fundamentals API, including general information about each instrument.

<table>
<tr><th>Attribute name</th><th>Data type</th><th>Description</th></tr>
<tr><td colspan="3"><strong>Fixed fields</strong></td></tr>
<tr><td>eventTime</td><td>Long</td><td>The timestamp when the event has been registered in the dxFeed system.</td></tr>
<tr><td>dxSymbol</td><td>String</td><td>A unique combination of characters representing a security on a stock exchange. Follows dxFeed symbology.</td></tr>
<tr><td>sid</td><td>String</td><td>The internal security ID. Unique across all data providers.</td></tr>
<tr><td>cid</td><td>String</td><td>The internal company ID. Unique across all data providers.</td></tr>
<tr><td>companyStatus</td><td>String</td><td>A classification assigned to each company, indicating whether its shares are publicly traded and its current operating status. This classification can take one of the following values: Public ("U"): The company is currently operating and has at least one common share class that is currently trading on a public exchange. Private ("V"): The company is currently operating, but does not have any common share classes currently trading on a public exchange. Obsolete ("O"): The company is no longer operating because it has closed its business or has been acquired.</td></tr>
<tr><td>cik</td><td>String</td><td>The Central Index Key (CIK) is a unique corporate identifier assigned by the Securities and Exchange Commission (SEC).</td></tr>
<tr><td>countryCode</td><td>String</td><td>ISO 3-letter country code that represents the country where a firm is domiciled.</td></tr>
<tr><td>currencyCode</td><td>String</td><td>Currency in which the security is being traded. ISO three-character code.</td></tr>
<tr><td>ipoDate</td><td>String</td><td>The date on which a company's shares begin trading on a public exchange for the first time.</td></tr>
<tr><td>rawSymbol</td><td>String</td><td>A ticker symbol in a data provider's symbology.</td></tr>
<tr><td>srcExchange</td><td>String</td><td>A unique identifier that represents the stock exchange on which a particular share class is currently trading.</td></tr>
<tr><td>mic</td><td>String</td><td>Market Identification Code (MIC) is a unique four-letter code used to identify exchanges, trading platforms, and other regulated financial marketplaces globally.</td></tr>
<tr><td>cusip</td><td>String</td><td>This field is not populated for selected data provider.</td></tr>
<tr><td>subType</td><td>String</td><td>The classification of securities present in the equity database. In most cases, this value remains an empty string for standard common shares. However, for a small number of share classes, it may indicate "Participating Preferred," "Closed End Fund," "Foreign Share," or "Foreign Participated Preferred." These categories signify our partial inclusion of these specific security types in our equity database.</td></tr>
<tr><td>disabled</td><td>Boolean</td><td>Technical status of a record. Mostly set to "false".</td></tr>
<tr><td>source</td><td>String</td><td>The data provider ID.</td></tr>
<tr><td colspan="3"><strong>Extension fields</strong></td></tr>
<tr><td>isPrimaryShare</td><td>String</td><td>The indicator shows if the specified share is the primary share of the company. "TRUE" indicates it's the primary share, while "FALSE" indicates it's not. The primary share is the first share issued during IPO and still traded. If not traded, it is identified as the share with the highest volume.</td></tr>
<tr><td>legalNameLanguageCode</td><td>String</td><td>The ISO code is used to represent the language of a text containing a foreign legal name of a company.</td></tr>
<tr><td>shareClassStatus</td><td>String</td><td>A status classification for shares at the ShareClass level: Active ("A"): The share class is currently trading in a public market, and fundamental data is available. Deactive ("D"): The share class was once Active, but is no longer trading due to the share being delisted from the exchange. Inactive ("I"): The share class is currently trading in a public market, but no fundamental data is available. Obsolete ("O"): The share class was once Inactive, but is no longer trading due to the share being delisted from the exchange.</td></tr>
<tr><td>tradingStatus</td><td>String</td><td>The indicator displays "TRUE" when a security’s trading has been suspended, and "FALSE" when not.</td></tr>
<tr><td>exchangeSubMarketGlobalId</td><td>String</td><td>A categorization that indicates various tiers of marketplaces within a stock exchange.</td></tr>
<tr><td>isDepositaryReceipt</td><td>String</td><td>The indicator shows "TRUE" when the share class is a depository receipt, either the American Depository Receipt (ADR) or the Global Depositary Receipt (GDR), and "FALSE" when it is not.</td></tr>
<tr><td>isDirectInvest</td><td>String</td><td>The indicator displays "TRUE" when direct investment plans (DIPs) are available, allowing individual investors to purchase stocks without the need for a stockbroker. It displays "FALSE" when DIPs are not available.</td></tr>
<tr><td>ipoOfferPriceRange</td><td>String</td><td>An estimated range of prices, from low to high, during an initial public offering (IPO). This field is used until the final IPO price becomes available and is populated in the data field "IPOPrice".</td></tr>
<tr><td>legalName</td><td>String</td><td>The complete name of the registrant as stated in its charter, usually located on the cover page of the 10K/10Q/20F report.</td></tr>
<tr><td>advisor</td><td>String</td><td>The official name of the current Company's Legal Advisor.</td></tr>
<tr><td>advisorLanguageCode</td><td>String</td><td>The ISO code is used to represent the language of the text containing the name and contact information for the Advisor.</td></tr>
<tr><td>fiscalYearEnd</td><td>String</td><td>The Month that marks the end of the company's most recent fiscal year</td></tr>
<tr><td>expectedFiscalYearEnd</td><td>String</td><td>The projected year-end for the company, which is estimated by adding one year to the current year-end as reported in the latest available annual report.</td></tr>
<tr><td>ipoOfferPrice</td><td>String</td><td>The price at which an issuer sells its shares during an initial public offering (IPO). This price is determined by the issuer and its underwriters</td></tr>
<tr><td>businessCountryId</td><td>String</td><td>A three-character ISO code designates the business country of a security based on factors such as incorporation, headquarters, exchange listing, trading volumes, revenue sources, and assets.</td></tr>
<tr><td>isLimitedLiabilityCompany</td><td>String</td><td>The indicator shows "TRUE" when a company is structured as a limited liability company (LLC), and "FALSE" when it is not.</td></tr>
<tr><td>yearOfEstablishment</td><td>String</td><td>The year in which the company was established.</td></tr>
<tr><td>conversionRatio</td><td>String</td><td>The relationship between the share class that was selected and the primary share class.</td></tr>
<tr><td>standardName</td><td>String</td><td>The English translation of the foreign legal name if applicable.</td></tr>
<tr><td>parValue</td><td>String</td><td>The face/nominal value assigned to a security by the issuing company.</td></tr>
<tr><td>delistingDate</td><td>String</td><td></td></tr>
<tr><td>auditor</td><td>String</td><td>The official name of the current Company's Auditor.</td></tr>
<tr><td>isDividendReinvest</td><td>String</td><td>The indicator shows "TRUE" when a shareholder election plan to reinvest cash dividend into additional shares is selected, and "FALSE" when it is not.</td></tr>
<tr><td>sedol</td><td>String</td><td>This field is not populated for selected data provider.</td></tr>
<tr><td>shareClassDescription</td><td>String</td><td>An additional information about a security, such as the share classes (A or B), whether it is an ADR, GDR, or a business development company (BDC). Also, this field offers more specific details about preferred share classes.</td></tr>
<tr><td>auditorLanguageCode</td><td>String</td><td>The ISO code is used to represent the language of the text containing the name and contact information for the Auditor.</td></tr>
<tr><td>isREIT</td><td>String</td><td>The indicator shows "TRUE" when a company is a real estate investment trust (REIT), and "FALSE" when it is not.</td></tr>
<tr><td>isLimitedPartnership</td><td>String</td><td>The indicator shows "TRUE" when a company is structured as a limited partnership (LP), and "FALSE" when it is not.</td></tr>
<tr><td>industryTemplateCode</td><td>String</td><td>This indicator identifies the applicable industry data collection template for the company, each of which includes commonly reported data elements specific to six industry categories: Manufacturing ("N"), Mining ("M"), Utility ("U"), Transportation ("T"), Bank ("B"), and Insurance ("I").</td></tr>
<tr><td>investmentId</td><td>String</td><td>An identifier assigned by the data provider to each security.</td></tr>
<tr><td>securityType</td><td>String</td><td>The classification for securities takes the following values: Common Stock (ST00000001), Preferred Stock (ST00000002), Warrants (ST00000008), and Units (ST000000A1).</td></tr>
<tr><td>reportStyle</td><td>String</td><td>The financial template used to collect a company's financial statements, where Style "1" is commonly used by US and Canadian companies, while style "3" is used by the rest of the world.</td></tr>
<tr><td>depositaryReceiptRatio</td><td>String</td><td>The quantity of common shares that support every American Depository Receipt that is traded.</td></tr>
<tr><td>delistingReason</td><td>String</td><td>The cause for a non-active security's removal from trading on an exchange.</td></tr>
<tr><td>shortName</td><td>String</td><td>The abbreviated name of the firm, which has a maximum of 25 characters.</td></tr>
<tr><td>isin</td><td>String</td><td>The International Securities Identification Number (ISIN) is a distinctive code utilized for identifying a particular securities issue. The allocation of ISINs within a country is the responsibility of its National Numbering Agency (NNA). Most countries have adopted the ISIN scheme as the recognized standard for identifying traded securities. However, in the United States and Canada, a comparable numbering system called the CUSIP number is primarily used.</td></tr>
</table>

## IPO Calendar

The IPO Calendar endpoints are used for querying information about IPO events. New securities are typically added shortly before their IPO date, once official listing and regulatory information becomes available. While the exact timing can vary, instruments are generally included as soon as pre-IPO details are confirmed and the security is scheduled for public listing.

<table>
<tr><th>Attribute name</th><th>Data type</th><th>Description</th></tr>
<tr><td colspan="3"><strong>Fixed fields</strong></td></tr>
<tr><td>ymd</td><td>Integer</td><td>The date when a company's shares first begin trading on a public exchange (IPO date). If the IPO date is not yet confirmed, a placeholder value is used. Dates in 2050 should be interpreted as 'IPO date not yet determined'.</td></tr>
<tr><td>eventTime</td><td>Long</td><td>The timestamp when the event has been registered in the dxFeed system.</td></tr>
<tr><td>dxSymbol</td><td>String</td><td>A unique combination of characters representing a security on a stock exchange. Follows dxFeed symbology.</td></tr>
<tr><td>sid</td><td>String</td><td>The internal security ID. Unique across all data providers.</td></tr>
<tr><td>cid</td><td>String</td><td>The internal company ID. Unique across all data providers.</td></tr>
<tr><td>offerPrice</td><td>Double</td><td>Same as ipoOfferPrice in instrument-reference.</td></tr>
<tr><td>offerPriceRange</td><td>String</td><td>Same as ipoOfferPriceRange in instrument-reference.</td></tr>
<tr><td>ext</td><td>String</td><td></td></tr>
<tr><td>disabled</td><td>Boolean</td><td>Technical status of a record. Mostly set to "false".</td></tr>
<tr><td>source</td><td>String</td><td>The data provider ID.</td></tr>
</table>

## Merger and Acquisition

The Merger and Acquisition endpoints are used for querying the information about merger and acquisition events.

<table>
<tr><th>Attribute name</th><th>Data type</th><th>Description</th></tr>
<tr><td colspan="3"><strong>Fixed fields</strong></td></tr>
<tr><td>ymd</td><td>Integer</td><td>A date of the merger event.</td></tr>
<tr><td>eventTime</td><td>Long</td><td>The timestamp when the event has been registered in the dxFeed system.</td></tr>
<tr><td>dxSymbol</td><td>String</td><td>A unique combination of characters representing a security on a stock exchange. Follows dxFeed symbology.</td></tr>
<tr><td>sid</td><td>String</td><td>The internal security ID. Unique across all data providers.</td></tr>
<tr><td>acquirerCid</td><td>String</td><td>A unique ID of the acquirer company.</td></tr>
<tr><td>role</td><td>String</td><td>The role assigned to the "dxSymbol" company in a transaction. Possible values are "ACQUIRER" or "TARGET".</td></tr>
<tr><td>targetCid</td><td>String</td><td>A unique ID of the target company.</td></tr>
<tr><td>acquirerDxSymbol</td><td>String</td><td>A ticker symbol in the dxFeed symbology of the acquirer company.</td></tr>
<tr><td>targetDxSymbol</td><td>String</td><td>The target company's ticker symbol, in dxFeed symbology.</td></tr>
<tr><td>shares</td><td>Double</td><td>The ratio that determines how the acquirer's shares align with the shares of the target company.</td></tr>
<tr><td>currencyCode</td><td>String</td><td>Currency in which the amounts in this controller are expressed. ISO three-character code.</td></tr>
<tr><td>cash</td><td>Double</td><td>A cash amount per share of the target company.</td></tr>
<tr><td>disabled</td><td>Boolean</td><td>Technical status of a record. Mostly set to "false".</td></tr>
<tr><td>source</td><td>String</td><td>The data provider ID.</td></tr>
<tr><td colspan="3"><strong>Extension fields</strong></td></tr>
<tr><td>notes</td><td>String</td><td>A field used to provide additional description of a transaction.</td></tr>
</table>

## Mutual Fund Ownership Summary

The Mutual Fund Ownership Summary endpoints are used for querying the periodic information on how funds are involved with an instrument, including the ownership details and trading activities.

<table>
<tr><th>Attribute name</th><th>Data type</th><th>Description</th></tr>
<tr><td colspan="3"><strong>Fixed fields</strong></td></tr>
<tr><td>ymd</td><td>Integer</td><td>The effective date of the reported data.</td></tr>
<tr><td>eventTime</td><td>Long</td><td>The timestamp when the event has been registered in the dxFeed system.</td></tr>
<tr><td>dxSymbol</td><td>String</td><td>A unique combination of characters representing a security on a stock exchange. Follows dxFeed symbology.</td></tr>
<tr><td>sid</td><td>String</td><td>The internal security ID. Unique across all data providers.</td></tr>
<tr><td>fundSharesHeld</td><td>Double</td><td>The total number of shares of the company's stock that are held by fund companies.</td></tr>
<tr><td>fundPercentHeld</td><td>Double</td><td>The percentage of shares of the company's stock that are held by fund companies.</td></tr>
<tr><td>fundSharesBought</td><td>Double</td><td>The total number of shares of the company's stock that were bought by fund companies in a given time period.</td></tr>
<tr><td>fundSharesSold</td><td>Double</td><td>The number of shares of the company's stock that were sold by fund companies during a given time period.</td></tr>
<tr><td>fundHolderNumber</td><td>Double</td><td>The number of fund companies that hold shares of the company's stock.</td></tr>
<tr><td>ext</td><td>String</td><td></td></tr>
<tr><td>disabled</td><td>Boolean</td><td>Technical status of a record. Mostly set to "false".</td></tr>
<tr><td>source</td><td>String</td><td>The data provider ID.</td></tr>
</table>

## Operation Ratio

The Operation Ratio endpoints are used for querying a set of financial ratios for assessing different aspects of a company’s health and performance. CurrencyCode is not published here since all values in this controller are ratio based values, not expressed in any currency.

<table>
<tr><th>Attribute name</th><th>Data type</th><th>Description</th></tr>
<tr><td colspan="3"><strong>Fixed fields</strong></td></tr>
<tr><td>ymd</td><td>Integer</td><td>The end date of the reporting period. Typically, it falls on the last day of the quarter.</td></tr>
<tr><td>eventTime</td><td>Long</td><td>The timestamp when the event has been registered in the dxFeed system.</td></tr>
<tr><td>dxSymbol</td><td>String</td><td>A unique combination of characters representing a security on a stock exchange. Follows dxFeed symbology.</td></tr>
<tr><td>sid</td><td>String</td><td>The internal security ID. Unique across all data providers.</td></tr>
<tr><td>cid</td><td>String</td><td>The internal company ID. Unique across all data providers.</td></tr>
<tr><td>period</td><td>String</td><td>Represents time period related to the data, e.g., the end of a quarter or fiscal year for the financial statements. Combination of numerical values and letters. For example, '10M' represents a duration of 10 months, while '1Y' represents a duration of 1 year.</td></tr>
<tr><td>reportType</td><td>String</td><td>A type of the relevant report which takes values "AOR" (acronym for As Originally Reported) or "RESTATED" in case of a company corrects data from previous reports. For more detailed typing, refer to a "reportSubType" field.</td></tr>
<tr><td>reportSubType</td><td>String</td><td>Further typing for the "reportType" field takes the following values: P: Indicates that the financial information is preliminary and subject to change."A" indicates that the financial information is considered final and has been reviewed and adjusted as necessary."R" indicates that one or more of a company's previous financial statements have been revised to correct an error, and the information is considered final."TTM" Indicates that the financial information covers the trailing 12 months, whether it is originally reported or restated.</td></tr>
<tr><td>totalRevenueGrowth</td><td>Double</td><td>The percentage increase in a company's revenue. This growth percentage is determined by analyzing the revenue data obtained from the company's Income Statement, which is reported in the company filings or reports.</td></tr>
<tr><td>netIncomeGrowth</td><td>Double</td><td>Net Income Growth is a financial metric that measures the percentage increase or decrease in a company's net income over a specified period.</td></tr>
<tr><td>roa</td><td>Double</td><td>Return on Assets (ROA), is a financial ratio that measures a company's profitability in relation to its total assets. To calculate ROA, divide Net Income by the Average Total Assets of the company.</td></tr>
<tr><td>roe</td><td>Double</td><td>Return on Equity (ROE) is a financial ratio that measures the profitability of a company by showing how much profit it generates in relation to the amount of shareholder equity. To calculate ROE, divide Net Income by Average Total Common Equity of a company.</td></tr>
<tr><td>grossMargin</td><td>Double</td><td>Gross Margin is a financial metric that measures a company's profitability by calculating the percentage of revenue remaining after subtracting the cost of goods sold (COGS). To calculate the Gross Margin, subtract COGS from total revenue and divide the result by total revenue.</td></tr>
<tr><td>operatingMargin</td><td>Double</td><td>Operating Margin is a financial ratio that indicates the profitability of a company's core business operations. To calculate Operating Margin, divide Operating Income by Revenue of a company.</td></tr>
<tr><td>netMargin</td><td>Double</td><td>Net Margin is a financial ratio that measures the percentage of revenue that remains as net income after deducting all expenses. To calculate Net Margin, divide Net Income by Revenue of a company.</td></tr>
<tr><td>normalizedNetProfitMargin</td><td>Double</td><td>Normalized Net Profit Margin is a financial metric that measures a company's profitability. To calculate the metric, divide the normalized income by the total revenue.</td></tr>
<tr><td>inventoryTurnover</td><td>Double</td><td>Inventory Turnover is a financial metric that measures how efficiently a company manages its inventory by calculating the number of times it sells and replaces its inventory during a given period. To calculate Inventory Turnover, divide the cost of goods sold (COGS) by the average inventory value during the same period.</td></tr>
<tr><td>assetsTurnover</td><td>Double</td><td>The asset turnover ratio measures the value of a company's sales or revenues relative to the value of its assets. To calculate Assets Turnover, divide the total revenue generated by the company over a specific period by the average total assets held by the company during the same period.</td></tr>
<tr><td>currentRatio</td><td>Double</td><td>The Current Ratio is a liquidity ratio used to evaluate a company's ability to pay its short-term financial obligations, those that are due within one year. To calculate the Current Ratio, divide a company's current assets by its current liabilities.</td></tr>
<tr><td>quickRatio</td><td>Double</td><td>Quick Ratio is a financial ratio that measures a company's ability to meet its short-term obligations with its liquid assets. Liquid assets are those that can be quickly converted into cash, such as cash, cash equivalents, and short-term investments, as well as receivables. To calculate the Quick Ratio, divide the sum of these assets by the company's current liabilities.</td></tr>
<tr><td>longTermDebtTotalCapitalRatio</td><td>Double</td><td>The long-term debt to capitalization ratio, a variation of the traditional debt-to-equity (D/E) ratio, shows the financial leverage of a firm. To calculate the Long Term Debt Total Capital Ratio, divide the company's long-term debt and capital lease obligations by the sum of its long-term debt and capital lease obligations, plus total shareholder's equity.</td></tr>
<tr><td>totalAssetsEquityRatio</td><td>Double</td><td>A ratio calculated by dividing Total Assets by Common Equity, using the data from the company's Balance Sheet. It is important to note that Common Equity is obtained by deducting Preferred Stock from Total Shareholder's Equity.</td></tr>
<tr><td>longTermDebtEquityRatio</td><td>Double</td><td></td></tr>
<tr><td>disabled</td><td>Boolean</td><td>Technical status of a record. Mostly set to "false".</td></tr>
<tr><td>source</td><td>String</td><td>The data provider ID.</td></tr>
<tr><td colspan="3"><strong>Extension fields</strong></td></tr>
<tr><td>roic</td><td>String</td><td>ROIC (Return on Invested Capital) is a financial metric used to assess the profitability and efficiency of a company's capital investments. It is calculated by dividing the company's net income by the sum of its total equity, long-term debt and capital lease obligations, and short-term debt and capital lease obligations.</td></tr>
<tr><td>fiscalYearEndMonth</td><td>String</td><td>A numerical representation of the month that marks the end of a company's fiscal year. For instance, "fiscalYearEndMonth" = 9, indicates that the fiscal year ends in September.</td></tr>
</table>

## Price

The Price endpoints are used for querying the daily OHLC and trading volume of an instrument. The price data is sourced from a third party and might differ from dxFeed market data feeds.

<table>
<tr><th>Attribute name</th><th>Data type</th><th>Description</th></tr>
<tr><td colspan="3"><strong>Fixed fields</strong></td></tr>
<tr><td>ymd</td><td>Integer</td><td>The effective date of the reported data.</td></tr>
<tr><td>eventTime</td><td>Long</td><td>The timestamp when the event has been registered in the dxFeed system.</td></tr>
<tr><td>dxSymbol</td><td>String</td><td>A unique combination of characters representing a security on a stock exchange. Follows dxFeed symbology.</td></tr>
<tr><td>sid</td><td>String</td><td>The internal security ID. Unique across all data providers.</td></tr>
<tr><td>open</td><td>Double</td><td>The initial price at which the security is traded at the beginning of a trading day.</td></tr>
<tr><td>high</td><td>Double</td><td>The highest price at which the security is traded during a trading day.</td></tr>
<tr><td>low</td><td>Double</td><td>The lowest price at which the security is traded during a trading day.</td></tr>
<tr><td>close</td><td>Double</td><td>The final price at which the security is traded at the end of a trading day.</td></tr>
<tr><td>volume</td><td>Double</td><td>The total number of security's shares traded during a trading day.</td></tr>
<tr><td>ext</td><td>String</td><td></td></tr>
<tr><td>disabled</td><td>Boolean</td><td>Technical status of a record. Mostly set to "false".</td></tr>
<tr><td>source</td><td>String</td><td>The data provider ID.</td></tr>
</table>

## Reference Change

The Reference Change endpoints are used for querying the information about major instrument or company changes, e.g., symbol change, company legal name change, etc.

<table>
<tr><th>Attribute name</th><th>Data type</th><th>Description</th></tr>
<tr><td colspan="3"><strong>Fixed fields</strong></td></tr>
<tr><td>ymd</td><td>Integer</td><td>A date of the reference change event.</td></tr>
<tr><td>eventTime</td><td>Long</td><td>The timestamp when the event has been registered in the dxFeed system.</td></tr>
<tr><td>dxSymbol</td><td>String</td><td>A unique combination of characters representing a security on a stock exchange. Follows dxFeed symbology.</td></tr>
<tr><td>sid</td><td>String</td><td>The internal security ID. Unique across all data providers.</td></tr>
<tr><td>type</td><td>String</td><td>A specific item name that has been changed. Possible values are "SYMBOL", "EXCHANGE", "CUSIP", "DEPOSITARY_RECEIPT_RATIO", "CIK", "LEGAL_NAME", "STANDARD_NAME", "ISIN", "LISTING_STATUS" or "UNKNOWN".</td></tr>
<tr><td>refChangeTarget</td><td>String</td><td>A broad classification for an item that has undergone a change. Possible values are "SHARE_CLASS" or "COMPANY".</td></tr>
<tr><td>oldValue</td><td>String</td><td>A value before changes or modifications.</td></tr>
<tr><td>newValue</td><td>String</td><td>A value after changes or modifications.</td></tr>
<tr><td>disabled</td><td>Boolean</td><td>Technical status of a record. Mostly set to "false".</td></tr>
<tr><td>source</td><td>String</td><td>The data provider ID.</td></tr>
<tr><td colspan="3"><strong>Extension fields</strong></td></tr>
<tr><td>pk</td><td>String</td><td>A The internal company ID. Unique across all data providers.</td></tr>
</table>

## Shares Ownership Summary

The Shares Ownership Summary endpoints are used for querying the periodic information about the total outstanding and free float shares for a particular instrument.

<table>
<tr><th>Attribute name</th><th>Data type</th><th>Description</th></tr>
<tr><td colspan="3"><strong>Fixed fields</strong></td></tr>
<tr><td>ymd</td><td>Integer</td><td>The effective date of the reported data.</td></tr>
<tr><td>eventTime</td><td>Long</td><td>The timestamp when the event has been registered in the dxFeed system.</td></tr>
<tr><td>dxSymbol</td><td>String</td><td>A unique combination of characters representing a security on a stock exchange. Follows dxFeed symbology.</td></tr>
<tr><td>sid</td><td>String</td><td>The internal security ID. Unique across all data providers.</td></tr>
<tr><td>sharesOutstanding</td><td>Double</td><td>The total number of a company's outstanding shares, as reported by the company in their 10-K, 10-Q, or 20-F filings. This number includes all shares currently held by investors and is used to calculate the company's market capitalization. By multiplying the current share price by the total number of outstanding shares, investors can estimate the company's total market value.</td></tr>
<tr><td>sharesFloat</td><td>Double</td><td>The total number of shares available for trading in the market that are publicly owned and not restricted or closely held by insiders or institutional investors.</td></tr>
<tr><td>sharesOutstandingInterim</td><td>Double</td><td>The latest total shares outstanding based on an interim source. These figures do not come from a company's balance sheet, but rather reflect between-period updates due to events such as capital raises, share buybacks, corporate restructuring, or other company activities. This data is collected from various sources, including company filings and exchange records. For US-listed companies, source documents include forms 10-K, 10-Q, 20-F, 40-F, 8-K, 6-K, and shareholder proxy filings, as well as the company's website. For international companies, interim TSO data is primarily collected from exchanges.</td></tr>
<tr><td>sharesOutstandingBalanceSheet</td><td>Double</td><td>The total number of shares outstanding for a specific share class, based on the figure reported in the latest balance sheet of a publicly traded company. This information must be obtained from a publicly available audited filing, such as a 10-K, 10-Q, or 20-F.</td></tr>
<tr><td>sharesOutstandingWithBalanceSheetEndingDate</td><td>Double</td><td>The total number of shares outstanding reported by a company as of the ending date of its balance sheet period. This information is typically disclosed in the company's 10-K, 10-Q, or 20-F filing. The shares outstanding figure is an aggregated number that includes all outstanding shares for the company.</td></tr>
<tr><td>shareClassLevelTreasurySharesOutstanding</td><td>Double</td><td>The total number of treasury shares outstanding for a company on a share class level.</td></tr>
<tr><td>ext</td><td>String</td><td></td></tr>
<tr><td>disabled</td><td>Boolean</td><td>Technical status of a record. Mostly set to "false".</td></tr>
<tr><td>source</td><td>String</td><td>The data provider ID.</td></tr>
</table>

## Valuation Ratio

The Valuation Ratio endpoints are used for querying the ratios that describe the relationship between the market value of an instrument and a fundamental financial metric, e.g., earnings or book value. The amounts in this controller are expressed in the currency presented in the Instrument Reference controller.

<table>
<tr><th>Attribute name</th><th>Data type</th><th>Description</th></tr>
<tr><td colspan="3"><strong>Fixed fields</strong></td></tr>
<tr><td>ymd</td><td>Integer</td><td>The effective date of the reported data.</td></tr>
<tr><td>eventTime</td><td>Long</td><td>The timestamp when the event has been registered in the dxFeed system.</td></tr>
<tr><td>dxSymbol</td><td>String</td><td>A unique combination of characters representing a security on a stock exchange. Follows dxFeed symbology.</td></tr>
<tr><td>sid</td><td>String</td><td>The internal security ID. Unique across all data providers.</td></tr>
<tr><td>normalizedPERatio</td><td>Double</td><td>Normalized PE Ratio is a financial metric used to measure the valuation of a company's stock relative to its normalized earnings per share (EPS). Normalized EPS removes one-time and unusual items from net EPS to provide investors with a more accurate measure of the company's true earnings. To calculate Normalized PE Ratio, divide the adjusted close price by the normalized EPS. If the result is negative, zero, greater than 10,000, or less than 0.001, then the Normalized PE Ratio is "NaN".</td></tr>
<tr><td>forwardPERatio</td><td>Double</td><td>Forward PE Ratio is a financial metric used to measure the valuation of a company's stock based on its expected future earnings. To calculate Forward PE Ratio, divide 1 by the Forward Earning Yield. If the result is negative, then the Forward PE Ratio is "NaN".</td></tr>
<tr><td>normalizedPEGRatio</td><td>Double</td><td>Normalized PEG Ratio is a financial metric used to measure the valuation of a company's stock relative to its long-term normalized earnings growth rate. To calculate Normalized PEG Ratio, divide the Normalized Forward PE Ratio by the long-term average normalized earnings growth rate.</td></tr>
<tr><td>trailingDividendYield</td><td>Double</td><td>Trailing Dividend Yield is a financial metric used to measure the return on investment from a company's dividend payments over the past 12 months. To calculate Trailing Dividend Yield, divide the total dividends paid per share over the trailing 12 months by the current price per share.</td></tr>
<tr><td>forwardDividendYield</td><td>Double</td><td>Forward Dividend Yield is a financial metric used to estimate the annual dividend return on a stock investment. To calculate Forward Dividend Yield, multiply the current dividend per share by the payout frequency and then divide the result by the stock price.</td></tr>
<tr><td>payoutRatio</td><td>Double</td><td>Payout Ratio is a financial metric used to measure the proportion of a company's earnings that are paid out as dividends to shareholders. To calculate Payout Ratio, divide the dividend per share by the diluted earnings per share.</td></tr>
<tr><td>peRatio</td><td>Double</td><td>PE Ratio, or Price-to-Earnings Ratio, is a financial metric used to measure the valuation of a company's stock relative to its earnings per share. To calculate PE Ratio, divide the adjusted close price by the earnings per share. If the result is negative, zero, greater than 10000, or less than 0.001, then the PE Ratio is "NaN".</td></tr>
<tr><td>psRatio</td><td>Double</td><td>PS Ratio, or Price-to-Sales Ratio, is a financial metric used to measure the valuation of a company's stock relative to its sales per share. To calculate PS Ratio, divide the adjusted close price by the sales per share. If the result is negative or zero, then the PS Ratio is "NaN".</td></tr>
<tr><td>pbvRatio</td><td>Double</td><td>The ratio of Adjusted Close Price to EPS (Earnings Per Share). If the result falls into the categories of negative, zero, greater than 10,000, or less than 0.001, it is recorded as "NaN".</td></tr>
<tr><td>pcfRatio</td><td>Double</td><td>PCF Ratio, or Price-to-Cash Flow Ratio, is a financial metric used to measure the valuation of a company's stock relative to its cash flow per share. To calculate PCF Ratio, divide the adjusted close price by the cash flow per share. If the result is negative or zero, then the PCF Ratio is "NaN".</td></tr>
<tr><td>pfcfRatio</td><td>Double</td><td>The ratio of Adjusted Close Price to Free Cash Flow Per Share. In cases where the result is negative or zero, the value is considered "NaN".</td></tr>
<tr><td>salesPerShare</td><td>Double</td><td>Sales Per Share is a financial metric used to calculate the amount of a company's sales revenue that is generated per outstanding share of common stock. To calculate Sales Per Share, divide the total sales by the average diluted shares outstanding.</td></tr>
<tr><td>bookValuePerShare</td><td>Double</td><td>Book Value Per Share (BVPS) is a financial metric that represents the amount of shareholder equity attributable to each outstanding share of common stock. To calculate BVPS, divide the total common shareholder's equity by the total number of shares outstanding.</td></tr>
<tr><td>operationsCashFlowPerShare</td><td>Double</td><td>CFO Per Share represents the amount of cash generated from a company's operating activities per outstanding share of common stock. To calculate CFO Per Share, divide the total cash flow from operations by the average number of diluted shares outstanding.</td></tr>
<tr><td>cashFlowFreePerShare</td><td>Double</td><td>Free Cash Flow Per Share represents the amount of free cash flow generated by a company per outstanding share of common stock. To calculate FCF Per Share, divide the total free cash flow by the average number of diluted shares outstanding.</td></tr>
<tr><td>disabled</td><td>Boolean</td><td>Technical status of a record. Mostly set to "false".</td></tr>
<tr><td>source</td><td>String</td><td>The data provider ID.</td></tr>
</table>
