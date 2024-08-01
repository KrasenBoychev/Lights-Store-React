/* eslint-disable react/prop-types */
export default function Adjustable(props) {
  const {minHeight, maxHeight} = props.values;

  return (
    <div>
      <label>
        Min(cm):
        <input type="number" name="minHeight" value={minHeight} onChange={props.changeHandler}/>
      </label>
      <label>
        Max(cm):
        <input type="number" name="maxHeight" value={maxHeight} onChange={props.changeHandler}/>
      </label>
    </div>
  );
}
