/* eslint-disable react/prop-types */
export default function MainFields({ props }) {
  const { values, changeHandler, errors } = props;

  // Date Formatter
  const todayDate = new Date();
  let month;
  if (todayDate.getMonth() + 1 < 10) {
    month = `0${todayDate.getMonth() + 1}`;
  } else {
    month = todayDate.getMonth() + 1;
  }
  const todayDateFormatted = `${todayDate.getFullYear()}-${month}-${todayDate.getDate()}`;
  
  return (
    <>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={changeHandler}
        />
        {errors.name && <p className="form-errors">{errors.name}</p>}
      </label>

      <label>
        Sale Price:
        <input
          type="number"
          name="price"
          value={values.price}
          onChange={changeHandler}
        />
        {errors.price && <p className="form-errors">{errors.price}</p>}
      </label>

      <label>
        Date of Purchase:
        <input
          type="date"
          name="date"
          max={todayDateFormatted}
          value={values.date}
          onChange={changeHandler}
        />
        {errors.date && <p className="form-errors">{errors.date}</p>}
      </label>

      <label>
        Quantities:
        <input
          type="number"
          name="quantities"
          value={values.quantities}
          onChange={changeHandler}
        />
        {errors.quantities && (
          <p className="form-errors">{errors.quantities}</p>
        )}
      </label>
    </>
  );
}
