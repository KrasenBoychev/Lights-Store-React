import { Link } from "react-router-dom";
import "./banner.css";

export default function Banner() {
  return (
    <section className="banner_section">
      <div>
        <h1 className="banner_heading">Lights Store</h1>
        <p className="banner_description">
          Excellent selection of lights to suit everyone's taste
        </p>
      </div>
      <Link className="banner_catalog_link" to="/catalog">Catalog</Link>
    </section>
  );
}
