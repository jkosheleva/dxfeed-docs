---
title: "dxFeed Retail Products Glossary"
paligoOriginId: "90564"
---

## Overview

This page provides definitions and explanations of key terms and concepts related to the dxFeed Retail products: Retail eShop and Retail Services Platform. The glossary may help better understand the terminology used throughout our products and product-related documentation. The glossary is divided into two sections:

- [General terms](#general-terms): This section covers the fundamental terms and concepts commonly used in relation to Retail products.
- [Compliance](#compliance): This section provides definitions of terms specific to regulatory and compliance aspects associated with Retail poroducts.

## General terms

<table>
<tr><th rowspan="2"><strong>Term</strong></th><th colspan="2"><strong>Definition</strong></th></tr>
<tr><td><strong>Retail eShop</strong></td><td><strong>Retails Services Platform</strong></td></tr>
<tr><td>Agreement</td><td colspan="2">Legally binding arrangement between two parties that outlines terms and conditions governing the use of dxFeed Retail products. There are two types of agreement:<br/>Agreement violation may result in restricting a user from using dxFeed Retail products.</td></tr>
<tr><td>Compliance</td><td colspan="2">Set of measures taken to ensure that services are provided within the guidelines set by market exchanges. They include audit, reporting, user status assessment (Professional/Non-Professional), and a range of strategies aimed against violating users, for example, blocking mechanism and blacklist validation. See <a href="#compliance">Compliance</a>.</td></tr>
<tr><td>Exchange</td><td colspan="2">Organized market where tradable securities, commodities, foreign exchanges, cryptocurrencies, futures, and options contracts are sold and bought.</td></tr>
<tr><td>Expiration date</td><td colspan="2">Datetime when user's access to market data allowed via a subscription is restricted.</td></tr>
<tr><td>Feed/Service</td><td colspan="2">Market-related data reported by an exchange: e.g., order book, trades, quotes.<br/>Feeds are differentiated by data depth, level of details, instruments, pricing, etc. They may be real-time as well as delayed/historical.</td></tr>
<tr><td>Personalized access token</td><td colspan="2">Generated JSON web token that allows an end user access to market data within a partner's application on <a href="https://get.dxfeed.com/">get.dxfeed.com</a>.</td></tr>
<tr><td>QD filter</td><td colspan="2">Special configuration of the data endpoint used to open access to required market data.</td></tr>
<tr><td>Regulator</td><td colspan="2">Exchange or another organization providing market data.</td></tr>
<tr><td>Subscriber status</td><td colspan="2">User's professional position that affects a list of feeds and feed prices; it can be pro or non-pro.</td></tr>
<tr><td>Account</td><td>Username, password, and personal data related to a user on <a href="https://get.dxfeed.com/">get.dxfeed.com</a>.</td><td>Username, password and personal data related to a user within a specific partner's tenant.</td></tr>
<tr><td>Admin/Administrator</td><td>Party responsible for adjusting settings for <a href="https://get.dxfeed.com/">get.dxfeed.com</a>.</td><td>Party responsible for adjusting settings for a specific partner's tenant.</td></tr>
<tr><td>Application/Trading application/Platform</td><td>Partner's trading platform that supports dxFeed as a market data provider.</td><td>Partner's trading platform that supports dxFeed as a market data provider and provides market data to its clients.</td></tr>
<tr><td>Order</td><td>A request placed by a end user to purchase specified subscription(s) or services on  <a href="https://get.dxfeed.com/">get.dxfeed.com</a>.</td><td>A request placed by either an end user or a partner on behalf of the user to purchase specified subscription(s) or services from dxFeed.</td></tr>
<tr><td>Subscription</td><td>Access to market-related data under certain conditions, including specified start and end dates, application (controlled display terminal), and a list of symbols.</td><td>Access to market-related data under certain conditions, including specified start and end dates, duration, and user id.</td></tr>
<tr><td>Subscription canceling</td><td>Process by which a subscription is canceled, ceasing access to the subscribed feed at the end of the paid period (a month from the moment of purchase).</td><td>Process by which a subscription is canceled, ceasing access to the subscribed feed: the datetime of canceling a subscription depends on the setting for a partner's application and can be the following:</td></tr>
<tr><td>Subscription renewal</td><td>Process by which a subscription is extended, ensuring continued access to the subscribed feed and authorizing further charges for the specified renewal period.</td><td>N/A</td></tr>
<tr><td>User/B2C user/End user</td><td>Any private individual who uses the get.dxfeed portal.</td><td>Any private individual who subscribes to market data through the dxFeed Retail Services Platform.</td></tr>
<tr><td>New order</td><td>Section on the get.dxfeed portal where a B2C user forms a cart by selecting subscriptions and, therefore, creates an order.</td><td>N/A</td></tr>
<tr><td>Offering</td><td>Proposal that enables a user to get a subscription in an application. It is associated with a feed, its price, and a user's professional status.</td><td>N/A</td></tr>
<tr><td>Payment system</td><td>Third-party system that processes payment transactions.</td><td>N/A</td></tr>
<tr><td>Price</td><td>Original subscription cost without a discount applied.</td><td>N/A</td></tr>
<tr><td>Promo campaign</td><td>Marketing activity launched for an application during a specified period.<br/>It is visible on the application page and provides discount on subscriptions associated with this application for the period specified by the promo campaign settings for the whole period of duration.</td><td>N/A</td></tr>
<tr><td>Promo code</td><td>Series of Latin letters and digits that provides a deduction in a price for a specific application.</td><td>N/A</td></tr>
<tr><td>Receipt</td><td>E-document confirming that the end user has paid money to the seller in order to be granted with access to a market data feed.</td><td>N/A</td></tr>
<tr><td>Transaction/Payment transaction</td><td>Result of transferring funds from the user's bank account to Devexperts Inc.</td><td>N/A</td></tr>
<tr><td>API key</td><td>N/A</td><td>Generated JSON web token that allows a partner access to API methods. It contains a unique tenant (application) identifier, issue, and expiration time.</td></tr>
<tr><td>Back office</td><td>N/A</td><td>User-friendly administrative interface that allows partners to manage end users and their subscriptions without the need to directly interact with API methods.</td></tr>
<tr><td>Tenant</td><td>N/A</td><td>Entity associated with a certain partner created on the Retail Services Platform side with settings agreed with a partner on the integration stage.</td></tr>
</table>

## Compliance

| Term | Definition | Retail eShop | Retail Services Platform |
| --- | --- | --- | --- |
| Blacklist | List of records containing individuals' first name, last name, and phone number. A record can be manually added to prevent a violating user from getting access to market data or can be automatically created as a consequence of the blocking action. | Yes | Yes |
| Blacklist validation | Process of comparing user-provided data in the fields of First name, Last name, and Phone number against non-archived records on the Blacklist.<br/>The process of blacklist validation is initiated when a new or exisiting user makes a payment attempt (clicks Pay on the Review and Pay page) and when an existing user makes changes to their personal data (clicks Save on the Profile page). If the entered values for the fields of First name, Last name, and the last 7 digits of the Phone number match a non-archived record on the Blacklist, the user's account is blocked. | Yes | Yes |
| Blocking | Measures taken by get.dxFeed to restrict access to a certain user account due to market exchange requirements and/or violation of agreements.<br/>When a support engineer blocks a user account in the support or admin panel, it results in: | Yes | Yes |
| Unblocking | Measures taken by get.dxFeed to remove restrictions on a certain user account.<br/>When a support engineer unblocks a user account in the support or admin panel, it results in:<br/>Please note that unblocking does not restore subscriptions that were terminated due to the blocking action. | Yes | Yes |
| Data access suspension | Temporary restriction on data access within active subscriptions, imposed on a user account as part of a compliance check. | TBD | Yes |
| Terminate | Action of immediate discontinuation of an active subscription resulting in restricting user's access to market-related data. | Yes | Yes |
