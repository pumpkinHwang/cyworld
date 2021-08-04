import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { defaults, trim, isNothing } from './utils/Utils';
import PropTypes from 'prop-types';

const Spinner = observer(props => {
    const defaultSpinnerClassName = 'loadingImage'
    const defaultClassName = 'container'

    Spinner.propTypes = {
        spinnerClassName: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        className: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        style: PropTypes.object,
        spinnerStyle: PropTypes.object
    }

    const [className, setClassName] = useState(defaults(props.className, defaultClassName))

    const { spinnerClassName, spinnerStyle, ...customProps } = props

    useEffect(() => {
        setClassName(trim(`${defaultClassName} ${defaults(props.className, '')}`))
    }, [props])

    return (
        <div {...customProps} className={className}>
            <div className={isNothing(spinnerClassName) ? defaultSpinnerClassName : spinnerClassName} style={isNothing(spinnerStyle) ? {} : spinnerStyle}></div>
        </div>
    )
})

export default Spinner