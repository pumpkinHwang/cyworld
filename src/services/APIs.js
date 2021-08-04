import {
    isSomething,
    isFunction,
    isString,
    isJSON
} from '../components/utils/Utils'
import $ from 'jquery'
import { checkHost, isLocalhost } from '../components/configs/ConfigsHeader'
import * as K from '../components/configs/Keywords'

export const create = (baId, now = new Date()) => {
    const date = now.getUTCDate()
    const weekDay = now.getUTCDay() + 1
    const modeWeekDay = (date % weekDay) + 1
    const hash = baId
        .toString()
        .split('')
        .map(c => parseInt(c) % modeWeekDay)
        .join('')
    return `${hash}${weekDay}${date}`
}

const APIEndpoint = 'https://member-calls2-kr.unicity.com'

const APIEndpointLegacy = {
    local: 'http://localhost:8888/api/unishop',
    dev: 'https://member-kr.unicity.com/unifoapi_dev',
    live: 'https://member-kr.unicity.com/unifoapi'
}

export const _getLegacyEndpoint = (forceLive = false) => {
    let resultEndpoint = APIEndpointLegacy.live
    if (forceLive) return resultEndpoint

    switch (checkHost()) {
        case K.Localhost:
            resultEndpoint = APIEndpointLegacy.dev
            break
        case K.Development:
            resultEndpoint = APIEndpointLegacy.live
            break
        default:
            resultEndpoint = APIEndpointLegacy.live
            break
    }

    return resultEndpoint
}


/** An alias version for `_getHydraEndpoint()`. */
export function hydraURL() {
    return _getHydraEndpoint()
}



export function _getHydraEndpoint() {
    const version = {
        subdomain: 'hydra',
        latest: 'v5a',
        append: '' //-test
    }
    return `https://${version.subdomain}.unicity.net/${version.latest}${version.append}`
}

             

/**
 * @param {String} url - The end-point of request.
 * @param {Object} params - Any query string as an `Object`.
 * @param {Function} fulfilledInterceptor - If **Succeed** to request url, call this method before return the response.
 * @param {Function} rejectInterceptor - If **Fail** to request url, call this method before return the response.
 * @return {Promise}
 */
export const _get = (
    url,
    params,
    configs,
    fulfilledInterceptor,
    rejectInterceptor
) => {
    let resultEndpoint = ''
    if (url.search('http') !== -1) {
        resultEndpoint = url
    } else {
        // resultEndpoint = `${APIEndpoint}/${url}`
        resultEndpoint = `https://member-calls2.unicity.com/${url}`
    }

    const options = {
        method: 'GET',
        url: resultEndpoint,
        async: true,
        ...configs
    }

    if (isSomething(params)) {
        options.data = params
    }

    return new Promise((resolve, reject) => {
        $.ajax(options)
            .done(response => {
                if (isFunction(fulfilledInterceptor)) {
                    /* const newResponse =  */ fulfilledInterceptor(response)
                    /* if (newResponse) {
                        response = newResponse
                    } */
                }
                if (isString(response)) {
                    if (isJSON(response)) {
                        response = JSON.parse(response)
                    }
                }

                resolve(response)
            })
            .fail((xhr, textStatus, errorThrown) => {
                const { responseJSON } = xhr
                if (isFunction(xhr, textStatus, errorThrown))
                    rejectInterceptor(xhr, textStatus, errorThrown)
                reject(responseJSON)
            })
    })
}

export const _post = (
    url,
    body,
    configs,
    fulfilledInterceptor,
    rejectInterceptor
) => {
    let resultEndpoint = ''
    if (url.search('http') !== -1) {
        resultEndpoint = url
    } else {
        //resultEndpoint = `${APIEndpoint}/${url}`
        resultEndpoint = `https://member-calls2-kr.unicity.com/${url}`
    }

    const options = {
        method: 'POST',
        url: resultEndpoint,
        data: JSON.stringify(body),
        async: true,
        ...configs
    }

    return new Promise((resolve, reject) => {
        $.ajax(options)
            .done(response => {
                if (isFunction(fulfilledInterceptor)) {
                    /* const newResponse =  */ fulfilledInterceptor(response)
                    /* if (newResponse) {
                        response = newResponse
                    } */
                }
                if (isString(response)) {
                    if (isJSON(response)) {
                        response = JSON.parse(response)
                    }
                }
                resolve(response)
            })
            .fail((xhr, textStatus, errorThrown) => {
                const { responseJSON } = xhr
                if (isFunction(xhr, textStatus, errorThrown))
                    rejectInterceptor(xhr, textStatus, errorThrown)
                reject(responseJSON)
            })
    })
}

export const _update = (
    url,
    body,
    configs,
    fulfilledInterceptor,
    rejectInterceptor
) => {
    let resultEndpoint = ''
    if (url.search('http') !== -1) {
        resultEndpoint = url
    } else {
        resultEndpoint = `${APIEndpoint}/${url}`
    }

    const options = {
        method: 'UPDATE',
        url: resultEndpoint,
        data: JSON.stringify(body),
        async: true,
        ...configs
    }

    return new Promise((resolve, reject) => {
        $.ajax(options)
            .done(response => {
                if (isFunction(fulfilledInterceptor)) {
                    /* const newResponse =  */ fulfilledInterceptor(response)
                    /* if (newResponse) {
                        response = newResponse
                    } */
                }
                if (isString(response)) {
                    if (isJSON(response)) {
                        response = JSON.parse(response)
                    }
                }
                resolve(response)
            })
            .fail((xhr, textStatus, errorThrown) => {
                const { responseJSON } = xhr
                if (isFunction(xhr, textStatus, errorThrown))
                    rejectInterceptor(xhr, textStatus, errorThrown)
                reject(responseJSON)
            })
    })
}

export const _delete = (
    url,
    configs,
    fulfilledInterceptor,
    rejectInterceptor
) => {
    let resultEndpoint = ''
    if (url.search('http') !== -1) {
        resultEndpoint = url
    } else {
        resultEndpoint = `${APIEndpoint}/${url}`
    }

    const options = {
        method: 'DELETE',
        url: resultEndpoint,
        async: true,
        ...configs
    }

    return new Promise((resolve, reject) => {
        $.ajax(options)
            .done(response => {
                if (isFunction(fulfilledInterceptor)) {
                    /* const newResponse =  */ fulfilledInterceptor(response)
                    /* if (newResponse) {
                        response = newResponse
                    } */
                }
                if (isString(response)) {
                    if (isJSON(response)) {
                        response = JSON.parse(response)
                    }
                }

                resolve(response)
            })
            .fail((xhr, textStatus, errorThrown) => {
                const { responseJSON } = xhr
                if (isFunction(xhr, textStatus, errorThrown))
                    rejectInterceptor(xhr, textStatus, errorThrown)
                reject(responseJSON)
            })
    })
}

