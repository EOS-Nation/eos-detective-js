import { Transfer } from "../types/Transfer"
import { Account } from "../types/Account"
import { ApiResponse, TransfersData } from "../types/ApiResponse"
import Axios from "axios"
import { Profile } from "../types/Profile"

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
     * Accounts to exclude from query.
     *
     * @default "eosio.stake", "eosio.ram", "eosio.ramfee"
     */
    excludes?: string[]
    /**
     * Minimum token volume of each transfer.
     *
     * @default 0.1
     */
    quantity_min?: number
    /**
     * Maximum token volume of each transfer.
     */
    quantity_max?: number
    /**
     * Minimum time of each transfer.
     *
     * @default Yesterday
     */
    time_min?: Date
    /**
     * Maximum time of each transfer.
     */
    time_max?: Date
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
): Promise<ApiResponse<TransfersData>> {
  const queryParams: any = { accounts }
  const yesterday = new Date(Date.now())
  yesterday.setDate(yesterday.getDate() - 1)

  // default params
  queryParams.symbol = options.symbol || "EOS"
  queryParams.direction = options.direction || "both"
  queryParams.accumulated = options.accumulated === undefined ? true : options.accumulated
  queryParams.excludes = options.excludes || ["eosio.ram", "eosio.ramfee", "eosio.stake"]
  queryParams.quantity_min = options.quantity_min === undefined ? 1000 : Math.round(options.quantity_min * 10000)
  queryParams.time_min = options.time_min === undefined ? yesterday.toISOString() : options.time_min.toISOString()

  // optional params
  if (options.quantity_max) {
    queryParams.quantity_max = Math.round(options.quantity_max * 10000)
  }
  if (options.time_max) {
    queryParams.time_max = options.time_max.toISOString()
  }
  if (options.accumulated_min) {
    queryParams.accumulated_min = Math.round(options.accumulated_min * 10000)
  }
  if (options.accumulated_max) {
    queryParams.accumulated_max = Math.round(options.accumulated_max * 10000)
  }
  if (options.count_min) {
    queryParams.count_min = options.count_min
  }
  if (options.count_max) {
    queryParams.count_max = options.count_max
  }

  try {
    const res = await Axios.request<ApiResponse<TransfersData>>({
      url: "/transfers",
      params: queryParams,
      transformResponse: (data: any) => {

        const json = JSON.parse(data)

        if (json.error) {
          return new ApiResponse<TransfersData>(undefined, { code: json.code, errorMessage: json.errorMessage })
        }

        const transfersData: Transfer[] = json.data.map((value: any) => {
          return Transfer.fromJson(value)
        })

        const accountsData: Account[] = []

        transfersData.forEach((transfer) => {
          if (!accountsData.some((account) => account.name === transfer.to.name)) {
            accountsData.push(transfer.to)
          }
          if (!accountsData.some((account) => account.name === transfer.from.name)) {
            accountsData.push(transfer.from)
          }
        })

        return new ApiResponse<TransfersData>(new TransfersData(accountsData, transfersData, json.limited))

      }
    })
    return await res.data

  } catch (err) {
    throw err.response.data
  }
}
