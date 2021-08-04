import React, { useState, useEffect } from 'react';
import { When, Unless } from 'react-if';
import PropTypes from 'prop-types';
import { defaults } from '../utils/Utils';

export const Icon = props => {
    Icon.propTypes = {
        icon: PropTypes.string.isRequired,
        icon2: PropTypes.string,
        visible: PropTypes.bool,
        cursor: PropTypes.string,
        className: PropTypes.string,
        title: PropTypes.string,
        toggle: PropTypes.bool,
        onClick: PropTypes.func,
    }

    const [icon, setIcon] = useState(defaults(props.icon, ''))
    const [icon2, setIcon2] = useState(defaults(props.icon2, ''))
    const [visible, setVisible] = useState(defaults(props.visible, true))
    const [cursor, setCursor] = useState(defaults(props.cursor, 'default'))
    const [className, setClassName] = useState(defaults(props.className, ''))
    const [title, setTitle] = useState(defaults(props.title, ''))
    const [toggle, setToggle] = useState(defaults(props.toggle, true))

   /*  const [toggleEffect, setToggleEffect] = useState(`opacity-${props.toggle ? '1' : '0'} transition-500ms`)
    const [toggleEffect2, setToggleEffect2] = useState(`opacity-${props.toggle ? '0' : '1'} transition-500ms`) */

    useEffect(() => {
        setIcon(defaults(props.icon, ''))
        setIcon2(defaults(props.icon2, ''))
        setVisible(defaults(props.visible, true))
        setCursor(defaults(props.cursor, 'default'))
        setClassName(defaults(props.className, ''))
        setTitle(defaults(props.title, ''))
        setToggle(defaults(props.toggle, true))
        // toggle effect
        /* setToggleEffect(`opacity-${props.toggle ? '1' : '0'} transition-500ms`)
        setToggleEffect2(`opacity-${props.toggle ? '0' : '1'} transition-500ms`) */
    }, [props])

    return (
        <When condition={visible}>
            <When condition={toggle}>
                <span className={`cursor-${cursor} ${className}`} {...props}
                    title={title} icon={null} icon2={null} cursor={null} visible={null} toggle={null}>
                    <i className={`${icon}`}></i>
                </span>
            </When>
            <Unless condition={toggle}>
                <span className={`cursor-${cursor} ${className}`} {...props}
                    title={title} icon={null} icon2={null} cursor={null} visible={null} toggle={null}>
                    <i className={`${icon2}`}></i>
                </span>
            </Unless>
        </When>
    )
}