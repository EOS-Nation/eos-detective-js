import { utils } from "../";

test("utils.preciseRound", () => {
    expect(utils.preciseRound(1.00005)).toBe(1.0001);
    expect(utils.preciseRound(1.00005, 4)).toBe(1.0001);
    expect(utils.preciseRound(1.0005, 4)).toBe(1.0005);
});

test("utils.splitQuantity", () => {
    expect(utils.splitQuantity("10.5000 EOS")).toEqual([10.5, "EOS"]);
    expect(utils.splitQuantity("45.5000 BOS")).toEqual([45.5, "BOS"]);
    expect(utils.splitQuantity("  45.5000 BOS ")).toEqual([45.5, "BOS"]);

    expect(() => utils.splitQuantity("")).toThrowError("[quantity] is required");
    expect(() => utils.splitQuantity(" EOS")).toThrowError("[amount] & [sym] is required");
    expect(() => utils.splitQuantity("10.5 ")).toThrowError("[amount] & [sym] is required");
    expect(() => utils.splitQuantity("ABC EOS")).toThrowError("[amount] must be a number");
    expect(() => utils.splitQuantity("10.5 eos")).toThrowError("[sym] must be uppercase");
});

test("utils.isAccountNameValid", () => {
    expect(utils.isAccountNameValid("")).toBeFalsy();
    expect(utils.isAccountNameValid("eosnationftw")).toBeTruthy();
    expect(utils.isAccountNameValid("eosnationftw123")).toBeFalsy();
    expect(utils.isAccountNameValid("eosnation678")).toBeFalsy();
    expect(utils.isAccountNameValid("eosnation0")).toBeFalsy();
    expect(utils.isAccountNameValid("e")).toBeFalsy();
    expect(utils.isAccountNameValid(" eos  ")).toBeFalsy();
});

test("utils.isAccountNameValidErrors", () => {
    expect(() => utils.isAccountNameValidErrors("eosnationftw")).not.toThrow();
    expect(() => utils.isAccountNameValidErrors("")).toThrowError("[name] is required");
    expect(() => utils.isAccountNameValidErrors("eosnationftw123")).toThrowError("[name] must be less than 13 characters");
    expect(() => utils.isAccountNameValidErrors("eosnation678")).toThrowError("[name] numbers can only be 1-5");
    expect(() => utils.isAccountNameValidErrors("eosnation0")).toThrowError("[name] numbers can only be 1-5");
    expect(() => utils.isAccountNameValidErrors("e")).toThrowError("[name] must be greater then 2 characters");
    expect(() => utils.isAccountNameValidErrors(" eos  ")).toThrowError("[name] whitespaces are not valid");
    expect(() => utils.isAccountNameValidErrors("ABC")).toThrowError("[name] letters can only lowercased");
    expect(() => utils.isAccountNameValidErrors("$foo#bar")).toThrowError("[name] is invalid");
});
