export default function DeleteLight() {
  return (
      <div className="delete-wrapper">
        <div className="delete-question">
          <p>
            Are you sure you want to delete lightName?
          </p>
        </div>
        <div className="delete-buttons">
          <button>Yes, sure</button>
          <button>Cancel</button>
        </div>
      </div>
  );
}
