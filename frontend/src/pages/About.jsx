import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div
      className='bg-gray-100 rounded-xl p-6 shadow-lg border-t'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className='text-2xl text-center pt-8'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <motion.img
          className='w-full md:max-w-[450px] rounded-lg shadow-md'
          src={assets.about_img}
          alt="About Us"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        />
        <motion.div
          className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p>
            Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.
          </p>
          <p>
            Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>
            Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.
          </p>
        </motion.div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        {[
          { title: 'Quality Assurance', text: 'We meticulously select and vet each product to ensure it meets our stringent quality standards.' },
          { title: 'Convenience', text: 'With our user-friendly interface and hassle-free ordering process, shopping has never been easier.' },
          { title: 'Exceptional Customer Service', text: 'Our team of dedicated professionals is here to assist you every step of the way, ensuring your satisfaction is our top priority.' }
        ].map((item, index) => (
          <motion.div
            key={index}
            className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 bg-white rounded-lg shadow-md'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <b>{item.title}</b>
            <p className='text-gray-600'>{item.text}</p>
          </motion.div>
        ))}
      </div>

      <NewsletterBox />
    </motion.div>
  );
};

export default About;
