import React, { useState, useEffect } from 'react';
import { When } from 'react-if';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { defaults } from '../utils/Utils';

const Buttons = props => {
    Buttons.propTypes = {
        type: PropTypes.string.isRequired,
        visible: PropTypes.bool,
        className: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        style: PropTypes.object,
    }

    const [type, setType] = useState(defaults(props.type, 'button'))
    const [visible, setVisible] = useState(defaults(props.visible, true))
    const [className, setClassName] = useState(defaults(props.className, ''))
    const [style, setStyle] = useState(defaults(props.style, {}))

    useEffect(() => {
        let usedClassName = ''
        const btnClassName = 'btn btn-primary'
        const btnLinkClassName = 'btn btn-link'

        switch (type) {
            case 'link': 
                usedClassName = btnLinkClassName 
                break
            default:
                usedClassName = btnClassName
                break
        }

        usedClassName += ` ${className}`
        
        setType(defaults(props.type, 'button'))
        setVisible(defaults(props.visible, true))
        setClassName(usedClassName)
        setStyle(defaults(props.style, {}))
    }, [props.type, props.visible, props.className, props.style])

    return (
        <When condition={visible}>
            <button {...props} className={className} style={style} visible={null} type={null}>
                {props.children}
            </button>
        </When>
    )
}

export default Buttons