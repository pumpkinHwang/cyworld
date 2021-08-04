import { makeAutoObservable } from 'mobx'
import * as $ from './APIs'

import { getProductSourceV2 } from './APIs/APIProductSource'

/** **Raven** 🐦 is a promise based HTTP client base on `AJAX` and `Mobx`.
 * Officialy use to connect with **Ushop** APIs. */
class StoreRaven {
    constructor() {
        makeAutoObservable(this)
    }

    get get() {
        return $._get
    }
    get post() {
        return $._post
    }
    get update() {
        return $._update
    }
    get delete() {
        return $._delete
    }

    get getProductSourceV2() {
        return getProductSourceV2
    }
}

const Raven = new StoreRaven()
export default Raven
