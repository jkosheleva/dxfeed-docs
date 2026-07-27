---
title: "Testing"
paligoInternal: true
paligoOriginId: "49577"
---

To test token generation and data request, please use this command (for Java):

```
java -Dentitle=<issuer>,<session-name>,<user-id> -DentitleSecret=<session-secret> -jar auther-api.jar <host:port>[login=entitle] Quote IBM,GOOG,AAPL
```

where:

- `issuer` - principal that issued this token
- `session-name` - session provided by dxFeed team
- `user-id` - end-user identification
- `secret` - the key used for signature validation
- `-jar auther-api.jar` - path to auther-api (auther-api/lib/auther-api.jar)
- `<host:port>[login=entitle]` - endpoint provided by dxFeed support team

:::note
Token may be invalid as it has a lifetime and can expire.
:::

## Example

```
java -Dentitle=acme,demo,1234 -DentitleSecret=0123456789 -jar auther-api.jar localhost:7501[login=entitle] Quote IBM,GOOG,AAPL
```
