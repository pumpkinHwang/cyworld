import Alert from 'react-s-alert'
import {
    shopStore,
    store,
    checkOutStore,
    staticFooter
} from '../stores/MainStore'
import {  appConfig } from './config'
import {
    numeralFormat,
    isMobile,
    getDevice,
    getCountryCode,
    dictionary,
    integerFormat,
    getAPICountryCode,
    getProductCountryCode3
} from './GlobalHelpers'

import $ from 'jquery'
import Raven from '../services/Raven'
import { get } from 'lodash'

export var COUNTRY_CODE = getCountryCode()
export function getCurrentDomain() {
    return (
        window.location.protocol +
        '//' +
        window.location.hostname +
        (window.location.port ? ':' + window.location.port : '')
    )
}

//https://member-kr.unicity.com/unifoapi > https://member-kr.unicity.com/unifoapi 변경

//https://member-calls.unicity.com/ALL/ALL_Unishop_Geolocation.asp? > https://member-kr.unicity.com/unifoapi 변경

//https://member-kr.unicity.com/unifoapi
//https://member-kr.unicity.com/dev/unifoapi
export function getAPIDomain(forcedLive = false) {
    const localAPI = 'http://localhost:8888/api/unishop'
    const liveAPI = 'https://member-kr.unicity.com/unifoapi'
    const devAPI = 'https://member-kr.unicity.com/unifoapi'
    // const devAPI = 'http://member-kr.unicity.com/unifoapi'

    if (forcedLive) return liveAPI

    if (getCurrentDomain().indexOf('localhost') !== -1) {
        return devAPI
    } else if (getCurrentDomain().indexOf('ushop.') !== -1) {
        return liveAPI
    } else if (getCurrentDomain().indexOf('ushop-kr.') !== -1) {
        return liveAPI
    } else if (getCurrentDomain().indexOf('ushop-test.') !== -1) {
        return liveAPI
    } else if (getCurrentDomain().indexOf('ushop-uat.') !== -1) {
        return liveAPI
    } else if (getCurrentDomain().indexOf('ushop2020.') !== -1) {
        return liveAPI
    } else if (getCurrentDomain().indexOf('ushop2021.') !== -1) {
        return liveAPI
    } else if (getCurrentDomain().indexOf('ushop-dev') !== -1) {
        // for ushop-dev0-9
        return liveAPI
    } else if (getCurrentDomain().indexOf('ushop-ph-dev.unicity.com') !== -1) {
        return liveAPI
    } else {
        if (getCurrentDomain().indexOf('ngrok') !== 1) {
            return devAPI
        } else {
            return liveAPI
        }
    }
}

export function getOcbcExpressURL() {
    const staging =
        'https://testepayment.ocbc.com/BPG/admin/payment/PaymentInterfaceSimulator.jsp'
    const production =
        'https://epayment.ocbc.com/BPG/admin/payment/PaymentInterface.jsp'
    if (getCurrentDomain().indexOf('localhost') !== -1) {
        return staging
    } else if (getCurrentDomain().indexOf('ushop.unicity.com') != -1) {
        return production
    } else if (getCurrentDomain().indexOf('ushop-dev.unicity.com') != -1) {
        return production
    } else if (getCurrentDomain().indexOf('ushop-ph-dev.unicity.com') != -1) {
        return production
    } else {
        return staging
    }
}

