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

  try {
    const res = await Axios.request<ApiResponse<Account[]>>({
      url: "/data/accounts",
      params: queryParams,
      transformResponse: (result: any) => {
        const json = JSON.parse(result)

        if (json.error) {
          return new ApiResponse<Account[]>(undefined, { code: json.code, errorMessage: json.errorMessage })
        }

        const accountsData: Account[] = json.data.map((value: any) => {
          return Account.fromJson(value)
        })

        return new ApiResponse(accountsData)
      }
    })

    return await res.data
  } catch (err) {
    throw err.response.data
  }
}
