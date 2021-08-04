import React, { useEffect, useState } from 'react';
import { Select as AntdSelect } from 'antd';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';

const { Option } = AntdSelect;

const Select = ({ options, disabled, onChange, value, type, ...props }) => {
  const [initValue, setInitValue] = useState(value);
  useEffect(() => {
    setInitValue(value);
    onChange(value);
  }, [value]);

  const onChangeHandler = e => {
    setInitValue(e);
    onChange(e);
  };

  if (type === 'basic') {
    return (
      <AntdSelect
        disabled={disabled}
        value={initValue}
        onChange={onChangeHandler}
        style={{
          width: '100%',
          minWidth: 100,
          height: 40,
        }}
        {...props}>
        {options.map(item => {
          return (
            <Option key={item.label + item.value} value={item.value} disabled={item.disabled}>
              {item.label}
            </Option>
          );
        })}
      </AntdSelect>
    );
  }
  if (type === 'permission') {
    return (
      <AntdSelect
        // style={{ width: '100%', minWidth: 100, height: '100%', backgroundColor: 'red', borderRadius: 50 }}
        disabled={disabled}
        value={initValue}
        onChange={onChangeHandler}
        style={{
          width: '100%',
          minWidth: 100,
          height: 40,
          backgroundColor: 'white',
          borderRadius: 50,
          color: 'skyblue',
          textAlign: 'center',
          border: '2px solid skyblue',
        }}
        bordered={false}
        {...props}>
        {options.map(item => {
          return (
            <Option key={item.label + item.value} value={item.value} disabled={item.disabled}>
              {item.label}
            </Option>
          );
        })}
      </AntdSelect>
    );
  }
  if (type === 'editPermission') {
    return (
      <AntdSelect
        disabled={disabled}
        value={initValue}
        onChange={onChangeHandler}
        style={{
          width: '100%',
          minWidth: 100,
          height: 40,
          backgroundColor: 'white',
          borderRadius: 50,
          color: 'skyblue',
          border: '2px solid skyblue',
        }}
        bordered={false}
        {...props}>
        {options.map(item => {
          return (
            <Option key={item.label + item.value} value={item.value} disabled={item.disabled}>
              {item.label}
            </Option>
          );
        })}
      </AntdSelect>
    );
  }

  if (type === 'shopCategory') {
    return (
      <AntdSelect
        // style={{ width: '100%', minWidth: 100, height: '100%', backgroundColor: 'red', borderRadius: 50 }}
        disabled={disabled}
        value={initValue}
        onChange={onChangeHandler}
        style={{
          width: '100%',
          minWidth: 100,
          height: 50,
          backgroundColor: 'white',
          borderRadius: 50,
          color: 'skyblue',
          textAlign: 'center',
          border: '2px solid skyblue',
        }}
        bordered={false}
        {...props}>
        {options.map(item => {
          return (
            <Option key={item.label + item.value} value={item.value} disabled={item.disabled}>
              {item.label}
            </Option>
          );
        })}
      </AntdSelect>
    );
  }
};

export default Select;

Select.propTypes = {
  /** 필수 데이터 값  * */
  // eslint-disable-next-line react/require-default-props
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      disabled: PropTypes.bool,
    }),
  ).isRequired,
  /** 셀렉트 비활성화 */
  disabled: PropTypes.bool,
  /** 변경 이벤트  */
  onChange: PropTypes.func,
  /** 기본값 */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** 유형 */
  type: PropTypes.oneOf(['basic', 'permission', 'editPermission', 'shopCategory']),
};

Select.defaultProps = {
  // options: undefined,
  disabled: false,
  onChange: () => {},
  value: undefined,
  type: 'basic',
};
