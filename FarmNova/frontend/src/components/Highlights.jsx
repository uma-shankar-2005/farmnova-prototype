import React from "react";
import { FaTractor, FaHandshake, FaLeaf, FaTruck } from "react-icons/fa";

const highlights = [
  { icon: <FaTractor className="text-3xl text-green-600" />, title: "Direct from Farmers" },
  { icon: <FaHandshake className="text-3xl text-green-600" />, title: "Zero Middlemen" },
  { icon: <FaLeaf className="text-3xl text-green-600" />, title: "Fresh & Organic" },
  { icon: <FaTruck className="text-3xl text-green-600" />, title: "Fast Delivery" },
];

const Highlights = () => (
  <section className="py-8 px-4 md:px-16 bg-green-50">
    <div className="flex flex-wrap justify-center gap-8">
      {highlights.map((h) => (
        <div
          key={h.title}
          className="flex flex-col items-center bg-white rounded-lg shadow p-4 min-w-[120px] hover:shadow-lg transition"
        >
          {h.icon}
          <span className="mt-2 font-semibold text-green-800 text-center">{h.title}</span>
        </div>
      ))}
    </div>
  </section>
);

export default Highlights;