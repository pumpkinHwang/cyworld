import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite'
import { appConfig } from '@Config';
import { store } from '@Stores/MainStore';
import { language as l } from '@Language';

const NotFound = observer(props => {

    const history = useHistory()

    return (
        <div className="offcanvas-wrapper padding-bottom-3x">
            <div className="container">
                <div className="padding-top-7x padding-bottom-2x text-center">
                    <h2 style={{ fontSize: "44px", fontColor: "#303a46" }}>
                        {l.listen('page_not_found', { autoPrefix: false })}
                    </h2>
                    <p className="padding-top-1x" style={{ fontSize: "18px" }} >
                        {l.isEnglish() && l.listen('page_not_found_description_1', { autoPrefix: false })}&nbsp;
                        {!store.isWebview && 
                            <a href={`/${appConfig.country}`}>
                                {l.listen('go_back_to_homepage', { autoPrefix: false })}
                            </a>
                        }
                        {store.isWebview && 
                            <button type="button" 
                                className={'a'} 
                                style={{ 
                                    color: '#0da9ef', textDecoration: 'underline', 
                                    textTransform: 'none', paddingLeft: 0, border: 'none' 
                                }} 
                                onClick={() => { 
                                    history.replace('/')
                                }}>
                                {l.listen('go_back_to_homepage', { autoPrefix: false })}
                            </button>
                        }
                    </p>
                    <div className="card-body padding-top-2x">
                        <div className="padding-top-1x padding-bottom-1x"></div>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default NotFound