import React from "react";
import { motion } from "framer-motion";
import { FaRupeeSign, FaChartBar, FaTruck } from "react-icons/fa";

const features = [
	{
		icon: <FaRupeeSign className="text-green-600 text-xl" />,
		title: "Better Prices",
		desc: "AI-powered pricing suggestions help you get fair prices by analyzing market trends.",
	},
	{
		icon: <FaChartBar className="text-green-600 text-xl" />,
		title: "Market Insights",
		desc: "Real-time data on demand patterns helps you plan your crops better.",
	},
	{
		icon: <FaTruck className="text-green-600 text-xl" />,
		title: "Logistics Support",
		desc: "We handle storage, packaging and delivery so you can focus on farming.",
	},
];

const ImageFeatureSection = () => (
	<section className="py-16 bg-white">
		<div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center px-4">
			<motion.div
				initial={{ opacity: 0, x: -40 }}
				whileInView={{ opacity: 1, x: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.7 }}
			>
				<img
					src="/assets/farm-sunrise.jpg"
					alt="Farm Sunrise"
					className="rounded-xl shadow-lg w-full object-cover"
				/>
			</motion.div>
			<motion.div
				initial={{ opacity: 0, x: 40 }}
				whileInView={{ opacity: 1, x: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.7, delay: 0.2 }}
			>
				<h2 className="text-3xl md:text-4xl font-extrabold mb-4">
					Empowering Farmers
				</h2>
				<ul className="space-y-6">
					{features.map((f) => (
						<li key={f.title} className="flex items-start gap-4">
							<span className="bg-green-100 rounded-full p-3">{f.icon}</span>
							<div>
								<div className="font-bold text-green-900">{f.title}</div>
								<div className="text-gray-700">{f.desc}</div>
							</div>
						</li>
					))}
				</ul>
			</motion.div>
		</div>
	</section>
);

export default ImageFeatureSection;