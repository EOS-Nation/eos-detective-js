import { Account } from "./Account"

export class Transfer {
  private readonly _from: Account
  private readonly _to: Account
  private readonly _quantity: number
  private readonly _symbol: string
  private readonly _time?: Date
  private readonly _blockNum?: number
  private readonly _count?: number

  public constructor(
    from: string,
    to: string,
    quantity: number,
    symbol: string,
    time?: Date,
    blockNum?: number,
    count?: number
  ) {
    this._from = new Account(from)
    this._to = new Account(to)
    this._quantity = quantity
    this._symbol = symbol
    this._time = time
    this._blockNum = blockNum
    this._count = count
  }

  public static fromJson(value: any): Transfer {
    return new Transfer(
      value.from,
      value.to,
      value.quantity,
      value.symbol,
      value.time === undefined ? undefined : new Date(value.time),
      value!.block_num,
      value!.count
    )
  }

  public isAccumulated(): boolean {
    return !!this.count
  }

  get from() {
    return this._from
  }

  get to() {
    return this._to
  }

  get quantity(): number {
    return this._quantity
  }

  get symbol(): string {
    return this._symbol
  }

  get time(): Date | undefined {
    return this._time
  }

  get blockNum(): number | undefined {
    return this._blockNum
  }

  get count(): number | undefined {
    return this._count
  }
}
