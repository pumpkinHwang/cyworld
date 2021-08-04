const getC_Url = () => {
    const url = sessionStorage.getItem('customerHref')
    return url
}

const getC_Token = () => {
    const auth_token = sessionStorage.getItem('customerToken')
    return auth_token
}

export { getC_Url, getC_Token }
