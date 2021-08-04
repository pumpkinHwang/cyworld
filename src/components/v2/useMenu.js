import React, { useEffect, useState } from 'react'
import StoreMenu from '@Stores/StoreMenu'
import { defaults } from 'lodash'
import { isMobile } from '@Bowser'
const getDevice = () => defaults(isMobile() ? 'mobile' : 'desktop', 'mobile')

export const useMenu = (menuList) => {

    useEffect(() => {

        init()

    }, [menuList])

    const isHadMenu = () => {

        let menuGroupASessionStore = StoreMenu.menuGroupA
        let menuGroupBSessionStore = StoreMenu.menuGroupB

        if (menuGroupASessionStore && menuGroupBSessionStore) {
            return true
        } else {
            return false
        }
    }

    const init = () => {
        if (isHadMenu()) {
            if (menuList) {
                SetGroupMenu(menuList)
            } else {
                AssignFromSession()
            }
        } else {
            if (menuList) {
                SetGroupMenu(menuList)
            }
        }
    }

    const AssignFromSession = () => {
        let menuGroupASessionStore = StoreMenu.menuGroupA
        let menuGroupBSessionStore = StoreMenu.menuGroupB

        if (menuGroupASessionStore) {
            StoreMenu.menuGroupA = menuGroupASessionStore
        }

        if (menuGroupBSessionStore) {
            StoreMenu.menuGroupB = menuGroupBSessionStore
        }

        StoreMenu.isLoading = false

        // mobx reaction
        const menuSessionStore = sessionStorage.getItem('menu')
        StoreMenu.menu = JSON.parse(menuSessionStore)
        // StoreMenu.isInitialized = true
    }



    const SetGroupMenu = (menu) => {
        const A = menu[getDevice()].filter(e => e.menuGroup === 'A')
        const B = menu[getDevice()].filter(e => e.menuGroup === 'B')

        StoreMenu.menuGroupA = A
        StoreMenu.menuGroupB = B
        StoreMenu.isLoading = false

        // mobx reaction
        sessionStorage.setItem('menu', JSON.stringify(menu))
        StoreMenu.menu = menu
        // StoreMenu.isInitialized = true
    }

    return [
        StoreMenu.menuGroupA.length > 0 && StoreMenu.menuGroupB.length > 0,
        StoreMenu.menuGroupA,
        StoreMenu.menuGroupB,
        getDevice()
    ]
}