import { isArray, isNothing, isSomething, isString } from './Utils';
import get from 'lodash/get';
import has from 'lodash/has';
import setWith from 'lodash/setWith';
import unset from 'lodash/unset';
import StoreAuth from '@Stores/User/StoreAuth';
import { loge } from './PikaLog';
// import { loge } from './PikaLog';

class ClassStorageExtend {

    storageKey = 'storage-extend'
    publicPath = 'public'
    privatePath = 'private'
    customerPath = ''

    getPersonalPath() {
        if (this.customerPath === '') {
            const customerID = StoreAuth.id
            if (isSomething(customerID)) {
                this.customerPath = `${this.privatePath}.${customerID}`
            }
        }
        return isSomething(get(this, 'customerPath', '')) ? this.customerPath : this.publicPath
    }

    getAsRaw() {
        return localStorage.getItem(this.storageKey)
    }

    getAsParsed() {
        if (isNothing(this.getAsRaw())) {
            return undefined
        } else {
            return JSON.parse(this.getAsRaw())
        }
    }

    getAsObject() {
        if (isNothing(this.getAsParsed())) {
            return {}
        } else {
            return this.getAsParsed()
        }
    }

    save(value) {
        localStorage.setItem(this.storageKey, JSON.stringify(value))
    }

    clear() {
        localStorage.removeItem(this.storageKey)
    }

    /** Gets the value at path of `StorageExtend` object. 
     * If the resolved value is undefined, the `defaultValue` is returned in its place.
     * @param {string|array} path The path of the property to get, could be **String** or **Array**.
     * @param {*} defaultValue The value returned for **undefined** resolved values.
     * @return {*} Returns the resolved value.
    */
    get(path, defaultValue = undefined) {
        if (path && (isString(path) || isArray(path))) {
            return get(this.getAsObject(), path, defaultValue)
        } else {
            return defaultValue
        }
    }

    /** Gets the value under country path of `StorageExtend` object. 
     * If the resolved value is **undefined**, the `defaultValue` is returned in its place.
     * @param {string|array} path The path of the property to get, could be **String** or **Array**.
     * @param {*} defaultValue The value returned for **undefined** resolved values.
     * @return {*} Returns the resolved value.
     */
    getFromCountry(path, defaultValue = undefined) {
        if (path && (isString(path) || isArray(path))) {
            return get(this.getAsObject(), `korea.${path}`, defaultValue)
        } else {
            return defaultValue
        }
    }

    /** Gets the value under personal path of `StorageExtend` object. 
     * If the resolved value is **undefined**, the `defaultValue` is returned in its place.
     * @param {string|string[]} path The path of the property to get, could be **String** or **Array**.
     * @param {*} defaultValue The value returned for **undefined** resolved values.
     * @param {*} options an optional options.
     * @param {string} options.fromCustomer the default value is `auto` which always reference to current customer id. 
     * Could be specified to any customer id. If current customer is not exist, use public path instead.
     * @param {boolean} options.fromCountry get result under country path. The default value is `true`.
     * @param {boolean} options.fallbackToPublic fallback to public path if customer not found. The default value is `true`.
     * @return {*} Returns the resolved value.
     */
    getFromPersonal(path = '', defaultValue = undefined, options = { fromCustomer: 'auto', fromCountry: true, fallbackToPublic: true }) {

        const legitOptions = {
            fromCustomer: options.fromCustomer === undefined ? 'auto' : options.fromCustomer,
            fromCountry: options.fromCountry === undefined ? true : options.fromCountry,
            fallbackToPublic: options.fallbackToPublic === undefined ? true : options.fallbackToPublic
        }

        const { fromCustomer, fromCountry, fallbackToPublic } = legitOptions 

        const country = fromCountry ? `korea.` : ''
        let personal = ''
        if (fromCustomer === 'auto') {
            personal = `${this.getPersonalPath()}.`
        } else {
            if (StoreAuth.isAuthorized) {
                personal = `${this.privatePath}.${fromCustomer}.`
            } else {
                if (fallbackToPublic) {
                    personal = this.publicPath
                } else {
                    // loge('StorageManager > Could not get from personal since unathorized and no public fallback.')
                }
            }
        }
        return this.get(`${country}${personal}${path}`, defaultValue)
    }

