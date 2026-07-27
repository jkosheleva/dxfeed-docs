---
title: "Technical Support Procedures"
paligoOriginId: "954"
---

## Support service components

### Overview

What we provide:

- Responsible divided support team, including 3 base layers: S1L, S2L, S3L
- A single phone number or [Help Desk](https://portal.dxfeed.com) to communicate service issues via 24x7x365 global Customer Support Help Desk
- Remote monitoring of the service status 24x7x365
- Monitoring system indicating % utilization, CPU, RAM, Disk
- Standby availability of dxFeed personnel to react to production issues, and on-going maintenance of the monitoring service itself
- Infrastructure change management notifications
- Rollout and testing of new operating system software in response to new features upgrades and bug fixes
- Incident reports and root cause analysis are supplied upon request

### Support functions

**Support requests**

dxFeed provides not only Incident resolution for their Customers, but also 24x7 Service Request Service. A request for change or for information can be sent anytime, and dxFeed team will make sure it is processed the best and fastest way possible.

**Exchange relations**

Exchange market data fees and policies for index calculation and derived data are set independently by each exchange, controlled by regulatory authorities and are not the responsibility of dxFeed. We - nor any other technology provider - have therefore the authority to negotiate those fees. dxFeed nevertheless volunteers to work closely with Client in contacting the exchanges, and liaising between Client and exchanges to ensure a smooth and quick exchange agreement approval process, and the sourcing of data in the most efficient and cost effective way. If Client already has arrangements in place with the corresponding exchanges, dxFeed also volunteers to contact those exchanges and confirm their authorization for dxFeed to deliver the data to Client, and subsequently, seamlessly, entitle the corresponding data for the Client.

**Service escalation process**

If any Problems are detected and/or reported, investigation starts immediately according to the identified Priority Level. The support team will always focus on the recovery of the service by switching to alternative systems and then take remedial action for the affected source. We have three support levels: SL1, SL2 and SL3. An issue is escalated to the next support level if required, and the support team personnel of the next level is getting involved immediately. The support team investigates the issue and decide if the development team should be alerted and confirms the appropriate plans to resolve the issue. Restarts and/or patch deployments are made in accordance to an agreed plan keeping all stakeholders involved and informed.

## Customer support process

### Overall process description

dxFeed has multilayered ITIL based support structure which is powered by industry standard processes, providing convenience and transparency for Customers. The high level of our maintenance and support processes was confirmed by the numerous audits run by several U.S. and Japanese companies. One of the main points of dxFeed support is Service Operations Processes. We applied several ITIL based processes in case of operations thresholds.

### Event management

A key element in any support service is the ability to detect the first signs of an upcoming Problem. For monitoring purposes dxFeed uses its flagship product MARS - a state-of-the-art monitoring system capable of monitoring most types of IT environments (Web, DB, OS, network, hardware, etc.) and offering the unique option of easily embedding monitoring code directly into the software solution. In addition, we have other powerful industry leader monitoring systems, like Zabbix. This allows Client and the dxFeed Service Desk to monitor any required software parameter or business value and keep highest uptime for the supported services.

### Incident management

All incidents involving the platform, data feed, 3d party data providers, services, etc. are reported to the support team and logged in Atlassian JIRA (SUPDXFD Service Desk Jira tracker). Every member of dxFeed team is able to see any detail of any issue, tracked in Jira Service Desk. This allows all relevant teams to participate in the issue handling process.

![help_center.png](/images/uuid-c62cbdca-9812-be12-2efe-711c970e3d7b.png)

All created issues have a specific JIRA workflow configuration, and contains relevant description and type, a level of priority, SLA information, communications history, etc.

![Screenshot_1.png](/images/uuid-e0e3beee-4d7e-ce77-c18e-41987845b36a.png)

![Screenshot_2.png](/images/uuid-5355d6c3-f9e4-9aac-0d94-6d91df0f2a4a.png)

### Problem management

The process is aimed at minimizing the impact of incidents on everyday activities of the business affected, as well as preventing potential Incidents resulting from system errors contained in the IT infrastructure, from happening. Many Incidents trigger a Problem investigation, where dxFeed team evaluates the root cause, time of impact, time of restoration of service, and other relevant details.

### Request fulfillment

dxFeed provides dedicated 24x7x365 support for all dxFeed products and handles technical issues via the following entry points:

- [Help Desk](https://portal.dxfeed.com)

#### Help Center request types

The Help Center provides several request types depending on the purpose:

- Ask a Question: Used for general inquiries, clarifications, or data-related questions
- Report an Incident: Used to report service disruptions or unexpected behavior
- Whitelist/Blacklist an IP address: Used to manage network access permissions
- Jira Portal Access: Used to request access to the Jira Service Desk portal
- Product Feedback: Used to share product suggestions or improvement ideas

#### Request processing

Incoming requests from Client staff to the dxFeed support team are entered into the dxFeed issues tracking database by a dxFeed support person, or automatically. Issues entered into this database are electronically time stamped and get a reference ID. All issues raised by the Customer remain "Pending" until processing of the issue is started. dxFeed support staff confirms with the Client before closing the issue and then informing the Client’s contact person. The reference ID is used to trace the status of outstanding issues.

dxFeed is also using automatic closure flow: if an issue is resolved and we have not gotten any response within 2 working days, it is going to be closed with corresponding notifications before and after close.

### Access management

Any proposed solution is fully hosted by dxFeed. No dedicated hardware is required on the Customer’s side.

The services can be accessed via the Internet, secure VPN, cross-connect (within the same data center), or extranet connection. Bandwidth estimates can be provided, based on the instrument universe required by the Client.

Connections to dxFeed utilize the industry standard TCP/IP suite, and are fully managed by the APIs provided. Full resilience is built into the hosted platform, meaning there is only a single hostname which Client can connect to.

Connections are fully load-balanced to ensure Clients do not need to take any action in their applications in the event of an outage or failure of an upstream component. Connected endpoints configuring by ALC on network layer, and by restrictions lists on web servers, which guarantee full division of rights and prevent any security violations.

For the Client side, dxFeed can also recommend a suitable hardware setup fitting the required level of resilience.

dxFeed provides full solution deployment and migration support as well as personalized consulting services. Together they serve the purpose of assisting Clients with research and design and complex project management. In addition, they also help with existing electronic trading system infrastructure reviews, network capacity and utilization reports, network risk analysis and network performance assessment and tuning.

dxFeed supports direct connectivity, Internet connectivity, connectivity via extranets (SFTI, TNS) and major leased line providers such as Radianz. We can help order and manage leased lines for our Clients (these would be ordered under dxFeed name and then licensed to the Client) or we can simply provide overall guidance with the connectivity project.

## Issues

### Issues description

**Scope**

Common algorithm of issues handling is provided on the scheme below. In addition, we are continuously improving our workflow according to the current situation and actual Customer needs. There are three base issue types: Incident, Service Call, and Problem.

- Service Call - an issue that is not related to any real Problem, loss of service, reputations corruption, or other valuable services. Service calls cover all Customers' enquiries except those caused by disruptions.
- Incident - an issue that affects the dxFeed service, business reputation, and other valuable services.
- Problem - a root cause of an Incident or several incidents. This type of issue is created by a support team after the Incident is resolved.
- Known bug - a problem which has been successfully diagnosed and for which a workaround solution has been developed.

We process Incident and Service Calls identically.

![Technical_Support_Procedures_1_1.png](/images/uuid-fc611a54-421a-0c87-8be8-2a014ba74ca9.png)

**Related actions**

**Request registration**

You may submit a request through the [Help Desk](https://portal.dxfeed.com).

**Type**

Issue type may change at any time when details become clear.

**Feature**

If a request contains some recommendations or requirements to improve dxFeed service, we evaluate resources and mark the issue as a feature request with an internal label. Then we keep discussing with Customer to evaluate the exact scope of the requested improvements.

**Priority**

Issue priority is used to determine the level of impact. Priority may be set by Customer or by dxFeed support team. Please notify us if you would like to change the priority status. Normal → Urgent → Critical → ASAP

**Request fulfillment**

After receiving a request, we provide the following information:

- Latest status of the issue related environment
- Implementation description (workflow)
- Affected systems/environments
- Expected down time
- Fix status, ETA, and other objectives

**Closure**

Requests can be closed after Client’s confirmation, or automatically if the issue is resolved and we have not received any response within 2 business days.

**Development**

During issue analysis, we may find that development is required. In this case, we open a related issue to development, QA, delivery team, and update the status.

**Problem**

Every Incident has been caused by something. Therefore, we automatically arise Problem, and find the root cause, preventions, and other details about the issue.

### SLA

For all requests SLA monitoring is performed:

![SLA](/images/uuid-156dbf8d-e3b0-16ec-c643-5ee83baecd8b.png)

The table below provides more information on timelines and actions performed by the support team:

| **Priority** | **Response time** | **Update freq.** | **Lead time** | **Classification from Consumer Perspective** | **Technical Support (S1/S2)** | **Engineering Team (S3)** | **Development Team (RnD)** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ASAP | 15m | 30m | 4h | Severe Production issues | Immediately escalate to S3L/Engineering<br/>Notify affected Customers | Resolve issue ASAP or escalate further if needed | Resolve issue ASAP |
| Critical | 30m | 4h | 24h (issue to be resolved by next trading day start) | Production issues<br/>Demo/Trial issues | Switch to backup, if available<br/>Notify Customers affected<br/>Escalate to S3L/Engineering if the issue causes ongoing service interruption | Resolve issue ASAP or escalate further if needed | Resolve issue ASAP |
| Urgent | 12h | 1d | 3d | Production issues<br/>Demo/Trial issues<br/>QA/Dev issues | Switch to backup, if available<br/>Notify Customers affected<br/>Escalate to S3L/Engineering at the start of the next business day | Resolve issue ASAP or escalate further if needed | Participate in issue investigation if needed |
| Normal | 1d | 1d | 3d | Any issues not causing service interruption/outage for any users (Prod, Demo, Trial, QA, Dev)<br/>Any functional issues (wrong/incorrect data, unexpected behavior, etc.) until prioritized higher by PM or Client<br/>Any Service Request | Register<br/>Resolve issue/complete request<br/>Escalate further if needed | Resolve issue/complete request<br/>Escalate further if needed | Participate in issue resolution if required |

### Incident and Service Call management workflow

We have implemented several methods of communication to inform Customers about issues as soon as possible. These methods include immediate reports to Customers, regular posts in the newsletters, and through project managers keeping in contact with the representatives of the Customers to update them on new subjects and developments.

![Technical_Support_Procedures_2.png](/images/uuid-4af7fbfc-f2e7-66df-7aa6-b1a2d90169fb.png)

**Definitions**

An issue may be processed as an Incident or a Service Call.

**Scope**

Process scope covers resolving Issues which are the responsibility of dxFeed.

#### Related actions

**Identification**

Information about an issue is obtained from Jira after the issue is created, or through phone.

**Investigation**

The process of investigation and diagnostics may follow repeated cycles when handled by each successive specialized support group that the issue is passed on to. Among those involved in that process may be S3, QA, R&D, and third-party support teams if required.

The aim is to complete the issue investigation within the SLA. In the course of investigation, it is determined which side is responsible for the issue solution.

**Resolution**

The time for an issue solution may vary depending on the particular case.

An issue is considered to be resolved in any of the following cases:

- Issue confirmed and development ticket is created. Fix will be planned in Development Release Management Cycle.
- Permanent fix applied and confirmed without additional development.
- Risk accepted by both sides. No fix is required.
- Issue is outside of our sphere of responsibility.

### Problem management workflow

**Definitions**

A Problem is a root cause of an Incident or several incidents.

Incident resolution consists of eliminating the disruption in question and restoring the normal functioning of the service. It can be done by submitting the required information, giving recommendations on configuring and performing operations in the system, all of which eliminate the disruption, patch delivery, "workaround solution" delivery. A workaround solution means resolving an Incident temporarily by means of either taking unconventional measures or limiting the applicability of a certain feature.

**Scope**

Process scope covers resolving Problems which are the responsibility of dxFeed. The Client gets notifications on the status. If the Problem lies beyond dxFeed responsibility, the third-party is notified and the Problem is closed.

![Technical_Support_Procedures_3.png](/images/uuid-257eee68-b9da-d79f-df6d-3570cb4fff6c.png)

#### Related actions

**Detection and registration**

Information about a Problem is obtained from an Incident handling. Problem ticket is created by dxFeed support team when the Incident has been closed and a workaround solution has been applied.

**Investigation**

The process of investigation and diagnostics may follow repeated cycles when handled by each successive specialized support group that the Problem is passed on to. Among those involved in that process may be S3, QA, R&D, and various third-party support teams.

The aim is to complete the Problem investigation within two weeks (if long term log collecting is not required). In the course of investigation, it is determined which side is responsible for the Problem solution.

**Resolution**

The time for problem solution may vary depending on the particular case.

Problem is considered to be resolved in any of the following cases:

- Bug confirmed and development ticket is created. Fix will be planned in Development Release Management Cycle.
- Permanent fix applied and confirmed without additional development.
- Risk accepted by both sides. No fix is required.
- Issue is outside of our sphere of responsibility (Network, Server/Storage, OS, Third party software, etc).
