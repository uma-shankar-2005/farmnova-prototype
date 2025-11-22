import React from "react";
import { FaLeaf, FaChartLine, FaTruck } from "react-icons/fa";
import { GiFarmer } from "react-icons/gi";

const features = [
  {
    icon: <FaLeaf className="text-3xl text-green-600" />,
    title: "Fresh Produce",
    desc: "Sourced directly from local farms for maximum freshness.",
  },
  {
    icon: <FaChartLine className="text-3xl text-green-600" />,
    title: "Real-Time Pricing",
    desc: "Transparent, up-to-date prices for all products.",
  },
  {
    icon: <FaTruck className="text-3xl text-green-600" />,
    title: "Fast Delivery",
    desc: "Efficient logistics ensure your order arrives quickly.",
  },
  {
    icon: <GiFarmer className="text-3xl text-green-600" />,
    title: "Farmer Support",
    desc: "Empowering farmers with tools, insights, and fair trade.",
  },
];

const FeaturesGrid = () => (
  <section className="py-16 bg-gray-50">
    <div className="max-w-4xl mx-auto text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Why FarmNova?</h2>
      <p className="text-gray-600">A platform built for trust, transparency, and efficiency.</p>
    </div>
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4">
      {features.map((f) => (
        <div
          key={f.title}
          className="bg-white rounded-xl shadow p-8 flex flex-col items-center text-center hover:scale-105 hover:border-green-600 border border-transparent transition"
        >
          <div className="mb-4">{f.icon}</div>
          <div className="font-bold text-lg mb-2 text-green-800">{f.title}</div>
          <div className="text-gray-700">{f.desc}</div>
        </div>
      ))}
    </div>
  </section>
);

export default FeaturesGrid;
