import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { motion } from 'framer-motion';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <motion.div
      className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 bg-gray-100 rounded-xl p-6 shadow-lg border-t'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Filter Options */}
      <motion.div
        className='min-w-60'
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p
          onClick={() => setShowFilter(!showFilter)}
          className='my-2 text-xl flex items-center cursor-pointer gap-2 text-gray-800'
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''} transition-transform duration-300`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>
        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 bg-white rounded-lg shadow-md ${
            showFilter ? '' : 'hidden'
          } sm:block`}
        >
          <p className='mb-3 text-sm font-medium text-gray-700'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-600'>
            <label className='flex gap-2 items-center'>
              <input
                className='w-3 accent-green-600'
                type='checkbox'
                value={'Men'}
                onChange={toggleCategory}
              />{' '}
              Men
            </label>
            <label className='flex gap-2 items-center'>
              <input
                className='w-3 accent-green-600'
                type='checkbox'
                value={'Women'}
                onChange={toggleCategory}
              />{' '}
              Women
            </label>
            <label className='flex gap-2 items-center'>
              <input
                className='w-3 accent-green-600'
                type='checkbox'
                value={'Kids'}
                onChange={toggleCategory}
              />{' '}
              Kids
            </label>
          </div>
        </div>
        {/* SubCategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 bg-white rounded-lg shadow-md ${
            showFilter ? '' : 'hidden'
          } sm:block`}
        >
          <p className='mb-3 text-sm font-medium text-gray-700'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-600'>
            <label className='flex gap-2 items-center'>
              <input
                className='w-3 accent-green-600'
                type='checkbox'
                value={'Topwear'}
                onChange={toggleSubCategory}
              />{' '}
              Topwear
            </label>
            <label className='flex gap-2 items-center'>
              <input
                className='w-3 accent-green-600'
                type='checkbox'
                value={'Bottomwear'}
                onChange={toggleSubCategory}
              />{' '}
              Bottomwear
            </label>
            <label className='flex gap-2 items-center'>
              <input
                className='w-3 accent-green-600'
                type='checkbox'
                value={'Winterwear'}
                onChange={toggleSubCategory}
              />{' '}
              Winterwear
            </label>
          </div>
        </div>
      </motion.div>

      {/* Right Side */}
      <motion.div
        className='flex-1'
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className='flex justify-between text-base sm:text-2xl mb-6'>
          <Title
            text1={'ALL'}
            text2={'COLLECTIONS'}
            className='text-gray-800 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent'
          />
          <div className='w-24 h-1 bg-gradient-to-r from-green-600 to-green-400 mt-2 rounded-full sm:hidden'></div>
          {/* Product Sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className='border-2 border-gray-300 text-sm px-2 py-1 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400'
          >
            <option value='relavent'>Sort by: Relevant</option>
            <option value='low-high'>Sort by: Low to High</option>
            <option value='high-low'>Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <ProductItem
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
                className='bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:shadow-green-600/20 transition-all duration-300'
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Collection;