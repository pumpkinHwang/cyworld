import React, { useEffect } from 'react';
// import rrwebPlayer from 'rrweb-player';
import styled from 'styled-components';

const Replayer = props => {

    useEffect(() => {
        const { events } = props
        /* new rrwebPlayer({
            target: document.getElementById('wrapper-replay'),
            data: {
                events,
                autoPlay: true
            }
        }) */
    }, [])

    return (
        <StyledWrapper id="wrapper-replay">


        </StyledWrapper>
    )
}

const StyledWrapper = styled.div`
    display: flex;
    justify-content: center;

    .replayer-wrapper {
        width: 100%;
    }
`

export default Replayer