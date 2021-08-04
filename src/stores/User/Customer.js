
import { get } from "lodash"
import { makeAutoObservable } from "mobx";
import $ from 'jquery'

const inArray = (needle, arrayList) => {
    return $.inArray(needle, arrayList) > -1 ? true : false
}
class Customer {

    userData = null

    constructor(userData) {
        makeAutoObservable(this)
        this.userData = userData
    }

    GetNativeName(obj, nameType) {
        var fullName = '';
        var nativeName = '';

        let checkNative = /@/
        Object.keys(obj).forEach(function (key) {
            var value = obj[key];

            if (checkNative.test(key)) {
                nativeName = value
            } else {

                nativeName = false
                if (key === 'firstName' || key === 'lastName') {
                    fullName += value
                } else if (key === 'fullName') {
                    fullName = value
                }
            }

        });


        if (nameType === 'fullName') {
            return fullName;
        } else if (nameType === 'nativeName') {
            if (nativeName === false || nativeName === '') {
                return fullName;
            } else {
                return nativeName;
            }
        } else {

            if (nativeName === '') {
                return fullName;
            } else {
                if (nativeName === false || nativeName === '') {
                    return fullName
                } else {
                    return nativeName
                }
            }

        }

    }

    Rank() {

        let rank = get(this.userData, 'metricsProfileHistory.aggregate.cumulativeMetricsProfile.highestRankShort', '').toLowerCase() 
        rank = rank === 'pc' || rank === 'asc' ? 'dst' : rank
        rank = rank === 'dst' ? 'fo' : rank
        
        return rank
    }

    IsVip() {

    }

    Email() {
        return get(this.userData, 'email', null)
    }

    AchievementsHistory() {
        return get(this.userData, 'achievementsHistory', null)
    }

    Status() {
        return get(this.userData, 'status', null)
    }

    get status() {
        return this.Status()
    } 

    
}

export default Customer