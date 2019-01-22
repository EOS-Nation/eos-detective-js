import { Account } from "../types/Account"
import Axios from "axios"
import { ApiResponse } from "../types/ApiResponse"

/**
 * Accounts
 *
 * @example
 *
 * accounts("blacklist")
 */
export async function accounts(
  /**
   * Account type
   */
  type: string
): Promise<ApiResponse> {
  const queryParams: any = { type }

  const res = await Axios.request<ApiResponse>({
    url: "/data/accounts",
    params: queryParams,
    transformResponse: (result: any) => {
      const jsonRes = JSON.parse(result)

      const accountsData: Account[] = jsonRes.data._documents.map((value: any) => {
        return Account.fromJson(value)
      })

      return new ApiResponse(accountsData, [], false)
    }
  })

  return await res.data
}
