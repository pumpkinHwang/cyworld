import { isObservableArray, toJS } from 'mobx';
import * as _ from 'lodash';
import { lowerCase, trim as _trim } from './String';

// ------------------------------------------------------
// ** CAUTION ** Please DO NOT import any component here.
// ------------------------------------------------------
//************ The existence of value ************//
/** Checks if a value is `null`, `undefined`, `NaN`, `empty`, `[]` or `{}`.
 * @example
 * isNothing(null) // true
 * isNothing('') // true
 * isNothing(123) // false
 * isNothing([]) // true
 * isNothing({}) // true
 * isNothing({foo: []}) // false
 * isNothing([{}]) // false
 *
*/
export const isNothing = value => {
    // check 6 kinds of value existence
    if (isNullOrUndefined(value) || isNaN(value) || isEmpty(value) === true) return true // null, undefined, NaN, empty
    if (isObservableArray(value)) return isLength(toJS(value)) === false // []
    if (isArray(value)) return isLength(value) === false // []
    if (isObject(value)) return isEmptyObject(value) // {}
    return false
}
/** An antonym version of `isNothing()`. */
export const isSomething = value => isNothing(value) === false
/** Checks if a value is `null`. */
export const isNull = (value) => { return value === null }
/** Checks if a value is `undefined`. */
export const isUndefined = (value) => { return typeof value === 'undefined' }
/** Checks if a value is `null` or `undefined`. */
export const isNullOrUndefined = (value) => { return value === null || typeof value === 'undefined' }
/** Checks if a value is `NaN`. If a value is not **Number** return `false`.
 *
 * **Note:** This method is not the same as regular `isNaN` which returns true for undefined and other non-numeric values. */
export const isNaN = value => _.isNaN(value)
// { return isNumber(value) ? Object.is(value, NaN) : false }
/** Checks if a **String** value is `empty`. The result *not* included `null` or `undefined`. */
export const isEmpty = (value) => { return isString(value) && value.replace(/[\s\u200B]/g, '').length === 0 }
/** Checks if a value is a valid array-like length.  The result also included **String** type. */
export const isLength = (value) => {
    if (value === null || value === undefined || value === '') {
        return false
    } else {
        if (isObject(value)) {
            if (isEmptyObject(value)) return false
            else return Object.keys(value).length > 0 || value.length > 0 // arrays, objects
        } else {
            return value.length > 0  // string
        }
    }
}
/** Checks if a **Object** value is `{}`. Return `false` if equal `null` or `undefined` */
export const isEmptyObject = (value) => {
    if (isNullOrUndefined(value)) return false
    else return Object.entries(value).length === 0 && value.constructor === Object
}

/**
 *
 * @param {any} value The value to check.
 * @return {boolean} Returns `true` if matched cases, else `false`.
 */
export const toBool = value => {
    if (isNothing(value)) return false
    if (_.isBoolean(value)) return value
    if (_.isString(value)) {
        value = trim(lowerCase(value))
        if (someOf(value, ['true', 'yes', '1', 'always', 'ok'])) {
            return true
        }
        if (someOf(value, ['false', 'no', '0', 'never', 'nah'])) {
            return false
        }
    }
    if (_.isNumber(value)) {
        if (someOf(value, [1])) {
            return true
        }
        if (someOf(value, [0])) {
            return false
        }
    }
    return false
}

/** Checks if a value was acknowledge or it was `unknown`. */
export const isAcknowledge = (value) => {
    // TODO: create more complex logic
    return value !== 'unknown'
}

/** Checks if a value was only conatain `Zeros`. Able to check both **Number** and **String**. */
export const isZeros = (value) => {
    if (isNumber(value)) {
        return value === 0
    } else {
        if (isNaN(parseFloat(value))) return false
        return parseFloat(value) === 0
    }
}

