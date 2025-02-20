export default function Dimensions({ props }) {
  const { adjustable, setAdjustable, values, errors, changeHandler } = props;

  const adjustableOptionHandler = (e) => {
    const value = e.target.value;

    if (value == "yes") {
      setAdjustable(true);
    } else {
      setAdjustable(false);
    }
  };

  return (
    <section>
      <div className="create_light_form_row create_light_adjustable_height">
        Can you adjust the height of the light?
        <label>
          <input
            type="radio"
            name="adjustable"
            value="yes"
            checked={adjustable == null ? false : adjustable}
            onChange={adjustableOptionHandler}
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="adjustable"
            value="no"
            checked={adjustable ? false : true}
            onChange={adjustableOptionHandler}
          />
          No
        </label>
      </div>

      <div className="create_light_form_row create_light_dimesions">
        <label className={errors.height && "create_light_error"}>
          {adjustable ? "Min Height:" : "Height:"}
          <input
            type="number"
            name="height"
            value={values.height}
            onChange={changeHandler}
          />
        </label>

        {adjustable && (
          <label className={errors.maxHeight && "create_light_error"}>
            Max Height:
            <input
              type="number"
              name="maxHeight"
              value={values.maxHeight == null ? "" : values.maxHeight}
              onChange={props.changeHandler}
            />
          </label>
        )}

        <label className={errors.width && "create_light_error"}>
          Width:
          <input
            type="number"
            name="width"
            value={values.width}
            onChange={changeHandler}
          />
        </label>

        <label className={errors.depth && "create_light_error"}>
          Depth:
          <input
            type="number"
            name="depth"
            value={values.depth}
            onChange={changeHandler}
          />
        </label>
      </div>

      <div className="create_light_form_row create_light_dimesions_unit_required">
        <p>*all values must be in "cm"</p>
      </div>
    </section>
  );
}
