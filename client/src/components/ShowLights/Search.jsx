/* eslint-disable react/prop-types */

import { useForm } from '../../hooks/useForm';

export default function Search(props) {
  const { lightsState, filteredLightsState, searchFormProps } = props;

  const searchFormClickHandler = (data) => {

    const { name, price, lightType } = data;
    const priceToNum = Number(price);

    const filteredItems = lightsState.lights.filter(
      (light) =>
        light.name.toLowerCase().includes(name.toLowerCase()) &&
        (price ? light.price === priceToNum : true) &&
        (lightType == 'integratedLed'
          ? light.kelvins
          : lightType == 'bulbType'
          ? light.bulbType
          : true)
    );

    filteredLightsState.setFilteredLights(filteredItems);
  };

  const { values, changeHandler, submitHandler } = useForm(
    searchFormProps.seacrhFormValues,
    searchFormClickHandler
  );

  return (
    <form onSubmit={submitHandler} className="marketplace-search-form">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={values.name}
        onChange={changeHandler}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={values.price}
        onChange={changeHandler}
      />
      <select
        name="lightType"
        value={values.lightType}
        onChange={changeHandler}
      >
        <option value="defaultValue">--- Type of Light ---</option>
        <option value="integratedLed">Integrated LED</option>
        <option value="bulbType">Bulb Type</option>
      </select>
      <button>Filter</button>
    </form>
  );
}