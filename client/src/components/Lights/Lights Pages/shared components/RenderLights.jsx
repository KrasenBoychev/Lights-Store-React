import Spinner from "../../../core/Spinner";
import CatalogLight from "../../Single Light/Catalog Light/CatalogLight";

export default function RenderLights({ props }) {
  const { filteredLights, currentItems, spinner } = props;

  return (
    <div className="all_lights_container">
      {spinner ? (
        <Spinner />
      ) : filteredLights.length > 0 ? (
        <div className="all_lights_wrapper">
          {currentItems.map((light) => {
            return (
              <CatalogLight
                key={light._id}
                props={{ light, setSpinner: props.setSpinner }}
              />
            );
          })}
        </div>
      ) : (
        <p>
          There are no lights
          {props.cartMsg ? " added to the cart" : " available at the moment"}
        </p>
      )}
    </div>
  );
}
