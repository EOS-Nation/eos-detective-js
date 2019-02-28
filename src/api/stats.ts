import {ApiResponse} from "../types/ApiResponse"
import Axios from "axios"
import {Stats} from "../types/Stats"

/**
 * Returns some stats of the current state of database.
 */
export async function stats(
    options: {
        /**
         * Chain. Current available values are `EOS` and `BOS`.
         *
         * @default `EOS`
         */
        chain?: string
    } = {}
): Promise<ApiResponse<Stats[]>> {

    const queryParams: any = {};
    queryParams.chain = options.chain || "EOS";

    try {
        const res = await Axios.request<ApiResponse<Stats[]>>({
            url: "/stats",
            params: queryParams,
            transformResponse: (result: any) => {
                const json = JSON.parse(result);

                if (json.error) {
                    return new ApiResponse<Stats[]>(undefined, {code: json.code, errorMessage: json.errorMessage})
                }

                return new ApiResponse(json.result)
            }
        });

        return await res.data
    } catch (err) {
        throw err.response.data
    }
}
