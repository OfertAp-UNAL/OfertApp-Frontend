import React from "react";

const SearchBox = ({ onChange, label, value }) => {
  return (
    <React.Fragment>
    <h4>{label}</h4>
    <input
      type="text"
      name="query"
      className="form-control my-3"
      placeholder="Search..."
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
    />
    </React.Fragment>
  );
};

export default SearchBox;
