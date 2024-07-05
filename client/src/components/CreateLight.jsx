import './css/CreateLight.css';

export default function CreateLight() {
  return (
    <div className="create_section">
      <h1>Add your light</h1>

      <div className="create-wrapper">
        <label>
          Name: <input name="name" />
        </label>

        <label>
          Price: <input name="price" />
        </label>

        <label>
          Dimensions(cm): <input name="dimensions" placeholder="H/W/D" />
        </label>

        <p>
          Adjustable:
          <label>
            <input type="radio" name="adjustable" value="yes" />
            Yes
          </label>
          <label>
            <input type="radio" name="adjustable" value="no" />
            No
          </label>
        </p>

        <div>
          <label>
            Min(cm):<input name="min-height" />
          </label>
          <label>
            Max(cm):<input name="max-height" />
          </label>
        </div>

        <p>
          Integrated LED:
          <label>
            <input type="radio" name="integrated" value="yes" />
            Yes
          </label>
          <label>
            <input type="radio" name="integrated" value="no" />
            No
          </label>
        </p>

        <label>
          Kelvins: <input name="kelvins" placeholder="between 2700 and 6000" />
        </label>

        <label>
          Lumens: <input name="lumens" />
        </label>

        <label>
          Watt: <input name="watt" />
        </label>

        <label>
          Bulb type: <input name="bulb-type" placeholder="e.x. E27" />
        </label>

        <label>
          Number of bulbs: <input name="bulb-number" />
        </label>

        <button>Add</button>
      </div>
    </div>
  );
}
