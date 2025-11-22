import React from "react";
import { FaBoxOpen, FaChartLine, FaCloudSun, FaRobot } from "react-icons/fa";

const features = [
  {
    icon: <FaBoxOpen className="text-2xl text-green-600" />,
    title: "Weekly Subscription Box",
    desc: "Get a curated selection of fresh, seasonal produce delivered to your doorstep every week.",
  },
  {
    icon: <FaChartLine className="text-2xl text-green-600" />,
    title: "Real-Time Market Prices",
    desc: "Transparent pricing with live mandi/market rates integrated directly into our platform.",
  },
  {
    icon: <FaCloudSun className="text-2xl text-green-600" />,
    title: "Weather Reports",
    desc: "Real-time weather data to help farmers plan logistics and consumers understand seasonal availability.",
  },
  {
    icon: <FaRobot className="text-2xl text-green-600" />,
    title: "AI-Powered Insights",
    desc: "Smart pricing suggestions for farmers and personalized recommendations for consumers.",
  },
];

const Features = () => (
  <section className="bg-white py-16" id="features">
    <div className="max-w-5xl mx-auto text-center mb-12">
      <div className="text-green-600 font-semibold mb-2">FEATURES</div>
      <h2 className="text-3xl md:text-4xl font-extrabold mb-2">A better way to buy and sell farm produce</h2>
      <p className="text-gray-600">FarmNova combines the best of B2B and B2C models with cutting-edge technology.</p>
    </div>
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
      {features.map((f) => (
        <div key={f.title} className="flex items-start gap-4 bg-green-50 rounded-lg p-6 shadow hover:shadow-lg transition">
          <div>{f.icon}</div>
          <div>
            <div className="font-bold text-lg text-green-900">{f.title}</div>
            <div className="text-gray-700">{f.desc}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Features;
