import { Account } from "./Account"
import { Transfer } from "./Transfer"

export class ApiResponse<T> {

  private readonly _data: T

  constructor(data: T) {
    this._data = data
  }

  get data(): T {
    return this._data
  }

}

export class TransfersData {

  private readonly _accounts: Account[]
  private readonly _transfers: Transfer[]
  private readonly _limited: boolean

  constructor(accounts: Account[], transfers: Transfer[], limited: boolean) {
    this._accounts = accounts
    this._transfers = transfers
    this._limited = limited
  }

  get accounts(): Account[] {
    return this._accounts
  }

  get transfers(): Transfer[] {
    return this._transfers
  }

  get limited(): boolean {
    return this._limited
  }
}
