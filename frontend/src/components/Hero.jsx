import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import model from "../assets/image2.png";
import model1 from "../assets/image3.png";
import model4 from "../assets/imageb2.png";
import model2 from "../assets/image5.png";
import model3 from "../assets/imageb.png";
const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselImages = [model1, model, model2 , model4,model3];

  // Slide content with titles and descriptions
  const slideContent = [
    {
      title: "Radiant Allure",
      description: "Glow with timeless style →",
      titleColor: "from-green-500 via-teal-500 to-cyan-500",
    },
    {
      title: "Flawless Craft",
      description: "Precision in every detail →",
      titleColor: "from-blue-500 via-indigo-500 to-purple-500",
    },
    {
      title: "Bold Uniqueness",
      description: "Stand out, claim yours →",
      titleColor: "from-purple-500 via-pink-500 to-red-500",
    },
    {
      title: "Vivid Future",
      description: "Stunning designs await →",
      titleColor: "from-yellow-500 via-orange-500 to-red-500",
    },
    {
      title: "Pure Opulence",
      description: "Luxe vibes elevate you →",
      titleColor: "from-gray-500 via-gray-300 to-white",
    },
  ];

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideContent.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Image animation variants
  const imageVariants = {
    hidden: { opacity: 0, x: "50%", scale: 0.95 },
    visible: {
      opacity: 1,
      x: "0%",
      scale: 1,
      transition: { duration: 1, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      x: "-50%",
      scale: 0.95,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  // Text animation variants with innovative effects
  const textVariants = {
    hidden: { opacity: 0, y: 30, rotate: -5 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -20,
      rotate: 5,
      transition: { duration: 0.5, ease: "easeIn" },
    },
  };

  return (
    <div className="relative w-full h-[400px] sm:h-[500px]">
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <motion.div
              className="text-green-400 text-xl font-semibold"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            >
              ⌀
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="flex flex-col sm:flex-row w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-800 border border-gray-800 rounded-xl overflow-hidden shadow-2xl"
        initial="hidden"
        animate={!isLoading ? "visible" : "hidden"}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Left Side - Dynamic Text */}
        <div className="w-full sm:w-1/2 flex items-center justify-center p-8 bg-opacity-80">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="text-white"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.h1
                className={`text-2xl sm:text-4xl font-bold bg-gradient-to-r ${slideContent[currentIndex].titleColor} bg-clip-text text-transparent`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {slideContent[currentIndex].title}
              </motion.h1>
              <motion.p
                className="mt-3 text-sm sm:text-base font-medium text-gray-300"
                whileHover={{ x: 10, color: "#34D399" }}
                transition={{ duration: 0.3 }}
              >
                {slideContent[currentIndex].description}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side - Carousel */}
        <div className="w-full sm:w-1/2 relative overflow-hidden h-full">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              className="absolute top-0 left-0 w-full h-full object-cover rounded-r-xl"
              src={carouselImages[currentIndex % carouselImages.length]}
              alt={`Hero Image ${currentIndex + 1}`}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover={{ scale: 1.05 }}
            />
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
            {slideContent.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer ${
                  currentIndex === index ? "bg-green-400" : "bg-gray-600"
                }`}
                whileHover={{ scale: 1.8, backgroundColor: "#34D399" }}
                onClick={() => setCurrentIndex(index)}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;