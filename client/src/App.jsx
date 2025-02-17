import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import {
  getCatalogLights,
  getMarketplaceLights,
  getProfileLights,
} from "../api/lights-api";

import { AuthContextProvider } from "./contexts/AuthContext";

import Header from "./components/core/Header/Header";
import Home from "./components/core/Home/Home";
import About from "./components/core/About/About";
import ShowLights from "./components/ShowLights/ShowLights";
import Details from "./components/Light/Details/Details";
import CreateLight from "./components/Light/CreateLight/CreateLight";
import Cart from "./components/Cart/Cart";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Footer from "./components/core/Footer/Footer";
import CommentForm from "./components/core/Home/Comments/CommentForm";
import NotFound from "./components/core/Not Found/NotFound";
import Logout from "./components/authentication/Logout";
import OurStore from "./components/Our Store/OurStore";

import ScrollTop from "./common/ScrollTop";
import PrivateGuard from "./common/PrivateGuard";
import PublicGuard from "./common/PublicGuard";

import "./App.css";

function App() {
  return (
    <>
      <ScrollTop />

      <AuthContextProvider>
        <Header />
        <Toaster />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
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
            <Route path="/our-store" element={<OurStore />} />

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
        </main>
        <Footer />
      </AuthContextProvider>
    </>
  );
}

export default App;
