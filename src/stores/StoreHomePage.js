import { makeAutoObservable } from 'mobx';
import { isSomething, someOf } from '@Utils/Utils';

class StoreHomePage {
    topSection = false
    loginSection = false
    serviceSection = false
    banner = []

    isShowCookieConsent = false

    isBannerInitialized() {
        return isSomething(this.banner)
    }

    constructor() {
        makeAutoObservable(this)
    }

    get isVideoBanner() {
        return this.getBannerType() === 'video'
    }
}

export const storeHomePage = new StoreHomePage()