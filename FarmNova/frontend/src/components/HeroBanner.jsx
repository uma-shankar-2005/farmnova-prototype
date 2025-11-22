import React from "react";
import { motion } from "framer-motion";

const HeroBanner = () => (
	<section className="relative bg-gradient-to-br from-green-100 to-green-50 flex flex-col md:flex-row items-center justify-between px-4 md:px-16 py-12 md:py-20">
		{/* Banner image */}
		<img
			src="/assets/hero-strawberries.jpg"
			alt="Fresh Strawberries"
			className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
		/>
		<div className="relative z-10 flex-1 mb-8 md:mb-0">
			<h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-green-800 leading-tight drop-shadow-lg">
				<span className="text-green-600">Fresh</span> from the farm,
				<br />direct to your table
			</h1>
			<p className="text-lg md:text-xl mb-6 text-gray-700">
				Support local farmers, enjoy the freshest produce, and know exactly
				where your food comes from.
			</p>
			<div className="flex gap-4">
				<motion.button
					whileHover={{ scale: 1.07 }}
					className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition shadow"
				>
					Browse Products
				</motion.button>
				<motion.button
					whileHover={{ scale: 1.07 }}
					className="bg-white border border-green-600 text-green-700 px-6 py-2 rounded-lg font-semibold hover:bg-green-50 transition shadow"
				>
					View Subscriptions
				</motion.button>
			</div>
		</div>
	</section>
);

export default HeroBanner;
					
