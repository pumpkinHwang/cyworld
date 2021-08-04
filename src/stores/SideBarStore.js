import { makeAutoObservable } from 'mobx';

class StoreSideBar {
    isMenuOpen = false
    showWebBackdrop = false
    showComponentBackDrop = false

    constructor() {
        makeAutoObservable(this)
    }
}

export const storeSideBar = new StoreSideBar()