import * as K from './Keywords';
import ShippingMethods from './ShippingMethods';

/* NOTE: Example case:
    * always show
    commission: true 
    * always hide
    commission: false 
    * should login first
    commission: {
        login: true
    } 
    * only allow for status A and B
    commission: {
        status: {
            allow: ['A', 'B']
        }
    }
    * status C and E are not allow to use this section
    commission: {
        status: {
            except: ['C', 'E']
        }
    }
    * shipping pickup is now allow to use this section
    commission: {
        shipping: {
            except: [ShippingMethods.type.pickUp]
        }
    }
*/

class classSectionsDeclaration {

    OrderDetails() {
        return {
            title: true,
            subtitle: true,
            sectionTop: false,
            sectionForm: true,
            commission: false,
            shippingMethods: true,
            warehouse: false,
            time: false,
            subscribe: {
                status: {
                    allow: ['A', 'B']
                }
            }
        }
    }

    OrderSummary() {
        return {
            productPrice: {
                shipping: {
                    except: [ShippingMethods.type.pickUp]
                },
                status: {
                    except: ['C']
                }
            },
            deliveryFee: {
                status: {
                    except: ['C']
                }
            },
            shippingMethods: true,
            warehouse: false,
        }
    }

    Footer() {
        return {
            app: 'Common',
            bottom: 'Common',
            contact: 'Common',
            help: 'Common',
            quickLink: 'Common'
        }
    }

}

const core = new classSectionsDeclaration()
export const SectionsDeclaration = core