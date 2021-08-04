import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { usePathnameInclude } from '@Components/History';
import { Delay as Defer } from 'react-delay-fallback';

const Footer = observer(props => {

    const isSkipDefer = usePathnameInclude(['login'])

    return (
        <>
        {(() => {
            return (
                <Defer timeout={isSkipDefer ? 0 : 500}>
                    <footer className="site-footer" style={{color: 'white'}}>
                        footer
                    </footer>
                    {/* <CookieConsent/> */}
                </Defer>
            )
        })()}
        </>
    )
})

export default Footer