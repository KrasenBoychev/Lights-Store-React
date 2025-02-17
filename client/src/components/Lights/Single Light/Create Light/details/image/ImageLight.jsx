/* eslint-disable react/prop-types */
export default function ImageLight({ props }) {
    const { changeHandler, errors } = props;
  return (
    <label>
      Upload Image:
      <input
        type="file"
        name="imageURL"
        accept="image/png, image/jpeg"
        onChange={changeHandler}
      />
      {errors.imageURL && <p className="form-errors">{errors.imageURL}</p>}
    </label>
  );
}
