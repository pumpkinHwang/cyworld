import React from 'react'
import { action, get as mGet } from 'mobx'
import moment from 'moment'
import validator from 'validator'
import numeral from 'numeral'
import $ from 'jquery'
import { hydraURL } from '../services/APIs'

import {
    appConfig,
    APICountryCodeConfig,
    productCountryCode3Config,
} from './config'

import ReactMarkdown from 'react-markdown/with-html'

import { store, staticFooter, devTools } from '../stores/MainStore'

import {
    isSomething,
    isNothing,
    isNullOrUndefined,
    isString,
} from './utils/Utils'
import { loge, logi } from './utils/PikaLog'
import {
    isMobile as _isMobile,
    isTablet as _isTablet,
    isDesktop
} from './utils/Bowser'

import get from 'lodash/get'

import * as SafeHelpers from './configs/ConfigsHeader'
import * as K from './configs/Keywords'

import StoreCountry from '@Stores/StoreCountry'

import {
    apiURL as apiURLShop,
    getCurrentDomain,
    getAPIDomain
} from './ShoppingHelper'

let COUNTRY_CODE = ''
let member_call_url = ''
let urlpath = ''
COUNTRY_CODE = getCountryCode() || ''
member_call_url = 'https://member-calls.unicity.com/'

export function getAPICountryCode() {
    return APICountryCodeConfig(appConfig.country)
}

export function getAPICountryCode3() {
    return APICountryCode3Config(appConfig.country)
}

export var apiURL = {
    loginAddProfile:
        member_call_url + 'api/' + urlpath + '/v1/common/global/addProfile',
    hydraStandard: `${hydraURL()}`,
    loginTokens: `https://member-calls2.unicity.com/adapter/loginTokens`,

    // getNews: "https://member-" + COUNTRY_CODE.toLowerCase() + ".unicity.com/cpanel/wp-admin/admin-ajax.php?action=unimobiapp_get_news&args[posts_per_page]=-1",
    // getMedia: "https://member-" + COUNTRY_CODE.toLowerCase() + ".unicity.com/cpanel/wp-admin/admin-ajax.php?action=unimobiapp_get_prospect",
    // getAllProduct: "https://member-" + COUNTRY_CODE.toLowerCase() + ".unicity.com/cpanel/wp-admin/admin-ajax.php?action=unimobiapp_get_products&args[order]=asc&args[posts_per_page]=100&args[paged]=",
    getProducts: apiURLShop.product.getProducts,
    newGetProducts: apiURLShop.product.newGetProducts,
    // getProductsHot: "https://member-" + COUNTRY_CODE.toLowerCase() + ".unicity.com/cpanel/wp-admin/admin-ajax.php?action=unimobiapp_get_products&args[meta_key]=product_hot&args[meta_value]=yes&args[order]=asc",
    sendFeedback:
        'https://member-calls.unicity.com/ALL/ALL_Send_Mail_Feedback.php',
    sendTaxFeedback: 'https://member-calls.unicity.com/ALL/TAX_Send_Mail.php',
    seminarData:
        'https://member-th.unicity.com/cpanel/wp-admin/admin-ajax.php?action=unimobiapp_get_seminar&b=',
    orderHistory:
        'https://member-' +
        COUNTRY_CODE.toLowerCase() +
        '.unicity.com/mobile/queryorder.php?type=1&token=',
    queryOrder:
        'https://member-' +
        COUNTRY_CODE.toLowerCase() +
        '.unicity.com/mobile/queryorder.php?type=2&token=',
    whoAmI: 'https://hydra.unicity.net/v5a/whoami',
    //getPeriod: "https://thdl1.unicity-easynet.com/commission_html/getdate.php",
    getPeriod: 'https://member-calls.unicity.com/period.asp',
    getCommissionData: `${hydraURL()}/customers/me/commissionstatements`,
    expandCustomer: 'https://member-calls2-kr.unicity.com/h/info/',
    uplineSponsoringCustomer: '/uplineSponsoringCustomers.js?unicity=',
    getVip: 'https://member-calls.unicity.com/v5a/customers/me/fsb?id=',
    getInventory:
        'https://member-' +
        COUNTRY_CODE.toLowerCase() +
        '.unicity.com/easyship/getInventory.php',
    // URL_SERVICES_PROVINCES: 'https://dsc" + COUNTRY_CODE.toLowerCase() + ".unicity.com/getdata.php?type=getAllProvince',
    // URL_SERVICES_AMPHURES: 'https://dsc" + COUNTRY_CODE.toLowerCase() + ".unicity.com/getdata.php?type=getAmphuresByProvince&province_id=[provinceId]',
    // URL_SERVICES_DISTRICTS: 'https://dsc" + COUNTRY_CODE.toLowerCase() + ".unicity.com/getdata.php?type=getDistrictsByAmphur&amphur_id=[amphurId]',
    // getZipCode: 'https://dsc" + COUNTRY_CODE.toLowerCase() + ".unicity.com/getdata.php?type=getZipcodeByDistricts&district_id=[districtId]',
    linkPayMent:
        'https://member-' +
        COUNTRY_CODE.toLowerCase() +
        '.unicity.com/cpanel/payment-bkk-2/?temp_order_id=',
    adminAjax:
        'https://member-"+COUNTRY_CODE.toLowerCase()+".unicity.com/cpanel/wp-admin/admin-ajax.php',
    commissionStatement:
        'https://hydra.unicity.net/v5a/customers/me/commissionstatements',
    resetPassword: 'https://hydra.unicity.net/v5a/passwordresettokens',
    newRegistration: 'https://hydra.unicity.net/v5a/passwordcreatetokens',
    emailSubscription:
        'https://member-calls.unicity.com/ALL/ALL_Email_Subscription.asp',
    hydraCostumer: 'https://hydra.unicity.net/v5a/customers?id.unicity=',
    createPassword: 'https://hydra.unicity.net/v5a/customers/me/password',
    lsb: 'https://member-kr.unicity.com/unifoapi/v1/common/global/LBS',
    KR: {
        validateAddress: member_call_url + 'KOR/KOR_Order_Validation.asp',
        validateAddressBook:
            member_call_url + 'KOR/KOR_AddrBook_Validation.asp',
        enrollValidation: member_call_url + 'KOR/KOR_Enroll_Validation.asp',
        referralEnrollValidation:
            member_call_url + 'KOR/KOR_Referral_Enroll_Validation.asp',
        newReferralEnrollValidation:
            member_call_url + 'KOR/KOR_Order_Validation.asp',
        IdValidation: member_call_url + 'KOR/KOR_ID_Validation.asp'
    }
}


