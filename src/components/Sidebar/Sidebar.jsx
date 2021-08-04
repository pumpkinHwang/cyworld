import React, { useEffect, useState } from 'react'
import { store } from '@Stores/MainStore'
import history from '@Components/History'
import CustomMenu from './Menu'
import _ from 'lodash'
/**
 * @description 메뉴 권한 타입
 * type {ROLE_ALL , ROLE_USER, ROLE_ADMIN}
 */ 
const roles = {
    ROLE_ALL: 'ROLE_ALL', //전체
    ROLE_AUTH: 'ROLE_AUTH', //로그인한 사용자만
    ROLE_UNAUTH: 'ROLE_UNAUTH' //로그인 안한 일반인만
}

const routes = {
    sideBar: [
        {
            name: 'home',
            label: '홈',
            link: '/',
            role: roles.ROLE_ALL
        },
        {
            name: 'notice',
            label: '공지사항',
            link: '/notice',
            role: roles.ROLE_ALL
        },
        {
            name: 'faq',
            label: 'FAQ',
            link: '/faq',
            role: roles.ROLE_ALL
        }
    ]
}


const Sidebar = props => {
    const [menu, setMenu] = useState([])

    const [state, setState] = React.useState({
        activeList: {},
        menu: []
    })

    useEffect(() => {
        if (menu.length > 0) return
        init()
    }, [menu])

    const init = async () => {
        /**
         * @description 메뉴 생성
         */
        let _menu = []

        _menu = routes.sideBar.filter(item => {
            if (item.role !== roles.ROLE_ALL) return false
            else return true
        })

        setMenu(_menu)
    }

    return (
        <nav
            id="sidebar-nav"
            className={`site-wrap wrap-layout offcanvas-menu`}>
            <CustomMenu
                menu={menu}
                onClick={item => {
                    if (item.link && item.link.length > 0)
                        history.push(item.link)

                    if (item.action) item.action()

                    props.onClickMenu()
                }}
            />

            <ul
                className={
                    'menu ' + (store.navigator.submenu ? 'off-view' : '')
                }>
                {menu.map(item => {
                    return null
                    const currentPage = location.href
                    let active = ''

                    if (item.name === 'home') {
                        if (
                            currentPage === 'http://localhost:3000/'
                        )
                            active += ' active '
                    } else {
                        if (currentPage.indexOf(item.name) !== -1)
                            active += ' active '
                    }

                    if (item.children && item.children.length > 0) {
                        return <CustomMenu />
                    }

                    return (
                        <li
                            className={`${active} sidebar-div-hover`}
                            key={'sidebar-' + item.name}>
                            <span
                                onClick={() => {
                                    let { activeList } = state

                                    Object.keys(activeList).map((v, k) => {
                                        activeList[v] = ''
                                    })

                                    activeList[link.path] = 'active'

                                    if (item.link && item.link.length > 0)
                                        history.push(item.link)

                                    if (item.action) item.action()

                                    props.onClickMenu()
                                }}
                                className={`sidebar-hover nav-cell no-margin ${active}`}>
                                <span className="sidebar-hover">
                                    {item.label}
                                </span>

                                {item.children &&
                                    item.children.map((_item, _index) => {
                                        return (
                                            <ul
                                                className={
                                                    'offcanvas-submenu in-view'
                                                }>
                                                <li
                                                    className=""
                                                    style={{ border: '0px' }}>
                                                    <span
                                                        style={{
                                                            border: '0px'
                                                        }}>
                                                        {_item.name}
                                                    </span>

                                                    <span
                                                        style={{
                                                            marginTop: 0,
                                                            paddingTop: 0,
                                                            marginBottom: 0,
                                                            paddingBottom: 0,
                                                            border: '0px'
                                                        }}>
                                                        {_item.children &&
                                                            _item.children.map(
                                                                (
                                                                    __item,
                                                                    __index
                                                                ) => {
                                                                    return (
                                                                        <ul
                                                                            className={
                                                                                'offcanvas-catsubmenu in-view'
                                                                            }>
                                                                            <li
                                                                                className="back-btn"
                                                                                style={{
                                                                                    border:
                                                                                        '0px'
                                                                                }}>
                                                                                <span
                                                                                    style={{
                                                                                        border:
                                                                                            '0px'
                                                                                    }}>
                                                                                    {
                                                                                        __item.name
                                                                                    }
                                                                                </span>
                                                                            </li>
                                                                        </ul>
                                                                    )
                                                                }
                                                            )}
                                                    </span>
                                                </li>
                                            </ul>
                                        )
                                    })}
                            </span>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Sidebar
