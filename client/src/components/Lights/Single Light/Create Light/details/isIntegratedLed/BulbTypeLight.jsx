import { bulbTypes } from "../../../../../../common/bulbTypes";

export default function BulbTypeLight({ props }) {
  const { bulbsRequired } = props.values;
  const changeHandler = props.changeHandler;
  const errors = props.errors;

  return (
    <div className="create_light_form_row create_light_bulb_option">
      <label className={errors.bulbType && "create_light_error"}>
        Bulb type:
        <select
          value={props.bulbTypeState}
          onChange={(e) => props.setBulbTypeState(e.target.value)}
        >
          {bulbTypes.map((bulbTypeEl) => (
            <option key={bulbTypeEl} value={bulbTypeEl}>
              {bulbTypeEl}
            </option>
          ))}
        </select>
      </label>

      <label className={errors.bulbsRequired && "create_light_error"}>
        Number of bulbs:
        <input
          type="number"
          name="bulbsRequired"
          value={bulbsRequired == null ? "" : bulbsRequired}
          onChange={changeHandler}
        />
      </label>
    </div>
  );
}
