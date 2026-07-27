---
title: "Known Issues"
paligoOriginId: "967"
---

## Chart spikes

<table>
<tr><th><strong>Problem</strong></th><th><strong>Reason</strong></th><th><strong>Solution</strong></th></tr>
<tr><td rowspan="2">Spikes in charting</td><td>Problems on provider side</td><td>- Filter these Quotes on client side during non trading hours
- Use (ask+bid)/2 for charting
- Use another FX contributor, for example XAU/EUR:AFX{mm=AFX}</td></tr>
<tr><td>Chart data is not split-adjusted</td><td>Submit a ticket</td></tr>
</table>

## Wrong 52 high/low

<table>
<tr><th><strong>Problem</strong></th><th>Reasons</th><th>Solution</th></tr>
<tr><td rowspan="5">Bid size is zero</td><td>Special dividend</td><td>Check for news</td></tr>
<tr><td>High/LowPrice52 is being taken from PriceStatistics table</td><td>Wait for recalculations</td></tr>
<tr><td>Provider is sending wrong today values to dxFeed</td><td></td></tr>
<tr><td>Corporate action</td><td></td></tr>
<tr><td>New symbol</td><td></td></tr>
</table>
