export default function Sort({ props }) {
  const { sort, setSort } = props;

  const changeHandler = (e) => {
    setSort(e.target.value);
  };

  return (
    <div className="sort_lights">
      <select name="sortLights" value={sort} onChange={changeHandler}>
        <option value="nameAscending">A - Z</option>
        <option value="nameDescending">Z - A</option>
        <option value="priceAscending">Price Up</option>
        <option value="priceDescending">Price Down</option>
      </select>
    </div>
  );
}
