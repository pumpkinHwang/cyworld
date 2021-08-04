import * as Address from './Address'
import * as Payment from './Payment'
import * as ShippingDetails from './ShippingDetails'
import { ShippingMethods } from './ShippingMethods'
import * as Store from './Store'
import { Country } from './Country'

import { getFooterLanguageControl, isLanguageNative } from '../GlobalHelpers'
import { deepFreeze, isAcknowledge, defaults, isNothing } from '../utils/Utils'
import {
    throatStage,
    throatBoolean,
    throatString,
    throatObject,
    throatArray,
    throatAllCustom
} from './ConfigsHeader'
import { getCustomerCountryCode, isCustomerLogin } from '../utils/Customer'

/* ----------------------------------------------------------------------------------- */
/* Concepts: [1] Functions in an Object. [2] Freeze data to prevent unattended change. */
/* ----------------------------------------------------------------------------------- */

export default class Configs {
    static isInit = false
    static init = () => {
        if (Configs.isInit === false) {
            // init every configs into immutable object
            AddressConfigs.init()
            APIConfigs.init()
            AppsConfigs.init()
            PaymentConfigs.init()
            ShippingDetailsConfigs.init()
            StoreConfigs.init()
            Configs.isInit = true
        }
    }
}

// Apps
export const AppsConfigs = {
    /* init()                  { deepFreeze(Apps) },
    URL()                   { return throatStage(Apps.URL) }, */
}

// API
export const APIConfigs = {}

// Store
export const StoreConfigs = {
    init() {
        deepFreeze(Store)
    },
    FacebookMessenger() {
        return throatString(Store.FacebookMessenger)
    },
    EasyShop() {
        return throatBoolean(Store.EasyShop)
    },
    NewPassword() {
        return throatString(Store.NewPassword)
    }
}

// Address
export const AddressConfigs = {
    init() {
        deepFreeze(Address)
    },
    DefaultCity() {
        return Address.DefaultCity[Country.getPath()]
    },
    AddressBook() {
        const l = Address.AddressBook.Local()
        const g = Address.AddressBook.Global()
        if (isCustomerLogin()) {
            const c = getCustomerCountryCode()
            if (isAcknowledge(c)) {
                const allLocal = throatAllCustom(Country.getPath(), l, false)
                const allGlobal = throatAllCustom(
                    Country.getPathByCode2(c),
                    g,
                    false
                )
                const isLocalUse = throatBoolean(l) && allLocal === true
                const isGlobalUse = throatBoolean(g) && allGlobal === true
                //logi(`AddressBook: Local > ${isLocalUse} | Global > ${isGlobalUse}`)
                // check local first then check global
                return isLocalUse ? isGlobalUse : false
            }
        }
        //logi(`AddressBook: Local > ${throatBoolean(l)} | Global > [NO-CUSTOMER]`)
        return throatBoolean(l)
    },
    EmailEdit() {
        const l = Address.EmailEdit.Local()
        const g = Address.EmailEdit.Global()
        if (isCustomerLogin()) {
            const c = getCustomerCountryCode()
            if (isAcknowledge(c)) {
                const allLocal = throatAllCustom(Country.getPath(), l, false)
                const allGlobal = throatAllCustom(
                    Country.getPathByCode2(c),
                    g,
                    false
                )
                const isLocalUse = throatBoolean(l) && allLocal === true
                const isGlobalUse = throatBoolean(g) && allGlobal === true
                //logi(`EmailEdit: Local > ${isLocalUse} | Global > ${isGlobalUse}`)
                // check local first then check global
                return isLocalUse ? isGlobalUse : false
            }
        }
        //logi(`EmailEdit: Local > ${throatBoolean(l)} | Global > [NO-CUSTOMER]`)
        return throatBoolean(l)
    }
}

// Shipping Details
export const ShippingDetailsConfigs = {
    init() {
        deepFreeze(ShippingDetails)
    },
    DeliveryNote(shipping) {
        const note = throatString(ShippingDetails.DeliveryNote)
        if (isNothing(note)) {
            return ''
        } else {
            if (isNothing(note[shipping])) {
                return ''
            } else {
                return note[shipping]
            }
        }
    }
}

// Shipping Methods
export const ShippingMethodsConfigs = {
    init() {
        deepFreeze(ShippingMethods)
    },
    WarehouseEnabled: ShippingMethods.getWarehouseEnabled,
    WarehouseAcceptance: ShippingMethods.getWarehouseAcceptance,
    ShippingAcceptance: ShippingMethods.getShippingAcceptance
}

// Payment Gateways
export const PaymentConfigs = {
    init() {
        deepFreeze(PaymentConfigs)
    },
    TermsAndConditions() {
        let data = throatObject(Payment.TermsAndConditions)[
            getFooterLanguageControl()
        ]
        if (isNothing(data) && isLanguageNative())
            data = throatObject(Payment.TermsAndConditions)['english']
        return defaults(data, '')
    },
    MerchantIDforOCBC() {
        return throatStage(throatObject(Payment.MerchantID.ocbc))
    },
    MerchantIDforOCBCExpress() {
        return throatStage(throatObject(Payment.MerchantID.ocbcExpress))
    },
    MerchantIDForECPay() {
        return throatStage(throatObject(Payment.MerchantID.ecpay))
    }
}

/** Country configs. */
export const CountryConfigs = {
    init() {
        deepFreeze(Country)
    },
    /** Get country code as ISO 3166-1 alpha-2 code. (e.g. **TH**, **AU**, **NZ**) */
    CountryCode(lowerCase = false) {
        const r = throatString(Country.CountryCode)
        return lowerCase ? r.toLowerCase() : r
    },
    /** Get country code as ISO 3166-1 alpha-3 code. (e.g. **JPN**, **AUS**, **NZL**) */
    CountryCode3(lowerCase = false) {
        const r = throatString(Country.CountryCode3)
        return lowerCase ? r.toLowerCase() : r
    },
    /** Get a beautiful output of country. Can be translated into native version. (e.g. **ประเทศไทย**, **Indonesia**, **New Zealand** */
    CountryFullDisplay() {
        return throatString(Country.CountryFullDisplay)
    },
    /** Get a lowercase with non-space output of country. (e.g. **thailand**, **indonesia**, **newzealand**) */
    CountryFull() {
        return throatString(Country.CountryFull)
    },

    CountryCurrency() {
        return throatString(Country.CountryCurrency)
    },

    /** */
    DialingCode() {
        return throatString(Country.DialingCode)
    },

    OfflineProduction() {
        return throatBoolean(Country.CountryOfflineProduction)
    }
}
