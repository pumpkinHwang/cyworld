import {  makeAutoObservable, runInAction } from 'mobx'
import StoreAuth from './StoreAuth'

class SessionAuth {

    storeKey = 'login-extends'

    user = null
    users = []

    ResetSessionStorage() {
        

        sessionStorage.removeItem('menu')
        sessionStorage.removeItem('menuGroupA-desktop')
        sessionStorage.removeItem('menuGroupA-mobile')
        sessionStorage.removeItem('menuGroupB-desktop')
        sessionStorage.removeItem('menuGroupB-mobile')
        sessionStorage.removeItem('genealogy-filter')
        
        sessionStorage.removeItem('dummy-user')
        sessionStorage.removeItem('customerData')
        sessionStorage.removeItem('customerHref')
        sessionStorage.removeItem('customerToken')
        sessionStorage.removeItem(`${StoreAuth.id}-breadcrumbs`)
        sessionStorage.removeItem(`${StoreAuth.id}-breadcrumbsHistory`)
        sessionStorage.removeItem('user-token')
        sessionStorage.removeItem('user-href')
        sessionStorage.removeItem('onself-response')
        sessionStorage.removeItem('tokenExpire')
    }

    async Current() {
        await this.GetStoredSession()
            .then(response => {

                const expire = typeof response.tokenExpire === 'string' ? JSON.parse(response.tokenExpire) : response.tokenExpire
                response.tokenExpire = expire

                runInAction(() => {
                    this.user = response
                })
            })
            .catch(error => {
                console.log('error', error)
            })

        return this.user
    }

    Token() {

        let customerToken = sessionStorage.getItem('customerToken')
        if (customerToken) {
            return customerToken
        } else {
            return null
        }
    }

    Href() {
        let href = sessionStorage.getItem('customerHref')
        if (href) {
            return href
        } else {
            return null
        }
    }

    CustomerData() {
        let customerData = sessionStorage.getItem('customerData')
        if (customerData) {
            return JSON.parse(customerData)
        } else {
            return null
        }
    }

    SaveSession(data) {

        sessionStorage.setItem('customerData', JSON.stringify(data.customerData))
        sessionStorage.setItem('customerToken', data.token)
        sessionStorage.setItem('customerHref', data.href)

        delete data.customerData
        let loginExtends = this.GetLoginExtends()
        loginExtends['korea'] = data

        this.SaveLoginExtends(JSON.stringify(loginExtends))


        runInAction(() => {
            this.user = data
        })
    }

    GetLoginExtends() {

        const defaultObjects = {
            ['korea']: null
        }

        return localStorage.getItem(this.storeKey) ? JSON.parse(localStorage.getItem(this.storeKey)) : defaultObjects
    }

    SaveLoginExtends(data) {
        localStorage.setItem(this.storeKey, data)
    }

    ShouldRestore() {
        return new Promise((resolve, reject) => {
            if (this.GetLoginExtends()['korea']) {
                resolve(true)
            } else {
                this.ResetSessionStorage()
                reject(false)
            }
        })
    }

    FetchAll() {
        this.users = []
        return new Promise((resolve, reject) => {

            let loginExtends = localStorage.getItem(this.storeKey)
            if (loginExtends) {
                loginExtends = JSON.parse(loginExtends)
                if (loginExtends['korea'] && loginExtends.length > 0) {
                    loginExtends['korea'].map((v, k) => {
                        this.users.push(v)
                    })
                } else {
                    reject(this.users)
                }
            }
        })
    }

    GetStoredSession() {
        return new Promise((resolve, reject) => {
            let loginExtends = localStorage.getItem(this.storeKey)
            if (loginExtends) {
                loginExtends = JSON.parse(loginExtends)
                resolve(loginExtends['korea'])
            }

            reject(null)
        })
    }

    RemoveSession() {
        if (this.user) {

            let stored = this.GetLoginExtends()
            if(stored['korea']) {
                delete stored['korea']
                this.SaveLoginExtends(JSON.stringify(stored))
            }
            
            this.ResetSessionStorage()
            runInAction(() => {
                this.user = null
            })
        }
    }

    constructor() {

        makeAutoObservable(this)
    }
}

export default new SessionAuth()