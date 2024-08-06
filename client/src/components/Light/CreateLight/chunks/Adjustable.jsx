/* eslint-disable react/prop-types */
export default function Adjustable({ props }) {
  const { minHeight, maxHeight } = props.values;
  const changeHandler = props.changeHandler;
  const errors = props.errors;

  return (
    <div>
      <label>
        Min(cm):
        <input
          type="number"
          name="minHeight"
          value={minHeight == null ? '' : minHeight}
          onChange={changeHandler}
        />
        {errors.minHeight && (
          <p className="form-errors adjustable">{errors.minHeight}</p>
        )}
      </label>
      <label>
        Max(cm):
        <input
          type="number"
          name="maxHeight"
          value={maxHeight == null ? '' : maxHeight}
          onChange={props.changeHandler}
        />
        {errors.maxHeight && (
          <p className="form-errors adjustable">{errors.maxHeight}</p>
        )}
      </label>
    </div>
  );
}
