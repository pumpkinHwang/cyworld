import React, { useState, useEffect } from 'react';
import { useObserver } from 'mobx-react';
import PropTypes from 'prop-types';

import { checkOutStore } from '@Stores/MainStore';
import { dictionary } from '@GlobalHelpers';

import { throatBoolean } from '../../configs/ConfigsHeader';
import { useWhen } from '@Utils/Hooks';

import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Checkbox from 'antd/es/checkbox';

import * as K from '../../configs/Keywords';

const confirmEmailList = {
    [K.All]: true
}

const printedInvoiceList = {
    [K.All]: false,
    [K.Thailand]: true
}

/**
 * 
 * @param {object} props 
 * @param {string} props.className
 * @param {array} props.gutter
 */
const SubscribeCheckBox = props => {
    const when = useWhen()
    const [isConfirmEmail, setConfirmEmail] = useState(false)
    const [isPrintedInvoice, setPrintedInvoice] = useState(false)

    useEffect(() => {
        setConfirmEmail(throatBoolean(confirmEmailList))
        setPrintedInvoice(throatBoolean(printedInvoiceList))
    }, [])

    const onCheckTC = e => {
        checkOutStore.isReceivedEmail = e.target.checked
    }

    const onCheckReceipt = e => {
        checkOutStore.isReceivedInvoice = e.target.checked
    }

    return useObserver(() => 
        <Row className={props.className} gutter={props.gutter}>
            {when(isConfirmEmail, 
                <Col span={24}>
                    <Checkbox 
                        onChange={onCheckTC} 
                        checked={checkOutStore.isReceivedEmail}>
                        {dictionary('confirmation_email_checkbox')}
                    </Checkbox>
                </Col>
            )}
            {when(isPrintedInvoice, 
                <Col span={24}>
                    <Checkbox 
                        onChange={onCheckReceipt} 
                        checked={checkOutStore.isReceivedInvoice}>
                        {dictionary('printed_invoice')}
                    </Checkbox>
                </Col>
            )}
        </Row>
    )
}

SubscribeCheckBox.propTypes = {
    className: PropTypes.string,
    gutter: PropTypes.array
}

SubscribeCheckBox.defaultProps = {
    className: 'mt-5',
    gutter: [0, 12]
}

SubscribeCheckBox.displayName = 'SubscribeCheckBox'
export default SubscribeCheckBox