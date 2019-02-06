import { RpcError } from "eosjs";
import { settings } from "./config";

/**
 * Push transaction on EOSIO
 */
export async function transact(actions: any[], options: {
  blocksBehind?: number,
  expireSeconds?: number,
} = {}): Promise<string> {
  const blocksBehind = options.blocksBehind ? options.blocksBehind : 3
  const expireSeconds = options.expireSeconds ? options.expireSeconds : 30

  try {
    const result = await settings.api.transact({actions}, {blocksBehind, expireSeconds});
    return result.transaction_id;
  } catch (e) {
    if (e instanceof RpcError) { throw new Error(JSON.stringify(e.json, null, 2));
    } else { throw new Error(e); }
  }
}
