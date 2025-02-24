import OverlaySearchIcon from "../../../reusable components/overlay search icon/OverlaySearchIcon";

export default function OurLightsModel({ props }) {
  const { handlers, currState, imgProps, text, linkProps } = props;

  return (
    <section
      className="our_lights_led"
      onMouseOver={handlers.mouseOverHandler}
      onMouseOut={handlers.mouseOutHandler}
    >
      <figure>
        <img src={imgProps.imgPath} alt={imgProps.imgAlt} />
        <figcaption>
          <h3>{text.heading}</h3>
          <p>{text.description}</p>
        </figcaption>
      </figure>

      <OverlaySearchIcon
        props={{
          currState,
          linkProps,
        }}
      />
    </section>
  );
}
