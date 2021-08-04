import { makeAutoObservable, reaction } from 'mobx';

class StoreElement {
    backdrop = {
        enabled: false,
        backgroundColor: 'rgba(0,0,0, 0.35)',
        zIndex: 10
    }
    openHeaderFilter = false
    shouldDisableHeaderFilter = true
    openingHeaderFilter = false
    forceBodyLoading = false

    constructor() {
        makeAutoObservable(this)
    }

    makeBodyBlur () {
        document.body.classList.add('blur')
        document.body.style.overflowY = 'hidden'

    }

    removeBlur () {
        document.body.classList.remove('blur')
        document.body.style.overflowY = 'auto'
    }
}

export const storeElement = new StoreElement()

reaction(
    () => storeElement.forceBodyLoading,
    isLoading => {
        if(isLoading === true) {
            storeElement.makeBodyBlur()
        } else {
            storeElement.removeBlur()
        }
    }
)