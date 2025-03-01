import { Link, useLocation } from "react-router-dom";

import { useAuthContext } from "../../../contexts/AuthContext";

import "./header.css";
import { useEffect, useState } from "react";

export default function Header() {
  const { isAuthenticated, userCart } = useAuthContext();
  const location = useLocation();

  const [currLocation, setCurrLocation] = useState(null);
  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);

  useEffect(() => {
    setCurrLocation(location.pathname);
  }, [location]);

  const openNavMenuClickNadler = () => {
    if (openDropDownMenu) {
      setOpenDropDownMenu(false);
    } else {
      setOpenDropDownMenu(true);
    }
  };

  const clickLinkHeaderHandler = () => {
    if (openDropDownMenu) {
      setOpenDropDownMenu(false);
    }
  };

  return (
    <header>
      <nav className={openDropDownMenu ? "header_opened_menu_nav" : ""}>
        <ul className="header_nav_icon">
          <li onClick={openNavMenuClickNadler}>
            <i className="fa-solid fa-bars fa-2xl"></i>
          </li>
        </ul>
        <ul>
          <li>
            <Link
              to="/"
              className={currLocation == "/" ? "header_active_link" : ""}
              onClick={clickLinkHeaderHandler}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={currLocation == "/about" ? "header_active_link" : ""}
              onClick={clickLinkHeaderHandler}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/catalog"
              className={currLocation == "/catalog" ? "header_active_link" : ""}
              onClick={clickLinkHeaderHandler}
            >
              Catalog
            </Link>
          </li>
          <li>
            <Link
              to="/marketplace"
              className={
                currLocation == "/marketplace" ? "header_active_link" : ""
              }
              onClick={clickLinkHeaderHandler}
            >
              Marketplace
            </Link>
          </li>
        </ul>
        <ul className="header_nav_call_us">
          <p>Call Us : +01 1234567890</p>
        </ul>
        <ul>
          {isAuthenticated ? (
            <>
              <li>
                <Link
                  to="/cart"
                  className={
                    currLocation == "/cart" ? "header_active_link" : ""
                  }
                  onClick={clickLinkHeaderHandler}
                >
                  Cart
                  <span className="header_cart_items_num">
                    {userCart?.length}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className={
                    currLocation == "/profile" ? "header_active_link" : ""
                  }
                  onClick={clickLinkHeaderHandler}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/logout" onClick={clickLinkHeaderHandler}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className={
                    currLocation == "/login" ? "header_active_link" : ""
                  }
                  onClick={clickLinkHeaderHandler}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className={
                    currLocation == "/register" ? "header_active_link" : ""
                  }
                  onClick={clickLinkHeaderHandler}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
