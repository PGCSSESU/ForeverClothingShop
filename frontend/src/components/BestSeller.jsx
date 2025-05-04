import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import { motion, AnimatePresence } from 'framer-motion';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [hoveredIndex, setHoveredIndex] = useState(null); // Hover state

  useEffect(() => {
    if (products && products.length > 0) {
      const bestProduct = products.filter((item) => item.bestseller);
      setBestSeller(bestProduct.slice(0, 5));
      setTimeout(() => setIsLoading(false), 500); // Minimum delay for loader
    }
  }, [products]);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, when: 'beforeChildren' } },
  };

  const trainVariants = {
    animate: {
      x: ['0%', '-100%'], // Moves left infinitely
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 20, // Adjust speed (lower = faster)
          ease: 'linear',
        },
      },
    },
    paused: { x: 0 }, // Pauses on hover if needed
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const loadingVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  const ringVariants = {
    animate: {
      rotate: 360,
      borderColor: ['rgba(0,255,100,0.8)', 'rgba(0,100,255,0.8)', 'rgba(0,255,100,0.8)'],
      transition: { duration: 2, repeat: Infinity, ease: 'linear' },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  };

  return (
    <div className="relative">
      {/* Interactive Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 bg-gradient-to-br from-gray-950/90 to-black/90 flex items-center justify-center z-50"
            variants={loadingVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="relative flex flex-col items-center">
              <motion.div
                className="w-20 h-20 bg-green-500/20 rounded-full shadow-[0_0_30px_rgba(0,255,100,0.5)]"
                variants={pulseVariants}
                animate="animate"
              />
              <motion.div
                className="absolute w-24 h-24 border-4 border-transparent rounded-full"
                variants={ringVariants}
                animate="animate"
              />
              <motion.p
                className="mt-6 text-green-400 text-xl font-semibold"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                Loading Best Sellers...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        className="my-16 bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.9)] relative overflow-hidden"
        initial="hidden"
        animate={!isLoading ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        {/* Glowing Background Accent */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 opacity-50 pointer-events-none" />

        {/* Title Section */}
        <div className="text-center py-8 relative z-10">
          <Title
            text1={"BEST"}
            text2={"SELLERS"}
            className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
          />
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-green-400 to-purple-400 mx-auto mt-2 rounded-full shadow-[0_0_10px_rgba(0,255,100,0.8)]"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
          <motion.p
            className="w-3/4 mx-auto mt-4 text-sm md:text-base text-gray-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            "These top-selling items are powered by mystical forces of demand and excellence!"
          </motion.p>
        </div>

        {/* Train-like Product Container */}
        <div className="relative overflow-hidden py-10">
          <motion.div
            className="flex gap-6"
            variants={trainVariants}
            animate="animate"
            style={{ width: `${bestSeller.length * 300}px` }} // Adjust width based on card count
            whileHover={{ animationPlayState: 'paused' }} // Optional: Pause on hover
          >
            {bestSeller.map((item, index) => (
              <motion.div
                key={item._id}
                className="relative w-64 h-72 bg-gray-800/40 backdrop-blur-lg rounded-2xl shadow-[0_5px_20px_rgba(0,0,0,0.7)] hover:shadow-[0_0_25px_rgba(0,255,100,0.5)] transition-all duration-500 border border-gray-700/50 overflow-hidden flex-shrink-0"
                variants={cardVariants}
                whileHover={{ scale: 1.05, rotate: 1, zIndex: 20 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Full-Container Image */}
                <motion.img
                  className="w-full h-full object-cover rounded-2xl"
                  src={item.image && item.image[0] ? item.image[0] : 'https://via.placeholder.com/300'}
                  alt={item.name || 'Best Seller'}
                  initial={{ scale: 1.1 }}
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Glowing Border Effect */}
                <motion.div
                  className="absolute inset-0 border-2 border-transparent rounded-2xl pointer-events-none"
                  animate={{
                    borderColor:
                      hoveredIndex === index
                        ? ['rgba(0,255,100,0.8)', 'rgba(0,100,255,0.8)', 'rgba(0,255,100,0.8)']
                        : 'transparent',
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Hover Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 flex flex-col justify-end"
                  variants={overlayVariants}
                  initial="hidden"
                  animate={hoveredIndex === index ? 'visible' : 'hidden'}
                >
                  <p className="text-lg font-semibold text-white truncate">{item.name || 'Unnamed Product'}</p>
                  <p className="text-sm text-green-400">{item.category || 'Uncategorized'}</p>
                  <p className="text-lg font-bold text-green-300">
                    ${item.price ? item.price.toLocaleString() : 'N/A'}
                  </p>
                </motion.div>
              </motion.div>
            ))}
            {/* Duplicate for seamless looping */}
            {bestSeller.map((item, index) => (
              <motion.div
                key={`${item._id}-duplicate`}
                className="relative w-64 h-72 bg-gray-800/40 backdrop-blur-lg rounded-2xl shadow-[0_5px_20px_rgba(0,0,0,0.7)] hover:shadow-[0_0_25px_rgba(0,255,100,0.5)] transition-all duration-500 border border-gray-700/50 overflow-hidden flex-shrink-0"
                variants={cardVariants}
                whileHover={{ scale: 1.05, rotate: 1, zIndex: 20 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.img
                  className="w-full h-full object-cover rounded-2xl"
                  src={item.image && item.image[0] ? item.image[0] : 'https://via.placeholder.com/300'}
                  alt={item.name || 'Best Seller'}
                  initial={{ scale: 1.1 }}
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  className="absolute inset-0 border-2 border-transparent rounded-2xl pointer-events-none"
                  animate={{
                    borderColor:
                      hoveredIndex === index
                        ? ['rgba(0,255,100,0.8)', 'rgba(0,100,255,0.8)', 'rgba(0,255,100,0.8)']
                        : 'transparent',
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 flex flex-col justify-end"
                  variants={overlayVariants}
                  initial="hidden"
                  animate={hoveredIndex === index ? 'visible' : 'hidden'}
                >
                  <p className="text-lg font-semibold text-white truncate">{item.name || 'Unnamed Product'}</p>
                  <p className="text-sm text-green-400">{item.category || 'Uncategorized'}</p>
                  <p className="text-lg font-bold text-green-300">
                    ${item.price ? item.price.toLocaleString() : 'N/A'}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default BestSeller;