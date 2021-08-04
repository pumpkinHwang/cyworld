import { forwardRef } from 'react';
import { observer } from 'mobx-react-lite';
import SVG from 'react-inlinesvg';
import styled from 'styled-components';
import { isString } from '@Utils/Utils';

/**
 * @param {object} props 
 * @param {boolean} props.external
 * @param {string} props.src
 * @param {string} props.icon
 * @param {string} props.fill
 * @param {string|number} props.width
 * @param {string|number} props.height
 * @param {ReactComponent} props.loader
 * @param {function} props.onError
 * @param {function} props.onLoad
 * @param {function} props.preProcessor
 * @param {string} props.title
 * @param {string} props.description
 * @param {ReactComponent|string} props.fallback
 * @param {string|object} props.className
 * @param {object} props.style
 * */
const Sicon = observer((props) => {

    const { icon, external, src, fallback, children, fill, ...restProps } = props

    return (
        <>
        {external ?
            <StyledSVG 
                src={src} 
                fill={fill} 
                {...restProps}
            >
                {fallback && fallback}
            </StyledSVG>
            :
            <>
            {icon &&
                <StyledSVG 
                    src={require(`../../assets/icons/svg/${icon}.svg`).default}
                    {...restProps} 
                    fill={fill} 
                >
                    {fallback && fallback}
                </StyledSVG>
            }
            </>
        }
        </>
    )
})

const CustomSVG = forwardRef((props, ref) => {
    if (isString(props.src)) {
        return <SVG innerRef={ref} {...props} />
    } else {
        return <></>
    }
})

const StyledSVG = styled(CustomSVG)`
    /** CSS for SVG component */
    /* width: .375em; */
    height: 1em;
    display: inline-block;
    font-size: inherit;
    overflow: visible;
    vertical-align: -.125em;
    fill: ${({ fill }) => fill ? fill : 'currentColor'};
`

export default Sicon