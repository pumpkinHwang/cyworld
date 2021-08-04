import React, { useState, useEffect, useRef } from 'react'
import { When } from 'react-if';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { defaults } from '../utils/Utils';
import { reaction } from 'mobx';
import { store } from '../../stores/MainStore';

const Checkbox = observer(props => {
    Checkbox.propTypes = {
        visible: PropTypes.bool,
        className: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        inputClassName: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        style: PropTypes.object,
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
    }
    
    const [visible, setVisible] = useState(defaults(props.visible, true))
    const [className, setClassName] = useState(defaults(props.className, ''))
    const [inputClassName, setInputClassName] = useState(defaults(props.inputClassName, ''))
    const [style, setStyle] = useState(defaults(props.style, {}))
    const [checked, setChecked] = useState(defaults(props.checked, false))
    const [disabled, setDisabled] = useState(defaults(props.disabled, false))
    const refLabel = useRef(null)
    const refSpan = useRef(null)

    const updateRef = () => {
        if (props.onGetRef !== undefined) {
            props.onGetRef({ label: refLabel, span: refSpan })
        }
    }

    useEffect(() => {
        const disposer = reaction(() => store.languageCurrent, () => {
            updateRef()
            return () => disposer()
        })
    })
   
    useEffect(() => {
        setVisible(defaults(props.visible, true))
        setClassName(defaults(props.className, ''))
        setInputClassName(defaults(props.inputClassName, ''))
        setStyle(defaults(props.style, {}))
        setChecked(defaults(props.checked, false))
        setDisabled(defaults(props.disabled, false))
    }, [props])

    useEffect(() => {
        updateRef()
    }, [refLabel, refSpan])

    const onChecked = () => {
        // toggle
        const changed = !checked
        setChecked(changed)
        props.onChange(changed)
    }
    
    return (
        <When condition={visible}>
            <label ref={refLabel} className={`checkbox-label ${className}`}>
                <span ref={refSpan}>{props.children}</span>
                <input type="checkbox" checked={checked} onChange={onChecked} className={inputClassName} disabled={disabled}/>
                <span className="checkmark"></span>
            </label>
        </When>
    )
})

export default Checkbox