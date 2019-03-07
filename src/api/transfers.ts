import {Transfer} from "../types/Transfer"
import {Account} from "../types/Account"
import {ApiResponse, TransfersData} from "../types/ApiResponse"
import Axios from "axios"

/**
 * Endpoint to request and filter transfers.
 *
 * @example
 *
 * `transfers(["bitfinexdep1"], {direction: "incoming", quantity_min: 10000})`
 */
export async function transfers(
    accounts: string[],
    options: {
        /**
         * EOS account on which the token contract has been deployed on.
         *
         * @default `eosio.token`
         */
        contract?: string
        /**
         * Token symbol.
         *
         * @default `EOS`
         */
        symbol?: string,
        /**
         * Chain. Current available values are `EOS` and `BOS`.
         *
         * @default `EOS`
         */
        chain?: string,
        /**
         * Direction of transfers for the requested accounts.
         *
         * Can be:
         *  * `incoming` - only transfers where the requested accounts are the receiver of the tokens.
         *  * `outgoing` - only transfers where the requested accounts are the sender of the tokens.
         *  * `both` - the requested accounts are either receiver or sender of the tokens.
         *  * `between` - only transfers between the requested accounts are returned, other accounts are not considered.
         *
         * @default `both`
         */
        direction?: string
        /**
         * If set to `true` transfers between the same sender and receiver are accumulated, instead of returning all single transfers.
         *
         * @default `true`
         */
        accumulated?: boolean
        /**
         * Accounts to exclude from query.
         *
         * @default `[]`
         */
        excludes?: string[]
        /**
         * Minimum token volume of each transfer. If accumulated is set to `true`, only transfers above this threshold are included in the accumulation.
         *
         * @default `0.1`
         */
        quantity_min?: number
        /**
         * Maximum token volume of each transfer. If accumulated is set to `true`, only transfers below this threshold are included in the accumulation.
         */
        quantity_max?: number
        /**
         * Minimum datetime of each transfer.
         *
         * @default `yesterday`
         */
        time_min?: Date
        /**
         * Maximum datetime of each transfer.
         */
        time_max?: Date
        /**
         * Minimum accumulated token volume of transfers.
         */
        accumulated_min?: number
        /**
         * Maximum accumulated token volume of transfers.
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
    } = {}
): Promise<ApiResponse<TransfersData>> {
    const queryParams: any = {accounts};
    const yesterday = new Date(Date.now());
    yesterday.setMonth(yesterday.getMonth() - 3);

    // default params
    queryParams.symbol = options.symbol || "EOS"
    queryParams.chain = options.chain || "EOS"
    queryParams.direction = options.direction || "both"
    queryParams.accumulated = options.accumulated === undefined ? true : options.accumulated
    queryParams.excludes = options.excludes || []
    queryParams.quantity_min = options.quantity_min === undefined ? 1000 : Math.round(options.quantity_min * 10000)
    queryParams.time_min = options.time_min === undefined ? yesterday.toISOString() : options.time_min.toISOString()

    // optional params
    if (options.quantity_max) { queryParams.quantity_max = Math.round(options.quantity_max * 10000); }
    if (options.time_max) { queryParams.time_max = options.time_max.toISOString(); }
    if (options.accumulated_min) { queryParams.accumulated_min = Math.round(options.accumulated_min * 10000); }
    if (options.accumulated_max) { queryParams.accumulated_max = Math.round(options.accumulated_max * 10000); }
    if (options.count_min) { queryParams.count_min = options.count_min; }
    if (options.count_max) { queryParams.count_max = options.count_max; }

    try {
        const res = await Axios.request<ApiResponse<TransfersData>>({
            url: "/transfers",
            params: queryParams,
            transformResponse: (data: any) => {

                const json = JSON.parse(data)

                if (json.error) {
                    return new ApiResponse<TransfersData>(undefined, {code: json.code, errorMessage: json.errorMessage})
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

                return new ApiResponse<TransfersData>({
                    accounts: accountsData,
                    transfers: transfersData,
                    limited: json.limited
                })
            }
        })
        return await res.data

    } catch (err) {
        throw err.response.data
    }
}
