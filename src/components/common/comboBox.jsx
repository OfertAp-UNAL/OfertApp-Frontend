import React from 'react';
import "./../../App.css";

const ComboBox = ({ label, options, onChange, currentValue}) => {
    return (
        <React.Fragment>
            <h5 className="group-form">{label}</h5>
            <select
                className="form-select"
                onChange={e => onChange(e.currentTarget.value)}
                value={currentValue}
            >
                {options.map(option => (
                    <option key={option.name} value={option.name}>
                        {option.label}
                    </option>
                ))}
            </select>
        </React.Fragment>
    );
}

export default ComboBox;