/* eslint-disable react/prop-types */
export default function ImageLight({ props }) {
  const { changeHandler, errors } = props;
  return (
    <section>
      <label
        className={
          errors.imageURL
            ? "create_light_upload_img create_light_error"
            : "create_light_upload_img"
        }
      >
        Upload Image:
        <input
          type="file"
          name="imageURL"
          accept="image/png, image/jpeg"
          onChange={changeHandler}
        />
      </label>
    </section>
  );
}
