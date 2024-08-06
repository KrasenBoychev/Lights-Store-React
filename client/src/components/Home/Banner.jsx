import { Link } from 'react-router-dom';

export default function Banner() {
  return (
    <div className="banner_section layout_padding">
      <div className="container">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="carousel-background">
              <h1 className="furniture_text">Lights Store</h1>
              <p className="there_text">
                Excellent selection of lights which will make your home look the
                way you dream
              </p>
            </div>
            <div className="contact_bt_main">
              <div className="contact_bt">
                <Link to="/catalog">Lights</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
