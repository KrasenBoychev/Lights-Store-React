/* eslint-disable react/prop-types */
import BulbTypeLight from './BulbTypeLight';
import LedLight from './LedLight';

export default function IsIntegratedLed({ props }) {
  const { values, errors, changeHandler, integratedLed, setIntegratedLed, bulbTypeState, setBulbTypeState } =
    props;

  const integratedLedOptionHandler = (e) => {
    const value = e.target.value;

    if (value == 'yes') {
      setIntegratedLed(true);
    } else {
      setIntegratedLed(false);
    }
  };
  return (
    <>
      <p>
        Is Integrated LED?
        <label>
          <input
            type="radio"
            name="integrated"
            value="yes"
            checked={integratedLed == null ? false : integratedLed}
            onChange={integratedLedOptionHandler}
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="integrated"
            value="no"
            checked={integratedLed == null ? false : !integratedLed}
            onChange={integratedLedOptionHandler}
          />
          No
        </label>
      </p>
      {errors.integratedLed && (
        <p className="form-errors">{errors.integratedLed}</p>
      )}

      {integratedLed == null ? (
        ''
      ) : integratedLed == true ? (
        <LedLight props={{ values, errors, changeHandler }} />
      ) : (
        <BulbTypeLight props={{ values, errors, changeHandler, bulbTypeState, setBulbTypeState }} />
      )}
    </>
  );
}
