import * as K from './Keywords';
import { ShippingMethods } from './ShippingMethods';
import Raven from '@Raven';

export const ShippingHrefList = {
    [K.Thailand]: {
        [ShippingMethods.ID.delivery]: `${Raven.hydraURL()}/shippingmethods?type=Economy`,
        [ShippingMethods.ID.pickUp]: `${Raven.hydraURL()}/shippingmethods?type=WillCall&location=Bangkok, Main Office`,
        [ShippingMethods.ID.aramex]: ''
    },
    [K.Philippines]: {
        [ShippingMethods.ID.delivery]: `${Raven.hydraURL()}/shippingmethods?type=COVID19Special1`,
        [ShippingMethods.ID.pickUpTaguig]: `${Raven.hydraURL()}/shippingmethods?type=WillCall&location=Taguig City, Main Office`,
        [ShippingMethods.ID.samedayDelivery]: `${Raven.hydraURL()}/shippingmethods?type=SameDay`,
    },
    [K.Singapore]: {
        [ShippingMethods.ID.delivery]: {
            status: {
                [K.All]: `${Raven.hydraURL()}/shippingmethods?type=Economy&location=Singapore, Main Office`,
                [K.Status.L]: `${Raven.hydraURL()}/shippingmethods?type=Priority&location=Singapore, Main Office`
            }
        },
        [ShippingMethods.ID.pickUp]: `${Raven.hydraURL()}/shippingmethods?type=WillCall&location=Singapore, Main Office`,
        [ShippingMethods.ID.aramex]: `${Raven.hydraURL()}/shippingmethods?type=Aramex`
    },
    [K.Australia]: {
        [ShippingMethods.ID.delivery]: `${Raven.hydraURL()}/shippingmethods?type=Expedited`,
        [ShippingMethods.ID.pickUp]: '',
        [ShippingMethods.ID.aramex]: ''
    },
    [K.Newzealand]: {
        [ShippingMethods.ID.delivery]: `${Raven.hydraURL()}/shippingmethods?type=Expedited`,
        [ShippingMethods.ID.pickUp]: '',
        [ShippingMethods.ID.aramex]: ''
    },
    [K.Indonesia]: {
        [ShippingMethods.ID.delivery]: `${Raven.hydraURL()}/shippingmethods?type=Economy`,
        [ShippingMethods.ID.pickUp]: `${Raven.hydraURL()}/shippingmethods?type=WillCall&location=Jakarta, Main Office`,
        [ShippingMethods.ID.aramex]: '',
        [ShippingMethods.ID.motorDelivery]: `${Raven.hydraURL()}/shippingmethods?type=Jabodetabek Motorcycle`,
        [ShippingMethods.ID.deliverySBY]: `${Raven.hydraURL()}/shippingmethods?type=Economy&location=Surabaya`,
        [ShippingMethods.ID.pickUpSBY]: `${Raven.hydraURL()}/shippingmethods?type=WillCall&location=Surabaya`,
        [ShippingMethods.ID.motorDeliverySBY]: `${Raven.hydraURL()}/shippingmethods?type=Jabodetabek Motorcycle&location=Surabaya`
    },
    [K.Japan]: {
        [ShippingMethods.ID.delivery]: `${Raven.hydraURL()}/shippingmethods?type=Economy`,
        [ShippingMethods.ID.pickUp]: '',
        [ShippingMethods.ID.aramex]: ''
    },
    [K.Korea]: {
        [ShippingMethods.ID.delivery]: `${Raven.hydraURL()}/shippingmethods?type=택배`,
    },
    [K.Hongkong]: {
        [ShippingMethods.ID.delivery]: `${Raven.hydraURL()}/shippingmethods?type=Economy`,
        [ShippingMethods.ID.pickUp]: `${Raven.hydraURL()}/shippingmethods?type=WillCall&location=Hong Kong, Main Office`,
        [ShippingMethods.ID.aramex]: ''
    },
    [K.Taiwan]: {
        [ShippingMethods.ID.delivery]: `${Raven.hydraURL()}/shippingmethods?type=Economy`,
        [ShippingMethods.ID.pickUp]: `${Raven.hydraURL()}/shippingmethods?type=WillCall&location=Taiwan, Main Office`,
    },
    [K.Malaysia]: {
        [ShippingMethods.ID.delivery]: `${Raven.hydraURL()}/shippingmethods?type=NextDay`,
        [ShippingMethods.ID.pickUp]: `${Raven.hydraURL()}/shippingmethods?type=WillCall&location=Petaling Jaya, Main Office`,
        [ShippingMethods.ID.aramex]: `${Raven.hydraURL()}/shippingmethods?type=Aramex`
    },
}

