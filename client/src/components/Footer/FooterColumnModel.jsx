/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

export default function FooterColumnModel({ element }) {
  return (
    <div className="footer_column">
      <h3>{element.heading}</h3>
      <ul
        // className={
        //   element.list
        //     ? 'let-us-help-icons footer_lorem_text'
        //     : 'footer_lorem_text1'
        // }
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
