import * as detective from "../dist";

const token = "L9MVfwaeoPxNFaMxDEf6hbbpxjEdR5nHTLK2c4f9iNnxcmYj";
const endpoint = "https://api.eosdetective.semiofficial.io/v0/";

detective.config(token, endpoint);
detective.profile("eosnationftw").then((profile) => console.log(profile));
