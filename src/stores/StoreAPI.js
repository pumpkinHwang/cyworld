import { makeAutoObservable } from 'mobx'

class StoreAPI {
    login = {
        isRedirecting: false
    }
    orderCalc = {
        isLoading: false,
        isResponsed: false,
        type: '', // 'error', 'warning'
        messages: [],
        hasError: false,
        hasMockError: false,
        configs: {
            isRetryOnAPIFail: true,
            maxRetryAttempt: 2,
            currentRetryAttempt: 0
        },

        get isTypeWarning() {
            return this.type === 'warning'
        },
        get isTypeError() {
            return this.type === 'error'
        },
        get isWarning() {
            return this.hasError && this.type === 'warning'
        },
        get isError() {
            return this.hasError && this.type === 'error'
        }
    }

    payment = {
        isLoading: false,
        message: ''
    }

    constructor() {
        makeAutoObservable(this)
    }

    setMessage = msg => {
        this.payment.message = msg
    }

    showPaymentLoading = () => {
        this.payment.isLoading = true
    }

    hidePaymentLoading = () => {
        this.payment.isLoading = false
    }
}

export const storeAPI = new StoreAPI()
