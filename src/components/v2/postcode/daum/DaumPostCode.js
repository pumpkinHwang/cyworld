import React, { Component } from 'react';
import DaumPostcode from 'react-daum-postcode';

const FindAddr = ({ onComplete }) => {
  const postCodeStyle = {
    display: 'block',
    position: 'absolute',
    top: '0px',
    zIndex: '100',
    padding: '0px',
  };

  return (
    <DaumPostcode
      onComplete={onComplete}
      style={postCodeStyle}
      height={'100%'}
    />
  );
};
export default FindAddr;
