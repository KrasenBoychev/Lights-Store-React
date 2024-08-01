/* eslint-disable react/prop-types */
export default function BulbTypeLight(props) {
  const { bulbType, bulbsRequired } = props.values;
  return (
    <>
      <label>
        Bulb type:
        <input
          type="text"
          name="bulbType"
          placeholder="e.x. E27"
          value={bulbType}
          onChange={props.changeHandler}
        />
      </label>

      <label>
        Number of bulbs:
        <input
          type="number"
          name="bulbsRequired"
          value={bulbsRequired}
          onChange={props.changeHandler}
        />
      </label>
    </>
  );
}
