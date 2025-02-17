import { Link } from 'react-router-dom';
import './footer.css';

export default function FooterColumnModel({ element }) {
  return (
    <div className="footer_column">
      <h3>{element.heading}</h3>
      <ul
        className={
          element.list
            ? 'let_us_help_details'
            : 'footer_link'
        }
      >
        {element.list
          ? Object.entries(element.list).map((details) => (
              <li key={details[0]}>
                <img src={details[1][0]} />
                {details[1][1]}
              </li>
            ))
          : Object.entries(element.links).map((details) => (
              <li key={details[0]}>
                <Link to={'/' + details[0]}>{details[1]}</Link>
              </li>
            ))}
      </ul>
    </div>
  );
}
