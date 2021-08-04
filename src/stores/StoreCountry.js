import { makeAutoObservable } from 'mobx';

class StoreCountry {
    countryList = []
    isLoading = true
    currentCountry = {}
    bgImg = {
        desktop: '',
        mobile: ''
    }
    maintenance = false
    country = {
        country: 'KOREA',
        live: "{{{domain}}}/",
        native_name: 'Korea',
        roman_name: 'Korea',
        short: 'KOR',
        shorter: 'KR',
        test: '{{{domain}}}/'
    }
    icon = []
    logo = {
        color: '',
        logo_url: ''
    }
    title = {
        text: '',
        color: ''
    }

    get CountryLowerCase() {
        return lowerCase(get(this.country, 'country', '')).replace(/\s/g, '')
    }

    get CountryCapitalize() {
        return capitalize(get(this.country, 'country', '')).replace(/\s/g, '')
    }

    get CountryUpperCase() {
        return upperCase(get(this.country, 'country', '')).replace(/\s/g, '')
    }

    

    init(data) {
        this.countryList = data.data
        this.bgImg = data.bg_img
        this.logo = data.logo
        this.icon = data.icon
        this.title = data.title
    }

    GACode = {
        singapore: 'UA-119346265-1',
        thailand: 'UA-119346265-2',
        japan: 'UA-119346265-4',
        india: 'UA-119346265-1',
        philippines: 'UA-119346265-3',
        united_states: 'UA-119346265-1',
        bahrain: 'UA-119346265-1',
        vietnam: 'UA-119346265-6',
        indonesia: 'UA-119346265-5',
        malaysia: '',
        hongkong: '',
        australia: '',
        newzealand: '',
        taiwan: '',
    }

    GACode2021 = {
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
        taiwan: 'G-QWH2FJ2WJ5',
    }

    FBPixelCode = {
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
        taiwan: '',
    }

    GAAdwordsCode = {
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
        taiwan: '',
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default new StoreCountry()