export var apiURL = {
    shopping: {
        validate_cart_api:
            getAPICountryCode() === 'ID'
                ? getAPIDomain() +
                  '/v1/' +
                  getAPICountryCode() +
                  '/validate_cart/payment/ushop'
                : getAPIDomain() +
                  '/v1/' +
                  getAPICountryCode() +
                  '/validate_cart/shopping/payment',

        success_url:
            getCurrentDomain() +
            '/' +
            appConfig.country +
            '/checkout/payment-response/success',
        error_url:
            getCurrentDomain() +
            '/' +
            appConfig.country +
            '/checkout/payment-response/failed',
        RETURN_URL:
            getAPIDomain() +
            '/v1/' +
            getAPICountryCode() +
            '/payment/response/shopping',
        convert_api:
            getAPIDomain() +
            '/v1/' +
            getAPICountryCode() +
            '/payment/request/convert/ocbc',
        log_payment_api:
            getAPIDomain() +
            '/v1/' +
            getAPICountryCode() +
            '/payment/request/log',
        getautologin:
            getAPIDomain() +
            '/v1/' +
            getAPICountryCode() +
            '/common/getautologin',
        checkstock_api:
            getAPIDomain() +
            '/v1/' +
            getAPICountryCode() +
            '/validate_cart/stock/ushop',
        checkOrderId:
            getAPIDomain() +
            '/v1/' +
            getAPICountryCode() +
            '/payment/checkOrderId',
        orderDetail:
            getAPIDomain() +
            '/v1/' +
            getAPICountryCode() +
            '/payment/request/paydetail',
        checkOrderIdWithInquery:
            getAPIDomain() +
            '/v1/' +
            getAPICountryCode() +
            '/payment/checkOrderIdWithInquery',
        share_cart_cancel_url:
            getCurrentDomain() +
            '/' +
            appConfig.country +
            '/shopprofile/shopcart/failed',
        share_cart_error_url:
            getCurrentDomain() +
            '/' +
            appConfig.country +
            '/shopprofile/shopcart/failed'
    },
    enroll: {
        validate_cart_api:
            getAPIDomain() +
            '/v1/' +
            getAPICountryCode() +
            '/validate_cart/enroll/payment',
        success_url:
            getCurrentDomain() +
            '/' +
            appConfig.country +
            '/enroll/payment-response/success',
        error_url:
            getCurrentDomain() +
            '/' +
            appConfig.country +
            '/enroll/payment-response/failed',
        share_enorll_cart_cancel_url:
            getCurrentDomain() +
            '/' +
            appConfig.country +
            '/shopprofile/enroll/failed',
        share_enroll_cart_error_url:
            getCurrentDomain() +
            '/' +
            appConfig.country +
            '/shopprofile/enroll/failed',
        RETURN_URL:
            getAPIDomain() +
            '/v1/' +
            getAPICountryCode() +
            '/payment/response/enroll',
        RESPONSE_TYPE: 'HTTPS'
    },
    cart: {
        add: getAPIDomain() + '/v1/' + getAPICountryCode() + '/cart_info/add/',
        get: getAPIDomain() + '/v1/' + getAPICountryCode() + '/cart_info/get'
    },
    referralCode: {
        get: `${getAPIDomain()}/v1/global/referralcode/code`,
        validate: `${getAPIDomain()}/v1/global/referralcode/ba`
    },
    shopprofile: {
        list:
            'https://member-kr.unicity.com/unifoapi/v1/common/global/cart_profile/list',
        add:
            'https://member-kr.unicity.com/unifoapi/v1/common/global/cart_profile/add',
        get:
            'https://member-kr.unicity.com/unifoapi/v1/common/global/cart_profile/get',
        delete:
            'https://member-kr.unicity.com/unifoapi/v1/common/global/cart_profile/delete',
        update:
            'https://member-kr.unicity.com/unifoapi/v1/common/global/cart_profile/update',
        checkDuplicate:
            'https://member-kr.unicity.com/unifoapi/v1/common/global/cart_profile/check/profilename',
        downlineValidator:
            'https://member-kr.unicity.com/unifoapi/v1/' +
            getAPICountryCode() +
            '/common/share_a_cart/downline/validator'
    },
    product: {
        getProducts:
            'https://member-kr.unicity.com/unifoapi/v1/global/getproducts?country_code=' +
            getProductCountryCode3() +
            '&secret=yes',
        newGetProducts:
            'https://member-kr.unicity.com/unifoapi/v1/global/getproducts?country_code=' +
            getProductCountryCode3(),
        getSuggesstion:
            'https://member-kr.unicity.com/unifoapi/v1/global/getSuggestProducts/{id}',
        getProductsNoStarterKit: `https://member-kr.unicity.com/unifoapi/v1/global/getproducts?country_code=${getProductCountryCode3()}&secret=yes&noStarterKit=1`
        // getProducts: getAPIDomain() + '/v1/global/getproducts?country_code=' + getProductCountryCode3() + '&secret=yes',
        // newGetProducts: getAPIDomain() + '/v1/global/getproducts?country_code=' + getProductCountryCode3(),
    },
    order: {
        secureinfo: getAPIDomain() + '/v1/common/global/SecureOrderDetail'
    },
    ocbcExpress: {
        url: getOcbcExpressURL()
    },
    directPayment: {
        url:
            getAPIDomain() +
            '/v1/' +
            getAPICountryCode() +
            '/payment/request/direct'
    },
    JP: {
        paymentRequestDirect:
            getAPIDomain() +
            '/v1/JP/payment/request/direct?not_translate_error=1',
        getautoshipcart: getAPIDomain() + '/v1/JP/payment/getautoshipcart'
    },
    PH: {
        convert: getAPIDomain() + '/v1/PH/payment/request/convert',
        paymentRequestDirect: getAPIDomain() + '/v1/PH/payment/request/direct',
        CBSWebResponseShopSuccess:
            getCurrentDomain() +
            '/' +
            appConfig.country +
            '/checkout/payment-response/success',
        CBSWebResponseShopFailed:
            getCurrentDomain() +
            '/' +
            appConfig.country +
            '/checkout/payment-response/failed',
        CBSWebResponseEnrollSuccess:
            getCurrentDomain() +
            '/' +
            appConfig.country +
            '/enroll/payment-response/success',
        CBSWebResponseEnrollFailed:
            getCurrentDomain() +
            '/' +
            appConfig.country +
            '/enroll/payment-response/failed',
        SIGNED_DATE_URL: getAPIDomain() + '/v1/PH/common/gettimeserver'
    },
    TH: {
        BBLWebResponseShopSuccess:
            getCurrentDomain() +
            '/' +
            appConfig.country +
            '/checkout/payment-response/success',
        BBLWebResponseShopFailed:
            getCurrentDomain() +
            '/' +
            appConfig.country +
            '/checkout/payment-response/failed',
        BBLWebResponseShopCancel:
            getCurrentDomain() +
            '/' +
            appConfig.country +
            '/checkout/payment-response/failed',
        BBLWebResponseEnrollSuccess:
            getCurrentDomain() +
            '/' +
            appConfig.country +
            '/enroll/payment-response/success',
        BBLWebResponseEnrollFailed:
            getCurrentDomain() +
            '/' +
            appConfig.country +
            '/enroll/payment-response/failed',
        BBLWebResponseEnrollCancel:
            getCurrentDomain() +
            '/' +
            appConfig.country +
            '/enroll/payment-response/failed',
        BBLWebResponseQEnrollFailed:
            getCurrentDomain() + '/' + appConfig.country + '/quickenroll/failed'
    },

    HK: {
        PAYDWebResponseShopSuccess:
            getCurrentDomain() +
            '/' +
            appConfig.country +
            '/checkout/payment-response/success',
        PAYDWebResponseShopFailed:
            getCurrentDomain() +
            '/' +
            appConfig.country +
            '/checkout/payment-response/failed',
        PAYDWebResponseShopCancel:
            getCurrentDomain() +
            '/' +
            appConfig.country +
            '/checkout/payment-response/failed',
        PAYDWebResponseEnrollSuccess:
            getCurrentDomain() +
            '/' +
            appConfig.country +
            '/enroll/payment-response/success',
        PAYDWebResponseEnrollFailed:
            getCurrentDomain() +
            '/' +
            appConfig.country +
            '/enroll/payment-response/failed',
        PAYDWebResponseEnrollCancel:
            getCurrentDomain() +
            '/' +
            appConfig.country +
            '/enroll/payment-response/failed',
        PAYDWebResponseQEnrollFailed:
            getCurrentDomain() + '/' + appConfig.country + '/quickenroll/failed'
    },

    SG: {
        convertUnionPay:
            getAPIDomain() + '/v1/sg/payment/request/ConvertUnionPay',
        webResponseUnionPay:
            getAPIDomain() + '/v1/sg/payment/webresponse/UnionPay',
        successUrlUnionPay:
            getCurrentDomain() +
            '/' +
            appConfig.country +
            '/checkout/payment-response/cup/success',
        errorUrlUnionPay:
            getCurrentDomain() +
            '/' +
            appConfig.country +
            '/checkout/payment-response/cup/failed',
        inquiryCreateOrderUnionPay:
            getAPIDomain() + '/v1/sg/payment/inquiryCreateOrder/unionpay'
    },
    TW: {
        Create_CheckSum:
            getAPIDomain() + '/v1/TW/payment/request/CreateCheckSum'
    },
    PhoneVerify: {
        CheckVerified: getAPIDomain() + '/v1/common/global/phone/CheckVerified',
        RequestOTP: getAPIDomain() + '/v1/common/global/phone/RequestOTP',
        ConfirmOTP: getAPIDomain() + '/v1/common/global/phone/ConfirmOTP'
    },
    VN: {
        PayDomestic: getAPIDomain() + '/v1/VN/payment/request/domestic',
        PayInter: getAPIDomain() + '/v1/VN/payment/request/international',
        OnePayPostBack: getAPIDomain() + '/v1/VN/payment/postback/OnePay'
    },
    ID: {
        paymentRequestRedirect:
            getAPIDomain() + '/v1/ID/payment/request/redirect'
    }
}

