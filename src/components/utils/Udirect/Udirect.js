import { useState, useEffect, cloneElement, Children as ReactChildren, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Lightbox from 'react-image-lightbox';
import { findString, lowerCase, someOfString } from '@Utils/String';
import { defaults, isArray, isString, someOf } from '@Utils/Utils';
import { isObservableArray } from 'mobx';
import Mustache from 'mustache';
import { isElement } from '../Element';
import { getCurrentDomain } from '@Components/configs/ConfigsHeader';
import { storeHistory } from '@Components/History';
import { loge } from '../PikaLog';
import { store } from '@Stores/MainStore';

const isLegitImage = (url) => someOfString(lowerCase(url), ['jpg', 'jpeg', 'png', 'gif', 'svg'])
const isLegitArray = (url) => isArray(url) || isObservableArray(url)

const mustacheTemplate = {
    domain: getCurrentDomain()
}

/** **Elements** wrapper for central logic link redirect. 
 * Component's children could be any type of **Element** or **String**.
 * If children are React/DOM elements, this component will clone new one without creating unnecessary tag. 
 * For **String** children, this component will wrapped it with `<span>` tag. Any unknow type of element, wrapped `<div>`.
 * 
 * @param {*} props
 * @param {string} props.url URL could be a single **String** or multiple urls in **Array of strings**.
 *  
 * All support image extentions (.jpg, .jpeg, .png, .gif, .svg) will open in **Lightbox**.
 * Which both support single or mutiple images.
 * 
 * The rest pattern of url will go to `window.open()` for a new tab or `history.push()` to path depend on url itself.
 * - External url: 'https://endpoint.com/doc/file.pdf'
 * - Internal url: '/catproduct/all'
 * - Multiple images: ['https://endpoint.com/img/picture1.png', 'https://endpoint.com/img/picture2.png']
 * 
 * @param {'_blank'|'_self'} props.target Override `window.open()` target, default value is **_blank**.
 * @param {boolean} props.external Force use `window.open()` on any url.
 * @param {object} props.onClick Override `onClick` with the new one. 
 * @param {object} props.onClickInterceptor  Fire this function before execute **Udirect**'s auto-generated `onClick`.
 * @returns {React.ReactNode} Return children itself, with auto-generated `onClick`.
 */
export const Udirect = props => <DirectTo {...props} />

const DirectTo = observer(props => {

    const { url, component, onClick, onClickInterceptor, ...restProps } = props

    const history = useHistory()

    const [type, setType] = useState('')
    const [isShowLightbox, setShowLightbox] = useState(false)
    const [imgLightbox, setImgLightbox] = useState([])
    const [photoIndex, setPhotoIndex] = useState(0)

    const isTypeLightbox = () => type === 'lightbox'
    const isTypeExternal = () => type === 'external'
    const isTypeInternal = () => type === 'internal'
    
    const processLogic = (input) => {
        if (input) {
            if (isLegitArray(input)) {
                // mutiple value
                const multipleURLs = input
                if (multipleURLs.length === 1) {
                    // only single value in array
                    processLogic(multipleURLs[0])
                } else {
                    // mutiple images with lightbox
                    const multipleImagesResult = []
                    multipleURLs.map(item => {
                        // replace mustache template tags
                        const legitItem = Mustache.render(item, mustacheTemplate)

                        if (isLegitImage(legitItem)) {
                            multipleImagesResult.push(legitItem)
                        }
                    })

                    if (multipleImagesResult.length > 0) {
                        setImgLightbox(multipleImagesResult)

                        if (props.external === true) {
                            setType('external')
                        } else {
                            setType('lightbox')
                        }
                    }
                }
            } else if (isString(input)) {
                // replace mustache template tags
                const legitInput = Mustache.render(input, mustacheTemplate)

                if (findString(legitInput, 'http')) {
                    // http or https
                    if (isLegitImage(legitInput)) {
                        // image lightbox
                        setImgLightbox(legitInput)

                        if (props.external === true) {
                            setType('external')
                        } else {
                            setType('lightbox')
                        }
                    } else {
                        // external link
                        setType('external')
                    }
                } else {
                    // internal link
                    setType('internal')
                }
            }
        }
    }

    useEffect(() => {
        processLogic(url)
    }, [url])

    const onClickExecute = () => {
        if (onClick) {
            // overrided onClick method
            onClick()
        } else {
            // apply interceptor method before run regular process
            if (onClickInterceptor) {
                onClickInterceptor()
            }
            // check url type and execute
            if (url) {
                if (isTypeLightbox()) {
                    // image lightbox
                    setShowLightbox(true)
                } else {
                    let legitURL = url
                    if (isLegitArray(url)) {
                        legitURL = url[0]
                    }

                    // replace mustache template tags
                    legitURL = Mustache.render(legitURL, mustacheTemplate)

                    if (isTypeExternal()) {
                        if (store.isWebview) {
                            // external link for webview
                            window.ReactNativeWebView.postMessage(JSON.stringify({ data: legitURL, targetFunc: 'redirect' }))
                        } else {
                            const legitTarget = someOf(props.target, ['_blank', '_self']) ? props.target : '_blank'
                            // external link
                            const openNewTab = window.open(legitURL, legitTarget)
                            openNewTab.focus()
                        }
                    } else if (isTypeInternal()) {
                         // internal link
                        if (storeHistory.isInitialized) {
                            if (legitURL.charAt(0) === '/') {
                                history.push(`${legitURL}`)
                            } else {
                                history.push(`/${legitURL}`)
                            }
                        } else {
                            loge('Udirect > History could not be use outside Router.')
                        }
                    }
                }
            }
        }
    }

    return (
        <Fragment>
            <Wrapper onClick={onClickExecute} {...restProps} udirect="true">
                {props.children}
            </Wrapper>
            {isTypeLightbox() && 
                (() => {
                    if (isShowLightbox) {
                        return (
                            <Lightbox
                                mainSrc={isLegitArray(imgLightbox) ? imgLightbox[photoIndex] : imgLightbox}
                                nextSrc={isLegitArray(imgLightbox) ? (imgLightbox[(photoIndex + 1) % imgLightbox.length]) : null}
                                prevSrc={isLegitArray(imgLightbox) ? (imgLightbox[(photoIndex + imgLightbox.length - 1) % imgLightbox.length]) : null}
                                onMovePrevRequest={() => setPhotoIndex((photoIndex + imgLightbox.length - 1) % imgLightbox.length)}
                                onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % imgLightbox.length)}
                                onCloseRequest={() => setShowLightbox(false)}
                            />
                        )
                    }
                })()
            }
        </Fragment>
    )
})

const Wrapper = ({ children, url, external, target, onClick, onClickInterceptor, ...restProps }) => {

    const childHandler = (child) => {
        if (isElement(child)) {
            return child
        } else if (isString(child)) {
            return <span>{child}</span>
        } else {
            return <div>{child}</div>
        }
    }

    return (
        <Fragment>
            {ReactChildren.map(children, child => cloneElement(childHandler(child), { onClick: onClick, ...restProps }))}
        </Fragment>
    )
}

Udirect.propTypes = {
    url: PropTypes.oneOfType([
        PropTypes.string, 
        PropTypes.arrayOf(PropTypes.string)
    ]).isRequired,
    external: PropTypes.bool,
    target: PropTypes.string,
    onClick: PropTypes.func,
    onClickInterceptor: PropTypes.func
}