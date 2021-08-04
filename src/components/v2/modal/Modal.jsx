import * as React from 'react'
import DS from './Modal.module.scss'
import './Modal.css'
import cn from 'classnames'
import PropTypes from 'prop-types'
// import Modal from 'react-bootstrap/Modal';
import { Modal, Button } from 'antd'

const ModalComponent = ({
    title = '',
    style,
    showModal,
    handleCloseModal,
    children,
    onOk,
    onCancel,
    maskClosable,
    isBtnClose
}) => {
    return (
        <Modal
            title={title}
            centered
            visible={showModal}
            onOk={onOk}
            onCancel={onCancel}
            style={style}
            maskClosable={maskClosable}
            closable={isBtnClose}
            footer={null}>
            {children}
        </Modal>
    )
    return (
        <Modal
            size="lg"
            show={showModal}
            onHide={handleCloseModal}
            aria-labelledby="example-modal-sizes-title-lg">
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Large Modal
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>...</Modal.Body>
        </Modal>
    )
    return (
        <Modal
            size="lg"
            //className={cn(DSC['custom-map-modal'], DSC['modal-content'])}
            style={style}
            show={showModal}
            onHide={handleCloseModal}
            animation={true}>
            {children}
        </Modal>
    )
}
ModalComponent.propTypes = {
    showModal: PropTypes.bool,
    handleCloseModal: PropTypes.func,
    style: PropTypes.object,
    maskClosable: PropTypes.bool,
    isBtnClose: PropTypes.bool
}

ModalComponent.defaultProps = {
    style: {
        width: '100%',
        height: '100%'
    },
    showModal: false,
    handleCloseModal: () => {},
    maskClosable: true,
    isBtnClose: true
}

export default ModalComponent
