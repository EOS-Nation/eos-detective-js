export interface Stats {
  /**
   * Total amount of transfers stored in the database.
   */
  total_transfers: number
  /**
   * Total amount of accounts stored in the database.
   */
  total_accounts: number
  /**
   * Most recent block stats.
   */
  "latest_block": {
    "block_num": number,
    "time": Date
  }
}
