import React from "react";
import { FaAppleAlt, FaCarrot, FaSeedling, FaCheese, FaLeaf } from "react-icons/fa";

const categories = [
  { name: "Fruits", icon: <FaAppleAlt className="text-3xl text-green-600" /> },
  { name: "Vegetables", icon: <FaCarrot className="text-3xl text-orange-500" /> },
  { name: "Grains", icon: <FaSeedling className="text-3xl text-yellow-600" /> },
  { name: "Dairy", icon: <FaCheese className="text-3xl text-yellow-400" /> },
  { name: "Greens", icon: <FaLeaf className="text-3xl text-green-400" /> },
  // ...add more as needed
];

const CategoryCarousel = () => (
  <section className="py-6 px-4 md:px-16">
    <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>
    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-green-200 snap-x">
      {categories.map((cat) => (
        <div
          key={cat.name}
          className="min-w-[110px] bg-white rounded-xl shadow flex flex-col items-center p-3 hover:shadow-lg transition cursor-pointer group snap-start"
        >
          <div className="mb-2 group-hover:scale-110 transition">{cat.icon}</div>
          <span className="font-medium text-sm text-gray-700">{cat.name}</span>
        </div>
      ))}
    </div>
  </section>
);

export default CategoryCarousel;