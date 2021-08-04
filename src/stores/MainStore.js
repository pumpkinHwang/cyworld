import { get } from 'lodash'
import { makeAutoObservable } from 'mobx'
import StoreUser from './User/StoreUser'

class StoreShareThisCart {
    baInfo = {}
    shipToAddress = {}
    addressBook = {
        show: false
    }
    downlineStep = 0
    editMode = false
    editData = null

    constructor() {
        makeAutoObservable(this)
    }
}

class Store {
    currency = 'SGD'
    minStockQty = 0
    match = {}
    country = ''
    country_code = 'SG'
    indexTab = 0
    subIndexTab = 1
    subReportIndexTab = 1
    productData = []
    addressValidation = []
    newsDataSource = []
    mediaDataSource = []
    productDataSource = []
    loginHide = true
    seminarData = []
    imageLoading = true
    prevLang = null
    allowArBalance = false
    page = 'home'
    loggedIn = false
    flagCurrent = 'united-states.png'

    /** @deprecated Please use `language.listen()` instead. */
    language = {}
    /** @deprecated Please use `language.now()` instead. */
    languageCurrent = null
    /** @deprecated Please use `language.dictionaries` instead. */
    dictionaryAll = {}

    isLangSwitcherOpen = false
    authPass = false
    facebookConnected = false

    currentPage = 0
    shopProfileFromCart = false
    shopProfileIndexTab = 1
    quickenrollIndexTab = 1
    quickenrollDataSort = {}
    quickenrollStock = false
    siteSearch = ''
    shopProfileData = {}
    shopProfileProDataSource = {}
    shopProfileDownlineInfo = {}
    shopProfileDownlineAddr = {}
    shopProDataSort = {}
    shopProfileCart = []
    shopProfilelistCart = []
    shopProfileTotal = 0
    shopProfileTotalPv = 0
    shopProfileID = 0
    shopProfileAlert = false
    autoShipIndexTab = 1
    autoShipCart = []
    autoShipTotal = 0
    autoShipTotalPv = 0
    autoShipSelected = null
    showAlphabetNav = false
    showWebBackdrop = false
    navigator = {
        menuPush: 0,
        routePush: 0,
        hideSubmenuInSidebar: false,
        display: '',
        submenu: false,
        submenuList: [],
        showSubmenuCountryList: false
    }
    imageState = true
    catOpens = []
    marginTopMain = 0
    toast = {
        show: false,
        type: 'default',
        position: 'topRight',
        title: 'Test',
        message: 'Test test test test'
    }
    isMenuOpen = false
    legPeople = []
    homePage = 0
    mainMenu = []
    oneEightyDeliveryProvisionsPH = []
    //Enroll
    provinces = []
    banknames = []
    footer = {}
    messengerOpen = false
    isWebview = false
    classicHeader = false
    latestWebview = false
    deviceDetails = {}
    isIphone = false
    productRender = null
    filterProduct = false
    categories = null
    genealogy = {
        breadcrumbs: [],
        breadcrumbsName: [],
        breadcrumbsNativeName: [],
        filters: [],
        sort_by: 'id',
        show_all: true,
        firstLoaded: false,
        show_vip: true,
        prevDataSource: [],
        show_card: false,
        prevBreadcrumbs: null,
        breadcrumbsHistory: [],
        showBreadcrumbs: false,
        showBookmark: false,
        downlineList: [],
        view: 'table',
        searchBa: ''
    }
    homeLoaded = null
    bannerAdminData = null
    bannerDataAws = null
    shareCart = {
        productSource: [],
        enrollProductSource: [],
        checkoutCart: [],
        enrollCheckoutCart: [],
        validEnrollCheckoutCart: [],
        shopProfile: [],
        calculateOrder: {},
        calculateOrderData: '',
        referralDetails: {},
        checkoutAddress: {},
        minStockQty: 0,
        priceLevel: 1,
        percentDiscount: 0,
        proceedCheckout: false,
        sharedCardID: '',
        referralId: '',
        referralName: '',
        referralNativeName: '',
        period: '',
        priceType: 'retail_price',
        priceTypeStandard: 'Customer',
        referralEmail: '',
        cartEnrolStep: 1,
        shipping: 2,
        cartEnrolData: {
            referralID: '',
            sponserID: '',
            enrolStep: '1'
        },
        enrollerDetails: {},
        loadingValidate: false,
        shoppingCreditCardDetails: {
            cardNumber: '',
            cardYear: '',
            cardCVV: '',
            cardMonth: '',
            cardName: '',
            validatePass: false
        },
        downlineInfo: {
            id: '',
            mobile: '',
            email: '',
            ship_method: '2'
        },
        prevDownlineAddress: {
            name: '',
            address1: '',
            address2: '',
            zip: '',
            state: '',
            city: 'none',
            country: ''
        },
        downlineAddress: {
            name: '',
            address1: '',
            address2: '',
            zip: '',
            state: '',
            city: 'none',
            country: ''
        },
        receive: {
            email_confirmation: true,
            invoice: true
        },
        no_ba_referral_id: '',
        no_ba_referral_id_name: '',
        email_confirmation: true,
        invoice: true,
        OrderDetailForm: false,
        termAndCondition: false
    }
    showCartModal = false
    showCart = false
    showCartOverlay = false
    cartHeight = window.innerHeight
    cartTab = ''
    cartTabScroll = false
    shareThisCartMode = false
    refreshShopprofile = false
    openCheckoutForm = false
    validateCheckStock = false
    stockError = false
    showLoader = false
    cartView = 'list'
    totalItemInCart = 0

