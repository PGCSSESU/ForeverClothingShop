import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { FavouriteContext } from "../context/FavaouriteContext";

/* ======================================================
   NAVBAR
====================================================== */
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const profileRef = useRef(null);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const { favourites } = useContext(FavouriteContext);
  const location = useLocation();

  /* ---------------- SCROLL SHADOW ---------------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------------- CLICK OUTSIDE CLOSE ---------------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- LOGOUT ---------------- */
  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    setProfileOpen(false);
  };

  const navItems = [
    { name: "HOME", path: "/" },
    { name: "COLLECTION", path: "/collection" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <>
      {/* ================= DESKTOP NAVBAR ================= */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
            : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img src={assets.logo} className="w-36" alt="logo" />
          </Link>

          {/* NAV LINKS */}
          <nav className="hidden sm:flex items-center gap-10 text-sm font-medium">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className="relative text-gray-700 hover:text-black transition"
                >
                  {item.name}
                  <motion.span
                    layoutId="navbar-underline"
                    className="absolute left-0 -bottom-1 h-[2px] bg-emerald-600 rounded-full"
                    animate={{ width: active ? "100%" : "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </NavLink>
              );
            })}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-6">
            {/* SEARCH */}
            <motion.img
              whileHover={{ scale: 1.1 }}
              onClick={() => {
                setShowSearch(true);
                navigate("/collection");
              }}
              src={assets.search_icon}
              className="w-5 cursor-pointer"
              alt="search"
            />

            {/* FAVOURITES */}
            <Link to="/favourites" className="relative">
              <motion.div whileHover={{ scale: 1.1 }}>
                <Heart
                  size={20}
                  className={`${
                    favourites.length > 0
                      ? "fill-emerald-500 text-emerald-500"
                      : "text-gray-700"
                  }`}
                />
              </motion.div>
              {favourites.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center">
                  {favourites.length}
                </span>
              )}
            </Link>

            {/* PROFILE */}
            <div className="relative" ref={profileRef}>
              <motion.img
                whileHover={{ scale: 1.1 }}
                onClick={() =>
                  token ? setProfileOpen((p) => !p) : navigate("/login")
                }
                src={assets.profile_icon}
                className="w-5 cursor-pointer"
                alt="profile"
              />

              {/* DROPDOWN */}
              <AnimatePresence>
                {token && profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-4 w-44 rounded-2xl bg-white/90 backdrop-blur-xl
                               shadow-[0_20px_60px_rgba(0,0,0,0.12)]
                               border border-gray-200 py-3 z-50"
                  >
                    <p
                      onClick={() => {
                        navigate("/favourites");
                        setProfileOpen(false);
                      }}
                      className="px-5 py-2 text-sm text-gray-600 hover:text-black cursor-pointer"
                    >
                      Favourites
                    </p>

                    <p
                      onClick={() => {
                        navigate("/orders");
                        setProfileOpen(false);
                      }}
                      className="px-5 py-2 text-sm text-gray-600 hover:text-black cursor-pointer"
                    >
                      Orders
                    </p>

                    <p
                      onClick={logout}
                      className="px-5 py-2 text-sm text-gray-600 hover:text-black cursor-pointer"
                    >
                      Logout
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CART */}
            <Link to="/cart" className="relative">
              <motion.img
                whileHover={{ scale: 1.1 }}
                src={assets.cart_icon}
                className="w-5"
                alt="cart"
              />
              {getCartCount() > 0 && (
                <span className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-black text-white text-[10px] flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* MOBILE MENU */}
            <img
              onClick={() => setMobileOpen(true)}
              src={assets.menu_icon}
              className="w-5 cursor-pointer sm:hidden"
              alt="menu"
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
