import { Profile } from "../types/Profile"
import { ApiResponse } from "../types/ApiResponse"
import Axios from "axios"

/**
 * Returns a profile of the given account name. The profile includes an overall score and the distribution of incoming tokens within different categories.
 *
 * @example
 *
 * const profile = await detective.profile("eosnationftw");
 *
 * Response:
 *
 * {
 *   account: 'eosnationftw',
 *   contract: 'eosio.token',
 *   token: 'EOS',
 *   total_tokens_received: 74747.4845,
 *   score: 87.3,
 *   categories: {
 *     system: {
 *       percentage: 0.9994754378657384,
 *       volume: 74708.2748,
 *       count: 205
 *     }
 *   }
 * }
 */
export async function profile(
  /**
   * Account to profile
   */
  account: string
): Promise<ApiResponse<Profile>> {
  const queryParams: any = { account }

  const res = await Axios.request<ApiResponse<Profile>>({
    url: "/profile",
    params: queryParams,

    transformResponse: (result: any) => {

      const json = JSON.parse(result)

      if (json.error) {
        return new ApiResponse<Profile>(undefined, { code: json.code, errorMessage: json.errorMessage })
      }

      return new ApiResponse<Profile>(json.result)
    }
  })

  return await res.data
}
