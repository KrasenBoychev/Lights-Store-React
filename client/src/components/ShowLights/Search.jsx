/* eslint-disable react/prop-types */
import { useSearch } from '../../hooks/useSearch';

export default function Search(props) {
  const [name, minPrice, maxPrice, lightType, setSearchFormValues] = useSearch(props);

  const changeHandler = (e) => {
    setSearchFormValues((state) => ({
      ...state,
      [e.target.name]: e.target.value != 'defaultValue' ?  e.target.value : ''
    }));
  };

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
        value={name ? name : ''}
        onChange={changeHandler}
      />
      <input
        type="number"
        name="minPrice"
        placeholder="Min Price"
        value={minPrice ? minPrice : ''}
        onChange={changeHandler}
      />
       <input
        type="number"
        name="maxPrice"
        placeholder="Max Price"
        value={maxPrice ? maxPrice : ''}
        onChange={changeHandler}
      />
      <select
        name="lightType"
        value={lightType ? lightType : ''}
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