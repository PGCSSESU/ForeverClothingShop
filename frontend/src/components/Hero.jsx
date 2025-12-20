import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

/* IMAGES */
import model from "../assets/men.jpg";
import model1 from "../assets/image3.png";
import model2 from "../assets/sam.jpg";
import model3 from "../assets/bol.jpg";
import model4 from "../assets/jaipur.webp";
import model5 from "../assets/pooja.jpg";

/* SLIDES */
const slides = [
  { title: "Vivid Future", subtitle: "Designed for tomorrow", image: model },
  { title: "Radiant Allure", subtitle: "Timeless fashion", image: model1 },
  { title: "Bold Uniqueness", subtitle: "Stand out in style", image: model2 },
  { title: "Pure Opulence", subtitle: "Luxury redefined", image: model3 },
  { title: "Flawless Craft", subtitle: "Precision in every detail", image: model4 },
  { title: "Creative Edge", subtitle: "Where art meets fashion", image: model5 },
];

/* IMAGE MOTION */
const imageVariants = {
  hidden: { opacity: 0, scale: 1.05 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 1.03,
    transition: { duration: 1.1, ease: "easeInOut" },
  },
};

/* TEXT MOTION */
const textVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.5 } },
};

const childVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const navigate = useNavigate();
  const timer = useRef(null);

  /* AUTOPLAY */
  useEffect(() => {
    if (!paused) {
      timer.current = setInterval(() => {
        setIndex((i) => (i + 1) % slides.length);
      }, 6500);
    }
    return () => clearInterval(timer.current);
  }, [paused]);

  const goTo = (i) => {
    clearInterval(timer.current);
    setIndex(i);
  };

  /* SWIPE */
  const handlers = useSwipeable({
    onSwipedLeft: () => goTo((index + 1) % slides.length),
    onSwipedRight: () => goTo((index - 1 + slides.length) % slides.length),
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  return (
    <section
      className="
        relative w-full overflow-hidden bg-black
        h-[85vh] sm:h-screen
      "
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      {...handlers}
    >
      {/* IMAGE */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={index}
            src={slides[index].image}
            alt={slides[index].title}
            variants={imageVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="
              absolute inset-0
              w-full h-full
              object-contain sm:object-cover
              bg-black
            "
          />
        </AnimatePresence>
      </div>

      {/* VIGNETTE */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/20" />

      {/* TEXT */}
      <div
        className="
          absolute bottom-0 left-0 right-0 z-10
          px-6 sm:px-20
          pb-16 sm:pb-24
          text-center sm:text-left
        "
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            variants={textVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="max-w-xl mx-auto sm:mx-0"
          >
            <motion.p
              variants={childVariants}
              className="uppercase tracking-[0.3em] text-xs sm:text-sm text-white/70 mb-3"
            >
              Featured Collection
            </motion.p>

            <motion.h1
              variants={childVariants}
              className="text-3xl sm:text-5xl font-medium text-white mb-3"
            >
              {slides[index].title}
            </motion.h1>

            <motion.p
              variants={childVariants}
              className="text-base sm:text-xl text-white/80 mb-6"
            >
              {slides[index].subtitle}
            </motion.p>

            <motion.button
              variants={childVariants}
              whileHover={{ x: 4 }}
              onClick={() => {
                navigate("/collection");
                window.scrollTo(0, 0);
              }}
              className="
                inline-flex items-center gap-3
                text-white text-sm sm:text-base
                border-b border-white/50
                pb-1
                hover:border-white
                transition
              "
            >
              Explore Collection
              <ArrowRight
                size={18}
                className="opacity-70 group-hover:translate-x-1"
              />
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* DOTS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-[2px] transition-all duration-500 ${
              i === index ? "w-8 bg-white" : "w-4 bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* PROGRESS */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-56 sm:w-80 h-[1px] bg-white/20 overflow-hidden z-20">
        <motion.div
          key={index}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6.5, ease: "linear" }}
          className="h-full bg-white/70"
        />
      </div>
    </section>
  );
};

export default Hero;
