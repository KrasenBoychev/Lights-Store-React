/* eslint-disable react/prop-types */
export default function Adjustable({values}) {
  const {minHeight, setMinHeight, maxHeight, setMaxHeight} = values;

  return (
    <div>
      <label>
        Min(cm):
        <input type="number" name="min-height" value={minHeight} onChange={(e) => setMinHeight(e.target.value)}/>
      </label>
      <label>
        Max(cm):
        <input type="number" name="max-height" value={maxHeight} onChange={(e) => setMaxHeight(e.target.value)}/>
      </label>
    </div>
  );
}
