import React from "react";
import { motion } from "framer-motion";

const Hero = () => (
  <section className="relative bg-gradient-to-br from-green-100 to-green-50 min-h-[60vh] flex items-center">
    <div className="absolute inset-0 bg-[url('/src/assets/products/tomatoes.png')] bg-cover bg-center opacity-20" />
    <div className="relative max-w-4xl mx-auto text-center py-16 px-4">
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Fresh Produce,{" "}
        <span className="text-green-600">Direct From Farm</span>
      </motion.h1>
      <motion.p
        className="text-lg md:text-2xl text-gray-700 mb-8 leading-relaxed"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        Connecting farmers directly to consumers with transparent pricing,
        AI-powered insights, and fast delivery.
      </motion.p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <motion.a
          href="#marketplace"
          className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold shadow hover:bg-green-700 transition"
          whileHover={{ scale: 1.05 }}
        >
          Shop Now
        </motion.a>
        <motion.a
          href="#about"
          className="bg-white border border-green-600 text-green-700 px-8 py-3 rounded-lg font-semibold shadow hover:bg-green-50 transition"
          whileHover={{ scale: 1.05 }}
        >
          Learn More
        </motion.a>
      </div>
    </div>
  </section>
);

export default Hero;
