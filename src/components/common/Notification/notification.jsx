import React, { Component } from "react";
import "./notification.css";
import { getTimeLeft } from "./../../../utils/getTime";

class Notification extends Component {

    // Creates a link to user's profile
    render() {
      const notification = this.props.notification;
  
      return (
        <div>
            <li>
              <hr className="dropdown-divider"/>
            </li>
            <div className={ "notification-container" +
            (notification.isRead ? " notification-read" : "")}>
              <div className="row" style = {{"font-weight": "bold"}}>
                <div className="col-10 offset-1">
                  {notification.title}
                </div>
              </div>
              <div className="row">
                <div className="col-9">
                  {notification.description}
                </div>
                <div className="col-3" style = {{"display": "flex", "justify-content": "flex-end", "align-items": "flex-end"}}>
                Hace {getTimeLeft(notification.createdAt, true)}
                </div>
              </div>
            </div>
        </div>
      )
    }
}

export default Notification;