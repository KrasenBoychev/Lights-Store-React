import { Link } from "react-router-dom";
import "./about.css";

export default function About() {
  return (
    <div className="about_container">
      <section className="about_text">
        <h1>About Us</h1>
        <p>
          The company was found in 1997 in Varna, where we opened our first
          store. We started with a team of 5 people and now we are a team of 50
          people with 10 stores located in 10 different cities and towns.
        </p>
        <p>
          Our mission is to offer excellent quality lights and services which
          support our customers through the process of creating a project to the
          installation. Our range of lights offer some of the most popular
          styles such as modern, traditional, industrial and vintage. You will
          find different combinations of colours and designs as we always try to
          offer unusual style which will make your home, office or commercial
          place looks amazing!
        </p>
        <div className="about_catalog_link">
          <Link to={"/catalog"}>Lights</Link>
        </div>
      </section>
      <aside className="about_image">
        <div>
          <img src="/src/components/core/About/images/bulb-background.jpg" />
        </div>
      </aside>
    </div>
  );
}
