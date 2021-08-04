import { createBrowserHistory } from 'history';
import { useLocation } from 'react-router-dom';
import { makeAutoObservable, get as mget, remove as mremove, reaction } from 'mobx';
import { findString, someOfString } from '@Utils/String';

class StoreHistory {
    isInitialized = false
    location = {}
    prevLocation = {}

    constructor() {
        makeAutoObservable(this)
        this.isInitialized = true
    }

    set setLocation(loc) {
        this.location = loc
    }

    set setPevLocation(loc) {
        this.prevLocation = loc
    }
}

const basePath = ''
const history = createBrowserHistory({ basename: basePath })

export const usePathnameInclude = (expectancy = []) => {
    let result = false
    const location = useLocation()
    expectancy.forEach(element => {
        if (findString(location.pathname, element)) {
            result = true
            return
        }
    })
    return result
}

export const usePathnameExclude = (expectancy = []) => {
    let result = true
    const location = useLocation()
    expectancy.forEach(element => {
        if (findString(location.pathname, element)) {
            result = false
            return
        }
    })
    return result
}
const classStoreHistory = new StoreHistory()

export { history as default }
export { classStoreHistory as storeHistory }