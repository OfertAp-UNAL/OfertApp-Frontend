import React from "react";

const PriceRangeFilter = ({ valueMin, valueMax, onChangeMin, onChangeMax }) => {

  return (
    <div>
      <h4>Su precio está entre: </h4>
      <input
        type="number"
        className="form-control my-3"
        min={valueMin}
        defaultValue={valueMin}
        aria-placeholder="Digita un numero"
        onChange={e => onChangeMin(e.currentTarget.value)}
      />
      <h4>y: </h4>
      <input
        type="number"
        className="form-control my-3"
        aria-placeholder="Digita un numero"
        max={valueMax}
        defaultValue={valueMax}
        onChange={e => onChangeMax(e.currentTarget.value)}
      />
    </div>
  );
};

export default PriceRangeFilter;
