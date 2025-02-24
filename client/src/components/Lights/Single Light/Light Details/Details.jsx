/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

import {
  useLightDetails,
  useBoughtLight,
} from "../../../../hooks/lights/single light/useLightDetails";

import "./details.css";

import ProfileButtons from "./Buttons/ProfileButtons";
import BuyButton from "./Buttons/BuyButton";
import RemoveButton from "./Buttons/RemoveButton";

import Spinner from "../../../core/Spinner";
import { formatDate } from "../../../../common/dateFormatter";

export default function Details() {
  const navigate = useNavigate();

  const [
    light,
    setLights,
    lightQuantities,
    setLightQuantities,
    spinner,
    setSpinner,
    currPage,
  ] = useLightDetails();

  const [boughtItem, setBoughtItem] = useBoughtLight(light);

  const { date, month, year } = formatDate(light.date);

  return (
    <div className="light_details_container">
      {spinner ? (
        <Spinner />
      ) : (
        <div className="light_details_wrapper">
          <section className="section_light_description">
            <div className="light_details_img">
              <img src={light.imageURL} />
            </div>
            <div className="light_details_description">
              <h4>{light.name}</h4>
              <p>{light.price ? light.price.toFixed(2) : ""}lv.</p>
              <p>{lightQuantities ? lightQuantities : 0} In Stock</p>
              <ul className="light_details_description_list">
                <li>
                  Dimensions({!light.maxHeight && "H/"}W/D):{" "}
                  {!light.maxHeight && `${light.height} x `}
                  {light.width} x {light.depth} cm.
                </li>

                {light.maxHeight && (
                  <li>
                    Adjustable height - Drop between {light.height} to{" "}
                    {light.maxHeight} cm.
                  </li>
                )}

                {light.kelvins && (
                  <>
                    <li>Integrated LED</li>
                    <li>{light.kelvins} Kelvins</li>
                    <li>{light.lumens} Lumens</li>
                    <li>{light.watt} Watts</li>
                  </>
                )}

                {light.bulbType && (
                  <>
                    <li>Bulb Type: {light.bulbType}</li>
                    <li>Bulbs Required: {light.bulbsRequired}</li>
                  </>
                )}

                {currPage != "catalog" && light.date && (
                  <li>
                    Date of purchase: {date} {month} {year}
                  </li>
                )}
              </ul>
            </div>
          </section>

          {currPage != "catalog" && light.notes && (
            <section className="light_details_notes">
              <p>
                <span>Notes:</span> {light.notes}
              </p>
            </section>
          )}

          <section className="light_details_buttons">
            {currPage == "profile" && (
              <ProfileButtons props={{ light, setSpinner, navigate }} />
            )}

            {currPage == "cart" && <RemoveButton props={{ light, setSpinner }} />}

            {(currPage == "catalog" || currPage == "marketplace") &&
              (lightQuantities <= 0 ? (
                boughtItem ? (
                  <p>Light added to your cart</p>
                ) : (
                  <p>Out of Stock</p>
                )
              ) : boughtItem ? (
                <p>Light added to your cart</p>
              ) : (
                <BuyButton
                  props={{ light, setBoughtItem, setLightQuantities, navigate }}
                />
              ))}
          </section>
        </div>
      )}
    </div>
  );
}
