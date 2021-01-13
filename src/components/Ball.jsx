import React, { useState, useEffect, useRef, forwardRef } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { useSpring, animated, useTransition, useSprings, useChain } from 'react-spring'

const ValueStyle = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1.2px solid white;
  border-radius: 50%;
  padding: 3px;
`

const ballStyle = {
  width: 40,
  height: 40,
  borderRadius: "50%",
  border: "none",
  backgroundColor: "green",
  color: "black",
  position: "relative"
}

const slow = { mass: 300, tension: 60, friction: 100 }
const gentle = { mass: 1, tension: 120, friction: 14, easing: 'd3-ease' }

export default ({setBall, setShow}) => {
  const springRef = useRef()
  const transRef = useRef()

  const [value, setValue] = useState(Math.floor(Math.random() * 4) + 1)
  const [top, setTop] = useState(Math.floor(Math.random() * 2) === 1 ? window.screen.height : -40)
  const [left, setLeft] = useState(Math.floor(Math.random() * (window.screen.width - 20)) + 20)

  const spring = useSpring({ 
    from: { top, left }, 
    top: top === -40 ? window.screen.height : -40,
    config: { duration: 4900},
    onRest: () => setShow(false),
    onFrame: () => {
      const ballDOM = ReactDOM.findDOMNode(springRef.current)
      setBall({ 
        x: ballDOM.getBoundingClientRect().x, 
        y: ballDOM.getBoundingClientRect().y, 
        width: ballDOM.getBoundingClientRect().width, 
        height: ballDOM.getBoundingClientRect().height,
        id: parseInt(ballDOM.id),
      })
    },
  })

  // const trans = useTransition(value, null, { 
  //   from: {
  //     transform: `translate(${left}px, ${top}px)`
  //   }, 
  //   enter: {
  //     transform: `translate(${left}px, ${top === -40 ? window.screen.height : -40}px)`
  //   },
  //   leave: {
  //     transform: `translate(${left}px, ${top}px)`
  //   },
  //   unique: true,
  //   reset: true,
  //   config: { duration: 5000 },
  //   onRest: () => {
  //     setTop(Math.floor(Math.random() * 2) === 1 ? window.screen.height : -40)
  //   },
  //   onFrame: () => {
  //   }
  // })

  // const springs = useSprings(balls.length, balls.map(ball => ({
  //   from: { top, left },
  //   to: { top: top === -20 ? window.screen.height : -20 },
  //   config: slow
  // })))

  // useChain([springRef, transRef])

  return (
    <animated.div
      style={{
        ...spring,
        ...ballStyle
      }}
      id={value}
      ref={springRef}
    >
      <ValueStyle>{value}</ValueStyle>
    </animated.div>
  )
}


// (
//   <animated.div
//     style={{
//       ...spring,
//       ...ballStyle
//     }}
//     id={value}
//     ref={springRef}
//   >
//     <ValueStyle>{value}</ValueStyle>
//   </animated.div>)