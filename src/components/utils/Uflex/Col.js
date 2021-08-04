import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Col as AntCol } from 'antd';

import { someOf, toBool } from '@Utils/Utils';

import first from 'lodash/first';
import last from 'lodash/last';
import styled, { css } from 'styled-components';

import { useResponsive } from 'ahooks';

const StyledCol = styled(AntCol)`
    ${({direction, justify, align, h100 }) => {

        let resultCSS = ''

        const isH100 = toBool(h100)

        if (direction) {
            resultCSS += `flex-direction: ${direction};`
        }

        if (justify) {
            if (justify === 'start') justify = 'flex-start'
            if (justify === 'end') justify = 'flex-end'
            resultCSS += `justify-content: ${justify};`
        }

        if (align) {
            if (align === 'middle') align = 'center'
            if (align === 'top') align = 'flex-start'
            if (align === 'bottom') align = 'flex-end'
            resultCSS += `align-items: ${align};`
        }

        if (justify || align) {
            resultCSS += `display: flex;`
        }

        if (isH100) {
            resultCSS += `
                height: 100%;
            `
        }

        return css`${resultCSS}`
    }}
`

export const UflexCol = observer(props => {

    const screens = useResponsive()

    const [breakpoint, setBreakpoint] = useState()

    useEffect(() => {
        setBreakpoint(first(last((Object.entries(screens).filter(screen => screen[1] === true)))))
    }, [screens])

    const { direction, justify, align, ...restProps } = props

    const isValidDirection = (value) => someOf(value, ['row', 'row-reverse', 'column', 'column-reverse'])
    const isValidJustify = (value) => someOf(value, ['center', 'start', 'end', 'space-around', 'space-between', 'space-evenly'])
    const isValidAlign = (value) => someOf(value, ['middle', 'top', 'bottom'])

    const foundProps = {}

    if (direction) {
        if (isValidDirection(direction)) {
            foundProps.direction = direction
        } else {
            if (direction[breakpoint]) {
                if (isValidDirection(direction[breakpoint])) {
                    foundProps.direction = direction[breakpoint]
                } else {
                    foundProps.direction = ''
                }
            } else {
                foundProps.direction = ''
            }
        }
    }

    // 'center'|'start'|'end'|'space-around'|'space-between'|'space-evenly'
    if (justify) {
        if (isValidJustify(justify)) {
            foundProps.justify = justify
        } else {
            if (justify[breakpoint]) {
                if (isValidJustify(justify[breakpoint])) {
                    foundProps.justify = justify[breakpoint]
                }
            }
        }
    }

    // 'middle'|'top'|'bottom'
    if (align) {
        if (isValidAlign(align)) {
            foundProps.align = align
        } else {
            if (align[breakpoint]) {
                if (isValidAlign(align[breakpoint])) {
                    foundProps.align = align[breakpoint]
                }
            }
        }
    }

    return (
        <StyledCol 
            {...restProps} 
            {...foundProps}
            h100={props.h100 ? 'true' : 'false'}>
            {props.children}
        </StyledCol>
    )
})