//************ Type of Variables ************//
/** Checks if a value's type is **String**. */
export const isString = value => _.isString(value)
/** Checks if a value's type is **Number**. */
export const isNumber = value => _.isNumber(value)
/** Checks if a value's type is **Integer**. Return `false` if `NaN`. */
export const isInteger = value => { return isNaN(value) ? false : Number.isInteger(value) }
/** Checks if value's type is **Float**.  Return `false` if `NaN`. */
export const isFloat = value => { return isNaN(value) ? false : value % 1 !== 0 }
/** Checks if a value is classified as a **Boolean** primitive or object. */
export const isBoolean = value => _.isBoolean(value)
/** Checks if a value is the language type of **Object**. (e.g. arrays, functions, objects, new Number(0), and new String('')) */
export const isObject = value => { return typeof value === 'object' && isNullOrUndefined(value) === false }
/** If the value is an **Array**, `true` is returned; otherwise, `false` is. */
export const isArray = value => Array.isArray(value)

export const isPrimitive = value => value !== Object(value)

export const onRefReady = (ref, callback, fallback) => {
    if (_.get(ref, 'current', false) !== false) {
        if (callback) callback()
    } else {
        if (fallback) fallback()
    }
}

/** Check if specified data/text has proper JSON interchange format.
 * @example
 * isJSON('true')             // false
 * isJSON('{"x":true}')       // true
 * isJSON('[1, false, null]') // true
 */
export const isJSON = value => {
    if (typeof value !== 'string') return false
    try {
        const result = JSON.parse(value)
        const type = Object.prototype.toString.call(result)
        return type === '[object Object]' || type === '[object Array]'
    } catch (err) {
        return false
    }
}

/**
 * Checks if `value` is classified as a `Function` object.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * isFunction(setTimeout) // => true
 * isFunction(/abc/) // => false
 * isFunction('function') // => false
 */
export const isFunction = (value) => {
    return typeof value === 'function'
}

//***** Short methods for 'if then return something' *****//
/** If a value is `null`, `undefined`, `NaN` or `empty` then always return an `empty`. */
export const ifNothingThenEmpty = (value) => { return isNothing(value) ? '' : value }
/** If a value is `null`, `undefined`, `NaN` or `empty` then always return `null`. */
export const ifNothingThenNull = (value) => { return isNothing(value) ? null : value }
/** If a value is `null`, `undefined`, `NaN` or `empty` then always return `undefined`. */
export const ifNothingThenUndefined = (value) => { return isNothing(value) ? undefined : value }

//************ Array ************//
/** The this method determines whether an array contains a specified element.
 * This method returns `true` if the array contains the element, and `false` if not.
 *
 * **Object** and **Array** are possible to be search in the array list too.
 * But please keep in mind, you could not search specified value inside **Object** or **Array**
 * in this array list.
 *
 * @param {*} searchElement Required. The element to search for.
 * @param {Array} array Required. The array list.
 * @return {Boolean} searched result.
 * @example
 * const list = ['Apple', 'Banana', {Fruits:['Durian', 'Mango']}, [10, 20, [30]]]
 * testArray('Banana', list) // true
 * testArray('Durian', list) // false
 * testArray({Fruits:['Durian', 'Mango']}, list) // true
 * testArray([10, 20, [30]], list) // true
 */
export const testArray = (searchElement, array = []) => {
    if (isNullOrUndefined(array)) return false
    if (isObject(searchElement)) {
        let found = false
        array.forEach(value => {
            if (deepCompare(searchElement, value) === true) {
                found = true
            }
        })
        return found
    } else {
        return array.some((element) => {
            return element === searchElement
        })
    }
}

export const convertStringToArray = (str) => {
    if (typeof str === 'string') return [str]
    return str
}

export const stringToBoolean = (value) => {
    if (isString(value)) {
        switch (value.toLowerCase().trim()){
            case 'true': case 'yes': case '1': return true;
            case 'false': case 'no': case '0': case null: case undefined: return false;
            default: return Boolean(value);
        }
    } else {
        if (isBoolean(value)) {
            return value
        } else {
            return null
        }
    }
}

//************ String ************//
/** Removed **Single Quote**, **Zero-width space** (`U+200B`, `&#8203;`, `\u200B`) characters
 * from **String** value then return.
 *
 * **Note:** If it's not **String** return the same value.
 * @return {String} the new result without single quote or zero-width space characters.
 */
