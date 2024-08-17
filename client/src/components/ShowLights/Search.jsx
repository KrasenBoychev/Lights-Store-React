/* eslint-disable react/prop-types */
import { useEffect } from 'react';

export default function Search(props) {
  const { lightsState, filteredLightsState, searchFormProps } = props;

  const { seacrhFormValues, setSearchFormValues } = searchFormProps;
  const { name, minPrice, maxPrice, lightType } = seacrhFormValues;

  const changeHandler = (e) => {
    setSearchFormValues((state) => ({
      ...state,
      [e.target.name]: e.target.value != 'defaultValue' ?  e.target.value : ''
    }));
  };

  useEffect(() => {
    (function search() {
    const filteredItems = lightsState.lights.filter(
      (light) =>
        light.name.toLowerCase().includes(name.toLowerCase()) 
          && (Number(minPrice) 
              ? Number(maxPrice)
                ? light.price >= Number(minPrice) && light.price <= Number(maxPrice)
                : light.price >= Number(minPrice)
              : Number(maxPrice)
                ? light.price <= Number(maxPrice)
                : true
             )
          && (lightType == 'integratedLed'
              ? light.kelvins
              : lightType == 'bulbType'
                  ? light.bulbType
                  : true
             )
    );

    filteredLightsState.setFilteredLights(filteredItems);
  })();

  }, [name, minPrice, maxPrice, lightType]);

  const clearAllFields = (e) => {
    e.preventDefault();

    setSearchFormValues({
      name: '',
      minPrice: '',
      maxPrice: '',
      lightType: ''
    });
  };

  return (
    <form className="marketplace-search-form">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={changeHandler}
      />
      <input
        type="number"
        name="minPrice"
        placeholder="Min Price"
        value={minPrice}
        onChange={changeHandler}
      />
       <input
        type="number"
        name="maxPrice"
        placeholder="Max Price"
        value={maxPrice}
        onChange={changeHandler}
      />
      <select
        name="lightType"
        value={lightType}
        onChange={changeHandler}
      >
        <option value="defaultValue">--- Type of Light ---</option>
        <option value="integratedLed">Integrated LED</option>
        <option value="bulbType">Bulb Type</option>
      </select>

      <button onClick={clearAllFields}>Clear</button>
    </form>
  );
}