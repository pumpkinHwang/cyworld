import React from 'react';
import { useObserver } from 'mobx-react';
import { Row, Col, Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography

const StyledRow = styled(Row)`
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 36px 0px;
    border-bottom: 1px solid #e1e7ec;
    background-color: #f5f5f5;
`

const PageTitle = props => {
    return useObserver(() => 
        <StyledRow>
            <Col>
                <Title level={1}>
                    {props.children}
                </Title>
            </Col>
        </StyledRow>
    )
}

export default PageTitle