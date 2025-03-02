import { useAuthContext } from "../../../../contexts/AuthContext";
import RenderLights from "../shared components/RenderLights";

import "../lightsPages.css";
import { useState } from "react";

export default function Cart() {
  const { userCart } = useAuthContext();

  const [spinner, setSpinner] = useState(false);

  return (
    <div
      className={
        userCart.length > 4
          ? "lights_page_container cart_container_lights_left"
          : "lights_page_container"
      }
    >
      <h1>Cart</h1>
      <div className="user_lights_container">
        <RenderLights
          props={{
            currentItems: userCart,
            spinner,
            setSpinner,
            cartMsg: true,
          }}
        />
      </div>
    </div>
  );
}
