import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { motion } from 'framer-motion';

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products]);

  return (
    <motion.div 
      className='my-24 bg-gray-100 rounded-xl p-6 shadow-lg'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Title Section */}
      <div className='text-center text-3xl py-4'>
        <Title 
          text1={'RELATED'} 
          text2={'PRODUCTS'} 
          className='text-gray-800 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent'
        />
        <div className='w-24 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto mt-2 rounded-full'></div>
      </div>

      {/* Products Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-8'>
        {related.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <ProductItem 
              id={item._id} 
              name={item.name} 
              price={item.price} 
              image={item.image}
              className='bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:shadow-green-600/20 transition-all duration-300'
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RelatedProducts;