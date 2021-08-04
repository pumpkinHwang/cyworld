import $ from 'jquery'
import {
    apiURL,
    apiHEADER,
    marketZone,
    getCountryCode3,
    getCountryCode,
    isProduction,
    getProductCountryCode3
} from '../components/GlobalHelpers'

import { inArray } from '../components/config'
import { isNothing } from '../components/utils/Utils'
import ImageTools from '../components/utils/ImageTool'
import Raven from './Raven'
import moment from 'moment'
import { _get, _post } from './APIs'
import StoreAuth from '@Stores/User/StoreAuth'

const { REACT_APP_ENV, NODE_ENV } = process.env
const USE_STAGE = REACT_APP_ENV || NODE_ENV
const memberCalls2Endpoints = {
    development: 'https://member-calls2-kr.unicity.com',
    production: 'https://member-calls2-kr.unicity.com'
}
const isDev = window.location.href.indexOf('localhost') > 0 ? true : false
const memberCalls2Url = isDev
    ? memberCalls2Endpoints.development
    : memberCalls2Endpoints.production

const HYDRA_API_VERSION = 'v5a'

export const get = (url, callback) => {
    $.ajax({
        type: 'GET',
        url: url,
        success: response => {
            callback(response, true)
        },
        error: response => {
            callback(response, false)
        }
    })
}

export const post = (url, data, callback, headers) => {
    const settings = {
        type: 'POST',
        url: url,
        success: response => {
            callback(response, true)
        },
        error: response => {
            callback(response, false)
        }
    }

    if (data !== undefined) {
        settings.data = data
    }

    if (headers !== undefined) {
        settings.headers = headers
    }

    $.ajax(settings)
}

export function doSearchBA(callback, text, sponsor, token) {
    //'Authorization': 'Bearer ' + token
    $.ajax({
        type: 'GET',
        url: `https://hydra.unicity.net/v5a/customers?fulltext=${text}&sponsor.id.unicity=${sponsor}`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        success: function(result) {
            callback(result, true)
        },
        error: function(err) {
            callback(err, false)
        }
    })
}

export function getStaticFooter(callback, country) {
    $.ajax({
        type: 'GET',
        async: true,
        url:
            'https://member-kr.unicity.com/unifoapi/v1/global/footer/' +
            getCountryCode3(),
        success: function(result) {
            callback(result, true)
        },
        error: function(err) {
            callback(err, false)
        }
    })
}

export function getGeoUrl(callback, code) {
    let data = {
        source: 'UNISHOP-WEB',
        country_code: code
    }
    data = JSON.stringify(data)
    $.ajax({
        type: 'POST',
        url: 'https://member-calls.unicity.com/ALL/ALL_Unishop_Geolocation.asp',
        data: { strData: data },
        success: function(result) {
            callback(result, true)
        },
        error: function(err) {
            callback(err, false)
        }
    })
}

export function getGeoLocation(callback) {
    $.ajax({
        type: 'GET',
        url:
            'https://api.ipstack.com/check?access_key=bddc97ea08f502db759bcc7524f76949',
        success: function(result) {
            callback(result)
        },
        error: function(result) {
            callback(result)
        }
    })
}

