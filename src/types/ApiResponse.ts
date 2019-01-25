import { Account } from "./Account"
import { Transfer } from "./Transfer"

export class ApiResponse<T> {

  private readonly _data: T | undefined
  private readonly _error: ErrorData | undefined

  constructor(data?: T, error?: ErrorData) {
    this._data = data
    this._error = error
  }

  public isError(): boolean {
    return this._error != undefined
  }

  get data(): T | undefined {
    return this._data
  }

  get error(): ErrorData | undefined {
    return this._error
  }
}

export interface ErrorData {
  code: number,
  errorMessage: string
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
