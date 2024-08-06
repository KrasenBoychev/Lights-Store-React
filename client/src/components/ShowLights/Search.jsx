/* eslint-disable react/prop-types */
export default function Search(props) {
  const { lightsState, filteredLightsState, searchFormProps } = props;

  const changeHandler = async (e) => {
    searchFormProps.setSearchFormValues((oldValues) => ({
      ...oldValues,
      [e.target.name]: e.target.value,
    }));
  };

  const searchFormClickHandler = (e) => {
    e.preventDefault();

    const { name, price, lightType } = searchFormProps.seacrhFormValues;
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

  return (
    <form onSubmit={searchFormClickHandler} className="marketplace-search-form">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={searchFormProps.seacrhFormValues.name}
        onChange={changeHandler}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={searchFormProps.seacrhFormValues.price}
        onChange={changeHandler}
      />
      <select
        name="lightType"
        value={searchFormProps.seacrhFormValues.lightType}
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
