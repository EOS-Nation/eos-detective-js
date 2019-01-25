import Axios from "axios"

export interface Category {
  percentage: number
  volume: number
  count: number
}

export interface Profile {
  account: string,
  contract: string,
  token: string,
  total_tokens_received: number;
  score: number;
  categories: {
      [category: string]: Category
  }
}

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
): Promise<Profile> {
  const queryParams: any = { account }

  const res = await Axios.request<Profile>({
    url: "/profile",
    params: queryParams,
    transformResponse: (result: any) => {
      const json = JSON.parse(result);

      return json.result;
    }
  })

  return await res.data
}
