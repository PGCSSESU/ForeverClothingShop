import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

/* ======================================================
   NAVBAR
====================================================== */
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const location = useLocation();

  /* ---------------- SCROLL SHADOW ---------------- */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------------- LOGOUT ---------------- */
  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
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

                  {/* ACTIVE UNDERLINE */}
                  <motion.span
                    layoutId="navbar-underline"
                    className={`absolute left-0 -bottom-1 h-[2px] bg-emerald-600 rounded-full ${
                      active ? "w-full" : "w-0"
                    }`}
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

            {/* PROFILE */}
            <div className="relative group">
              <motion.img
                whileHover={{ scale: 1.1 }}
                onClick={() => (!token ? navigate("/login") : null)}
                src={assets.profile_icon}
                className="w-5 cursor-pointer"
                alt="profile"
              />

              {/* DROPDOWN */}
              {token && (
                <div className="absolute right-0 mt-4 hidden group-hover:block">
                  <div
                    className="w-40 rounded-2xl bg-white/90 backdrop-blur-xl
                               shadow-[0_20px_60px_rgba(0,0,0,0.12)]
                               border border-gray-200 py-3"
                  >
                    <p
                      onClick={() => navigate("/orders")}
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
                  </div>
                </div>
              )}
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
                <span
                  className="absolute -bottom-2 -right-2
                             w-5 h-5 rounded-full bg-black
                             text-white text-[10px]
                             flex items-center justify-center"
                >
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

      {/* ================= MOBILE NAV DRAWER ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-white/80 backdrop-blur-xl"
          >
            <div className="flex flex-col h-full">
              {/* CLOSE */}
              <div
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 p-6 cursor-pointer"
              >
                <img
                  src={assets.dropdown_icon}
                  className="h-4 rotate-180"
                  alt=""
                />
                <span className="text-sm">Back</span>
              </div>

              {/* LINKS */}
              <div className="flex flex-col gap-6 px-8 mt-10">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className="text-xl font-medium text-gray-700"
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
