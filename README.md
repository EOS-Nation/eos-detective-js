# EOS Detective

EOS Detective Javascript Library <https://eosdetectvie.io> API on EOS networks.

## Install

Using Yarn:

```bash
yarn add eos-detective
```

or using NPM:

```bash
npm install --save eos-detective
```

## Quick Start

```js
import * as detective from "../";

const token = "<API TOKEN>";
const endpoint = "https://api.eosdetective.semiofficial.io/v0/";

detective.config(token, endpoint);
detective.profile("eosnationftw").then((profile) => console.log(profile));
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
