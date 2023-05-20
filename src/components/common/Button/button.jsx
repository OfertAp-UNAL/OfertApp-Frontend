import { Component } from "react";
import "./button.css";

class CustomButton extends Component {
    render() {
        const { type, onClick, caption, disabled } = this.props;
        return (
            <button
                className= {"btn ofertapp-button-" + type}
                disabled={disabled || false}
                onClick={onClick}
            >
                {caption}
            </button>
        );
    }
}

export default CustomButton