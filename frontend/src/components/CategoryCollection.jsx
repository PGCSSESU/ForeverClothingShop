import React, { useContext, useMemo, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CategoryCollection = ({ title, category }) => {
  const { products } = useContext(ShopContext);
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);

  // 🔥 Top 5 expensive products per category
  const topProducts = useMemo(() => {
    return products
      .filter(
        (p) => p.category?.toLowerCase() === category.toLowerCase()
      )
      .sort((a, b) => b.price - a.price)
      .slice(0, 5);
  }, [products, category]);

  if (!topProducts.length) return null;

  const [featured, ...rest] = topProducts;

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 my-32">
      {/* HEADER */}
      <div className="text-center mb-20">
        <span className="inline-block px-4 py-1 text-xs font-bold tracking-widest uppercase bg-gray-100 rounded-full">
          TOP {title}
        </span>
        <h2 className="mt-4 text-4xl md:text-5xl font-black">
          Premium High-Value Picks
        </h2>
        <p className="mt-3 text-gray-500">
          Carefully curated best from our {title.toLowerCase()} collection
        </p>
      </div>

      {/* FEATURED PRODUCT */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <div className="grid md:grid-cols-2 gap-10 bg-white rounded-3xl shadow-xl p-6 md:p-10">
          {/* IMAGE */}
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
            <img
              src={featured.image[0]}
              alt={featured.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* CONTENT */}
          <div className="flex flex-col justify-center">
            <span className="text-sm font-bold text-green-600 uppercase tracking-widest">
              Featured
            </span>

            <h3 className="mt-3 text-3xl md:text-4xl font-bold">
              {featured.name}
            </h3>

            <p className="mt-4 text-4xl font-black text-green-600">
              ₹{featured.price}
            </p>

            <div className="flex gap-4 mt-8">
              {/* ADD TO CART → PRODUCT PAGE */}
              <button
                onClick={() => {
                  navigate(`/product/${featured._id}`);
                  window.scrollTo(0, 0);
                }}
                className="flex-1  bg-green-600 transition-all duration-300 hover:shadow-xl hover:shadow-green-600/20 text-white py-4 rounded-xl font-bold "
              >
               Check For Details
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* REST PRODUCTS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {rest.map((item, index) => (
          <motion.div
            key={item._id}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 250 }}
            onMouseEnter={() => setHoveredId(item._id)}
            onMouseLeave={() => setHoveredId(null)}
            className="relative group"
          >
            <div className="rounded-2xl overflow-hidden bg-white shadow-lg">
              {/* IMAGE */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* QUICK VIEW */}
                <button
                  onClick={() => {
                    navigate(`/product/${item._id}`);
                    window.scrollTo(0, 0);
                  }}
                  className="absolute bottom-3 left-3 right-3 py-2 text-black bg-white/90 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transition"
                >
                  Quick View
                </button>
              </div>

              {/* INFO */}
              <div className="p-4">
                <h4 className="font-semibold truncate">{item.name}</h4>
                <p className="mt-2 text-xl font-bold text-black">
                  ₹{item.price}
                </p>
              </div>
            </div>

            {/* GLOW */}
            {hoveredId === item._id && (
              <div className="absolute inset-0 rounded-2xl pointer-events-none ring-2 ring-green-500/40" />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategoryCollection;
