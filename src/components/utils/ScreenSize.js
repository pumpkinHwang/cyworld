export const screenResolution = () => {

    return [window.innerWidth, window.innerHeight]

}

export const is320w = () => {

    return window.innerWidth === 320 ? true : false

}

export const detectOrienTation = () => {

    return window.innerWidth < window.innerHeight ? 'portrait' : 'landscape'

}