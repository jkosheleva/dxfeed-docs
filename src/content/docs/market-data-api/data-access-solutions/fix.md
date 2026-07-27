---
title: "FIX"
paligoOriginId: "866"
---

## Overview

### Purpose

This document aims at presenting the details of dxFeed FIX Protocol. The document describes the definition of the various FIX messages.

### Scope

The scope of this document is limited to defining the FIX messages and tags supported by the interface for pricing. It is supposed that the reader already has a comprehensive understanding of the FIX Protocol. This information can be found on the FIX Protocol [website](http://www.fixprotocol.org) and is outside the scope of this document.

### FIX versions and messages

dxFeed FIX is the financial information exchange protocol. Its messages are based on FIX protocol v4.4.

### Standard message header

| **Tag** | **Field Name** | **Required** | **Comments, valid values** |
| --- | --- | --- | --- |
| 8 | BeginString | Y | FIX.4.4 |
| 9 | BodyLength | Y | Message length excluding the **CheckSum** field |
| 35 | MsgType | Y | Message type |
| 49 | SenderCompID | Y | Assigned value used to identify firm sending message |
| 56 | TargetCompID | Y | Assigned value used to identify receiving firm |
| 34 | MsgSeqNum | Y | Integer message sequence number |
| 43 | PossDupFlag | C | Required for retransmitted messages.<br/>N = Original transmission, Y= Possible duplicate |
| 52 | SendingTime | Y | Time of message transmission (always expressed in UTC) with or without milliseconds depending on FIX session options. |
| 122 | OrigSendingTime |  | Used in message resend |

### Standard message trailer

| **Tag** | **Field Name** | **Required** | **Comments, valid values** |
| --- | --- | --- | --- |
| 10 | CheckSum | Y | Three byte, simple checksum. Always last tag in the message; i.e. serves with the trailing `<SOH>` as the end-of-message delimiter. Always written as three characters. (e.g. 89 would be '089') |

## Supported messages

Session protocol assures client identification, sequential request processing, session state control, and the ability to restore the session after downtime. In the scope of a session, all FIX messages are identified by a unique integer sequence number and processed in that order. When the incoming sequence number does not match the expected one, the session must be recovered. If the incoming sequence number is less than expected and `PossDuplFlag` is not set to Y, it is considered a fatal error, and the connection is dropped by the server. If the sequence number of an incoming message is greater than the next expected number, the Resend Request is issued for missed messages.

dxFeed FIX Protocol has the following specific session-level features (due to the transient nature of the market data):

- Session recovery is not supported: the client must use the `ResetSeqNumFlag (141) = Y` on each logon to reset sequence. Failure to provide this flag upon logon will result in immediate logout.
- The server always responds with the `'GapFill'` message to any Resend Request from the client

### Session-Level messages

#### Logon

Initiates a connection from client-side and approves connection if sent by the server.

| **Tag** | **Field Name** | **Required** | **Comments, valid values** |
| --- | --- | --- | --- |
|  | <Standard Header> | Y | MsgType = A |
| 98 | EncryptMethod | Y | 0 = NONE_OTHER<br/>Encryption should be provided on the transport level |
| 108 | HeartBtInterval | Y | Heartbeat interval in seconds |
| 141 | ResetSeqNumFlag | Y | 'Y' to reset sequence numbers |
|  | <Standard Trailer> | Y |  |
| 553 | Login | N |  |
| 554 | Password | N |  |

#### Logout

| **Tag** | **Field Name** | **Required** | **Comments, valid values** |
| --- | --- | --- | --- |
|  | <Standard Header> | Y | MsgType = 5 |
| 58 | Text | N | Logout reason |
|  | <Standard Trailer> | Y |  |

#### Heartbeat

A message that monitors the status of the connection and identifies if a message was not received. FIX session must send a Heartbeat message each HeartBtInterval (108) second. If there is no Heartbeat message received after HeartBtInterval (108) + a prearranged timeout, then the connection should be considered as broken and reconnect should be initiated.

| **Tag** | **Field Name** | **Required** | **Comments, valid values** |
| --- | --- | --- | --- |
|  | <Standard Header> | Y | MsgType = 5 |
| 112 | TestReqID | N | Required when the heartbeat is the result of TestRequest message. Heartbeats issued as the result of TestRequest have to contain the same value as TestReqID in the TestRequest message |
|  | <Standard Trailer> | Y |  |

Also, a Heartbeat message is used as a reply to a Test Request message.

#### Test request

A message that checks the sequence numbers and verifies the connection status. The other endpoint should reply with a Heartbeat, containing the TestReqID (112) from the initial TestRequest message.

| **Tag** | **Field Name** | **Required** | **Comments, valid values** |
| --- | --- | --- | --- |
|  | <Standard Header> | Y | MsgType = 5 |
| 112 | TestReqID | N | The identifier included in a TestRequest message has to be returned within the Heartbeat answer. Any string can be used as the TestReqID (e.g. a timestamp string) |
|  | <Standard Trailer> | Y |  |

#### Resend request

The message recovers the inbound session sequence if some message was missed. dxFeed FIX always responds with a Sequence Reset message in a Gap Fill mode to client-initiated resend requests.

| **Tag** | **Field Name** | **Required** | **Comments, valid values** |
| --- | --- | --- | --- |
|  | <Standard Header> | Y | MsgType = 2 |
| 7 | BeginSeqNo | Y | Sequence number of the first message in range to be resent |
| 16 | EndSeqNo | Y | Sequence number of the last message in range to be resent |
|  | <Standard Trailer> | Y |  |

#### Sequence reset

The message may be used in two modes:

- **Reset Mode** forces the counterparty to adjust the inbound message sequence, _FillGapFlag=N_ or omitted
- **Fill Gap Mode** is used during retransmission of messages missed by the counterparty. Administrative messages and rejected business messages are not to be retransmitted. Instead, a Sequence Reset message with `FillGapFlag=Y` is to be used. dxFeed FIX always responds with a Gap Fill sequence reset to resend requests.

| **Tag** | **Field Name** | **Required** | **Comments, valid values** |
| --- | --- | --- | --- |
|  | <Standard Header> | Y | MsgType = 4 |
| 123 | GapFillFlag | N | N = sequence reset, the counterparty must adjust the inbound sequence number.<br/>Y = indicates the message is used instead of administrative or business messages which are not to be resent |
| 36 | NewSeqNo | Y | Adjusted sequence number |
|  | <Standard Trailer> | Y |  |

### Application-Level messages

dxFeed FIX system supports the following client-originated messages:

- _In_: **Market Data Request** - this message is sent by a client to subscribe / unsubscribe / receive a snapshot of market data (quotes and candles).

#### Market Data Request

<table>
<tr><th><strong>Tag</strong></th><th colspan="2"><strong>Field Name</strong></th><th><strong>Required</strong></th><th><strong>Data Type</strong></th><th><strong>Comments</strong></th></tr>
<tr><td></td><td colspan="2">&lt;Standard Header&gt;</td><td>Y</td><td></td><td>MsgType = V</td></tr>
<tr><td>262</td><td colspan="2">MDReqId</td><td>Y</td><td>String</td><td>Unique identifier for Market Data Request assigned by the client system. To unsubscribe, one must send the same ID with tag 263 = 2</td></tr>
<tr><td>263</td><td colspan="2">SubscriptionRequestType</td><td>Y</td><td>Char</td><td>Data request type. Possible values are:</td></tr>
<tr><td>264</td><td colspan="2">MarketDepth</td><td>Y</td><td>Int</td><td>Depth of market for this request. Possible values are:</td></tr>
<tr><td>265</td><td colspan="2">MDUpdateType</td><td>Y</td><td>Int</td><td>Specifies the type of market data update.<br/>Possible values are:</td></tr>
<tr><td>6408</td><td colspan="2">CandleType</td><td>N</td><td>String</td><td>Should only be used for candle subscriptions. Type of aggregates to request. Possible values are:</td></tr>
<tr><td colspan="3"><strong><em>Component &lt;MDReqGrp&gt;</em></strong></td><td>Y</td><td></td><td>The repeating group that specifies the type of market data requested</td></tr>
<tr><td>267</td><td colspan="2">NoMDEntryTypes</td><td>Y</td><td>Int</td><td>Number of MDEntryType fields requested</td></tr>
<tr><td>269</td><td colspan="2">MDEntryType</td><td>Y</td><td>Char</td><td>Type of data requested. Supported values are:</td></tr>
<tr><td colspan="3"><strong><em>End Component &lt;MDReqGrp&gt;</em></strong></td><td></td><td></td><td></td></tr>
<tr><td colspan="3"><strong><em>Component &lt;InstrmtMDReqGrp&gt;</em></strong></td><td>Y</td><td></td><td>The repeating group that specifies instruments for which the market data is requested</td></tr>
<tr><td>146</td><td colspan="2">NoRelatedSym</td><td>Y</td><td>Int</td><td>Number of instruments requested</td></tr>
<tr><td>55</td><td colspan="2">Symbol</td><td>Y</td><td>String</td><td>Instrument symbol</td></tr>
<tr><td colspan="3"><strong><em>End Component &lt;InstrmtMDReqGrp &gt;</em></strong></td><td></td><td></td><td></td></tr>
<tr><td></td><td colspan="2">&lt;Standard Trailer&gt;</td><td>Y</td><td></td><td></td></tr>
</table>

For TopOfBook mode, the system streams one book entry per side for each instrument. Only the best price for each instrument is delivered, with all prices and amounts aggregated in the best tier.

For FullBookDepth mode, the system streams set volume tiers (level II quotes), which reflects market depth. Subscription to level II quotes depends on the client’s setup. If streaming is configured on the server side, then nothing should be provided in addition to specifying market depth mode. Otherwise, an identifier of the pricing stream (MDStreamID) should be provided. Market data subscriptions are not permanent: the client must resubscribe each time a connection is re-established.

Quotes and candles subscriptions cannot be mixed in one request. A request must contain either set of the fields:

- the Bid/Offer MDEntryTypes and `<Instrument>` components - in case of s subscription for quotes.
- the Open / Close / High / Low MDEntryTypes and `<Aggregate Specification>` components - in case of a subscription for aggregated candle data. A request will be rejected if any of the following is true:
  
  
  
  - the request contains either Bid or Offer, and one of the following MDEntryTypes: Open / Close / High / Low.
  - the request does not contain `<Aggregate Specification>` components but specifies one of the (Open / Close / High / Low) MDEntryTypes.
  - the request contains CandleType field but specifies one of the (Bid/Offer) MDEntryTypes
- dxFeed FIX supports the following server-originated messages:
  
  
  
  - _Out:_ **Business Message Reject** - sent as a response to an application-level message, which fulfills session-level rules and cannot be replied to with a normal response.
  - _Out:_ **Market Data Request Reject** - sent when a market data request could not be honored for technical or business reasons.
  - _Out:_ **Market Data Incremental Refresh** - delivers market data updates for the client’s subscription.
  - _Out:_ **Market Data Snapshot** - delivers a full snapshot for the market data requested via MarketDataRequest message.

#### Business Message Reject

Client rejects application-level messages, which fulfills session-level rules and cannot be rejected via any other means. For example, client sends this message as a reply to any application-level message received prior to a Trading Session Status being listed as Open.

| **Tag** | **Field Name** | **Required** | **Data Type** | **Comments** |
| --- | --- | --- | --- | --- |
|  | <Standard Header> | Y |  | MsgType = j |
| 45 | RefSeqNum | N | Int | The sequence number of the rejected message |
| 372 | RefMsgType | Y | MsgType | Type of the rejected message |
| 380 | BusinessRejectReason | Y | Int | Reason for the rejection. The following values are supported: |
| 58 | Text | N | String | Message to explain the reason for rejection; supplied in case 380 = 0 |
|  | <Standard Trailer> | Y |  |  |

#### Market data request reject

| **Tag** | **Field Name** | **Required** | **Data Type** | **Comments** |
| --- | --- | --- | --- | --- |
|  | <Standard Header> | Y |  | MsgType = Y |
| 262 | MDReqID | Y | String | Refers to the ID of the request being rejected |
| 281 | MDReqRejReason | N | Char | Reason for the rejection. Supported values are: |
| 41 | Text | N | String | Free-format text describing a reason for rejection |
|  | <Standard Trailer> | Y |  |  |

#### Market Data Incremental Refresh

<table>
<tr><th><strong>Tag</strong></th><th colspan="2"><strong>Field Name</strong></th><th><strong>Required</strong></th><th><strong>Data Type</strong></th><th><strong>Comments</strong></th></tr>
<tr><td></td><td colspan="2">&lt;Standard Header&gt;</td><td>Y</td><td></td><td>MsgType = X</td></tr>
<tr><td>262</td><td colspan="2">MDReqID</td><td>Y</td><td>String</td><td>Unique identifier for Market Data Request assigned by the client system</td></tr>
<tr><td colspan="3"><strong><em>Component &lt;MDIncGrp&gt;</em></strong></td><td>Y</td><td></td><td></td></tr>
<tr><td>268</td><td colspan="2">NoMDEntries</td><td>Y</td><td>Int</td><td>Number of entries in the market data message</td></tr>
<tr><td>279</td><td colspan="2">MDUpdateAction</td><td>Y</td><td>char</td><td>Market data update action. The only supported value for incremental refresh is</td></tr>
<tr><td>269</td><td colspan="2">MDEntryType</td><td>Y</td><td></td><td>Type of data. Supported values are:</td></tr>
<tr><td>278</td><td colspan="2">MDEntryID</td><td>Y</td><td>String</td><td>Unique Market Data Entry identifier</td></tr>
<tr><td>1500</td><td colspan="2">MDStreamID</td><td>N</td><td>String</td><td>The identifier or name of the price stream</td></tr>
<tr><td>6408</td><td colspan="2">CandleType</td><td>N</td><td>String</td><td>The identifier of a candle period, only sent for candle updates</td></tr>
<tr><td>55</td><td colspan="2">Symbol</td><td>Y</td><td>String</td><td>Instrument symbol</td></tr>
<tr><td>270</td><td colspan="2">MDEntryPx</td><td>Y</td><td>Price</td><td>Price of the entry</td></tr>
<tr><td>271</td><td colspan="2">MDEntrySize</td><td>Y</td><td>Qty</td><td>Quantity or volume represented by the Market Data Entry. Will contain zero for aggregate (candle) data</td></tr>
<tr><td>272</td><td colspan="2">MDEntryDate</td><td>Y</td><td>UTC date</td><td>Date of the Market Data Entry</td></tr>
<tr><td>273</td><td colspan="2">MDEntryTime</td><td>Y</td><td>UTC time</td><td>Time of the Market Data Entry</td></tr>
<tr><td>451</td><td colspan="2">NetChgPrevDay</td><td>N</td><td>PriceOffset</td><td>If the system is configured to distribute net change data, contains net change value from previous day’s closing price vs. this market data update. The value is always rounded to 6 decimal digits</td></tr>
<tr><td>6409</td><td colspan="2">NetChgPrevDayPercent</td><td>N</td><td>PriceOffset</td><td>If the system is configured to distribute net change data, contains net change value from previous day’s closing price vs. this market data update (as a percent of previous day close price). The value is always rounded to 6 decimal digits</td></tr>
<tr><td colspan="3"><strong><em>End Component &lt;MDIncGrp&gt;</em></strong></td><td></td><td></td><td></td></tr>
<tr><td></td><td colspan="2">&lt;Standard Trailer&gt;</td><td>Y</td><td></td><td></td></tr>
</table>

#### Market data snapshot full refresh

<table>
<tr><th><strong>Tag</strong></th><th colspan="2"><strong>Field Name</strong></th><th><strong>Required</strong></th><th><strong>Data Type</strong></th><th><strong>Comments</strong></th></tr>
<tr><td></td><td colspan="2">&lt;Standard Header&gt;</td><td>Y</td><td></td><td>MsgType = W</td></tr>
<tr><td>262</td><td colspan="2">MDReqID</td><td>Y</td><td>String</td><td>Unique identifier for Market Data Request assigned by the client system</td></tr>
<tr><td>911</td><td colspan="2">TotNumReports</td><td>N</td><td>Int</td><td>Total number of reports returned in response to a request. Present only in quotes snapshots</td></tr>
<tr><td>1500</td><td colspan="2">MDStreamID</td><td>N</td><td>String</td><td>The identifier or name of the price stream</td></tr>
<tr><td>6408</td><td colspan="2">CandleType</td><td>N</td><td>String</td><td>The identifier of candle period, only sent for candle data</td></tr>
<tr><td>55</td><td colspan="2">Symbol</td><td>Y</td><td>String</td><td>Instrument symbol</td></tr>
<tr><td>451</td><td colspan="2">NetChgPrevDay</td><td>N</td><td>PriceOffset</td><td>If the system is configured to distribute net change data, it contains net change value from the previous day’s closing price vs. this market data snapshot. The value is always rounded to 6 decimal digits</td></tr>
<tr><td>6409</td><td colspan="2">NetChgPrevDayPercent</td><td>N</td><td>PriceOffset</td><td>If the system is configured to distribute net change data, it contains net change value from the previous day’s closing price vs. this market data snapshot (as a percent of previous day close price). The value is always rounded to 6 decimal digits</td></tr>
<tr><td colspan="3"><strong><em>Component &lt;MDFullGrp&gt;</em></strong></td><td>Y</td><td></td><td>Full snapshot of market data for the instrument</td></tr>
<tr><td>268</td><td colspan="2">NoMDEntries</td><td>Y</td><td>Int</td><td>Number of entries in the market data message</td></tr>
<tr><td>269</td><td colspan="2">MDEntryType</td><td>Y</td><td></td><td>Type of data. Supported values are:</td></tr>
<tr><td>278</td><td colspan="2">MDEntryID</td><td>Y</td><td>String</td><td>Unique Market Data Entry identifier</td></tr>
<tr><td>270</td><td colspan="2">MDEntryPx</td><td>N</td><td>Price</td><td>Price of the entry. This field is absent when tag 269 is 'Empty book'</td></tr>
<tr><td>271</td><td colspan="2">MDEntrySize</td><td>N</td><td>Qty</td><td>Quantity or volume represented by the Market Data Entry. Will contain zero for aggregate (candle) data. This field is absent when tag 269 is 'Empty book'</td></tr>
<tr><td>272</td><td colspan="2">MDEntryDate</td><td>Y</td><td>UTC date</td><td>Date of the Market Data Entry</td></tr>
<tr><td>273</td><td colspan="2">MDEntryTime</td><td>Y</td><td>UTC time</td><td>Time of the Market Data Entry</td></tr>
<tr><td colspan="3"><strong><em>End Component &lt;MDFullGrp&gt;</em></strong></td><td></td><td></td><td></td></tr>
<tr><td></td><td colspan="2">&lt;Standard Trailer&gt;</td><td>Y</td><td></td><td></td></tr>
</table>

The API will send the most recent candle as a snapshot.
