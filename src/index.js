import './Precompiled'
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import App from './App'
import { observer } from 'mobx-react-lite'
import { StorageExtend } from '@Utils/StorageManager'
import { isSomething } from '@Utils/Utils'
import { lowerCase } from '@Utils/String'
import md5 from 'crypto-js/md5'
import { getParameterByName } from '@Configs/ConfigsHeader'

//ie 11
import "@babel/polyfill";
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';


sessionStorage.removeItem('menu')
sessionStorage.removeItem('menuGroupA-desktop')
sessionStorage.removeItem('menuGroupA-mobile')
sessionStorage.removeItem('menuGroupB-desktop')
sessionStorage.removeItem('menuGroupB-mobile')

const WebSkeleton = styled.div`
    width: ${window.innerWidth}px;
    height: ${window.innerHeight}px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Root = observer(props => {

    const [webReady, setWebReady] = useState(false)
    const [showCountryPortal, setShowCountryPortal] = useState(null)

    function checkForceClear() {
        try {
            // -- Versioning for Developers --
            const VERSION_DEV = md5('1.6.0').toString()
            const clearStorageThenSetVersion = () => {
                console.log(
                    '%cForced clean storage.',
                    'font-weight: bold; color: red;'
                )
                localStorage.clear()
                sessionStorage.clear()
                StorageExtend.set(VERSION_DEV, 'development.version')
                window.location.reload()
                throw 'reload'
            }
            const preVersionDev = StorageExtend.get('development.version')
            if (isSomething(preVersionDev)) {
                if (preVersionDev !== VERSION_DEV) {
                    clearStorageThenSetVersion()
                }
            }
            const versionStr = ''.concat(
                '——————————————————————————————————————————————————'
            )
            console.log('%c' + versionStr, 'font-weight: bold; color: blue;')
            if (process.env.NODE_ENV === 'development') {
                console.log(
                    '%cEnvironment: ' + process.env.NODE_ENV,
                    'font-weight: bold; color: red;'
                )
            } else {
                console.log(
                    '%cEnvironment: ' + process.env.NODE_ENV,
                    'font-weight: bold; color: green;'
                )
            }
            // ----------------------------------
        } catch (error) {
            if (error === 'string') {
                throw '- Found new development version, reload is required.'
            }
        }
    }

    useEffect(() => {
        checkForceClear()

        if (getParameterByName('language')) {
            sessionStorage.setItem(
                'redirect-language',
                getParameterByName('language')
            )
        }

        if (/\?autoLogin=/.test(window.location.search)) {
            setWebReady(true)
            setShowCountryPortal(false)
        } else {
            document.title = `CYWORD`
            StorageExtend.set(
                lowerCase('korea'),
                'development.memoized-country'
            )
            setWebReady(true)
        }
    }, [])

    return webReady ? (
        <App {...props} showCountryPortal={showCountryPortal} />
    ) : (
        <WebSkeleton></WebSkeleton>
    )
})

ReactDOM.render(<Root />, document.getElementById('root'))
