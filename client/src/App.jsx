import { Routes, Route } from 'react-router-dom';
import { Fragment, useState } from 'react';
import Header from './components/Header/Header';
import Banner from './components/Home/Banner';
import Services from './components/Home/Services';
import OurLights from './components/Home/OurLights';
import Comments from './components/Home/Comments';
import About from './components/Main/About';
import Catalog from './components/Main/Catalog/Catalog';
import Marketplace from './components/Main/Marketplace/Marketplace';
import Details from './components/Light/Details/Details';
import CreateLight from './components/Light/CreateLight/CreateLight';
import Login from './components/Main/Login/Login';
import Register from './components/Main/Register';
import Footer from './components/Footer/Footer';
import Copyright from './components/Footer/Copyright';
import NotFound from './components/Not Found/NotFound';
import ScrollTop from './ScrollTop';

function App() {
  const [spinner, setSpinner] = useState(false);
  const [userNav, setUserNav] = useState(false);

  return (
    <>
      <ScrollTop />
      <Header navValues={{userNav, setUserNav}}/>

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
        <Route path="/catalog" element={<Catalog spinnerValues={{spinner, setSpinner}}/>} />
        <Route path="/catalog/:id" element={<Details />} />
        <Route path="/marketplace" element={<Marketplace spinnerValues={{spinner, setSpinner}}/>} />
        <Route path="/marketplace/:id" element={<Details />} />
        <Route path="/createlight" element={<CreateLight spinnerValues={{spinner, setSpinner}}/>} />
        <Route path="/login" element={<Login setUserNav={ setUserNav }/>} />
        <Route path="/register" element={<Register setUserNav={ setUserNav }/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Copyright />
    </>
  );
}

export default App;
