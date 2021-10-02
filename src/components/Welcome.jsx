import React from 'react';
import "./Welcome.css"

export default function Welcome(props) {
    return (
        <div className="main2">
        <div className="welcome-container">
            {props.cookie.user? `Hi ${props.cookie.user.username} you can add new posts or edit/delete your old posts`:
            "Hi, please Login/Signup to add or edit posts"}
            </div>
        </div>
    )
}
