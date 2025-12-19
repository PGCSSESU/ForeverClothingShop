import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { FavouriteContext } from "../context/FavaouriteContext";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Brain, X, ShoppingCart, Plus, Minus } from "lucide-react";
import RelatedProducts from "../components/RelatedProducts";
import Reviews from "../components/Review";

/* ================= CONFIG ================= */
const AUTO_DELAY = 2400;
const LENS_SIZE = 180;

/* ================= HELPERS ================= */
const formatPrice = (num) =>
  num.toLocaleString("en-IN", { maximumFractionDigits: 0 });


/* ================= CART SIDEBAR ================= */
const CartSidebar = ({ isOpen, onClose, cartItems, products, updateQuantity, removeFromCart }) => {
  const cartProducts = Object.entries(cartItems).flatMap(([productId, sizes]) =>
    Object.entries(sizes).map(([size, quantity]) => {
      const product = products.find(p => p._id === productId);
      return product ? { ...product, size, quantity, cartKey: `${productId}-${size}` } : null;
    })
  ).filter(item => item && item.quantity > 0);

  const total = cartProducts.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const navigate = useNavigate()

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-3">
                <ShoppingCart className="text-emerald-600" size={24} />
                <h2 className="text-2xl font-bold">Your Cart</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartProducts.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                cartProducts.map((item) => (
                  <motion.div
                    key={item.cartKey}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    className="flex gap-4 bg-gray-50 rounded-xl p-4"
                  >
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{item.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">Size: {item.size}</p>
                      <p className="text-emerald-600 font-bold mt-2">
                        ₹{formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
             
                      <div className="flex items-center gap-2 bg-white rounded-lg border">
                        <button
                          onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 rounded transition"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-semibold text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded transition"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartProducts.length > 0 && (
              <div className="border-t p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-emerald-600">
                    ₹{formatPrice(total)}
                  </span>
                </div>
                <motion.button
                             onClick={() => navigate('/place-order')}
                             className='bg-green-600 text-white text-sm my-8 px-8 py-3 rounded-md shadow-lg hover:bg-green-700 transition-all duration-300'
                             whileHover={{ scale: 1.05 }}
                             whileTap={{ scale: 0.95 }}
                           >
                             PROCEED TO CHECKOUT
                           </motion.button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ================= PRODUCT PAGE ================= */
const Product = () => {
  const { productId } = useParams();

  const { products, addToCart, token, cartItems, updateQuantity, removeFromCart } = useContext(ShopContext);
  const { toggleFavourite, isFavourite } = useContext(FavouriteContext);

  /* ===== STATE ===== */
  const [product, setProduct] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [paused, setPaused] = useState(false);
  const [showExplain, setShowExplain] = useState(false);
  const [flyCart, setFlyCart] = useState(false);
  const [cartSidebarOpen, setCartSidebarOpen] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  const [flyPosition, setFlyPosition] = useState({ x: 0, y: 0 });

  const autoTimer = useRef(null);
  const imgRef = useRef(null);
  const cartIconRef = useRef(null);

  const [lens, setLens] = useState({ x: 0, y: 0, show: false });

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    const found = products.find((p) => p._id === productId);
    if (found) {
      setProduct(found);
      setActiveIndex(0);
      setSelectedSize("");
    }
  }, [productId, products]);

  /* ================= AUTO SLIDER ================= */
  useEffect(() => {
    if (!product || paused) return;
    autoTimer.current = setInterval(() => {
      setActiveIndex((p) => (p + 1) % product.image.length);
    }, AUTO_DELAY);
    return () => clearInterval(autoTimer.current);
  }, [product, paused]);

  if (!product) return null;

  const images = product.image;
  const favActive = isFavourite(product._id);

  const cartCount = cartItems ? Object.values(cartItems).reduce(
    (total, sizes) => total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0),
    0
  ) : 0;

  /* ================= HANDLERS ================= */
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Select size first");
      return;
    }

    addToCart(product._id, selectedSize);
    toast.success("Added to cart");

    // Get positions for flying animation
    if (imgRef.current) {
      const rect = imgRef.current.getBoundingClientRect();
      setFlyPosition({ x: rect.left, y: rect.top });
    }

    setFlyCart(true);
    setShowPulse(true);

    setTimeout(() => {
      setFlyCart(false);
      setCartSidebarOpen(true);
    }, 800);

    setTimeout(() => setShowPulse(false), 1000);
  };

  const handleLensMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPaused(true);
    setLens({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      show: true,
    });
  };

  const handleLensLeave = () => {
    setLens({ ...lens, show: false });
    setPaused(false);
  };

  /* ================= WHY THIS PRODUCT ================= */
  const explainList = [
    "High demand in this category",
    "Perfect size availability",
    "Premium fabric quality",
    "Excellent customer ratings",
    "AI fit confidence match",
  ];

  /* ================= RENDER ================= */
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={cartSidebarOpen}
        onClose={() => setCartSidebarOpen(false)}
        cartItems={cartItems || {}}
        products={products}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />

      {/* Ambient */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-emerald-200/20 blur-[220px]" />
      <div className="absolute bottom-0 -right-40 w-[600px] h-[600px] bg-emerald-300/20 blur-[260px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* ================= LEFT ================= */}
          <div className="lg:sticky lg:top-28">
            {/* IMAGE */}
            <div
              ref={imgRef}
              className="relative group"
              onMouseMove={handleLensMove}
              onMouseLeave={handleLensLeave}
            >
              {/* Outer Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-br from-emerald-400/20 via-teal-400/20 to-cyan-400/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[3rem]" />
              
              {/* Main Image Container */}
              <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 shadow-[0_20px_80px_rgba(0,0,0,0.12)] ring-1 ring-gray-200/50">
                {/* Premium Border Shine */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-60 pointer-events-none z-10" />
                
                <AnimatePresence mode="wait">
                  <motion.img
                    key={images[activeIndex]}
                    src={images[activeIndex]}
                    alt={product.name}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full aspect-[3/4] max-h-[560px] object-cover relative z-[5]"
                  />
                </AnimatePresence>

                {/* Zoom Lens with Premium Effect */}
                {lens.show && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute pointer-events-none hidden lg:block z-20"
                    style={{
                      width: LENS_SIZE,
                      height: LENS_SIZE,
                      top: lens.y - LENS_SIZE / 2,
                      left: lens.x - LENS_SIZE / 2,
                    }}
                  >
                    {/* Lens Container with Glass Effect */}
                    <div className="w-full h-full rounded-full overflow-hidden ring-4 ring-white shadow-[0_25px_60px_rgba(0,0,0,0.35)]">
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage: `url(${images[activeIndex]})`,
                          backgroundSize: "140%",
                          backgroundPosition: `-${lens.x * 0.4}px -${lens.y * 0.4}px`,
                        }}
                      />
                      {/* Lens Shine */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </motion.div>
                )}

                {/* ❤️ FAVOURITE with Glass Morphism */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    if (!token) {
                      toast.error("Login to add favourites");
                      return;
                    }
                    toggleFavourite(product);
                  }}
                  className="absolute top-5 right-5 z-20 w-12 h-12 rounded-2xl bg-white/95 backdrop-blur-xl flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-white/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] transition-all duration-300"
                >
                  <Heart
                    size={20}
                    className={`transition-all duration-300 ${
                      favActive
                        ? "fill-emerald-600 text-emerald-600 scale-110"
                        : "text-gray-600 hover:text-emerald-600"
                    }`}
                  />
                </motion.button>

                {/* Image Counter Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-5 left-5 z-20 px-4 py-2 rounded-full bg-black/70 backdrop-blur-xl text-white text-sm font-medium shadow-lg"
                >
                  {activeIndex + 1} / {images.length}
                </motion.div>
              </div>
            </div>

            {/* ENHANCED THUMBNAILS */}
            <div
              className="relative mt-8 overflow-visible"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Gradient Fade Edges */}
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white via-white/50 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/50 to-transparent z-10 pointer-events-none" />
              
              <div className="overflow-x-auto scrollbar-hide">
                <motion.div
                  className="flex gap-4 px-2 py-2"
                  animate={{ x: `-${activeIndex * 104}px` }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  {images.map((img, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      whileHover={{ y: -4, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden transition-all duration-300 ${
                        i === activeIndex
                          ? "ring-3 ring-emerald-600 shadow-[0_8px_30px_rgba(16,185,129,0.3)]"
                          : "ring-2 ring-gray-200 hover:ring-emerald-400 shadow-md hover:shadow-lg"
                      }`}
                    >
                      {/* Thumbnail Overlay */}
                      <div className={`absolute inset-0 transition-opacity duration-300 ${
                        i === activeIndex ? "bg-emerald-600/10" : "bg-black/0 hover:bg-black/5"
                      }`} />
                      
                      <img
                        src={img}
                        className="w-full h-full object-cover"
                        alt={`View ${i + 1}`}
                      />
                      
                      {/* Active Indicator */}
                      {i === activeIndex && (
                        <motion.div
                          layoutId="activeThumb"
                          className="absolute inset-0 border-2 border-emerald-600 rounded-2xl"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className="group p-2"
                >
                  <motion.div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? "w-8 bg-emerald-600"
                        : "w-1.5 bg-gray-300 group-hover:bg-emerald-400 group-hover:w-4"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold">
              {product.name}
            </h1>

            {/* PRICE + FAV */}
            <div className="flex items-center gap-4 mt-6">
              <motion.p
                whileHover={{ scale: 1.05 }}
                className="text-3xl font-bold text-emerald-600"
              >
                ₹{formatPrice(product.price)}
              </motion.p>

              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={() => toggleFavourite(product)}
                className="lg:hidden"
              >
                <Heart
                  size={22}
                  className={`${
                    favActive
                      ? "fill-emerald-600 text-emerald-600"
                      : "text-gray-400"
                  }`}
                />
              </motion.button>
            </div>

            <p className="mt-6 text-gray-600 max-w-xl">
              {product.description}
            </p>

            {/* WHY THIS PRODUCT */}
            <div className="mt-8">
              <button
                onClick={() => setShowExplain(!showExplain)}
                className="flex items-center gap-2 text-emerald-600 text-sm"
              >
                <Brain size={16} />
                Why this product?
              </button>

              <AnimatePresence>
                {showExplain && (
                  <motion.ul
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 bg-emerald-50 rounded-xl p-4 space-y-2"
                  >
                    {explainList.map((r, i) => (
                      <li key={i} className="text-sm text-gray-700">
                        • {r}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* SIZE */}
            <div className="mt-10">
              <p className="font-semibold mb-4">Select Size</p>
              <div className="flex gap-4 flex-wrap">
                {product.sizes.map((s) => (
                  <motion.button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    whileHover={{ y: -3 }}
                    className={`px-6 py-3 rounded-xl border ${
                      selectedSize === s
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "border-gray-300 hover:border-emerald-500"
                    }`}
                  >
                    {s}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* ADD TO CART */}
            <motion.button
              onClick={handleAddToCart}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="mt-12 w-full md:w-[320px] bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition"
            >
              Add to Cart
            </motion.button>
          </div>
        </div>

        {/* REVIEWS */}
        <Reviews productId={product._id} />

        {/* RELATED */}
        <div className="mt-32">
          <RelatedProducts
            category={product.category}
            subCategory={product.subCategory}
          />
        </div>
      </div>

      {/* FLY TO CART ANIMATION */}
      <AnimatePresence>
        {flyCart && (
          <motion.img
            src={images[activeIndex]}
            initial={{ 
              opacity: 1, 
              scale: 1, 
              x: flyPosition.x, 
              y: flyPosition.y,
              rotate: 0
            }}
            animate={{ 
              opacity: 0, 
              scale: 0.15, 
              x: window.innerWidth - 100, 
              y: 10,
              rotate: 360
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
            className="fixed z-[80] w-24 h-32 object-cover rounded-xl pointer-events-none shadow-2xl"
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Product;