import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import mqtt from 'mqtt';
import './App.css';
// import { Connector, subscribe } from 'mqtt-react';

import MessageContainer from './components/MessageContainer';
import Menu from './components/Menu';
import Solo from './components/Solo';

// const MessageContainer = subscribe({ topic: '/iot_gime/test' })(_MessageContainer);

const client = mqtt.connect("ws://localhost:5002", {
  clean: false,
  clientId: 'client-iot-gime'
});

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    client.on('connect', () => {
      client.subscribe('/iot_gime/+', { qos: 1 })
    });

    client.on("message", async (topic, message, packet) => {     
      if (topic === "/iot_gime/joystick") {
        this.setState(prevState => ({
          ...prevState,
          serial: JSON.parse(message).serial,
          joystick: {
            x: JSON.parse(message).x,
            y: JSON.parse(message).y
          }
        }))
      }

      if (topic === "/iot_gime/btn") {
        this.setState(prevState => ({
          ...prevState,
          btn: message
        }))
      }

      if (topic === "/iot_gime/serial") {
        this.setState(prevState => ({...prevState, serial: message.toString()}))
      }
    })
  }

  render() {
    const { joystick, btn, serial } = this.state
    
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Menu} />
          <Route 
            exact 
            path="/solo" 
            render={
              () => <Solo 
                joystick={joystick}
                btn={btn}
                serialState={serial} 
              />
            } 
          />
        </Switch>
      </Router>
    )
  }
}

export default App;