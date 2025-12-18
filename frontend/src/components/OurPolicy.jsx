import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const policies = [
  {
    icon: assets.exchange_icon,
    title: "Easy Exchange",
    desc: "Hassle-free product exchange with a simple process.",
  },
  {
    icon: assets.quality_icon,
    title: "7-Day Returns",
    desc: "Enjoy peace of mind with our easy return policy.",
  },
  {
    icon: assets.support_img,
    title: "24/7 Support",
    desc: "Real humans, always available to help you.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};

const OurPolicy = () => {
  return (
    <section className="relative my-28">
      {/* Soft background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white rounded-[3rem]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {policies.map((item, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              whileHover={{ y: -12 }}
              className="group relative rounded-[2rem]
                         bg-white/80 backdrop-blur-xl
                         border border-gray-200
                         p-10 text-center
                         shadow-[0_25px_60px_rgba(0,0,0,0.08)]
                         transition-all duration-500"
            >
              {/* Glow */}
              <div className="absolute inset-0 rounded-[2rem]
                              bg-gradient-to-br from-emerald-200/30 to-transparent
                              opacity-0 group-hover:opacity-100
                              transition duration-500 pointer-events-none" />

              {/* Icon */}
              <div className="relative z-10 mb-6">
                <div className="mx-auto w-16 h-16 rounded-2xl
                                bg-gradient-to-br from-emerald-500 to-emerald-700
                                flex items-center justify-center
                                shadow-lg shadow-emerald-500/30">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-8 h-8 object-contain"
                  />
                </div>
              </div>

              {/* Text */}
              <h3 className="relative z-10 text-xl font-semibold
                             bg-gradient-to-r from-emerald-600 to-emerald-800
                             bg-clip-text text-transparent mb-3">
                {item.title}
              </h3>

              <p className="relative z-10 text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPolicy;
