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
