import React, { useState, useEffect } from 'react'
import { Router, Switch, Route, Redirect, useLocation } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { reaction } from 'mobx'
import _ from 'lodash'
import { store } from '@Stores/MainStore'
import { storeElement } from '@Stores/StoreElement'
import { storeAPI } from '@Stores/StoreAPI'
import history, { storeHistory } from '../History'
import Header from '../Header/Header'
import Sidebar from '../Sidebar'
import Home from '../Home/Home'
import MediaCache from './MediaCache'

import { SESSION_TIMEOUT, SESSION_TIMESTAMP_KEY } from '@Config'
import { logn } from '@Components/utils/PikaLog'
import { StorageExtend } from '@Utils/StorageManager'

import { Content, Footer } from '@Uflex'
import loadable from '@loadable/component'
import classnames from 'classnames'
import Notice from '@Pages/Notice'
import NoticeDetail from '@Pages/Notice/NoticeDetail'
import FAQ from '@Pages/FAQ'

const AclWrapper = observer(props => {
    const [state, setState] = useState({
        menuHide: false
    })
    useEffect(() => {
        // Prepare storeHistory after its initialized.
        reaction(
            () => storeHistory.isInitialized, 
            (init, pInit, reaction) => {
                const location = window.location.pathname
                const splitedLocation = location.split('/')
                const basePath = splitedLocation[1]
                const startPath = ''
                if (init === true && pInit === undefined) {
                    storeHistory.setPevLocation = { pathname: startPath }
                    storeHistory.setLocation = { pathname: startPath }
                    reaction.dispose()
                }
            },
            { fireImmediately: true }
        )
    }, [])

    const showMenu = () => {
        store.navigator.display = 'show-nav'
        document.body.style.overflow = 'hidden'
    }
    const hideMenu = () => {
        store.navigator.display = ''
        document.body.style.overflow = ''
    }

    const onClickMenu = () => {
        store.navigator.submenu = false

        if (store.navigator.display === 'show-nav') hideMenu()
        else showMenu()

        document.body.className = store.navigator.display
    }

    return (
        <>
            <MediaCache />
            <Router history={history}>
                <Sidebar onClickMenu={onClickMenu} />
                <Header onClickMenu={onClickMenu} />
                <Content
                    minHeight={500}
                    style={{
                        minHeight: 500
                    }}>
                    <AclCore />
                </Content>
                <Footer>
                    <DynamicFooter />
                </Footer>
            </Router>
            <Backdrop onClickMenu={onClickMenu} />
        </>
    )
})

const AclCore = observer(props => {
    const location = useLocation()
    const sessionTimestamp = StorageExtend.get(
        `development.${SESSION_TIMESTAMP_KEY}`
    )
    const [aclFilename, setAclFilename] = useState()

    const isSessionTimeout = () =>
        new Date().getTime() - sessionTimestamp >= SESSION_TIMEOUT
    const changeLocationHandler = () => {
        if (isSessionTimeout()) {
            logn(`🔄 --==--==-- Session Timeout --==--==--`)
            sessionStorage.clear()
            window.location.reload() 
        }
    }
    useEffect(changeLocationHandler, [location])

    return (
        <Switch>
            {/* Routes for everyone */}
            <Route exact path="/" component={Home} />
            <Route exact path="/Notice" component={Notice} />
            <Route exact path="/Notice/:id" component={NoticeDetail} />
            <Route exact path="/FAQ" component={FAQ} />
            <Route exact path="/FAQ/:id" component={FAQ} />
            
            {/* Protected routes for existed customer */}
            
        </Switch>
    )
})


const Backdrop = observer(props => {
    return (
        <>
            <div
                className={classnames('full-size-backdrop', {
                    hide: storeElement.forceBodyLoading === false
                })}></div>
            <div
                onClick={() => {
                    props.onClickMenu()
                }}
                className="push-backdrop"
                hidden={store.navigator.display === '' ? true : false}></div>

            {store.loginHide === false && (
                <div
                    onClick={() => {
                        store.loginHide = true
                    }}
                    className="push-backdrop"
                    hidden={store.loginHide === false ? false : true}
                    style={{ background: 'none', zIndex: 9 }}></div>
            )}

            <div
                onClick={() => {
                    store.loginHide = true
                }}
                className="push-backdrop"
                hidden={storeAPI.payment.isLoading ? true : true}
                style={{ background: 'none', zIndex: 9 }}></div>
        </>
    )
})

const DynamicFooter = loadable(() => import('../Footer/Footer'))

export default AclWrapper
