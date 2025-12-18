import React from "react";
import { motion } from "framer-motion";
import NewsletterBox from "../components/NewsletterBox";
import { assets } from "../assets/assets";

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "10K+", label: "Products Curated" },
  { value: "99%", label: "Customer Satisfaction" },
  { value: "24/7", label: "Support Availability" },
];

const features = [
  {
    title: "Premium Quality",
    text: "Every product is carefully curated and quality-checked to meet luxury standards.",
  },
  {
    title: "Seamless Shopping",
    text: "Lightning-fast, intuitive, and secure shopping from discovery to checkout.",
  },
  {
    title: "Customer First",
    text: "Transparent service with real humans who genuinely care about your experience.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: "easeOut" },
  }),
};

const About = () => {
  return (
    <section className="relative overflow-hidden bg-white text-gray-900">

      {/* BACKGROUND BLOBS */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-emerald-300/30 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-emerald-200/40 rounded-full blur-[120px]" />

      {/* HERO */}
      <div className="relative max-w-7xl mx-auto px-6 py-32 text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="uppercase tracking-[0.25em] text-sm text-emerald-600 mb-6"
        >
          About Forever
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight"
        >
          Crafted for
          <span className="block bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
            Everyday Elegance
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed"
        >
          Forever is where thoughtful design meets effortless fashion — curated
          collections made to look timeless and feel exceptional.
        </motion.p>
      </div>

      {/* STATS */}
      <div className="relative max-w-7xl mx-auto px-6 pb-28 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            custom={i}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="rounded-3xl p-8 text-center
                       bg-white/70 backdrop-blur-xl
                       border border-gray-200
                       shadow-[0_20px_50px_rgba(16,185,129,0.15)]
                       transition"
          >
            <div className="text-4xl font-extrabold text-emerald-600">
              {s.value}
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* STORY */}
      <div className="relative max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-20 items-center">
        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-emerald-500/30 to-transparent blur-2xl" />
          <img
            src={assets.about_img}
            alt="About Forever"
            className="relative rounded-3xl shadow-[0_40px_90px_rgba(0,0,0,0.2)]"
          />
        </motion.div>

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-8">
            Who We Are
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            Forever was built on a simple idea — fashion should feel premium,
            effortless, and accessible. We curate pieces that elevate everyday
            living.
          </p>

          <p className="text-gray-600 leading-relaxed mb-10">
            Each product is chosen for quality, comfort, and longevity —
            so you invest once and love it longer.
          </p>

          <div className="relative pl-6 border-l-4 border-emerald-600">
            <h3 className="text-xl font-semibold mb-2">
              Our Mission
            </h3>
            <p className="text-gray-600">
              To redefine everyday fashion with integrity, craftsmanship,
              and customer trust.
            </p>
          </div>
        </motion.div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="relative max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold">
            Why Choose Forever
          </h2>
          <p className="mt-4 text-gray-600">
            Minimal. Modern. Meaningful.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              custom={i}
              viewport={{ once: true }}
              whileHover={{ scale: 1.04 }}
              className="rounded-3xl p-10
                         bg-gradient-to-b from-white to-emerald-50
                         border border-gray-200
                         shadow-[0_25px_60px_rgba(16,185,129,0.2)]
                         transition"
            >
              <h3 className="text-2xl font-semibold mb-4 text-emerald-600">
                {f.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {f.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* NEWSLETTER */}
      <div className="relative max-w-5xl mx-auto px-6 pb-32">
        <NewsletterBox />
      </div>

    </section>
  );
};

export default About;
