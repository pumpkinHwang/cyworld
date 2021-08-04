import React, { Component } from 'react'
import Switch from 'react-switch'
import PropTypes from 'prop-types'

const SwitchComponent = ({ checked, onChange }) => {
    return (
        <Switch
            onChange={onChange}
            checked={checked}
            uncheckedIcon={false}
            checkedIcon={false}
            onColor={'#0da9ef'}
            offColor={'#f5f5f5'}
        />
    )
}

//#f5f5f5
//#0da9ef
SwitchComponent.propTypes = {
    onChange: PropTypes.func,
    checked: PropTypes.bool
}

SwitchComponent.defaultProps = {
    onChange: () => {},
    checked: false
}

export default SwitchComponent
