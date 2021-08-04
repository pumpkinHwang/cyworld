import React, { useEffect, useState } from 'react';
import { Switch as AntdSwitch } from 'antd';
import PropTypes from 'prop-types';
import './Switch.scss';

const Switch = ({ type, ...props }) => {
  if (type === 'basic') {
    return <AntdSwitch {...props} />;
  }
  if (type === 'table') {
    return <AntdSwitch className="table_switch" {...props} />;
  }
};

export default Switch;

Switch.propTypes = {
  /** 버튼 타입  */
  type: PropTypes.oneOf(['basic', 'table']),
  /** 클릭 이벤트 */
  onClick: PropTypes.func,
};

Switch.defaultProps = {
  type: 'basic',
  onClick: () => {},
};