    /** Gets the value under public path of `StorageExtend` object. 
     * If the resolved value is **undefined**, the `defaultValue` is returned in its place.
     * @param {string|array} path The path of the property to get, could be **String** or **Array**.
     * @param {*} defaultValue The value returned for **undefined** resolved values.
     * @param {*} options an optional options.
     * @param {boolean} options.fromCountry get result under country path. The default value is `true`.
     * @return {*} Returns the resolved value.
     */
    getFromPublic(path = '', defaultValue = undefined, options = { fromCountry: true }) {

        const legitOptions = {
            fromCountry: options.fromCountry === undefined ? true : options.fromCountry,
        }

        const { fromCountry } = legitOptions 

        const country = fromCountry ? `korea.` : ''
        return this.get(`${country}${this.publicPath}.${path}`, defaultValue)
    }

    /** Checks if path is a direct property of `StorageExtend` object. 
     * @param {string|array} path The path to check, could be **String** or **Array**.
     * @return {boolean} Returns true if path exists, else false.
     */
    has(path) {
        if (path && (isString(path) || isArray(path))) {
            return has(this.getAsObject(), path)
        } else {
            return false
        }
    }

    /** Sets the value at path of `StorageExtend` object. If a portion of path doesn't exist, it's created. 
     * @param {*} value The value to set.
     * @param {string|array} path The path of the property to set, could be **String** or **Array**.
     */
    set(value, path = '') {
        if (path && (isString(path) || isArray(path))) {
            const data = this.getAsObject()
            setWith(data, path, value, Object)
            this.save(data)
        }
    }

    /** Sets the value at path of `StorageExtend` object. If a portion of path doesn't exist, it's created. 
     * @param {*} value The value to set.
     * @param {string|array} path The path of the property to set, could be **String** or **Array**.
     */
    setToCountry(value, path = '') {
        this.set(value, `korea.${path}`)
    }

    /**
     * @param {*} value 
     * @param {string|string[]} path 
     * @param {object} options
     * @param {'auto'|string} options.toCustomer
     * @param {boolean} options.toCountry
     * @param {boolean} options.fallbackToPublic
     */
    setToPersonal(value, path = '', options = { toCustomer: 'auto', toCountry: true, fallbackToPublic: true }) {

        const legitOptions = {
            toCustomer: options.toCustomer === undefined ? 'auto' : options.toCustomer,
            toCountry: options.toCountry === undefined ? true : options.toCountry,
            fallbackToPublic: options.fallbackToPublic === undefined ? true : options.fallbackToPublic
        }

        const { toCustomer, toCountry, fallbackToPublic } = legitOptions 

        const country = toCountry ? `korea.` : ''
        let personal = ''
            if (StoreAuth.isAuthorized) {
                if (toCustomer === 'auto') {
                    personal = `${this.getPersonalPath()}.`
                } else {
                    personal = `${this.privatePath}.${toCustomer}.`
                }
                this.set(value, `${country}${personal}${path}`)
            } else {
                if (fallbackToPublic) {
                    this.set(value, `${country}.${this.publicPath}.${path}`)
                } else {
                    loge('StorageManager > Could not save to personal since unathorized and no public fallback.')
                }
            }
    }

    setToPublic(value, path = '', options = { toCountry: true }) {

        const legitOptions = {
            toCountry: options.toCountry === undefined ? true : options.toCountry,
        }

        const { toCountry } = legitOptions 

        const country = toCountry ? `korea.` : ''
        this.set(value, `${country}${this.publicPath}.${path}`)
    }