export const ShippingMethodList = {
    [K.Default]: {
        [ShippingMethods.ID.delivery]: {
            href: `${Raven.hydraURL()}/shippingmethods?type=Economy`,
            href_params: ['type=Economy']
        },
        [ShippingMethods.ID.pickUp]: {
            href: `${Raven.hydraURL()}/shippingmethods?type=WillCall`,
            href_params: ['type=WillCall']
        },
        [ShippingMethods.ID.aramex]: {
            href: `${Raven.hydraURL()}/shippingmethods?type=Aramex`,
            href_params: ['type=Aramex']
        }
    },
    [K.Philippines]: {
        [ShippingMethods.ID.delivery]: {
            href: `${Raven.hydraURL()}/shippingmethods?type=COVID19Special1`,
            href_params: ['type=COVID19Special1']
        },
        [ShippingMethods.ID.pickUpTaguig]: {
            href: `${Raven.hydraURL()}/shippingmethods?type=WillCall&location=Taguig City, Main Office`,
            href_params: ['type=WillCall', 'location=Taguig City, Main Office']
        },
        [ShippingMethods.ID.samedayDelivery]: {
            href: `${Raven.hydraURL()}/shippingmethods?type=SameDay`,
            href_params: ['type=SameDay']
        }
    },
    [K.Thailand]: {
        [ShippingMethods.ID.delivery]: {
            href: `${Raven.hydraURL()}/shippingmethods?type=Economy`,
            href_params: ['type=Economy']
        },
        [ShippingMethods.ID.pickUp]: {
            href: `${Raven.hydraURL()}/shippingmethods?type=WillCall&location=Bangkok, Main Office`,
            href_params: ['type=WillCall', 'location=Bangkok, Main Office']
        }
    },
    [K.Singapore]: {
        [ShippingMethods.ID.delivery]: {
            status: {
                [K.All]: {
                    href: `${Raven.hydraURL()}/shippingmethods?type=Economy&location=Singapore, Main Office`,
                    href_params: ['type=Economy', 'location=Singapore, Main Office']
                },
                [K.Status.L]: {
                    href: `${Raven.hydraURL()}/shippingmethods?type=Priority&location=Singapore, Main Office`,
                    href_params: ['type=Priority', 'location=Singapore, Main Office']
                }
            }
        },
        [ShippingMethods.ID.pickUp]: {
            href: `${Raven.hydraURL()}/shippingmethods?type=WillCall&location=Singapore, Main Office`,
            href_params: ['type=WillCall', 'location=Singapore, Main Office']
        },
        [ShippingMethods.ID.aramex]: {
            href: `${Raven.hydraURL()}/shippingmethods?type=Aramex`,
            href_params: ['type=Aramex']
        }
    },
    [K.Indonesia]: {
        // Jakarta
        [ShippingMethods.ID.delivery]: {
            href: `${Raven.hydraURL()}/shippingmethods?type=Economy`,
            href_params: ['type=Economy'],
            type: 'Economy'
        },
        [ShippingMethods.ID.pickUp]: {
            href: `${Raven.hydraURL()}/shippingmethods?type=WillCall&location=Jakarta, Main Office`,
            href_params: ['type=WillCall', 'location=Jakarta, Main Office']
        },
        [ShippingMethods.ID.motorDelivery]: {
            href: `${Raven.hydraURL()}/shippingmethods?type=Jabodetabek Motorcycle`,
            href_params: ['type=Jabodetabek Motorcycle'],
            type: 'Jabodetabek Motorcycle'
        },
        // Surabaya
        [ShippingMethods.ID.deliverySBY]: {
            href: `${Raven.hydraURL()}/shippingmethods?type=Economy&location=Surabaya`,
            href_params: ['type=Economy', 'location=Surabaya'],
            location: 'Surabaya',
            type: 'Economy'
        },
        [ShippingMethods.ID.pickUpSBY]: {
            href: `${Raven.hydraURL()}/shippingmethods?type=WillCall&location=Surabaya`,
            href_params: ['type=WillCall', 'location=Surabaya'],
            location: 'Surabaya',
            type: 'WillCall'
        },
        [ShippingMethods.ID.motorDeliverySBY]: {
            href: `${Raven.hydraURL()}/shippingmethods?type=Jabodetabek Motorcycle&location=Surabaya`,
            href_params: ['type=Jabodetabek Motorcycle', 'location=Surabaya'],
            location: 'Surabaya',
            type: 'Jabodetabek Motorcycle'
        }
    },
    [K.Japan]: {
        [ShippingMethods.ID.delivery]: {
            href: `${Raven.hydraURL()}/shippingmethods?type=Economy`,
            href_params: ['type=Economy'],
            type: 'Economy'
        },
    },
    [K.Hongkong]: {
        [ShippingMethods.ID.delivery]: {
            href: `${Raven.hydraURL()}/shippingmethods?type=Economy`,
            href_params: ['type=Economy']
        },
        [ShippingMethods.ID.pickUp]: {
            href: `${Raven.hydraURL()}/shippingmethods?type=WillCall&location=Hong Kong, Main Office`,
            href_params: ['type=WillCall', 'location=Hong Kong, Main Office']
        }
    },
    [K.Taiwan]: {
        [ShippingMethods.ID.delivery]: {
            href: `${Raven.hydraURL()}/shippingmethods?type=Economy`,
            href_params: ['type=Economy']
        },
        [ShippingMethods.ID.pickUp]: {
            href: `${Raven.hydraURL()}/shippingmethods?type=WillCall&location=Taiwan, Main Office`,
            href_params: ['type=WillCall', 'location=Taiwan, Main Office']
        }
    },
    [K.Malaysia]: {
        [ShippingMethods.ID.delivery]: {
            href: `${Raven.hydraURL()}/shippingmethods?type=NextDay`,
            href_params: ['type=NextDay']
        },
        [ShippingMethods.ID.pickUp]: {
            href: `${Raven.hydraURL()}/shippingmethods?type=WillCall&location=Malaysia, Main Office`,
            href_params: ['type=WillCall', 'location=Malaysia, Main Office']
        },
        [ShippingMethods.ID.aramex]: {
            href: `${Raven.hydraURL()}/shippingmethods?type=Aramex`,
            href_params: ['type=Aramex']
        }
    },
}