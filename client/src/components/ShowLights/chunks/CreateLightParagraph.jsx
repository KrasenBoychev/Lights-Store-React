import { Link } from 'react-router-dom';

export default function CreateLightParagraph() {
  return (
    <p>
      <Link className="nav-link" to="/createlight">
        Give your old light a new life
      </Link>
    </p>
  );
}
