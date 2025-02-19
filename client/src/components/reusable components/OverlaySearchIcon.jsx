import { Link } from "react-router-dom";

import "./overlaySearchIcon.css";

export default function OverlaySearchIcon({ props }) {
  const { currState, linkProps } = props;

  return (
    <div
      className={
        currState
          ? "div_overlay_search_icon_active"
          : "div_overlay_search_icon_inactive"
      }
    >
      <Link
        to={linkProps.linkToPage}
        state={linkProps.state ? linkProps.state : ""}
      >
        <i className="fa-solid fa-magnifying-glass fa-2xl"></i>
      </Link>
    </div>
  );
}
