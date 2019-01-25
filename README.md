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
import * as detective from "eos-detective";

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

## Advance Configuration

These configurations are required to push detective reports on-chain.

```js
const token = "<API TOKEN>";
const private_key "<EOSIO PRIVATE KEY>";
const actor = "<EOSIO ACCOUNT>";
const permission = "active";

detective.config(token, {private_key, permission, actor})
```