/* eslint-disable react/prop-types */
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../api/api';

export default function Header({ navValues }) {
  const navigate = useNavigate();

  async function logoutFunc() {
    try {
      await logout();
      navValues.setUserNav(false);
      navigate('/');
    } catch(error) {
      alert(error.message);
    }
  }
  return (
    <div className="header_section">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          {/* <div className="logo"><a href="index.html">
               <img src="images/logo-copy.png" />
               </a></div> */}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/catalog">
                      Catalog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/marketplace">
                  Marketplace
                </Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <h1 className="call_text">Call Us : +01 1234567890</h1>
            </form>
            <div className="search_icon">
              {/* <li><a href="#"><img src="images/search-icon.png" /></a></li> */}
              {navValues.userNav || Object.entries(sessionStorage).length > 0 ? (
                <ul>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/logout" onClick={ logoutFunc }>
                      Logout
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
