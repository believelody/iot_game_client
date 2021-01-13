import React from 'react';
import axios from 'axios';
import MessageList from './MessageList';
import MessageForm from './MessageForm';


export default class MessageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: []
        };
    }

    componentDidMount = () => {
        const { client } = this.props;
        client.on("message", async (topic, message) => {
            console.log(`From topic: ${topic}: ${message.toString()}`);
            const tabMsg = this.state.message;
            tabMsg.unshift(message);
            this.setState({message: tabMsg});
        });      
    }    

    addMessage = (message) => {
        const { client } = this.props;
        // console.log(mqtt.options.clientId);
        client.publish('/iot_gime/test', message, 1);
        // const tabMsg = this.state.message;
        // tabMsg.push(message);
        // this.setState({message: tabMsg});
    }

    render() {
        return (
            <div>
                <MessageList data={this.state.message} />
                <MessageForm onSubmit={this.addMessage} />
            </div>
        )

    }
}