export function updateLocalStock(productSource, newStocks) {
    try {
        // console.log("productSource", newStocks, productSource)
        productSource.map((v, k) => {
            newStocks.map((new_stock, item_code) => {
                if (v.item_code == item_code) {
                    // console.log("new stock", v.item_code, v.qty, item_code, new_stock)
                    v.stock = new_stock
                }
            })
        })
    } catch (e) {}
}

export function phoneCheckVerified(
    phone,
    country,
    ba_country,
    identity,
    callback
) {
    let ba_id = getLoginUserId()
    if (identity) ba_id = identity

    if (ba_id) {
        let data = {
            ba_id: ba_id,
            phone: phone,
            country: country,
            ba_country: ba_country
        }
        $.post(apiURL.PhoneVerify.CheckVerified, JSON.stringify(data))
            .done(function (result) {
                callback('success', result)
            })
            .fail(function (error) {
                callback('error', error)
            })
    } else {
        callback('error', 'ba_id not found.')
    }
}

export function phoneRequestOTP(phone, source, country, identity, callback) {
    let ba_id = getLoginUserId()
    if (identity) ba_id = identity

    if (ba_id) {
        let data = {
            ba_id: ba_id,
            phone: phone,
            source: source,
            country: country
        }
        $.post(apiURL.PhoneVerify.RequestOTP, JSON.stringify(data))
            .done(function (result) {
                callback('success', result)
            })
            .fail(function (error) {
                callback('error', error)
            })
    } else {
        callback('error', 'ba_id not found.')
    }
}

export function phoneConfirmOTP(
    phone,
    country,
    identity,
    confirm_otp,
    callback
) {
    let ba_id = getLoginUserId()
    if (identity) ba_id = identity

    if (ba_id) {
        let data = {
            ba_id: ba_id,
            phone: phone,
            confirm_otp: confirm_otp,
            country: country
        }
        $.post(apiURL.PhoneVerify.ConfirmOTP, JSON.stringify(data))
            .done(function (result) {
                callback('success', result)
            })
            .fail(function (error) {
                callback('error', error)
            })
    } else {
        callback('error', 'ba_id not found.')
    }
}

export function getPickupMessage(reference_id, callback) {
    let data = {
        reference_id: reference_id
    }
    $.post(apiURL.order.secureinfo, JSON.stringify(data))
        .done(function (result) {
            callback('success', result)
        })
        .fail(function (error) {
            callback('error', error)
        })
}

export function getLoginUserId() {
    let user = getUser()
    let userId = ''
    try {
        userId = user.id.unicity
    } catch (e) {
        // console.log(e)
    }
    return userId
}



export function updateCartInfo(user_id, cart, callback) {
    Raven.addCartInfo(user_id, cart).then(response => {
        if (callback) {
            callback(response)
        }
    })
    /* .catch(response => {

    // TODO: investigate this one, it's never return "done".
    $.post(apiURL.cart.add, JSON.stringify(data))
        .done(function (result) {
            if (callback) {
                callback(result)
            }
        })
        .fail(function (error) {
            //console.log(error)
        });
    }) */
}



export function getUser() {
    let user = sessionStorage.getItem('customerData')
    user = JSON.parse(user)
    return user
}

export function getShowPV() {
    return false
}

export function getUserCountryCode() {
    let user = getUser()
    if (user !== null) {
        return user.mainAddress.country
    } else {
        return ''
    }
}

export function getHydraNotesQE(referralValue, fromLink) {
    // “ushop|mobileW|iphone|referral_108357166|UNISHOP-WEB-SG_322”
    // if(store.isWebview){ //deviceDetails
    //     //it's webview
    //     let referral = referralValue ? 'ushop_quickenroll_' + referralValue : ''
    //     let notes = `${'ushop'}|${'mobileApp'}|${store.deviceDetails.os} ${store.deviceDetails.systemVersion}|${store.deviceDetails.model}|${referral}|`
    //     return notes
    // }
    //it's browser
    var linkFrom = ''
    if (fromLink !== null) {
        linkFrom = 'qe_enroll_direct_'
    } else {
        linkFrom = 'qe_enroll_refer_'
    }

    let project = 'ushop'
    let site = isMobile() ? 'mobileW' : 'web'
    let device = getDevice()
    let referral = referralValue ? linkFrom + referralValue : ''
    let notes = `${project}|${site}|${device}|${referral}|`
    return notes
}

