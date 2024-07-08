import { Routes, Route, Link } from 'react-router-dom';
import { Fragment } from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import Services from './components/Services';
import OurLights from './components/OurLights';
import Comments from './components/Comments';
import About from './components/About';
import Catalog from './components/Catalog';
import Marketplace from './components/Marketplace';
import Details from './components/Details';
import CreateLight from './components/CreateLight';
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer';
import Copyright from './components/Copyright';
import NotFound from './components/NotFound';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <Fragment>
              <Banner />
              <Services />
              <OurLights />
              <Comments />
            </Fragment>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<Details />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/marketplace/:id" element={<Details />} />
        <Route path="/createlight" element={<CreateLight />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Link to="/catalog/:id">Go to Details Component</Link>
      <Footer />
      <Copyright />
    </>
  );
}

export default App;
