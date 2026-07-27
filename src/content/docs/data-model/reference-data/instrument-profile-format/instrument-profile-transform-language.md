---
title: "Instrument Profile Transform Language"
paligoOriginId: "44712"
---

## Overview

The sources of instrument profile often lack certain important data or interpret some data differently. As a result, instrument profiles shall be modified to make data complete and consistent. This operation is called data transformation and is performed using instructions written in a special **transform** programming language. The complete set of instructions is executed for each instrument profile independently, and modified profiles are then distributed to recipients. Syntax of the transform language is based on Java programming language, although the set of supported features is much smaller. The main syntax difference is the **switch** statement — there is no such thing as **break** statements and no **fall through** from top to bottom — instead each label must have exactly one execution statement (although it can be a block statement, etc.).

## List of features

The transform language supports the following list of features and constructs:

```
// Basic expression syntax from lowest precedence to highest precedence:
A ? B : C                         // Conditional expressions
(A || !B) && C || D               // Logical expressions
A == B || C != D                  // Equality expressions
A < B || C >= D                   // Relational expressions
A like "pattern"                  // "like" expressions (relational)
A in (B, C, D)                    // "in" expressions (relational)
A + (B - C)                       // Additive expressions
A * (B / D) % E                   // Multiplicative expressions
!A, +B, -C                        // Unary expressions
replaceAll(A, "pattern", B)       // Replacement expressions (functions)
replaceFirst(A, "pattern", B)

// Terminal literals:
SYMBOL, CUSIP, SPC, STRIKE, ...     // Field references
"It's a \"text\"\n", 'hi'         // Textual constants
0, 123, 3.45, .5, 2.0             // Numeric constants
true, false                       // Boolean constants

// Statement constructs:
A; B; C;                          // Simple statements
{A; B; C;}                        // Block statements
if (A) B; if (A) B; else C;       // "if-then-else" statements
switch (A) {                      // "switch" statements
case B:  C;
case D:  {E; F;}
default: if (G) H; else I;
}
A = B; A += B; A -= B;            // Assignment statements
A *= B; A /= B; A %= B;

// Procedures (terminal statements):
delete();                         // Deletes current instrument profile.
primary("IBM");                   // Selects new primary UNDERLYING "IBM"
                                  // from additional underlyings.
rename("MSFT", "GOOG");           // Renames UNDERLYING (primary and additional)
                                  // from "MSFT" to "GOOG".
cmeproduct("Wheat Futures,,ETH", 50, 1, 1, 100);
                                  // Adjusts CME products for missing data.

Here is a sample transform program:
// Delete FLEX options - they are not currently supported.
if (OPTION_TYPE == "FLEX") delete();

// Rename underlyings with subclasses to proper symbology.
rename("BBIB", "BBI/B");
rename("CBSA", "CBS/A");
rename("TRXB", "TRX/B");
rename("VIAB", "VIA/B");

// Move European OEX options to XEO underlying.
if (UNDERLYING == "OEX" && CFI like "O.E...") UNDERLYING = "XEO";

// Move FRO options to proper underlyings (AMEX FRO Settlement Indices).
if (OPTION_TYPE == "BINY")
switch (UNDERLYING) {
case "AAPL": UNDERLYING = "AXO";
case "C":    UNDERLYING = "EFH";
case "IBM":  UNDERLYING = "TSB";
case "SPY":  UNDERLYING = "SQY";
}

// Mark options with "Weeklys"/"Quarterlys" flag.
if (OPTION_TYPE == "SDO" && UNDERLYING == "SPX" && SYMBOL like "\.JX[ABDE]..")
    EXPIRATION_STYLE = "Weeklys";
if (OPTION_TYPE == "SDO" && UNDERLYING == "XSP" && SYMBOL like "\.JG[ABDE]..")
    EXPIRATION_STYLE = "Weeklys";
if (OPTION_TYPE == "SDO" && UNDERLYING == "OEX" && SYMBOL like "\.RZ[ABDE]..")
    EXPIRATION_STYLE = "Weeklys";
if (OPTION_TYPE == "SDO" && UNDERLYING == "XEO" && SYMBOL like "\.KF[ABDE]..")
    EXPIRATION_STYLE = "Weeklys";
if (OPTION_TYPE == "SDO" && EXPIRATION_STYLE == "")
    EXPIRATION_STYLE = "Quarterlys";

// Adjust last trading day to reflect reality.
if (TYPE == "OPTION" && OPTION_TYPE != "SDO" && LAST_TRADE != 0)
    LAST_TRADE -= 1;
if (TYPE == "OPTION" && EXPIRATION_STYLE != "Quarterlys" && LAST_TRADE != 0 &&
  UNDERLYING in ("DJX", "DXL", "GOX", "HGX", "MID", "MNX", "MSH", "NDX",
  "OIX", "OSX", "RMN", "RUI", "RUT", "SML", "SOX", "SPX", "XSP"))
    LAST_TRADE -= 1;
```
