import { Account } from "./Account"

export class Transfer {
  private readonly _from: Account
  private readonly _to: Account
  private readonly _quantity: number
  private readonly _time: Date
  private readonly _blockNum: number
  private readonly _count?: number

  public constructor(
    from: string,
    to: string,
    quantity: number,
    time: Date,
    blockNum: number,
    count?: number
  ) {
    this._from = new Account(from)
    this._to = new Account(to)
    this._quantity = quantity
    this._time = time
    this._blockNum = blockNum
    this._count = count
  }

  public static fromJson(value: any): Transfer {
    return new Transfer(
      value.from,
      value.to,
      value.quantity,
      value.time,
      value.blockNum,
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

  get time(): Date {
    return this._time
  }

  get blockNum(): number {
    return this._blockNum
  }

  get count(): number | undefined {
    return this._count
  }
}
