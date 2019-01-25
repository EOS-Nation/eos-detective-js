import { Account } from "../types/Account"
import { ApiResponse } from "../types/ApiResponse"
import Axios from "axios"

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
): Promise<ApiResponse<Account[]>> {
  const queryParams: any = { type }

  const res = await Axios.request<ApiResponse<Account[]>>({
    url: "/data/accounts",
    params: queryParams,
    transformResponse: (result: any) => {
      const jsonRes = JSON.parse(result)
      const accountsData: Account[] = jsonRes.data._documents.map((value: any) => {
        return Account.fromJson(value)
      })

      return new ApiResponse(accountsData)
    }
  })

  return await res.data
}
