import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import Input from 'antd/es/input';
import { trim, defaults } from '../../utils/Utils';

const TextBox = forwardRef((props, ref) => {

    const { autoComplete, ...rest } = props

    const refInput = useRef()

    useImperativeHandle(ref, () => refInput.current)
    
    return (
        <Input
            ref={refInput}
            prefixCls={trim(`super-input ${props.value ? '' : 'empty'} ${defaults(props.variant, '')} ${defaults(props.align, '')}`)}
            autoComplete={autoComplete ? 'on' : 'new-password'} 
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            {...rest}/>
    )
})

export default TextBox