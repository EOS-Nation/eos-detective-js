import { RpcError } from "eosjs";
import { settings } from "./config";

export function preciseRound(number: number, precision: number) {
  const factor = Math.pow(10, precision)
  const tempNumber = number * factor
  const roundedTempNumber = Math.round(tempNumber)
  return roundedTempNumber / factor
}

/**
 * Transaction
 */
export async function transact(actions: any[]): Promise<string> {
  try {
    const result = await settings.api.transact({actions}, { blocksBehind: 3, expireSeconds: 30 });
    for (const action of actions) {
        console.log(`${action.account}::${action.name} [${JSON.stringify(action.data)}]`);
    }
    return result.transaction_id;
  } catch (e) {
    if (e instanceof RpcError) throw new Error(JSON.stringify(e.json, null, 2));
    else throw new Error(e);
  }
}
