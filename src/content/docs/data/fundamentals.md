---
title: "Fundamentals"
paligoOriginId: "30844"
---

## Overview

Learn the fundamental data services provided from [Morningstar](https://www.morningstar.com/) and [Borsa Istanbul](https://verdauat.borsaistanbul.com/). For a detailed description of fundamental data, visit [dxFeed website](https://www.dxfeed.com/reference_data/fundamentals/).

## Fundamental data

### Data scope

The following classes of data are available:

- Company related data
- Share Class related data

#### Company related data

- AssetClassification
- Company
- CompanyProfile
- CorporateCalendars
- FinancialStatementsAOR*
- FinancialStatementsRestate*
- HistoricalAssetClassification
- IndexParticipationByCId
- InsiderTradingActivities
- LongDescriptions
- MergersAndAcquisitions
- OperationRatiosAOR*
- OperationRatiosRestate*
- Segmentation

* - table can be sorted by time range

#### Share Class related data

- AlphaBeta*
- CashDividends
- ConsensusEstimates*
- ConsensusRecommendations*
- EarningRatiosAOR*
- EarningRatiosRestate*
- EarningReportsAOR*
- EarningReportsRestate*
- HistoricalReturns*
- OwnershipDetails*
- OwnershipSummary*
- Price
- PriceStatistics
- ShareClass
- ShareClassProfile
- Spinoffs
- StockSplits
- TrailingReturns
- ValuationRatios*

* - table can be sorted by time range

Please find more detailed information at [dxFeed website](https://www.dxfeed.com/reference_data/fundamentals/).

### Data format

Fundamental data is available in JSON format.

## Data coverage

Fundamentals covers three regions and ~45,000 companies.

### Regions

Fundamentals services have different URLs for different regions:

- [North America](https://tools.dxfeed.com/morningstar)
- [European Union](https://tools.dxfeed.com/morningstar-eur)
- [Asia](https://tools.dxfeed.com/morningstar-asp)

### Packages

<table>
<tr><th><strong>Package</strong></th><th><strong>File(s)</strong></th><th><strong>Coverage-Region</strong></th><th>Coverage-Companies/Shareclasses</th><th>Avg History (of years)</th><th>Additional details</th></tr>
<tr><td rowspan="2">Reference</td><td>Company Reference</td><td>Global</td><td>45000 Co’s</td><td>N/A</td><td></td></tr>
<tr><td>Share Class (Security) Reference</td><td>Global</td><td>100000 Shareclasses</td><td>N/A</td><td></td></tr>
<tr><td rowspan="3">Profile</td><td>General Profile</td><td>Global</td><td>45000 Co’s</td><td>N/A</td><td>Some data points will have little lesser or more coverage depending upon availability of these information on Public sources. Share outstanding data coverage would match with Financial statements data</td></tr>
<tr><td>Medium Company Description</td><td>Global</td><td>45000 Co's</td><td>N/A</td><td></td></tr>
<tr><td>Long Company Description</td><td>Global</td><td>12000 Co’s</td><td>N/A</td><td>Limited Coverage, mainly for Large cap companies</td></tr>
<tr><td rowspan="2">Asset Classification</td><td>Asset Classification</td><td>Global</td><td>45000 Co’s</td><td>N/A</td><td>Some data points are available for USA only</td></tr>
<tr><td>Asset Classification History</td><td>Global</td><td>45000 Co’s</td><td>N/A</td><td>Some data points are available for USA only</td></tr>
<tr><td rowspan="7">Fundamentals</td><td>Financial Statements (AOR & Restated Versions)</td><td>Global</td><td>42000 Co’s</td><td>10</td><td></td></tr>
<tr><td>Earnings Reports (AOR & Restated Versions)</td><td>Global</td><td>42000 Co’s</td><td>10</td><td></td></tr>
<tr><td>Operation Ratios (AOR & Restated Versions)</td><td>Global</td><td>42000 Co’s</td><td>10</td><td></td></tr>
<tr><td>Earnings Ratios (AOR & Restated Versions)</td><td>Global</td><td>42000 Co’s</td><td>10</td><td></td></tr>
<tr><td>Segmentation Data</td><td>Global</td><td>30000 Co's</td><td>10</td><td></td></tr>
<tr><td>Valuation Ratios</td><td>Global</td><td>42000 Co’s</td><td>10</td><td></td></tr>
<tr><td>Historical TTMOperational Ratios</td><td>Global</td><td>42000 Co's</td><td>10</td><td></td></tr>
<tr><td rowspan="2">Currency Exchange</td><td>Currency Exchange Rate</td><td>Global</td><td>150 Currencies</td><td>15</td><td></td></tr>
<tr><td>Cross Currency Rate</td><td>Global</td><td>890 Currency Pairs</td><td></td><td></td></tr>
<tr><td rowspan="2">Global Corporate Action</td><td>Share Corporate Actions</td><td>Global</td><td>N/A</td><td>15</td><td>Every share not necessarily have announced Corp actions</td></tr>
<tr><td>Merger & Acquisition</td><td>Global</td><td>N/A</td><td>5</td><td>M&A Data is not available or incomplete for Private transactions</td></tr>
<tr><td rowspan="3">Ownership</td><td>Ownership Summary</td><td>Global</td><td>44000 Co's</td><td></td><td>Short Interest is available only for NYSE, AMEX, Nasdaq & TSX</td></tr>
<tr><td>Ownership Details</td><td>Global</td><td>28000 Co's</td><td></td><td></td></tr>
<tr><td>Insider Trading</td><td>USA, UK</td><td>5000 Co's</td><td>12</td><td></td></tr>
<tr><td rowspan="2">Estimates</td><td>Consensus Recommendations</td><td>North America, UK, AUS</td><td>7000 Co's</td><td>1</td><td></td></tr>
<tr><td>Consensus Estimates</td><td>North America, UK, AUS</td><td>7500 C0's</td><td>1</td><td></td></tr>
<tr><td>Corporate Communication</td><td>Corporate Calendar</td><td>USA, UK</td><td>5000 Co's</td><td>5</td><td></td></tr>
<tr><td rowspan="2">Quantitative Data</td><td>Company Quantitative Data Points</td><td>Global</td><td>45000 Co's</td><td></td><td></td></tr>
<tr><td>ShareClass Quantitative Data Points</td><td>Global</td><td>45000 Co's</td><td></td><td></td></tr>
<tr><td rowspan="9">Executive Insight</td><td>OfficerDirector</td><td>Global</td><td>35000 Co's</td><td></td><td>Global data to be added 5/4/16; NRA- 9000 Co's; UK- 2100 Co's; Rest of the world- 23000 Co's</td></tr>
<tr><td>Executive Compensation</td><td>USA</td><td>5000 Co's</td><td>10</td><td>Full coverage of NYSE, AMEX, Nasdaq</td></tr>
<tr><td>Board Compensation</td><td>USA</td><td>5000 Co's</td><td>10</td><td>Full coverage of NYSE, AMEX, Nasdaq</td></tr>
<tr><td>Stock Option Grant</td><td>USA</td><td>5000 Co's</td><td>10</td><td>Full coverage of NYSE, AMEX, Nasdaq</td></tr>
<tr><td>Outstanding Awards</td><td>USA</td><td>5000 Co's</td><td>10</td><td>Full coverage of NYSE, AMEX, Nasdaq</td></tr>
<tr><td>Options Exercised</td><td>USA</td><td>5000 Co's</td><td>10</td><td>Full coverage of NYSE, AMEX, Nasdaq</td></tr>
<tr><td>Membership</td><td>USA</td><td>5000 Co's</td><td>10</td><td>Full coverage of NYSE, AMEX, Nasdaq</td></tr>
<tr><td>SayOnPay</td><td>USA</td><td>4000 Co's</td><td>5</td><td>Regulation became effective in 2012, data is available since then. Only relevant for USA</td></tr>
<tr><td>Voting Report</td><td>USA, UK</td><td>4000 Co's</td><td>5</td><td>Since 2012</td></tr>
<tr><td rowspan="3">Returns & AlphaBeta</td><td>Historical Returns</td><td>Global</td><td>45000 Co's</td><td></td><td></td></tr>
<tr><td>Trailing Returns</td><td>Global</td><td>45000 Co's</td><td></td><td></td></tr>
<tr><td>Alpha Beta</td><td>Global</td><td>45000 Co's</td><td></td><td>Currently only available for the following countries: Australia, Austria, Belgium, Brazil, Canada, Chile, China, Cyprus, Denmark, Finland, France, Germany, Greece, Hong Kong, Iceland, India, Ireland, Italy, Japan, Korea, Luxembourg, Malaysia, Mexico, Netherlands, New Zealand, Norway, Philippines, Portugal, Romania, Russian Federation, Singapore, South Africa, Spain, Sweden, Switzerland, Taiwan, Thailand, United Kingdom, United States</td></tr>
<tr><td>Transcripts</td><td>Call Transcripts</td><td>USA</td><td>5000 Co's</td><td>5</td><td>Coverage is limited to S&P 500 companies only and Turnaround time is anywhere between 2-30 days</td></tr>
</table>

Read more in the following sections:

- [Fundamentals data dictionary](/data/fundamentals/fundamentals-data-dictionary/#fundamentals-data-dictionary)
- [Fundamental data access](/data/fundamentals/fundamental-data-access/#fundamental-data-access)
