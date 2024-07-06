import { useState } from 'react';
import { createRecord } from '../../api/data';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import './css/CreateLight.css';

export default function CreateLight() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [imageURL, setImageURL] = useState('');

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const imageRef = ref(storage, `images/${imageURL.name + v4()}`);
    await uploadBytes(imageRef, imageURL);

    const downloadURL = await getDownloadURL(imageRef);

    const result = await createRecord({ name, price, date, dimensions, downloadURL });
    if (result) {
      alert('Data saved successfully');
      setName('');
      setPrice('');
      setDate('');
      setDimensions('');
      setImageURL('');
    }
  };

  return (
    <div className="create_section">
      <h1>Add your light</h1>

      {/* Add Image Uploader */}

      <div className="create-wrapper">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Sale Price:
          <input
            type="number"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>

        <label>
          Date of Purchase:
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label>
          Image:
          <input
            type="file"
            name="image"
            onChange={(event) => setImageURL(event.target.files[0])}
          />
        </label>

        <label>
          Dimensions(cm):
          <input
            type="text"
            name="dimensions"
            placeholder="H/W/D"
            value={dimensions}
            onChange={(e) => setDimensions(e.target.value)}
          />
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
            Min(cm):
            <input type="number" name="min-height" />
          </label>
          <label>
            Max(cm):
            <input type="number" name="max-height" />
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
          Kelvins:
          <input
            type="number"
            name="kelvins"
            placeholder="between 2700 and 6000"
          />
        </label>

        <label>
          Lumens: <input type="number" name="lumens" />
        </label>

        <label>
          Watt: <input type="number" name="watt" />
        </label>

        <label>
          Bulb type:{' '}
          <input type="text" name="bulb-type" placeholder="e.x. E27" />
        </label>

        <label>
          Number of bulbs: <input type="number" name="bulb-number" />
        </label>

        <label>
          Notes: <textarea name="notes"></textarea>
        </label>

        <button type="submit" onClick={handleOnSubmit}>
          Add
        </button>
      </div>
    </div>
  );
}
