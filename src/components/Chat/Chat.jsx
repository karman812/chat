import React, {useEffect, useRef, useState} from 'react';
import socket from '../../socket';
import Message from "./Message";
import Navbar from "./Navbar";

function Chat({users, messages, userName, roomId, onAddMessage}) {

    const [messageValue, setMessageValue] = useState('');
    const messagesRef = useRef(null);

    const onSendMessage = () => {
        //the fields are not empty?
        if (messageValue.length != 0) {
            let date = new Date()
            let time = date.getHours() + ':' + date.getMinutes()
            //transfer new message to socket
            socket.emit('ROOM:NEW_MESSAGE', {
                userName,
                roomId,
                text: messageValue,
                time: time
            });
            //set new message to state
            onAddMessage({userName, text: messageValue, time});
            setMessageValue('');
        }
    }
    //get messages list in jsx
    const MessagesItems = messages.map((message, i, arr) => {
        return (
            <Message text={message.text} userName={message.userName} key={i} time={message.time} myUserName={userName}/>
        )
    })
    //get users list in jsx
    const usersList = users.map((name, index) => {
        return (
            <li key={name + index} key={index}>{userName == name ? name + ' - you' : name}</li>
        )
    })
    //will be triggered when the messages change
    useEffect(() => {
        messagesRef.current.scrollTo(0, 99999);
    }, [messages]);

    return (
        <div className="chat">
            <Navbar roomId={roomId} users={users} usersList={usersList}/>
            <div className="chat-messages">
                <div ref={messagesRef} className="messages">
                    {MessagesItems}
                </div>
                <form>
          <textarea
              value={messageValue}
              onChange={(e) => setMessageValue(e.target.value)}
              className="form-control"
              rows="2"></textarea>
                    <button onClick={onSendMessage} type="button" className="btn btn-primary">
                        Отправить
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Chat;
