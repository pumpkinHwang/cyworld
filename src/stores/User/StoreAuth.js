import Raven from '@Raven'
import { makeAutoObservable } from 'mobx'
import { excludeOf } from '@Components/utils/Utils'

class StoreAuth {
    id = null
    token = null
    tokenExpire = null
    href = null
    whoami = null
    acl = null
    country = 'korea'
    adminToken = null

    isDummyUser = false
    isCPWE = false

    loginType = ''

    isInitilized = false
    isAuthorized = false

    isInitilizedAutoLogin = false
    autoLoginStatus = ''

    ACLFile = ''

    constructor() {
        makeAutoObservable(this)
    }

    /**
     * @param {'normal'|'auto'} type
     */
    setLoginType(type) {
        if (excludeOf(type, ['normal', 'auto'])) {
            type = 'normal'
        }
        this.loginType = type
    }

    setLoginToNormal() {
        this.setLoginType('normal')
    }

    setLoginToAuto() {
        this.setLoginType('auto')
    }

    get isNormal() {
        return this.loginType === 'normal'
    }

    get isAutoLogin() {
        return this.loginType === 'auto'
    }

    /**
     *
     * @param {'success'|'failed'} status
     */
    setAutoLoginStatus(status) {
        if (excludeOf(status, ['success', 'failed'])) {
            status = 'failed'
        }
        this.autoLoginStatus = status
    }

    get isAutoLoginSuccess() {
        return this.autoLoginStatus === 'success'
    }

    get isAutoLoginFailed() {
        return this.autoLoginStatus === 'failed'
    }

    Href(full = true) {
        if (full === true) {
            return this.href
        } else {
            return this.href.split('/').pop()
        }
    }

    Reset() {
        this.id = null
        this.token = null
        this.tokenExpire = null
        this.href = null
        this.isAuthorized = false
        this.isDummyUser = false
        this.whoami = null
        this.acl = null
        this.country = null
    }


    /** An atonym version of `isAuthorized`.
     *
     * Return `false` if any customer already logged in.
     */
    get isAnonymous() {
        return this.isAuthorized === false
    }

    isMockUp() {
        return localStorage.getItem('dummy-user')
    }
}

export default new StoreAuth()
