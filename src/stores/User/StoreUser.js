import { autorun, makeAutoObservable } from 'mobx';
import get from 'lodash/get';
import set from 'lodash/set';
import omit from 'lodash/omit';
import assignIn from 'lodash/assignIn';
import Customer from './Customer';
import StoreAuth from './StoreAuth';
import { findString, isEqualText } from '@Utils/String';
import { defaults } from '@Utils/Utils';
class StoreUser {

    userData = null
    cache = null
    commission = null
    lsb = null
    acl = null
    currentProfileData = null

    constructor() {
        makeAutoObservable(this)
        autorun((reaction) => {
            
        })
    }
    /** 
     * @returns {*} Customer
     */
    CustomerData() {
        
        if (this.currentProfileData) {
            return this.currentProfileData
        } else {
            this.currentProfileData = new Customer(this.userData)
        }

        return this.currentProfileData
    }

    Acl() {
        return this.userData.acl
    }

    setUserData(value) {
        if (value.profile.id) {
            this.userData = value.profile
            this.commission = value.commission
            this.lsb = value.lsb
            this.cache = value.cache
        }
    }

    Reset() {
        this.userData = null
        this.cache = null
        this.commission = null
        this.lsb = null
    }
    
    getUserData() {
        const data = get(this.CustomerData(), 'userData', {})
        const omitedData = omit(data, [
            'achievementsHistory', 'acl', 'cumulativeMetricsProfile', 'employmentDetails',
            'email', 'href', 'homePhone', 'humanName', 'id', 'joinDate', 'mainAddress', 
            'metricsProfileHistory', 'mobilePhone', 'profilePicture', 'status', 'type'
        ])

        const result = data ? {
            achievementsHistory: get(data, 'achievementsHistory'),
            acl: get(data, 'acl'),
            cumulativeMetricsProfile: get(data, 'cumulativeMetricsProfile'),
            employmentDetails: get(data, 'employmentDetails'),
            email: get(data, 'email'),
            href: get(data, 'href'),
            homePhone: get(data, 'homePhone'),
            humanName: get(data, 'humanName'),
            id: get(data, 'id'),
            joinDate: get(data, 'joinDate'),
            mainAddress: get(data, 'mainAddress'),
            metricsProfileHistory: get(data, 'metricsProfileHistory'),
            mobilePhone: get(data, 'mobilePhone'),
            profilePicture: get(data, 'profilePicture'),
            status: get(data, 'status'),
            type: get(data, 'type')
        } : {}

        if (omitedData) {
            assignIn(result, omitedData)
        }

        return result
    }

    getHref() {
        return this.getUserData().href
    }

    getEmail() {
        return this.getUserData().email
    }

    getHumanName() {
        const human = this.getUserData().humanName
        const data = {
            english: get(human, 'fullName', ''),
            native: ''
        }
        assignIn(data, human)

        let native = ''
        Object.keys(human).map((key) => {
            if (findString(key, '@') === true) {
                native = human[key]
            }
        })

        if (native) {
            set(data, 'native', native)
        }

        return data
    }

    

    getNameEnglish() {
        return this.getHumanName().english
    }

    getNameNative() {
        return this.getHumanName().native
    }

    getMainAddress() {
        return this.getUserData().mainAddress
    }

    getMobile() {
        return this.getUserData().mobilePhone
    }



    getStatus() {
        return this.getUserData().status
    }

    getType() {
        return this.getUserData().type
    }

    getID() {
        return StoreAuth.id
    }

    isStatusE() {
        return StoreAuth.ShortStatus() === 'E' && this.isStatusL() === false
    }

    isStatusL() {
        return isEqualText(get(this.getUserData(), 'employmentDetails.employerName', ''), 'Performance Labs')
    }

    setProfilePicture(response) {
        this.userData.profilePicture = response
    }

    getShortStatus() {
        return  'C'
    }
}



export default new StoreUser()