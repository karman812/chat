import React from "react";

const Navbar = (props) =>{
    return(
        <div className="chat-users">
            Комната: <b>{props.roomId}</b>
            <hr />
            <b>Онлайн ({props.users.length}):</b>
            <ul>
                {props.usersList}
            </ul>
        </div>
    )
}
export default Navbar