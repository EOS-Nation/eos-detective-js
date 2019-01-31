import { utils } from "../";
import test from "ava";

test("utils.preciseRound", (t) => {
    t.is(utils.preciseRound(1.00005, 4), 1.0001);
    t.is(utils.preciseRound(1.0005, 4), 1.0005);
});

test("utils.splitQuantity", (t) => {
    t.deepEqual(utils.splitQuantity("10.5000 EOS"), [10.5, "EOS"]);
    t.deepEqual(utils.splitQuantity("45.5000 BOS"), [45.5, "BOS"]);
    t.deepEqual(utils.splitQuantity(" 45.5000 BOS "), [45.5, "BOS"]);
});
