import { devTools, store, staticFooter } from '@Stores/MainStore'
import { hasQueryString } from '@Configs/ConfigsHeader'
import {
    isNullOrUndefined,
    isUndefined,
    isNothing,
    isString
} from '@Utils/Utils'
import { Country } from '@Configs/Country'

// ----------------------------------
let pathname = window.location.pathname.split('/')
let location = 'korea'
// ----------------------------------

// -- Debugging Parameters Control --
try {
    const _getParameterByName = (name, url) => {
        if (!url) url = window.location.href
        name = name.replace(/[\[\]]/g, '\\$&')
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url)
        if (!results) return null
        if (!results[2]) return ''
        return decodeURIComponent(results[2].replace(/\+/g, ' '))
    }

    // Force clear localStorage
    if (_getParameterByName('clear') === 'true') {
        localStorage.clear()
        sessionStorage.clear()
        alert('Clear completed, Please removed parameter.')
    }
    // Live Production Simulation - used on Development stage
    if (_getParameterByName('live') === 'true') {
        devTools.isSimulateLive = true
    }
    // Enable Information Logs
    if (_getParameterByName('info') === 'true') {
        devTools.isShowInfoLog = true
    }
    // Enable Profiler Logs
    if (_getParameterByName('pro') === 'true') {
        devTools.isShowProfilerLog = true
    }

    if (hasQueryString('error')) {
        devTools.isHasError = true
        console.log('[DevTools] Simulate errors actived.')
    }

    if (hasQueryString('dev')) {
        devTools.useCustomizer = true
        console.log('[DevTools] Customizer actived.')
    }
} catch (e) {
    console.error(e)
}

export const productCountryCode3Config = country => {
    const list = {}
    return isNothing(list[country]) ? Country.getCode3() : list[country]
}

// Country Code configs that used with other API
export const APICountryCodeConfig = country => {
    const list = {
        australia: 'XAU',
        newzealand: 'XNZ'
    }
    return isNothing(list[country]) ? Country.getCode2() : list[country]
}

/** Development version which always be change regarded to specific local time, please `feel free` to change it.
 * This variable is useful for checking the development stage if it has been done its build.
 * Clear all `localStorage` and `sessionStorage` when different version have been detected. */
export const VERSION_DEV = '201106.2.0.0' // <= Change new version here!

export const currencyBehindPrice = countryCode => {
    let countries = {
        SG: 'right',
        MY: 'right',
        TH: 'right',
        PH: 'right',
        JP: 'right',
        EN: 'right',
        MY: 'right',
        VN: 'right',
        CN: 'right',
        AE: 'right',
        ID: 'right',
        AU: 'right',
        NZ: 'right',
        TW: 'right',
        HK: 'right',
        KR: 'right'
    }

    const result = countries[countryCode]
    if (isNothing(result)) return 'right'
    else return result
}

export const ENV =
    window.location.hostname === 'localhost' ? 'dev' : 'production'

export const appConfig = {
    appPath: '/' + location,
    assetPath: '/assets/',
    preferredPrice: false,
    country: location,
    GACode: {
        singapore: 'G-8ZV61MEKWE',
        thailand: 'G-C3624NNSS6',
        japan: 'G-N2X7G74LK8',
        india: '',
        philippines: 'G-6RFWDY7V23',
        united_states: '',
        bahrain: '',
        vietnam: '',
        indonesia: 'G-TSC0CH5P2R',
        malaysia: 'G-4VQB90KRNX',
        hongkong: 'G-FCTPMQNXJJ',
        australia: '',
        newzealand: '',
        taiwan: 'G-QWH2FJ2WJ5'
    },
    FBPixelCode: {
        singapore: '388467111504630',
        thailand: '301116716951336',
        japan: '388467111504630',
        india: '388467111504630',
        philippines: '388467111504630',
        united_states: '388467111504630',
        bahrain: '388467111504630',
        vietnam: '388467111504630',
        indonesia: '388467111504630',
        malaysia: '',
        australia: '',
        hongkong: '',
        newzealand: '',
        taiwan: ''
    },
    GAAdwordsCode: {
        singapore: 'AW-869476933',
        thailand: 'AW-869476933',
        japan: 'AW-869476933',
        india: 'AW-869476933',
        philippines: 'AW-869476933',
        united_states: 'AW-869476933',
        bahrain: 'AW-869476933',
        vietnam: 'AW-869476933',
        indonesia: 'AW-869476933',
        malaysia: '',
        australia: '',
        newzealand: '',
        taiwan: ''
    },
    hostname: {
        localhost: 'localhost',
        development: 'dev',
        production: 'production',
        test: 'test'
    },
    countryCode: {
        singapore: 'SG',
        thailand: 'TH',
        japan: 'JP',
        india: 'IN',
        philippines: 'PH',
        united_states: 'US',
        bahrain: 'BH',
        vietnam: 'VN',
        indonesia: 'ID',
        uae: 'AE',
        taiwan: 'TW',
        hongkong: 'HK',
        cambodia: 'KH',
        malaysia: 'MY',
        laos: 'LA',
        myanmar: 'MM',
        australia: 'AU',
        newzealand: 'NZ',
        korea: 'KR'
    },
    countryCode3: {
        singapore: 'SGP',
        thailand: 'THA',
        japan: 'JPN',
        india: 'IN',
        philippines: 'PHL',
        united_states: 'USA',
        bahrain: 'BHA',
        vietnam: 'VNM',
        indonesia: 'IDN',
        uae: 'ARE',
        taiwan: 'TWN',
        hongkong: 'HKG',
        cambodia: 'KHM',
        malaysia: 'MYS',
        laos: 'LAO',
        myanmar: 'MMR',
        australia: 'AUS',
        newzealand: 'NZL',
        korea: 'KOR'
    },
    hashKey: 'WWW-CYWORD-KEY'
}


export const AWS_S3 = {
    url: 'https://s3.ap-southeast-1.amazonaws.com',
    bucketName: 'private.ushop.unicity.com',
    albumName: 'ph_bir_file',
    region: 'ap-southeast-1',
    accessKeyId: 'AKIAIQDTHFTI7BUCE6TQ',
    secretAccessKey: '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',
    expire: 604800
}

export const useNewProductCatalog = true
export const useFacebookLogin = true
export const SESSION_TIMEOUT = 12 * 60 * 60 * 1000 // 12hrs
export const SESSION_TIMESTAMP_KEY = 'session-timestamp'

export const inArray = (needle, arrayList) => {
    return $.inArray(needle, arrayList) > -1 ? true : false
}
