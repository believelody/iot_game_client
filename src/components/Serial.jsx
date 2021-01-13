import React, { useRef } from 'react'
import { animated } from 'react-spring'

const trans = (x, y) => `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`

export default ({ joystick }) => {
    const serialRef = useRef()

    return (
        <animated.div
            className="serial"
            style={{
                backgroundColor: "black",
                transform: `translate3d(${joystick.x}px, ${joystick.y}px, 0) translate3d(-50%, -50%, 0)`
            }}
        />
    )
}