export function getHydraNotesQS(referralValue, fromLink) {
    // “ushop|mobileW|iphone|referral_108357166|UNISHOP-WEB-SG_322”
    // if(store.isWebview){ //deviceDetails
    //     //it's webview
    //     let referral = referralValue ? 'ushop_repurchase_' + referralValue : ''
    //     let notes = `${'ushop'}|${'mobileApp'}|${store.deviceDetails.os} ${store.deviceDetails.systemVersion}|${store.deviceDetails.model}|${referral}|`
    //     return notes
    // }
    //it's browser

    var linkFrom = ''
    if (fromLink !== null) {
        linkFrom = 'qe_repur_direct_'
    } else {
        linkFrom = 'qe_repur_refer_'
    }

    let project = 'ushop'
    let site = isMobile() ? 'mobileW' : 'web'
    let device = getDevice()
    let referral = referralValue ? linkFrom + referralValue : ''
    let notes = `${project}|${site}|${device}|${referral}|`
    return notes
}




export function isShoppingLogin() {
    let checkOutStoreLocal = localStorage.getItem('checkOutStore')
    let user = sessionStorage.getItem('customerData')
    if (user !== null) {
        return true
    } else {
        return false
    }
}

export function getShippingKey() {
    let shipping = ''
    if (checkOutStore.shipping === '2') {
        shipping = 'delivery'
    } else if (checkOutStore.shipping === '3') {
        shipping = 'pickUp'
    } else if (checkOutStore.shipping === '4') {
        shipping = 'aramex'
    } else if (checkOutStore.shipping === '5') {
        shipping = 'pickUpHoChiMinh'
    } else if (checkOutStore.shipping === '6') {
        shipping = 'motorDelivery'
    } else if (checkOutStore.shipping === '7') {
        shipping = 'deliverySBY'
    } else if (checkOutStore.shipping === '8') {
        shipping = 'pickUpSBY'
    } else if (checkOutStore.shipping === '9') {
        shipping = 'motorDeliverySBY'
    } else if (checkOutStore.shipping === '32') {
        shipping = 'pickUpTaguig'
    }
    return shipping
}

export function getPHShippingKey() {
    let shipping = ''

    if (
        checkOutStore.shipping === '2' ||
        checkOutStore.shipping === 'delivery'
    ) {
        shipping = 'delivery'
    }
    if (checkOutStore.shipping === '3') {
        shipping = 'pickUpOrtigas'
    }
    if (
        checkOutStore.shipping === '32' ||
        checkOutStore.shipping === 'pickUpTaguig'
    ) {
        shipping = 'pickup-taguig'
    }
    if (checkOutStore.shipping === '33') {
        shipping = 'sameDay'
    }
    if (checkOutStore.shipping === '34') {
        shipping = 'halfday'
    }

    return shipping
}

export function getShippingName() {
    let infoShipment = ''
    if (checkOutStore.shipping === '2') {
        infoShipment = 'Delivery'
    } else if (checkOutStore.shipping === '3') {
        infoShipment = 'Pick Up'
    } else if (checkOutStore.shipping === '4') {
        infoShipment = 'Aramex'
    } else if (checkOutStore.shipping === '5') {
        infoShipment = 'Pick Up'
    }

    return infoShipment
}
export function getShippingCode(infoShipment) {
    let shipping = ''
    if (infoShipment === 'delivery') {
        shipping = '2'
    } else if (infoShipment === 'pickUp') {
        shipping = '3'
    } else if (infoShipment === 'aramex') {
        shipping = '4'
    }

    return shipping
}

export function getPHShippingCode(infoShipment) {
    let shipping = ''
    if (infoShipment === 'delivery') {
        shipping = '2'
    } else if (infoShipment === 'pickUp') {
        shipping = '3'
    } else if (infoShipment === 'aramex') {
        shipping = '4'
    }

    return shipping
}

export function getPHShippingName() {
    let infoShipment = ''
    if (checkOutStore.shipping === '2') {
        infoShipment = 'Delivery'
    }
    if (checkOutStore.shipping === '3') {
        infoShipment = 'Pick Up - Ortigas'
    }
    if (checkOutStore.shipping === '4') {
        infoShipment = 'Pick Up - Taguig'
    }
    if (checkOutStore.shipping === '5') {
        infoShipment = 'Sameday Delivery '
    }
    if (checkOutStore.shipping === '6') {
        infoShipment = '180 Minute Delivery'
    }
    return infoShipment
}


export function getShoppingAramexFormData() {
    let sns =
        (getShoppingAramexAddress().sns1 || '') +
        (getShoppingAramexAddress().sns2 || '')
    let data = {
        language: 'English',
        source: getHydraNotes(''),
        firstName: getShoppingAramexAddress().firstNameEn || '',
        lastName: getShoppingAramexAddress().lastNameEn || '',
        address1: getShoppingAramexAddress().address1,
        address2: getShoppingAramexAddress().address2,
        city: getShoppingAramexAddress().city,
        zip: getShoppingAramexAddress().zip,
        country: getShoppingAramexAddress().country,
        email: getShoppingAramexAddress().email || '',
        mobilePhone: getShoppingAramexAddress().mobilePhone || '',
        sns: sns,
        comment: '',
        period: checkOutStore.commissionMonth
    }

    return data
}

export function getShoppingFormData() {
    if (checkOutStore.shipping === '2') {
        return getShoppingDeliverFormData()
    }
    if (checkOutStore.shipping === '3') {
        return getShoppingPickupFormData()
    }
    if (checkOutStore.shipping === '4') {
        return getShoppingAramexFormData()
    }
    if (checkOutStore.shipping === '6') {
        return getShoppingMotorFormData()
    }
    if (checkOutStore.shipping === '7') {
        return getShoppingDeliverFormData()
    }
    if (checkOutStore.shipping === '8') {
        return getShoppingPickupFormData()
    }
}



