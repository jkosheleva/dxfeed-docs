---
title: "How to Request Market Events"
paligoOriginId: "916"
---

## How to get data

1. Check what symbols are available for you in your [IPF](https://tools.dxfeed.com/ipf).
2. Check available market depth.
3. Make a request via API.

## Java API

```java
import com.dxfeed.api.DXFeed;
import com.dxfeed.api.DXFeedSubscription;
import com.dxfeed.event.market.Quote;

/**
 * Subscribes to Quote events for a specified symbol and prints them until terminated.
 */
public class PrintQuoteEvents {
    public static void main(String[] args) throws InterruptedException {
        String symbol = args[0];
        // Use default DXFeed instance for that data feed address is defined by dxfeed.properties file
        DXFeedSubscription<Quote> sub = DXFeed.getInstance().createSubscription(Quote.class);
        sub.addEventListener(events -> {
            for (Quote quote : events)
                System.out.println(quote);
        });
        sub.addSymbols(symbol);
        Thread.sleep(Long.MAX_VALUE);
    }
}
```

## Rest API

Web:

```
https://tools.dxfeed.com/webservice/rest/events.json?events=Trade&symbols=AAPL,MSFT,IBM
```

## C# API

[Check samples](https://github.com/dxFeed/dxfeed-net-api/tree/master/samples)

## Python API

```python
import dxfeed as dx
# We need this package to use sleep()
import time
from datetime import datetime, timedelta  

endpoint = dx.Endpoint('demo.dxfeed.com:7300')
symbols = ['AAPL']

print(f'Connected address: {endpoint.address}')
print(f'Connection status: {endpoint.connection_status}')

trade_sub = endpoint.create_subscription('Trade')

trade_handler = dx.DefaultHandler()
trade_sub.set_event_handler(trade_handler);

trade_sub = trade_sub.add_symbols(symbols)

# The date we specify here is start date. 
# When it is datetime.now() it won't return anything, probably, 
# as effectively we say: "Give me TimeAndSales that happened just now".
# Let's say we need all TimeAndSales for the last 24h untill now.
tns_sub = endpoint.create_subscription('TimeAndSale', date_time=datetime.now() - timedelta(days=1)) \
                  .add_symbols(symbols)

tns_handler = tns_sub.get_event_handler()

print(f'TimeAndSale subscription event type: {tns_sub.event_type}')

print(f'Trade columns: {trade_handler.columns}')
# We need to wait for a while to allow for data reception
# otherwise program may exit before receiving anything
time.sleep(2)

# Default handler just stores everything it receives inside itself. 
# We can access it as a list or dataframe
print(tns_handler.get_dataframe())
trade_sub.close_subscription()
tns_sub.close_subscription()

endpoint.close_connection()
print(f'Connection status: {endpoint.connection_status}')
```
