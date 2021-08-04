import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import TextBox from './input/TextBox';
import TextAreaBox from './input/TextAreaBox';
import PasswordBox from './input/PasswordBox';
import SearchBox from './input/SearchBox';

/**
 * @param {object} props 
 * @param {object|string} props.className
 * @param {object} props.style
 * @param {string|number|string[]} props.value
 * @param {string|number|string[]} props.defaultValue
 * @param {string} props.placeholder
 * @param {function} props.onChange
 * @param {function} props.onKeyDown
 * @param {function} props.onFocus
 * @param {boolean} props.disabled
 * @param {boolean} props.readOnly
 * @param {boolean} props.autoFocus
 * @param {'none'|'text'|'decimal'|'numeric'|'tel'|'search'|'email'|'url'} props.inputMode
 * @param {'center'} props.align
 * @param {'line'|'pill'|'round'} props.variant
 * @param {ReactComponent} props.ref
 * @param {boolean} props.autoComplete
 */
const SuperInput = forwardRef((props, ref) => {

    const refInput = useRef()

    useImperativeHandle(ref, () => ({
        blur: () => {
            refInput.current.blur()
        },
        focus: () => {
            refInput.current.focus()
        },
        select: () => {
            refInput.current.select()
        },
        value: props.value,
        variant: props.variant,
        align: props.align,
        prefixCls: props.prefixCls,
        disabled: props.disabled,
        autoComplete: props.autoComplete
    }))

    return (
        <TextBox {...props} ref={refInput}/>
    )
})

/**
 * @param {object} props 
 * @param {object|string} props.className
 * @param {object} props.style
 * @param {number} props.rows
 * @param {boolean|object} props.autoSize
 * @param {string|number|string[]} props.value
 * @param {string|number|string[]} props.defaultValue
 * @param {string} props.placeholder
 * @param {function} props.onChange
 * @param {function} props.onKeyDown
 * @param {function} props.onFocus
 * @param {boolean} props.disabled
 * @param {boolean} props.readOnly
 * @param {boolean} props.autoFocus
 * @param {'none'|'text'|'decimal'|'numeric'|'tel'|'search'|'email'|'url'} props.inputMode
 * @param {'center'} props.align
 * @param {'line'|'pill'|'round'} props.variant
 * @param {ReactComponent} props.ref
 */
const TextArea = props => <TextAreaBox {...props}/>

/**
 * @param {object} props 
 * @param {object|string} props.className
 * @param {object} props.style
 * @param {string|number|string[]} props.value
 * @param {string|number|string[]} props.defaultValue
 * @param {string} props.placeholder
 * @param {function} props.onChange
 * @param {function} props.onKeyDown
 * @param {function} props.onFocus
 * @param {boolean} props.disabled
 * @param {boolean} props.readOnly
 * @param {boolean} props.autoFocus
 * @param {number} props.maxLength
 * @param {string} props.pattern
 * @param {'none'|'text'|'decimal'|'numeric'|'tel'|'search'|'email'|'url'} props.inputMode
 */
const Password = props => <PasswordBox {...props}/>

/**
 * @param {object} props 
 * @param {object|string} props.className
 * @param {object} props.style
 * @param {string|number|string[]} props.value
 * @param {string|number|string[]} props.defaultValue
 * @param {function} props.onChange
 * @param {function} props.onSearch
 * @param {function} props.onFocus
 * @param {boolean|ReactComponent} props.enterButton
 * @param {boolean} props.autoFocus
 */
const Search = props => <SearchBox {...props}/>

SuperInput.TextArea = TextArea
SuperInput.Password = Password
SuperInput.Search = Search

export default SuperInput