    runningSnapShop = false

    topCategories = []

    // provinces
    listProvinces = []
    listProvincesEnglish = {}
    listProvincesNative = {}

    selectedAddress = null
    editAddress = null

    countryData = null
    isCPWE = false
    profilePicture = null

    searchVal = ''

    userData = null
    get customerData() {
        return StoreUser.CustomerData().userData
    }

    constructor() {
        makeAutoObservable(this)
    }
}

class ShopStore {
    top10 = []
    gotStock = false
    productDataSource = []
    productCategories = []
    hotProduct = []
    quickNavOpen = false
    quickNavOptions = []
    quickNavNext = null
    quickNavNextAfter = null
    siteSearch = ''
    passCheckOut = false
    validatedCartError = false
    subtotal = 0
    total = 0
    totalPv = 0
    weight = 0
    freight = 0
    enrollTotal = 0
    tempEnrollTotal = 0
    enrollTotalPv = 0
    enrollTotalLoading = false
    productFromHydraLoaded = false
    productFromServerLoaded = false
    tempAutoshipTotal = 0
    useCalculatedPriceFromHydra = false
    arbalance = 0
    arbalanceCurrency = null
    isEditARBalance = false
    productDataNew = []
    shoppingCart = []

    constructor() {
        makeAutoObservable(this)
    }
}

class EnrollStore {
    total = 0
    totalPv = 0
    isCartFromShopping = false
    enrollProductSource = []
    enrollAutoshipSource = []
    enrollCart = []
    autoshipEnrollCart = []
    productEnrollCart = []
    enrollQuickNavOpen = false
    enrollQuickNavOptions = []
    enrollQuickNavNext = null
    enrollQuickNavNextAfter = null
    errorPoints = []
    enrollState = false
    siteSearch = ''
    step = 1 // must start at 1
    stepBPass = false
    stepCPass = false
    isBAStatusActive = false
    quickenrollSignature = false
    agreeTCPass = false
    areas = []
    subAreas = []
    validationErrors = []
    sponsor
    checkCalStore = []
    forceShowHideEnrollCart = false
    useAutoShipEnrollCart = false
    mainAddredShip = {
        city: 'Singapore',
        country: 'SG',
        state: '',
        zip: '099254',
        address1: '3 HarbourFront Place,',
        address2: '#01-01, HarbourFront Tower 2'
    }
    enrollData = {
        enroller: '',
        sponsor: '',
        enrollerName: '',
        sponsorName: '',
        enrollerNativeName: '',
        sponsorNativeName: '',
        govId: '',
        govIdBack: '',
        firstNameTh: '',
        lastNameTh: '',
        firstNameEn: '',
        lastNameEn: '',
        firstName: '',
        lastName: '',
        gender: 'none',
        maritalStatus: 'none',
        birthday: '',
        province: 'none',
        area: 'none',
        subArea: 'none',
        mainAddress: '',
        mainAddress2: '',
        country: 'none',
        city: '',
        zip: '',
        email: '',
        phone: '',
        mobile: '',
        password: '',
        password2: '',
        icFile: '',
        icFileBC: '',
        icFilePT: '',
        icFileBB: '',
        icSignature: '',
        shippingmethod: '',
        bankName: '',
        bankNameCode: '',
        bankCode: '',
        bankNo: '',
        bankAccountName: '',
        isFreeEnroll: '',
        enrollAutoShipCart: [],
        enrollNewId: '',
        enrollOrderId: '',
        enrollAutoShipStep: '',
        sameaddressAutoship: true,
        sameaddressFirstorder: true,
        disableInput: false
    }

