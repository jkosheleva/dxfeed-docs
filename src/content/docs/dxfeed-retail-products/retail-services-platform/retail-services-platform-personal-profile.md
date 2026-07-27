---
title: "Retail Services Platform Personal Profile"
paligoOriginId: "86456"
---

## Overview

This page provides a [description](#description) of the personal profile page available for end users of the Retail Services platform, including details on how to view signed agreements and update their personal data.

## Description

The **Personal profile** provides end users with access to their signed agreements and personal information, consisting of two relevant sections: **Agreements** and **Personal information**.

![PersonalInformationPage.png](/images/uuid-a16b8e84-ca03-f886-baa4-cfa75be34887.png)

## Agreements

In the **Agreements** section, users can review the agreements they have signed, including both the Privacy Policy* and exchange agreements.

If a user has not purchased any subscription yet or has not modified the **Personal information** fields, no agreements will be displayed in this section.

_*The Privacy Policy is obligatory to sign whenever a user makes changes to their personal data._

## Personal information

In the **Personal information** section, a user can fill their personal data fields if they are empty and/or modify them to **In the Personal information** section.

:::note
It is important to note that any changes made to user’s personal information after signing any exchange agreement affects the exchange reporting and may prompt additional compliance checks.
:::

The following general personal data fields are available on the page:

- First name
- Last name
- Country
- State/Province
- Address
- City
- ZIP/Postal code
- Billing address
- Phone number
- Job title
- Company name

If any metadata is sent in the [Create account](/dxfeed-retail-products/retail-services-platform/retail-services-platform-api/account-related-methods/#create-account) API method, the relevant fields are pre-filled with this information.

Additionally, a user who signs the CTA/UTP and/or Eurex exchange agreement(s) shall view the exchange-specific fields, including:

- Occupation
- Company Address
- Job Function
- LEI (Legal Entity Identifier)

### Email address

If a user account does not have an email associated with it, users can add it and verify as follows:

1. Enter an email address in the **Email** field and click **Send code**.
  
  
  
  If the email is already associated with another account, a warning will appear: _This email address is associated with an existing account. Please enter a different email._
2. Check the email inbox for a message with a verification code.
  
  
  
  If no email with the code is received, check the correctness of the entered email and click **Resend code**.
3. Enter the verification code in the appropriate field and click **Verify**.
4. Click **Submit**.
  
  
  
  The email will only be saved for the account after submitting the entire personal data form.

![Personal_information_Email.png](/images/uuid-4752f801-eb25-5d52-cac7-35c277f0bd69.png)

:::note
If a user has been blocked due to the exchange requirements and/or agreement violations, they can still view the page but are prohibited from making any changes to their personal information.
:::

For additional error cases, please refer to [Retail Services Platform Common Errors and Solutions](/dxfeed-retail-products/retail-services-platform/retail-services-platform-common-errors-and-solutions/#retail-services-platform-common-errors-and-solutions).
