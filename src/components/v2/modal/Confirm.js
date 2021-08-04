import * as React from 'react'
import { Modal, Button } from 'antd'
import PropTypes from 'prop-types'
import './Modal.css'

// title, content,onOk, onCancel
const Confirm = ({ title, content, okText, cancelText, onOk, onCancel }) => {
    Modal.confirm({
        title,
        icon: null,
        content,
        okText,
        cancelText,
        onOk,
        onCancel
    })
}

Confirm.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func
}

Confirm.defaultProps = {
    title: '',
    content: '',
    okText: '확인',
    cancelText: '취소',
    onOk: () => {
        console.log('onOk call')
    },
    onCancel: () => {
        console.log('onCancel call')
    }
}

export default Confirm
