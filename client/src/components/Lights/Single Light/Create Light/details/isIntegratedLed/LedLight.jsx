/* eslint-disable react/prop-types */
export default function LedLight({ props }) {
  const { kelvins, lumens, watt } = props.values;
  const changeHandler = props.changeHandler;
  const errors = props.errors;

  return (
    <div className="create_light_form_row create_light_led_option">
      <label className={errors.kelvins && "create_light_error"}>
        Kelvins:
        <input
          type="number"
          name="kelvins"
          placeholder="from 2700 to 6500"
          value={kelvins == null ? "" : kelvins}
          onChange={changeHandler}
        />
      </label>

      <label className={errors.lumens && "create_light_error"}>
        Lumens:
        <input
          type="number"
          name="lumens"
          value={lumens == null ? "" : lumens}
          onChange={changeHandler}
        />
      </label>

      <label className={errors.watt && "create_light_error"}>
        Watt:
        <input
          type="number"
          name="watt"
          value={watt == null ? "" : watt}
          onChange={changeHandler}
        />
      </label>
    </div>
  );
}