export function getShoppingIDMotorAddress() {
    try {
        let fullName = ''
        if (checkOutStore.billingAddress.motorDelivery.firstNameEn) {
            fullName = checkOutStore.billingAddress.motorDelivery.firstNameEn
        }
        if (checkOutStore.billingAddress.motorDelivery.lastNameEn) {
            fullName +=
                ' ' + checkOutStore.billingAddress.motorDelivery.lastNameEn
        }
        return {
            fullName: fullName,
            firstNameEn: checkOutStore.billingAddress.motorDelivery.firstNameEn,
            lastNameEn: checkOutStore.billingAddress.motorDelivery.lastNameEn,
            address1: checkOutStore.billingAddress.motorDelivery.address1,
            address2: checkOutStore.billingAddress.motorDelivery.address2,
            zip: checkOutStore.billingAddress.motorDelivery.zip,
            city: checkOutStore.billingAddress.motorDelivery.city,
            country: 'ID',
            email: checkOutStore.billingAddress.motorDelivery.email,
            mobilePhone: checkOutStore.billingAddress.motorDelivery.mobilePhone,
            state: '',
            comment: checkOutStore.billingAddress.motorDelivery.comment || ''
        }
    } catch (e) {
        return {
            fullName: '',
            firstNameEn: '',
            lastNameEn: '',
            address1: checkOutStore.billingAddress.motorDelivery.address1,
            address2: checkOutStore.billingAddress.motorDelivery.address2,
            zip: checkOutStore.billingAddress.motorDelivery.zip,
            city: checkOutStore.billingAddress.motorDelivery.city,
            country: 'ID',
            email: '',
            mobilePhone: '',
            state: '',
            comment: ''
        }
    }
}

export function getPHShoppingFormData() {
    console.log(checkOutStore.shipping)

    if (checkOutStore.shipping === '2') {
        return getPHShoppingDeliverFormData()
    }

    if (checkOutStore.shipping === '3') {
        // debugger;

        return getShoppingPHPickupFormData()
    }

    if (checkOutStore.shipping === '4') {
        return getShoppingPHPickupFormData()
    }
    if (checkOutStore.shipping === '5') {
        return getPHShoppingDeliverFormData()
    }
    if (checkOutStore.shipping === '6') {
        return getPHShoppingDeliverFormData()
    }

    if (checkOutStore.shipping === '7') {
        return getPHShoppingDeliverFormData()
    }

    if (checkOutStore.shipping === '8') {
        // debugger;

        return getShoppingPHPickupFormData()
    }
}

export function renderProvinceList() {
    let topArr = [
        { value: 'none', name: '-- ' + store.language.choose_province + ' --' }
    ]
    let list = []
    let provinces = JSON.parse(localStorage.getItem('provinces'))
    let topList = ['Bangkok']
    let lang =
        store.language.language === 'TH' ? 'PROVINCE_NAME' : 'PROVINCE_NAME_ENG'

    provinces.map((v, k) => {
        if (topList.indexOf(v['PROVINCE_NAME_ENG'].trim()) < 0) {
            list.push({ value: v[lang].trim(), name: v[lang].trim() })
        } else {
            topArr.unshift({ value: v[lang].trim(), name: v[lang].trim() })
        }
    })

    list.sort(SortByName)

    topArr.map(v => {
        list.unshift(v)
    })

    return list
}

export function renderHKProvinceList() {
    let topArr = [
        {
            value: 'none',
            name: '-- ' + 'Choose ' + store.language.district + ' --'
        }
    ]
    let list = []
    let provinces = JSON.parse(localStorage.getItem('provinces-hk'))
    let topList = ['Central & Western District']
    let lang =
        store.language.language === 'HK' ? 'PROVINCE_NAME' : 'PROVINCE_NAME_ENG'

    provinces.map((v, k) => {
        if (topList.indexOf(v['PROVINCE_NAME_ENG'].trim()) < 0) {
            list.push({ value: v[lang].trim(), name: v[lang].trim() })
        } else {
            topArr.unshift({ value: v[lang].trim(), name: v[lang].trim() })
        }
    })

    list.sort(SortByName)

    topArr.map(v => {
        list.unshift(v)
    })

    return list
}

export function getSelectedProvince(currProvince) {
    // let currProvince = province;
    let province = ''
    let lang = ''

    if (getCountryCode() === 'TH') {
        province = JSON.parse(localStorage.getItem('provinces'))
        lang =
            store.language.language === 'TH'
                ? 'PROVINCE_NAME'
                : 'PROVINCE_NAME_ENG'
    }

    if (getCountryCode() === 'HK') {
        province = JSON.parse(localStorage.getItem('provinces-hk'))
        lang =
            store.language.language === 'HK'
                ? 'PROVINCE_NAME'
                : 'PROVINCE_NAME_ENG'
    }

    let selectedProvince = ''
    let code = ''

    if (!province) return
    province.map((v, k) => {
        if (v.PROVINCE_NAME.trim() === currProvince) {
            code = v.PROVINCE_CODE
        } else if (v.PROVINCE_NAME_ENG === currProvince) {
            code = v.PROVINCE_CODE
        }
        if (v.PROVINCE_CODE === code) {
            selectedProvince = v[lang].trim()
        }
    })
    if (selectedProvince === '') {
        selectedProvince = 'none'
    }
    return selectedProvince
}

