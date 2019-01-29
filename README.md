# EOS Detective

EOS Detective Javascript Library <https://docs.eosdetective.io> API on EOS networks.

## Install

Using Yarn:

```bash
yarn add eos-detective
```

or using NPM:

```bash
npm install --save eos-detective
```

## Import Module

**CommonJS**

```js
const detective = require("eos-detective");
```

**Typescript (ES6)**

```js
import * as detective from "eos-detective";
```

**Babel (ES6)**

```js
import detective from "eos-detective";
```

## Quick Start

```js
const token = "<API TOKEN>";

detective.config(token);
detective.profile("eosnationftw").then((response) => console.log(response.data));
/**
 * {
 *   account: 'eosnationftw',
 *   contract: 'eosio.token',
 *   token: 'EOS',
 *   total_tokens_received: 74747.4845,
 *   score: 87.3,
 *   categories: {
 *     system: {
 *       percentage: 0.9994754378657384,
 *       volume: 74708.2748,
 *       count: 205
 *     }
 *   }
 * }
 */
```

## Profile Score & Category Rating

[Google Drive](https://docs.google.com/document/d/1h_bfAIld1lukqdbRGnCRijQZg-oEgvzHODlPDTWbNj8/edit#heading=h.jypgir76dpkx)

## Advance Configuration

These configurations are required to push detective reports on-chain.

Saving your configuraitons in a `.env` file will prevent your sensitive data from being exposed in your javascript source code.

**.env**

```env
# EOS Detective API
DETECTIVE_TOKEN="<API TOKEN>"
DETECTIVE_ENDPOINT="https://api.eosdetective.semiofficial.io/v0/"
DETECTIVE_CONTRACT="eosdetective"

# Publish EOS Detective Reports
ENDPOINT_EOSIO="https://jungle.eosn.io"
PRIVATE_KEY="<EOSIO PRIVATE KEY>"
ACTOR="<EOSIO ACCOUNT>"
PERMISSION="active"
```

Load your `.env` filepath by using the `config()` method.

```js
detective.config(".env")
```

## Publish Reports

Advanced configurations is **required** before attempting the following steps.

Once a profile is retrieved, it can be published to the EOS Detective smart contract.

```js
// Get Profile
detective.profile("eosnationftw").then(response => {
    const profile = response.data;

    // Post report on chain with scores greater than 70
    if (profile && profile.score >= 70) {
        detective.reports.post(profile).then((trx_id) => {
            console.log("posted report", trx_id);
        });
    }
})
```

## Remove Reports

Use `.remove(<account>)` to remove an existing published report.

```
detective.reports.remove("eosnationftw").then((trx_id) => {
    console.log("removed report", trx_id);
});
```