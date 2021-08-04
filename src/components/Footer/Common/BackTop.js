import React from 'react';
import { observer } from 'mobx-react-lite';

import IMGBack from '@Assets/gotoback.svg';
import IMGBackHover from '@Assets/gotoback_hover.svg';

const BackTop = observer(props => {

    const onClickBackTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className="layout-back-to-top">
            <div className="footer-back-to-top" onClick={onClickBackTop}>
                <img src={IMGBack} className="non-hover"/>
                <img src={IMGBackHover} className="hover"/>
            </div>
        </div>
    )
})

export default BackTop