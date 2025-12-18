import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import RelatedProducts from "../components/RelatedProducts";

/* ======================================================
   MOTION SYSTEM — CALM & LUXURY
====================================================== */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const stagger = {
  show: { transition: { staggerChildren: 0.08 } },
};

/* ======================================================
   THUMBNAIL CONFIG
====================================================== */
const THUMB_SIZE = 88;
const THUMB_GAP = 16;
const STEP = THUMB_SIZE + THUMB_GAP;
const AUTO_DELAY = 2400;

/* ======================================================
   PRODUCT PAGE
====================================================== */
const Product = () => {
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);

  /* ---------------- CORE STATE ---------------- */
  const [product, setProduct] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");

  /* ---------------- AUTO SLIDE STATE ---------------- */
  const [paused, setPaused] = useState(false);
  const autoTimerRef = useRef(null);

  /* ---------------- LENS ZOOM ---------------- */
  const [lens, setLens] = useState({
    x: 0,
    y: 0,
    show: false,
  });

  /* ======================================================
     FETCH PRODUCT
  ====================================================== */
  useEffect(() => {
    const found = products.find(
      (p) => p._id === productId
    );
    if (found) {
      setProduct(found);
      setActiveIndex(0);
      setSelectedSize("");
    }
  }, [productId, products]);

  /* ======================================================
     AUTO SLIDING THUMBNAILS
     (SINGLE SOURCE OF TRUTH)
  ====================================================== */
  useEffect(() => {
    if (!product || paused) return;

    autoTimerRef.current = setInterval(() => {
      setActiveIndex((prev) =>
        (prev + 1) % product.image.length
      );
    }, AUTO_DELAY);

    return () =>
      clearInterval(autoTimerRef.current);
  }, [product, paused]);

  /* ======================================================
     ADD TO CART
  ====================================================== */
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    addToCart(product._id, selectedSize);
    toast.success("Added to cart");
  };

  /* ======================================================
     LENS ZOOM (SUBTLE)
  ====================================================== */
  const handleLensMove = (e) => {
    const rect =
      e.currentTarget.getBoundingClientRect();
    const x =
      ((e.clientX - rect.left) / rect.width) *
      100;
    const y =
      ((e.clientY - rect.top) / rect.height) *
      100;
    setLens({ x, y, show: true });
  };

  const handleLensLeave = () =>
    setLens((p) => ({ ...p, show: false }));

  if (!product) return null;

  const images = product.image;

  /* ======================================================
     RENDER
  ====================================================== */
  return (
    <section className="relative bg-white overflow-hidden">
      {/* ==================================================
         AMBIENT BACKGROUND
      ================================================== */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-emerald-200/20 blur-[220px]" />
      <div className="absolute bottom-0 -right-40 w-[600px] h-[600px] bg-emerald-300/20 blur-[260px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* ==================================================
             IMAGE + THUMB STRIP (STICKY)
          ================================================== */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="sticky top-28 h-fit"
          >
            {/* ---------------- MAIN IMAGE ---------------- */}
            <div
              className="relative rounded-[2rem]
                         overflow-hidden
                         shadow-[0_30px_90px_rgba(0,0,0,0.15)]"
              onMouseMove={handleLensMove}
              onMouseLeave={handleLensLeave}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={images[activeIndex]}
                  src={images[activeIndex]}
                  alt={product.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-[520px] object-cover"
                />
              </AnimatePresence>

              {/* ---------------- LENS ZOOM ---------------- */}
              {lens.show && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `url(${images[activeIndex]})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "180%",
                    backgroundPosition: `${lens.x}% ${lens.y}%`,
                  }}
                />
              )}
            </div>

            {/* ==================================================
               AUTO SLIDING 3D THUMBNAILS
            ================================================== */}
            <div
              className="relative mt-10 overflow-hidden"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              style={{ perspective: "1200px" }}
            >
              <motion.div
                className="flex gap-4"
                animate={{
                  x: `-${activeIndex * STEP}px`,
                }}
                transition={{
                  duration: 0.9,
                  ease: "easeInOut",
                }}
              >
                {images.map((img, i) => {
                  const isActive = i === activeIndex;

                  return (
                    <motion.button
                      key={i}
                      onClick={() =>
                        setActiveIndex(i)
                      }
                      className="relative flex-shrink-0
                                 w-[88px] h-[88px]
                                 rounded-xl overflow-hidden
                                 border border-gray-200
                                 bg-white"
                      animate={{
                        rotateY: isActive ? 0 : -18,
                        scale: isActive ? 1.12 : 0.9,
                        z: isActive ? 60 : 0,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: "easeOut",
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                      />

                      {isActive && (
                        <div className="absolute inset-0 ring-2 ring-emerald-500 rounded-xl" />
                      )}
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>

          {/* ==================================================
             PRODUCT DETAILS
          ================================================== */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            {/* TITLE */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-semibold"
            >
              {product.name}
            </motion.h1>

            {/* PRICE */}
            <motion.p
              variants={fadeUp}
              className="mt-4 text-3xl font-bold text-emerald-600"
            >
              ₹{product.price}
            </motion.p>

            {/* DESCRIPTION */}
            <motion.p
              variants={fadeUp}
              className="mt-6 text-gray-600 leading-relaxed max-w-xl"
            >
              {product.description}
            </motion.p>

            {/* SIZE SELECT */}
            <motion.div
              variants={fadeUp}
              className="mt-10"
            >
              <p className="font-semibold mb-4">
                Select Size
              </p>
              <div className="flex gap-4 flex-wrap">
                {product.sizes.map((s) => (
                  <motion.button
                    key={s}
                    onClick={() =>
                      setSelectedSize(s)
                    }
                    whileHover={{ y: -4 }}
                    className={`px-6 py-3 rounded-xl border transition ${
                      selectedSize === s
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "border-gray-300 hover:border-emerald-500"
                    }`}
                  >
                    {s}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* ADD TO CART */}
            <motion.button
              variants={fadeUp}
              onClick={handleAddToCart}
              whileHover={{ y: -3 }}
              className="mt-12 w-full md:w-[320px]
                         bg-emerald-600 hover:bg-emerald-700
                         text-white py-4 rounded-full
                         text-lg font-semibold
                         shadow-[0_20px_60px_rgba(16,185,129,0.45)]"
            >
              Add to Cart
            </motion.button>

            {/* TRUST POINTS */}
            <motion.ul
              variants={fadeUp}
              className="mt-10 space-y-3 text-sm text-gray-600"
            >
              <li>✔ 100% Original product</li>
              <li>✔ 7-day easy returns</li>
              <li>✔ Cash on delivery available</li>
            </motion.ul>
          </motion.div>
        </div>

        {/* ==================================================
           RELATED PRODUCTS
        ================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-32"
        >
          <RelatedProducts
            category={product.category}
            subCategory={product.subCategory}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Product;
