import React from 'react';
import { useObserver } from 'mobx-react';
import { trim, defaults } from '../utils/Utils';
import Statistic from 'antd/lib/statistic/Statistic';

/**
 * @param {object} props 
 * @param {number} props.precision
 * @param {string|number|string[]} props.value
 * @param {string|number|string[]|React.ReactNode} props.suffix
 * @param {string|number|string[]|React.ReactNode} props.prefix
 * @param {boolean} props.bold
 * @param {object} props.style
 * @param {string} props.className
 * @param {function} props.onClick
 */
const Numeric = props => {

    return useObserver(() =>
        <div onClick={props.onClick}>
            <Statistic 
                className={trim(`numeric ${props.bold ? 'text-bold' : ''} ${defaults(props.className, '')}`)} 
                precision={props.precision}
                value={props.value} 
                suffix={props.suffix}
                prefix={props.prefix}
                valueStyle={props.style}
            />
        </div>
    )
}

export default Numeric