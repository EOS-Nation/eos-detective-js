import * as detective from "../";

const token = "L9MVfwaeoPxNFaMxDEf6hbbpxjEdR5nHTLK2c4f9iNnxcmYj";
const endpoint = "https://api.eosdetective.semiofficial.io/v0/";

detective.config(token, endpoint);
detective.accounts("system").then((res) => console.log(res));
