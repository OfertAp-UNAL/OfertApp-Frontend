import React from "react";
import "./../../App.css";

const CheckBox = ({ name, label, onChange, value }) => {
    return (
        <React.Fragment>
        <input
            type="checkbox"
            className="form-check-input"
            name={name}
            id={name}
            checked={value}
            onChange={e => onChange(e.currentTarget.checked)}
        />
        <h5>{label}</h5>
        </React.Fragment>
    );
}

export default CheckBox;