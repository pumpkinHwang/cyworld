import { makeAutoObservable } from 'mobx'
import { PLATFORMS_MAP, PLATFORMS_MODEL_MAP, OS_MAP } from '@Bowser'

class StoreBowser {
    model = ''
    type = ''
    os = ''

    constructor() {
        makeAutoObservable(this)
    }

    isDesktop() {
        return this.type === PLATFORMS_MAP.desktop
    }
    isMobile() {
        return this.type === PLATFORMS_MAP.mobile
    }
    isTablet() {
        return this.type === PLATFORMS_MAP.tablet
    }
    isTV() {
        return this.type === PLATFORMS_MAP.tv
    }
    isIPad() {
        return this.model === PLATFORMS_MODEL_MAP.iPad
    }
    isOSAndroid() {
        return this.os === OS_MAP.Android
    }
    isOSiOS() {
        return this.os === OS_MAP.iOS
    }
    isAppOSiOS() {
        const userAgent = navigator.userAgent

        let isNative = false;

        if(userAgent.indexOf('iOS') !== -1) isNative = true;

        try{
            let isIOSNative = localStorage.getItem("isIOSNative");
            if(isIOSNative === "true"){
                isNative = true;
            }
        }catch(err){}
        
        return isNative;
    }
    isAppOSAndroid() {
        const userAgent = navigator.userAgent

        let isNative = false;

        if(userAgent.indexOf('android') !== -1) isNative = true;

        try{
            let isAOSNative = localStorage.getItem("isAOSNative");
            if(isAOSNative === "true"){
                isNative = true;
            }
        }catch(err){}
        
        return isNative;
    }
}

export const storeBowser = new StoreBowser()
