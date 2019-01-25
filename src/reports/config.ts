import Axios from "axios"
import { JsonRpc, Api } from "eosjs";
import JsSignatureProvider from "eosjs/dist/eosjs-jssig";
import * as path from "path";

const { TextEncoder, TextDecoder } = require("util");
const fetch = require("node-fetch");

// System
export const EOSIO_API = process.env.EOSIO_API || "https://jungle.eosn.io";

// EOS Detective
if (!process.env.DETECTIVE_TOKEN) throw new Error("DETECTIVE_TOKEN is required as .env variable");
export const DETECTIVE_TOKEN = process.env.DETECTIVE_TOKEN;
export const DETECTIVE_API = process.env.DETECTIVE_API || "https://api.eosdetective.semiofficial.io/v0/";
export const DETECTIVE_CONTRACT = process.env.CONTRACT || "eosdetective";

// User Permissions
if (!process.env.ACTOR) throw new Error("ACTOR is required as .env variable");
if (!process.env.PERMISSION) throw new Error("PERMISSION is required as .env variable");
if (!process.env.PRIVATE_KEY) throw new Error("PRIVATE_KEY is required as .env variable");
if (!process.env.CONTRACT) throw new Error("CONTRACT is required as .env variable");
const PRIVATE_KEY = process.env.PRIVATE_KEY;
export const ACTOR = process.env.ACTOR;
export const PERMISSION = process.env.PERMISSION;

// EOSIO API
const signatureProvider = new JsSignatureProvider([PRIVATE_KEY]);
export const rpc = new JsonRpc(EOSIO_API, { fetch });
export const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
export const authorization = [{
    actor: ACTOR,
    permission: PERMISSION
}];