/** Get country code as ISO 3166-1 alpha-2 code. (e.g. TH, AU, NZ)
 * @param {boolean} lowercase transform output to lowercase.
 */
 export function getCountryCode(lowercase = false) {
    try {
        let data = {}
        if (isSomething(store.countryData)) {
            data = store.countryData.find(item =>
                isEqualText(item.name === appConfig.country)
            )
        }

        let result = ''
        if (isSomething(data)) {
            result = data['alpha-2']
        } else {
            result = appConfig.countryCode[appConfig.country]
        }

        return lowercase ? lowerCase(result) : result
    } catch (e) {
        return appConfig.countryCode[appConfig.country]
    }
}

/** Get country code as ISO 3166-1 alpha-3 code. (e.g. THA, AUS, NZL)
 * @param {boolean} lowercase transform output to lowercase.
 */
 export function getCountryCode3(lowercase = false) {
    try {
        let data = {}
        if (isSomething(store.countryData)) {
            data = store.countryData.find(item =>
                isEqualText(item.name === appConfig.country)
            )
        }

        let result = ''
        if (isSomething(data)) {
            result = data['alpha-3']
        } else {
            result = appConfig.countryCode3[appConfig.country]
        }

        return lowercase ? lowerCase(result) : result
    } catch (e) {
        return appConfig.countryCode3[appConfig.country]
    }
}

export function getProductCountryCode3() {
    return productCountryCode3Config(appConfig.country)
}

// Stage check functions
export const isLocalhost = () => {
    return (
        checkHost() === appConfig.hostname.localhost &&
        devTools.isSimulateLive === false
    )
}
export const isDevelopment = () => {
    return checkHost() === appConfig.hostname.development
}
export const isProduction = () => {
    return (
        checkHost() === appConfig.hostname.production || devTools.isSimulateLive
    )
}
export const isDevelopmentOrLocalhost = () => {
    return (isLocalhost() || isDevelopment()) && isProduction() === false
}

export const showAllEnvironment = () => {
    return true
}

export const getEnvironment = () => {
    switch (checkHost()) {
        case K.Localhost:
            return 'Localhost'
        case K.Development:
            return 'Development'
        case K.Production:
            return 'Production'
        default:
            return 'Unknown'
    }
}

export const getDevelopmentID = () => {
    if (isDevelopment()) {
        try {
            let d = getCurrentDomain()
            d = d.split('-dev')[1]
            d = d.split('.')[0]
            return d
        } catch (e) {
            console.error('getDevelopmentID()', e)
            return ''
        }
    } else {
        return ''
    }
}

/** Covert string value to markdown component.
 * @param {string} value any string value with markdown syntax.
 * @return {React.ReactNode} return component
 * @example
 * withMarkdown(language.listen('shipping_description'))
 * withMarkdown('Hello **Bold** Text')
 * withMarkdown('<strong>Bold</strong><br><font color="red">Red</font>')
 */
export const withMarkdown = value => {
    if (isString(value) === false) return <span></span>
    const result = value.replace(/\n/g, '<br/>')
    return <ReactMarkdown source={result} escapeHtml={false} />
}


