import Axios from "axios"
import { JsonRpc, Api } from "eosjs";
import JsSignatureProvider from "eosjs/dist/eosjs-jssig";

const fetch = require("node-fetch");
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
        if (!this.private_key) throw new Error("[private_key] is required");
        return new JsSignatureProvider([this.private_key]);
    }
    public get rpc () {
        if (!this.endpoint_eosio) throw new Error("[endpoint_eosio] is required");
        return new JsonRpc(this.endpoint_eosio, { fetch });
    }

    public get api () {
        const rpc = this.rpc;
        const signatureProvider = this.signatureProvider;
        return new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
    }

    public get authorization () {
        if (!this.actor) throw new Error("[actor] is required");
        if (!this.permission) throw new Error("[permission] is required");
        return [{
            actor: this.actor,
            permission: this.permission
        }];
    }
}

export function config(token: string, options: {
    /**
     * EOS Detective API endpoint
     *
     * @default "https://api.eosdetective.semiofficial.io/v0/"
     */
    endpoint?: string | undefined,
    /**
     * EOSIO API endpoint
     *
     * @default "https://api.eosn.io"
     */
    endpoint_eosio?: string | undefined,
    /**
     * EOISO account name
     */
    actor?: string | undefined,
    /**
     * EOSIO account's permission
     *
     * @default "active"
     */
    permission?: string | undefined,
    /**
     * EOSIO Private Key for account
     */
    private_key?: string | undefined,
    /**
     * EOS Detective Smart Contract
     *
     * @default "eosdetective"
     */
    contract?: string | undefined,
} = {}) {
    // Require params
    if (!token) throw new Error("[token] is required");
    settings.token = token;

    // Optional Detective params
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
}

export const settings = new Settings();
