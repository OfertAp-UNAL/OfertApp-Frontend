import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="group-form">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        className={error ? "error-input" : ""}
        name={name}
        id={name}
      />
      {error && <div className="error-div">{error}</div>}
    </div>
  );
};

export default Input;
