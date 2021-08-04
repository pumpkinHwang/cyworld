import React from 'react';
import { Space as AntdSpace } from 'antd';
import { useObserver } from 'mobx-react';
import styled, { css } from 'styled-components';
import { isArray, toBool } from '../utils/Utils';
import first from 'lodash/first';
import last from 'lodash/last';

/**
 * Set components spacing to avoid components clinging together and set a unified space.
 * @param {number|array} size size of spacing could be number or array, 
 * divided by 2 for each direction when **Space** was enabled both directions. 
 * If `noTop`, `noBottom`, `noLeft`, `noRight` had been actived, 
 * the opposite side will not divided.
 * @param {'flex'|'block'|string} display could be any display type according to css.
 * @param {'px'|'pt'|'rem'|'em'|string} units could be any units according to css.
 * @param {'vertical'|'horizontal'} direction if `direction` no specified, **Space** will add padding to every side.
 * @param {'start'|'end'|'center'|'baseline'} align align position of **Space** items.
 * @param {boolean} noTop remove padding top and padding bottom will not divided by 2.
 * @param {boolean} noBottom remove padding bottom and padding top will not divided by 2.
 * @param {boolean} noLeft remove padding left and padding right will not divided by 2.
 * @param {boolean} noRight remove padding right and padding left will not divided by 2.
 * @param {boolean} w100 set `ant-space` width to 100%.
 * @param {boolean} h100 set `ant-space` height to 100%.
 * @param {boolean} itemsW100 set `ant-space-item` width to 100%.
 * @param {boolean} lastItemW100 set `ant-space-item:last-child` width to 100%.
 * 
 * @param {object} props 
 * @param {number|array} props.size
 * @param {'flex'|'block'|string} props.display
 * @param {'px'|'pt'|'rem'|'em'|string} props.units
 * @param {'vertical'|'horizontal'} props.direction
 * @param {'start'|'end'|'center'|'baseline'} props.align
 * @param {boolean} props.noTop
 * @param {boolean} props.noBottom
 * @param {boolean} props.noLeft
 * @param {boolean} props.noRight
 * @param {boolean} props.w100
 * @param {boolean} props.h100
 * @param {boolean} props.itemsW100
 * @param {boolean} props.lastItemW100
 * */
const Space = props => {

    return useObserver(() => 
        <StyledSpace
            size={props.size} 
            display={props.display ? props.display : 'flex'}
            units={props.units ? props.units : 'px'}
            direction={props.direction}
            notop={props.noTop ? 'true' : 'false'}  
            nobottom={props.noBottom ? 'true' : 'false'}
            noleft={props.noLeft ? 'true' : 'false'}
            noright={props.noRight ? 'true' : 'false'}
            w100={props.w100 ? 'true' : 'false'}
            h100={props.h100 ? 'true' : 'false'}
            itemsw100={props.itemsW100 ? 'true' : 'false'}
            lastttemw100={props.lastItemW100 ? 'true' : 'false'}
            align={props.align}>
            {props.children}
        </StyledSpace>
    )
}

const StyledSpace = styled(AntdSpace)`
    ${({direction, size, units, display, notop, nobottom, noleft, noright, w100, h100, itemsw100, lastttemw100 }) => {

        let resultCSS = ''
        let [pTop, pBottom, pLeft, pRight] = [0]

        const isW100 = toBool(w100)
        const isH100 = toBool(h100)
        const isItemsW100 = toBool(itemsw100)
        const isLastItemW100 = toBool(lastttemw100)

        if (direction) {
            if (direction === 'vertical') {
                pTop = size / 2
                pBottom = size / 2
                if (isArray(size)) {
                    if (size.length === 2) {
                        pTop = first(size)
                        pBottom = last(size)
                    }
                } else if (toBool(notop)) {
                    pBottom = size
                } else if (toBool(nobottom)) {
                    pTop = size
                }
            } else if (direction === 'horizontal') {
                pLeft = size / 2
                pRight = size / 2
                if (isArray(size)) {
                    if (size.length === 2) {
                        pLeft = first(size)
                        pRight = last(size)
                    }
                } else if (toBool(noleft)) {
                    pRight = size
                } else if (toBool(noright)) {
                    pLeft = size
                }
            }
        }

        let spaceItems = ''

        if (direction) {
            if (direction === 'vertical') {
                resultCSS = `
                    display: ${display};
                    ${toBool(notop) ? `` : `padding-top: ${pTop}${units};`}
                    ${toBool(nobottom) ? `` : `padding-bottom: ${pBottom}${units};`}
                `
                spaceItems += `
                    ${toBool(notop) ? `` : `margin-top: ${pTop}${units} !important;`}
                    ${toBool(nobottom) ? `` : `margin-bottom: ${pBottom}${units} !important;`}
                `
            } else if (direction === 'horizontal') {
                resultCSS = `
                    display: ${display};
                    ${toBool(noright) ? `` : `padding-right: ${pRight}${units};`}
                    ${toBool(noleft) ? `` : `padding-left: ${pLeft}${units};`}
                `
                spaceItems += `
                    ${toBool(noright) ? `` : `margin-right: ${pRight}${units} !important;`}
                    ${toBool(noleft) ? `` : `margin-left: ${pLeft}${units} !important;`}
                `
            }
        } else {
            resultCSS = `
                display: ${display};
                padding: ${size / 2}${units};
            `
        }

        if (isW100) {
            resultCSS += `
                width: 100%;
            `
        }

        if (isH100) {
            resultCSS += `
                height: 100%;
            `
        }

        if (isItemsW100) {
            spaceItems += `
                width: 100%;
            `
        }

        resultCSS += `
            .ant-space-item {
                ${spaceItems}
                &:last-child {
                    margin: 0 !important;
                    ${isLastItemW100 ? 'width: 100% !important;' : ''
                }
            }
        `

        return css`${resultCSS}`

    }}

`

export default Space