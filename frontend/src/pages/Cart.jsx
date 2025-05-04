import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { motion } from 'framer-motion';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  // Update cartData whenever cartItems or products change
  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          const productData = products.find((product) => product._id === itemId);
          if (productData) {
            tempData.push({
              _id: itemId,
              size,
              quantity: cartItems[itemId][size],
            });
          }
        }
      }
    }
    setCartData(tempData);
  }, [cartItems, products]);

  // Sample quotes array
  const quotes = [
    "Shopping is my cardio. – Carrie Bradshaw",
    "The best things in life are worth waiting for, like your next delivery!",
    "Retail therapy: because sometimes you just need a little treat.",
    "A day without shopping is like a day without sunshine.",
    "Happiness is a full cart and free shipping.",
  ];

  // Randomly select a quote
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <motion.div
      className='border-t pt-14 bg-gray-100 rounded-xl p-6 shadow-lg my-10'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Title Section */}
      <div className='text-2xl mb-6 text-center'>
        <Title
          text1={'YOUR'}
          text2={'CART'}
          className='text-gray-800 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent'
        />
        <div className='w-24 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto mt-2 rounded-full'></div>
      </div>

      {/* Cart Items */}
      <div>
        {cartData.length === 0 ? (
          <motion.p
            className='text-center text-gray-600 text-lg'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Your cart is empty. Start shopping now!
          </motion.p>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);

            // Ensure productData exists before rendering
            if (!productData) return null;

            return (
              <motion.div
                key={`${item._id}-${item.size}`} // Unique key combining id and size
                className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 bg-white rounded-lg shadow-md hover:shadow-xl hover:shadow-green-600/20 transition-all duration-300 mb-4'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20 rounded-md' src={productData.image[0]} alt="" />
                  <div>
                    <p className='text-xs sm:text-lg font-medium text-gray-800'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p className='text-green-600 font-semibold'>{currency}{productData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-green-50 text-green-700 rounded'>
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>
                <input
                  onChange={(e) =>
                    e.target.value === '' || e.target.value === '0'
                      ? null
                      : updateQuantity(item._id, item.size, Number(e.target.value))
                  }
                  className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-green-400'
                  type='number'
                  min={1}
                  defaultValue={item.quantity}
                />
                <motion.img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className='w-4 mr-4 sm:w-5 cursor-pointer'
                  src={assets.bin_icon}
                  alt='Remove'
                  whileHover={{ scale: 1.2, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            );
          })
        )}
      </div>

      {/* Cart Total and Quote Section */}
      <motion.div
        className='my-20 flex flex-col sm:flex-row justify-between items-start gap-8'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {/* Quote on the Left */}
        <motion.div
          className='w-full sm:w-1/2 text-center sm:text-left'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className='text-lg italic text-gray-600 mb-2'>"{randomQuote}"</p>
          <p className='text-sm text-gray-500'>Enjoy your shopping!</p>
        </motion.div>

        {/* Cart Total and Checkout on the Right */}
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <motion.button
              onClick={() => navigate('/place-order')}
              className='bg-green-600 text-white text-sm my-8 px-8 py-3 rounded-md shadow-lg hover:bg-green-700 transition-all duration-300'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              PROCEED TO CHECKOUT
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Cart;