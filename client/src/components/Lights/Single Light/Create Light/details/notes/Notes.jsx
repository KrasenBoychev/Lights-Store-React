/* eslint-disable react/prop-types */
export default function Notes({ props }) {
  const { values, changeHandler, errors } = props;
  
  return (
    <label>
      Notes:
      <textarea
        name="notes"
        maxLength={30}
        placeholder="30 symbols maximum"
        value={values.notes}
        onChange={changeHandler}
      ></textarea>
      {errors.notes && <p className="form-errors">{errors.notes}</p>}
    </label>
  );
}
