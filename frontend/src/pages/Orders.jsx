import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Calendar, CreditCard, Truck } from "lucide-react";

/* ----------------------------------
   Animation Variants
---------------------------------- */

const pageFade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const loadOrders = async () => {
      try {
        const { data } = await axios.post(
          `${backendUrl}/api/order/userorders`,
          {},
          { headers: { token } }
        );

        if (data.success) {
          const flattened = data.orders
            .flatMap((order) =>
              order.items.map((item) => ({ ...item, ...order }))
            )
            .reverse();

          setOrderData(flattened);
        }
      } catch (err) {
        console.error("Order fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [token, backendUrl]);

  return (
    <motion.section
      variants={pageFade}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-4 md:px-8 py-20"
    >
      {/* HEADER */}
      <div className="text-center mb-16">
        <Title
          text1="MY"
          text2="ORDERS"
          className="text-5xl font-black bg-gradient-to-r 
                     from-emerald-500 to-teal-400 
                     bg-clip-text text-transparent"
        />
        <p className="mt-4 text-gray-500">
          Track your purchases and delivery status in one place
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <motion.div
          className="text-center text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Loading your orders...
        </motion.div>
      )}

      {/* EMPTY STATE */}
      {!loading && orderData.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <Package className="w-16 h-16 mx-auto text-gray-300" />
          <p className="mt-6 text-lg text-gray-500">
            You haven’t placed any orders yet.
          </p>
        </motion.div>
      )}

      {/* ORDERS LIST */}
      <AnimatePresence>
        <div className="grid gap-8">
          {orderData.map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariant}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              whileHover={{ y: -6 }}
              className="
                bg-white
                rounded-3xl
                border border-gray-200
                shadow-[0_20px_40px_rgba(0,0,0,0.08)]
                hover:shadow-[0_25px_50px_rgba(16,185,129,0.25)]
                transition-all
                overflow-hidden
              "
            >
              <div className="grid md:grid-cols-[140px_1fr] gap-6 p-6">
                {/* IMAGE */}
                <div className="relative">
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-xl"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full bg-emerald-600 text-white">
                    {item.status}
                  </span>
                </div>

                {/* DETAILS */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.name}
                    </h3>

                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                      <span>Size: {item.size}</span>
                      <span>Qty: {item.quantity}</span>
                    </div>

                    <div className="mt-4 flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {new Date(item.date).toDateString()}
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <CreditCard className="w-4 h-4" />
                        {item.paymentMethod}
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <Truck className="w-4 h-4" />
                        Processing
                      </div>
                    </div>
                  </div>

                  {/* PRICE */}
                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-2xl font-bold text-emerald-600">
                      {currency}
                      {item.price}
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="
                        px-6 py-3
                        rounded-xl
                        bg-gradient-to-r from-emerald-500 to-teal-400
                        text-white font-semibold
                        shadow-lg
                      "
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </motion.section>
  );
};

export default Orders;
