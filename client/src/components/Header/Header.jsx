import { Link, useLocation } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";

import "./header.css";
import { useEffect, useState } from "react";

export default function Header() {
  const { isAuthenticated, userCart } = useAuthContext();
  const location = useLocation();

  const [currLocation, setCurrLocation] = useState(null);

  useEffect(() => {
    setCurrLocation(location.pathname);
  }, [location]);

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link
              to="/"
              className={currLocation == "/" ? "header_active_link" : ""}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={currLocation == "/about" ? "header_active_link" : ""}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/catalog"
              className={currLocation == "/catalog" ? "header_active_link" : ""}
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
            >
              Marketplace
            </Link>
          </li>
        </ul>
        <ul>
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
                >
                  Cart
                  <span>{userCart?.length}</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className={
                    currLocation == "/profile" ? "header_active_link" : ""
                  }
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
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
