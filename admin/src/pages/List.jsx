import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchList = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
      await new Promise((resolve) => setTimeout(resolve, 500)); // Minimum delay
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, when: 'beforeChildren' } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
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
    <div className="relative min-h-screen">
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
                Loading Products...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        className="pt-10 bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.9)] my-8 mx-4 md:mx-0 overflow-hidden relative"
        initial="hidden"
        animate={!isLoading ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        {/* Glowing Background Accent */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 opacity-50 pointer-events-none" />

        {/* Title */}
        <div className="text-center mb-10 relative z-10">
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            ALL PRODUCTS LIST
          </motion.h2>
          <motion.div
            className="w-40 h-1 bg-gradient-to-r from-green-400 to-purple-400 mx-auto mt-4 rounded-full shadow-[0_0_10px_rgba(0,255,100,0.8)]"
            initial={{ width: 0 }}
            animate={{ width: 160 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          <AnimatePresence>
            {!isLoading && list.length === 0 ? (
              <motion.p
                className="col-span-full text-center text-gray-300 text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                No products available.
              </motion.p>
            ) : (
              !isLoading &&
              list.map((item, index) => (
                <motion.div
                  key={item._id}
                  className="relative w-full h-64 bg-gray-800/40 backdrop-blur-lg rounded-2xl shadow-[0_5px_20px_rgba(0,0,0,0.7)] hover:shadow-[0_0_25px_rgba(0,255,100,0.5)] transition-all duration-500 border border-gray-700/50 overflow-hidden"
                  variants={cardVariants}
                  whileHover={{ scale: 1.05, rotate: 1, zIndex: 20 }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  {/* Full-Container Image */}
                  <motion.img
                    className="w-full h-full object-cover rounded-2xl"
                    src={item.image[0]}
                    alt={item.name}
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

                  {/* Hover Overlay with Text */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-between p-4"
                    variants={overlayVariants}
                    initial="hidden"
                    animate={hoveredIndex === index ? 'visible' : 'hidden'}
                  >
                    {/* Top Right Remove Button */}
                    <motion.button
                      onClick={() => removeProduct(item._id)}
                      className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-red-500/30 rounded-full text-red-300 hover:bg-red-500/60 hover:text-red-200 transition-all duration-300"
                      whileHover={{ scale: 1.2, rotate: 180 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      ✕
                    </motion.button>

                    {/* Text Content */}
                    <div className="mt-auto text-center">
                      <p className="text-lg font-semibold text-white truncate">{item.name}</p>
                      <p className="text-sm text-green-400">{item.category}</p>
                      <p className="text-lg font-bold text-green-300">
                        {currency}
                        {item.price.toLocaleString()}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default List;