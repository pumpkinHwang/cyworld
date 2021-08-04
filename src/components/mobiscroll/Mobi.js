import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import mobiscroll from "@mobiscroll/react";
import { isMobile } from '@Bowser';
import { MobiStyled } from './MobiStyled'
import './mobi.scss'

mobiscroll.settings = {
    theme: 'ios',
    themeVariant: 'light'
};

const Mobi = props => observer(() => <div></div>)
const Select = observer(props => {
    const { filterPlaceholderText, value, data, buttons, onSet, maxWidth, filter, rows, disabled } = props
    return (
        <div className="wrapper-mobi">
            <mobiscroll.Select
                display="bubble"
                filter={filter}
                touchUi={false}
                filterPlaceholderText={filterPlaceholderText}
                value={value} data={data}
                height={35}
                maxWidth={maxWidth ? maxWidth : 350}
                buttons={buttons}
                onSet={onSet}
                focusOnClose={false}
                rows={rows}
                disabled={disabled}
            >
                <mobiscroll.Input dropdown={true} disabled={disabled} />
            </mobiscroll.Select>
        </div>
    );
});

const Input = observer(props => {
    const { value, placeholder, onChange, type, disabled, className } = props
    return (
        <div className="wrapper-mobi">
            <mobiscroll.Input
                type={isMobile() ? 'tel' : 'number'}
                className={className}
                type={type ? type : 'text'}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
                autoComplete='new-password'
            >

            </mobiscroll.Input>
        </div>
    )
})

Mobi.Select = Select
Mobi.Input = Input
export default Mobi