export const eliminateJSONEnemy = (value) => { return isString(value) ? value.replace(/['\u200B]/g, '') : value }

export const killGhostSpace = (value) => { return isString(value) ? value.replace(/\u200B/g,'') : value }

/** Return trim **String** while handle unattended `undefined` error.
 * If error happen or the value is not **String**, return itself.
 */
export const trim = _trim

/** Make a case-insensitive compare betweenn two string.
 * Only accept `String` type. Any other type of value the result always return`false`.
 * @param {string} stringA - first value of string.
 * @param {string} stringB - value of string need to compare with.
 * @return {boolean}
 * @example
 * caseInsensitiveCompare('CreditCard', 'creditcard') // true
 * caseInsensitiveCompare('Actived', 'Terminated') // false */
export const caseInsensitiveCompare = (stringA, stringB) => {
    if (isString(stringA) && isString(stringB)) {
        return stringA.localeCompare(stringB, undefined, { sensitivity: 'accent' }) === 0
    } else {
        return false
    }
}

/** An alias version of `caseInsensitiveCompare()`.
 *
 * Make a case-insensitive compare betweenn two string.
 * Only accept `String` type. Any other type of value the result always return`false`.
 * @param {string} stringA - first value of string.
 * @param {string} stringB - value of string need to compare with.
 * @return {boolean}
 * @example
 * isEqualText('CreditCard', 'creditcard') // true
 * isEqualText('Actived', 'Terminated') // false */
export const isEqualText = (stringA, stringB) => caseInsensitiveCompare(stringA, stringB)

//**** Screen Orientation ****//
// Check screen is landscape or portrait. //
/** Check if the screen is orient **Landscape**.
 * @return {Boolean} if landscape, return `true`.
 */
export const isLandScape = () => /ipad/.test(navigator.userAgent.toLowerCase()) ? false : window.innerHeight < window.innerWidth

/** Check if the screen is orient **Portrait**.
 * @return {Boolean} if portrait, return `true`.
 */
export const isPortrait = () =>  window.innerHeight > window.innerWidth

//************ Misc ************//
/** Convert this **Object** into immutable object. This mean it ***could not*** be changed.
 * This method directly applied to an object, the return for reassign is no need.
 * @param {Object} object any object.
 */
export const deepFreeze = (object) => {
    Object.freeze(object)
    Object.getOwnPropertyNames(object).forEach(
        (prop) => {
            if (isNullOrUndefined(prop) === false) {
                if (object.hasOwnProperty(prop) && isNullOrUndefined(object[prop]) === false
                && (typeof object[prop] === 'object' || typeof object[prop] === 'function')
                && Object.isFrozen(object[prop]) === false) {
                    if (isNullOrUndefined(object[prop]) === false) {
                        deepFreeze(object[prop])
                    }
                }
            }
        }
    )
}
export const cloneObject = object => JSON.parse(JSON.stringify(object))
export const deepCompare = (value, other) => {
    // Get the value type
    var type = Object.prototype.toString.call(value)
    // If the two objects are not the same type, return false
    if (type !== Object.prototype.toString.call(other)) return false
    // If items are not an object or array, return false
    if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false
    // Compare the length of the length of the two items
    var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length
    var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length
    if (valueLen !== otherLen) return false
    // Compare two items
    var compare = function (item1, item2) {
        // Get the object type
        var itemType = Object.prototype.toString.call(item1)
        // If an object or array, compare recursively
        if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
            if (!deepCompare(item1, item2)) return false
        }
        // Otherwise, do a simple comparison
        else {
            // If the two items are not the same type, return false
            if (itemType !== Object.prototype.toString.call(item2)) return false
            // Else if it's a function, convert to a string and compare
            // Otherwise, just compare
            if (itemType === '[object Function]') {
                if (item1.toString() !== item2.toString()) return false
            } else {
                if (item1 !== item2) return false
            }
        }
    }

    // Compare properties
    if (type === '[object Array]') {
        for (var i = 0; i < valueLen; i++) {
            if (compare(value[i], other[i]) === false) return false
        }
    } else {
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                if (compare(value[key], other[key]) === false) return false
            }
        }
    }

    // If nothing failed, return true
    return true
}

export const isContainSpecialCase = (text) => {
    const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
    return format.test(text)
}

/** Returns object after filling in its `undefined`, `null` or `empty` properties with the first value present
 * in the following list of defaults objects. */
