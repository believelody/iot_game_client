import React, { useEffect, useRef, forwardRef } from 'react'
import { animated } from 'react-spring'
// import styled from 'styled-components'

// const Kuminai = styled.div`
//   position: absolute;
//   border: 1px silver ridge;
//   border-radius: 50%;
//   will-change: transform;
//   opacity: .6;
//   background-color: rgb(26, 31, 17);
//   width: 15px;
//   height: 15px;
// `

const trans = (x, y) => `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`

export default forwardRef(({spring}, ref) => {
  
  return (
    <animated.div 
      className="kuminai"
      ref={ref}
      style={{transform: spring.xy.interpolate(trans)}} 
    />
  )
})