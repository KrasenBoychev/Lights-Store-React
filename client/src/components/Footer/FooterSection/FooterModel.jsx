/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

export default function FooterModel({ element }) {
  return (
    <div className="col-lg-3 col-sm-6">
      <h1 className="customer_text">{element.heading}</h1>
      <ul
        className={
          element.list
            ? 'let-us-help-icons footer_lorem_text'
            : 'footer_lorem_text1'
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
