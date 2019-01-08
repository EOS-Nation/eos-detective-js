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
     * Minimum token volume of each transfer.
     */
    quantity_min?: number
    /**
     * Maximum token volume of each transfer.
     */
    quantity_max?: number
    /**
     * Minimum token volume of accumulated transfers.
     */
    accumulated_min?: number
    /**
     * Maximum token volume of accumulated transfers.
     */
    accumulated_max?: number
    /**
     * Minimum transaction count of accumulated transfers.
     */
    count_min?: number
    /**
     * Maximum transaction count of accumulated transfers.
     */
    count_max?: number
  }
): Promise<{ accounts: Account[]; transfers: Transfer[] }> {
  const queryParams: any = { accounts }

  // default params
  queryParams.symbol = options.symbol || "EOS"
  queryParams.direction = options.direction || "both"
  queryParams.accumulated = options.accumulated || true

  // optional params
  if (options.quantity_min) {
    queryParams.quantity_min = options.quantity_min
  }
  if (options.quantity_max) {
    queryParams.quantity_max = options.quantity_max
  }
  if (options.accumulated_min) {
    queryParams.accumulated_min = options.accumulated_min
  }
  if (options.accumulated_max) {
    queryParams.accumulated_max = options.accumulated_max
  }
  if (options.count_min) {
    queryParams.count_min = options.count_min
  }
  if (options.count_max) {
    queryParams.count_max = options.count_max
  }

  const res = await Axios.request<Transfer[]>({
    url: "https://api.eosdetective.semiofficial.io/transfers",
    params: queryParams,
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
