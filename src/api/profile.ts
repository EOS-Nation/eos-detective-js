import { Profile } from "../types/Profile"
import { ApiResponse } from "../types/ApiResponse"
import Axios from "axios"

/**
 * Profile
 *
 * @example
 *
 * const profile = await detective.profile("eosnationftw");
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

      return new ApiResponse(json.result)
    }
  })

  return await res.data
}
