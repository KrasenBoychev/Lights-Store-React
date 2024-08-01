/* eslint-disable react/prop-types */
export default function IntegratedLed(props) {
  const { kelvins, lumens, watt } = props.values;
  return (
    <>
      <label>
        Kelvins:
        <input
          type="number"
          name="kelvins"
          placeholder="between 2700 and 6000"
          value={kelvins}
          onChange={props.changeHandler}
        />
      </label>

      <label>
        Lumens:
        <input
          type="number"
          name="lumens"
          value={lumens}
          onChange={props.changeHandler}
        />
      </label>

      <label>
        Watt:
        <input
          type="number"
          name="watt"
          value={watt}
          onChange={props.changeHandler}
        />
      </label>
    </>
  );
}
