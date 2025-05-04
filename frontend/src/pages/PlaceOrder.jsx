import React, { useContext, useState, useRef, useEffect } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import DB from '../assets/db.mp4';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const [loading, setLoading] = useState(false);
  const [showDeliveryAnimation, setShowDeliveryAnimation] = useState(false);
  const videoRef = useRef(null);
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const validateFormData = () => {
    const errors = [];
    const { firstName, lastName, email, street, city, zipcode, country, phone } = formData;

    if (!firstName) errors.push("First name is required.");
    if (!lastName) errors.push("Last name is required.");
    if (!email) {
      errors.push("Email is required.");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.push("Email address is invalid.");
    }
    if (!street) errors.push("Street address is required.");
    if (!city) errors.push("City is required.");
    if (!zipcode) {
      errors.push("Zipcode is required.");
    } else if (!/^\d{6}$/.test(zipcode)) {
      errors.push("Zipcode must be exactly 6 digits.");
    }
    if (!country) errors.push("Country is required.");
    if (!phone) {
      errors.push("Phone number is required.");
    } else if (!/^\d{10}$/.test(phone)) {
      errors.push("Phone number must be exactly 10 digits.");
    }

    return errors;
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const validationErrors = validateFormData();

    if (validationErrors.length > 0) {
      validationErrors.forEach(error => toast.error(error));
      return;
    }

    setLoading(true);
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      };

      let response;
      if (method === 'cod') {
        response = await axios.post(`${backendUrl}/api/order/place`, orderData, { headers: { token } });
      } else {
        response = await axios.post(`${backendUrl}/api/order/stripe`, orderData, { headers: { token } });
      }

      if (response.data.success) {
        setCartItems({});
        setShowDeliveryAnimation(true); // Trigger animation
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while placing the order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle video end to navigate and hide animation
  const handleVideoEnd = () => {
    setShowDeliveryAnimation(false);
    method === 'cod' ? navigate('/orders') : window.location.replace(response.data.session_url);
  };

  // Play video when animation starts
  useEffect(() => {
    if (showDeliveryAnimation && videoRef.current) {
      videoRef.current.play();
    }
  }, [showDeliveryAnimation]);

  // Animation variants for Samsung Galaxy S4-sized video
  const videoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.5 } },
  };

  return (
    <>
      <motion.form
        onSubmit={onSubmitHandler}
        className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t px-6 md:px-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="flex flex-col gap-4 w-full sm:max-w-[480px]"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
          {Object.keys(formData).map((field, index) => (
            <motion.input
              key={index}
              required
              onChange={onChangeHandler}
              name={field}
              value={formData[field]}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              whileFocus={{ scale: 1.05 }}
            />
          ))}
        </motion.div>

        <motion.div className="mt-8" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <CartTotal />
          <Title text1={'PAYMENT'} text2={'METHOD'} className="mt-12" />
          <div className="flex gap-3 flex-col lg:flex-row">
            {['stripe', 'cod'].map((payMethod, index) => (
              <motion.div
                key={index}
                onClick={() => setMethod(payMethod)}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md hover:shadow-md transition-all"
                whileHover={{ scale: 1.05 }}
              >
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === payMethod ? 'bg-green-400' : ''}`}></p>
                {payMethod === 'stripe' ? <img className="h-5 mx-4" src={assets.stripe_logo} alt="" /> : <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>}
              </motion.div>
            ))}
          </div>
          <motion.button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 mt-6 text-lg rounded-md shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'PLACE ORDER'}
          </motion.button>
        </motion.div>
      </motion.form>

      {/* Delivery Animation Overlay */}
      <AnimatePresence>
        {showDeliveryAnimation && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.video
              ref={videoRef}
              src={DB} // Using imported video file
              className="w-[360px] h-[640px] object-cover rounded-[10px] shadow-lg border-4 border-gray-800" // Samsung Galaxy S4 size
              autoPlay
              muted // Optional: remove if you want sound
              onEnded={handleVideoEnd}
              variants={videoVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PlaceOrder;