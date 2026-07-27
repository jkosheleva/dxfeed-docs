---
title: "Retail Services Platform Common Errors and Solutions"
paligoOriginId: "63585"
---

## Introduction

This page provides a list of errors that end users may encounter when submitting personal data in the onboarding wizard, along with instructions on how to address each error.

## Subscription activation error

_One or many subscriptions from your order haven't been activated because of the expiration. Please repeat your subscription or contact support._

### Description

There are several potential causes for this error:

1. A user follows a link to the onboarding wizard, but the partner’s application settings regarding subscriber status have been updated.
  
  
  
  For example, the user’s status has been set as professional (allowedStatuses = ONLY_PRO) in the [Create account](/dxfeed-retail-products/retail-services-platform/retail-services-platform-api/account-related-methods/#create-account) API request, and they follow the link to the onboarding wizard form, but the tenant’s allowed statuses value has been changed from **Both** to **Non-pro**.
2. A user whose subscriber status has been defined in the [Create account](/dxfeed-retail-products/retail-services-platform/retail-services-platform-api/account-related-methods/#create-account) API request selects a status that does not correspond to the one specified in the request and confirms it via the questionnaire form.
  
  
  
  For example, the user whose status has been specified as professional (allowedStatuses = ONLY_PRO) chooses "I am Non-Professional" and confirms it via the questionnaire form.
3. One or several feeds from the order have been archived before a user populated the onboarding wizard form.

### Solution

1. A partner should send a new link to the end user or contact our support team to make sure that their application has been correctly adjusted on our side.
2. A user should select a status that aligns with their predefined subscriber status and confirm it via the questionnaire form.
3. A partner should revise and order and send new feeds for activation.

## Subscription status conflict

1. _Sorry, this service is only available for non-professional subscribers._
2. _Sorry, this service is only available for professional subscribers._

### Description

This error occurs when a user whose status has been defined in the [Create account](/dxfeed-retail-products/retail-services-platform/retail-services-platform-api/account-related-methods/#create-account) API request follows a link to the onboarding wizard and selects a status that does not correspond to the one specified in the request.

### Solution

A user should select a status that aligns with their predefined subscriber status.

## Account restriction error

_Your account has been restricted._

### Description

There are several potential causes for this error:

1. A user has been blocked by a support engineer as part of our commitment to complying with the market exchange requirements when they violate agreements or other policies.
2. A user has been blocked because personal data that they submit matches a record in the blacklist. The blacklist ensures that violating users do not gain access to market data by creating new accounts.

### Solution

A partner should contact our support team to inquire about the specific proofs and steps required for unblocking the user. If a user fails to provide valid proof, our support team refrains from unblocking them.

## Missing personal data

_Please enter your <personal_data_type>._

### Description

This error occurs when a user leaves any field on the onboarding wizard form empty.

### Solution

A user should specify their personal data in designated fields.

## Invalid value

_Please enter a valid value._

### Description

This error occurs when a user inputs an unacceptable character into the field, which may include special characters or symbols.

### Solution

A user should enter a value using only valid characters, such as Latin letters, numbers, and common symbols.

## Link expired

_The link has expired._

### Description

This error occurs when a user attempts to access a link generated more than 72 hours via the [Get profile page](/dxfeed-retail-products/retail-services-platform/retail-services-platform-api/profile-related-methods/#get-profile-page) method.

### Solution

Generate a new link.
