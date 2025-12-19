import React from "react";
import { motion } from "framer-motion";
import Title from "../components/Title";

/* ======================================================
   MOTION SYSTEM — MODERN & BUTTERY
====================================================== */
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1], // ultra-smooth
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

/* ======================================================
   JOB DATA
====================================================== */
const jobOpenings = [
  {
    id: 1,
    title: "Store Manager",
    location: "Sulur, Coimbatore",
    type: "Full-Time",
    description:
      "Lead store operations, inspire teams, and deliver exceptional customer experiences aligned with our brand values.",
  },
  {
    id: 2,
    title: "Sales Associate",
    location: "Sulur, Coimbatore",
    type: "Part-Time",
    description:
      "Engage customers, style collections, and create memorable in-store experiences.",
  },
  {
    id: 3,
    title: "Inventory Specialist",
    location: "Sulur, Coimbatore",
    type: "Full-Time",
    description:
      "Ensure inventory accuracy, manage stock flow, and support seamless operations.",
  },
];

/* ======================================================
   PAGE
====================================================== */
const ExploreJobs = () => {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* ================= AMBIENT LAYERS ================= */}
      <div className="absolute -top-64 -left-64 w-[800px] h-[800px] bg-emerald-200/20 blur-[260px]" />
      <div className="absolute top-1/3 -right-64 w-[700px] h-[700px] bg-emerald-300/20 blur-[300px]" />

      {/* ================= HERO ================= */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-28"
      >
        <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto">
          <p className="uppercase tracking-[0.35em] text-sm text-gray-400 mb-6">
            Careers at Forever
          </p>

          <Title text1="SHAPE" text2="YOUR FUTURE" />

          <p className="mt-8 text-lg text-gray-600 leading-relaxed">
            At <span className="font-semibold">Forever</span>, we believe fashion
            is more than clothing — it’s an expression of confidence, creativity,
            and purpose. Join a team where your growth matters.
          </p>
        </motion.div>
      </motion.div>

      {/* ================= JOB LIST ================= */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative max-w-7xl mx-auto px-6 lg:px-10 pb-32"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {jobOpenings.map((job) => (
            <motion.div
              key={job.id}
              variants={scaleIn}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="group relative rounded-3xl
                         bg-white/80 backdrop-blur-xl
                         border border-gray-200
                         shadow-[0_30px_80px_rgba(0,0,0,0.08)]
                         p-10 overflow-hidden"
            >
              {/* Glow Layer */}
              <div
                className="absolute inset-0 rounded-3xl
                           bg-gradient-to-br from-emerald-300/20
                           via-transparent to-transparent
                           opacity-0 group-hover:opacity-100
                           transition duration-700"
              />

              <div className="relative z-10">
                <h3
                  className="text-2xl font-semibold
                             bg-gradient-to-r from-emerald-700 to-emerald-400
                             bg-clip-text text-transparent"
                >
                  {job.title}
                </h3>

                <p className="mt-4 text-sm text-gray-500">
                  {job.location} · {job.type}
                </p>

                <p className="mt-6 text-gray-600 leading-relaxed">
                  {job.description}
                </p>

                <div className="mt-8 flex items-center justify-between">
                  <a
                    href="mailto:sesuuraj@gmail.com"
                    className="text-emerald-600 font-medium hover:underline"
                  >
                    Apply via Email
                  </a>

                  <span className="text-xs text-gray-400 tracking-widest">
                    FOREVER
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ================= CTA ================= */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative max-w-4xl mx-auto px-6 lg:px-10 pb-40"
      >
        <div
          className="bg-gray-50 rounded-[3rem]
                     shadow-[0_40px_120px_rgba(0,0,0,0.1)]
                     p-16 text-center"
        >
          <h3 className="text-3xl font-semibold mb-6">
            Don’t see the right role?
          </h3>

          <p className="text-gray-600 mb-10 max-w-xl mx-auto">
            We’re always open to meeting passionate people. If you believe you
            belong at Forever, reach out to us.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <a
              href="mailto:sesuuraj@gmail.com"
              className="px-10 py-4 rounded-full
                         bg-emerald-600 hover:bg-emerald-700
                         text-white font-medium transition"
            >
              Contact HR
            </a>

            <a
              href="tel:6385258142"
              className="text-emerald-600 font-medium hover:underline"
            >
              +91 63852 58142
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ExploreJobs;
