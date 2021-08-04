import React, { useState, useEffect } from 'react';
import { When } from 'react-if';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { defaults } from '../utils/Utils';
import styled from 'styled-components';

const StyledInput = styled.input`
    text-align: center;
`

const SecuredInput = observer(props => {
    SecuredInput.propTypes = {
        placeholderChar: PropTypes.string,
        visible: PropTypes.bool,
        className: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        style: PropTypes.object,
    }

    const [placeholderChar, setPlaceholderChar] = useState(defaults(props.placeholderChar, '#'))
    const [visible, setVisible] = useState(defaults(props.visible, true))
    const [className, setClassName] = useState(`form-control ${props.className}`)
    const [style, setStyle] = useState(defaults(props.style, {}))

    useEffect(() => {
        const usedClassName = `form-control ${className}`
        
        setPlaceholderChar(defaults(props.placeholderChar, '#'))
        setVisible(defaults(props.visible, true))
        setClassName(usedClassName)
        setStyle(defaults(props.style, {}))
    }, [props.placeholder, props.visible, props.className, props.style])

    return (
        <When condition={visible}>
            <StyledInput {...props} 
                type="number"
                className={className} 
                style={style} 
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off" 
                spellCheck={false}
                visible={null} 
                placeholderChar={null}
            >
                {props.children}
            </StyledInput>
        </When>
    )
})

export default SecuredInput