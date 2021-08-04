import get from 'lodash/get';

class CustomerExtend {

    storageKey = 'customers'
    storageType = 'localStorage'

    value = null

    country = null

    get FooterStatic() {

        return get(this.value, 'footer-static', null)
    }

    get City() {

        return get(this.value, 'city', [])
    }

    get Banner() {
        return get(this.value, 'banner', [])
    }

    get Language() {
        return get(this.value, 'language', [])
    }

    get Breadcrumbs() {
        return get(this.value, 'breadcrumbs', [])
    }

    get BreadcrumbsHistory() {
        return get(this.value, 'breadcrumbsHistory', [])
    }

    get HasCustomerExtend() {
        return get(this.value, 'users[0]', null) ? true : false
    }

    SetUsers(sessionAuth) {

        if (get(this.value, 'users', null) === null) {
            this.value.users = []
        }

        this.value.users.push(sessionAuth)
        this.SaveToStorage()
    }

    SetData(key, value) {
        if (key === 'users') {
            this.SetUsers(value)
        } else {
            // this.value[key] = value
        }
    }

    SaveToStorage() {
        if (this.storageType === 'localStorage') {
            let data = localStorage.getItem(this.storageKey)
            if (data) {
                data = JSON.parse(data) || {}
            } else {
                data = {}
            }

            data[this.country] = this.value

            localStorage.setItem(this.storageKey, JSON.stringify(data))
        } else {
            sessionStorage.setItem(this.storageKey, this.value)
        }
    }

    Init(country) {
        let data = this.storageType === 'localStorage' ? localStorage.getItem(this.storageKey) : sessionStorage.getItem(this.storageKey)
        if (data) {
            data = JSON.parse(data) || {}
            this.value = data[country] ? data[country] : { users: [] }
        } else {
            sessionStorage.removeItem(this.storageKey)
            this.value = { users: [] }
        }
        this.country = country

        console.log(this.value, this.country)

        return this
    }

    constructor() {


    }


}

export default new CustomerExtend