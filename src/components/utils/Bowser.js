import { useState, useEffect } from 'react';
import { useSize } from 'ahooks';
import Bowser from 'bowser';

// NOTE: this list must be up-to-date with browsers listed in
// test/acceptance/useragentstrings.yml
export const BROWSER_ALIASES_MAP = {
    'Amazon Silk': 'amazon_silk',
    'Android Browser': 'android',
    Bada: 'bada',
    BlackBerry: 'blackberry',
    Chrome: 'chrome',
    Chromium: 'chromium',
    Epiphany: 'epiphany',
    Firefox: 'firefox',
    Focus: 'focus',
    Generic: 'generic',
    'Google Search': 'google_search',
    Googlebot: 'googlebot',
    'Internet Explorer': 'ie',
    'K-Meleon': 'k_meleon',
    Maxthon: 'maxthon',
    'Microsoft Edge': 'edge',
    'MZ Browser': 'mz',
    'NAVER Whale Browser': 'naver',
    Opera: 'opera',
    'Opera Coast': 'opera_coast',
    PhantomJS: 'phantomjs',
    Puffin: 'puffin',
    QupZilla: 'qupzilla',
    QQ: 'qq',
    QQLite: 'qqlite',
    Safari: 'safari',
    Sailfish: 'sailfish',
    'Samsung Internet for Android': 'samsung_internet',
    SeaMonkey: 'seamonkey',
    Sleipnir: 'sleipnir',
    Swing: 'swing',
    Tizen: 'tizen',
    'UC Browser': 'uc',
    Vivaldi: 'vivaldi',
    'WebOS Browser': 'webos',
    WeChat: 'wechat',
    'Yandex Browser': 'yandex',
    Roku: 'roku',
}

export const BROWSER_MAP = {
    amazon_silk: 'Amazon Silk',
    android: 'Android Browser',
    bada: 'Bada',
    blackberry: 'BlackBerry',
    chrome: 'Chrome',
    chromium: 'Chromium',
    epiphany: 'Epiphany',
    firefox: 'Firefox',
    focus: 'Focus',
    generic: 'Generic',
    googlebot: 'Googlebot',
    google_search: 'Google Search',
    ie: 'Internet Explorer',
    k_meleon: 'K-Meleon',
    maxthon: 'Maxthon',
    edge: 'Microsoft Edge',
    mz: 'MZ Browser',
    naver: 'NAVER Whale Browser',
    opera: 'Opera',
    opera_coast: 'Opera Coast',
    phantomjs: 'PhantomJS',
    puffin: 'Puffin',
    qupzilla: 'QupZilla',
    qq: 'QQ Browser',
    qqlite: 'QQ Browser Lite',
    safari: 'Safari',
    sailfish: 'Sailfish',
    samsung_internet: 'Samsung Internet for Android',
    seamonkey: 'SeaMonkey',
    sleipnir: 'Sleipnir',
    swing: 'Swing',
    tizen: 'Tizen',
    uc: 'UC Browser',
    vivaldi: 'Vivaldi',
    webos: 'WebOS Browser',
    wechat: 'WeChat',
    yandex: 'Yandex Browser',
}

export const PLATFORMS_MAP = {
    tablet: 'tablet',
    mobile: 'mobile',
    desktop: 'desktop',
    tv: 'tv',
}

export const PLATFORMS_MODEL_MAP = {
    iPhone: 'iPhone',
    iPad: 'iPad',
}

export const OS_MAP = {
    WindowsPhone: 'Windows Phone',
    Windows: 'Windows',
    MacOS: 'macOS',
    iOS: 'iOS',
    Android: 'Android',
    WebOS: 'WebOS',
    BlackBerry: 'BlackBerry',
    Bada: 'Bada',
    Tizen: 'Tizen',
    Linux: 'Linux',
    ChromeOS: 'Chrome OS',
    PlayStation4: 'PlayStation 4',
    Roku: 'Roku',
}

export const ENGINE_MAP = {
    EdgeHTML: 'EdgeHTML',
    Blink: 'Blink',
    Trident: 'Trident',
    Presto: 'Presto',
    Gecko: 'Gecko',
    WebKit: 'WebKit',
}

// ** Local Methods ** //
export const bowser             = () => Bowser.getParser(window.navigator.userAgent)

// ** Get Methods ** //
export const getBowserBrowser   = () => bowser().getBrowser()
export const getBrowserOS       = () => bowser().getOS()
export const getBrowserPlatform = () => bowser().getPlatform()
export const getBowserResult    = () => bowser().getResult()
export const getBrowserName     = () => bowser().getBrowserName()
export const getBrowserVersion  = () => bowser().getBrowserVersion()
export const getPlatform        = () => bowser().getPlatform()
export const getPlatformType    = () => bowser().getPlatformType()
export const getPlatformModel   = () => bowser().getPlatform().model
export const getPlatformVendor  = () => bowser().getPlatform().vendor
export const getOSName          = () => bowser().getOSName()
export const getOSVersion       = () => bowser().getOSVersion()
export const getOSVersionName   = () => bowser().getOS().versionName

