import React, { useEffect, useState } from 'react'
import { Spring } from 'react-spring/renderprops';
import styled from 'styled-components'

const ChronoStyle = styled.div`
    position: absolute;
    bottom: 40px;
    left: 10px;
`

const chronoStyle = {
    position: "absolute",
    bottom: "40px",
    left: "10px"
}

const TextStyle = styled.span`
    font-weight: 15px;
    margin-left: 7px;
    font-size: 1em;
`

export default ({ setEnd, initialChrono }) => {

    return (        
        <Spring 
            config={{duration: initialChrono * 1000}} 
            from={{number: initialChrono}} 
            to={{number: 0}}
            onRest={
                () => setEnd(true)
            }
        >
            {
                props => (
                    <ChronoStyle>
                        <label>Time:</label>{' '}
                        <TextStyle>{props.number.toFixed()}</TextStyle>
                    </ChronoStyle>
                )
            }
        </Spring>
    )
}