export function renderBanknameList() {
    let topArr = [
        {
            value: 'none',
            name: '-- ' + store.language.choose_bankname + ' --',
            code: '',
            bankcode: ''
        }
    ]
    let list = []
    let banknames = JSON.parse(localStorage.getItem('banknames'))
    let topList = ['']
    let lang = store.language.language === 'TH' ? 'BANK_NAME' : 'BANK_NAME_ENG'

    banknames.map((v, k) => {
        if (topList.indexOf(v['BANK_NAME_ENG'].trim()) < 0) {
            list.push({
                value: v[lang].trim(),
                name: v[lang].trim(),
                code: v.BANK_CODE,
                bankcode: v.BANK_CODE_SHORT
            })
        } else {
            topArr.unshift({
                value: v[lang].trim(),
                name: v[lang].trim(),
                code: v.BANK_CODE,
                bankcode: v.BANK_CODE_SHORT
            })
        }
    })

    list.sort(SortByName)

    topArr.map(v => {
        list.unshift(v)
    })

    return list
}
export function getSelectedBankname(currBankname) {
    let bankname = JSON.parse(localStorage.getItem('banknames'))
    let lang = store.language.language === 'TH' ? 'BANK_NAME' : 'BANK_NAME_ENG'
    let selectedBankname = ''
    let code = ''

    bankname.map((v, k) => {
        if (v.BANK_NAME.trim() === currBankname) {
            code = v.BANK_CODE
        } else if (v.BANK_NAME_ENG === currBankname) {
            code = v.BANK_CODE
        }
        if (v.BANK_CODE === code) {
            selectedBankname = v[lang].trim()
        }
    })
    if (selectedBankname === '') {
        selectedBankname = 'none'
    }
    return selectedBankname
}

export function SortByName(a, b) {
    var aValue = a.value.toLowerCase()
    var bValue = b.value.toLowerCase()
    return aValue.localeCompare(bValue)
}

export function getDeliveryFee(calculated) {
    return get(calculated, '[0].terms.freight.amount', '')
}

