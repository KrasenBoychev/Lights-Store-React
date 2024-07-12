/* eslint-disable react/prop-types */
import { useState } from 'react';

export default function Search(props) {
  const [searchName, setSearchName] = useState('');
  const [searchPrice, setSearchPrice] = useState(null);
  
  const {lightsState, filteredLightsState} = props;

  const handleNameChange = (e) => {
    const inputValue = e.target.value;
    setSearchName(inputValue);

    const filteredItems = lightsState.lights.filter((light) =>
      light.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    filteredLightsState.setFilteredLights(filteredItems);
  };

  const handlePriceChange = (e) => {
    const inputValue = e.target.value;
    setSearchPrice(inputValue);

    const filteredItems = lightsState.lights.filter((light) =>
        light.price == inputValue
    );

    filteredLightsState.setFilteredLights(filteredItems);
  };

  return (
    <form>
      <input
        type="text"
        placeholder="Name"
        value={searchName}
        onChange={handleNameChange}
      />
      <input
        type="number"
        placeholder="Price"
        value={searchPrice}
        onChange={handlePriceChange}
      />
    </form>
  );
}
