/* eslint-disable react/prop-types */
export default function BulbTypeLight({ values }) {
  const { bulbType, setBulbType, bulbsRequired, setBulbsRequired } = values;
  return (
    <>
      <label>
        Bulb type:
        <input
          type="text"
          name="bulb-type"
          placeholder="e.x. E27"
          value={bulbType}
          onChange={(e) => setBulbType(e.target.value)}
        />
      </label>

      <label>
        Number of bulbs:
        <input
          type="number"
          name="bulb-number"
          value={bulbsRequired}
          onChange={(e) => setBulbsRequired(e.target.value)}
        />
      </label>
    </>
  );
}
