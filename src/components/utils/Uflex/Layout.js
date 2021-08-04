import React from 'react';
import { Observer } from 'mobx-react-lite';
import { Layout as AntLayout } from 'antd';
import { isString, toBool } from '@Utils/Utils';
import styled, { css } from 'styled-components';

const { Header: AntHeader, Content: AntContent, Footer: AntFooter } = AntLayout

const StyledLayout = styled(AntLayout)`
    ${({ h100 }) => {

        let resultCSS = ''

        const isH100 = toBool(h100)

        if (isH100) {
            resultCSS += `
                height: 100%;
            `
        }

        return css`${resultCSS}`
    }}
`

/**
 * @param {boolean} h100 set height to 100%.
 * 
 * @param {object} props 
 * @param {boolean} props.h100
 */
export const UflexLayout = props => {

    const { ...restProps } = props

    return (
        <Observer>
        {() => (
            <StyledLayout 
                {...restProps} 
                prefixCls="uflex-layout"
                h100={props.h100 ? 'true' : 'false'}>
                {props.children}
            </StyledLayout>
        )}
        </Observer>
    )
}

const StyledHeader = styled(AntHeader)`
    ${({ h100 }) => {

        let resultCSS = ''

        const isH100 = toBool(h100)

        if (isH100) {
            resultCSS += `
                height: 100%;
            `
        }

        return css`${resultCSS}`
    }}
`

/**
 * @param {boolean} h100 set height to 100%.
 * 
 * @param {object} props 
 * @param {boolean} props.h100
 */
export const UflexHeader = props => {

    const { ...restProps } = props

    return (
        <Observer>
        {() => (
            <StyledHeader 
                {...restProps} 
                prefixCls="uflex-layout-header"
                h100={props.h100 ? 'true' : 'false'}>
                {props.children}
            </StyledHeader>
        )}
        </Observer>
    )
}

const StyledContent = styled(AntContent)`
    ${({ h100 }) => {

        let resultCSS = ''

        const isH100 = toBool(h100)

        if (isH100) {
            resultCSS += `
                height: 100%;
            `
        }

        return css`${resultCSS}`
    }}
`

/**
 * @param {*} props 
 * @param {boolean} props.h100 set height to 100%.
 * @param {number|string} props.minHeight set min-height.
 */
export const UflexContent = props => {

    const { h100, minHeight, ...restProps } = props

    return (
        <Observer>
        {() => (
            <StyledContent 
                {...restProps} 
                prefixCls="uflex-layout-content"
                h100={h100 ? 'true' : 'false'}
                minheight={minHeight ? minHeight : ''}>
                {props.children}
            </StyledContent>
        )}
        </Observer>
    )
}

const StyledFooter = styled(AntFooter)`
    ${({ h100, minheight }) => {

        let resultCSS = ''

        const isH100 = toBool(h100)
        const minHeight = minheight ? (isString(minheight) ? minheight : `${minheight}px`) : ''

        if (isH100) {
            resultCSS += `
                height: 100%;
            `
        }

        if (minHeight) {
            resultCSS += `
                min-height: ${minHeight};
            `
        }

        return css`${resultCSS}`
    }}
`

/**
 * @param {boolean} h100 set height to 100%.
 * 
 * @param {object} props 
 * @param {boolean} props.h100
 */
export const UflexFooter = props => {

    const { ...restProps } = props

    return (
        <Observer>
        {() => (
            <StyledFooter 
                {...restProps} 
                prefixCls="uflex-layout-footer"
                h100={props.h100 ? 'true' : 'false'}>
                {props.children}
            </StyledFooter>
        )}
        </Observer>
    )
}