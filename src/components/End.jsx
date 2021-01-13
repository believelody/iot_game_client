import React from 'react'
import styled from 'styled-components'

const EndStyle = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 99;
    transform: translate(-50%, -50%);
    width: 90vw;
    height: 90vh;
`

export default function End({restart, setScore, score, setModal}) {

    return (
    <EndStyle>
        <h3>Partie terminée, Voulez vous recommencer?</h3>
        <h2>Votre score: {score}</h2>
        <p>
            <button 
                onClick={() => {
                    setScore(0)
                    setModal(true)
                    restart(false)
                }}
            >
                <b>Recommencer</b>
            </button>
        </p>
    </EndStyle>
    )
}
