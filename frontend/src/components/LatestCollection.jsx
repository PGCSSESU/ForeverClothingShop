import React, { useContext, useEffect, useState, useRef } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { WandSparklesIcon } from "lucide-react";


const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.25,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 70, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-120px",
  });

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);
console.log(latestProducts)

  return (
    <section
      ref={sectionRef}
      className="relative my-28 px-4 md:px-10 overflow-hidden"
    >
      {/* Header */}
      <motion.div
        className="text-center max-w-4xl mx-auto mb-20"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <Title
          text1="LATEST"
          text2="DROP"
          className="text-5xl md:text-6xl font-black 
                     bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 
                     bg-clip-text text-transparent"
        />
        <p className="mt-6 text-gray-500">
          A curated release of our newest designs — crafted with intention.
        </p>
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
      >
        {latestProducts.map((item) => (
         
          <motion.div
            key={item._id}
            variants={card}
            whileHover={{ y: -16 }}
            className="group"
          >
            <Link
              to={`/product/${item._id}`}
              onClick={() => window.scrollTo(0, 0)}
              className="block"
            >
              {/* Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl bg-black aspect-[3/4]">

                {/* Image */}
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <ProductItem
                    image={item.image}
                    name={item.name}
                  />
                </motion.div>

                {/* NEW badge */}
              <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">

  {/* New / Featured */}
                  <div className="w-9 h-9 rounded-full bg-black/70 backdrop-blur
                                    flex items-center justify-center
                                    transition-transform duration-300
                                    group-hover:scale-110">
                      <WandSparklesIcon className="w-4 h-4 text-white" />
                    </div>

                  </div>

                {/* Hover Name Overlay */}
                <div
                  className="absolute inset-x-0 bottom-0 p-4
                             bg-gradient-to-t from-black/85 via-black/40 to-transparent
                             opacity-0 translate-y-6
                             group-hover:opacity-100 group-hover:translate-y-0
                             transition-all duration-500"
                >
                  <p className="text-white text-sm font-semibold leading-snug">
                    {item.name}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default LatestCollection;