export function generateEnrollUrl(callback, url) {
    $.ajax({
        type: 'POST',
        url:
            'https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyCyDpORYkLdL2Fyb-TcHd1iH3BDXWOG8vk',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({ longUrl: url }),
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function generateEnrollUrlBitly(callback, url) {
    $.ajax({
        type: 'POST',
        url: 'https://member-calls.unicity.com/ALL/shoutenURL_bitly.php',
        data: { short_url: url },
        success: function(result) {
            result = JSON.parse(result)
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getHref(callback, id) {
    let url = 'https://hydra.unicity.net/v5a/customers?unicity=' + id
    $.ajax({
        type: 'GET',
        url: url,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getUserDetail(callback, id) {
    let url =
        'https://hydra.unicity.net/v5a/customers?unicity=' +
        id +
        '&expand=customer,achievementsHistory'
    $.ajax({
        type: 'GET',
        url: url,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getUserDetail2(callback, id) {
    let url =
        'https://hydra.unicity.net/v5a/customers.js?callback=angular.callbacks._5^&expand=customer,profilePicture^&id.unicity=' +
        id
    $.ajax({
        type: 'GET',
        url: url,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getHotProduct(callback) {
    let url =
        'https://member-th.unicity.com/cpanel/wp-admin/admin-ajax.php?action=unimobiapp_get_products&args[meta_key]=product_hot&args[meta_value]=yes'
    $.ajax({
        type: 'GET',
        url: url,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function changeMobilePhone(callback, url, token, mobilePhone) {
    let data = {
        mobilePhone: mobilePhone
    }
    $.ajax({
        type: 'POST',
        url: apiURL.hydraStandard + '/customers/me',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        data: JSON.stringify(data),
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function changeEmail(callback, url, token, email) {
    let data = {
        email: email
    }
    $.ajax({
        type: 'POST',
        url: apiURL.hydraStandard + '/customers/me',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        data: JSON.stringify(data),
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function changePassword(callback, url, token, password) {
    let data = {
        value: password
    }
    $.ajax({
        type: 'POST',
        url: apiURL.hydraStandard + '/customers/me/password',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        data: JSON.stringify(data),
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function deleteNickName(callback, url, token) {
    $.ajax({
        type: 'DELETE',
        url: url,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getGenealogy(callback, href, level, limit, token) {
    let checkLeg = /Leg/
    let checkCcm = /ccm/
    if (checkLeg.test(level) || checkCcm.test(level)) {
        level = 1
    }

    let url =
        href +
        '/sponsoredCustomersTreePreOrder?maxTreeDepth=' +
        level +
        '&limit=' +
        256 +
        '&country=' +
        marketZone +
        '&expand=self,profilePicture&_httpHeaderAuthorization=Bearer%20' +
        token
    $.ajax({
        type: 'GET',
        url: url,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getVip(callback, id) {
    $.ajax({
        type: 'GET',
        url: apiURL.getVip + id,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function expandCustomer(callback, href, id) {
    Raven.getCustomerExpand(id)
        .then(response => {
            callback(response, true)
        })
        .catch(response => {
            callback(response, false)
        })
}

export function checkSponsorAndEnroller(callback, token, id) {
    $.ajax({
        type: 'POST',
        data: JSON.stringify({
            ba_id: id,
            country_code: getCountryCode()
        }),
        url:
            'https://member-kr.unicity.com/unifoapi/v1/global/verify/enrollment_id',
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function uplineSponsoring(callback, sponsorhref, enrollerID) {
    $.ajax({
        type: 'GET',
        url: sponsorhref + apiURL.uplineSponsoringCustomer + enrollerID,
        success: function(result) {
            var dataSet = result.replace(/-/g, '')
            var obj = JSON.parse(dataSet)
            callback(obj, true)
        },
        error: function(result) {
            var dataSet = result.replace(/-/g, '')
            var obj = JSON.parse(dataSet)
            callback(obj, true)
        }
    })
}

export function hydraRequestByUrl(callback, token, url) {
    $.ajax({
        type: 'GET',
        headers: { Authorization: 'Bearer ' + token },
        url: url,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function hydraRequestByUrlPost(callback, token, url, data) {
    $.ajax({
        type: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        url: url,
        data: data,
        async: true,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getPeriod(callback, id, market) {
    let data = {
        ba_id: id,
        country: market
    }

    $.ajax({
        type: 'POST',
        url: apiURL.getPeriod,
        data: data,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getCommissionPeriod(callback, id, market) {
    let data = {
        country: 'TH',
        system: 'AO'
    }
    $.ajax({
        type: 'POST',
        url: apiURL.getPeriodCommission,
        data: data,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getCommissions(callback, token) {
    $.ajax({
        type: 'POST',
        headers: { Authorization: 'Bearer ' + token },
        url: apiURL.getCommissionData,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function checkToken(callback, token) {
    $.ajax({
        type: 'GET',
        headers: { Authorization: 'Bearer ' + token },
        url: apiURL.whoAmI,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getProduct(callback, price_level, warehouse) {
    if (warehouse !== undefined) {
        var url =
            apiURL.getProducts +
            '&price_level=' +
            price_level +
            '&warehouse=' +
            warehouse
    } else {
        var url = apiURL.getProducts + '&price_level=' + price_level
    }

    $.ajax({
        type: 'GET',
        url: url,
        async: true
    })
        .done(function(result) {
            if (result && result.data && result.data.length > 0) {
                result.data = result.data.filter(removeNoShop)
            }
            callback(result, true)
            // return result;
        })
        .catch(function(result) {
            callback(result, false)
            // console.log(err)
            // callback(console.log, false)
        })
    function removeNoShop(each) {
        return each.remarks != 'no_shop'
    }
}

export function newGetProducts(callback, warehouse) {
    if (warehouse !== undefined) {
        var url = apiURL.newGetProducts + '&warehouse=' + warehouse
    } else {
        var url = apiURL.newGetProducts
    }
    $.ajax({
        type: 'GET',
        url: url,
        async: true
    })
        .done(function(result) {
            callback(result, true)
        })
        .catch(function(result) {
            callback(result, false)
            // console.log(err)
            // callback(console.log, false)
        })
}

export function getRegistrationProduct(callback, warehouse) {
    if (warehouse !== undefined) {
        var url = apiURL.newGetProducts + '&warehouse=' + warehouse
    } else {
        var url = apiURL.newGetProducts
    }

    $.ajax({
        type: 'GET',
        url: url,
        async: true,
        success: function(result) {
            let products = []
            let registrationProduct = result.starterKits.filter(
                item => item.country_code === 'PHL'
            )
            console.log('callnet', registrationProduct)
            callback(registrationProduct, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function shopGetProducts(callback, data) {
    $.ajax({
        type: 'POST',
        url: 'https://member-calls.unicity.com/shopprofile/api/shopprofile.php',
        data: data,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getQuickProduct(callback, data) {
    $.ajax({
        type: 'POST',
        url: 'https://member-calls.unicity.com/unipower/api/',
        data: data,
        async: true,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getStockProduct(callback, data, countryCode) {
    $.ajax({
        type: 'GET',
        url:
            'https://member-kr.unicity.com/unifoapi/v1/global/checkStockByItemCodes?items=' +
            data +
            '&country_code=' +
            countryCode,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getBirProfile(callback, data) {
    $.ajax({
        type: 'POST',
        url: 'https://member-calls.unicity.com/PHL/API/API_BIR/birprofile.php',
        data: data,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function sendBirEmail(callback, data) {
    $.ajax({
        type: 'POST',
        url:
            'https://member-calls.unicity.com/PHL/API/API_BIR/TAX_Send_Mail.php',
        data: data,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function sendBirEmailBAS(callback, data) {
    $.ajax({
        type: 'POST',
        url:
            'https://member-calls.unicity.com/PHL/API/API_BIR/BASPH_TAX_SEND_Mail.php',
        data: data,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function loadAgreement({ url, token }, cb) {
    $.ajax({
        type: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        url: encodeURI(url),
        success: function(result) {
            cb(result, true)
        },
        error: function(result) {
            cb(result, false)
        }
    })
}

export function updateAgreement({ url, token }, cb) {
    var data = {
        type: 'Order',
        holder: 'Upline'
    }
    var data = JSON.stringify(data)

    $.ajax({
        type: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        data: data,
        url: encodeURI(url + '/rights'),
        success: function(result) {
            cb(result, true)
        },
        error: function(result) {
            cb(result, false)
        }
    })
}

export function deleteAgreement({ url, token }, cb) {
    $.ajax({
        type: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        url: encodeURI(url + '/rights?type=Order&holder=Upline'),
        success: function(result) {
            cb(result, true)
        },
        error: function(result) {
            cb(result, false)
        }
    })
}
// export function sendTaxFeedback(callback, message, email, baid, device) {
//     let data = "market=" + marketZone + "&msg= " + message + "&baid=" + baid + "&email=" + email+ "&device=" + device;
//     $.ajax({
//         'type': 'POST',
//         'url': apiURL.sendTaxFeedback,
//         'data': data,
//         'success': function (result) {
//             callback(result, true)
//         },
//         'error': function (result) {
//             callback(result, false)
//         }
//     })
// }

export function queryOrder(callback, token, href, orderUrl) {
    $.ajax({
        type: 'GET',
        url:
            'https://member-th.unicity.com/queryorder.php?type=2&token=' +
            token +
            '&ssurl=' +
            href +
            '&link=' +
            orderUrl,
        //'url': apiURL.queryOrder+token+'&ssurl='+href+'&link='+orderUrl+'&market='+marketZone,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function queryBuyfrom(callback, token, orderUrl) {
    $.ajax({
        type: 'GET',
        headers: { Authorization: 'Bearer ' + token },
        url: orderUrl,
        success: function (result) {
            callback(result, true)
        },
        error: function (result) {
            callback(result, false)
        }
    })
}

export function reportOrder(callback, token, month) {
    $.ajax({
        type: 'GET',
        url: apiURL.orderHistory + token + '&month=' + month,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function genealogyOrders(callback, period, period2, href, token) {
    let logonCountry = getUserCountryCode()
    let market =
        logonCountry != '' && logonCountry != getCountryCode()
            ? getCountryCode() + '|' + logonCountry
            : getCountryCode()

    $.ajax({
        type: 'GET',
        headers: {
            'authorization-hydra': 'Bearer ' + token,
            'authorization-ushop': 'Bearer tVxbmKcjme'
        },
        url: `https://member-calls2.unicity.com/adapter/dashboard?expand=orderHistory&expandOrderHistory=order,rma&dateCreated=[${period}|${period2}]&customer=me|sponsoredCustomers?type=Customer&customerHref=${href}`,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function genealogyOrders2(callback, period, period2, orderUrl, token) {

    let logonCountry = getUserCountryCode()
    let market =
        logonCountry != '' && logonCountry != getCountryCode()
            ? getCountryCode() + '|' + logonCountry
            : getCountryCode()

    $.ajax({
        type: 'GET',
        headers: { Authorization: 'Bearer ' + token },
        //'url': 'https://hydra.unicity.net/v5a/customers/' + user + '/ordersAndRmas?dateCreated=[' + period + ';' + period2 + ']&expand=order,rma',
        // todo change to hydra live
        // 'url': 'https://hydra.unicity.net/v5a/customers/' + user
        //     + '/ordersAndRmas?dateCreated=[' + period + ';' + period2
        //     + ']&expand=order,rma'
        //     + '&market=' + market,
        url:
            orderUrl +
            '/ordersAndRmas?dateCreated=[' +
            period +
            ';' +
            period2 +
            ']&expand=order,rma&customer=me|sponsoredCustomers?type=Customer',

        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function genealogyOrders3(callback, period, period2, orderUrl) {
    $.ajax({
        type: 'GET',
        headers: { Authorization: 'Bearer ' + 'programs:9857ce776767e9287fde' },
        url:
            orderUrl +
            '/orders?dateCreated=[' +
            period +
            ';' +
            period2 +
            ']&expand=order',

        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function makeCustomersInternational(callback) {
    let baCountry = getUserCountryCode()
    let loginId = getLoginUserId()

    let exceptCountry = ['AU', 'NZ']
    let useSingaporeSpoke = inArray(baCountry, exceptCountry)

    if (baCountry != getCountryCode() || useSingaporeSpoke) {
        var data = {
            customer: {
                href:
                    'https://hydra.unicity.net/v5a/customers?id.unicity=' +
                    loginId
            },
            market: useSingaporeSpoke ? 'SG' : getCountryCode()
            // "timeout": "60"
        }

        data = JSON.stringify(data)

        $.ajax({
            type: 'POST',
            headers: { 'Content-Type': 'application/json' },
            url:
                'https://hydra.unicity.net/v5a/gears/makecustomersinternational',
            data: data,
            // 'timeout': 500,
            success: function(response) {
                callback(null, response)
            },
            error: function(error) {
                callback(error, null)
            }
        })
    } else {
        callback()
    }
}

export function makeCustomersInternational_Enroll(ba_id) {
    var data = {
        customer: {
            href: 'https://hydra.unicity.net/v5a/customers?id.unicity=' + ba_id
        },
        market: getCountryCode()
    }
    data = JSON.stringify(data)
    $.ajax({
        type: 'POST',
        headers: { 'Content-Type': 'application/json' },
        url: 'https://hydra.unicity.net/v5a/gears/makecustomersinternational',
        data: data,
        success: function(result) {},
        error: function(result) {}
    })
}

export function loginUser(callback, username, password) {
    let data = {
        type: 'base64',
        value: btoa(
            unescape(
                encodeURIComponent(username.trim() + ':' + password.trim())
            )
        ),
        namespace: 'https://hydra.unicity.net/v5a/customers'
    }
    $.ajax({
        type: 'POST',
        headers: apiHEADER.preset1,
        url: apiURL.loginTokens,
        data: JSON.stringify(data),
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}
export function loginAddLog(dataProfile) {
    let data = {
        dataProfile: dataProfile
    }
    $.ajax({
        type: 'POST',
        crossDomain: true,
        url: apiURL.loginAddProfile,
        dataType: 'json',
        data: JSON.stringify(data),
        success: function(result) {
            //callback(result, true)
            console.log('loginAddLog Success')
        },
        error: function(result) {
            //callback(result, false)
            console.log('loginAddLog Error')
        }
    })
}

export function getSeminarData(callback, baid, pathF) {
    let id = btoa(baid)
    $.ajax({
        type: 'GET',
        url: apiURL.seminarData + id + '&point=' + pathF,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function sendFeedback(callback, message, email, baid, device) {
    let data =
        'market=' +
        marketZone +
        '&msg= ' +
        message +
        '&baid=' +
        baid +
        '&email=' +
        email +
        '&device=' +
        device
    $.ajax({
        type: 'POST',
        url: apiURL.sendFeedback,
        data: data,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getAddress(callback, token, href) {
    $.ajax({
        type: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        url: href + '/shiptooptions',
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function newAddress(callback, token, href, data) {
    $.ajax({
        type: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        url: href + '/shiptooptions',
        data: JSON.stringify(data),
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function updateAddress(callback, href, token, adrhref, data) {
    $.ajax({
        type: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        url: href + '/shiptooptions/' + adrhref,
        data: JSON.stringify(data),
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function deleteAddress(callback, href, token, adrhref) {
    $.ajax({
        type: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        url: href + '/shiptooptions/' + adrhref,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getCustomerData(callback, token, href) {
    $.ajax({
        type: 'GET',
        async: true,
        headers: { Authorization: 'Bearer ' + token },
        url: href + '?expand=customers,profilePicture',
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}
export function getAchievementsHistory(callback, token, href) {
    $.ajax({
        type: 'GET',
        headers: { Authorization: 'Bearer ' + token },
        url: href,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}
export function getProfilePicture(callback, token, href) {
    $.ajax({
        type: 'GET',
        headers: { Authorization: 'Bearer ' + token },
        url: href,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}
export function getMetricsHistory(callback, token, href) {
    if (
        href.indexOf('achievementsHistory') === -1 &&
        href.indexOf('metricsProfileHistory') === -1
    ) {
        href = href + '/achievementsHistory'
    }
    $.ajax({
        type: 'GET',
        headers: { Authorization: 'Bearer ' + token },
        url: href,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function serviceGetNews(callback) {
    $.ajax({
        type: 'GET',
        url: apiURL.getNews,
        success: function(result) {
            let newsArray = []
            for (var i in result) {
                newsArray.push({
                    link: result[i].embed_video,
                    image: result[i].image,
                    hot: result[i].new_hot
                })
            }
            return callback(newsArray)
        },
        error: function(result) {}
    })
}

export function serviceGetMedia(callback) {
    $.ajax({
        type: 'GET',
        url: apiURL.getMedia,
        success: function(result) {
            let mediaArray = []
            for (var i in result) {
                mediaArray.push({
                    link: result[i].embed_video,
                    image: result[i].image
                })
            }
            return callback(mediaArray)
        },
        error: function(result) {}
    })
}

export function getAllProduct(callback) {
    $.ajax({
        type: 'GET',
        url: apiURL.getAllProduct,
        async: true,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}
export function checkInventory(callback, data) {
    $.ajax({
        type: 'POST',
        url: apiURL.getInventory,
        data: JSON.stringify(data),
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getProvince(callback) {
    $.ajax({
        type: 'GET',
        url: apiURL.URL_SERVICES_PROVINCES,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getDsc(callback, lang) {
    $.ajax({
        type: 'POST',
        url:
            'https://member-kr.unicity.com/unifoapi/v1/TH/common/warranty/dsc/get',
        data: lang,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getBankname(callback) {
    $.ajax({
        type: 'GET',
        url: apiURL.URL_SERVICES_BANKNAME,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getArea(provinceid, callback) {
    let url = apiURL['URL_SERVICES_AMPHURES'].replace(
        '[provinceId]',
        provinceid
    )
    $.ajax({
        type: 'GET',
        url: url,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getSubArea(areaid, callback) {
    let url = apiURL['URL_SERVICES_DISTRICTS'].replace('[amphurId]', areaid)
    $.ajax({
        type: 'GET',
        url: url,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function checkValidation(callback, data) {
    $.ajax({
        type: 'POST',
        url: 'https://member-calls.unicity.com/THA/THA_Order_Validation.asp',
        data: data,
        success: function(result) {
            callback(JSON.parse(result), true)
        },
        error: function(result) {
            callback(JSON.parse(result), false)
        }
    })
}

export function creatOrder(callback, data) {
    $.ajax({
        type: 'POST',
        url: 'https://member-th.unicity.com/cpanel/wp-admin/admin-ajax.php',
        dataType: 'json',
        data: data,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function onSentEmail(callback, data) {
    $.ajax({
        type: 'POST',
        url: 'https://member-th.unicity.com/th_order/emailRecice.php',
        data: data,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getFooter(callback, data) {
    data.strData = JSON.parse(data.strData)
    data.strData.env = isProduction() ? 'LIVE' : 'DEV'
    data.strData = JSON.stringify(data.strData)

    $.ajax({
        type: 'POST',
        url: 'https://member-calls.unicity.com/ALL/ALL_FooterV2.asp',
        data: data,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getShareACartStat(callback, data) {
    $.ajax({
        type: 'POST',
        url: 'https://member-calls.unicity.com/shopprofile/api/shopprofile.php',
        data: { strData: data },
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getShopProfile(callback, data) {
    $.ajax({
        type: 'POST',
        url: 'https://member-calls.unicity.com/shopprofile/api/shopprofile.php',
        data: data,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function subscribe(callback, data) {
    $.ajax({
        type: 'POST',
        url: apiURL.emailSubscription,
        data: data,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function subscribePHEmatics(callback, data) {
    $.ajax({
        type: 'POST',
        url: 'https://member-calls.unicity.com/PHL/emails/subscribe.php',
        data: {
            email: data.email,
            language: 'en',
            device: data.device
        },
        success: function(result) {
            // result = JSON.parse(result)
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function resetPassword(callback, data) {
    $.ajax({
        type: 'POST',
        headers: { 'Content-Type': 'application/json' },
        url: apiURL.resetPassword,
        data: data.strData,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function newRegister(callback, data) {
    $.ajax({
        type: 'POST',
        headers: { 'Content-Type': 'application/json' },
        url: apiURL.newRegistration,
        data: data.strData,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function newRegistrationNextStep(callback, token, data) {
    $.ajax({
        type: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        url: apiURL.createPassword,
        data: data,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function autoShipList(callback, token) {
    $.ajax({
        type: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        // 'url': "https://hydra.unicity.net/v5a/customers/me/autoorders",
        url: 'https://member-calls2-kr.unicity.com/etl/autoship/list',
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function autoShipOrderDetail(callback, data, token) {
    $.ajax({
        type: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        async: false,
        url: data,

        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function autoShipOrderDetailJpV2(callback, data, token) {
    console.log('data', data)
    let url = {
        url: data
    }
    $.ajax({
        type: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        async: true,
        // 'url': data,

        // v2
        url: 'https://member-calls2-kr.unicity.com/etl/autoship/detail',
        data: url,

        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function autoShipOrderDelete(callback, data, token) {
    $.ajax({
        type: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        // 'async': false,
        async: true,
        url: data,

        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}
export function validateAddressBook(callback, data) {
    data = JSON.stringify(data)
    $.ajax({
        type: 'POST',
        url: apiURL[getCountryCode()].validateAddressBook,
        data: { strData: data },
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function validateAddress(callback, data) {
    data = JSON.stringify(data)
    $.ajax({
        type: 'POST',
        url: apiURL[getCountryCode()].validateAddress,
        data: { strData: data },
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function validateZipCodeSG(callback, zipcode) {
    $.ajax({
        type: 'GET',
        url:
            'https://member-kr.unicity.com/unifoapi/v1/sg/validate/zipcode/' +
            zipcode,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function enrollValidate(callback, data) {
    data = JSON.stringify(data)
    $.ajax({
        type: 'POST',
        url: apiURL[getCountryCode()].enrollValidation,
        data: { strData: data },
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function enrollValidatePH(callback, data) {
    data = JSON.stringify(data)
    $.ajax({
        type: 'POST',
        url: 'https://member-calls.unicity.com/PHL/PHL_Enroll_ValidationV2.asp',
        data: { strData: data },
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function autoShipAddressValidate(callback, data) {
    data = JSON.stringify(data)
    $.ajax({
        type: 'POST',
        url: apiURL[getCountryCode()].validateAddress,
        data: { strData: data },
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function createOrderServices(callback, data) {
    $.ajax({
        type: 'POST',
        url: apiURL.adminAjax,
        dataType: 'json',
        data: data,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function validateCart(callback, data, url) {
    $.post(url, JSON.stringify(data))
        .done(function(result) {
            callback(result, true)
        })
        .fail(function(error) {
            callback(error, false)
        })
}

export function validateShoppinCheckout(callback, data, url) {
    $.post(url, JSON.stringify(data))
        .done(function(result) {
            callback(result, true)
        })
        .fail(function(error) {
            callback(error, false)
        })
}

export function validateCartEnroll(callback, data, url) {
    $.post(url, JSON.stringify(data))
        .done(function(result) {
            callback(result, true)
        })
        .fail(function(error) {
            callback(error, false)
        })
}

export function convert(callback, data, url) {
    $.post(url, JSON.stringify(data))
        .done(function(result) {
            callback(result, true)
        })
        .fail(function(error) {
            callback(error, false)
        })
}

export function convertExpress(callback, data, url) {
    $.post(url, { data: data })
        .done(function(result) {
            callback(result, true)
        })
        .fail(function(error) {
            callback(error, false)
        })
}

export function calculateOrder(callback, data) {
    $.ajax({
        type: 'POST',
        headers: { 'Content-Type': 'application/json' },
        url: 'https://hydra.unicity.net/v5a/orderTerms?expand=item',
        data: data,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function createAutoShip(callback, data, token, href) {
    $.ajax({
        type: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        url: isNothing(href)
            ? 'https://hydra.unicity.net/v5a/customers/me/autoorders'
            : href,
        data: data,
        success: function(result, status, request) {
            callback(result, true, request)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function uniqueEmail(callback, email) {
    // $.ajax({
    //     'type': 'get',
    //     'headers': { 'Content-Type': 'application/json', 'Authorization': 'Bearer programs:9857ce776767e9287fde' },
    //     'url': 'https://hydra.unicity.net/v5a/customers?email=' + email,
    //     'success': function (result) {
    //         callback(result, true)
    //     },
    //     'error': function (result) {
    //         callback(result, false)
    //     }
    // })

    $.ajax({
        type: 'get',
        url:
            'https://member-kr.unicity.com/unifoapi/v1/sg/hydratemp/CheckEmailExist/' +
            email,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function uniqueMobile(callback, mobilPhone) {
    $.ajax({
        type: 'get',
        url:
            'https://hydra.unicity.net/v5a/customers.js?_httpMethod=HEAD&mainAddress_country=TH&mobilePhone=' +
            mobilPhone,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function watermarkAsset(
    callback,
    imgData,
    width,
    posStart,
    posEnd,
    uploadOnly,
    imgCountry
) {
    $.ajax({
        type: 'POST',
        url:
            'https://klmn54l1vi.execute-api.ap-southeast-1.amazonaws.com/watermarkasset',
        contentType: 'application/json',
        data: JSON.stringify({
            image: imgData,
            watermarkFile: imgCountry,
            watermarkSetting: {
                width: width,
                posStart: posStart,
                posEnd: posEnd,
                uploadOnly: uploadOnly
            }
        }),
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function uniqueEmailByCountry(callback, countryCode, email) {
    $.ajax({
        type: 'get',
        dataType: 'jsonp',
        url:
            'https://hydra.unicity.net/v5a/customers.js?_httpMethod=HEAD&callback=function1&mainAddress_country=' +
            countryCode +
            '&email=' +
            email,
        success: function(result) {
            var dataSet = JSON.stringify(result, undefined, 4)
            var dataSet = dataSet.replace(/-/g, '')
            var obj = JSON.parse(dataSet)
            if (obj.meta.XStatusCode == 200) {
                callback(result, false)
            } else if (obj.meta.XStatusCode == 404) {
                callback(result, true)
            } else {
                callback(result, false)
            }
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function logPayment(callback, data, url) {
    $.post(url, JSON.stringify(data))
        .done(function(result) {
            callback(result, true)
        })
        .fail(function(error) {
            callback(error, false)
        })
}

export function createUser(callback, data) {
    $.ajax({
        type: 'POST',
        url: 'https://hydra.unicity.net/v5-test/customers',
        data: data,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function sendEmailViaMailgun(callback, data) {
    $.ajax({
        type: 'POST',
        url: 'https://member-th.unicity.com/email/mailgun.php',
        data: data,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function contactMeValidate(callback, data) {
    $.ajax({
        type: 'POST',
        url:
            'https://member-calls.unicity.com/SGP/SGP_ContactMe_Validation.asp',
        data: data,
        success: function(result) {
            callback(result, true)
        },
        error: function() {
            callback(['There was an error with your request.'], false)
        }
    })
}

export function emailSubScribeServices(callback, data) {
    $.ajax({
        type: 'POST',
        url: 'https://member-th.unicity.com/th_order/emailRecice.php',
        dataType: 'json',
        data: data,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function uploadFiletoServer(callback, data) {
    $.ajax({
        type: 'POST',
        url: 'https://member-calls.unicity.com/ALL/uploadNRIC_5MB.php',
        // 'url': 'https://member-sg.unicity.com/uploadNRIC_5MB.php', // point to server-side PHP script
        dataType: 'text', // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        async: false,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function logOrderInsert(callback, data) {
    $.ajax({
        type: 'POST',
        url: 'https://member-th.unicity.com/th_order/log_orderInsert.php',
        dataType: 'json',
        data: data,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

/**
 * Aramex Validator
 */
export function aramexValidator(callback, data) {
    data = JSON.stringify(data)
    $.ajax({
        type: 'POST',
        url:
            'https://member-calls.unicity.com/SGP/SGP_Order_ARAMEX_ValidationV2.asp',
        dataType: 'json',
        data: { strData: data },
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

/**
 * Aramex Validator
 */

//PH pickup Validator
export function phPickupValidator(callback, data) {
    data = JSON.stringify(data)
    $.ajax({
        type: 'POST',
        url: 'https://member-calls.unicity.com/PHL/PHL_Order_Validation.asp',
        dataType: 'json',
        data: { strData: data },
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function orderSGValidator(callback, data) {
    $.ajax({
        type: 'POST',
        url: 'https://member-calls.unicity.com/SGP/SGP_Order_Validation.asp',
        dataType: 'json',
        data: data,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function orderPHValidator(callback, data) {
    data = JSON.stringify(data)
    $.ajax({
        type: 'POST',
        url: 'https://member-calls.unicity.com/PHL/PHL_Order_ValidationV2.asp',
        dataType: 'json',
        data: { strData: data },
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function orderPHValidatorEnroll(callback, data) {
    data = JSON.stringify(data)
    $.ajax({
        type: 'POST',
        url: 'https://member-calls.unicity.com/PHL/PHL_Order_Validation.asp',
        dataType: 'json',
        data: { strData: data },
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function referralAddressPHValidator(callback, data) {
    data = JSON.stringify(data)
    $.ajax({
        type: 'POST',
        url:
            'https://member-calls.unicity.com/PHL/PHL_Referral_Enroll_ValidationV2.asp',
        dataType: 'json',
        data: { strData: data },
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function referralAddressValidator(callback, data) {
    data = JSON.stringify(data)
    $.ajax({
        type: 'POST',
        url: apiURL[getCountryCode()].referralEnrollValidation,
        dataType: 'json',
        data: { strData: data },
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function checkOutPeriod(callback, data) {
    $.ajax({
        type: 'POST',
        url: 'https://member-calls.unicity.com/period.asp',
        dataType: 'json',
        data: data,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function emailSubScribeSGServices(callback, data) {
    $.ajax({
        type: 'POST',
        url: 'https://member-sg.unicity.com/sg_order/emailRecice.php',
        dataType: 'json',
        data: data,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export const uploadUserProfilePicture = (callback, token, media, id) => {
    let data = new FormData()
    const imageTools = new ImageTools()
    console.log(media)
    data.append('media', imageTools.convertToImage(media, id + '.jpg'))
    // data.append('media', imageTools.convertToImage(media, id))
    // data.append('media', new File([media], id, {lastModified: new Date()}))
    $.ajax({
        type: 'POST',
        headers: { Authorization: 'Bearer ' + token },
        url: 'https://hydra.unicity.net/v5a/customers/me/profilePicture',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}
export function validateGovtSGPId(callback, SGPID) {
    var data = {
        strID: SGPID
    }

    $.ajax({
        type: 'POST',
        url: apiURL[getCountryCode()].IdValidation,
        dataType: 'json',
        data: data,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function validateGovId(callback, govID, govBackID) {
    var data = {
        strID: govID,
        backStrID: govBackID
    }

    $.ajax({
        type: 'POST',
        url:
            'https://member-kr.unicity.com/unifoapi/v1/th/validate_address/idcardWithBack',
        dataType: 'json',
        data: data,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function validateDuplicateGovId(callback, taxID) {
    $.ajax({
        type: 'GET',
        url:
            'https://hydra.unicity.net/v5a/customers.js?_httpMethod=HEAD&mainAddress_country=' +
            getCountryCode() +
            '&taxTerms_taxId=' +
            taxID,
        dataType: 'json',
        success: function(result) {
            var dataSet = JSON.stringify(result.meta, undefined, 4)
            var dataSet = dataSet.replace(/-/g, '')
            var obj = JSON.parse(dataSet)
            if (obj.XStatusCode == 200) {
                callback(result, false)
            } else if (obj.XStatusCode == 404) {
                callback(result, true)
            }
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getCommissionStatement(callback, token) {
    $.ajax({
        type: 'GET',
        headers: { Authorization: 'Bearer ' + token },
        url: apiURL.commissionStatement,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}
export function getCommissionsForPeriod(callback, token) {
    $.ajax({
        type: 'GET',
        headers: { Authorization: 'Bearer ' + token },
        url: apiURL.getCommissionData,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}
export function notification(callback, data) {
    $.ajax({
        type: 'POST',
        url: 'https://member-calls.unicity.com/ALL/ALL_Under_Maintenance.asp',
        data: data,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getTranslations(callback, lang) {
    $.ajax({
        type: 'GET',
        async: true,
        url:
            'https://member-kr.unicity.com/unifoapi/v1/global/translations/' +
            lang,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

/**
 *
 * @param {Function} callback
 * @param {String|Array} languagesList
 */
export function getTranslationsList(callback, languagesList) {
    // $.ajax({
    //     type: 'GET',
    //     async: true,
    //     url: `https://member-calls2-kr.unicity.com/dictionary/publish?lang=${languagesList}`,
    //     // 'url': 'https://member-kr.unicity.com/unifoapi/v1/global/translations/getmore?lang=' + languagesList,
    //     success: function(result) {
    //         callback(result, true)
    //     },
    //     error: function(result) {
    //         callback(result, false)
    //     }
    // })
}

//https://member-calls.unicity.com
export function getTripPoint(callback, baid) {
    $.ajax({
        type: 'POST',
        data: { baids: baid },
        url: 'https://member-kr.unicity.com/unifoapi/v1/global/trip/point',
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

//order email confirmation
export function receiveOrderConfirmEmailForPH(
    callback,
    order_id,
    receiveEmail
) {
    $.ajax({
        type: 'POST',
        data: {
            action: 'udReciveMail',
            order_id: order_id,
            emailRC: receiveEmail
        },
        url: 'https://memberph.unicity-easynet.com/globalpay/app.php',
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getProvinceList(callback) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'https://dsc-th.unicity.com/getdata.php?type=getAllProvince',
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getProvinceListHK(callback) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url:
            'https://member-calls.unicity.com/PHL/API/API_DATA/getdataPH.php?type=provinceHK',
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getBanknameList(callback, data) {
    $.ajax({
        type: 'POST',
        url: 'https://member-calls.unicity.com/unipower/api/',
        data: data,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getProvinceSameday(callback) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url:
            'https://member-calls.unicity.com/PHL/API/API_DATA/getdataPH.php?type=provinceSameday',
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getProvinceEighty(callback) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url:
            'https://member-calls.unicity.com/PHL/API/API_DATA/getdataPH.php?type=provinceEighty',
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getBarangayMakati(callback) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url:
            'https://member-calls.unicity.com/PHL/API/API_DATA/getdataPH.php?type=provinceEightyMakati',
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getBarangayMandaluyong(callback) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url:
            'https://member-calls.unicity.com/PHL/API/API_DATA/getdataPH.php?type=provinceEightyMandaluyong',
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getBarangayPasig(callback) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url:
            'https://member-calls.unicity.com/PHL/API/API_DATA/getdataPH.php?type=provinceEightyPasig',
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getBarangayQuezon(callback) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url:
            'https://member-calls.unicity.com/PHL/API/API_DATA/getdataPH.php?type=provinceEightyQuezon',
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getBarangaySanJuan(callback) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url:
            'https://member-calls.unicity.com/PHL/API/API_DATA/getdataPH.php?type=provinceEightySanJuan',
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getBarangayTaguig(callback) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url:
            'https://member-calls.unicity.com/PHL/API/API_DATA/getdataPH.php?type=provinceEightyTaguig',
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function halfdayDeliveryAPI(callback) {
    $.ajax({
        type: 'POST',
        url:
            'https://member-calls.unicity.com/PHL/API/Deliveries/eighty_monitor.php',
        asynce: false,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function eightyDeliveryAPIWP(callback) {
    $.ajax({
        type: 'GET',
        url:
            'https://member-ph.unicity.com/cpanel/wp-admin/admin-ajax.php?action=unimobiapp_get_delivery180',
        asynce: false,
        success: function(result) {
            callback(result, true)
            // console.log(result);
        },
        error: function(result) {
            callback(result, false)
            // console.log(result);
        }
    })
}

export function sameDayDeliveryAPI(callback) {
    $.ajax({
        type: 'POST',
        url:
            'https://member-calls.unicity.com/PHL/API/Deliveries/sameday_api.php',
        asynce: false,
        success: function(result) {
            callback(result, true)
            // console.log(result);
        },
        error: function(result) {
            callback(result, false)
            // console.log(result);
        }
    })
}

export function getCustomerByUrl(callback, fullHrefUrl, token) {
    $.ajax({
        type: 'GET',
        async: false,
        headers: { Authorization: 'Bearer ' + token },
        url: fullHrefUrl,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getAutoOrders(callback, token) {
    $.ajax({
        type: 'GET',
        async: true,
        headers: { Authorization: 'Bearer ' + token },
        url: 'https://hydra.unicity.net/v5a/customers/me/autoorders',
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function enrollAddressValidation(callback, data) {
    data = JSON.stringify(data)
    $.ajax({
        type: 'POST',
        url: apiURL[getCountryCode()].enrollAddressValidation,
        data: { strData: data },
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getFilteredGenealogy(
    callback,
    searchFor,
    level,
    limit,
    startDate,
    endDate,
    paginationUrl
) {
    let url =
        'https://hydra.unicity.net/v5a/customers/{searchFor}/sponsoredCustomersTreePreOrder?expand=autoorders,metricsProfileHistory,profilePicture,autoOrderTemplates&metricsProfileHistory.items&metricsProfileHistory.items.value.pv=0{dateRange}&maxTreeDepth={level}&limit={limit}&searchFor=&who={searchFor}'

    url = url
        .replace('{searchFor}', searchFor)
        .replace('{level}', 99)
        .replace('{limit}', 2000)
        .replace('{searchFor}', searchFor)

    if (startDate !== null && endDate !== null) {
        url = url.replace(
            '{dateRange}',
            '&joinDate=[' +
                startDate.format('YYYY-MM-DD') +
                ';' +
                endDate.format('YYYY-MM-DD') +
                ']'
        )
    } else {
        url = url.replace('{dateRange}', '')
    }
    if (paginationUrl !== undefined && paginationUrl !== null) {
        url = paginationUrl
    }

    $.ajax({
        type: 'GET',
        async: true,
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('customerToken')
        },
        url: url,
        success: function(result) {
            callback(result, true, url)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getDocuments(callback) {
    $.ajax({
        type: 'GET',
        url:
            'https://member-kr.unicity.com/unifoapi/v1/global/documents/' +
            getCountryCode3(),
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getNews(callback, data) {
    $.ajax({
        type: 'POST',
        data: data,
        url: 'https://member-kr.unicity.com/unifoapi/v1/global/news',
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getNewsPH(callback, data) {
    $.ajax({
        type: 'POST',
        data: data,
        url: 'https://member-kr.unicity.com/unifoapi/v1/global/news',
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getNotifications(callback, country) {
    // Get notifications wich was created from ushopAdmin - Announcement menu
    $.ajax({
        type: 'GET',
        async: true,
        url:
            'https://member-calls2.unicity.com/api/unishop/v1/global/notification/' +
            country,
        success: function(result) {
            callback(result, true)
        },
        error: function(err) {
            callback(err, false)
        }
    })
}

export function readNews(callback, id) {
    $.ajax({
        type: 'GET',
        url: 'https://member-kr.unicity.com/unifoapi/v1/global/news/' + id,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getBestSellingProducts(callback) {
    $.ajax({
        type: 'GET',
        url:
            'https://member-kr.unicity.com/unifoapi/v1/global/getbestsellingproducts?country_code=' +
            getCountryCode3(),
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getPHAutoShipProducts(callback) {
    $.ajax({
        type: 'GET',
        async: true,
        url:
            'https://member-calls.unicity.com/PHL/API/products/autoship_service.php',
        success: function(result) {
            var obj = JSON.parse(result)
            callback(obj, true)
        },
        error: function(err) {
            callback(err, false)
        }
    })
}

export function getAutoShipMessage(callback) {
    $.ajax({
        type: 'GET',
        url:
            'https://member-kr.unicity.com/unifoapi/v1/global/miscellaneous/autoship?country=' +
            getCountryCode3(),
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function checkAvailableProducts(callback, products, warehouse) {
    const endpoint =
        'https://member-kr.unicity.com/unifoapi/v1/global/getproductsByItemCodes?items=' +
        products +
        '&country_code=' +
        getCountryCode() +
        '&warehouse=' +
        warehouse

    $.ajax({
        type: 'GET',
        url: endpoint,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getArBalance(
    callback,
    customerHref,
    customerToken,
    coutryCode
) {
    // check AR balance of User
    $.ajax({
        type: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + customerToken
        },
        url: customerHref + '/storecredit/' + coutryCode,
        success: function(resultStore) {
            callback(resultStore.items[0], true)
        },
        error: function(resultStore) {
            $('#credit_result').val(JSON.stringify(resultStore, undefined, 4))
            callback(resultStore, false)
        }
    })
}

/** Get order currency from API.
 * @param {*} callback return result as (result, status).
 * @param {string} market market country code (e.g. SG, AU, NZ).
 * @param {string} shipToCountry ship to country code (e.g. SG, AU, NZ).
 * @param {string} orderId order invoice id.
 */
export function getOrderHistoryCurrency(
    callback,
    market,
    shipToCountry,
    orderId
) {
    const data = {
        market: market,
        shipToCountry: shipToCountry,
        orderId: orderId
    }

    $.ajax({
        type: 'POST',
        url:
            'https://tkvjrct9we.execute-api.ap-southeast-1.amazonaws.com/production',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        data: JSON.stringify(data),
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export const getFavourite = (callback, data) => {
    $.ajax({
        type: 'POST',
        url:
            'https://m6989yt5g4.execute-api.ap-southeast-1.amazonaws.com/Prod/list',
        data: JSON.stringify(data),
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export const setFavourite = (callback, data) => {
    $.ajax({
        type: 'POST',
        url:
            'https://m6989yt5g4.execute-api.ap-southeast-1.amazonaws.com/Prod/add',
        data: JSON.stringify(data),
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export const removeFavourite = (callback, data) => {
    $.ajax({
        type: 'POST',
        url:
            'https://m6989yt5g4.execute-api.ap-southeast-1.amazonaws.com/Prod/delete',
        data: JSON.stringify(data),
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export const autoShipLog = (callback, data) => {
    $.ajax({
        type: 'POST',
        url: 'https://member-calls2-kr.unicity.com/unishop-fn-misc/log',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(data),
        async: true,
        success: function(result, textStatus, request) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export const autoShipSendConfirm = (callback, data) => {
    $.ajax({
        type: 'POST',
        url: 'https://member-calls2-kr.unicity.com/fw/auto_ship',
        data: JSON.stringify(data),
        async: true,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}
export const autoShipSendDeleteConfirm = (callback, data) => {
    $.ajax({
        type: 'POST',
        url: 'https://member-calls2-kr.unicity.com/fw/auto_ship_delete',
        data: JSON.stringify(data),
        async: true,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export const submitWarranty = (callback, data) => {
    $.ajax({
        type: 'POST',
        url: 'https://member-kr.unicity.com/unifoapi/v1/TH/common/warranty/add',
        data: JSON.stringify(data),
        async: true,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}
export const submitWarrantySg = (callback, data) => {
    $.ajax({
        type: 'POST',
        url: 'https://member-kr.unicity.com/unifoapi/v1/SG/common/warranty/add',
        data: JSON.stringify(data),
        async: true,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export const payWithCredit = (callback, data) => {
    $.ajax({
        type: 'POST',
        url:
            getAPIDomain() +
            '/v1/' +
            getCountryCode() +
            '/payment/request/direct',
        data: data,
        async: true,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getGithubCommitData(callback) {
    const auth = btoa('aaeb4e4d749278cddc1957892847fb3baef5519b')
    $.ajax({
        type: 'GET',
        url:
            'https://api.github.com/repos/Unicity/chickendinner/commits?sha=ushop',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + auth)
        },
        success: function(response) {
            callback(response, true)
        },
        error: function(response) {
            callback(response, false)
        }
    })
}

export function getSiteVersion(country, target, callback) {
    const data = {}
    data['source'] = `${country}`
    if (target !== null) data['dist_id'] = `${target}`

    $.ajax({
        type: 'POST',
        url: 'https://member-calls.unicity.com/ALL/ALL_Versions.asp',
        data: { strData: JSON.stringify(data) },
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getBannerFromDatabase(callback) {
    $.ajax({
        type: 'GET',
        url:
            'https://member-kr.unicity.com/unifoapi/v1/global/announces/' +
            getCountryCode3() +
            '?type=banner',
        success: function(response) {
            callback(response, true)
        },
        error: function(response) {
            callback(response, false)
        }
    })
}

export function getBannerFromAws(callback) {
    $.ajax({
        type: 'GET',
        url: `${memberCalls2Url}/banners/activeBanner/${getCountryCode3()}`,
        async: true,
        success: function(response) {
            callback(response, true)
        },
        error: function(response) {
            callback(response, false)
        }
    })
}

export function getBannerV2FromAws(callback, baId, token) {
    let url = `${memberCalls2Url}/bannerV2/banner/public/${getCountryCode3()}`
    if (baId && token) {
        url = `${memberCalls2Url}/bannerV2/banner/public/${getCountryCode3()}?baId=${baId}&token=${token}`
    }

    $.ajax({
        type: 'GET',
        url: url,
        async: true,
        success: function(response) {
            callback(response, true)
        },
        error: function(response) {
            callback(response, false)
        }
    })
}

export function getHealthcheckDetails(callback) {
    $.ajax({
        type: 'GET',
        url:
            'https://member-kr.unicity.com/unifoapi/v1/TH/event/healthcheck_register/quota',
        success: function(response) {
            callback(response, true)
        },
        error: function(response) {
            callback(response, false)
        }
    })
}

export function getUpdateinfoDetails(callback) {
    $.ajax({
        type: 'GET',
        url:
            'https://member-kr.unicity.com/unifoapi/v1/MENA/event/updateinfo/check/108357166',
        success: function(response) {
            callback(response, true)
        },
        error: function(response) {
            callback(response, false)
        }
    })
}

export function getHealthCheckCancel(callback, token) {
    $.ajax({
        type: 'GET',
        url:
            'https://member-kr.unicity.com/unifoapi/v1/TH/event/healthcheck_register/cancel/' +
            token,
        success: function(response) {
            callback(response, true)
        },
        error: function(response) {
            callback(response, false)
        }
    })
}

export function getWarrantyDetails(callback, serial) {
    $.ajax({
        type: 'POST',
        url:
            'https://member-kr.unicity.com/unifoapi/v1/TH/common/warranty/list',
        data: serial,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}
export function getWarrantyDetailsSg(callback, serial) {
    $.ajax({
        type: 'POST',
        url:
            'https://member-kr.unicity.com/unifoapi/v1/SG/common/warranty/list',
        data: serial,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function submitHealthcheck(callback, serial) {
    $.ajax({
        type: 'POST',
        url:
            'https://member-kr.unicity.com/unifoapi/v1/TH/event/healthcheck_register/create',
        data: serial,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function submitUpdateinfo(callback, serial) {
    $.ajax({
        type: 'POST',
        url:
            'https://member-kr.unicity.com/unifoapi/v1/MENA/event/updateinfo/update/108357166',
        data: serial,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function snapshotGenealogy(callback, html) {
    $.ajax({
        url:
            'https://hc4k4pft2g.execute-api.ap-southeast-1.amazonaws.com/snapshotgenealogy',
        type: 'POST',
        data: JSON.stringify({
            html: html
        }),
        contentType: 'application/json',
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getProfileCart(callback, id) {
    var data = {
        action: 'getCartProfile',
        profile_id: id
    }

    data = JSON.stringify(data)

    $.ajax({
        type: 'POST',
        url: 'https://member-calls.unicity.com/shopprofile/api/shopprofile.php',
        data: { strData: data },
        async: 'false',
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function newReferralAddressValidator(callback, data) {
    data = JSON.stringify(data)
    $.ajax({
        type: 'POST',
        url: apiURL[getCountryCode()].newReferralEnrollValidation,
        dataType: 'json',
        data: { strData: data },
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getCustomerDetails(callback, id) {
    const expand =
        'metricsProfile,metricsProfileHistory,profilePicture,achievementsHistory,cumulativeMetricsProfile'
    Raven.getCustomerExpand(id, expand)
        .then(response => {
            callback(response, true)
        })
        .catch(response => {
            callback(response, false)
        })
}

export const APIShopProfile = {
    List(callback, countryCode, id) {
        const data = {
            country_code: countryCode,
            member_id: id
        }
        post(API.shopprofile.list, JSON.stringify(data), callback)
    },
    Add(callback, data) {
        post(API.shopprofile.add, JSON.stringify(data), callback)
    },
    Get(callback, id) {
        get(`${API.shopprofile.get}/${id}`, callback)
    },
    Delete(callback, id) {
        get(`${API.shopprofile.delete}/${id}`, callback)
    },
    Update(callback, data, id) {
        post(`${API.shopprofile.update}/${id}`, JSON.stringify(data), callback)
    },
    CheckDuplicate(callback, data) {
        post(
            `${API.shopprofile.checkDuplicate}`,
            JSON.stringify(data),
            callback
        )
    },
    DownlineValidator(callback, data) {
        post(
            `${API.shopprofile.downlineValidator}`,
            JSON.stringify(data),
            callback
        )
    }
}

export const APIReferralCode = {
    Get(callback, id) {
        get(`${API.referralCode.get}/${id}`, callback)
    },
    Validate(callback, code) {
        get(`${API.referralCode.validate}/${code}`, callback)
    }
}

export const getSuggesstion = (callback, id) => {
    $.ajax({
        url: `${API.product.getSuggesstion.replace('{id}', id)}`,
        type: 'GET',
        success: result => {
            callback(result, true)
        },
        error: result => {
            callback(result, false)
        }
    })
}
export const getTopCategories = (callback, countryCode3, warehouse) => {
    //
    $.ajax({
        url: `https://member-kr.unicity.com/unifoapi/v1/global/getRandomThreeOfBestselling?country_code=${countryCode3}&warehouse=${warehouse}`,
        type: 'GET',
        success: result => {
            callback(result, true)
        },
        error: result => {
            callback(result, false)
        }
    })
}
export const postTo2c2p = (callback, data) =>
    post(API.directPayment.url, data, callback)

export const socialConnects = (
    callback,
    type,
    facebookToken,
    href,
    customerToken
) =>
    post(
        `${href}/loginAssociations`,
        JSON.stringify({
            type: type,
            value: `410750649771672:${facebookToken}`
        }),
        callback,
        {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + customerToken
        }
    )

export const loginWithFacebook = (callback, type, facebookToken) =>
    post(
        apiURL.loginTokens,
        {
            namespace: 'https://hydra.unicity.net/v5a/customers',
            type: type,
            value: `410750649771672:${facebookToken}`
        },
        callback
    )

export function sendTokenId(callback, userId, tokenId, countryCode) {
    const data = JSON.stringify({
        user_id: userId,
        token_id: tokenId,
        country_code: countryCode
    })
    $.ajax({
        type: 'POST',
        //'url': 'https://4883kvx1d8.execute-api.eu-central-1.amazonaws.com/dev/addNewToken/',
        url:
            'https://uhaoyaw7ab.execute-api.ap-southeast-1.amazonaws.com/dev/addtokenid/',
        dataType: 'json',
        data: data,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export const checkTerminatedAccountByGovId = (callback, govId) =>
    post(
        apiURL.TH.checkTerminatedAccountByGovId,
        JSON.stringify({ gov_id: govId }),
        callback
    )

export const validateFromTerminated = (callback, data) =>
    post(apiURL.TH.validateFromTerminated, JSON.stringify(data), callback)

export const paymentFromTerminated = (callback, reference_id) =>
    post(
        apiURL.TH.paymentFromTerminated,
        JSON.stringify({ reference_id: reference_id }),
        callback
    )

export const getLSB = (callback, dist_id) =>
    post(apiURL.lsb, { dist_id: dist_id }, callback)

export const isLinkedSocial = (callback, href, customerToken) => {
    $.ajax({
        type: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + customerToken
        },
        url: href,
        success: function(res) {
            callback(res, true)
        },
        error: function(res) {
            callback(res, false)
        }
    })
}
export const unlinkSocial = (callback, href, data, customerToken) => {
    $.ajax({
        type: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + customerToken
        },
        url: href,
        data: JSON.stringify(data),
        success: function(res) {
            callback(res, true)
        },
        error: function(res) {
            callback(res, false)
        }
    })
}

export const getCumulativeMetricsProfile = (callback, customerToken, href) => {
    $.ajax({
        type: 'GET',
        async: true,
        // 'headers': { 'Content-Type': 'application/json', 'Authorization': 'Bearer th_batch_import:VpmnhMjXTQ2TnSqYZZqSNZZd4ku3ZwacxkncwwMr' },
        headers: { 'Content-Type': 'application/json' },
        url: href,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export const getDataByHref = (callback, href, customerToken) => {
    $.ajax({
        type: 'GET',
        async: true,
        headers: { Authorization: 'Bearer ' + customerToken },
        url: href,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}
export const getSeminarTemplate = (callback, userId, userCountryCode) => {
    $.ajax({
        type: 'GET',
        async: true,
        headers: { Authorization: 'Bearer tVxbmKcjme' },
        url:
            'https://member-calls2-kr.unicity.com/seminar/get/' +
            userId +
            '?country_code=' +
            userCountryCode,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}
export const orderTerms = (callback, data) => {
    /* Raven.getOrderCalc(data)
    .then(response => {
        callback(response, true)
    })
    .catch(response => {
        callback(response, false)
    }) */

    data.order.notes = 'ushop|'
    $.ajax({
        type: 'POST',
        headers: { 'Content-Type': 'application/json' },
        url: 'https://hydra.unicity.net/v5a/orderTerms?expand=item',
        data: JSON.stringify(data),
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export const uni_im_API = {
    create(callback, url, token = 'a0b4a554063906067ad12dd420191111') {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
        post(
            'https://uni.im/admin/create',
            JSON.stringify({ fullUrl: url, expires: 'never' }),
            callback,
            headers
        )
    }
}

export function getMarketingArtworks(callback) {
    $.ajax({
        type: 'GET',
        url:
            'https://member-calls2-kr.unicity.com/unishop-fn-misc/key_value/th_marketing_artworks2',
        success: function(response) {
            callback(response, true)
        },
        error: function(response) {
            callback(response, false)
        }
    })
}

export function getMarketingArtworksCustomer(callback) {
    $.ajax({
        type: 'GET',
        url:
            'https://member-calls2-kr.unicity.com/unishop-fn-misc/key_value/th_marketing_artworks_customer',
        success: function(response) {
            callback(response, true)
        },
        error: function(response) {
            callback(response, false)
        }
    })
}

export function getUshopCountry(callback) {
    $.ajax({
        type: 'GET',
        url:
            'https://member-calls2-kr.unicity.com/unishop-fn-misc/key_value/ushop_online_country',
        success: function(response) {
            callback(response, true)
        },
        error: function(response) {
            callback(response, false)
        }
    })
}

export function signedDate(callback) {
    $.ajax({
        type: 'GET',
        url: API.PH.SIGNED_DATE_URL,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}
export function createCheckSumTW(callback, data) {
    $.ajax({
        type: 'POST',
        url: API.TW.Create_CheckSum,
        data: data,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getItemInCart(callback, customerID, token, dev) {
    $.ajax({
        type: 'GET',
        url: `https://member-calls2${dev}.unicity.com/remoteStorage/cart/${customerID}/tha/shopping/?token=${token}`,
        success: function(response) {
            callback(response, true)
        },
        error: function(response) {
            callback(response, false)
        }
    })
}

export function getOptionShareCart(callback) {
    $.ajax({
        type: 'GET',
        url:
            'https://member-calls2-kr.unicity.com/unishop-fn-misc/key_value/ulink_qrcode_options',
        success: function(response) {
            callback(response, true)
        },
        error: function(response) {
            callback(response, false)
        }
    })
}

export function sendRenewal(callback, language, token, baId, customerHref) {
    let today = moment()
    let expire = moment(today)
        .add(1, 'days')
        .toISOString()

    const data = {
        payload: {
            token: token,
            baId: baId,
            customerHref: customerHref,
            language: language
        },
        expire: expire
    }

    $.ajax({
        type: 'POST',
        url: 'https://member-calls2-kr.unicity.com/remoteStorage/broker',
        headers: {
            Authorization:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzaG9wLXdlYnNpdGUiLCJpYXQiOjE2MDA3NjU2NTF9.OX0nVLGPex8HdkVDOn4ikwdSHNf_OIO9I0az7JSPa2o',
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        data: JSON.stringify(data),
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getPointSeminars(callback, baId) {
    const country_code = getProductCountryCode3()
    $.ajax({
        type: 'get',
        url: `https://member-calls2-kr.unicity.com/unishop-fn-misc/seminar/get/${baId}`,
        data: country_code,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export function getVirginTransportTracking(callback, orderId) {
    const country_code = getCountryCode()
    $.ajax({
        type: 'get',
        url: `https://member-kr.unicity.com/unifoapi/v1/${country_code}/payment/virgin_transport/tracking/${orderId}`,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}


export const getSponsorName = (callback, id) => {

    $.ajax({
        type: 'get',
        url: `https://hydra.unicity.net/v5a/customers?unicity=${id}&expand=customer`,
        success: function(result) {
            callback(result, true)
        },
        error: function(result) {
            callback(result, false)
        }
    })
}

export const getSponsor = async id => {
    const url = `https://hydra.unicity.net/v5a/customers?unicity=${id}&expand=customer`
    try {
        const result = await _get(`${url}`, {}, {})
        if (result.items.length === 1)
            return result.items[0].humanName['fullName@ko']
    } catch (err) {}

    return undefined
}

export const loadAgreementAsync = async ({ url, token }, cb) => {
    let agreement = false

    try {
        const res = await _get(
            `${encodeURI(url)}`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            }
        )

        if (res) {
            try {
                let checkline = res.rights
                let counter = 0
                for (var i in res.rights) {
                    if (res.rights[i].type == 'Order') counter = 1
                }
                if (counter == 1) agreement = true
            } catch (err) {}
        }
    } catch (err) {}

    return agreement
}

export const getMember = async ( id, token ) => {
    const url = `https://member-kr.unicity.com/unifoapi/v1/KR/payment/getDownmember/${id}`
    try {
        const result = await _get(`${url}`, {token:token}, {})

        if (result) {
            try {
                //if (result.type === 'WholesaleCustomer') return undefined
                const _id = result.sponsor.id.unicity

                if (String(_id) ) {
                    return result;
                }


            } catch (err) {
                console.log('err : ', err)
            }
        }
    } catch (err) {}

    return undefined
}
