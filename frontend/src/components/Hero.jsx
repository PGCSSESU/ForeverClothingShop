import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

/* IMAGES */
import model from "../assets/men.jpg";
import model1 from "../assets/image3.png";
import model2 from "../assets/image5.png";
import model3 from "../assets/kida.jpg";
import model4 from "../assets/jaipur.webp";
import model5 from "../assets/add.png";

/* SLIDES */
const slides = [
  {
    title: "Vivid Future",
    subtitle: "Designed for tomorrow",
    image: model,
  },
  {
    title: "Radiant Allure",
    subtitle: "Timeless fashion",
    image: model1,
  },
  {
    title: "Bold Uniqueness",
    subtitle: "Stand out in style",
    image: model2,
  },
  {
    title: "Pure Opulence",
    subtitle: "Luxury redefined",
    image: model3,
  },
  {
    title: "Flawless Craft",
    subtitle: "Precision in every detail",
    image: model4,
  },
  {
    title: "Creative Edge",
    subtitle: "Where art meets fashion",
    image: model5,
  },
];

/* IMAGE MOTION */
const imageVariants = {
  hidden: { opacity: 0, scale: 1.05 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 1.03,
    transition: { duration: 1.2, ease: "easeInOut" },
  },
};

/* TEXT MOTION */
const textVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
  exit: { opacity: 0, y: -30, transition: { duration: 0.6 } },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
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
    onSwipedRight: () =>
      goTo((index - 1 + slides.length) % slides.length),
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      {...handlers}
    >
      {/* IMAGE */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={index}
            src={slides[index].image}
            alt={slides[index].title}
            className="absolute inset-0 w-full h-full object-cover"
            variants={imageVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          />
        </AnimatePresence>
      </div>

      {/* SOFT VIGNETTE */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none" />

      {/* EDITORIAL TEXT */}
      <div className="absolute bottom-0 left-0 z-10 pb-20 pl-10 md:pl-20 pr-10 md:pr-40">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            variants={textVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="max-w-xl"
          >
            {/* Eyebrow */}
            <motion.p
              variants={childVariants}
              className="uppercase tracking-[0.35em] text-sm text-white/60 mb-4"
            >
              Featured Collection
            </motion.p>

            {/* Title */}
            <motion.h1
              variants={childVariants}
              className="text-4xl md:text-5xl font-medium text-white leading-tight tracking-[-0.01em] mb-4"
            >
              {slides[index].title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={childVariants}
              className="text-lg md:text-xl text-white/75 mb-8"
            >
              {slides[index].subtitle}
            </motion.p>

            {/* Editorial CTA */}
            <motion.button
              variants={childVariants}
              whileHover={{ x: 4 }}
              onClick={() => {
                navigate("/collection");
                window.scrollTo(0, 0);
              }}
              className="
                group inline-flex items-center gap-3
                text-white text-base font-normal
                border-b border-white/50
                pb-1
                hover:border-white
                transition-all
              "
            >
              Explore Collection
              <ArrowRight
                size={18}
                className="opacity-70 transition-transform group-hover:translate-x-1 group-hover:opacity-100"
              />
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* DOTS */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-[2px] transition-all duration-500 ${
              i === index
                ? "w-10 bg-white"
                : "w-4 bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* PROGRESS */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-80 h-[1px] bg-white/20 overflow-hidden z-20">
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
