import Axios from "axios"

export function config(token: string, endpoint: string) {
  Axios.defaults.baseURL = endpoint
  Axios.defaults.headers.common["X-Api-Key"] = token
}
