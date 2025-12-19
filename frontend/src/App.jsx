import React from "react";
import { Routes, Route } from "react-router-dom";

/* PAGES */
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Verify from "./pages/Verify";
import ExploreJobs from "./pages/ExploreJobs";
import Favourite from "./pages/Favourite";

/* COLLECTIONS */
import MenCollection from "./pages/MenCollection";
import WomenCollection from "./pages/WomenCollection";
import KidsCollection from "./pages/KidsCollection";

/* COMPONENTS */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";

/* CONTEXT */
import { FavouriteProvider } from "./context/FavaouriteContext";
import { ReviewProvider } from "./context/ReviewContext";

/* TOAST */
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <FavouriteProvider>
      <ReviewProvider>
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
          <ToastContainer />
          <Navbar />
          <SearchBar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/collection/men" element={<MenCollection />} />
            <Route path="/collection/women" element={<WomenCollection />} />
            <Route path="/collection/kids" element={<KidsCollection />} />

            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/favourites" element={<Favourite />} />

            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/explorejobs" element={<ExploreJobs />} />
          </Routes>

          <Footer />
        </div>
      </ReviewProvider>
    </FavouriteProvider>
  );
};

export default App;
