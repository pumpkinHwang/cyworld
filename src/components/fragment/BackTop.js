import React from 'react';
import { ReactComponent as IconBackTop } from '@Assets/up-icon-new.svg';
import { BackTop as AntdBackTop } from 'antd';
import styled from 'styled-components';

const StyledBackTopContainer = styled.div`
    svg {
        width: 44px;
        height: 44px;
    }

    .ant-back-top {
        bottom: 32px;
        right: 32px;
    }
`

const BackTop = props => {

    return (
        <StyledBackTopContainer>
            <AntdBackTop duration={0}>
                <div>
                    <IconBackTop/>
                </div>
            </AntdBackTop> 
        </StyledBackTopContainer>
    )
}

export default BackTop