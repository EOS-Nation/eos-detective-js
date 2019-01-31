import Axios from "axios"
import * as fs from "fs";
import * as path from "path";
import { JsonRpc, Api } from "eosjs";
import JsSignatureProvider from "eosjs/dist/eosjs-jssig";

const fetch = require("isomorphic-fetch");
const { TextEncoder, TextDecoder } = require("util");

/**
 * Settings
 *
 * @private
 */
class Settings {
    public token: string = "";
    public private_key: string = "";
    public endpoint = "https://api.eosdetective.semiofficial.io/v0/";
    public endpoint_eosio = "https://api.eosn.io";
    public actor = "";
    public permission = "active";
    public contract = "eosdetective";

    public get signatureProvider () {
        if (!this.private_key) { throw new Error("[private_key] is required"); }
        return new JsSignatureProvider([this.private_key]);
    }

    public get rpc () {
        if (!this.endpoint_eosio) { throw new Error("[endpoint_eosio] is required"); }
        return new JsonRpc(this.endpoint_eosio, { fetch });
    }

    public get api () {
        const rpc = this.rpc;
        const signatureProvider = this.signatureProvider;
        return new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
    }

    public get authorization () {
        if (!this.actor) { throw new Error("[actor] is required"); }
        if (!this.permission) { throw new Error("[permission] is required"); }
        return [{
            actor: this.actor,
            permission: this.permission
        }];
    }
}

export function config(token: string, options: {
    /**
     * EOS Detective API Token
     */
    token?: string,
    /**
     * EOS Detective API endpoint
     *
     * @default "https://api.eosdetective.semiofficial.io/v0/"
     */
    endpoint?: string,
    /**
     * EOSIO API endpoint
     *
     * @default "https://api.eosn.io"
     */
    endpoint_eosio?: string,
    /**
     * EOISO account name
     */
    actor?: string,
    /**
     * EOSIO account's permission
     *
     * @default "active"
     */
    permission?: string,
    /**
     * EOSIO Private Key for account
     */
    private_key?: string,
    /**
     * EOS Detective Smart Contract
     *
     * @default "eosdetective"
     */
    contract?: string,
} = {}) {
    if (!token) { throw new Error("[token] is required"); }

    // Read environment variables if `token` = `.env`
    if (token.includes(".env")) {
        if (!fs.existsSync(token)) { throw new Error("[token] .env filepath does not exist"); }
        require('dotenv').config(path.join(__dirname, "..", ".env"));
        settings.token = process.env.DETECTIVE_TOKEN || settings.token;
        settings.contract = process.env.DETECTIVE_CONTRACT || settings.contract;
        settings.endpoint = process.env.DETECTIVE_ENDPOINT || settings.endpoint;
        settings.actor = process.env.ACTOR || settings.actor;
        settings.private_key = process.env.PRIVATE_KEY || settings.private_key;
        settings.permission = process.env.PERMISSION || settings.permission;
        settings.endpoint_eosio = process.env.ENDPOINT_EOSIO || settings.endpoint_eosio;
    } else {
        settings.token = token;
    }

    // Optional Detective params
    settings.token = options.token || settings.token;
    settings.endpoint = options.endpoint || settings.endpoint;
    settings.contract = options.contract || settings.contract;

    // Optional EOSIO params
    settings.endpoint_eosio = options.endpoint_eosio || settings.endpoint_eosio;
    settings.private_key = options.private_key || settings.private_key;
    settings.actor = options.actor || settings.actor;
    settings.permission = options.permission || settings.permission;

    // Set globals
    Axios.defaults.baseURL = settings.endpoint
    Axios.defaults.headers.common["X-Api-Key"] = settings.token

    if (!settings.token) { throw new Error("[settings.token] is required"); }
}

export const settings = new Settings();
