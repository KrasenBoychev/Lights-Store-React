/* eslint-disable react/prop-types */
export default function Dimensions({ props }) {
  const { adjustable, setAdjustable, values, errors, changeHandler } = props;

  const adjustableOptionHandler = (e) => {
    const value = e.target.value;

    if (value == 'yes') {
      setAdjustable(true);
    } else {
      setAdjustable(false);
    }
  };

  return (
    <>
      <p>
        Is Adjustable?
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
      </p>

      <label>
        {adjustable ? 'Min Height(cm):' : 'Height(cm):'}
        <input
          type="number"
          name="height"
          value={values.height}
          onChange={changeHandler}
        />
        {errors.height && <p className="form-errors">{errors.height}</p>}
      </label>

      {adjustable && (
        <label>
          Max Height(cm):
          <input
            type="number"
            name="maxHeight"
            value={values.maxHeight == null ? '' : values.maxHeight}
            onChange={props.changeHandler}
          />
          {errors.maxHeight && (
            <p className="form-errors">{errors.maxHeight}</p>
          )}
        </label>
      )}

      <label>
        Width(cm):
        <input
          type="number"
          name="width"
          value={values.width}
          onChange={changeHandler}
        />
        {errors.width && <p className="form-errors">{errors.width}</p>}
      </label>

      <label>
        Depth(cm):
        <input
          type="number"
          name="depth"
          value={values.depth}
          onChange={changeHandler}
        />
        {errors.depth && <p className="form-errors">{errors.depth}</p>}
      </label>
    </>
  );
}
