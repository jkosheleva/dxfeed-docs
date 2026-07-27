---
title: "dxLibOptions Library"
pagefind: false
paligoOriginId: "938"
---

## dxLibOptions

dxLibOptions is a library that provides several arb-free pricing algorithms for options, as well as various helper algorithms. Below is short summary for provided algorithms as well as pointers to detailed descriptions and proofs.

## Option pricing algorithms

### Binomial Tree Pricing

**Class:**[com.devexperts.options.pricing.BinomialTreePricing](https://dxfeed.jfrog.io/artifactory/maven/com/devexperts/dxlib-options)

**Directly provided results:** price, delta, gamma.

**Suitable for:** log normal vanilla American and European options without dividend schedule.

**Complexity:** O(n2)O\left(n^2\right), where nn - number of steps.

Algorithm divides time until expiration into given number of equal segments. During each segment stock goes either up or down in price. There are two methods to calculate prices and probabilities: Cox-Ross-Rubinstein and Leisen-Reimer. Cox-Ross-Rubunstein tree example:

![dxFeed-LibOptions](/images/uuid-f3b8d1f0-5e5f-c3a1-8867-c1c8de1e6515.png)

**Further reading:**

- [Binominal options pricing model](https://en.wikipedia.org/wiki/Binomial_options_pricing_model)
- ["Binominal Models for Option Valuation - Examing and Improving Convergence"](https://downloads.dxfeed.com/specifications/dxLibOptions/Leisen+Reimer+Binomial+tree.pdf) by Dietmar Leisen and Matthias Reimer (original document can be found [here](http://janroman.dhis.org/finance/Binomial%20Models/Leisen%20Reimer%20Binomial%20tree.pdf))

### Bjerksund-Stensland Pricing

**Class:** [com.devexperts.options.pricing.BjerksundStenslandPricing](https://dxfeed.jfrog.io/artifactory/maven/com/devexperts/dxlib-options)

**Directly provided results:** price

**Suitable for:** log normal vanilla American options without dividend schedule.

- **Complexity:** O(1)O(1)

Algorithm uses Black-Scholes model with one or two early exercise strategies:

- One boundary method uses precalculated boundary (I)(I).
- Two boundary method uses precalculated boundary (I1)(I_1) until time (T1)(T_1) and precalculated boundary (I2)(I_2)afterwards.

**Further reading:** ["Numerical Methods versus Bjerksund and Stensland Approximations for American Options Pricing"](https://downloads.dxfeed.com/specifications/dxLibOptions/Numerical-Methods-versus-Bjerksund-and-Stensland-Approximations-for-American-Options-Pricing-.pdf) by Marasovic Branka, Aljinovic Zdravka, Poklepovic Tea Section IV. (Original document can be found [here](https://publications.waset.org/9997945/pdf)).

### Black-Scholes Pricing

**Class:** [com.devexperts.options.pricing.BlackScholesPricing](https://dxfeed.jfrog.io/artifactory/maven/com/devexperts/dxlib-options)

**Directly provided results:** price, delta, gamma, theta, vega, rho, phi, carry_rho, speed, vanna, vomma, ultima, zomma, charm, veta, color, totto, strike_delta, strike_gamma.

**Suitable for:** log normal vanilla and binary European options without dividend schedule.

**Complexity:** O(1)O\left(1\right)

Algorithm uses Black-Scholes model, namely it has following assumptions about market:

- There is constant risk-free interest rate and there is fee free opportunity to borrow or lend any amount of cash (even fractional) at this rate.
- Stock price is geometric Brownian motion with constant drift and volatility and there is fee free opportunity to buy and sell (including short sell) the stock at this price.
- Stock pays constant continuous dividends.
- There is no arbitrage opportunity.

**Further reading:** [Black-Scholes model](https://en.wikipedia.org/wiki/Black%E2%80%93Scholes_model).

### Black-Scholes Universal Pricing

**Class:** [com.devexperts.options.pricing.BlackScholesUniversalPricing](https://dxfeed.jfrog.io/artifactory/maven/com/devexperts/dxlib-options)

**Directly provided results:** price, delta, gamma, theta, vega, rho, phi, vanna, vomma.

**Suitable for:** log normal vanilla, binary, single/double barrier (European payout for KO rebates) and single/double touch/no-touch European options without dividend schedule.

**Complexity:** O(1)O\left(1\right)

Algorithm uses Black-Scholes model with border condition to solve barrier and touch options.

**Further reading:** ["Barrier options"](https://downloads.dxfeed.com/specifications/dxLibOptions/barriers.pdf) (original document can be found [here](https://people.maths.ox.ac.uk/howison/barriers.pdf))

### Explicit Finite Difference Pricing

**Class:** [com.devexperts.options.pricing.ExplicitFiniteDifferencePricing](https://dxfeed.jfrog.io/artifactory/maven/com/devexperts/dxlib-options)

**Directly provided results:** price, delta, gamma, speed, theta, charm, color.

**Suitable for:** log normal vanilla, binary, single/double barrier and single/double touch/no-touch European and American options without dividend schedule.

**Complexity:** O(n)O\left(n\right), where nn - number of steps.

Algorithm uses finite difference method to solve Black-Scholes equation.

**Further reading:** ["Numerical Approximation of Black-Scholes equation"](https://downloads.dxfeed.com/specifications/dxLibOptions/Mosneagu.pdf) by Dina Dura and Ana-Maria Moşneagu (original document can be found [here](https://www.math.uaic.ro/~annalsmath/pdf-uri%20anale/F1(2010)/Mosneagu.pdf))

### Merton-Reiner-Rubinstein Barrier Pricing

**Class:** [com.devexperts.options.pricing.MertonReinerRubinsteinBarrierPricing](https://dxfeed.jfrog.io/artifactory/maven/com/devexperts/dxlib-options)

**Directly provided results:** price, delta, gamma, speed, theta, charm, color.

**Suitable for:** log normal single barrier (American payout for KO rebates) European options without dividend schedule.

**Complexity:** O(1)O\left(1\right)

Algorithm uses Black-Scholes model modified to account for single barriers.

**Further reading:** E. G. Haug "The complete guide to options pricing formulas"

### Monte-Carlo Pricing

**Class:** [com.devexperts.options.pricing.MonteCarloPricing](https://dxfeed.jfrog.io/artifactory/maven/com/devexperts/dxlib-options)

**Directly provided results:** price, delta, gamma, speed, theta, charm, color.

**Suitable for:** log normal vanilla European options.

**Complexity:** O(n)O\left(n\right), where nn - number of steps.

Algorithm uses Euler method on geometrical Brownian motion.

**Further reading:** ["Monte Carlo and Binomial Simulations for European Option Pricing"](https://downloads.dxfeed.com/specifications/dxLibOptions/Hon.pdf) by Robert Hon Section 3.2.1 (original document can be found [here](https://minerva.leeds.ac.uk/bbcswebdav/orgs/SCH_Computing/FYProj/reports/1213/Hon.pdf)).

## Other algorithms

### Finite difference derivative

**Class:** [com.devexperts.options.pricing.FiniteDifferenceDerivativeImpl](https://dxfeed.jfrog.io/artifactory/maven/com/devexperts/dxlib-options)

For all the greeks not provided by pricing algorithms calculation is done using finite difference derivative approximation. There is no need to do anything as any pricing algorithm will use this method if it do not support corresponding greek internally.

**Further reading:** [Finite difference](https://en.wikipedia.org/wiki/Finite_difference)

### Yield curve

**Class:** [com.devexperts.options.pricing.YieldCurve](https://dxfeed.jfrog.io/artifactory/maven/com/devexperts/dxlib-options)

Given prices of bonds with different expirations constructs interest rate curve for currency. Support bonds with and without coupons.

**Further reading:** ["Methods for Constructing a Yield Curve"](https://downloads.dxfeed.com/specifications/dxLibOptions/HaganWest.pdf) by Patrick S. Hagan and Graeme West (original document can be found [here](http://web.math.ku.dk/~rolf/HaganWest.pdf)).

## Examples

:::note
You can use any compatible pricing algorithm like in the examples below.
:::

### Pricing vanilla option – Black-Scholes

```
VanillaParams p = new VanillaParams();
p.setUnderlying(100);
p.setStrike(110);
p.setExpiration(0.5);
p.setVolatility(0.2);
p.setInterestRate(0.01);
p.setDividendYield(0.03);
p.setStyle(OptionStyle.EUROPEAN);
p.setPayoff(OptionPayoff.CALL);
BlackScholesPricing pr = new BlackScholesPricing();
double price = pr.computePrice(p);
```

### Pricing vanilla option – Bjerksund-Stensland

```
BjerksundStenslandPricing pricing = new BjerksundStenslandPricing();
pricing.setVariant(BjerksundStenslandPricing.Variant.ONE_BOUNDARY);
VanillaParams params = new VanillaParams();
params.setExpiration(3);
params.setStyle(OptionStyle.AMERICAN);
params.setInterestRate(0.08);
params.setStrike(100);
params.setVolatility(0.2);
params.setDividendYield(0.12);
params.setUnderlying(80);
params.setPayoff(OptionPayoff.PUT);
pricing.computePrice(params);
```

### Pricing double barrier option

```
VanillaParams p = new VanillaParams();
p.setStrike(100);
p.setUnderlying(90);
p.setExpiration(100d / 365);
p.setVolatility(0.22);
p.setInterestRate(0.0078);
p.setDividendYield(-0.004);
p.setPayoff(OptionPayoff.CALL);
VanillaBarrierOptionParams bp1 = new VanillaBarrierOptionParams();
bp1.setBase(p);
bp1.setBarrier(84);
bp1.setBarrierType(BarrierType.DOWN_OUT);
VanillaBarrierOptionParams bp2 = new VanillaBarrierOptionParams();
bp2.setBase(bp1);
bp2.setBarrierType(BarrierType.UP_IN);
bp2.setBarrier(104);
BlackScholesUniversalPricing pricing = new BlackScholesUniversalPricing();
UniversalParams up = new UniversalParams(p, bp2);
double price = pricing.computePrice(up);
```

### Building yield curve

```
double[] maturity = {1, 2, 3, 5, 7, 10, 20, 30};
double[] input = percentToFractions(0.60, 0.78, 0.91, 1.18, 1.44, 1.57, 1.90, 2.23);
YieldCurve constantResult = YieldCurve.bootstrap(maturity, input, 2, YieldCurve.BootstrappingMode.CONSTANT_RATE);
YieldCurve changingResult = YieldCurve.bootstrap(maturity, input, 2, YieldCurve.BootstrappingMode.CHANGING_RATE);
```