export const defaults = (object, defaultsValue) => {
    if (isNothing(object)) {
        return defaultsValue
    } else {
        return object
    }
}

/** Sort string by value. */
export const sortString = (a, b) => {
    const aName = lowerCase(a)
    const bName = lowerCase(b)
    return aName.localeCompare(bName)
}

/** Sort by `name`. */
export const sortByName = (a, b) => {
    const aName = a.name.toLowerCase()
    const bName = b.name.toLowerCase()
    return aName.localeCompare(bName)
}

/** Sort by `index`. */
export const sortByIndex = (a, b) => {
    const aValue = a.index
    const bValue = b.index
    return aValue - bValue
}

/** Sort by `value`. */
export const sortByValue = (a, b) => {
    const aValue = a.value.toLowerCase()
    const bValue = b.value.toLowerCase()
    return aValue.localeCompare(bValue)
}

// Condition
export const justOneOf = (firstValue, operator, ...compareValues) => {
    if (isNothing(operator)) return false
    if (isNothing(compareValues)) return false
    if (isLength(compareValues) === false) return false

    const stringToOperator = {
        '===': (x, y) => x === y,
        '!==': (x, y) => x !== y,
        '&&':  (x, y) => x && y,
        '||':  (x, y) => x || y,
        '>':   (x, y) => x > y,
        '<':   (x, y) => x < y,
        '>=':  (x, y) => x >= y,
        '<=':  (x, y) => x <= y
    }


    let bool = false
    if (compareValues.length > 1) {
        compareValues.forEach(value => {
            if (stringToOperator[operator](firstValue, value) === true) {
                bool = true
            }
        })
        return bool
    } else {
        return stringToOperator[operator](firstValue, compareValues[0]) === true
    }
}

/** A shorthand version of `justOneOf(value, '===', ...expectancy)`.
 *
 * Make a strict equality comparison of **value** with each **expectancy** array item.
 * Any single matched result, return `true`. If nothing matched, return `false`.
 * @param {any} value a value which need to be compare.
 * @param {array} expectancy an array of expectancy value.
 * @return {boolean} comparation result as **Boolean**. */
export const someOf = (value, expectancy = []) => justOneOf(value, '===', ...expectancy)

/** An antonym version of `someOf()`
 *
 * Make a strict equality comparison of **value** without any **expectancy** array item.
 * Any single matched result, return `false`. If nothing matched, return `true`.
 * @param {any} value a value which need to be compare.
 * @param {array} expectancy an array of expectancy value.
 * @return {boolean} comparation result as **Boolean**. */
export const excludeOf = (value, expectancy = []) => justOneOf(value, '===', ...expectancy) === false


export const isLengthBetween = (arrayLikeValue, start, end) => {
    if (_.isArrayLike(arrayLikeValue)) {
        const matchArr = []
        for (let i = start; i <= end; i++) {
            matchArr.push(i)
        }
        return someOf(arrayLikeValue.length, matchArr)
    }
}


//

const CART_KEY = 'checkOutStore';
const CART_KEY_ENROLL = '';
const TOKEN_KEY = 'customerToken';

// Get Shopping Cart Items - PH
export const setShoppingCart = (value, cartKey = CART_KEY ) => {
    if (localStorage) {
        localStorage.setItem(cartKey,JSON.stringify(value));
    }
}

/** Get current breakpoint from `useResponsive` screens object. */
export const getBreakpoint = screens => _.first(_.last((Object.entries(screens).filter(screen => screen[1] === true))))

// Get Shopping Cart Items - PH
export const getShoppingCart = (cartKey = CART_KEY ) => {
    if (localStorage && localStorage.getItem(cartKey)) {
        return JSON.stringify(localStorage.getItem(cartKey));
    }
    return [];
}


// Set Token - PH
export const setToken = (value, tokenKey = TOKEN_KEY) => {
    if (localStorage) {
        localStorage.setItem(tokenKey, JSON.stringify(value));
    }
}

// Get Token - PH
export const getToken = (tokenKey = TOKEN_KEY) => {
    if (localStorage && localStorage.getItem(tokenKey)) {
        return JSON.stringify(localStorage.getItem(tokenKey));
    }
    return [];
}