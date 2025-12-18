import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ASSETS */
import model from "../assets/image2.png";
import model1 from "../assets/image3.png";
import model2 from "../assets/image5.png";
import model3 from "../assets/imageb.png";
import model4 from "../assets/imageb2.png";

/* SLIDES */
const slides = [
  { title: "Vivid Future", subtitle: "Designed for tomorrow", image: model1 },
  { title: "Radiant Allure", subtitle: "Timeless fashion", image: model },
  { title: "Bold Uniqueness", subtitle: "Stand out in style", image: model2 },
  { title: "Pure Opulence", subtitle: "Luxury redefined", image: model4 },
  { title: "Flawless Craft", subtitle: "Precision in every detail", image: model3 },
];

/* MOTION */
const fadeText = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.4 } },
};

const Hero = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer.current);
  }, []);

  return (
    <section className="relative w-full h-[120vh] overflow-hidden bg-white">
      {/* SOFT EMERALD AMBIENCE */}
      <div className="absolute -top-64 -left-64 w-[700px] h-[700px] bg-emerald-300/20 blur-[220px]" />
      <div className="absolute bottom-0 -right-64 w-[700px] h-[700px] bg-emerald-400/15 blur-[240px]" />

      {/* IMAGE STACK */}
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <motion.img
            key={i}
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* VERY LIGHT VIGNETTE (NOT DARK) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />

      {/* CONTENT – EDGE CAPTION */}
      <div className="relative z-10 h-full flex items-end pb-20">
        <div className="pl-10 md:pl-20 max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              variants={fadeText}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <p className="uppercase tracking-[0.3em] text-sm text-white/60 mb-3">
                Featured Collection
              </p>

              <h1 className="text-4xl md:text-5xl font-semibold text-white leading-tight">
                {slides[index].title}
              </h1>

              <p className="mt-3 text-white/70">
                {slides[index].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.button
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              navigate("/collection");
              window.scrollTo(0, 0);
            }}
            className="mt-8 inline-flex items-center gap-3
                       text-white font-medium
                       border-b border-white/50
                       pb-1 hover:border-white transition"
          >
            Explore Collection
            <ArrowRight size={18} />
          </motion.button>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[240px] h-[2px] bg-white/30 overflow-hidden">
        <motion.div
          key={index}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6.5, ease: "linear" }}
          className="h-full bg-emerald-400"
        />
      </div>
    </section>
  );
};

export default Hero;
