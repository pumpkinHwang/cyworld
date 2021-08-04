import React, { useRef, useEffect } from 'react';
import { useObserver } from 'mobx-react';
import PropTypes from 'prop-types';
import Input from 'antd/lib/input';
import { trim, defaults } from '../../utils/Utils';

const TextAreaBox = props => {
    TextAreaBox.propTypes = {
        className: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        style: PropTypes.object,
        value: PropTypes.string,
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        align: PropTypes.string,
        variant: PropTypes.string
    }

    const { ref, rows, autoSize, ...rest } = props

    const refInput = useRef()

    useEffect(() => {
        if (props.onChangeRef !== undefined) {
            props.onChangeRef(refInput)
        }
    }, [refInput])

    return useObserver(() => 
        <Input.TextArea 
            ref={refInput}
            prefixCls={trim(`super-input ${defaults(props.variant, '')} ${defaults(props.align, '')}`)}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off" 
            spellCheck={false}
            rows={rows}
            autoSize={autoSize}
            {...rest}/>
    )
}

export default TextAreaBox