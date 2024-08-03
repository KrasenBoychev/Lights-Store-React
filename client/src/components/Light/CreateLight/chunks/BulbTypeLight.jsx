/* eslint-disable react/prop-types */
export default function BulbTypeLight({props}) {
  const { bulbType, bulbsRequired } = props.values;
  const changeHandler = props.changeHandler;
  const errors = props.errors;
  return (
    <>
      <label>
        Bulb type:
        <input
          type="text"
          name="bulbType"
          placeholder="e.x. E27"
          value={bulbType == null ? '' : bulbType}
          onChange={changeHandler}
        />
        {errors.bulbType && <p className='form-errors'>{errors.bulbType}</p>}
      </label>

      <label>
        Number of bulbs:
        <input
          type="number"
          name="bulbsRequired"
          value={bulbsRequired == null ? '' : bulbsRequired}
          onChange={changeHandler}
        />
        {errors.bulbsRequired && <p className='form-errors'>{errors.bulbsRequired}</p>}
      </label>
    </>
  );
}
