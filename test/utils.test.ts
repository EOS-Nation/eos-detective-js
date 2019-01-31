import { utils } from "../";
import test from "ava";

test("utils.preciseRound", (t) => {
    t.is(utils.preciseRound(1.00005), 1.0001);
    t.is(utils.preciseRound(1.00005, 4), 1.0001);
    t.is(utils.preciseRound(1.0005, 4), 1.0005);
});

test("utils.splitQuantity", (t) => {
    t.deepEqual(utils.splitQuantity("10.5000 EOS"), [10.5, "EOS"]);
    t.deepEqual(utils.splitQuantity("45.5000 BOS"), [45.5, "BOS"]);
    t.deepEqual(utils.splitQuantity("  45.5000 BOS "), [45.5, "BOS"]);

    t.throws(() => utils.splitQuantity(""), "[quantity] is required");
    t.throws(() => utils.splitQuantity(" EOS"), "[amount] & [sym] is required");
    t.throws(() => utils.splitQuantity("10.5 "), "[amount] & [sym] is required");
    t.throws(() => utils.splitQuantity("ABC EOS"), "[amount] must be a number");
    t.throws(() => utils.splitQuantity("10.5 eos"), "[sym] must be uppercase");
});

test("utils.isAccountNameValid", (t) => {
    t.is(utils.isAccountNameValid(""), false);
    t.is(utils.isAccountNameValid("eosnationftw"), true);
    t.is(utils.isAccountNameValid("eosnationftw123"), false);
    t.is(utils.isAccountNameValid("eosnation678"), false);
    t.is(utils.isAccountNameValid("eosnation0"), false);
    t.is(utils.isAccountNameValid("e"), false);
    t.is(utils.isAccountNameValid(" eos  "), false);
});

test("utils.isAccountNameValidErrors", (t) => {
    t.notThrows(() => utils.isAccountNameValidErrors("eosnationftw"));
    t.throws(() => utils.isAccountNameValidErrors(""), "[name] is required");
    t.throws(() => utils.isAccountNameValidErrors("eosnationftw123"), "[name] must be less than 13 characters");
    t.throws(() => utils.isAccountNameValidErrors("eosnation678"), "[name] numbers can only be 1-5");
    t.throws(() => utils.isAccountNameValidErrors("eosnation0"), "[name] numbers can only be 1-5");
    t.throws(() => utils.isAccountNameValidErrors("e"), "[name] must be greater then 2 characters");
    t.throws(() => utils.isAccountNameValidErrors(" eos  "), "[name] whitespaces are not valid");
    t.throws(() => utils.isAccountNameValidErrors("ABC"), "[name] letters can only lowercased");
    t.throws(() => utils.isAccountNameValidErrors("$foo#bar"), "[name] is invalid");
});
