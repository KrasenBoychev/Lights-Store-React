import ClipLoader from 'react-spinners/ClipLoader';

export default function Spinner() {
  return (
    <div style={{ width: '100px', margin: '100px auto', display: 'block' }}>
      <ClipLoader color="#000000" size={100} />
    </div>
  );
}
