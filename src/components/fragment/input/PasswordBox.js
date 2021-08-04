import React, { useState, useEffect } from 'react';
import { useObserver } from 'mobx-react';
import PropTypes from 'prop-types';
import Input from 'antd/lib/input/Input';
import Password from 'antd/lib/input/Password';
import { trim, defaults } from '../../utils/Utils';

const PasswordBox = props => {
    PasswordBox.propTypes = {
        className: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        style: PropTypes.object,
        value: PropTypes.string,
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        password: PropTypes.bool,
        align: PropTypes.string,
        variant: PropTypes.string
    }

    return useObserver(() => 
        <Password 
            prefixCls={trim(`super-input password-box ${defaults(props.variant, '')} ${defaults(props.align, '')}`)}
            autoComplete="new-password" 
            autoCorrect="off"
            autoCapitalize="off" 
            spellCheck={false} 
            {...props}/>
    )
}

export default PasswordBox