import { ApiResponse } from "../types/ApiResponse"
import Axios from "axios"
import { Stats } from "../types/Stats"

/**
 * Returns some stats of the current state of database.
 */
export async function stats(): Promise<ApiResponse<Stats[]>> {
  try {
    const res = await Axios.request<ApiResponse<Stats[]>>({
      url: "/stats",
      transformResponse: (result: any) => {
        const json = JSON.parse(result)

        if (json.error) {
          return new ApiResponse<Stats[]>(undefined, { code: json.code, errorMessage: json.errorMessage })
        }

        return new ApiResponse(json.result)
      }
    })

    return await res.data
  } catch (err) {
    throw err.response.data
  }
}
