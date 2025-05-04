import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { backendUrl, currency } from '../App';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState(null); // Track status update

  const fetchAllOrders = async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
      console.log('Orders API Response:', response.data);

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error(error.message || 'Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    console.log(`Updating order ${orderId} to status: ${newStatus}`);

    setUpdatingOrderId(orderId);

    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: newStatus },
        { headers: { token } }
      );

      console.log('Status Update Response:', response.data);

      if (response.data.success) {
        toast.success('Order status updated!');
        await fetchAllOrders();
      } else {
        toast.error(response.data.message || 'Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error(error.message || 'An error occurred');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="relative min-h-screen">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-12 h-12 border-4 border-t-green-400 border-gray-600 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="pt-10 bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white rounded-3xl p-8 shadow-lg mx-4 md:mx-0 relative"
        initial="hidden"
        animate={!isLoading ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.5 } },
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 opacity-50 pointer-events-none" />

        <div className="text-center mb-10 relative z-10">
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            ALL ORDERS LIST
          </motion.h2>
        </div>

        <div className="flex flex-col gap-6 relative z-10">
          <AnimatePresence>
            {!isLoading && orders.length === 0 ? (
              <motion.p
                className="text-center text-gray-300 text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                No orders available.
              </motion.p>
            ) : (
              !isLoading &&
              orders.map((order, index) => (
                <motion.div
                  key={order._id}
                  className="relative bg-gray-800/40 backdrop-blur-lg rounded-2xl p-5 shadow-md hover:shadow-lg transition-all duration-500 border border-gray-700/50 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                  whileHover={{ scale: 1.02, rotate: 1, zIndex: 20 }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-4">
                    <img
                      className="w-20 h-20 rounded-lg object-cover shadow-lg mx-auto md:mx-0"
                      src={assets.parcel_icon}
                      alt="Parcel Icon"
                    />
                    <div className="text-center md:text-left">
                      <div className="text-sm text-white">
                        {order.items.map((item, idx) => (
                          <p key={idx} className="py-0.5">
                            {item.name} x {item.quantity} <span className="text-green-400">({item.size})</span>
                          </p>
                        ))}
                      </div>
                      <p className="mt-2 font-semibold text-white">
                        {order.address.firstName} {order.address.lastName}
                      </p>
                      <p className="text-xs text-gray-300">
                        {order.address.street}, {order.address.city}, {order.address.state},{' '}
                        {order.address.country}, {order.address.zipcode}
                      </p>
                      <p className="text-xs text-gray-400">Phone: {order.address.phone}</p>
                    </div>
                    <div className="text-sm text-gray-300 text-center">
                      <p>Items: {order.items.length}</p>
                      <p>Method: {order.paymentMethod}</p>
                      <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                      <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <p className="text-lg font-bold text-green-300 text-center">
                      {currency}
                      {order.amount.toLocaleString()}
                    </p>
                    <div className="flex justify-center">
                      <select
                        onChange={(event) => statusHandler(event, order._id)}
                        value={order.status}
                        className="p-2 text-sm font-semibold bg-gray-900/80 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        disabled={updatingOrderId === order._id} // Disable during update
                      >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Packing">Packing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for delivery">Out for delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Orders;
