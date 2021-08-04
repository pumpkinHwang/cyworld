import { useState, useEffect } from 'react'
import { observer, useLocalObservable } from 'mobx-react'
import {
    getBreakpoint,
    someOf,
    toBool
} from '@Utils/Utils'
import { storeBowser } from '@Stores/StoreBowser'
import styled, { css } from 'styled-components'
import { useResponsive } from 'ahooks'
import { ReactComponent as SVGHamBars } from '@Assets/icons/svg/hamburger-bars.svg'
import { Header as UflexHeader } from '@Uflex'
import './Style/Style.scss'
import _ from 'lodash'

const Header = observer(props => {

    const screens = useResponsive()
    const [breakpoint, setBreakpoint] = useState('')

    useEffect(() => {
        setBreakpoint(getBreakpoint(screens))
    }, [screens])


    return (
        <div
            style={{
                position: 'sticky',
                top: 0,
                left: 0,
                right: 0,
                minHeight: '78px !important',
                zIndex: 999
            }}>
            
            <StyledHeader
                className={`pwblock wrap-layout navbar navbar-sticky navbar-stuck site-wrap`}
                type={storeBowser.type}
                breakpoint={breakpoint}>
                {/* Site Logo */}
                <div className="site-branding">
                    <div className="inner">
                        <div className="inner-menu">
                            <div
                                className="offcanvas-toggle"
                                onClick={() => {
                                    props.onClickMenu()
                                }}>
                                <SVGHamBars />
                            </div>
                        </div>
                    </div>
                </div>

            </StyledHeader>
           
        </div>
    )
})

const StyledHeader = styled(UflexHeader)`
    .inner-menu {
        border-right: 1px solid #e1e7ec;
    }

    .offcanvas-toggle svg {
        width: 20px;
        padding-top: 4px;
    }

    .site-logo {
        cursor: pointer;
        padding-left: ${({ breakpoint }) =>
            someOf(breakpoint, ['xs', 'sm']) ? '6px' : '2rem'};
    }

    .site-logo svg {
        height: ${({ breakpoint }) =>
            someOf(breakpoint, ['xs', 'sm']) ? '17px' : 'auto'};
    }

    .toolbar .inner .tools {
        text-align: right;

        .login-btn {
            padding-top: 7px;
        }
    }
`

export default Header
