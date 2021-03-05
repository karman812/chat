import React, {useState} from 'react';
import axios from 'axios';

function JoinBlock({onLogin}) {
    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');
    const [isLoading, setLoading] = useState(false);

    //try to join
    const onEnter = async () => {
        //the fields are not empty?
        if (!roomId || !userName) {
            return alert('Пожалуйста, заполните поля');
        }
        const obj = {
            roomId,
            userName,
        };
        setLoading(true);
        // make a post request to the server with data
        await axios.post('/rooms', obj);
        onLogin(obj);
    };

    return (
        <div className="join-block">
            <input
                type="text"
                placeholder="Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Ваше имя"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <button disabled={isLoading} onClick={onEnter} className="btn btn-success">
                {isLoading ? 'ВХОД...' : 'ВОЙТИ'}
            </button>
        </div>
    );
}

export default JoinBlock;
