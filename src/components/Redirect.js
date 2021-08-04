import React from 'react';
import Spinner from './Spinner';
import { Badge } from 'antd';
import { useObserver } from 'mobx-react';
import { isLocalhost } from './GlobalHelpers';
import { When } from 'react-if';
import { devTools } from '../stores/MainStore';
import { isSomething } from './utils/Utils';

const Redirect = props => {
    return useObserver(() =>
        <div className="redirect-loading-container" style={props.style !== undefined ? props.style : {}}>
            <Spinner/>
            {/* <When condition={isLocalhost() && isSomething(devTools.loadingLog)}>
                <Badge className="mt-3" status="processing" text={
                    <>
                        <span className="text-bold">localhost</span>
                        <span className="ml-2">{devTools.loadingLog}</span>
                    </>
                }/>
            </When> */}
        </div>
    )
}

export default Redirect