export function getOrderTermsByKey(orderTerms, key) {
    let result = ''

    try {
        orderTerms.items.map((v, k) => {
            if (key === 'total') {
                result = v.terms.total
            }
            if (key === 'pv') {
                result = v.terms.pv
            }
            if (key === 'weight') {
                result = v.terms.weight
            }
            if (key === 'currency') {
                result = v.currency
            }
            if (key === 'freight_amount') {
                result = v.terms.freight.amount
            }
        })
    } catch (e) {}

    return result
}
export const motordelivery = {
    'Jakarta Pusat': {
        Gambir: [
            'Gambir',
            'Kebon Kalapa',
            'Petojo Utara',
            'Duri Pulo',
            'Cideng',
            'Petojo Selatan'
        ],
        'Tanah Abang': [
            'Bendungan Hilir',
            'Karet Tengsin',
            'Kebon Melati',
            'Kebon Kacang',
            'Kampung Bali',
            'Petamburan',
            'Gelora'
        ],
        Menteng: [
            'Menteng',
            'Pegangsaan',
            'Cikini',
            'Kebon Sirih',
            'Gondangdia'
        ],
        Senen: ['Senen', 'Kwitang', 'Kenari', 'paseban', 'Kramat', 'Bungur'],
        'Cempaka Putih': [
            'Cempaka Putih Timur',
            'Cempaka Putih Barat',
            'Rawa Sari'
        ],
        'Johar Baru': ['Galur', 'tanah Tinggi', 'Kampung Rawa', 'Johar Baru'],
        Kemayoran: [
            'Gunung Sahari Selatan',
            'kemayoran',
            'Kebon Kosong',
            'Cempaka Baru',
            'Harapan Mulia',
            'Sumur Batu',
            'Serdang',
            'Utan Panjang'
        ],
        'Sawah Besar': [
            'Pasar Baru',
            'Gunung Sahari Utara',
            'Mangga Dua Selatan',
            'Karang Anyar',
            'Kartini'
        ]
    },
    'Jakarta Barat': {
        'Taman Sari': [
            'Pinangsia',
            'Glodok',
            'Keagungan',
            'Krukut',
            'Taman Sari',
            'Mahpar',
            'Tangki',
            'Mangga Besar'
        ],
        Tambora: [
            'Tanah Sereal',
            'Tambora',
            'Roa Malaka',
            'Pekojan',
            'Jembatan Lima',
            'Kerendang',
            'Duri Selatan',
            'Duri Utara',
            'Kali Anyar',
            'Jembatan Besi',
            'Angke'
        ],
        'Pal Merah': [
            'Slipi',
            'Kota Bambu Selatan',
            'Kota Bambu Utara',
            'Jati Pulo',
            'Kemanggisan',
            'Pal Merah'
        ],
        'Grogol Petamburan': [
            'Tomang',
            'Grogol',
            'Jelambar',
            'Jelambar Baru',
            'Wijaya Kusuma',
            'Tanjung Duren Selatan',
            'Tanjung Duren Utara'
        ],
        'Kebon Jeruk': [
            'Duri Kelapa',
            'Kedoya Selatan',
            'Kedoya Utara',
            'Kebon Jeruk',
            'Sukabumi Utara',
            'Kelapa Dua',
            'Sukabumi Selatan'
        ],
        Kembangan: [
            'Kembangan Selatan',
            'Kembangan Utara',
            'Meruya Utara',
            'Srengseng',
            'Joglo',
            'Meruya Selatan'
        ],
        Cengkareng: [
            'Kedaung Kali Angke',
            'Kapuk',
            'Cengkareng Barat',
            'Cengkareng Timur',
            'Rawa Buaya',
            'Duri Kosambi'
        ],
        'Kali Deres': [
            'Kamal',
            'Tegal Alur',
            'Pegadungan',
            'Kali Deres',
            'Semanan'
        ]
    },
    'Jakarta Selatan': {
        'Kebayoran Baru': [
            'Selong',
            'Gunung',
            'Kramat Pela',
            'Gandaria Utara',
            'Cipete Utara',
            'Melawai',
            'Pulo',
            'Petogogan',
            'Rawa Barat',
            'Senayan'
        ],
        'Kebayoran Lama': [
            'Grogol Utara',
            'Grogol Selatan',
            'Cipulir',
            'Kebayoran Lama Selatan',
            'Kebayoran Lama Utara',
            'Pondok Pinang'
        ],
        'Kec. Pesanggrahan': [
            'Ulujami',
            'Petukangan Utara',
            'Petukangan Selatan',
            'Pesanggrahan',
            'Bintaro'
        ],
        Cilandak: [
            'Cipete Selatan',
            'Gandaria Selatan',
            'Cilandak Barat',
            'Lebak Bulus',
            'Pondok Labu'
        ],
        'Pasar Minggu': [
            'Pejaten Barat',
            'Pejaten Selatan',
            'Kebagusan',
            'Pasar Minggu',
            'Jati Padang',
            'Ragunan',
            'Cilandak Timur'
        ],
        Jagakarsa: [
            'Tanjung Barat',
            'Lenteng Agung',
            'Jagakarsa',
            'Ciganjur',
            'Cipendak',
            'Srengseng Sawah'
        ],
        'Mampang Prapatan': [
            'Kuningan Barat',
            'Kuningan Timur',
            'Bangka',
            'Pancoran',
            'Mampang Prapatan',
            'Tegal Parang'
        ],
        Pancoran: [
            'KaliBata',
            'Rawa jati',
            'Duren Tiga',
            'Cikoko',
            'Pengadegan'
        ],
        Tebet: [
            'Tebet Barat',
            'Tebet Timur',
            'Kebon Baru',
            'Manggarai',
            'Manggarai selatan',
            'Menteng Dalam'
        ],
        'Setia Budi': [
            'Setia Budi',
            'Karet',
            'Karet semanggi',
            'Karet Kuningan',
            'Kuningan Timur',
            'Menteng Atas',
            'pasar Manggis',
            'Guntur'
        ]
    },
    'Jakarta Utara': {
        Cilincing: [
            'Cilincing',
            'Semper Barat',
            'Semper Timur',
            'Rorotan',
            'Sukapura'
        ],
        Koja: [
            'Koja Utara',
            'Koja Selatan',
            'Rawa Badak',
            'Tugu Selatan',
            'Tugu Utara'
        ],
        'Kelapa Gading': ['Kelapa Gading Timur', 'Pegangsaan Dua'],
        'Tanjung Priok': [
            'Tanjung Priok',
            'Kebon Bawang',
            'Sungai Bambu',
            'Papanggo',
            'Warakas',
            'Sunter Agung',
            'Sunter jaya'
        ],
        Pademangan: ['Pademangan Timur', 'Pademangan Barat', 'Ancol'],
        Penjaringan: [
            'Penjaringan',
            'Penjagalan',
            'Pluit',
            'Kapuk Muara',
            'Kamal Muara'
        ]
    },
    'Jakarta Timur': {
        Matraman: [
            'Utan Kayu Selatan',
            'Utan Kayu Utara',
            'Kayu Manis',
            'Pal Meriam',
            'Kebon Manggis'
        ],
        'Pulo Gadung': ['Kayu Putih', 'Jati', 'Rawa Mangun', 'Pisangan Timur'],
        Jatinaegara: [
            'Kampung Melayu',
            'Bidara Cina',
            'Cipinang Cempedak',
            'Rawa Bunga',
            'Cipinang Besar Selatan',
            'Cipinang Besar Utara'
        ],
        'Duren Sawit': [
            'Pondok Bambu',
            'Duren Sawit',
            'Pondok Kelapa',
            'Malak Jaya',
            'Malaka sari',
            'Pondok Kopi',
            'Klender',
            'Kramat Jati',
            'Batu Ampar',
            'Bale Kambang',
            'Kampung Tengah',
            'Dukuh',
            'Cawang',
            'Cililitan'
        ],
        Makasar: [
            'Pinang Ranti',
            'Makasar',
            'Halim Perdana Kusuma',
            'Cipinang Melayu',
            'Kebon Pala'
        ],
        'Pasar Rebo': ['Gendong', 'Cijantung', 'Baru', 'Kalisari'],
        Ciracas: [
            'Cibubur',
            'Kelapa Dua Wetan',
            'Ciracas',
            'Susukan',
            'Rambutan'
        ],
        Cipayung: [
            'Lubang Buaya',
            'Ceger',
            'Cipayung',
            'Pondok rangon',
            'Cilangkap',
            'Setu',
            'Bambu Apus'
        ],
        'Kec. Cakung': [
            'Cakung Barat',
            'Cakung Timur',
            'Rawa Terate',
            'Jatinegara',
            'Penggilingan',
            'Pulo Gebang',
            'Ujung Menteng'
        ]
    },
    Depok: {
        'Sukma Jaya': [
            'Mekar Jaya',
            'Kali Mulya',
            'Cilodong',
            'Kali Baru',
            'Cisalak',
            'Abadi Jaya',
            'Bhakti Jaya'
        ],
        Beji: [
            'Beji Barat',
            'Beji Timur',
            'Kemiri Muka',
            'Pondok Cina',
            'Kukusan',
            'Tanah Baru',
            'Citayam (depok)'
        ],
        'Pancoran Mas': ['Depok', 'Depok Jaya', 'Mampang', 'Pancoran Mas'],
        Limo: [
            'Desa Krukut',
            'Desa Gandul',
            'Desa Pangkalan Jati',
            'Desa pangkalan Jati Baru',
            'Desa Cinere'
        ]
    },
    Tangerang: {
        Tangerang: [
            'Sukaasih',
            'Sukarasa',
            'Cikokol',
            'Kelapa Indah',
            'Sukasari',
            'Babakan',
            'Buaran Indah',
            'Tanah Tinggi'
        ],
        Karawaci: [
            'Koang Jaya',
            'Nambo Jaya',
            'Pabuaran Tumpeng',
            'Pasar Baru',
            'Bugel',
            'Gerendeng',
            'MargaSari',
            'Suka Jadi',
            'Cimone',
            'Cimone Baru',
            'Pabuaran',
            'Sumur Pancing',
            'Bojong Jaya',
            'Karawaci',
            'Karawaci Baru',
            'Nusa Jaya'
        ],
        'Batu Ceper': [
            'Batu Sari',
            'Poris Gaga',
            'Poris Gaga Baru',
            'Batu Ceper',
            'Kebon Besar',
            'Poris Jaya'
        ],
        'Negla Sari': [
            'Karang Anyar',
            'Selapang Jaya',
            'Kedaung',
            'Kedaung Wetan',
            'Mekar Sari',
            'Negla Sari'
        ],
        Benda: ['Belendung', 'Jurumudi Baru', 'Jurumudi', 'Benda', 'Panjang'],
        Jatiuwung: ['roncong (k.permai saja)'],
        Cipondoh: [
            'Poris Plawad',
            'Poris Plawad Indah',
            'Poris Plawad Utara',
            'Kenanga',
            'Gondrong',
            'Petir',
            'Ketapang',
            'Cipondoh',
            'Cipondoh Indah',
            'Cipondoh Makmur'
        ],
        Pinang: [
            'Cipete',
            'Pakojan',
            'Panungganan Selatan',
            'Panungganan Timur',
            'Panungganan Utara',
            'Kunciran',
            'Kunciran Indah',
            'Kunciran Jaya',
            'Narogtog',
            'Pinang',
            'Sudimara Pinang'
        ],
        Ciledug: [
            'Sudimara Barat',
            'Sudimara Jaya',
            'Sudimara Selatan',
            'Sudimara Timur',
            'Tajur',
            'Paninggilan',
            'Paninggilan Utara',
            'Parung Serab'
        ],
        Larangan: [
            'Gaga',
            'Larangan Indah',
            'Larangan Utara',
            'Cipadu',
            'Cipadu jaya',
            'Larangan Selatan',
            'Kreo',
            'Kreo Selatan'
        ],
        'Karang Tengah': [
            'Karang Mulya',
            'Karang Tengah',
            'Karang Timur',
            'Pendurenan',
            'Pondok Pucung',
            'Parung Jaya',
            'Pondok Bahar'
        ],
        'Pondok Aren': [
            'Pondok Betung',
            'Jurangmangu Timur',
            'Jurangmangu Barat',
            'Pondok Aren',
            'Pondok Karya Kacang',
            'Pondok Karya Barat',
            'Pondok Karya Timur',
            'Parigi',
            'Parigi Baru',
            'Pondok Pucung (pdk aren)'
        ],
        BSD: [
            'Serpong',
            'Muncul (hanya puspitek saja)',
            'Setu',
            'Babakan',
            'Rawa Buntu (Rawa Mekar Jaya)',
            'Lengkong Gudang',
            'Lengkong Wetan',
            'Jelupang',
            'Paku jaya',
            'Pakulonan',
            'Pondok Jagung'
        ],
        Ciputat: [
            'Cipayung',
            'Ciputat',
            'Cempaka Putih',
            'Pondok Ranji',
            'Rempoa',
            'Rengas',
            'Sawah Baru',
            'Sawah Lama'
        ],
        Pamulang: [
            'Jombang',
            'Sarua',
            'Sarua Indah',
            'Bambu Apus',
            'Kedaung',
            'Pondok Benda Baru',
            'Pondok Benda Lama',
            'Pamulang Barat',
            'Pamulang Timur',
            'Pondok Cabe Ilir',
            'Pondok Cabe Udik',
            'Cirendeu',
            'Pisangan'
        ],
        Curug: ['Bencongan( Lippo Karawaci)']
    },
    Bekasi: {
        'Bekasi Timur': [
            'Duren Jaya',
            'Aren jaya',
            'Bekasi Jaya',
            'Margahayu',
            'Rawa lumbu',
            'Jati Mulya'
        ],
        'Bekasi Utara': [
            'Teluk Pucung',
            'Perwira',
            'Harapan Baru',
            'Harapan Jaya',
            'Kaliabang Tengah'
        ],
        'Bekasi Barat': [
            'Kota Baru',
            'Bintara',
            'Kranji',
            'Bintara Jaya',
            'Jaka Sampurna'
        ],
        'Bekasi Selatan': [
            'Kayu Ringin Jaya',
            'Jaka Mulya',
            'Jaka Setia',
            'Pekayon Jaya'
        ],
        'Medan Satria': ['Pejuang', 'Medan Satria', 'Kali Baru'],
        'Pondok Gede': [
            'Jatiwaringin',
            'Jati Bening',
            'Jati Makmur',
            'Jati Rahayu',
            'Jati Warna',
            'Jati Kramat',
            'Jati Asih'
        ]
    }
}


export function isDuplicatedError(errors) {
    for (var key in errors) {
        if (errors[key].indexOf('Duplicated') !== -1) return true
    }
    return false
}

export function createDuplicatedError(responseText) {
    let msg = dictionary('error_duplicated_order')
    if (
        responseText.type === 'enroll' ||
        responseText.type === 'shopping retail' ||
        responseText.type === 'shopping profile'
    ) {
        msg = dictionary('error_duplicated_order_without_order')
    }
    let regex = /(\d{2})-(\w+)-(\d{4}) (.*)/ //08-May-2019 5:49PM
    let matches = responseText.stamp_created.match(regex)
    let day = matches[1]
    let month = matches[2]
    let monthstr = dictionary('month_' + month.toLowerCase())
    let year = matches[3]
    let time = matches[4]
    let datestr = day + '-' + monthstr + '-' + year

    // msg = msg.replace('{{items}}', items)
    msg = msg.replace('{{order_id}}', responseText.order_id)
    msg = msg.replace('{{pv}}', responseText.pv)
    msg = msg.replace(
        '{{total}}',
        numeralFormat(responseText.total) +
            ' ' 
    )
    msg = msg.replace('{{date}}', datestr)
    msg = msg.replace('{{time}}', time)

    return msg
}
