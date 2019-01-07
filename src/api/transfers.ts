import { Transfers } from "../types/Transfers"

/**
 * Transfers
 *
 * @example
 *
 * transfers(["bitfinexdep1"], {direction: "incoming", quantity_min: 10000})
 */
export function transfers(
  accounts: string[],
  options: {
    /**
     * @default "eosio.token"
     */
    contract?: string
    /**
     * @default "EOS"
     */
    symbol?: string
    /**
     * @default "both"
     */
    direction?: string
    /**
     * @default true
     */
    accumulated?: boolean
    /**
     * @default 0.1
     */
    quantity_min?: number
  }
): Transfers {
  // default options
  const contract = options.contract !== undefined ? options.contract : "eosio.token"
  const symbol = options.symbol !== undefined ? options.symbol : "EOS"
  const direction = options.direction !== undefined ? options.direction : "both"
  const accumulated = options.accumulated !== undefined ? options.accumulated : true
  const quantity_min = options.quantity_min !== undefined ? options.quantity_min : 0.1

  return { account: "bar", transfers: ["foo"] }
}
