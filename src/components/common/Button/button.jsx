import React, { Component } from "react";
import "./button.css";

class CustomButton extends Component {
    render() {
        const { type, onClick, caption } = this.props;
        return (
            <button
                className= {"btn ofertapp-button-" + type}
                onClick={onClick}
            >
                {caption}
            </button>
        );
    }
}

export default CustomButton