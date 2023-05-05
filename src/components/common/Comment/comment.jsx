import React, { Component } from "react";
import UserLink from "../UserLink/userLink";
import { getTimeLeft } from "./../../../utils/getTime";
import "./comment.css";
import { addReaction } from "../../../services/reactionService";

// user: object
// base: boolean

class Comment extends Component {

  state = {
    comment : null,

    // Testing purposes
    userReacted : false,
    reactedType : ""
  }

  async componentDidMount() {
    const { comment } = this.props;

    let currentState = this.state;
    currentState.comment = comment;
    // Check user's reaction
    const reactionType = comment ? comment.reactionsCount.userReaction : null;

    if( reactionType ) {
        // Mark this comment as made by current user
        currentState.userReacted = true;
        currentState.reactedType = reactionType;
    }

    this.setState({ currentState });
  }

  // Handle reaction change
  handleReactionChange = async (type) => {
    const { comment } = this.state;
    if (this.state.userReacted) {
        comment.reactionsCount[this.state.reactedType] -= 1;

        if( this.state.reactedType === type ) {
            this.setState({ userReacted : false, reactedType : "" });  
            return;
        }
    }
    comment.reactionsCount[type] += 1;
    this.setState({ comment, userReacted : true, reactedType : type });

    const reaction = {
        type : type,
    } 
    await addReaction(comment.id, reaction);
  }


  render() {
    const comment = this.state.comment;
    const user = this.state.comment ? this.state.comment.user : null;
    const onClick = this.props.onClick;

    return (
      // Conditional class name
        comment && user && 
        <div key = { this.state.comment.id } className = "col-12">
            <div className = "row ofertapp-comment-row">
                <div className = "col-12 col-md-10 text-center" onClick = {() => onClick(comment)}>
                    <div className = "row align-middle ofertapp-comment-container">
                        {
                            comment.parent &&
                            <div className = "col-12">        
                                <p className = "ofertapp-comment-text ofertapp-comment-contents">
                                    En respuesta a:&nbsp;
                                    <strong 
                                        className = "ofertapp-comment-contents"
                                        style = {{
                                            "maxWidth": "80%",
                                            "borderBottom": "1px solid #000"
                                        }}
                                    >{
                                        comment.parent.title
                                    }</strong>
                                </p>
                            </div>
                        }
                        <div className = "col-12 col-lg-6 text-center">
                            <UserLink user = {user} base = {false} fontSize = {16} />
                        </div>
                        <div className = "col-12 col-lg-6">
                            <p className = "ofertapp-comment-text text-center">
                                <strong>comentó:</strong>
                            </p>
                        </div>
                        <div className = "col-12">
                            <p className = "ofertapp-comment-text ofertapp-comment-contents">
                                <strong className="ofertapp-comment-text ofertapp-comment-contents">
                                    {comment.title}
                                </strong>
                            </p>
                        </div>
                        <div className = "col-12">
                            <p className = "ofertapp-comment-text ofertapp-comment-contents">
                                {comment.text}
                            </p>
                        </div>
                        <div className = "col-12">
                            <p className = "ofertapp-comment-time">
                                Hace {getTimeLeft(comment.createdAt, true)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className = "col-12 col-md-2">
                    <div className = "row text-center">
                        <div className = {"col-12 ofertapp-reaction-container" +
                            (this.state.userReacted && this.state.reactedType === "LIKE" ? " ofertapp-reaction-active" : "")
                        }
                            onClick = { () => this.handleReactionChange("LIKE")} >
                            <strong>▲&nbsp;{comment.reactionsCount.LIKE}</strong>
                        </div>
                        <div className = {"col-12 ofertapp-reaction-container" +
                            (this.state.userReacted && this.state.reactedType === "DISLIKE" ? " ofertapp-reaction-active" : "")
                        }
                            onClick = { () => this.handleReactionChange("DISLIKE")} >
                            <strong>▼&nbsp;{comment.reactionsCount.DISLIKE}</strong>
                        </div>
                        <div className = {"col-12 ofertapp-reaction-container" +
                            (this.state.userReacted && this.state.reactedType === "WARNING" ? " ofertapp-reaction-active" : "")
                        }
                            onClick = { () => this.handleReactionChange("WARNING")}>
                            <strong>⚠&nbsp;{comment.reactionsCount.WARNING}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
    );
  }
}

export default Comment;
