import { Routes, Route } from 'react-router-dom';
import { Fragment, useState } from 'react';
import { catalogFunc, marketplaceFunc, profileFunc } from './utils/fetchData';
import Header from './components/Header/Header';
import Banner from './components/Home/Banner';
import Services from './components/Home/Services/Services';
import OurLights from './components/Home/OurLights';
import Comments from './components/Home/Comments/Comments';
import About from './components/About/About';
import ShowLights from './components/ShowLights/ShowLights';
import Details from './components/Light/Details/Details';
import CreateLight from './components/Light/CreateLight/CreateLight';
import Login from './components/Login-Register/Login';
import Register from './components/Login-Register/Register';
import Footer from './components/Footer/FooterSection/Footer';
import Copyright from './components/Footer/Copyright';
import CommentForm from './components/Home/Comments/CommentForm';
import NotFound from './components/Not Found/NotFound';
import ScrollTop from './ScrollTop';
import { Toaster } from 'react-hot-toast';
import { AuthContextProvider } from './contexts/AuthContext';

function App() {

  return (
    <>
      <ScrollTop />
      <AuthContextProvider>
        <Header />
        <Toaster />
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
          <Route
            path="/catalog"
            element={<ShowLights getDataFunc={catalogFunc} />}
          />
          <Route path="/catalog/:lightId" element={<Details />} />
          <Route
            path="/marketplace"
            element={<ShowLights getDataFunc={marketplaceFunc} />}
          />
          <Route path="/marketplace/:lightId" element={<Details />} />
          <Route path="/createlight" element={<CreateLight />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/profile"
            element={<ShowLights getDataFunc={profileFunc} />}
          />
          <Route path="/profile/:lightId" element={<Details />} />
          <Route path="/edit/:lightId" element={<CreateLight />} />
          <Route path="/comment" element={<CommentForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Copyright />
      </AuthContextProvider>
    </>
  );
}

export default App;
