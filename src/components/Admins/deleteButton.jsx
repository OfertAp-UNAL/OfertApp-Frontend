import { Component } from "react";
import { 
    deletePublication, deleteComment, deleteUser, 
    postReport, postUser
} from "../../services/publicationService";

class AdminDeleteButton extends Component {
    handleClick = async () => {
        // Data may not exist if its a deletion case
        const { type, id, data, onSuccess, onError } = this.props;
        let response = null;

        switch( type ){
            case "publicationDelete":
                response = await deletePublication( id );
                break;
            case "commentDelete":
                response = await deleteComment( id );
                break;
            case "userDelete":
                response = await deleteUser( id );
                break;
            case "userUpdate":
                response = await postUser( id, data );
                break;
            case "reportUpdate":
                response = await postReport( id, data );
                break;
        }

        if( response ){
            const { status, data, error } = response;
            if( status === "success" ){
                onSuccess( data );
            }
            else{
                onError( error );
            }
        } else {
            onError( "Error al realizar la operación" );
        }
    }
    render() {
        const { caption } = this.props;
        return (
            <button onClick={this.handleClick} className="btn btn-danger">
                {caption}
            </button>
        );
    }
}

export default AdminDeleteButton;