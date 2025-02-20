import { Link } from 'react-router-dom';

export default function CreateLightParagraph() {
  return (
    <p className="create_light_paragraph_container">
      <Link to="/createlight">
        Give your old light a new life
      </Link>
    </p>
  );
}
