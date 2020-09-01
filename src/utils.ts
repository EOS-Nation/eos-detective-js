/**
 * Precise Round
 *
 * @example
 *
 * preciseRound(1.00005, 4) //=> 1.0001
 */
export function preciseRound(number: number, precision = 4) {
  const factor = Math.pow(10, precision);
  const tempNumber = number * factor;
  const roundedTempNumber = Math.round(tempNumber);
  return roundedTempNumber / factor;
}

export type Amount = number;
export type Sym = string;

/**
 * Split Quantity
 *
 * @example
 *
 * splitQuantity("10.5000 EOS") //=> [10.5, "EOS"]
 * splitQuantity("45.5000 BOS") //=> [45.5, "BOS"]
 */
export function splitQuantity(quantity: string): [Amount, Sym] {
  if (!quantity) {
    throw new Error("[quantity] is required");
  }
  quantity = quantity.trim();
  const [amount, sym] = quantity.split(" ");
  if (!amount || !sym) {
    throw new Error("[amount] & [sym] is required");
  }

  try {
    JSON.parse(amount);
  } catch (e) {
    throw new Error("[amount] must be a number");
  }
  if (!sym.match(/[A-Z.]/)) {
    throw new Error("[sym] must be uppercase");
  }

  return [Number(amount), sym];
}

/**
 * Checks if account name is valid
 *
 * @example
 *
 * isAccountNameValid("eosnationftw") //=> true
 * isAccountNameValid("eosnation678") //=> false
 * isAccountNameValid("eosnationftw123") //=> false
 */
export function isAccountNameValid(name: string): boolean {
  if (!name) {
    return false;
  }
  return !!name.match(/^[a-z1-5.]{2,12}$/);
}

/**
 * Checks if Account name is valid by throwing Errors
 */
export function isAccountNameValidErrors(name: string): void {
  if (!name) {
    throw new Error("[name] is required");
  }
  if (name.length > 12) {
    throw new Error("[name] must be less than 13 characters");
  }
  if (name.length < 2) {
    throw new Error("[name] must be greater then 2 characters");
  }
  if (name.match(/[06-9.]/)) {
    throw new Error("[name] numbers can only be 1-5");
  }
  if (name.match(/[A-Z.]/)) {
    throw new Error("[name] letters can only lowercased");
  }
  if (name.match(/[ ]/)) {
    throw new Error("[name] whitespaces are not valid");
  }
  if (!name.match(/^[a-z1-5.]{2,12}$/)) {
    throw new Error("[name] is invalid");
  }
}

/**
 * Convert Quantity
 *
 * @example
 *
 * convertQuantity(100010001, 'wax') //=> 1.00010001
 * convertQuantity(1.00010001, 'wax', true) //=> 100010001
 */
export function convertQuantity(
  number: number,
  chain: string = "eos",
  toInteger = false
) {

  const precisions: { [index: string]: number } = {
    "eos": 4,
    "wax": 8,
    "box": 4
  }

  const precision = precisions[chain.toLowerCase()];
  const denom = 10 ** precision;

  if (toInteger) return Math.round(number * denom);
  else return preciseRound(number / denom, precision);
}
