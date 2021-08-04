import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { logsys, loge } from "./PikaLog";
import { devTools, staticFooter } from "../../stores/MainStore";
import { isProduction, getProductCountryCode3, getPaymentGatewayConfig, decimalController } from "../GlobalHelpers";
import { getBowserBrowser, getBrowserOS, getBrowserPlatform } from "./Bowser";

const getBothLanguage = o => {
    return { English: o.english, Native: o.native }
}

const InfoLog = observer(props => {
    useEffect(() => {
        try {
            if (devTools.isShowInfoLog) {
                logsys('General Configs', {
                    'Production?': isProduction() ? 'Yes' : 'No',
                    //'Footer Database ': getCountryStaticFooter(),
                    //'Footer V2': getCountrySpecialFooter(),
                    'Products Database': getProductCountryCode3(),
                    'Payment Gateways': getPaymentGatewayConfig()
                })
                
                logsys('Static Footer', {
                    'Maintenance': getBothLanguage(staticFooter.footerGeneral.maintenance),
                    'Currency Code': getBothLanguage(staticFooter.footerGeneral.currency_code),
                    'Warehouse': getBothLanguage(staticFooter.footerGeneral.warehouse),
                    'Cart Limit Qty': getBothLanguage(staticFooter.footerOrder.cart_limit_qty),
                    'Cart Limit Price': getBothLanguage(staticFooter.footerOrder.cart_limit_price),
                    'Decimal Controller': getBothLanguage(staticFooter.footerGeneral.decimal_controller),
                    //'Test Maintenance': {English: this.isMaintenanceMode(), Native: ''},
                    'Test Numeral Format': {English: 1399.99 + ' => ' + decimalController(1399.99, 'english'), Native: ''},
                })
    
                let info = {}
                Object.assign(info, {'Browser': getBowserBrowser() })
                Object.assign(info, {'OS': getBrowserOS() })
                Object.assign(info, {'Platform': getBrowserPlatform() })
                logsys('Bowser', info)
            }
        } catch(error) {
            loge('Please check InfoLog component.\n>', error.message)
        }
    }, [])

    return null
})

export default InfoLog