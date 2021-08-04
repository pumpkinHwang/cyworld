import React, { useRef } from 'react';
import { useObserver } from 'mobx-react';
import Input from 'antd/es/input';

/** 
 * @param {object} props
 * @param {boolean} props.autoFocus
 */
const SearchBox = props => {

    const refSearch = useRef()

    const { value, variant, align, ...rest } = props

    return useObserver(() => 
        <Input.Search 
            ref={refSearch}
            value={value}
            inputPrefixCls="super-input"
            autoComplete="new-password"
            autoCorrect="off"
            autoCapitalize="off" 
            spellCheck={false} 
            {...rest}/>
    )
}

export default SearchBox