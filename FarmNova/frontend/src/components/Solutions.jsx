import React from "react";
import { motion } from "framer-motion";

const solutions = [
	{
		image: "/assets/weeklybox.jpg",
		heading: "BoosterBox",
		bullets: [
			"Automated weekly produce curation",
			"Flexible delivery and customization",
			"Bulk and retail options",
		],
		reverse: false,
	},
	{
		image: "/assets/marketpro.jpg",
		heading: "MarketPro",
		bullets: [
			"Real-time price analytics",
			"Demand forecasting with AI",
			"Integrated logistics dashboard",
		],
		reverse: true,
	},
	{
		image: "/assets/smartlogistics.jpg",
		heading: "Smart Logistics",
		bullets: [
			"Route optimization",
			"Live tracking",
			"Sustainable delivery",
		],
		reverse: false,
	},
];

const Solutions = () => (
	<section
		className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-16"
		id="solutions"
	>
		{solutions.map((s, i) => (
			<motion.div
				key={s.heading}
				className={`flex flex-col md:flex-row ${
					s.reverse ? "md:flex-row-reverse" : ""
				} items-center gap-10`}
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.7, delay: i * 0.2 }}
			>
				<img
					src={s.image}
					alt={s.heading}
					className="w-full md:w-1/2 rounded-xl shadow-lg"
				/>
				<div className="flex-1">
					<h3 className="text-2xl font-bold text-green-800 mb-4">
						{s.heading}
					</h3>
					<ul className="mb-6 space-y-2">
						{s.bullets.map((b, j) => (
							<li key={j} className="flex items-start gap-2">
								<span className="mt-1 text-green-600">•</span>
								<span className="text-gray-700">{b}</span>
							</li>
						))}
					</ul>
					<a
						href="/solutions"
						className="inline-block px-6 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
					>
						Learn More
					</a>
				</div>
			</motion.div>
		))}
	</section>
);

export default Solutions;