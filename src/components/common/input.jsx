import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="group-form">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        className={"text-center " + (error ? "input error-input" : "input")}
        name={name}
        id={name}
      />
      {error && <div className="error-div">{error}</div>}
    </div>
  );
};

export default Input;
