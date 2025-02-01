import Banner from "./Banner/Banner";
import Comments from "./Comments/Comments";
import OurLights from "./Our Lights/OurLights";
import Services from "./Services/Services";

import './home.css'

export default function Home() {
  return (
    <div className="home-container">
      <Banner />
      <Services />
      <OurLights />
      {/* <Comments /> */}
    </div>
  );
}
