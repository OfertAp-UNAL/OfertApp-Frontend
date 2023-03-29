import React, { Component } from 'react';
import "./publicationView.css";
import Comment from "../common/Comment/comment";
import CustomButton from "../common/Button/button";
import UserLink from '../common/UserLink/userLink';

class PublicationViewComments extends Component {

    state = {
        replyingTo: null,
        comments: [],
    }

    async componentDidMount(){
        const { publication } = this.props;
        this.setState({comments: publication.comments});
    }

    render(){

        return (
            <div 
            className = "row align-middle"
            >
                <h3 className = "ofertapp-label">Comentarios</h3>
                <div 
                    className = "ofertapp-overflow ofertapp-comments-block"
                    style = {{"--height": "350px"}}
                >
                    {
                    this.state.comments.map( comment => (
                        <Comment 
                            comment={comment} key = {comment.id}
                            onClick = {
                                (comment) => {
                                    // Set replying to content
                                    this.setState({replyingTo: comment});
                                }
                            }
                        />
                    ))
                    }
                </div>
                Haz click sobre un comentario para responder.
                <input 
                    className = "form-control mb-3" placeholder = "Escribe tu comentario" 
                    type = "text"
                />
                {
                    this.state.replyingTo &&
                    <div className = "row align-middle">
                        <div className = "col-12 col-md-6">
                            <p>
                                <strong>
                                    - Respondiendo a:
                                </strong>
                            </p>
                        </div>
                        <div className = "col-12 col-md-5">
                            <UserLink user = {this.state.replyingTo.user} base = {false} fontSize = {16} />    
                        </div>
                        <div className = "col-12 col-md-1" onClick = {
                            () => {
                                this.setState({replyingTo: null});
                            }
                        }>
                            X
                        </div>
                    </div>
                }
                <CustomButton 
                    onClick = {() => console.log("Crear Comentario")} 
                    caption = "Crear Comentario" 
                    type = "primary"
                />
            </div>
        )
    }
}

export default PublicationViewComments;