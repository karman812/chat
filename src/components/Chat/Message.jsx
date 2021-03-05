import React from "react";

let Message = (props) => {
    return (
        <div className={props.userName == props.myUserName ? 'message myMessage' : 'message'}>
            <div><span>{props.time}</span></div>
            <p>{props.text}</p>
            <div>
                <span>{props.userName == props.myUserName ? 'You' : props.userName}</span>
            </div>
        </div>
    )
}
export default Message
