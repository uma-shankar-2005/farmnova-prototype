import React from "react";
import { FaBoxOpen, FaChartLine, FaTruck } from "react-icons/fa";

const features = [
  {
    icon: <FaBoxOpen className="text-3xl text-green-600" />,
    title: "Weekly Box",
    desc: "Fresh produce delivered to your door every week.",
  },
  {
    icon: <FaChartLine className="text-3xl text-green-600" />,
    title: "Real-Time Market Rates",
    desc: "Transparent, up-to-date pricing for all products.",
  },
  {
    icon: <FaTruck className="text-3xl text-green-600" />,
    title: "Smart Logistics",
    desc: "AI-powered planning for fast, reliable delivery.",
  },
];

const FeatureCards = () => (
  <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((f) => (
        <div
          key={f.title}
          className="bg-white rounded-xl shadow p-8 flex flex-col items-center text-center hover:shadow-lg transition cursor-pointer group"
        >
          <div className="mb-4 group-hover:scale-110 transition">{f.icon}</div>
          <div className="font-bold text-lg mb-2 text-green-800">{f.title}</div>
          <div className="text-gray-600">{f.desc}</div>
        </div>
      ))}
    </div>
  </section>
);

export default FeatureCards;
