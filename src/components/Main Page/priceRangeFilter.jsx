import React from "react";

const PriceRangeFilter = ({ valueMin, valueMax }) => {
  return (
    <div>
      <h3>Price range</h3>
      <input type="number" value={valueMin} />
      {"-"}
      <input type="number" value={valueMax} />
    </div>
  );
};

export default PriceRangeFilter;
