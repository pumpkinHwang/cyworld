import { isString, defaults, isNullOrUndefined } from './Utils';
import { trim as _trim, upperCase as _upperCase, lowerCase as _lowerCase, startCase as _startCase } from 'lodash';

export const isContainSpecialCase = (text) => {
	const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
	return format.test(text)
}

/** Removed **Zero-width** space characters (`U+200B`, `&#8203;`, `\u200B`) from **String** value then return. 
 * 
 * **Note:** If it's not **String** return the same value.
 * @return {String} the new result without zero-width space characters.
 */
export const eliminateGhostSpace = (value) => { return isString(value) ? value.replace(/\u200B/g,'') : value }

export const eliminatesSingleQuote = (text) => {
	const format = /'/g
	return text.replace(format, '')
}

export const testNumber = (value) => {
	const format = /^[0-9]+$/
	return format.test(value)
}

/** Remove spaces and zero-width spaces from string value. 
 * @param {string} value
 * @return {string}
*/
export const removeSpaces = value => defaults(value, '').replace(/[\s\u200B]/g, '')

export const removeSpecial = value => defaults(value, '').replace(/[\s\u200B!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, '')


/** Converts **String** to `upper-case` without harm (prevent an undefined error). 
 * @param {string} value
 * @return {string}
*/
export const upperCase = value => defaults(value, '').toString().toUpperCase()

/** Converts **String** to `lower-case` without harm (prevent an undefined error). 
 * @param {string} value
 * @return {string}
*/
export const lowerCase = value => defaults(value, '').toString().toLowerCase()

/** Capitalize first-char of string value, without adding any space.
 * @param {string} value
 * @return {string}
*/
export const startCase = value => removeSpaces(_startCase(defaults(value, '')))

/** Search partial string value from string target then return boolean result.
 * @param {string} text
 * @param {string} find
 * @return {boolean}
*/
export const findString = (text, find) => {
	return defaults(text, '').search(find) !== -1
}

/** Search partial string value from bunch of expectancy string targets then return boolean result.
 * @param {string} text
 * @param {string[]} expectancy
 * @return {boolean}
*/
export const someOfString = (text, expectancy = []) => {
	for (let i = 0; i < expectancy.length; i++) {
		const element = expectancy[i] 
		if (findString(text, element)) {
			return true
		}
	}
	return false
}

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

/** Return trim **String** while handle unattended `undefined` error.
 * If error happen or the value is not **String**, return itself.
 * @param {string} string The string to trim.
 * @return {string} Returns the trimmed string.
 */
export const trim = string => {
    if (isNullOrUndefined(string)) {
        return ''
    } else {
        if (isString(string) === false) {
            console.warn(`It's not possible to trim "${string}" | Type = (${typeof string}).`)
            return string // not able to be trim
        }
    }
    return defaults(string, '').trim()
}

/** Removes leading and trailing whitespace and special characters from string.
 * @param {string} string The string to trim.
 * @return {string} Returns the trimmed string.
 */
export const superTrim = string => _trim(removeSpecial(string))