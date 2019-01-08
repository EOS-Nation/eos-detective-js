import { Transfer } from "../types/Transfer"
import { Account } from "../types/Account"
import Axios from "axios"

/**
 * Transfers
 *
 * @example
 *
 * transfers(["bitfinexdep1"], {direction: "incoming", quantity_min: 10000})
 */
export async function transfers(
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
): Promise<{ accounts: Account[]; transfers: Transfer[] }> {
  // default options
  const contract = options.contract !== undefined ? options.contract : "eosio.token"
  const symbol = options.symbol !== undefined ? options.symbol : "EOS"
  const direction = options.direction !== undefined ? options.direction : "both"
  const accumulated = options.accumulated !== undefined ? options.accumulated : true
  const quantity_min = options.quantity_min !== undefined ? options.quantity_min : 0.1

  const res = await Axios.request<Transfer[]>({
    url: "https://api.eosdetective.semiofficial.io/transfers",
    params: {
      accounts,
      direction,
      accumulated,
      quantity_min
    },
    transformResponse: (data: any) => {
      return JSON.parse(data).data._documents.map((value: any) => {
        return Transfer.fromJson(value)
      })
    }
  })

  const transfersData = await res.data
  const accountsData: Account[] = []

  transfersData.forEach((transfer) => {
    if (!accountsData.some((account) => account.getName() === transfer.to.getName())) {
      accountsData.push(transfer.to)
    }
    if (!accountsData.some((account) => account.getName() === transfer.from.getName())) {
      accountsData.push(transfer.from)
    }
  })

  return {
    accounts: accountsData,
    transfers: transfersData
  }
}
