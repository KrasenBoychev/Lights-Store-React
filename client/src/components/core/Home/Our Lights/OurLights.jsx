import { Link } from "react-router-dom";
import "./ourLights.css";
import { useState } from "react";

export default function OurLights() {
  const [ledFigureElHovered, setLedFigureElHovered] = useState(false);
  const [bulbsFigureElHovered, setBulbsFigureElHovered] = useState(false);

  const ledFigureEnterHandler = () => {
    setLedFigureElHovered(true);
  };

  const ledFigureLeaveHandler = () => {
    setLedFigureElHovered(false);
  };

  const bulbsFigureEnterHandler = () => {
    setBulbsFigureElHovered(true);
  };

  const bulbsFigureLeaveHandler = () => {
    setBulbsFigureElHovered(false);
  };

  return (
    <div className="our_lights_container">
      <h2>Range of Lights</h2>
      <div className="our_lights_wrapper">
        <section
          className="our_lights_led"
          onMouseOver={ledFigureEnterHandler}
          onMouseOut={ledFigureLeaveHandler}
        >
          <figure>
            <img
              src="/src/components/core/Home/Our Lights/images/LED-ceiling-lights.jpg"
              alt="Integrated LED Lights"
            />
            <figcaption>
              <h3>Integrated LED Lights</h3>
              <p>
                Choosing among different shapes and colour temperatures, these
                lights bring luxurious finish to your place. They are energy
                efficient and their working life is up to 25 000 hours.
              </p>
            </figcaption>
          </figure>

          <div
            className={
              ledFigureElHovered
                ? "our_lights_search_overlay_active"
                : "our_lights_search_overlay_inactive"
            }
          >
            <Link to={"/catalog"} state={"integratedLed"}>
              <i className="fa-solid fa-magnifying-glass fa-2xl"></i>
            </Link>
          </div>
        </section>

        <section
          className="our_lights_bulbs"
          onMouseOver={bulbsFigureEnterHandler}
          onMouseOut={bulbsFigureLeaveHandler}
        >
          <figure>
            <img
              src="/src/components/core/Home/Our Lights/images/ceiling-lights-home.jpg"
              alt="Lights with bulbs"
            />
            <figcaption>
              <h3>Lights with bulbs</h3>
              <p>
                Available in modern and traditional style, these lights are
                suitable for any place. We highly recommend buying our LED bubls
                with them which last up to 15 000 hours.
              </p>
            </figcaption>
          </figure>
          <div
            className={
              bulbsFigureElHovered
                ? "our_lights_search_overlay_active"
                : "our_lights_search_overlay_inactive"
            }
          >
            <Link to={"/catalog"} state={"bulbType"}>
              <i className="fa-solid fa-magnifying-glass fa-2xl"></i>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
