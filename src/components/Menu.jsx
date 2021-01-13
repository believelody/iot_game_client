import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Title = styled.h1`
  box-sizing: border-box;
  padding: 20px 0;
  width: 300px;
  margin: 0 auto;
`

const List = styled.ul`
  position: relative;
  list-style: none;
  margin: 20px auto;
  width: 60%;
  height: auto;
  border: 1px solid black;
  border-radius: 10px;
  padding: 15px;
`

const Item = styled.li`
  border: 1px silver ridge;
  height: auto;
  width: 100%;
  padding: 2% 0;
  box-sizing: border-box;
`

const Text = styled.span`
  margin: 50%;
  width: auto;
  box-sizing: border-box;
`

const Menu = () => {
  return (
    <>
      <Title>IoT Game Project: Ka Minaia</Title>
      <List>
        <NavLink to="/solo">
          <Item><Text>Solo</Text></Item>
        </NavLink>
        <NavLink to="/multi">
          <Item><Text>Multi</Text></Item>
        </NavLink>
      </List>
    </>
  )
}

export default Menu
