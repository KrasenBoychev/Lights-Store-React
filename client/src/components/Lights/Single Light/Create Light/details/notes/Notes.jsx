export default function Notes({ props }) {
  const { values, changeHandler, errors } = props;

  return (
    <section>
      <label
        className={
          errors.notes
            ? "create_light_notes create_light_error"
            : "create_light_notes"
        }
      >
        Notes:
        <textarea
          name="notes"
          value={values.notes}
          onChange={changeHandler}
        ></textarea>
      </label>
    </section>
  );
}
