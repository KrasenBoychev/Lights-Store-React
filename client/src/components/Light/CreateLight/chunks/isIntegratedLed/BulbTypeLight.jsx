/* eslint-disable react/prop-types */
export default function BulbTypeLight({ props }) {
  const { bulbsRequired } = props.values;
  const changeHandler = props.changeHandler;
  const errors = props.errors;

  return (
    <>
      <label>
        Bulb type:
        <select
           value={props.bulbTypeState}
           onChange={e => props.setBulbTypeState(e.target.value)}
        >
          <option value="E27">E27</option>
          <option value="E14">E14</option>
          <option value="BC">BC</option>
          <option value="G9">G9</option>
        </select>
        {errors.bulbType && <p className="form-errors">{errors.bulbType}</p>}
      </label>

      <label>
        Number of bulbs:
        <input
          type="number"
          name="bulbsRequired"
          value={bulbsRequired == null ? '' : bulbsRequired}
          onChange={changeHandler}
        />
        {errors.bulbsRequired && (
          <p className="form-errors">{errors.bulbsRequired}</p>
        )}
      </label>
    </>
  );
}
