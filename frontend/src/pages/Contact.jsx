// In Contact.jsx
import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';  // Add this import

const Contact = () => {
  return (
    <motion.div
      className='bg-white rounded-xl shadow-lg p-10 border border-gray-200'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <motion.img
          className='w-full md:max-w-[480px] rounded-xl shadow-md'
          src={assets.contact_img}
          alt="Contact Us"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
                
        <motion.div
          className='flex flex-col justify-center items-start gap-6 bg-gray-50 p-6 rounded-xl shadow-md border border-gray-300'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className='font-semibold text-xl text-gray-800 bg-gradient-to-r from-green-700 to-green-400 bg-clip-text text-transparent'>
            Our Store
          </p>
          <p className='text-gray-600'>7736 Police Station <br /> Sulur, Coimbatore</p>
          <p className='text-gray-600'>Tel: 7639644749 <br /> Email: rebelprem858@gmail.com</p>
          
          <p className='font-semibold text-xl text-gray-800 bg-gradient-to-r from-green-700 to-green-400 bg-clip-text text-transparent'>
            Careers at Forever
          </p>
          <p className='text-gray-600'>Learn more about our teams and job openings.</p>
          
          <Link to="/explorejobs">  {/* Replace motion.button with Link */}
            <motion.button
              className='border border-black px-8 py-4 text-sm rounded-md hover:bg-black hover:text-white transition-all duration-500'
              whileHover={{ scale: 1.05 }}
            >
              Explore Jobs
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <NewsletterBox />
    </motion.div>
  );
};

export default Contact;