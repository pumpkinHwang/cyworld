import * as React from 'react';
import { Modal, Button } from 'antd';
import PropTypes from 'prop-types';

// title, content,onOk, onCancel
const Alert = ({ title, content, okText, cancelText, onOk, onCancel }) => {
  Modal.info({
    title,
    icon: null,
    content,
    okText,
    onOk,
  });
};

Alert.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  okText: PropTypes.string,
  onOk: PropTypes.func,
};

Alert.defaultProps = {
  title: '',
  content: '',
  okText: '확인',
  onOk: () => {
    console.log('onOk call');
  },
};

export default Alert;
