import React from 'react'
import KakaoLogin from 'react-kakao-login'
import PropTypes from 'prop-types'

const token = '1fdc042e58c975d79dfe475bec8188e4'

const WithRender = ({ render, onSuccess, onFail, onLogout }) => {
    return (
        <KakaoLogin
            token={token}
            onSuccess={onSuccess}
            onFail={onFail}
            onLogout={onLogout}
            render={render}
        />
    )
}

WithRender.propTypes = {
    onSuccess: PropTypes.func,
    onFail: PropTypes.func,
    onLogout: PropTypes.func,
    render: PropTypes.func
}

WithRender.defaultProps = {
    onSuccess: res => {
        console.log('kakao onSuccess : ', res)
    },
    onFail: res => {
        console.log('kakao onFail : ', res)
    },
    onLogout: res => {
        console.log('kakao onLogout : ', res)
    },
    render: null
}

export default WithRender
