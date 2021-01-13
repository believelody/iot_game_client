import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { useTrail, useSpring } from 'react-spring'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import Kuminai from './Kuminai';
import Ball from './Ball';
import Score from './Score';
import End from './End';
import Chrono from './Chrono';
import Modal from './Modal';
import Serial from './Serial';

const Back = styled.button`
  position: absolute;
  right: 10px;
  top: 5px;
`

const fast = { tension: 400, friction: 150 }
const slow = { mass: 10, tension: 200, friction: 50 }

export default ({ serialState, btn, joystick }) => {
  const initialChrono = 45
  const kuminaiRef = useRef()
  const [play, setPlay] = useState(true)
  const [serial, setSerial] = useState(serialState)
  const [moveJoystick, setMoveJoystick] = useState({x: window.screen.width / 2, y: window.screen.height / 2})
  const [modal, setModal] = useState(true)
  const [show, setShow] = useState(true)
  const [time, setTime] = useState()
  const [score, setScore] = useState(0)
  const [diff, setDiff] = useState(0)
  const [kuminai, setKuminai] = useState({x: 0, y: 0, width: 0, height: 0})
  const [ball, setBall] = useState({x: 0, y: 0, width: 0, height: 0, id: 0 })
  const [spring, setSpring] = useSpring(() => ({
    xy: [0, 0], 
    config: fast,
    onFrame: () => {
      const kuminaiDOM = ReactDOM.findDOMNode(kuminaiRef.current)
      setKuminai({
        x: kuminaiDOM ? Math.floor(kuminaiDOM.getBoundingClientRect().x) : 0,
        y: kuminaiDOM ? Math.floor(kuminaiDOM.getBoundingClientRect().y) : 0,
        width: kuminaiDOM ? kuminaiDOM.getBoundingClientRect().width : 0,
        height: kuminaiDOM ? kuminaiDOM.getBoundingClientRect().height : 0
      })
    }
  }))
  const [end, setEnd] = useState(false)

  useEffect(() => {
    if (!end) {
      setTime(setInterval(() => {
        // console.log("move")
        setShow(true)
        setDiff(0)
      }, 5000))
    }
  }, [])

  useEffect(() => {
    console.log(serialState);
      
    if (serialState && modal && !serial) {
      setSerial(true)
    }
    if (!serialState && !modal && serial) {
      setModal(true)
      setSerial(false)
    }
    if (!serialState && modal && serial) {
      setSerial(false)
    }
    if (!modal && serial) {
      if (joystick) {
        setMoveJoystick(prevMove => {
          setSpring({xy: [
            prevMove.x,
            prevMove.y
          ]})          

          return {
            x: joystick.x * window.screen.width / 1023,
            y: joystick.y * window.screen.height / 1023
          }
        })
      }
    }
  })
  
  useEffect(() => {
    if (!end) {
      if (ball.x !== 0 && ball.y !== 0) {
        let X_ARRAY = []
        let Y_ARRAY = []

        for (let i = ball.x; i <= ball.x + ball.width; i++) {
          X_ARRAY.push(Math.floor(i))
        }
        for (let i = ball.y; i <= ball.y + ball.height; i++) {
          Y_ARRAY.push(Math.floor(i))
        }

        if (X_ARRAY.find(x => x === kuminai.x) && Y_ARRAY.find(y => y === kuminai.y)) {
          setDiff(prevDiff => {
            if (prevDiff !== ball.id) {
              setScore(prevScore => prevScore + ball.id)
              return ball.id
            }
            return prevDiff
          })
        }
      }
    }
    else {
      setSpring({xy: [0, 0]})
    }
  })  

  return (
    <div 
      className='arena' 
      onClick={ e => {
        if (!end && !serial) setSpring({xy: [e.clientX, e.clientY]})
      }}
    >
      {
        modal && !end && 
        <Modal 
          serial={serial} 
          setSerial={setSerial} 
          setModal={setModal}
          setScore={setScore}
        />
      }
      {
        !end && !modal &&
        <>
          {
            serial && <Serial joystick={moveJoystick} />
          }
          <Kuminai ref={kuminaiRef} spring={spring} />
          <Chrono 
            setEnd={setEnd}
            initialChrono={initialChrono}
          />
          <Score score={score} />
          <Back>
            <NavLink to="/">Menu</NavLink>
          </Back>
          { show && <Ball setBall={setBall} setShow={setShow} /> }
        </>
      }
      {
        end && !modal &&
        <End restart={setEnd} setScore={setScore} score={score} setModal={setModal} />
      }
    </div>
  )
}