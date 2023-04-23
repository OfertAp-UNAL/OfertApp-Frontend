import React from "react";

const CheckBox = ({ name, label, onChange }) => {
    return (
        <React.Fragment>
        <input
            type="checkbox"
            className="form-check-input"
            defaultChecked={true}
            name={name}
            id={name}
            onChange={e => onChange(e.currentTarget.checked)}
        />
        <h5>{label}</h5>
        </React.Fragment>
    );
}

export default CheckBox;