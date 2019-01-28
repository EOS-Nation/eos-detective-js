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
  total_incoming_transfers: number;
  score: number;
  categories: {
    [category: string]: Category
  }
}
