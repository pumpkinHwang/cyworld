import React, { useEffect, Suspense, useRef } from 'react';
import { useObserver } from 'mobx-react';
import { useImage } from 'react-image';
import { findString } from '@Utils/String';
import { isArray } from '@Utils/Utils';
import { chain } from 'lodash';
import { useSize } from 'ahooks';

/**
 * **Simage** is an overrided version of **React Image** (react-image). 
 * 
 * **React Image** allows one or more images to be used as fallback images in the event that 
 * the browser couldn't load the previous image. When using the component, you can specify 
 * any React element to be used before an image is loaded (i.e. a spinner) or in the event 
 * that the specified image(s) could not be loaded. When using the hook this can be achieved 
 * by wrapping the component with `<Suspense>` and specifying the fallback prop.
 * 
 * @param {*} props 
 * @param {string|array} props.src can be both internal or external. If you want to use an internal path. 
 * You can start your image path base on project's `assets/` (i.e. icon/home.png).
 * @param {ReactNode|string} props.loader messages or spinner while image loading.
 * @param {ReactNode|string} props.unloader messages or spinner when image failure.
 * @param {boolean} props.decode
 * @param {ReactNode} props.placeholder
 * @param {object} props.style 
 * @param {string|number} props.key
 * @param {string} props.alt
 * @param {object} props.onLoading
 * @param {object} props.onError
 */
const Simage = props => {

    const { key, alt, src, onLoading, onError, onChange, ref, ...restProps } = props
    const addProps = {}

    if (key) addProps.key = key
    if (alt) addProps.alt = alt

    useEffect(() => {
        if (props.onLoading !== undefined) {
            props.onLoading(true)
        }
    }, [])

    return useObserver(() =>
        <Suspense fallback={<>{props.loader}</>}>
            <ImgComponent 
                {...restProps} 
                addProps={addProps} 
                onError={onError} 
                onLoading={onLoading} 
                onChange={onChange}
                componentSrc={src} 
            />
        </Suspense>
    )
}

const ImgComponent = props => {

    const { addProps, componentSrc, onLoading, onError, onChange, ...restProps } = props

    const refImg = useRef()
    const sizeImg = useSize(refImg)

    const { src: legitSrc, isLoading, error } = useImage({
        srcList: (() => {
            return chain(componentSrc)
            .thru(function(value) {
                if (isArray(value)) {
                    const arr = []
                    value.map(item => {
                        arr.push(findString(item, 'http') ? item : require(`../../assets/${item}`).default)
                    })
                    return arr
                } else {
                    return findString(value, 'http') ? value : require(`../../assets/${value}`).default
                }
            })
            .value()
        })()
    })

    useEffect(() => {
        if (onLoading !== undefined) {
            onLoading(isLoading)
        }
    }, [isLoading])

    useEffect(() => {
        if (onError !== undefined) {
            onError(error)
        }
    }, [error])

    useEffect(() => {
        if (onChange !== undefined) {
            onChange(sizeImg)
        }
    }, [sizeImg])

    return (<img src={legitSrc} ref={refImg} {...restProps} {...addProps}/>)

}

export default Simage