import React, { useState, useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { isSomething, defaults, trim } from '../utils/Utils';
import { dictionary } from '../GlobalHelpers';
import Row from 'antd/es/row';
import Col from 'antd/es/col'; 
import Alert from 'antd/es/alert';
import PropTypes from 'prop-types';

/**
 * @param {object} props 
 * @param {object|string} props.alertClassName
 * @param {object} props.alertStyle
 * @param {object|string} props.className
 * @param {object} props.style
 * @param {array|object} props.list
 * @param {string} props.name
 * @param {'error'|'warning'|'success'|'info'} props.type
 * @param {number|text} props.span
 * @param {number|text} props.xs
 * @param {number|text} props.sm
 * @param {number|text} props.lg
 * @param {number|text} props.xl
 * @param {number|text} props.xxl
 * @param {boolean} props.noFrame
 */
const SuperAlert = props => {
    SuperAlert.propTypes = {
        alertClassName: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        alertStyle: PropTypes.object,
        className: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        style: PropTypes.object,
        name: PropTypes.string,
        type: PropTypes.string
    }

    SuperAlert.defaultProps = {
        list: [],
        name: '',
        type: 'error'
    }

    const { 
        className, style, alertClassName, alertStyle, 
        list, type, description, title, name, span,
        ...customProps } = props

    SuperAlert.displayName = `SuperAlert${isSomething(name) ? `-${name}` : ``}`

    const renderList = () => {
        if (isSomething(list)) {
            return list.map((message, index) => {
                // test suspected dictionary key 
                let output = message
                if ((/^[a-z0-9_-]+$/g).test(message)) {
                    const d = dictionary(message, true, true)
                    if (d.indexOf(']') > -1) {
                        // dictionary not contained this key
                        output = message
                    } else {
                        // dictionary key
                        output = d
                    }
                }
                return <li key={index}>{(output)}</li>
            })
        } else {
            return []
        }
    }

    const isNoFrame = props.noFrame !== undefined || props.noFrame === true
    let additionalClassName = ''
    if (isNoFrame) additionalClassName += 'no-frame'

    const [responsiveGrid, setResponsiveGrid] = useState({ span: 24 })

    useEffect(() => {
        setResponsiveGrid({
            span: defaults(props.span, 24),
            xs: props.xs,
            sm: props.sm,
            md: props.md,
            lg: props.lg,
            xl: props.xl,
            xxl: props.xxl
        })
    }, [props.span, props.xs, props.sm, props.md, props.lg, props.xl, props.xxl])

    return useObserver(() => {
        if (isSomething(list)) {
            return (
                <Row justify="center" 
                    className={trim(`super-alert ${additionalClassName} ${defaults(className, '')}`)} style={style}>
                    <Col {...responsiveGrid}>
                        <Alert {...customProps}
                            className={alertClassName}
                            style={alertStyle}
                            type={defaults(type, 'error')}
                            description={<ul>{renderList()}</ul>}
                        />
                    </Col>
                </Row>
            )
        } else {
            return null
        }
    })
}

export default SuperAlert