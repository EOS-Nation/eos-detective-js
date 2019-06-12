import { Account } from "./Account"
import { preciseRound } from "../utils"

export type Direction = "incoming" |"outgoing" | "both" | "between";

export class Transfer {
  private readonly _from: Account
  private readonly _to: Account
  private readonly _quantity: number
  private readonly _symbol: string
  private readonly _chain: string
  private readonly _contract: string
  private readonly _time?: Date
  private readonly _blockNum?: number
  private readonly _count?: number
  private readonly _trxId?: string
  private readonly _memo?: string

  public constructor(
    from: string,
    to: string,
    quantity: number,
    symbol: string,
    chain: string,
    contract: string,
    time?: Date,
    blockNum?: number,
    count?: number,
    trxId?: string,
    memo?: string
  ) {
    this._from = new Account(from)
    this._to = new Account(to)
    this._quantity = preciseRound(quantity / 10000, 4)
    this._symbol = symbol
    this._chain = chain
    this._contract = contract
    this._time = time
    this._blockNum = blockNum
    this._count = count
    this._trxId = trxId
    this._memo = memo
  }

  public static fromJson(value: any): Transfer {
    return new Transfer(
      value.from,
      value.to,
      value.quantity,
      value.symbol,
      value.chain,
      value.contract,
      value.time === undefined ? undefined : new Date(value.time),
      value!.block_num,
      value!.count,
      value!.trx_id,
      value!.memo
    )
  }

  public toString(): string {
    return JSON.stringify(this.toJson)
  }

  public toJson(): any {
    return {
      from: this._from,
      to: this._to,
      quantity: this._quantity,
      symbol: this._symbol,
      chain: this._chain,
      contract: this._contract,
      time: this._time,
      block_num: this._blockNum,
      count: this._count,
      trx_id: this._trxId,
      memo: this._memo
    }
  }

  /**
   * @returns <code>false</code> if this is a single transfer or <code>true</code> if multiple transfers have been accumulated.
   */
  public isAccumulated(): boolean {
    return !!this.count
  }

  /**
   * @returns the sender account.
   */
  get from() {
    return this._from
  }

  /**
   * @returns the receiver account.
   */
  get to() {
    return this._to
  }

  /**
   * @returns the token volume of this transfer.
   */
  get quantity(): number {
    return this._quantity
  }

  /**
   * @returns the token symbol.
   */
  get symbol(): string {
    return this._symbol
  }

  /**
   * @returns the chain.
   */
  get chain(): string {
    return this._chain
  }

  /**
   * @returns the token contract.
   */
  get contract(): string {
    return this._contract
  }

  /**
   * @returns the datetime of this transfer.
   */
  get time(): Date | undefined {
    return this._time
  }

  /**
   * @returns the block number of the transaction.
   */
  get blockNum(): number | undefined {
    return this._blockNum
  }

  /**
   * @returns the number of accumulated transfers.
   */
  get count(): number | undefined {
    return this._count
  }

  /**
   * @returns the transaction id.
   */
  get trxId(): string | undefined {
    return this._trxId
  }

  /**
   * @returns the memo.
   */
  get memo(): string | undefined {
    return this._memo
  }
}
