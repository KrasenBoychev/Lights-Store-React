/* eslint-disable react/prop-types */
export default function Search(props) {
  const { lightsState, filteredLightsState, formState } = props;

  const changeHandler = async (e) => {
    formState.setFormValues((oldValues) => ({
      ...oldValues,
      [e.target.name]: e.target.value,
    }));
  };

  const searchFormClickHandler = (e) => {
    e.preventDefault();

    const { name, price, lightType } = formState.formValues;
    const priceToNum = Number(price);

    const filteredItems = lightsState.lights.filter(
      (light) =>
        light.name.toLowerCase().includes(name.toLowerCase()) &&
        (price ? light.price === priceToNum : true) &&
        (lightType == 'integratedLed' ? light.kelvins : lightType == 'bulbType' ? light.bulbType : true)
    );
  
    filteredLightsState.setFilteredLights(filteredItems);
  };

  return (
    <form onSubmit={searchFormClickHandler} className="marketplace-search-form">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formState.formValues.name}
        onChange={changeHandler}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formState.formValues.price}
        onChange={changeHandler}
      />
      <select
        name="lightType"
        value={formState.formValues.integratedLed}
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
