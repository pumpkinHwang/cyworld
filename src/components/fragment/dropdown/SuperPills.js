import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import './css/SuperPills.css';
import isObject from 'lodash/isObject';
import { defaults, isSomething, trim } from '../../utils/Utils';

const { Option } = Select

/**
 * @param {object} props 
 * @param {function} props.onSelected 
 * @param {function} props.onFocus 
 * @param {function} props.onBlur 
 */
const SuperPills = observer(props => {
    SuperPills.propTypes = {
        options: PropTypes.array,
        onChange: PropTypes.func,
        placeholder: PropTypes.string,
        showSearch: PropTypes.bool,
        leftOption: PropTypes.bool,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func
        ])
    }

    const { onChange, onSelected, selected, defaultValue, options, leftOption, prefixCls, ...customProps } = props

    const [children, setChildren] = useState([])
    const [isFocus, setFocus] = useState(false)
    const [isAutocompleteDisabled, setAutocompleteDisabled] = useState(false)

    useEffect(() => {
        if (isSomething(options)) {
            const result = []
            options.map((item, index) => {
                if (isObject(item)) {
                    result.push(<Option className={leftOption ? 'option-align' : 'option-styles'} value={`${item.value}`} key={index}>{item.text}</Option>)
                } else {
                    result.push(<Option className={leftOption ? 'option-align' : 'option-styles'} value={`${item}`} key={index}>{item}</Option>)
                }

                return null
            })
            setChildren(result)
        }
    }, [options])

    const handleOnSelected = (value) => {
        onSelected(value)
    }

    const onFocus = (event) => {

        setFocus(true)

        if (isAutocompleteDisabled === false) {
            const el = document.getElementsByClassName('ant-select-selection-search-input')
            for (let i = 0; i < el.length; i++) {
                el[i].setAttribute(
                    'autocomplete',
                    'new-password'
                )
            }
            setAutocompleteDisabled(true)
        }

        if (props.onFocus !== undefined) {
            props.onFocus(event)
        }
    }

    const onBlur = (event) => {
        setFocus(false)
        if (props.onBlur !== undefined) {
            props.onBlur(event)
        }
    }

    return (
        <div className={trim(`${defaults(prefixCls, 'super-pills')} ${isFocus ? 'focus' : ''}`)}>
            <Select virtual={false}
                {...customProps}
                onChange={handleOnSelected}
                onFocus={onFocus}
                onBlur={onBlur}>
                {children}
            </Select>
        </div>
    )
})

export default SuperPills