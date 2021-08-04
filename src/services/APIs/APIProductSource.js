import Raven from '@Raven'
import { Country } from '@Configs/Country'

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

export const ALLOW_OPTIONS = {
    SHOP: 'shop',
    UNIPOWER: 'unipower',
    UNROLL: 'enroll',
    CS: 'cs',
    AS: 'as'
}

export const getProductSource = (isHydra, priceLevel, warehouse) => {
    const url = 'https://member-kr.unicity.com/unifoapi/v1/global/getproducts'
    const params = {
        country_code: Country.getCode3()
    }

    if (warehouse) { 
        params.warehouse = warehouse
    }

    if (isHydra === false) {
        params.secret = 'yes'
        params.price_level = priceLevel
    }

    return Raven.get(url, params)
}

export const getProductSourceV2 = ({ status, allow }) => {
    const country_code = 'KOR'
    const url = `${memberCalls2Url}/products-v2/publish/${country_code}`
    const params = {
        allow,
        status
    }

    return Raven.get(url, params)
}
