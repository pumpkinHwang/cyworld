import axios from 'axios'
import { isEqualText, lowerCase } from '@Utils/String'
import { isLengthBetween } from '@Components/utils/Utils'
import { StorageExtend } from '@Utils/StorageManager'

let data = {
    source: 'UNISHOP-WEB',
    country_code: ''
}

const currentPath = window.location.pathname.split('/')

const redirectToDefaultPath = async () => {
    return {
        success: false,
        path: (window.location.href = `${window.location.origin}`),
        needReload: true
    }
}

const process = (countryToCheck, countries) => {

    let keyCheck = 'country'
    if (countryToCheck.length === 2) {
        keyCheck = 'shorter'
    } else if (countryToCheck.length === 3) {
        keyCheck = 'short'
    }

    const dataCountry = countries.find(item =>
        isEqualText(item[keyCheck].replace(' ', ''), countryToCheck)
    )

    if (dataCountry) {
        if (
            dataCountry.maintenance_mode.maintenance_mode === true ||
            dataCountry.country === 'LAOS'
        ) {
            sessionStorage.setItem(
                `maintenance-${lowerCase(dataCountry.country)}`,
                JSON.stringify(dataCountry.maintenance_mode)
            )
        }
        if (isLengthBetween(countryToCheck, 2, 3)) {
            const paths = window.location.pathname.split('/')
            return {
                success: true,
                needReload: true,
                path: window.location.pathname.replace(
                    paths[1],
                    lowerCase(dataCountry.country.replace(/\s/g, ''))
                )
            }
        } else {
            StorageExtend.set(
                lowerCase(dataCountry.country),
                'development.memoized-country'
            )

            return {
                success: true,
                path: null,
                needReload: false,
                country: dataCountry
            }
        }
    } else {
        return redirectToDefaultPath()
    }
}

export const checkCountry = async () => {
    const pathCountryName = currentPath[1]

    // defined full country name or country code 2,3 alphabets
    const a = checkOnlineCountry()
    if (pathCountryName.length > 0) {
        return a.then(re => {
            if (re.status === 200) {
                if (re.data.success === true) {
                    const checking = process(pathCountryName, re.data.data)
                    return checking
                } else {
                    return false
                }
            } else {
                return false
            }
        })
    } else {
        const localCountry = StorageExtend.get('development.memoized-country')
        if (localCountry) {
            return a.then(re => {
                if (re.status === 200) {
                    if (re.data.success === true) {
                        const c = re.data.data.find(
                            item =>
                                item.country.toLowerCase() ===
                                lowerCase(localCountry)
                        )

                        if (c) {
                            window.location.href = `/${localCountry.replace(
                                /\s/g,
                                ''
                            )}`
                        } else {
                            return {
                                success: true,
                                path: '',
                                needReload: true
                            }
                        }
                    }
                }
            })
        } else {
            return {
                success: true,
                path: '',
                needReload: true
            }
        }
    }
}
