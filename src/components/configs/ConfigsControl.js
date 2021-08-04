import { SectionsDeclaration } from './Sections';
import { isBoolean, defaults, isString, someOf, isNothing } from '@Utils/Utils';
import StoreAuth from '@Stores/User/StoreAuth';
import ShippingMethods from './ShippingMethods';
import StoreUser from '@Stores/User/StoreUser';

export const accessConfig = (page, key) => {
    let acceptedResult = false
    const conf = SectionsDeclaration[page]()[key]

    if (isNothing(conf)) {
        throw `Please check key '${key}' - it could not be found.`
    }

    const checkLogin = (config) => {
        const confStatus = accessConfigStatus(config)
        if (config.login === true) {
            if (StoreAuth.isAuthorized) {
                return confStatus
            } else {
                return false
            }
        } else {
            return confStatus
        }
    }

    const checkShipping = (config) => {
        const confShipping = accessConfigShipping(config)
        if (confShipping) {
            return confShipping
        } else {
            return undefined
        }
    }

    if (isBoolean(conf)) {
        acceptedResult = conf
    } else {
        if (conf) {
            if (isString(conf)) {
                acceptedResult = conf
            } else {
                acceptedResult = defaults(checkShipping(conf), acceptedResult)
                acceptedResult = defaults(checkLogin(conf), acceptedResult)
            }
        }
    }

    return acceptedResult
}

export const accessConfigStatus = (conf) => {
    if (conf.status) {
        let isAcceptedStatus = false
        const allow = conf.status.allow
        const except = conf.status.except
        if (allow) {
            if (someOf(StoreUser.getShortStatus(), allow)) {
                isAcceptedStatus = true
            }
        } else {
            isAcceptedStatus = true
        }
        if (except) {
            if (someOf(StoreUser.getShortStatus(), except)) {
                isAcceptedStatus = false
            }
        }
        return isAcceptedStatus
    }
}

export const accessConfigShipping = (conf) => {
    if (conf.shipping) {
        let isAcceptedShipping = false
        const allow = conf.shipping.allow
        const except = conf.shipping.except
        if (allow) {
            if (someOf(ShippingMethods.getShippingType(), allow)) {
                isAcceptedShipping = true
            } else {
                isAcceptedShipping = false
            }
        }
        if (except) {
            if (someOf(ShippingMethods.getShippingType(), except)) {
                isAcceptedShipping = false
            } else {
                isAcceptedShipping = true
            }
        }
        return isAcceptedShipping
    } else {
        return false
    }
}