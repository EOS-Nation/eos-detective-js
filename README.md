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
const EosDetective = require("eos-detective")

const endpoint = "eosdetective.io"
const token = "<Paste your API token here>"
const api = new EosDetective(endpoint, token)(async () => {
  const transfers = await api.transfers(["bitfinexdep1"], {
    direction: "incoming",
    quantity_min: 10000
  })
})()
```
