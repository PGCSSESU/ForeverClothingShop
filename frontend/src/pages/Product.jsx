import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);

  useEffect(() => {
    const selectedProduct = products.find((item) => item._id === productId);
    if (selectedProduct) {
      setProductData(selectedProduct);
      setImage(selectedProduct.image[0]);
    }
  }, [productId, products]);

  const handleAddToCart = () => {
    if (!size) {
      toast.error("Please select a size!", { position: "top-right" });
      return;
    }
    addToCart(productData._id, size);
    toast.success(`${productData.name} added to cart!`, { position: "top-right" });
  };

  // Handle mouse movement for zoom effect
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Calculate background position for zoom container
    const zoomLevel = 2.5;
    const bgX = -(x * zoomLevel - 200); // 200 is half of zoom container width
    const bgY = -(y * zoomLevel - 200); // 200 is half of zoom container height

    setZoomPosition({ bgX, bgY });
    setIsZooming(true);
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
  };

  if (!productData) return null;

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="border-t-2 pt-10 px-6 md:px-20 bg-gradient-to-br from-gray-50 to-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image Section */}
        <motion.div className="flex flex-col gap-4" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={image}
              className="w-[80%] max-w-[500px] mx-auto rounded-lg shadow-md object-cover cursor-zoom-in"
              src={image}
              alt={productData.name}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              whileHover={{ boxShadow: "0 0 15px rgba(0,0,0,0.3)" }}
            />
          </AnimatePresence>

          {/* Thumbnail Images */}
          <div className="flex gap-3 justify-center mt-4">
            {productData.image.map((img, index) => (
              <motion.img
                key={index}
                onClick={() => setImage(img)}
                src={img}
                className={`w-12 h-12 border rounded-lg cursor-pointer transition-all duration-300 ${
                  image === img
                    ? 'border-green-500 shadow-[0_0_10px_rgba(0,0,0,0.5)]'
                    : 'hover:shadow-[0_0_8px_rgba(0,0,0,0.3)]'
                }`}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                alt=""
              />
            ))}
          </div>
        </motion.div>

        {/* Details Section with Zoom Container */}
        <div className="relative">
          {/* Zoom Container (Over Text) */}
          <AnimatePresence>
            {isZooming && (
              <motion.div
                className="absolute top-0 left-0 w-[400px] h-[400px] bg-white rounded-lg shadow-xl overflow-hidden z-10 pointer-events-none"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: `${1000}px ${1000}px`, // 2.5x the container size
                  backgroundPosition: `${zoomPosition.bgX}px ${zoomPosition.bgY}px`,
                  backgroundRepeat: 'no-repeat', // Prevent repetition
                }}
              />
            )}
          </AnimatePresence>

          {/* Product Details */}
          <motion.div
            className="relative z-0"
            variants={textVariants}
            animate={isZooming ? "hidden" : "visible"}
          >
            <motion.h1
              className="text-3xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              {productData.name}
            </motion.h1>
            <motion.p
              className="text-lg text-gray-500 mt-2"
              whileHover={{ color: "#4B5563" }}
              transition={{ duration: 0.2 }}
            >
              {productData.description}
            </motion.p>
            <motion.p
              className="text-3xl font-bold mt-4 text-green-600"
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
            >
              ₹{productData.price}
            </motion.p>

            {/* Size Selection */}
            <div className="mt-6">
              <p className="font-semibold text-gray-800">Select Size</p>
              <div className="flex gap-3 mt-2">
                {productData.sizes.map((item, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSize(item)}
                    className={`border px-5 py-2 rounded-md shadow-md ${
                      size === item ? 'bg-green-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.1, boxShadow: "0 0 10px rgba(0,0,0,0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              onClick={handleAddToCart}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 mt-6 text-lg font-semibold rounded-md shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              ADD TO CART
            </motion.button>

            {/* Additional Info */}
            <motion.div className="mt-8 text-sm text-gray-600 flex flex-col gap-2">
              {['✅ 100% Original product.', '✅ Cash on delivery is available.', '✅ Easy return & exchange within 7 days.'].map(
                (text, index) => (
                  <motion.p
                    key={index}
                    whileHover={{ x: 5, color: "#10B981" }}
                    transition={{ duration: 0.2 }}
                  >
                    {text}
                  </motion.p>
                )
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Related Products Section */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-2xl font-semibold bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent text-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          Similar Products
        </motion.h2>
        <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
      </motion.div>
    </motion.div>
  );
};

export default Product;