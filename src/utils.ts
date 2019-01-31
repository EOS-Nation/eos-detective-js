import { RpcError } from "eosjs";
import { settings } from "./config";

/**
 * Precise Round
 *
 * @example
 *
 * preciseRound(1.00005, 4) //=> 1.0001
 */
export function preciseRound(number: number, precision = 4) {
  const factor = Math.pow(10, precision)
  const tempNumber = number * factor
  const roundedTempNumber = Math.round(tempNumber)
  return roundedTempNumber / factor
}

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

export type Amount = number;
export type Sym = string;

/**
 * Split Quantity
 *
 * @example
 *
 * splitQuantity("10.5000 EOS") //=> [10.5, "EOS"]
 * splitQuantity("45.5000 BOS") //=> [45.5, "BOS"]
 */
export function splitQuantity(quantity: string): [Amount, Sym] {
  if (!quantity) { throw new Error("[quantity] is required"); }
  const [amount, sym] = quantity.split(" ");
  if (!amount) { throw new Error("[amount] is invalid"); }
  if (!sym) { throw new Error("[sym] is invalid"); }

  return [Number(amount), sym];
}
