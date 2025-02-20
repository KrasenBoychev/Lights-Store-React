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
    <section>
      <div className="create_light_form_row">
        <label
          className={
            errors.name
              ? "create_light_name create_light_error"
              : "create_light_name"
          }
        >
          Name:
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={changeHandler}
          />
        </label>

        <label
          className={
            errors.date
              ? "create_light_date create_light_error"
              : "create_light_date"
          }
        >
          Date of Purchase:
          <input
            type="date"
            name="date"
            max={todayDateFormatted}
            value={values.date}
            onChange={changeHandler}
          />
        </label>
      </div>

      <div className="create_light_form_row">
        <label
          className={
            errors.price
              ? "create_light_price create_light_error"
              : "create_light_price"
          }
        >
          Sale Price:
          <input
            type="number"
            name="price"
            value={values.price}
            onChange={changeHandler}
          />
        </label>

        <label
          className={
            errors.quantities
              ? "create_light_qty create_light_error"
              : "create_light_qty"
          }
        >
          Quantities:
          <input
            type="number"
            name="quantities"
            value={values.quantities}
            onChange={changeHandler}
          />
        </label>
      </div>
    </section>
  );
}
