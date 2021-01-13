import React from 'react'
import styled from 'styled-components'

const ScoreStyle = styled.span`
    margin-left: 10px;
`
const WrapperStyle = styled.div`
    position: absolute;
    padding: 5px;
    left: 15px;
    top: 10px;
`

const Score = ({score}) => {
    return (
        <WrapperStyle>
            <label>Score:</label>
            <ScoreStyle>{score}</ScoreStyle>
        </WrapperStyle>
    )
}

export default Score