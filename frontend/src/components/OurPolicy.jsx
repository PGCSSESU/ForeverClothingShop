import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const OurPolicy = () => {
  return (
    <motion.div
      className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 bg-gray-100 rounded-xl p-6 shadow-lg'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className='bg-white rounded-lg shadow-md p-4 hover:shadow-xl hover:shadow-green-600/20 transition-all duration-300'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        whileHover={{ y: -5 }}
      >
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
        <p className='font-semibold text-gray-800 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent'>
          Easy Exchange Policy
        </p>
        <p className='text-gray-600'>We offer hassle free exchange policy</p>
      </motion.div>
      <motion.div
        className='bg-white rounded-lg shadow-md p-4 hover:shadow-xl hover:shadow-green-600/20 transition-all duration-300'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ y: -5 }}
      >
        <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
        <p className='font-semibold text-gray-800 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent'>
          7 Days Return Policy
        </p>
        <p className='text-gray-600'>We provide 7 days free return policy</p>
      </motion.div>
      <motion.div
        className='bg-white rounded-lg shadow-md p-4 hover:shadow-xl hover:shadow-green-600/20 transition-all duration-300'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ y: -5 }}
      >
        <img src={assets.support_img} className='w-12 m-auto mb-5' alt="" />
        <p className='font-semibold text-gray-800 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent'>
          Best Customer Support
        </p>
        <p className='text-gray-600'>We provide 24/7 customer support</p>
      </motion.div>
    </motion.div>
  );
};

export default OurPolicy;