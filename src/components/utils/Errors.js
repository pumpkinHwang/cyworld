import { isNothing, isNullOrUndefined } from './Utils';
import { isProduction, dictionary, isWordExist, replaceHashTagsWith } from '../GlobalHelpers';
import { loge } from './PikaLog';

// ** Simulate Errors from Hydra
// Payment Required
export const errorHydraPaymentRequired = {
    responseJSON: {
        code: "3009",
        error_code: 402,
        error_messages: ["Payment Required"],
        message: "Could not authorize and capture credit card payment. Error#A6Y4E"
    }
}

class CustomError extends Error {
    constructor(name, ...params) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(...params)
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError)
        }
        this.name = name
    }
}

const ErrorObject = (name, message) => {
    const e = new CustomError(name, message)
    return e
}

/**
 * Assert any value with `isNothing()` then return output of error message by `loge()`.
 * If application run on development stage use `throw` instead.
 * @param {*} value any value that need to be assert.
 * @param {string} message any noted message.
 * @return {*} the same of input value.
 */
export const assertValue = (value, message = '') => {
    if (isNothing(value)) {
        let format = `Error: Value assertion was fail, the result is = ${value}${isNothing(message) ? `` : `\nMessage: ${message}`}`
        format += `\nThis error only appear on development stage to prevent any unattended error on production stage.`
        if (isProduction()) {
            loge(`AssertValue - ${format}`)
        } else {
            throw ErrorObject('AssertValue', format)
        }
    } else {
        return value
    }
}