    unset(path) {
        const data = this.getAsObject()
        if (path && (isString(path) || isArray(path))) {
            unset(data, path)
            this.save(data)
        }
    }

    unsetFromCountry(path) {
        this.unset(`korea.${path}`)
    }

    unsetFromPersonal(path, toCountry = true) {
        const country = toCountry ? `korea.` : ''
        const personal = `${this.getPersonalPath()}.`
        this.unset(`${country}${personal}${path}`)
    }

    unsetFromPublic(path, options = { fromCountry: true }) {
        const legitOptions = {
            fromCountry: options.fromCountry === undefined ? true : options.fromCountry,
        }

        const { fromCountry } = legitOptions 

        const country = fromCountry ? `korea.` : ''
        this.unset(`${country}${this.publicPath}.${path}`)
    }
}

class ClassSessionExtend {

    storageKey = 'session-extend'

    getAsRaw() {
        return sessionStorage.getItem(this.storageKey)
    }

    getAsParsed() {
        if (isNothing(this.getAsRaw())) {
            return undefined
        } else {
            return JSON.parse(this.getAsRaw())
        }
    }

    getAsObject() {
        if (isNothing(this.getAsParsed())) {
            return {}
        } else {
            return this.getAsParsed()
        }
    }

    save(value) {
        sessionStorage.setItem(this.storageKey, JSON.stringify(value))
    }

    clear() {
        sessionStorage.removeItem(this.storageKey)
    }

    /** Gets the value at path of `DictionaryExtend` object. 
     * If the resolved value is undefined, the `defaultValue` is returned in its place.
     * @param {string|array} path The path of the property to get, could be **String** or **Array**.
     * @param {*} defaultValue The value returned for **undefined** resolved values.
     * @return {*} Returns the resolved value.
    */
    get(path, defaultValue = undefined) {
        if (path && (isString(path) || isArray(path))) {
            return get(this.getAsObject(), path, defaultValue)
        } else {
            return defaultValue
        }
    }

    /** Checks if path is a direct property of `DictionaryExtend` object. 
     * @param {string|array} path The path to check, could be **String** or **Array**.
     * @return {boolean} Returns true if path exists, else false.
     */
    has(path) {
        if (path && (isString(path) || isArray(path))) {
            return has(this.getAsObject(), path)
        } else {
            return false
        }
    }

    /** Sets the value at path of `DictionaryExtend` object. If a portion of path doesn't exist, it's created. 
     * @param {*} value The value to set.
     * @param {string|array} path The path of the property to set, could be **String** or **Array**.
     */
    set(value, path = '') {
        if (path && (isString(path) || isArray(path))) {
            const data = this.getAsObject()
            setWith(data, path, value, Object)
            this.save(data)
        }
    }

    unset(path) {
        const data = this.getAsObject()
        if (path && (isString(path) || isArray(path))) {
            unset(data, path)
            this.save(data)
        }
    }

    /** Gets the value under country path of `DictionaryExtend` object. 
     * If the resolved value is **undefined**, the `defaultValue` is returned in its place.
     * @param {string|array} path The path of the property to get, could be **String** or **Array**.
     * @param {*} defaultValue The value returned for **undefined** resolved values.
     * @return {*} Returns the resolved value.
     */
    getFromCountry(path, defaultValue = undefined) {
        if (path && (isString(path) || isArray(path))) {
            return get(this.getAsObject(), `korea.${path}`, defaultValue)
        } else {
            return defaultValue
        }
    }

    /** Sets the value at path of `DictionaryExtend` object. If a portion of path doesn't exist, it's created. 
     * @param {*} value The value to set.
     * @param {string|array} path The path of the property to set, could be **String** or **Array**.
     */
    setToCountry(value, path = '') {
        this.set(value, `korea.${path}`)
    }
}

const coreStorageExtend = new ClassStorageExtend()
const coreSessionExtend = new ClassSessionExtend()

export { coreStorageExtend as StorageExtend }
export { coreSessionExtend as SessionExtend }