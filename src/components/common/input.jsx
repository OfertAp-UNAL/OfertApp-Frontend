import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="group-form">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