// ** Web Browsers ** //
/** Check if current browser name is **Chrome**. */
export const isChrome           = () => bowser().getBrowserName() === BROWSER_MAP.chrome
/** Check if current browser name is **Chrome**. */
export const isChromium         = () => bowser().getBrowserName() === BROWSER_MAP.chromium
/** Check if current browser name is **Firefox**. */
export const isFirefox          = () => bowser().getBrowserName() === BROWSER_MAP.firefox
/** Check if current browser name is **Opera**. */
export const isOpera            = () => bowser().getBrowserName() === BROWSER_MAP.opera
/** Check if current browser name is **Safari**. */
export const isSafari           = () => bowser().getBrowserName() === BROWSER_MAP.safari

/** Check if current browser name is **Microsoft Edge**. */
export const isMicrosoftEdge    = () => bowser().getBrowserName() === BROWSER_MAP.edge
/** Check if current browser name is **Microsoft Edge**.
 * 
 * This method is an alias name for `isMicrosoftEdge()` */
export const isEdge             = () => isMicrosoftEdge()

/** Check if current browser name is **Internet Explorer**. */
export const isInternetExplorer = () => bowser().getBrowserName() === BROWSER_MAP.ie
/** Check if current browser name is **Internet Explorer**. 
 * 
 * This method is an alias name for `isInternetExplorer()` */
export const isIE               = () => isInternetExplorer()

/** Check if current browser name is **Black Berry**. */
export const isBlackBerry       = () => bowser().getBrowserName() === BROWSER_MAP.blackberry
/** Check if current browser name is **Amazon Silk**. */
export const isAmazonSilk       = () => bowser().getBrowserName() === BROWSER_MAP.amazon_silk

// ** Device Types ** //
/** Check if current device is `Desktop`, the result is not related with OS. */
export const isDesktop          = () => bowser().getPlatformType() === PLATFORMS_MAP.desktop
/** Check if current device is `Mobile`, the result is ***not*** included `Tablet`. */
export const isMobile           = () => bowser().getPlatformType() === PLATFORMS_MAP.mobile
/** Check if current device is `Tablet`. */
export const isTablet           = () => bowser().getPlatformType() === PLATFORMS_MAP.tablet
/** Check if current device is `TV`. */
export const isTV               = () => bowser().getPlatformType() === PLATFORMS_MAP.tv

// ** Device Models ** //
/** Check if current device's model is **iPhone**. */
export const isIPhone           = () => bowser().getPlatform().model === PLATFORMS_MODEL_MAP.iPhone
/** Check if current device's model is **iPad**. */
export const isIPad             = () => bowser().getPlatform().model === PLATFORMS_MODEL_MAP.iPad

// ** Operating Systems ** //
/** Check if current device's OS is **iOS**. */
export const isIOS              = () => bowser().getOSName() === OS_MAP.iOS
/** Check if current device's OS is **Android**. */
export const isAndroid          = () => bowser().getOSName() === OS_MAP.Android
/** Check if current device's OS is **Windows** (not Windows Phone). */
export const isWindows          = () => bowser().getOSName() === OS_MAP.Windows
/** Check if current device's OS is **Windows Phone**. */
export const isWindowsPhone     = () => bowser().getOSName() === OS_MAP.WindowsPhone
/** Check if current device's OS is **MacOS**. */
export const isMacOS            = () => bowser().getOSName() === OS_MAP.MacOS
/** Check if current device's OS is **Black Berry**. */
export const isBlackBerryOS     = () => bowser().getOSName() === OS_MAP.BlackBerry
/** Check if current device's OS is **Linux**. */
export const isLinux            = () => bowser().getOSName() === OS_MAP.Linux
/** Check if current device's OS is **iOS** or **MacOS**. */
export const isApple            = () => isIOS() || isMacOS()

export const useBowser = () => {

    const windowSize = useSize(document.getElementById('root'))
    const [detection, setDetection] = useState(undefined)

    const updateSize = () => {
        setTimeout(() => {
            const bowser = Bowser.getParser(window.navigator.userAgent)
            const type = bowser.getPlatformType()
            const model = bowser.getPlatform().model
            const os = bowser.getOSName()
            const newDetection = {
                type: type,
                model: model,
                os: os,
                isDesktop: () => type === PLATFORMS_MAP.desktop,
                isMobile: () => type === PLATFORMS_MAP.mobile,
                isTablet: () => type === PLATFORMS_MAP.tablet,
                isTV: () => type === PLATFORMS_MAP.tv,
                isIPad: () => model === PLATFORMS_MODEL_MAP.iPad,
                isOSiOS: () => os === OS_MAP.iOS,
                isOSAndroid: () => os === OS_MAP.Android
            }
            setDetection(newDetection)
        }, 1)
    }

    useEffect(() => updateSize(), [windowSize])

    return detection
}