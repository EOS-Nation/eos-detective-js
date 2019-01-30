export interface Category {
    percentage: number
    volume: number
    count: number
}

export interface Profile {
  /**
   * Account name
   */
  account: string,
  /**
   * @example "eosio.token"
   */
  contract: string,
  /**
   * @example "EOS"
   */
  token: string,
  /**
   * @example "eos"
   */
  chain: string,
  total_tokens_received: number;
  total_incoming_transfers: number;
  /**
   * @example 0 = fail, 70 < fail, 70+ pass
   */
  score: number;
  /**
   * @example "blacklist" / "exchange" / "genesis"
   */
  type: string | null;
  categories: {
      [category: string]: Category
  }
}
