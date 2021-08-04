import React, { useState, useEffect } from 'react';
import { If, Then, Else } from 'react-if';
import { defaults } from '../utils/Utils';
import { Icon } from './FontAwesome';
import PropTypes from 'prop-types';

export const SpinnerInline = props => {
    SpinnerInline.propTypes = {
        spin: PropTypes.bool,
        className: PropTypes.string
    }

    const [spin, setSpin] = useState(defaults(props.spin, true))

    useEffect(() => {
        setSpin(defaults(props.spin, true))
    }, [props.spin])

    return (
        <If condition={spin}>
            <Then><Icon {...props} spin={null} icon="fas fa-spin fa-spinner"/><span>{props.children}</span></Then>
            <Else><span></span></Else>
        </If>
    )
}