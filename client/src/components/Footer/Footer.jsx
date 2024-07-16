import { Link } from 'react-router-dom';

export default function Footer() {
  const subscribeClickHandler = () => {

  };
  
  return (
    <div className="footer_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-sm-6">
            <h1 className="customer_text">LET US HELP YOU</h1>
            <ul className="let-us-help-icons footer_lorem_text">
              <li>
                <img src="images/phone.png" />
                +01 1234567890
              </li>
              <li>
                <img src="images/email.png" />
                lights@lights.com
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-sm-6">
            <h1 className="customer_text">INFORMATION</h1>
            <ul className="footer_lorem_text1">
              <li>
                <Link to={'/about'}>About Us</Link>
              </li>
              <li>
                <Link to={'/catalog'}>Catalog</Link>
              </li>
              <li>
                <Link to={'/marketplace'}>Marketplace</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-sm-6">
            <h1 className="customer_text">Your Opinion</h1>
            <ul className="footer_lorem_text1">
              <li>
                <Link to={'/comment'}>Comment Form</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-sm-6">
            <h1 className="customer_text">Join us</h1>
            <p className="footer_lorem_text">
              Receive our newsletter, promotions and get personal offers
            </p>
          </div>
        </div>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter your email"
            aria-label="Enter your email"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <span className="input-group-text" id="basic-addon2">
              <Link onClick={subscribeClickHandler}>Subscribe</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
