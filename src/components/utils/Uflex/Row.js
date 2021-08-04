import { useEffect } from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import { Row as AntRow } from 'antd';
import { getBreakpoint, isSomething, someOf, toBool, trim } from '@Utils/Utils';
import styled, { css } from 'styled-components';
import { useResponsive } from 'ahooks';

const StyledRow = styled(AntRow)`
    ${({ direction, h100 }) => {

        let resultCSS = ''

        const isH100 = toBool(h100)

        if (direction) {
            const legitDirection = direction
            resultCSS += `flex-direction: ${legitDirection};`
        }

        if (isH100) {
            resultCSS += `
                height: 100%;
            `
        }

        return css`${resultCSS}`
    }}
`

export const UflexRow = observer(props => {

    const { direction, ...restProps } = props

    const screens = useResponsive()

    const localStore = useLocalObservable(() => ({
        localProps: {}
    }))

    const isValidDirection = (value) => someOf(value, ['row', 'row-reverse', 'column', 'column-reverse', 'inherit', 'initial', 'unset'])

    useEffect(() => {
        updateDirection()
    }, [screens])

    useEffect(() => {
        updateDirection()
    }, [direction, props.className, props.gutter])

    const updateDirection = () => {
        const breakpoint = getBreakpoint(screens)
        if (direction) {
            if (isValidDirection(direction)) {
                localStore.localProps.direction = direction
            } else {
                if (direction[breakpoint]) {
                    if (isValidDirection(direction[breakpoint])) {
                        localStore.localProps.direction = direction[breakpoint]
                    } else {
                        localStore.localProps.direction = ''
                    }
                } else {
                    localStore.localProps.direction = ''
                }
            } 
        }

        let isWithGutter = false
        let acceptedGutter = isSomething(props.gutter) ? props.gutter : []
        if (isSomething(props.gutter)) {
            isWithGutter = true
            localStore.localProps.gutter = acceptedGutter
        }

        let acceptedClassName = isSomething(props.className) ? props.className : ''
        if (isWithGutter) {
            localStore.localProps.className = `${trim(acceptedClassName)} with-gutter`
        } else {
            localStore.localProps.className = `${trim(acceptedClassName)}`
        }
    }

    return (
        <StyledRow 
            {...restProps} 
            direction={localStore.localProps.direction}
            className={localStore.localProps.className}
            h100={props.h100 ? 'true' : 'false'}>
            {props.children}
        </StyledRow>
    )
})