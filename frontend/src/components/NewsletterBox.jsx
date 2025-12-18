import React from "react";
import { motion } from "framer-motion";

const NewsletterBox = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative overflow-hidden rounded-[2.5rem]
                 bg-gradient-to-br from-emerald-50 via-white to-emerald-100
                 border border-emerald-200
                 shadow-[0_40px_120px_rgba(16,185,129,0.25)]
                 px-10 py-16 md:px-20 md:py-24"
    >
      {/* Decorative floating orbs */}
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-emerald-400/30 rounded-full blur-[140px]" />
      <div className="absolute -bottom-32 -right-32 w-[420px] h-[420px] bg-emerald-300/40 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="uppercase tracking-[0.35em] text-sm text-emerald-600 mb-6"
        >
          The Forever Experience
        </motion.p>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight"
        >
          More than Fashion.
          <span className="block bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
            It’s a Feeling.
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="mt-8 text-lg md:text-xl text-gray-600 leading-relaxed"
        >
          Forever is built for those who value quality, confidence,
          and timeless style. Every collection tells a story —
          designed to elevate everyday moments into something unforgettable.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.75, duration: 0.8 }}
          className="origin-left mx-auto mt-12 h-[2px] w-24
                     bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-full"
        />

        {/* Highlight Stats */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-10">
          {[
            { value: "50K+", label: "Loyal Customers" },
            { value: "Curated", label: "Premium Collections" },
            { value: "Timeless", label: "Design Philosophy" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.15 }}
              className="rounded-2xl bg-white/70 backdrop-blur-md
                         border border-emerald-200
                         p-6 shadow-[0_20px_40px_rgba(16,185,129,0.15)]"
            >
              <p className="text-3xl font-extrabold text-emerald-600">
                {item.value}
              </p>
              <p className="mt-2 text-sm text-gray-500 uppercase tracking-wide">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closing line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-16 text-sm text-gray-400 italic"
        >
          Crafted with intention. Worn with confidence.
        </motion.p>
      </div>
    </motion.section>
  );
};

export default NewsletterBox;
