import * as K from './Keywords';
import { devTools } from '../../stores/MainStore';
import { isNullOrUndefined, isSomething } from '../utils/Utils';
import queryString from 'query-string';
import { get, has } from 'lodash';

// ------------------------------------------------------------
// Class Concept: Any safe methods, that could be use anywhere. 
// ------------------------------------------------------------
// This header is loaded before the most other components.
// Please be careful with code, AVOID to use other components here.
// ------------------------------------------------------------

export function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export const getQueryString = () => {
    const qs = window.location.search
    if (isSomething(qs)) {
        return queryString.parse(qs)
    } else {
        return {}
    }
}

export const hasQueryString = key => has(getQueryString(), key)

export const getCurrentDomain = () => {
    return window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
}

export const checkHost = () => {
    if (getCurrentDomain().indexOf('localhost') !== -1) {
        return K.Localhost
    } else {
        return K.Localhost
    }
}

export const isLocalhost = () => {
    return checkHost() === K.Localhost
}

export const isDevelopment = () => {
    return checkHost() === K.Development
}

export const isProduction = () => {
    return checkHost() === K.Production || devTools.isSimulateLive
}

export const isDevelopmentOrLocalhost = () => {
    return (isLocalhost() || isDevelopment()) && (isProduction() === false)
}

export const isNotProduction = () => {
    return /^localhost/.test(window.location.hostname)
}

export const getCountry = () => {
    return 'korea'
}

export const throatAllCustom = (needle, list, defaultData, fallback = null) => {
    // if (isNullOrUndefined(list)) console.error('Please check throatAllCustom(), list should not be undefined.')
    const c = needle
    if (isNullOrUndefined(list[c])) {
        if (isNullOrUndefined(list[K.All])) {
            if (isNullOrUndefined(fallback)) {
                return defaultData
            } else {
                return fallback
            }
        } else {
            return list[K.All]
        }
    } else {
        return list[c]
    }
}

export const throatAllDefault = (list, defaultData, fallback = null) => {
    // if (isNullOrUndefined(list)) console.error('Please check throatAllDefault(), list should not be undefined.')
    const c = getCountry()
    if (isNullOrUndefined(get(list, `${c}`, undefined))) {
        if (isNullOrUndefined(get(list, `${K.All}`, undefined))) {
            if (isNullOrUndefined(fallback)) {
                return defaultData
            } else {
                return fallback
            }
        } else {
            return get(list, `${K.All}`)
        }
    } else {
        return get(list, `${c}`)
    }
}

export const throatBoolean = (list) => { 
    // if (isNullOrUndefined(list)) console.error('Please check throatBoolean(), list should not be undefined.')
    return throatAllDefault(list, false) 
}

export const throatObject = (list) => { 
    // if (isNullOrUndefined(list)) console.error('Please check throatObject(), list should not be undefined.')
    return throatAllDefault(list, {}) 
}

export const throatString = (list) => { 
    // if (isNullOrUndefined(list)) console.error('Please check throatString(), list should not be undefined.')
    return throatAllDefault(list, '') 
}

export const throatArray = (list) => { 
    // if (isNullOrUndefined(list)) console.error('Please check throatArray(), list should not be undefined.')
    return throatAllDefault(list, []) 
}

export const throatFallback = (list, fallback) => { 
    // if (isNullOrUndefined(list)) console.error('Please check throatFallback(), list should not be undefined.')
    return throatAllDefault(list, null, fallback) 
}

export const throatStage = (list) => {
    // if (isNullOrUndefined(list)) console.error('Please check throatStage(), list should not be undefined.')
    let result = list[K.Localhost]
    if (isProduction()) {
        result = list[K.Production]
    } else if (isDevelopment()) {
        result = list[K.Development]
    }
    return result
}

export const throatField = (field, country) => {
    if (isNullOrUndefined(field)) {
        return false
    } else {
        if (isNullOrUndefined(field[country])) {
            return isNullOrUndefined(field['all']) ? false : field['all']
        } else {
            return field[country]
        }
    }
}