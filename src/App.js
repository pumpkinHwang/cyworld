import { useEffect } from 'react'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { configure } from 'mobx'
import { SESSION_TIMEOUT, SESSION_TIMESTAMP_KEY } from '@Config'
import {
    store,
    devTools
} from '@Stores/MainStore'
import {
    checkHost,
    getDevelopmentID
} from '@GlobalHelpers'

import { defaults, isSomething, someOf, toBool } from '@Utils/Utils'
import { logn, loge, logi, logw } from '@Utils/PikaLog'
import loadable from '@loadable/component'
import { useBowser } from './components/utils/Bowser'
import { storeBowser } from '@Stores/StoreBowser'
import { getQueryString, hasQueryString } from '@Configs/ConfigsHeader'
import Redirect from '@Components/Redirect'
import mobiscroll from '@mobiscroll/react'
import { Layout } from '@Uflex'
import { StorageExtend } from '@Utils/StorageManager'
import { storeAPI } from '@Stores/StoreAPI'
import delay from 'lodash/delay'
import { configResponsive } from 'ahooks'
import StoreCountry from '@Stores/StoreCountry'
import { first, last, lowerCase } from 'lodash'

configure({
    enforceActions: 'never'
})

mobiscroll.settings = {
    theme: 'ios',
    themeVariant: 'light'
}

const App = observer(props => {
    const localStore = useLocalObservable(() => ({
        isLoading: true
    }))

    // * -----------------------
    // * START -> Bowser
    const detector = useBowser()

    useEffect(() => {
        if (detector) {
            storeBowser.model = detector.model
            storeBowser.type = detector.type
            storeBowser.os = detector.os
        }
    }, [detector])
    // * END <- Bowser
    // * -----------------------

    useEffect(() => {
        logn(
            `Host: [${checkHost()}] | DEV-ID: [${defaults(
                getDevelopmentID(),
                'None'
            )}]`
        )

        if (props.showCountryPortal) {
            //
        } else {
            // Forced reloading after not reponsed for 40 seconds.
            const timeoutForceReload = 40
            delay(() => {
                if (localStore.isLoading) {
                    localStorage.clear()
                    sessionStorage.clear()
                    window.location.reload()
                    throw `Reloading: App was not responsed after ${timeoutForceReload} seconds.`
                } else {
                    logw(
                        `Timeout Reached ${timeoutForceReload}s: No need forced reloading...`
                    )
                }
            }, timeoutForceReload * 1000)

            // delay(() => {
            //     logw('Timeout Reached 60s: Init GA and Pixel...')

            //     let GACode =
            //         StoreCountry.GACode[lowerCase(StoreCountry.country.country)]
            //     let GACodeAll = 'UA-119346265-7'
                
            //     // * START -> Google Analytics
            //     ReactGA.initialize([
            //         {
            //             trackingId: GACodeAll,
            //             debug: false
            //         },
            //         {
            //             trackingId: GACode,
            //             gaOptions: {
            //                 name: lowerCase(StoreCountry.country.country)
            //             },
            //             debug: false
            //         }
            //     ])
            //     ReactGA.pageview(
            //         window.location.pathname + window.location.search
            //     )
            //     ReactGA.ga(
            //         lowerCase(StoreCountry.country.country) + '.send',
            //         'pageview',
            //         { page: window.location.pathname + window.location.search }
            //     )
            //     // * END -> Google Analytics
                
            // }, 60 * 1000)

            // ** Delared resposive breakpoints.
            configResponsive({
                xs: 0,
                sm: 576,
                md: 768,
                lg: 992,
                xl: 1200,
                xxl: 1600
            })
        }

        // Simulate Maintenance
        if (hasQueryString('mtn') || hasQueryString('maintenance')) {
            devTools.isSimulateMaintenance = true
        }
        // Reveal dictionary keys
        if (
            hasQueryString('dic') ||
            hasQueryString('dict') ||
            hasQueryString('dictionary')
        ) {
            devTools.isShowDictionaryLabel = true
        }
        // Enable Development Log on Production stage
        if (hasQueryString('log')) {
            devTools.isShowDevLog = true
        }

        window.document.addEventListener('message', function (e) {
            if (window.ReactNativeWebView !== undefined) {
                localStorage.setItem('isWebview', true)
                store.isWebview = true
                store.latestWebview = true
            }
        })
        // this is working on iOS
        window.addEventListener('message', function (e) {
            if (window.ReactNativeWebView !== undefined) {
                localStorage.setItem('isWebview', true)
                store.isWebview = true
                store.latestWebview = true
            }
        })

        if (hasSessionTimeout()) {
            setCustomSessionTimestamp()
        } else {
            StorageExtend.set(
                new Date().getTime(),
                `development.${SESSION_TIMESTAMP_KEY}`
            )
        }
        function hasSessionTimeout() {
            return (
                isSomething(getQueryString().sessionTimeout) &&
                !isNaN(parseFloat(getQueryString().sessionTimeout))
            )
        }
        function setCustomSessionTimestamp() {
            const customTimestamp =
                new Date().getTime() -
                (SESSION_TIMEOUT -
                    parseFloat(getQueryString().sessionTimeout) * 1000 * 60)
            StorageExtend.set(
                customTimestamp,
                `development.${SESSION_TIMESTAMP_KEY}`
            )
            const now = new Date()
            now.setTime(customTimestamp)
            logn(`⏱ SET SESSION TIMESTAMP = ${now.toLocaleString()}`)
        }

        localStore.isLoading = false
    }, [])

    

    return (
        <Layout h100={props.showCountryPortal}>
            {(() => {
                
                if (localStore.isLoading || storeAPI.login.isRedirecting) {
                    return <Redirect />
                } else {
                    return <DynamicAclWrapper />
                }
            })()}
        </Layout>
    )
})


const DynamicAclWrapper = loadable(
    () => import('./components/acl/AclWrapper'),
    { fallback: <Redirect /> }
)

export default App
