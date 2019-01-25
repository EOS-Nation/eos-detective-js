import { RpcError } from "eosjs";
import { api, DETECTIVE_CONTRACT, authorization } from "./config";

export function actionPost(account: string, score: number, metadata: string) {
    return {
        account: DETECTIVE_CONTRACT,
        name: "post",
        authorization,
        data: {
            account,
            score,
            metadata,
        }
    }
}

export function actionRemove(account: string) {
    return {
        account: DETECTIVE_CONTRACT,
        name: "post",
        authorization,
        data: {
            account,
            score: 0,
            metadata: "",
        }
    }
}

export function actionExpire(account: string) {
    return {
        account: DETECTIVE_CONTRACT,
        name: "expire",
        authorization,
        data: {
            account,
        }
    }
}

/**
 * Transaction
 */
export async function transact(actions: any[]) {
    try {
        const result = await api.transact({actions}, { blocksBehind: 3, expireSeconds: 30 });
        for (const action of actions) {
            console.log(`${action.account}::${action.name} [${JSON.stringify(action.data)}]`);
        }
    } catch (e) {
        if (e instanceof RpcError) console.log(JSON.stringify(e.json, null, 2));
    }
}