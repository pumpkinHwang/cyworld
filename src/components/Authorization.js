import { useEffect } from 'react'
import { reaction } from 'mobx'
import { isSomething, isNothing, someOf } from '@Utils/Utils'
import { getQueryString } from '@Configs/ConfigsHeader'
import StoreAuth from '@Stores/User/StoreAuth'
import get from 'lodash/get'
import StoreCountry from '@Stores/StoreCountry'

const optionsReaction = { fireImmediately: true }

/** Applied the authorize reactions to component.
 * The process begin after acknowledge the login type.
 */
export const useAuthorization = () => {
    /** Query string params for auto-login. */
    const { autoLogin: qsToken } = getQueryString()

    useEffect(() => {
        /** Watch login type to decide the login process after acknowlege.
         * Set auto-login token or restore user. */
        reaction(
            () => StoreAuth.loginType,
            (type, pType, rType) => {
                if (type && isNothing(pType)) {
                    if (StoreAuth.isAutoLogin) {
                        // start a request for required data of user
                        requestCustomer(qsToken)
                            .then(response => {
                                if (get(response, 'data.payload', false)) {
                                    const { baId, token } = get(
                                        response,
                                        'data.payload'
                                    )
                                    processAutoLogin(
                                        baId,
                                        token,
                                        StoreCountry.Country3
                                    )
                                } else {
                                    failed(response)
                                }
                            })
                            .catch(error => {
                                failed(error)
                            })
                    } else {
                        // try to restore the current user
                        requestSessionRestore()
                    }
                    // destroy this reaction
                    rType.dispose()
                }
            },
            optionsReaction
        )

        // Decide type of login
        if (isSomething(qsToken)) {
            // The query string for auto-login is exist
            StoreAuth.setLoginToAuto()
        } else {
            // No auto-login
            StoreAuth.setLoginToNormal()
        }
    }, [])

    const failed = reason => {
        console.error('Auto-login colud not be done:', reason)
        StoreAuth.setAutoLoginStatus('failed')
        StoreAuth.isInitilized = true
    }
}