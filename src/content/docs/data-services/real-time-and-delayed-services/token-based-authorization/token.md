---
title: "Token"
paligoInternal: true
paligoOriginId: "49504"
---

## Token format

Self-signed token format: `token := encoded-payload "."` signature

```
encoded-payload := BASE64(UTF8(payload))
signature := BASE64(HMAC-SHA256(encoded-payload, UTF8(secret)))
payload := issuer "," subject "," not-before-time "," expiration-time "," issued-at-time "," message,
```

where:

- `secret` — the key used for signature validation, and is provided by dxFeed
- `issuer` — principal that issued this token, and is provided by dxFeed
- `subject`, `session`, `sessionType`, `contract` — subject of this token, and is provided by dxFeed. It determines whether the connection type is **pro** or **non-pro**. The field name may vary depending on the API implementation.
- `not-before-time` — time when token will be valid
- `expiration-time` — expiration time of the token, after which the token will not be valid
- `issued-at-time` — when this token was issued
- `message` - explicit `<user ID>, <filter_1>;…;<filter_n>` if specified by dxFeed team. Otherwise, `<user ID>` can be any string.
  
  
  
  - `<filter_1>;…;<filter_n>` — a list of QD filters enabled on the dxFeed side for the user if specified. For example, `<Nasdaq>;<CME>`
  - `<filter_1>;…;<filter_n>` — empty if not specified