    addressShipTo = {
        differentAddress: false,
        zip: '',
        country: '',
        address1: '',
        address2: '',
        firstNameJP: '',
        mobilePhone: ''
    }
    payment = {
        enroll: {
            paymenttype: '',
            cardNumber: '',
            cardName: '',
            cardMonth: '',
            cardYear: '',
            cardCVV: ''
        },
        autoship: {
            paymenttype: '',
            cardNumber: '',
            cardName: '',
            cardMonth: '',
            cardYear: '',
            cardCVV: ''
        }
    }
    autoshipData = {
        differentAddress: false,
        zip: '',
        country: '',
        address1: '',
        address2: '',
        firstNameJP: '',
        mobilePhone: ''
    }
    dev = false
    fileGovCardLocation = ''
    fileGovCardName = ''
    isTerminated = false

    // Subscribe Confirmation
    isReceivedEmail = true
    isReceivedInvoice = true

    //
    stepName = ''

    constructor() {
        makeAutoObservable(this)
    }
}

class CheckOutStore {
    shoppingNotLogin = false
    referralParam = ''
    currentStep = 0
    fullName = ''
    firstNameEn = ''
    lastNameEn = ''
    address1 = ''
    address2 = ''
    country = ''
    province = ''
    city = ''
    zip = ''
    email = ''
    mobilePhone = ''
    homePhone = ''
    // Subscribe Confirmation
    isReceivedEmail = true
    isReceivedInvoice = true
    sns1 = ''
    sns2 = ''
    comment = ''
    checkout = false

    commissionMonth = ''
    commissionMonths = []

    items = []
    total = 0
    pv = 0
    cartMessage = ''
    orderTerms = {}
    orderTermsJson = ''
    shipping = '2'
    shippings = {
        box_1: '2',
        box_2: '2'
    }
    shipToTime = ''
    period = ''
    govId = ''
    birthDate = ''
    gender = 'none'
    dToken = null
    sendUser = 1 /*value = 1, for send user accout with email confirmation */
    baID = ''
    referralText = ''
    referralPassword = ''
    referralCheckedPassword = false
    referralBy = 'by_referral_id'
    referralValue = ''
    referralEnrollValid = false
    referralAddress = {
        delivery: {},
        pickUp: {},
        aramex: {}
    }
    referralAddressPH = {
        delivery: {},
        sameDay: {},
        halfday: {},
        pickUpOrtigas: {},
        pickUpTaguig: {}
    }
    billingAddress = {
        delivery: {},
        deliveryMainAddress: {},
        aramex: {},
        pickUp: {},
        pickUpOrtigas: {},
        pickUpTaguig: {},
        pickUpHoChiMinh: {},
        motorDelivery: {},
        pickUpSBY: {},
        deliverySBY: {},
        motorDeliverySBY: {},
        samedayDelivery: {}
    }
    billingAddressJP = {
        delivery: {},
        deliveryMainAddress: {}
    }
    billingAddressPH = {
        delivery: {},
        sameDay: {},
        deliveryMainAddress: {},
        halfday: {},
        pickUp: {},
        pickUpOrtigas: {},
        pickUpTaguig: {}
    }
    addressBook = {
        firstLoaded: false,
        isModified: false,
        addressList: {},
        selectedAddressKey: {},
        href: '',
        showList: false,
        showFormEdit: true,
        showFormNew: false,
        tempNewAddress: {},
        showconfirmation: false
    }
    loadingValidate = false
    birPhValidate = false
    referenceDetail = {}
    paymentType = ''
    reOrder = false
    doneCalculation = false
    isBackFromCart = false
    warehouse = ''

    calculated = []

    constructor() {
        makeAutoObservable(this)
    }
}

class CreditCardStore {
    cardName = ''
    cardNumber = ''
    cardMonth = ''
    cardYear = ''
    cardCVV = ''
    validatePass = false

    constructor() {
        makeAutoObservable(this)
    }
}

