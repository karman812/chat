import React, {useEffect} from 'react';
import {connect} from "react-redux";
import socket from './socket';
import JoinBlock from './components/Join/JoinBlock';
import Chat from './components/Chat/Chat';
import {setUsers, setJoined, addNewMessage, setDataThunkCreator} from "./redux/chat-reducer";

let App = (props) => {
    const onLogin = async (obj) => {
        props.setJoined(obj)
        socket.emit('ROOM:JOIN', obj);
        props.setDataThunkCreator(obj)
    };

    const setUsers = (users) => {
        props.setUsers(users)
    };

    const addMessage = (message) => {
        props.addNewMessage(message)
    };

    useEffect(() => {
        socket.on('ROOM:SET_USERS', setUsers);
        socket.on('ROOM:NEW_MESSAGE', addMessage);
    }, []);


    return (
        <div className="wrapper">
            {!props.state.joined ? (
                <JoinBlock onLogin={onLogin}/>
            ) : (
                <Chat {...props.state} onAddMessage={addMessage}/>
            )}
        </div>
    );
}
let mapStateToProps = (state) => {
    return {
        state: state.chatPage
    }
}
export default connect(mapStateToProps, {setUsers, setJoined, addNewMessage, setDataThunkCreator})(App);

