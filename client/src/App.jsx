import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthContextProvider } from "./contexts/AuthContext";

import Header from "./components/core/Header/Header";
import Home from "./components/core/Home/Home";
import About from "./components/core/About/About";
import Details from "./components/Lights/Single Light/Light Details/Details";
import CreateLight from "./components/Lights/Single Light/Create Light/CreateLight";
import Cart from "./components/Lights/Lights Pages/User Lights/Cart";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Logout from "./components/authentication/Logout";
import Footer from "./components/core/Footer/Footer";
import CommentForm from "./components/Create Comment/CommentForm";
import NotFound from "./components/core/Not Found/NotFound";
import OurStore from "./components/Store Location/OurStore";
import Catalog from "./components/Lights/Lights Pages/Commercial Lights/Catalog";
import Marketplace from "./components/Lights/Lights Pages/Commercial Lights/Marketplace";
import Profile from "./components/Lights/Lights Pages/User Lights/Profile";

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
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:lightId" element={<Details />} />
            <Route path="/marketplace" element={<Marketplace />} />
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
              <Route path="/profile" element={<Profile />} />
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