/** An alias version of `dictionary()`.
 * Display word from dictionary with specified logic. If word does not existed, development error log show.
 * @param {string} label any key for a word related with dictionary.
 * @param {boolean} showLabelWhenMissing show label instead when this word is missing.
 * @param {boolean} showBracketAlongLabel use with missing word, show brackets along a label.
 * @example
 * dictionary('profile') // output => Profile | error => [profile]
 * dictionary('Simply show this.', true, false) // output => Simply show this.
 */
export const dict = key => dictionary(key)

export const inputTypeNumber = () => {
    if (isDesktop()) {
        return 'text'
    } else {
        return 'tel'
    }
}

// ** Dictionary **
/** @deprecated Please use `language.listen()` instead. */
export const dictionary = (
    key,
    showLabelWhenMissing = true,
    showBracketAlongLabel = true
) => {
    return language.listen(key, {
        keyOnMissing: showLabelWhenMissing,
        keyWithBrackets: showBracketAlongLabel,
        autoLocalized: false,
        autoPrefix: false
    })
}

export var randomAlphabetAndNumber = (lengthAlphabet, lengthNumber) => {
    var result = ''
    let alphabet = 'abcdefghijklmnopqrstuvwxyz' //ABCDEFGHIJKLMNOPQRSTUVWXYZ
    let numbers = '0123456789'
    for (var i = lengthAlphabet; i > 0; --i)
        result += alphabet[Math.floor(Math.random() * alphabet.length)]
    for (var i = lengthNumber; i > 0; --i)
        result += numbers[Math.floor(Math.random() * numbers.length)]
    return result
}

/** Print text on localhost stage. <span class='text-muted'>TEXT</span> */
export const printl = text => {
    return isProduction() === false && isLocalhost() === true ? (
        <span
            className={'mx-2 px-2 badge badge-pill badge-warning'}
            dangerouslySetInnerHTML={{ __html: text }}></span>
    ) : (
        ''
    )
}

/** Print text on localhost and development stage. <span class='text-muted'>TEXT</span> */
export const printd = text => {
    return isProduction() === false && isDevelopment() === true ? (
        <span
            className={'mx-2 px-2 badge badge-pill badge-primary text-small'}
            dangerouslySetInnerHTML={{ __html: text }}></span>
    ) : (
        ''
    )
}

export const showOnDev = () => {
    return (
        window.location.hostname === K.Localhost
    )
}


export const checkHost = () => {
    return SafeHelpers.checkHost()
}

/** Check and handled maintenance mode from footer. */
export const isMaintenanceMode = () => {
    const isMaintenance = get(
        StoreCountry,
        'country.maintenance_mode.maintenance_mode'
    )

    return isMaintenance || get(devTools, 'isSimulateMaintenance')

    // if (someOfString(window.location.hostname, ['localhost', 'dev', 'test'])) {
    //     return 'yes'
    // } else {

    //     prevent any human errors on footer here
    //     let isMaintenanceEnglish = get(staticFooter, 'footerGeneral.maintenance.english', '')
    //     let isMaintenanceNative = get(staticFooter, 'footerGeneral.maintenance.native', '')
    //     isMaintenanceEnglish = isNothing(isMaintenanceEnglish) ? 'no' : trim(isMaintenanceEnglish)
    //     isMaintenanceNative = isNothing(isMaintenanceNative) ? 'no' : trim(isMaintenanceNative)
    //     const isMaintenance = isMaintenanceEnglish === 'yes' || isMaintenanceNative === 'yes'
    //     try {
    //         return isMaintenance || get(devTools, 'isSimulateMaintenance')
    //     } catch (e) {
    //         console.error(e)
    //         return isMaintenance
    //     }
    // }
}

export function objectToArray(object, callback) {
    let tempArray = []
    Object.keys(object).map(key => {
        tempArray.push(Object.assign(object[key], { key }))
        return false
    })
    callback(tempArray)
}

export const reflect = promise => {
    return promise.then(
        type => {
            return { type: type, status: true }
        },
        type => {
            return { type: type, status: false }
        }
    )
}

export const validateAlphaEnglish = str => {
    var pattern = /^[a-zA-Z]+$/
    return pattern.test(str)
}

export const validateAlphaThai = str => {
    var pattern = /^[ก-๙]+$/
    return pattern.test(str)
}

export const validateEmail = str => {
    return validator.isEmail(str)
}

export const isNilOrEmpty = value => {
    return validator.isEmpty(value)
}

/** **[Deprecated]** Return `true` if this device is `mobile` or `tablet`.
 * If you want to detect only `mobile`. Please call the method from `utils/Bowser` instead.
 * Anyway, this method still work.  */
export const isMobile = () => _isMobile() || _isTablet() // <- this is a mimic of old method logic
/** **[Deprecated]** Return `true` if this device is `tablet`.
 * Please call the method from `utils/Bowser` instead. Anyway, this method still work.  */
