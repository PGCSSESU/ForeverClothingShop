import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { motion } from 'framer-motion';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <motion.div
      className='my-10 bg-gray-100 rounded-xl p-6 shadow-lg'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className='text-center py-8 text-3xl'>
        <Title
          text1={'LATEST'}
          text2={'COLLECTIONS'}
          className='text-gray-800 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent'
        />
        <div className='w-24 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto mt-2 rounded-full'></div>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Forever eCommerce! Our latest collection features trendy, stylish, and comfortable clothing designed for every occasion.
        </p>
      </div>

      {/* Rendering Products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {latestProducts.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <ProductItem
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
              className='bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:shadow-green-600/20 transition-all duration-300'
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LatestCollection;