import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="about_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1 className="about_text">About Us</h1>
            <p className="lorem_text">
              The company was found in 1997 in Varna, where we opened our first
              store. We started with a team of 5 people and now we are a team of
              50 people with 10 stores located in 10 different cities and towns.
            </p>
            <p className="lorem_text">
              Our mission is to offer excellent quality lights and services
              which support our customers through the process of creating a
              project to the installation. Our range of lights offer some of the
              most popular styles such as modern, traditional, industrial and
              vintage. You will find different combinations of colours and
              designs as we always try to offer unusual style which will make
              your home, office or commercial place looks amazing!
            </p>
            <div className="read_bt1">
              <Link to={'/catalog'}>Lights</Link>
            </div>
          </div>
          <div className="col-md-6">
            <div className="image_1">
              <img src="images/bulb-background.jpg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
