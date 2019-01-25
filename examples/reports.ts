import * as path from "path";
import * as detective from "../";

// Private Settings;
require('dotenv').config(path.join(__dirname, "..", ".env"));
if (!process.env.DETECTIVE_TOKEN) throw new Error("[DETECTIVE_TOKEN] is required in .env");
const token = process.env.DETECTIVE_TOKEN;
const contract = process.env.DETECTIVE_CONTRACT;
const endpoint = process.env.DETECTIVE_ENDPOINT;
const actor = process.env.ACTOR;
const private_key = process.env.PRIVATE_KEY;
const permission = process.env.PERMISSION
const endpoint_eosio = process.env.ENDPOINT_EOSIO;

// Configure Detective
detective.config(token, {private_key, permission, actor, endpoint, endpoint_eosio, contract})

// Get Profile
detective.profile("eosnationftw").then(response => {
    const profile = response.data;

    // Post report on chain
    if (profile) {
        detective.reports.post(profile).then((trx_id) => {
            console.log("posted report", trx_id);
        });
    }
})
