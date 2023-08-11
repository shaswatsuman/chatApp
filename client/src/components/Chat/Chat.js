import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { URLSearchParams } from 'Url';
import io from 'socket.io-client';
import './Chat.css'
import InfoBar from '../InfoBar/InfoBar';
import InfoBar from '../Input/Input';
import Messages from '../Messages/Messages';
import RoomContent from '../Content/Content';

let socket;

// let connectionOptions =  {
//     "force new connection" : true,
//     "reconnectionAttempts": "Infinity", 
//     "timeout" : 10000,                  
//     "transports" : ["websocket"]
// };

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000';

    // const onChangeHandler = (event) => {
    //     setMessage(event.target.value);
    // }

    // const onKeyPressHandler = (event) => {
    //     if (event.key === 'Enter') {
    //         sendMessage(event);
    //     }
    // }

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const name = urlParams.get('name');
        const room = urlParams.get('room');

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', {name, room}, (error) => {
            if(error) {
              alert(error);
            }
          });

          return () => {
            socket.emit('disconnect');
            socket.off();
          }
        }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    console.log(message, messages);

    return (
        <div className='outerContainer'>
            <div className='container'>
                <InfoBar room={room} />
                <Messages messages={messages}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <RoomContent users = {users} />
        </div>
    )
}

export default Chat;