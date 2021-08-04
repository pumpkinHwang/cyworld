import React, { useEffect, useState } from 'react';
import { Button as AntdButton } from 'antd';
import PropTypes from 'prop-types';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

const Button = ({ type, onClick, children, ...props }) => {
  if (type === 'basic') {
    return (
      <AntdButton onClick={onClick} {...props}>
        {children}
      </AntdButton>
    );
  }
  if (type === 'regist') {
    return (
      <AntdButton style={{ height: 40, width: 120, minWidth: 120, backgroundColor: 'skyblue', color: 'white', borderRadius: 30 }} onClick={onClick} {...props}>
        등록
      </AntdButton>
    );
  }
  if (type === 'more') {
    return (
      <AntdButton style={{ height: 50, width: 150, backgroundColor: 'skyblue', color: 'white', borderRadius: 30 }} onClick={onClick} {...props}>
        더 보기
      </AntdButton>
    );
  }
  if (type === 'save') {
    return (
      <AntdButton style={{ height: 50, width: 150, backgroundColor: 'skyblue', color: 'white', borderRadius: 30 }} onClick={onClick} {...props}>
        저장
      </AntdButton>
    );
  }

  if (type === 'add') {
    return (
      <AntdButton
        style={{ height: 30, width: 100, backgroundColor: 'white', borderRadius: 30, borderColor: 'skyblue', borderWidth: 1, color: 'skyblue' }}
        onClick={onClick}
        type="file"
        {...props}>
        추가
      </AntdButton>
    );
  }

  if (type === 'delete') {
    return (
      <AntdButton
        style={{ height: 30, width: 100, backgroundColor: 'white', borderRadius: 30, borderColor: 'red', borderWidth: 1, color: 'red' }}
        onClick={onClick}
        {...props}>
        삭제
      </AntdButton>
    );
  }
  if (type === 'list') {
    return (
      <AntdButton style={{ height: 50, width: 150, backgroundColor: 'gray', color: 'white', borderRadius: 30 }} onClick={onClick} {...props}>
        목록
      </AntdButton>
    );
  }
  if (type === 'Download') {
    return (
      <AntdButton style={{ height: 50, width: 150, backgroundColor: 'skyblue', color: 'white', borderRadius: 30 }} onClick={onClick} {...props}>
        다운로드
      </AntdButton>
    );
  }
  if (type === 'tableDelete') {
    return (
      <AntdButton
        style={{ height: 30, width: 70, backgroundColor: 'white', color: 'gray', borderRadius: 30, borderColor: 'gray' }}
        onClick={onClick}
        {...props}>
        삭제
      </AntdButton>
    );
  }
  if (type === 'tableEdit') {
    return (
      <AntdButton
        style={{ height: 30, width: 70, backgroundColor: 'white', color: 'skyblue', borderRadius: 30, borderColor: 'skyblue' }}
        onClick={onClick}
        {...props}>
        수정
      </AntdButton>
    );
  }

  if (type === 'tableOrderUp') {
    return <AntdButton icon={<CaretUpOutlined />} onClick={onClick} {...props} />;
  }

  if (type === 'tableOrderDown') {
    return <AntdButton icon={<CaretDownOutlined />} onClick={onClick} {...props} />;
  }

  if (type === 'tableDownload') {
    return (
      <AntdButton
        style={{ height: 30, width: 100, backgroundColor: 'white', color: 'skyblue', borderRadius: 30, borderColor: 'skyblue' }}
        onClick={onClick}
        {...props}>
        다운로드
      </AntdButton>
    );
  }
};

export default Button;

Button.propTypes = {
  /** 버튼 타입  */
  type: PropTypes.oneOf(['basic', 'regist', 'more', 'save', 'delete', 'list', 'tableDelete', 'tableEdit', 'tableOrderUp', 'tableOrderDown', 'add', 'tableDownload', 'Download']),
  /** 클릭 이벤트 */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'basic',
  onClick: () => {},
};
