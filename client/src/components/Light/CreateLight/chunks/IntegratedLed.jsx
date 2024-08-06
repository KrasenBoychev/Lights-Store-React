/* eslint-disable react/prop-types */
export default function IntegratedLed({ props }) {
  const { kelvins, lumens, watt } = props.values;
  const changeHandler = props.changeHandler;
  const errors = props.errors;

  return (
    <>
      <label>
        Kelvins:
        <input
          type="number"
          name="kelvins"
          placeholder="between 2700 and 6000"
          value={kelvins == null ? '' : kelvins}
          onChange={changeHandler}
        />
        {errors.kelvins && <p className="form-errors">{errors.kelvins}</p>}
      </label>

      <label>
        Lumens:
        <input
          type="number"
          name="lumens"
          value={lumens == null ? '' : lumens}
          onChange={changeHandler}
        />
        {errors.lumens && <p className="form-errors">{errors.lumens}</p>}
      </label>

      <label>
        Watt:
        <input
          type="number"
          name="watt"
          value={watt == null ? '' : watt}
          onChange={changeHandler}
        />
        {errors.watt && <p className="form-errors">{errors.watt}</p>}
      </label>
    </>
  );
}
