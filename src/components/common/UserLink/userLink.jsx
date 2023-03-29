import React, { Component } from "react";
import config from "./../../../config.json";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import "./userLink.css";

const apiUrl = config.apiUrl;

// user: object
// base: boolean

class UserLink extends Component {

  // Renders a tooltip with user's info
  renderUserInfo(user, props) {
    return (
      <Tooltip 
        id = {"user-info-tooltip"} {...props} 
        className="ofertapp-user-info-tooltip"
      >
        <div className = "row">
          <div className = "col-12">
            <img className = "ofertapp-user-info-profile-picture"
              src = {apiUrl + "/media/" + user.profilePicture } alt = "Avatar"
            />
          </div>
          <div className = "col-12">
            <p className = "ofertapp-user-info-text">
              {user.username}
            </p>
          </div>  
          <div className = "col-12">
            <p className = "ofertapp-user-info-text">
              {user.email}
            </p>
          </div>
        </div>
      </Tooltip>
    )
  };

  // Creates a link to user's profile
  render() {
    const user = this.props.user;
    const base = this.props.base;
    const fontSize = this.props.fontSize ? parseInt(this.props.fontSize) : null;

    return (
      // Conditional class name
        user && 
        <OverlayTrigger
          placement="auto" delay={{ show: 250, hide: 400 }}
          overlay = {(props) => this.renderUserInfo(user, props)}
        >
          <p className ={"ofertapp-link-" + ( base ? "base" : "common")}
            style = {
              {"--fontSize": fontSize ? fontSize + "px" : "32px"}
            }
          >
            <a href = {apiUrl + "/user/" + user.id} className="col-12 col-md-9">
              {user.username} &nbsp;&nbsp;
              <span className = "badge ofertapp-reputation" style = {
                // RED = (255,0,0), YELLOW = (255,255,0), GREEN = (0,255,0)
                // From 0% to 50%, R component remains the same (255) and G increase
                // From 50% to 100%, G component remains the same (255) and R decreases
                {
                  "--reputationR": 255 *(user.reputation <= 0.5 ? 1 : 1 - user.reputation ),
                  "--reputationG": 255 *(user.reputation > 0.5 ? 1 : user.reputation ),
                  "--fontSize": fontSize ? (fontSize * 0.75) + "px" : "24px"
                }
              }>
                {user.reputation * 100}
              </span>
            </a>
          </p>
        </OverlayTrigger>
    );
  }
}

export default UserLink;
