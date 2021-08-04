/* eslint-disable */
import React from 'react';
import '../css/OverlayPanel.css'

const OverlayPanel = props => {
    const {
        style = {},
        className = ``,
        InnerComponent,
    } = props

    return (
        <div className={`overlay-panel ${className}`}
            style={style}
        >
            {InnerComponent && <InnerComponent />}
        </div >
    );
};

export default OverlayPanel;
