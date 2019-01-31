import { settings } from "../config";
import { Profile } from "../types/Profile"
import { transact } from "../utils";

/**
 * Post Report
 */
export async function post(profile: Profile) {
    const action = actionPost(profile.account, profile.score, JSON.stringify(profile));
    return await transact([action]);
}

/**
 * Remove Report
 */
export async function remove(account: string) {
    const action = actionRemove(account);
    return await transact([action]);
}

/**
 * Expire Report
 */
export async function expire(account: string) {
    const action = actionExpire(account);
    return await transact([action]);
}

/**
 * @private
 */
function actionPost(account: string, score: number, metadata: string) {
    if (!account) { throw new Error("[account] is required"); }
    if (!score) { throw new Error("[score] is required"); }
    if (!metadata) { throw new Error("[metadata] is required"); }
    if (!settings.contract) { throw new Error("[settings.contract] is required"); }
    if (!settings.authorization) { throw new Error("[settings.authorization] is required"); }

    // Input Validation
    score = Math.round(score);
    if (score < 0 || score > 100) { throw new Error("[score] must be between 0-100"); }

    // Test to see if Metadata is valid JSON
    try {
        const json = JSON.parse(metadata);
        if (typeof json !== "object") { throw new Error("[metadata] must be an object"); }
    } catch (e) {
        throw new Error("[metadata] is an invalid JSON")
    }
    return {
        account: settings.contract,
        name: "post",
        authorization: settings.authorization,
        data: {
            account,
            score,
            metadata,
        }
    }
}

/**
 * @private
 */
function actionRemove(account: string) {
    if (!account) { throw new Error("[account] is required"); }
    if (!settings.contract) { throw new Error("[settings.contract] is required"); }
    if (!settings.authorization) { throw new Error("[settings.authorization] is required"); }

    return {
        account: settings.contract,
        name: "post",
        authorization: settings.authorization,
        data: {
            account,
            score: 0,
            metadata: "",
        }
    }
}

/**
 * @private
 */
function actionExpire(account: string) {
    if (!account) { throw new Error("[account] is required"); }
    if (!settings.contract) { throw new Error("[settings.contract] is required"); }
    if (!settings.authorization) { throw new Error("[settings.authorization] is required"); }

    return {
        account: settings.contract,
        name: "expire",
        authorization: settings.authorization,
        data: {
            account,
        }
    }
}
