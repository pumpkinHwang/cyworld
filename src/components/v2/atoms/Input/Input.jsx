import React, { useEffect, useState } from 'react'
import { Input as AntdInput } from 'antd'
import PropTypes from 'prop-types'

const Input = ({ type, ...props }) => {
    if (type === 'basic') {
        return <AntdInput {...props} />
    }
    if (type === 'edit') {
        return (
            <AntdInput
                style={{ width: '100%', height: 40, borderRadius: 30 }}
                {...props}
            />
        )
    }
    if (type === 'readonly') {
        return (
            <AntdInput
                readOnly
                style={{ width: '100%', height: 40, borderRadius: 30 }}
                {...props}
            />
        )
    }
}

export default Input

Input.propTypes = {
    /** 버튼 타입  */
    type: PropTypes.oneOf(['basic', 'edit', 'readonly']),
    /** 클릭 이벤트 */
    onChange: PropTypes.func
}

Input.defaultProps = {
    type: 'basic',
    onChange: () => {},
    autoComplete: 'off'
}
