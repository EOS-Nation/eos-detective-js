export interface Category {
  /**
   * Percentage of tokens an account has received in this category, compared to all received tokens.
   */
  percentage: number
  /**
   * Token volume an account has received in this category.
   */
  volume: number
  /**
   * Number of incoming transfers in this category.
   */
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
