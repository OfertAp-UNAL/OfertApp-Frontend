import React from "react";

const NumberBox = ({ value, name, onChange, label }) => {
  return (
    <React.Fragment>
    <h4>{label}</h4>
    <input
      min="0"
      max={Number.MAX_SAFE_INTEGER}
      type="number"
      name={name}
      defaultValue={value}
      className="form-control my-3"
      placeholder="Digita un numero"
      onChange={e => onChange(e.currentTarget.value)}
    />
    </React.Fragment>
  );
};

export default NumberBox;
