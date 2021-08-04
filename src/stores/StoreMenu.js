import { makeAutoObservable } from 'mobx';
import { defaults } from '@Utils/Utils';
import { storeBowser } from './StoreBowser';
import has from 'lodash/has';

const getDevice = () => defaults(storeBowser.isMobile() ? 'mobile' : 'desktop', 'mobile')

class StoreMenu {

    isLoading = true
    isCheckCutText = false
    titleWelcome = ''
    subTitleWelcome = ''
    isLoadingSetLang = false
    customerData = {}
    authPassMenu = false
    // API
    isInitialized = false
    menu = {
        desktop: [],
        mobile: [],
        header: [],
        others: []
    }
    menuHeader = []
    menuGroupA = []
    menuGroupB = []

    setMenu(value) {

        this.menu = value

        this.menuGroupA = value[getDevice()].filter(e => e.menuGroup === 'A')
        this.menuGroupB = value[getDevice()].filter(e => e.menuGroup === 'B')

        this.isLoading = false
        this.setInitialized(true)
    }

    setMenuHeader(value) {

        this.menuHeader = value

        this.isLoading = false
        this.setInitialized(true)
    }

    setInitialized(value) {
        this.isInitialized = value
    }

    getIsInitialized() {
        return this.menuGroupA.length > 0 && this.menuGroupB.length > 0
    }

    Reset() {
        this.authPassMenu = false
        // API
        this.isInitialized = false
        this.menu = {
            desktop: [],
            mobile: [],
            header: [],
            others: []
        }
        this.menuGroupA = []
        this.menuGroupB = []
    }

    constructor() {
        makeAutoObservable(this)
    }

    get isEnabledShareCart() {
        return has(this.menu, 'others.shareCart')
    }
}

export default new StoreMenu()