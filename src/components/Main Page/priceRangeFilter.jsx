import React from "react";

const PriceRangeFilter = ({ valueMin, valueMax, onChange }) => {
  const handleMinChange = (event) => {
    if (event.target.value !== "") {
      onChange(parseInt(event.target.value), valueMax);
    } else onChange(0, valueMax);
  };

  const handleMaxChange = (event) => {
    if (event.target.value !== "") {
      onChange(valueMin, parseInt(event.target.value));
    } else onChange(0, 0);
  };

  return (
    <div>
      <h3>Price range</h3>
      <input
        type="number"
        value={valueMin === 0 ? "" : valueMin}
        onChange={handleMinChange}
        placeholder={"0"}
      />
      {"-"}
      <input
        type="number"
        value={valueMax === 0 ? "" : valueMax}
        onChange={handleMaxChange}
        placeholder={"0"}
      />
    </div>
  );
};

export default PriceRangeFilter;
