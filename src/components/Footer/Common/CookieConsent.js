import { useState, useEffect } from 'react';
import { Observer, observer, useLocalObservable } from 'mobx-react-lite';
import { defaults, isNothing, isSomething, toBool } from '@Utils/Utils';
import { storeHomePage } from '@Stores/StoreHomePage';
import { storeBowser } from '@Stores/StoreBowser';
import { language } from '@Language';
import { Row, Col } from '@Uflex';
import Button from 'antd/es/button';
import styled from 'styled-components';
import Cookies from 'js-cookie';

const CookieConsent = observer(props => {

    const [description, setDescription] = useState()

    const localStore = useLocalObservable(() => ({
        data: null
    }))


    useEffect(() => {
        if (description && storeHomePage.isShowCookieConsent === false) {
            storeHomePage.isShowCookieConsent = true
        }
    }, [description])

    const onClickAccept = () => {
        storeHomePage.isShowCookieConsent = false
        Cookies.set('accept-cookie-consent', 'true', { path: 'cyword', domain: window.location.hostname, expires: 365 * 2 })
    }

    const colDescConfig = {
        xs: 22,
        sm: 22,
        md: 17,
        lg: 17,
        xl: 16,
        xxl: 14
    }

    const colButtonConfig = {
        xs: 22,
        sm: 22,
        md: 3,
        lg: 3,
        xl: 2,
        xxl: 2
    }

    return (
        <>
        {storeHomePage.isShowCookieConsent && 
            <StickyFooter>
                <div className="container-cookie-consent">
                    <Row justify="center" className="cookie-consent-row">
                        <Col {...colDescConfig} justify="center" align="middle" 
                            className={`cookie-consent-description${storeBowser.isMobile() ? ' mobile' : ''}`}>
                            {description && description}
                        </Col>
                        <Col {...colButtonConfig} justify="end" align="middle">
                            <div className={`cookie-consent-footer${storeBowser.isMobile() ? ' mobile' : ''}`}>
                                <Button 
                                    ghost 
                                    type="primary"
                                    size="small"
                                    block={storeBowser.isMobile()}
                                    onClick={onClickAccept}>
                                    {language.listen('cookie_consent_btn_ok')}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </StickyFooter>
        }
        </>
    )
})

const StickyFooter = ({ children }) => {
    return (
        <StyledStickyFooter ismobile={storeBowser.isMobile() ? 'true' : 'false'}>
            <div className="footer-phantom"/>
            <div className="footer-content">{children}</div>
        </StyledStickyFooter>
    )
}

const StyledStickyFooter = styled.div`
    .footer-phantom {
        display: block;
        height: ${props => toBool(props.ismobile) ? '15rem' : '80px'};
        width: 100%;
        background: #021F36;
    }
    .footer-content { 
        position: fixed;
        left: 0;
        bottom: 0;
        height: auto;
        width: 100%;
        padding: 20px 0 20px 0;
        background: #021F36;
        z-index: 1000;
    }
`

export default CookieConsent