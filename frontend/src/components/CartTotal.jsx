import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import { motion, useSpring, useTransform } from 'framer-motion';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const [isVisible, setIsVisible] = useState(false);

  // Calculate total amount
  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  // Spring animation for the running total
  const springTotal = useSpring(0, { stiffness: 100, damping: 20 });
  const displayTotal = useTransform(springTotal, (value) => Math.round(value));

  // Handle scroll and visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const triggerPoint = 100; // Adjust this value to determine when the animation starts
      if (scrollPosition > triggerPoint && !isVisible) {
        setIsVisible(true);
        springTotal.set(total); // Start the running total animation
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [springTotal, total, isVisible]);

  return (
    <motion.div
      className="w-full bg-white p-4 rounded-lg shadow-md border"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ position: 'sticky', top: '20px', zIndex: 10 }} // Sticky positioning
    >
      <div className="text-2xl">
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <motion.div
          className="flex justify-between"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <p>Subtotal</p>
          <p>
            {currency} {subtotal}.00
          </p>
        </motion.div>
        <hr />
        <motion.div
          className="flex justify-between"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p>Shipping Fee</p>
          <p>
            {currency} {delivery_fee}.00
          </p>
        </motion.div>
        <hr />
        <motion.div
          className="flex justify-between"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <b>Total</b>
          <motion.b>
            {currency}{' '}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {displayTotal}
            </motion.span>
            .00
          </motion.b>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CartTotal;