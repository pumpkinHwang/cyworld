import { makeAutoObservable } from 'mobx';

class StoreAddress {
    orderDetailsAddressDelivery = {}
    orderDetailsAddressPickUp = {}
    orderDetailsAddressMotorDelivery = {}
    //
    generateAddressDelivery = []

    constructor() {
        makeAutoObservable(this)
    }
}

export const storeAddress = new StoreAddress()