:::note
Please contact your sales manager or use [Contact Sales](https://www.dxfeed.com/contact-us/) form on the website to get your access.
:::

**Example**

```
secret=Uy93w67t5nA2M2Um4BBns44Y936pz3g6LM4qW1bO31oAzNd14238SA5v3ZM9c0no
issuer=clientname
subject=bitip
filter=BORSA
```

All time variables are specified in seconds from the epoch, in UTC.

For additional information, please check:

- [UTF-8](https://en.wikipedia.org/wiki/UTF-8)
- [Base64](https://en.wikipedia.org/wiki/Base64)
- [HMAC-SHA256](https://msdn.microsoft.com/en-us/library/system.security.cryptography.hmacsha256(v=vs.110).aspx)

## Token generation

To receive dxFeed's data feed, generate a personal short-lived access token to prevent token leakage. The recommended process is as follows:

1. The client logs into the App.
2. Check the client's permissions.
3. Generate the client's token (the token may contain different permissions and lifetime).
4. The client's App connects to our endpoint with this token.
5. We provide data to the client's App.

If you've already generated your token, refer to the [Retail Onboarding Guide](/dxfeed-retail-products/retail-eshop/retail-eshop-onboarding-guide/#retail-eshop-onboarding-guide) section.

:::note
Generate a new token when the current token expires.
:::

:::note
Use `user_ID` to identify clients.
:::

### Examples

#### IPF web service

```bash
curl -H "Authorization: Bearer <token>" -X GET 
"https://yourendpoint.dxfeed.com/ipf"
```

#### Candle web service

```bash
curl -H "Authorization: Bearer <token>" -X GET 
"https://yourendpoint.dxfeed.com/candledata?records=Candle&symbols=AAPL%7B=m%7D,AAPL%7B=15m%7D,AAPL%7B=d%7D&start=20190201-000000&stop=20190304-000000"
```

## Java implementation

Set classpath to the folder with auther-api.jar. You get access to the library:

- [com.devexperts.mdd.auth.entitle.EntitleLoginHandlerFactory](https://dxfeed.jfrog.io/artifactory/maven/com/devexperts/mdd/) - login handler factory that plugs into dxFeed API via manifest (by implementing com.devexperts.qd.qtp.auth.QDLoginHandlerFactory service interface - see META-INF/ folder).
- [com.devexperts.mdd.auth.entitle.SampleClient](https://dxfeed.jfrog.io/artifactory/maven/com/devexperts/mdd/) - sample client code to test the connection. In order to use login handler factory, connection string must specify **login=entitle**.
- [com.devexperts.mdd.auth.util.SignedToken](https://dxfeed.jfrog.io/artifactory/maven/com/devexperts/mdd/) - it is used to create tokens signed by a shared secret.

To generate the token, please use the following code:

```
return SignedToken.newBuilder()
    .setIssuer(issuer)
    .setSubject(sessionType)
    .setMessage(user)
    .setIssuedNow()
    .setExpirationFromNow(Duration.ofDays(1))
    .toToken()
    .signToken(secret);
```

where

- `issuer` - principal that issued this token
- `sessionType` - session provided by dxFeed team
- `user` - user ID or `<user ID>,<filter_1>;…;<filter_n>` if feeds are specified for your connection by dxFeed team (e.g., '`testuser,opra;cme`')
- `secret` - the key used for signature validation

### Error handling

You can handle errors from the server. For this, please change `EntitleLoginHandlerFactory.AutherLoginHandler#login(String)` to react to errors from dxFeed by analyzing the reason parameter. To find session duplicate events, search for **Duplicate session** text in the error description.

## C# implementation

For C#, please generate a token with this code:

```javascript
using System;
using System.Security.Cryptography;
using System.Text;

namespace AutherTokenGen {
    internal class Program {
        private const string DefaultIssuer = "<name>";
        private const string DefaultSessionType = "<session>";
        private const string DefaultMessage = "<message>";
        private const string DefaultSecret = "<secret>";
        private const int DefaultDays = 1;

        private static readonly UTF8Encoding Encoding = new UTF8Encoding();

        private static byte[] GetUtf8Bytes(string s) {
            return new UTF8Encoding().GetBytes(s);

        }

        private static string ToBase64(string s) {
            return ToBase64(Encoding.GetBytes(s));
        }

        private static string ToBase64(byte[] bytes) {
            return Convert
                .ToBase64String(bytes)
                .TrimEnd('=')
                .Replace('+', '-')
                .Replace('/', '_');
        }

        public static void Main(string[] args) {
            const string help = "AutherTokenGen <issuer> <sessionType> <user|message> <secret> <days>";

            var issuer = DefaultIssuer;
            var sessionType = DefaultSessionType;
            var message = DefaultMessage;
            var secret = DefaultSecret;
            var days = DefaultDays;

            switch (args.Length) {
                case 4:
                case 5: {
                    issuer = args[0];
                    sessionType = args[1];
                    message = args[2];
                    secret = args[3];

                    if (args.Length == 5) {
                        if (!int.TryParse(args[4], out days)) {
                            days = DefaultDays;
                        }
                    }

                    break;
                }

                case 0:
                    Console.WriteLine($"Usage: \n{help}\n");
                    break;
                default:
                    Console.WriteLine($"Usage: \n{help}\n");

                    return;
            }

            Console.WriteLine(
                $"Issuer = {issuer}, SessionType = {sessionType}, User|Message = {message}, Secret = {secret}, Days = {days}\n");

            var now = DateTime.UtcNow;
            var expiration = now.AddDays(days);
            var nowSeconds = new DateTimeOffset(now).ToUnixTimeSeconds();
            var expirationSeconds = new DateTimeOffset(expiration).ToUnixTimeSeconds();
            var payload = $"{issuer},{sessionType},,{expirationSeconds},{nowSeconds},{message}";

            Console.WriteLine($"Payload: {payload}\n");
            var encodedPayload = ToBase64(payload);
            var hmac = new HMACSHA256(GetUtf8Bytes(secret));
            var signature = ToBase64(hmac.ComputeHash(GetUtf8Bytes(encodedPayload)));
            var token = $"{encodedPayload}.{signature}";
            Console.WriteLine($"Token: {token}\n");
        }
    }
}
```

## JavaScript implementation

For JavaScript, please generate a token with this code:

```javascript
/** Dependencies */
import CryptoJS from 'crypto-js';

/**
 * @description Generate dxFeed API Self-Signed Token
 */
export const createAuthToken = (secret, issuer, session, message, days) => {
  try {
    const notBeforeTime = '';
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    const expirationTime = Math.floor(expirationDate.getTime() / 1000);
    const issuedAtTime = Math.floor(Date.now() / 1000);

    const payload = [issuer, session, notBeforeTime, expirationTime, issuedAtTime, message].join(',');

    const encodedPayload = Buffer.from(encodeURI(payload)).toString('base64').split('=')[0];

    const hash = CryptoJS.HmacSHA256(encodedPayload, encodeURI(secret));

    const signature = CryptoJS.enc.Base64.stringify(hash)
      .split('=')[0]
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    return `${encodedPayload}.${signature}`;
  } catch (err) {
    return Promise.reject(err)
  }
}
```

## Python implementation

For python, please generate a token with this code:

```python
# imports for generate_token function
from time import time
from base64 import b64encode
from urllib.parse import quote
import hmac
from hashlib import sha256

def generate_token(issuer: str,
                   session: str,
                   secret: str,
                   message: str,
                   days: int) -> str:
    """
    Generate dxFeed API Self-Signed Token

    Parameters
    ----------
    issuer: str
        Principal that issued this token.
    session: str
        Session provided by dxFeed team.
    secret: str
        The key used for signature validation.
    message: str
        Any string (or '<user ID>, <filter_1>;…;<filter_n>' if specified by dxFeed team).
    days: str
        Number of days the token is valid for.

    Returns
    -------
    token: str
        Ready-to-use token
    """
    # get the required timestamps
    not_before_time = ''
    expiration_time = int(time() + (int(days) * 86400))  # number of sec in day
    issued_at_time = int(time())

    # generate the payload string
    payload = quote(
        f'{issuer},{session},{not_before_time},{expiration_time},{issued_at_time},{message}',
        safe="~@#$&()*!+=:;,.?/\'")

    # encode and hash the various parts to create the final token.
    encoded_payload = b64encode(payload.encode()).decode().split('=')[0]

    signature_hash = hmac.new(
        bytes(quote(secret, safe="~@#$&()*!=:;,.?/'"), 'latin-1'),
        msg=bytes(encoded_payload, 'latin-1'),
        digestmod=sha256).digest()

    # format the signature hash
    signature = b64encode(signature_hash).decode().split('=')[0]\
        .replace('+', '-').replace('/', '_')

    # join the encoded payload and signature to complete the token
    token = '.'.join([encoded_payload, signature])
    return token
```

## Token generation sample

To test a token generation, you can use auther.jar in command line mode:

```
java -cp auther.jar com.devexperts.mdd.auth.entitle.SignedTokenGenerator <name> <session> test uithoophaivahG3aa2uS2eu9eich6aef2JaeTh2rus7Vaec7SeeNgunaexaefini
```

Output:

```
ZnhzdHJlZXQscmVhbHRpbWUsLDE1NTkyMzA5MzMsMTU1OTE0NDUzMyx0ZXN0.DIkBUkhgiNa0Bsmbgo0vGhp78KIjPGT80PlG3W7f3IY
```

To test a token generation with multiple feeds specified:

```
Issuer=terminal
SessionType=terminal-pro or terminal-nonpro
Message=testuser,termCMEGROUP;termCME;termCBOT;termNYMEX;termCOMEX;termEUREX;termCTAUTP;termBISTfut
Secret=secret for current session type provided
```

:::note
You can specify any amount of your feeds
:::
