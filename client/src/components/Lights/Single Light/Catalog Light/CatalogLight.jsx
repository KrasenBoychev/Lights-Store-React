import { useLocation } from "react-router-dom";
import { useState } from "react";

import OverlaySearchIcon from "../../../reusable components/OverlaySearchIcon";
import RemoveButton from "../../../Lights/Single Light/Light Details/Buttons/RemoveButton";
import "./CatalogLight.css";

export default function CatalogLight(light) {
  const location = useLocation();
  const currPage = location.pathname.split("/")[1];

  const { imageURL, name, price, _id } = light;

  const [catalogLightHovered, setCatalogLightHovered] = useState(false);

  const catalogLightEnterHandler = () => {
    setCatalogLightHovered(true);
  };

  const catalogLightLeaveHandler = () => {
    setCatalogLightHovered(false);
  };

  return (
    <div
      className="single_light_container"
      onMouseOver={catalogLightEnterHandler}
      onMouseOut={catalogLightLeaveHandler}
    >
      <div className="single_light_img">
        <img src={imageURL} />
        <OverlaySearchIcon
          props={{
            currState: catalogLightHovered,
            linkProps: { linkToPage: _id },
          }}
        />
      </div>
      <p className="single_light_name">{name}</p>
      <p className="single_light_price">{price.toFixed(2)}lv.</p>
      {currPage == "cart" && <RemoveButton props={{ light }} />}
    </div>
  );
}
