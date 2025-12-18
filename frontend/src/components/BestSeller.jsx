import React, { useContext, useEffect, useState, useRef } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import { motion, AnimatePresence, useAnimationFrame } from "framer-motion";

const CARD_WIDTH = 280;
const GAP = 32;
const SPEED = 0.35;

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(null);

  const x = useRef(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (products?.length) {
      const best = products.filter((p) => p.bestseller).slice(0, 6);
      setItems(best);
      setTimeout(() => setLoading(false), 600);
    }
  }, [products]);

  /* ---------------- SMOOTH INFINITE MARQUEE ---------------- */
  useAnimationFrame(() => {
    if (!containerRef.current || hovered !== null) return;
    x.current -= SPEED;
    const totalWidth = (CARD_WIDTH + GAP) * items.length;
    if (Math.abs(x.current) >= totalWidth) x.current = 0;
    containerRef.current.style.transform = `translateX(${x.current}px)`;
  });

  /* ---------------- LOADER ---------------- */
  const Loader = () => (
    <motion.div
      className="fixed inset-0 z-50 bg-white flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-14 h-14 rounded-full border-4 border-emerald-200 border-t-emerald-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );

  return (
    <section className="relative my-28">
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white rounded-[3rem]" />

      {/* CONTENT */}
      <div className="relative z-10 px-6 md:px-12 py-20 overflow-hidden max-w-7xl mx-auto">
        {/* TITLE */}
        <div className="text-center mb-20">
          <Title
            text1="BEST"
            text2="SELLERS"
            className="text-4xl md:text-5xl font-extrabold
                       bg-gradient-to-r from-emerald-600 to-emerald-800
                       bg-clip-text text-transparent"
          />
          <p className="mt-5 text-gray-500 max-w-xl mx-auto text-lg">
            Timeless pieces our customers love — refined, reliable, and
            thoughtfully crafted.
          </p>
        </div>

        {/* MARQUEE */}
        <div
          className="relative overflow-hidden"
          onMouseLeave={() => setHovered(null)}
        >
          <div
            ref={containerRef}
            className="flex gap-8 will-change-transform"
          >
            {[...items, ...items].map((item, index) => (
              <motion.div
                key={`${item._id}-${index}`}
                className="group relative w-[280px] h-[380px] flex-shrink-0
                           rounded-[2rem] bg-white
                           border border-gray-200
                           shadow-[0_25px_50px_rgba(0,0,0,0.08)]
                           overflow-hidden"
                onMouseEnter={() => setHovered(index)}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
              >
                {/* IMAGE */}
                <motion.img
                  src={item.image?.[0]}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6 }}
                />

                {/* SOFT OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t
                                from-white via-white/70 to-transparent opacity-0
                                group-hover:opacity-100 transition" />

                {/* INFO */}
                <motion.div
                  className="absolute bottom-0 p-6 w-full"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{
                    opacity: hovered === index ? 1 : 0,
                    y: hovered === index ? 0 : 40,
                  }}
                  transition={{ duration: 0.35 }}
                >
                  <h3 className="text-gray-900 font-semibold text-lg truncate">
                    {item.name}
                  </h3>
                  <p className="text-sm text-emerald-600 mt-1">
                    {item.category}
                  </p>
                  <p className="mt-3 text-xl font-bold text-gray-900">
                    ₹{item.price}
                  </p>
                </motion.div>

                {/* HOVER BORDER */}
                {hovered === index && (
                  <motion.div
                    layoutId="hover-ring"
                    className="absolute inset-0 rounded-[2rem]
                               ring-2 ring-emerald-500/40 pointer-events-none"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
