/* eslint-disable react/prop-types */
export default function IntegratedLed({ values }) {
  const { kelvins, setKelvins, lumens, setLumens, watt, setWatt } = values;
  return (
    <>
      <label>
        Kelvins:
        <input
          type="number"
          name="kelvins"
          placeholder="between 2700 and 6000"
          value={kelvins}
          onChange={(e) => setKelvins(e.target.value)}
        />
      </label>

      <label>
        Lumens:
        <input
          type="number"
          name="lumens"
          value={lumens}
          onChange={(e) => setLumens(e.target.value)}
        />
      </label>

      <label>
        Watt:
        <input
          type="number"
          name="watt"
          value={watt}
          onChange={(e) => setWatt(e.target.value)}
        />
      </label>
    </>
  );
}
