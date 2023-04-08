import React from 'react';

const ComboBox = ({ label, options, value, onChange}) => {
    return (
        <React.Fragment>
            <h5>{label}</h5>
            <select
                className="form-select"
                onChange={e => onChange(e.currentTarget.value)}
                defaultValue={value}
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