import { Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import { Toaster } from 'react-hot-toast';

import {
  getCatalogLights,
  getMarketplaceLights,
  getProfileLights,
} from '../api/lights-api';

import { AuthContextProvider } from './contexts/AuthContext';

import Header from './components/Header/Header';
import Banner from './components/Home/Banner';
import Services from './components/Home/Services/Services';
import OurLights from './components/Home/OurLights';
import Comments from './components/Home/Comments/Comments';
import About from './components/About/About';
import ShowLights from './components/ShowLights/ShowLights';
import Details from './components/Light/Details/Details';
import CreateLight from './components/Light/CreateLight/CreateLight';
import Cart from './components/Cart/Cart';
import Login from './components/Login-Register/Login';
import Register from './components/Login-Register/Register';
import Footer from './components/Footer/FooterSection/Footer';
import Copyright from './components/Footer/Copyright';
import CommentForm from './components/Home/Comments/CommentForm';
import NotFound from './components/Not Found/NotFound';
import Logout from './components/Logout.jsx/Logout';

import ScrollTop from './common/ScrollTop';
import PrivateGuard from './common/PrivateGuard';
import PublicGuard from './common/PublicGuard';

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
            element={<ShowLights getDataFunc={getCatalogLights} />}
          />
          <Route path="/catalog/:lightId" element={<Details />} />
          <Route
            path="/marketplace"
            element={<ShowLights getDataFunc={getMarketplaceLights} />}
          />
          <Route path="/marketplace/:lightId" element={<Details />} />
          <Route path="/comment" element={<CommentForm />} />

          <Route element={<PublicGuard />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<PrivateGuard />}>
            <Route path="/createlight" element={<CreateLight />} />
            <Route path="/edit/:lightId" element={<CreateLight />} />
            <Route
              path="/profile"
              element={<ShowLights getDataFunc={getProfileLights} />}
            />
            <Route path="/profile/:lightId" element={<Details />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/cart/:lightId" element={<Details />} />
            <Route path="/logout" element={<Logout />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
        <Copyright />

      </AuthContextProvider>
    </>
  );
}

export default App;
