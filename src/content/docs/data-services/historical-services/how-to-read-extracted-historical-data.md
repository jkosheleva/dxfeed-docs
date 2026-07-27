---
title: "How to Read Extracted Historical Data"
paligoOriginId: "907"
---

## CSV format

To check the CSV format, just extract provided files and open them in terminal, or Excel, or in any other preferred viewer.

## Binary format

To check the quality of extracted historical data, take the following steps:

### Step 1

1. Download [Java and QDS APIs](https://www.dxfeed.com/dxfeed-apis/).
2. Launch the multiplexor locally.

**Multiplexor launching**

```
dxfeed-api\lib> java -jar qds-tools.jar multiplexor file:C:\Users\username\Desktop\TimeAndSale[readAs=raw_data,start=20190621-000000-0400,stop=20190621-230000-0400,speed=max] :6666 -c all-se
```

```
qds-tools.jar - needed lib
multiplexor - needed command
file:*****\Desktop\TimeAndSale - path to the binary file.
start and stop - timeframe of reading
speed=max - how quick the data will be flowing
:6666 - port to connect
```

### Step 2

1. Log on.
2. Find samples.
3. Use **\c-api-5.5.2\bin\x86\CommandLineSample.exe** to connect to the multiplexor.
