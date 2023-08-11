import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.css'

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const onNameHandler = (event) => {
        setName(event.target.value);
    }

    const onRoomHandler = (event) => {
        setRoom(event.target.value);
    }

    const onClickHandler = (event) => {
        if (!name || !room)
          event.preventDefault();
    }

    return(
        <div className='joinOuterContainer'>
            <div className='joinInnerContainer'>
                <h1 className='heading'>Join</h1>
                <div><input placeholder='Name' className='joinInput' type='text' onChange={onNameHandler} /></div>
                <div><input placeholder='Room' className='joinInput mt-20' type='text' onChange={onRoomHandler} /></div>
                <Link onClick={onClickHandler} to = {`/chat?name=${name}&room=${room}`}>
                    <button className='button mt-20' type='submit'>Sign In</button>
                </Link>
            </div>
        </div>
    )
}

export default Join;