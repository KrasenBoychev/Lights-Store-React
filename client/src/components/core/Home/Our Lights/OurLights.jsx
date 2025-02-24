import { useState } from "react";
import "./ourLights.css";
import OurLightsModel from "./OurLightsModel";

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
        <OurLightsModel
          props={{
            handlers: {
              mouseOverHandler: ledFigureEnterHandler,
              mouseOutHandler: ledFigureLeaveHandler,
            },
            currState: ledFigureElHovered,
            imgProps: {
              imgPath:
                "images/our lights/LED-ceiling-lights.jpg",
              imgAlt: "Integrated LED Lights",
            },
            text: {
              heading: "Integrated LED Lights",
              description:
                "Choosing among different shapes and colour temperatures, these lights bring luxurious finish to your place. They are energy efficient and their working life is up to 25 000 hours.",
            },
            linkProps: {
              linkToPage: "/catalog",
              state: "integratedLed",
            },
          }}
        />

        <OurLightsModel
          props={{
            handlers: {
              mouseOverHandler: bulbsFigureEnterHandler,
              mouseOutHandler: bulbsFigureLeaveHandler,
            },
            currState: bulbsFigureElHovered,
            imgProps: {
              imgPath:
                "images/our lights/ceiling-lights-home.jpg",
              imgAlt: "Lights with bulbs",
            },
            text: {
              heading: "Lights with bulbs",
              description:
                "Available in modern and traditional style, these lights are suitable for any place. We highly recommend buying our LED bubls with them which last up to 15 000 hours.",
            },
            linkProps: {
              linkToPage: "/catalog",
              state: "bulbType",
            },
          }}
        />
      </div>
    </div>
  );
}
