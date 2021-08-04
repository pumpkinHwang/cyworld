import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Input as MobiscrollInput } from '@mobiscroll/react';
import { defaults, isNothing, trim } from '@Utils/Utils';
import ImgPasswordOn from '@Assets/icons/svg/password-on.svg';
import ImgPasswordOff from '@Assets/icons/svg/password-off.svg';

const Input = observer(props => {

    const { children, value, wrapperCls, htmlType, autoComplete, password, ...restProps } = props
    const [typePassword, setTypePassword] = useState('password')

    const onTogglePassword = () => {
        if (typePassword === 'password') {
            setTypePassword(htmlType ? htmlType : 'text')
        } else {
            setTypePassword('password')
        }
    }
    
    return (
        <div className={trim(`umobi-input ${wrapperCls} ${value ? '' : 'empty'} ${defaults(props.align, '')}`)}>
            <MobiscrollInput 
                value={isNothing(value) ? '' : value}
                /** Standard HTML Attributes */
                autoComplete={autoComplete ? 'on' : 'new-password'}
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                type={password ? typePassword : (htmlType ? htmlType : 'none')}
                /** Mobiscroll props */
                inputStyle="outline"
                {...restProps}>
                {children}
            </MobiscrollInput>
            {password && <TogglePassword onTogglePassword={onTogglePassword}/>}
        </div>
    )
})

/**
 * @param {object} props 
 * @param {function} props.onTogglePassword
 */
const TogglePassword = props => {

    const [toggle, setToggle] = useState(false)

    const toggleState = () => {
        setToggle(!toggle)
        if (props.onTogglePassword) props.onTogglePassword()
    }

    return (
        <div className="toggle-password" onClick={toggleState}>
            {(() => {
                if (toggle) {
                    return <img src={ImgPasswordOn} alt=""/>
                } else {
                    return <img src={ImgPasswordOff} alt=""/>
                }
            })()}
        </div>
    )
}

export { Input as default }