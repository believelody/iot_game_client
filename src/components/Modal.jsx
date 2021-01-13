import React from 'react'
import styled from 'styled-components'

const Shadow = styled.div`
    position: absolute;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const Modal = styled.div`
    position: absolute;
    background-color: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 700px;
    max-height: 700px;
`


export default ({ serial, setSerial, setModal, setScore }) => {    
  return (
    <Shadow>
      <Modal>
        {
            !serial &&
            <div>
                <p>Veuillez patienter nous nous connectons à la manette.</p>
                <button 
                    onClick={() => {
                        setScore(0)
                        setSerial(false)
                        setModal(false)
                    }}
                >
                    Cliquez ici pour jouer sans la manette
                </button>
            </div>
        }
        {
            serial &&
            <div>
                <p>La manette a été détectée</p>
                <button
                    onClick={() => {
                        setScore(0)
                        setModal(false)
                    }}
                >
                    Cliquez ici pour jouer avec la manette
                </button>
                <button
                    onClick={() => {
                        setScore(0)
                        setSerial(false)
                        setModal(false)
                    }}
                >
                    Cliquez ici pour jouer sans la manette
                </button>
            </div>
        }
      </Modal>
    </Shadow>
  )
}
