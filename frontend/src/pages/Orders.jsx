import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { motion } from 'framer-motion';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    if (!token) return;
    const loadOrderData = async () => {
      try {
        const { data } = await axios.post(`${backendUrl}/api/order/userorders`, {}, { headers: { token } });
        if (data.success) {
          setOrderData(
            data.orders.flatMap(order =>
              order.items.map(item => ({ ...item, ...order }))
            ).reverse()
          );
        }
      } catch (error) {
        console.error("Error loading order data:", error);
      }
    };
    loadOrderData();
  }, [token, backendUrl]);

  return (
    <div className='border-t pt-12 bg-black text-white rounded-xl p-6 shadow-lg my-8'>
      <Title text1='MY' text2='ORDERS' className='text-white bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent text-center' />
      <div className='w-24 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto mt-2 rounded-full'></div>
      {orderData.length === 0 ? (
        <motion.p className='text-center text-gray-400 text-lg' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          You have no orders yet.
        </motion.p>
      ) : (
        orderData.map((item, index) => (
          <motion.div key={index} className='py-4 border-t text-gray-700 flex flex-col items-center bg-white rounded-lg shadow-md my-4 hover:shadow-2xl hover:shadow-green-500/70 text-center' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
            <img className='w-20 sm:w-28 rounded-md object-cover' src={item.image[0]} alt={item.name} />
            <p className='text-sm sm:text-lg font-medium mt-2'>{item.name}</p>
            <p className='text-gray-700'>{currency}{item.price} | Qty: {item.quantity} | Size: {item.size}</p>
            <p className='text-gray-500 text-sm mt-1'>Date: {new Date(item.date).toDateString()}</p>
            <p className='text-gray-500 text-sm'>Payment: {item.paymentMethod}</p>
            <div className='mt-2 flex items-center gap-1'>
              <span className='w-3 h-3 rounded-full bg-green-500'></span>
              <p className='text-sm'>{item.status}</p>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
};

export default Orders;