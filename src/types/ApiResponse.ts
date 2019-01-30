import { Account } from "./Account"
import { Transfer } from "./Transfer"

/**
 * Contains the response of an API call. Either holds the generic result object or the error message.
 */
export class ApiResponse<T> {

  private readonly _data: T | undefined
  private readonly _error: ErrorData | undefined

  constructor(data?: T, error?: ErrorData) {
    this._data = data
    this._error = error
  }

  /**
   * @returns <code>true</code> if an error occurred. The error data can be found in <code>response.error</code>.
   */
  public isError(): boolean {
    return this._error !== undefined
  }

  /**
   * @returns the response data or <code>undefined</code> if an error occurred.
   */
  get data(): T | undefined {
    return this._data
  }

  /**
   * @returns the error data or <code>undefined</code> if the request was successful.
   */
  get error(): ErrorData | undefined {
    return this._error
  }
}

/**
 * Contains the error data in case a request failed.
 */
export interface ErrorData {
  /**
   * HTTP status code.
   */
  code: number,
  /**
   * Error message with more information.
   */
  errorMessage: string
}

/**
 * Contains the result of request to the `transfers` endpoint.
 */
export interface TransfersData {
  /**
   * Array of all accounts that are used in the requested transfers.
   */
  accounts: Account[],
  /**
   * Array of all transfers.
   */
  transfers: Transfer[],
  /**
   * <code>true</code> if the result only contains a subset of requested transfers as the limit was reached.
   */
  limited: boolean
}
