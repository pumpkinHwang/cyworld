
// Constants & Methods for Shipping Methods - * Please do not setup any configs here. *
export const shippingMethod = {
    ID: {
        /** ID = 2 */
        delivery: '2',
        /** ID = 3 */
        pickUp: '3',
        /** ID = 4 */
        aramex: '4',
        /** ID = 5 */
        pickUpHochiminh: '5',
        /** ID = 6 */
        motorDelivery: '6',
        /** ID = 7 */
        deliverySBY: '7',
        /** ID = 8 */
        pickUpSBY: '8',
        /** ID = 8 */
        motorDeliverySBY: '9'
    },
    name: {
        delivery: 'delivery',
        pickUp: 'pickUp',
        aramex: 'aramex',
        pickUpHochiminh: 'pickUpHochiminh',
        motorDelivery: 'motorDelivery',
        deliverySBY: 'deliverySBY',
        pickUpSBY: 'pickUpSBY',
        motorDeliverySBY: 'motorDeliverySBY'
    },
    IDToName: {
        '2': 'delivery',
        '3': 'pickUp',
        '4': 'aramex',
        '5': 'pickUp', // Pick Up Hochiminh
        '6': 'motorDelivery',
        '7': 'deliverySBY',
        '8': 'motorDeliverySBY',
    }
}

export const isDelivery = (method) => { return method === shippingMethod.name.delivery || method === shippingMethod.ID.delivery }
export const isPickUp = (method) => { return method === shippingMethod.name.pickUp || method === shippingMethod.ID.pickUp }
export const isAramex = (method) => { return method === shippingMethod.name.aramex || method === shippingMethod.ID.aramex }
export const isMotorDelivery = (method) => { return method === shippingMethod.name.motorDelivery || method === shippingMethod.ID.motorDelivery }
export const isDeliverySBY = (method) => { return method === shippingMethod.name.deliverySBY || method === shippingMethod.ID.deliverySBY }
export const isPickUpSBY = (method) => { return method === shippingMethod.name.pickUpSBY || method === shippingMethod.ID.pickUpSBY }