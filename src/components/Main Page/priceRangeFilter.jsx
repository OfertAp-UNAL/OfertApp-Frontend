const PriceRangeFilter = ({ valueMin, valueMax, onChangeMin, onChangeMax, values }) => {

  return (
    <div>
      <h4>Su precio está entre: </h4>
      <input
        type="number"
        className="form-control my-3"
        min={valueMin}
        value={values[0]}
        aria-placeholder="Digita un numero"
        onChange={e => onChangeMin(e.currentTarget.value)}
      />
      <h4>y: </h4>
      <input
        type="number"
        className="form-control my-3"
        aria-placeholder="Digita un numero"
        max={valueMax}
        value={values[1]}
        onChange={e => onChangeMax(e.currentTarget.value)}
      />
    </div>
  );
};

export default PriceRangeFilter;