class StaticFooter {
    footerContact = null
    footerHours = null
    footerSocial = null
    footerQuickLink = null
    footerHelp = null
    footerGeneral = null
    footerFeedBack = null
    footerDisclaimer = null
    footerBanner = null
    footerPromotion = null
    footerVideo = null
    footerOrder = null
    footerTextTitle = null
    footerMessenger = null
    footerDecimalController = null
    footerMainPic = null
    footerDisplaySections = null
    footerTCOrder = null
    footerTCEnroll = null
    footerMisc = null
    footerTermsConditions = null
    footerPrivacyPolicy = null

    constructor() {
        makeAutoObservable(this)
    }
}

class seminar {
    rank = ''
    remark = ''

    constructor() {
        makeAutoObservable(this)
    }
}

class BirData {
    profile = {
        showWhatSwornDeclaration: 'AnnexB1',
        incomeSourceType: 'compensation',
        confirmedBusinessAddress: true,
        isBIRRegisteredAddress: true,
        isRegisteredInTaguig: true,
        nationality: 'Filipino',
        deduction_type: 'standard',
        grossIncome: 'below_250k',
        valid_id_picture: [],
        declaration_file: '',
        withHoldingTax: 0,
        birReduction: [],
        pdf_filename: '',
        birAuth: false,
        middleName: '',
        firstName: '',
        lastName: '',
        new_data: true,
        sales_tax: '8',
        vatType: 'NON-VAT',
        tin_id: '',
        type: '',
        rdo: '044',
        skip: false,
        id: '',
        address: ''
    }

    constructor() {
        makeAutoObservable(this)
    }
}

class StoreTab {
    tab_open = ''

    constructor() {
        makeAutoObservable(this)
    }
}

class SaveToAutoship {
    autoShipIndexTab = 0
    autoshipCart = null

    constructor() {
        makeAutoObservable(this)
    }
}

class ShareThisCartStore {
    priceLevel

    constructor() {
        makeAutoObservable(this)
    }
}

/** Observable parameters for rendering, loading API or other basic need. */
class StoreManager {
    // spinner handler
    isReadyToDisplayHome = false
    // local storage shortcut pass
    isLocalStorageAPI = false
    // LoadDBProducts handler
    isCartRestoredDone = false
    // footers handler
    isFooterDone = false
    isFooterStaticDone = false
    // spinner
    isSpinner = false

    constructor() {
        makeAutoObservable(this)
    }
}

class ClockManager {
    now = null

    constructor() {
        makeAutoObservable(this)
    }
}

/** Observable parameters for development tools. */
class DevelopmentTools {
    isSimulateLive = false
    isSimulateMaintenance = false
    isShowDevLog = false
    isShowInfoLog = false
    isShowProfilerLog = false
    isShowDictionaryLabel = false
    isShowOldCart = false
    isAddressBookEmpty = false
    isAddressBookMockup = false
    isHasError = false
    simulateDecimal = null
    customizerHeaderType = 'sticky-logo'
    customizerProductsCat = 'default'
    useCustomizer = false
    hideDevMessage = true
    addressBarHeight = 0
    viewPortHeight = 0
    isGesture = false
    loadingLog = ''

    constructor() {
        makeAutoObservable(this)
    }
}

class ProfileStore {
    isOrderHistoryLoaded = true
    openAddressEditor = false
    ordersDataSource = []

    constructor() {
        makeAutoObservable(this)
    }
}

export const store = new Store()
export const shopStore = new ShopStore()
export const defaultShopStore = new ShopStore()
export const enrollStore = new EnrollStore()
export const defaultEnrollStore = new EnrollStore()
export const checkOutStore = new CheckOutStore()
export const defaultCheckOutStore = new CheckOutStore()
export const checkOutEnrollStore = new CheckOutStore()
export const checkOutPCEnrollStore = new CheckOutStore()
export const defaultCheckOutEnrollStore = new CheckOutStore()
export const shoppingCreditCardStore = new CreditCardStore()
export const enrollCreditCardStore = new CreditCardStore()
export const staticFooter = new StaticFooter()
export const seminarData = new seminar()
export const birData = new BirData()
export const saveToAutoship = new SaveToAutoship()
export const shareThisCartStore = new ShareThisCartStore()
export const storeManager = new StoreManager()
export const clockManager = new ClockManager()
export const devTools = new DevelopmentTools()
export const profileStore = new ProfileStore()
export const store_tab = new StoreTab()
export const shareThisCart = new StoreShareThisCart()