export const isTablet = () => _isTablet()

export const deviceType = () => {
    return /android/i.test(navigator.userAgent.toLowerCase())
        ? 'Android'
        : /iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase())
        ? 'IOS'
        : !/android|webos|iphone|ipad|ipod|blackberry|BB|PlayBook|iemobile|opera mini/i.test(
              navigator.userAgent.toLowerCase()
          )
        ? 'Web'
        : 'Mweb'
}

export const getDevice = () => {
    var module = {
        options: [],
        header: [
            navigator.platform,
            navigator.userAgent,
            navigator.appVersion,
            navigator.vendor,
            window.opera
        ],
        dataos: [
            { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
            { name: 'Windows', value: 'Win', version: 'NT' },
            { name: 'iPhone', value: 'iPhone', version: 'OS' },
            { name: 'iPad', value: 'iPad', version: 'OS' },
            { name: 'Kindle', value: 'Silk', version: 'Silk' },
            { name: 'Android', value: 'Android', version: 'Android' },
            { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
            { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
            { name: 'Macintosh', value: 'Mac', version: 'OS X' },
            { name: 'Linux', value: 'Linux', version: 'rv' },
            { name: 'Palm', value: 'Palm', version: 'PalmOS' }
        ],
        databrowser: [
            { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
            { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
            { name: 'Safari', value: 'Safari', version: 'Version' },
            { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
            { name: 'Opera', value: 'Opera', version: 'Opera' },
            { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
            { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
        ],
        init: function () {
            var agent = this.header.join(' '),
                os = this.matchItem(agent, this.dataos),
                browser = this.matchItem(agent, this.databrowser)

            return { os: os, browser: browser }
        },
        matchItem: function (string, data) {
            var i = 0,
                j = 0,
                html = '',
                regex,
                regexv,
                match,
                matches,
                version

            for (i = 0; i < data.length; i += 1) {
                regex = new RegExp(data[i].value, 'i')
                match = regex.test(string)
                if (match) {
                    regexv = new RegExp(
                        data[i].version + '[- /:;]([\\d._]+)',
                        'i'
                    )
                    matches = string.match(regexv)
                    version = ''
                    if (matches) {
                        if (matches[1]) {
                            matches = matches[1]
                        }
                    }
                    if (matches) {
                        matches = matches.split(/[._]+/)
                        for (j = 0; j < matches.length; j += 1) {
                            if (j === 0) {
                                version += matches[j] + '.'
                            } else {
                                version += matches[j]
                            }
                        }
                    } else {
                        version = '0'
                    }
                    return {
                        name: data[i].name,
                        version: parseFloat(version)
                    }
                }
            }
            return { name: 'unknown', version: 0 }
        }
    }

    let e = module.init()
    //let osName = e.os.name + '|' + e.browser.name + ' ' + e.browser.version
    let osName = e.os.name + '|' + e.browser.name
    return osName
}

export function jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export const validateGovId = str => {
    if (str.length !== 9) return false

    str = str.toUpperCase()

    var i,
        icArray = []
    for (i = 0; i < 9; i++) {
        icArray[i] = str.charAt(i)
    }

    icArray[1] = parseInt(icArray[1], 10) * 2
    icArray[2] = parseInt(icArray[2], 10) * 7
    icArray[3] = parseInt(icArray[3], 10) * 6
    icArray[4] = parseInt(icArray[4], 10) * 5
    icArray[5] = parseInt(icArray[5], 10) * 4
    icArray[6] = parseInt(icArray[6], 10) * 3
    icArray[7] = parseInt(icArray[7], 10) * 2

    var weight = 0
    for (i = 1; i < 8; i++) {
        weight += icArray[i]
    }

    var offset = icArray[0] === 'T' || icArray[0] === 'G' ? 4 : 0
    var temp = (offset + weight) % 11

    var st = ['J', 'Z', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A']
    var fg = ['X', 'W', 'U', 'T', 'R', 'Q', 'P', 'N', 'M', 'L', 'K']

    var theAlpha
    if (icArray[0] === 'S' || icArray[0] === 'T') {
        theAlpha = st[temp]
    } else if (icArray[0] === 'F' || icArray[0] === 'G') {
        theAlpha = fg[temp]
    }

    return icArray[8] === theAlpha
}

//FOR THAI ID
// export const validateGovId = (id) => {
//     let sum = 0
//     if (!validator.isLength(id, { min: 13, max: 13 })) {
//         return false
//     }

//     for (var i = 0; i < 12; i++) {
//         sum += parseFloat(id.charAt(i)) * (13 - i)
//     }

//     if ((11 - sum % 11) % 10 !== parseFloat(id.charAt(12))) {
//         return false
//     }
//     return true
// }

export const validateDate = (min, date) => {
    return moment().diff(date, 'years') >= min ? true : false
}

export var apiHEADER = {
    preset1: { 'Content-Type': 'application/json' }
}

export function getParameterByName(name, url) {
    if (!url) url = window.location.href
    name = name.replace(/[\[\]]/g, '\\$&')
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export var rankListOrdered = {
    Dst: 0,
    Ph1: 1,
    Mgr: 2,
    SrM: 3,
    ExM: 4,
    Dir: 5,
    SrD: 6,
    ExD: 7,
    PrD: 8,
    PrS: 9,
    PrR: 10,
    DIA: 11,
    CCM: 12,
    AFP: 13
}

/**
 * Set a delay then callback a function.
 * @param {*} self this
 * @param {*} second time in second
 * @param {*} callback a callback function
 */
export function wait(self, second, callback) {
    setTimeout(() => {
        callback(self)
    }, second * 1000)
}

export function booleanReader(value) {
    return typeof value !== 'boolean' ? value === 'true' : value
}

export function isWordExist(text, find) {
    return text.search(find) !== -1
}

export const replaceHashTagsWith = action((text, tag, replacePhrase) => {
    const hashtag = '#' + tag
    const regex = new RegExp(hashtag, 'g')
    return isWordExist('#' + tag) ? text.replace(regex, replacePhrase) : text
})

/**
 * Check data from the begin to an end of data keys.
 * @param {object} data JSON data object.
 * @param  {...string} keys keys that need to for each check.
 */
export function isNullDataEach(data, ...keys) {
    if (isNothing(data)) return true
    let cdata = data
    keys.map(v => {
        cdata = cdata[v]
        if (isNothing(cdata)) {
            return true
        }
    })
    return false
}

/** **[Deprecated]** Check every possibility to be null.
 * @param {*} object [any] any object.
 * @deprecated Please use isNothing() instead.
 */
export function isNullPossibility(object) {
    return isNullOrUndefined(object) || object === '' || object === NaN
}

/**
 * Open image url and check if it was exists and then return boolean.
 * @param {string} imageEndpoint any image url that need to be check.
 */
export const imageExists = (imageEndpoint, callbackSuccess, callbackFail) => {
    const img = new Image()
    img.onload = callbackSuccess
    img.onerror = callbackFail
    img.src = imageEndpoint
}

/**
 * Replaced special string to html format.
 * @[br] - new line @[color=#000000] - color text @[li] - list @[b] - bold text@[i] - italic text@[u] - underline text
 * @param {string} text any text that need to be format.
 */
export function textFormat(text) {
    if (text == undefined) return ''
    let newStyle = {}
    let color = ''
    // find new line
    let regex = /\[br\]/g
    let result = text.replace(regex, '<br/>')
    // find color
    let regexColor = /\[color=#/
    const colorPos = result.search(regexColor)
    // find list
    let regexList = /\[li\]/
    const listPos = result.search(regexList)
    // find bold
    let regexBold = /\[b\]/
    const boldPos = result.search(regexBold)
    // find italic
    let regexItalic = /\[i\]/
    const italicPos = result.search(regexItalic)
    // find underline
    let regexUnderline = /\[u\]/
    const underlinePos = result.search(regexUnderline)

    // replace color
    if (colorPos !== -1) {
        color = result.substr(colorPos + String('[color=#').length, 6)
        regexColor = /\[color=#......\]/
        result = result.replace(regexColor, '')
        newStyle['color'] = '#' + color
    }
    // replace list
    if (listPos !== -1) {
        result = result.replace(regexList, '<li>')
        result += '</li>'
    }
    // replace bold
    if (boldPos !== -1) {
        result = result.replace(regexBold, '')
        newStyle['fontWeight'] = 'bold'
    }
    // replace italic
    if (italicPos !== -1) {
        result = result.replace(regexItalic, '')
        newStyle['fontStyle'] = 'italic'
    }
    // replace underline
    if (underlinePos !== -1) {
        result = result.replace(regexUnderline, '')
        newStyle['textDecoration'] = 'underline'
    }
    return (
        <span
            style={newStyle}
            dangerouslySetInnerHTML={{ __html: result }}></span>
    )
}

/**
 * Check any singular or plural verb to be and change it to correct one.
 * @param {*} text any text that need to be format.
 * @param {*} count number of thing.
 */
export function pluralize(text, count) {
    let regex
    let result = text
    if (count > 1) {
        // plural
        regex = /is/g
        result = text.replace(regex, 'are')
        regex = /was/g
        result = result.replace(regex, 'were')
    } else {
        // singular
        regex = /are/g
        result = text.replace(regex, 'is')
        regex = /were/g
        result = result.replace(regex, 'was')
    }
    return result
}

/**
 * Check decimal format from footer.
 * @param {*} number any number that need to be format.
 * @param {boolean} isDecimal enable decimal display.
 */
export function decimalController(number, language) {
    if (isNothing(number)) return null
    if (isNothing(language)) return null

    const CASE_INTEGER = 'integer'

    let front = null
    let result = null
    let resultMod = null
    let control = staticFooter.footerGeneral
    if (devTools.simulateDecimal !== null) {
        control = {
            decimal_controller: {
                english: devTools.simulateDecimal,
                native: devTools.simulateDecimal
            }
        }
    } else {
        if (language === CASE_INTEGER) {
            // forced the function to return in integer case
            control = { decimal_controller: { english: 'int', native: 'int' } }
        } else {
            if (isNothing(control)) {
                // if footer not found, use a default setting instead
                console.warn(
                    'Warning: decimal controller are not found, please check the footer.'
                )
                control = { decimal_controller: { english: 2, native: 2 } }
            }
        }
    }

    if (isNothing(control.decimal_controller)) return null

    const controlEnglish =
        control.decimal_controller[appConfig.footerLanguageControl.english]
    const controlNative =
        control.decimal_controller[appConfig.footerLanguageControl.native]
    if (isNothing(controlEnglish)) return null
    if (isNothing(controlNative)) return null

    const limit =
        language === appConfig.footerLanguageControl.english
            ? controlEnglish
            : controlNative
    if (isNothing(limit)) return null

    result = number.toString()

    switch (limit.toString()) {
        case 'int':
            // forced integer case
            result = numeral(result).format(appConfig.numeralFormat)
            break
        default:
            resultMod = result.split('.')[1]
            if (isNothing(resultMod)) {
                // no decimal case
                result = numeral(result).format(appConfig.numeralFormat)
            } else {
                if (resultMod === 0) {
                    // no decimal case
                    result = numeral(result).format(appConfig.numeralFormat)
                } else {
                    front = numeral(result.split('.')[0]).format(
                        appConfig.numeralFormat
                    )
                    result = front.toString() + '.' + resultMod.toString()
                    // decimal case
                    const points = resultMod.toString()
                    let newLength
                    const marginLength = points.length - limit
                    if (marginLength === 0) {
                        newLength = points.length
                    } else if (marginLength > 0) {
                        newLength = marginLength
                    } else if (marginLength < 0) {
                        newLength = Math.abs(marginLength)
                    }

                    if (marginLength <= 0) {
                        newLength = result.length
                    } else {
                        newLength = result.length - newLength
                    }
                    result = result.substring(0, newLength)

                    // find zero in decimal
                    resultMod = result.split('.')[1]
                    if (!isNothing(resultMod)) {
                        let pattern = '.'
                        for (let s = 0; s < resultMod.length; s++) {
                            pattern += '0'
                        }
                        result = result.replace(pattern, '')
                    } else {
                        result = result.replace('.', '')
                    }
                }
            }
            break
    }
    return result
}

/**
 * Convert any value to numeral format or decimal format.
 * @param {*} value any number that should be convert.
 */
export function numeralFormat(value) {
    const language = appConfig.footerLanguageControl.native
    return decimalController(value, language)
}

/**
 * Convert any value to numeral format or decimal format.
 * @param {number} value any number that should be convert.
 * @param {number} points any points that should be display.
 */
export function decimalFormat(value, points = 2, isComma = true) {
    let p = '.'
    for (let i = 0; i < points; i++) {
        p += '0'
    }
    return numeral(value).format(`${isComma ? '0,' : ''}0${p}`)
}

/**
 * Convert any value to integer format.
 * @param {*} value any number that should be integer.
 */
export function integerFormat(value) {
    return decimalController(value, 'integer')
}

export const hasExtension = (inputID, exts) => {
    var fileName = document.getElementById(inputID).value
    return new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$').test(
        fileName
    )
}

export function formToJSON(elements) {
    let inputs = {}
    for (var i = 0, element; (element = elements[i++]); ) {
        inputs[element.name] = element.value
    }
    return inputs
}


////////////// Country Functions //////////////
/** Get country output by country code, this could be a native version. (e.g. Thailand, ประเทศไทย, New Zealand) */
export function getDefaultCountry(countryCode) {
    if (isLanguageNative()) {
        return store.language[getCountry()]
    } else {
        return appConfig.countryCodeToFullDisplay[countryCode]
    }
}

/** Get a beautiful output of country. (e.g. Thailand, Indonesia, New Zealand)
 *  @param {boolean} value translate this country if native version is existed.
 */
export function getCountryFullDisplay(translate = false) {
    let output = ''
    if (translate === true) {
        output = getDefaultCountry(appConfig.countryCode[appConfig.country])
    } else {
        output = appConfig.countryFullDisplay[appConfig.country]
    }
    return output
}

/** Get a lowercase with no-space output of country. (e.g. thailand, indonesia, newzealand) */
export function getCountryFull() {
    return appConfig.countryFull[appConfig.country]
}

export function detectIE() {
    var ua = window.navigator.userAgent

    var msie = ua.indexOf('MSIE ')
    if (msie > 0) {
        // IE 10 or older => return version number
        console.log(parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10))
        return true
    }

    var trident = ua.indexOf('Trident/')
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:')
        console.log(parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10))
        return true
    }

    var edge = ua.indexOf('Edge/')
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        console.log(parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10))
        return true
    }

    // other browser
    return false
}

export function arrayDiff(arr1, arr2) {
    return arr1.filter(x => !arr2.includes(x))
}

export const GetCardType = number => {
    // visa
    var re = new RegExp('^4')
    if (number.match(re) != null) return 'V'

    // Mastercard
    // Updated for Mastercard 2017 BINs expansion
    if (
        /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
            number
        )
    )
        return 'M'

    return ''
}
export function scrollToElement(id) {
    if ($('#' + id).offset()) {
        $('html, body').animate(
            { scrollTop: $('#' + id).offset().top - 100 },
            1000
        )
    }
}



/** **[Deprecated]** If you want to detect `Chrome`. Please call the method from `utils/Bowser` instead.
 * Anyway, this method still work.  */
export const isChrome = () => {
    // Chrome 1 - 71
    var isChrome =
        !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)
    return isChrome
}

export const isSafari = () => {
    var isSafari =
        navigator.vendor &&
        navigator.vendor.indexOf('Apple') > -1 &&
        navigator.userAgent &&
        navigator.userAgent.indexOf('CriOS') == -1 &&
        navigator.userAgent.indexOf('FxiOS') == -1
    return isSafari
}

export function parseDate(input, format) {
    format = format || 'yyyy-mm-dd' // default format
    var parts = input.match(/(\d+)/g),
        i = 0,
        fmt = {}
    // extract date-part indexes from the format
    format.replace(/(yyyy|dd|mm)/g, function (part) {
        fmt[part] = i++
    })

    return new Date(parts[fmt['yyyy']], parts[fmt['mm']] - 1, parts[fmt['dd']])
}

/** Special date convert for Safari browser. */
export function convertMMMtoJapan(input) {
    if (isNothing(input)) return null
    let result = input.toLowerCase()
    let reg = /jan/
    result = result.replace(reg, '1月')
    reg = /feb/
    result = result.replace(reg, '2月')
    reg = /mar/
    result = result.replace(reg, '3月')
    reg = /apr/
    result = result.replace(reg, '4月')
    reg = /may/
    result = result.replace(reg, '5月')
    reg = /jun/
    result = result.replace(reg, '6月')
    reg = /aug/
    result = result.replace(reg, '8月')
    reg = /sep/
    result = result.replace(reg, '9月')
    reg = /oct/
    result = result.replace(reg, '10月')
    reg = /nov/
    result = result.replace(reg, '11月')
    reg = /dec/
    result = result.replace(reg, '12月')
    return result
}

export function dynamicAlphabiticalSort(property) {
    var sortOrder = 1

    if (property[0] === '-') {
        sortOrder = -1
        property = property.substr(1)
    }

    return function (a, b) {
        if (sortOrder == -1) {
            return b[property].localeCompare(a[property])
        } else {
            return a[property].localeCompare(b[property])
        }
    }
}

export function str2bool(value) {
    if (value && typeof value === 'string') {
        if (value.toLowerCase() === 'true') return true
        if (value.toLowerCase() === 'false') return false
    }
    return value
}

export function removeItemFromStringArrayIfExists(array, element) {
    const index = array.indexOf(element)
    if (index !== -1) {
        array.splice(index, 1)
    } else {
        array.push(element)
    }
    return array
}

export const compareLocaleText = (text1, text2) => {
    let test = new Intl.Collator('fi-u-co-trad')
    return test.compare(text1, text2)
}

export const shuffle = array => {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        // And swap it with the current element.
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }

    return array
}

export function encrypt(value, secret) {
    // return CryptoJS.DES.encrypt(string,secret)
    return value
}

export function decrypt(value, secret) {
    // return CryptoJS.DES.decrypt(string,secret);
    return value
}

export function extractPhoneFromRawText(rawText) {
    let phone = rawText
    let phoneSpl = phone.split('(')
    phone = phoneSpl[0]
    if (phoneSpl.length > 1) {
        if (/\d/.test(phoneSpl[1])) {
            phone = phoneSpl[1]
            phone = phone.replace(/\)/g, '')
        }
    }
    phone = phone.replace(/\s/g, '').replace(/\-/g, '')

    return phone
}

export function randomString(
    length,
    upperCase = true,
    lowerCase = true,
    numeric = true
) {
    let s = '',
        r = ''
    if (upperCase) r += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (lowerCase) r += 'abcdefghijklmnopqrstuvwxyz'
    if (numeric) r += '0123456789'
    for (let i = 0; i < length; i++) {
        s += r.charAt(Math.floor(Math.random() * r.length))
    }
    return s
}

export function randomNumber(length, noZeroFirst = false) {
    let s = '',
        r = '0123456789',
        r0 = '123456789'
    for (let i = 0; i < length; i++) {
        if (noZeroFirst === true && i === 0) {
            s += r0.charAt(Math.floor(Math.random() * r0.length))
        } else {
            s += r.charAt(Math.floor(Math.random() * r.length))
        }
    }
    return s
}

export const formatNumber = (n, sep, decimals) => {
    sep = sep || '.'
    decimals = decimals || sessionStorage.getItem('decimal_controller') // Default to 2 decimals
    return parseFloat(n).toLocaleString().split(sep)[0]
}

export const formatDecimal = (n, sep, decimals) => {
    sep = sep || '.' // Default to period as decimal separator
    decimals = parseInt(sessionStorage.getItem('decimal_controller')) // Default to 2 decimals
    if (decimals > 2) {
        return (
            parseFloat(n).toLocaleString().split(sep)[0] +
            sep +
            parseFloat(n).toFixed(decimals).split(sep)[1]
        )
    } else {
        return parseFloat(n).toLocaleString().split(sep)[0]
    }
}

export const getSearchParams = k => {
    var p = {}
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (
        s,
        k,
        v
    ) {
        p[k] = v
    })
    return k ? p[k] : p
}

export var capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export const _retrieveObjectValues = obj => {
    return Object.keys(obj).map(e => {
        return obj[e]
    })
}

export const translateConfigList = config => {
    return config.map(each => {
        return {
            name: dictionary(each.name),
            value: each.value
        }
    })
}

export const isJSON = string => {
    try {
        JSON.parse(string)
    } catch (e) {
        return false
    }
    return true
}

export const localizeProvinceOutput = value => {
    if (isNothing(value)) return undefined
    if (isNothing(store.listProvincesEnglish)) return value
    let result = null
    result = store.listProvincesNative[value]
    logi(
        'Localize Province: \nValue =',
        value,
        '\nNT > EN:',
        store.listProvincesEnglish[value],
        '\nEN > NT:',
        store.listProvincesNative[value],
        '\nResult:',
        isNothing(result) ? value : result
    )
    if (isNothing(result)) {
        // maybe already correct, or empty, null, undefined
        if (
            isSomething(store.listProvincesEnglish[value]) ||
            isSomething(store.listProvincesNative[value])
        ) {
            // already correct case
            return value
        } else {
            //  empty, null, undefined case
            return undefined
        }
    } else {
        // convert case
        return result
    }
}

export const setLoadingLog = action(msg => {
    devTools.loadingLog = msg
})

export const getDecimalPointLength = value => {
    if (isNothing(value)) return 0
    const split = value.toString().split('.')
    if (split.length > 1) {
        return split[1].length
    } else {
        return 0
    }
}

export const normalizeZeros = (value, longestPoint) => {
    // ? NOTE: P'Oan requested 2 decimal points 15/JAN/2020 #1zh6hq
    const maxPointLength = 2 //parseInt(get(staticFooter, `footerGeneral.decimal_controller.${getFooterLanguageControl()}`, 0))
    if (
        longestPoint > maxPointLength ||
        (longestPoint > 0 && longestPoint < 2)
    ) {
        longestPoint = maxPointLength
    }

    value = numeralFormat(value)

    const dl = getDecimalPointLength(value)
    if (dl > maxPointLength) {
        return parseFloat(value).toFixed(maxPointLength)
    }
    if (dl >= longestPoint) {
        return value
    } else {
        if (dl === 0) value += '.'
        for (let i = dl; i < longestPoint; i++) value += '0'
        return value
    }
}

// get link
export const getLinkURL = btnLink => {
    const checkLink = btnLink.indexOf('https')
    if (checkLink === -1) {
        return { link: btnLink, status: true }
    } else {
        return { link: btnLink, status: false }
    }
}

export const goBacktoTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

export const convertMonthNumToString = date => {
    switch (date) {
        case 1:
            return 'Jan'
        case 2:
            return 'Feb'
        case 3:
            return 'Mar'
        case 4:
            return 'Apr'
        case 5:
            return 'May'
        case 6:
            return 'Jun'
        case 7:
            return 'Jul'
        case 8:
            return 'Aug'
        case 9:
            return 'Sep'
        case 10:
            return 'Oct'
        case 11:
            return 'Nov'
        case 12:
            return 'Dec'
    }
}

export const getFormatLongDate = d => {
    return (
        new Date(d).getDate() +
        ' ' +
        convertMonthNumToString(new Date(d).getMonth()) +
        ' ' +
        new Date(d).getFullYear()
    )
}

export const monthDiff = (dateFrom, dateTo) => {
    return (
        dateTo.getMonth() -
        dateFrom.getMonth() +
        12 * (dateTo.getFullYear() - dateFrom.getFullYear())
    )
}

export var marketZone = COUNTRY_CODE || ''
