---
title: "API versioning"
paligoResourceId: "63570"
---

Retail Services Platform supports two API versions: API v1 and API v2. These versions are functionally identical, except for one method, Activate subscription (see the [Activate subscription v2](/dxfeed-retail-products/retail-services-platform/retail-services-platform-api/subscription-related-methods/#activate-subscription-v2) description). It is important to note that these APIs are designed to be backward compatible, and while they remain compatible, we do not increment the version number. However, we retain the right to enhance existing methods by introducing new non-mandatory fields in request bodies and responses in order to improve functionality and serve new needs.

Partner responsibility disclaimer: To accommodate these enhancements, we encourage our partners to be proactive in implementing endpoints on their side. This will ensure a smoother transition when new non-mandatory fields are introduced, preventing any unforeseen disruptions in the workflow.
