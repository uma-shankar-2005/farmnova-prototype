import React from "react";
import { FaSearch, FaFilter } from "react-icons/fa";

const ProductFilters = () => (
  <div className="flex flex-wrap gap-3 items-center bg-green-100/60 p-4 rounded-xl shadow mb-6">
    <div className="relative flex-1 min-w-[200px]">
      <FaSearch className="absolute left-3 top-3 text-gray-400" />
      <input
        type="text"
        placeholder="Search products..."
        className="w-full pl-10 pr-4 py-2 rounded-lg bg-white text-gray-800 border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
      />
    </div>
    <select className="px-4 py-2 rounded-lg border border-green-200 bg-white text-gray-700 focus:ring-2 focus:ring-green-400">
      <option>Filter by Category</option>
      <option>Vegetables</option>
      <option>Fruits</option>
      <option>Dairy & Eggs</option>
    </select>
    <select className="px-4 py-2 rounded-lg border border-green-200 bg-white text-gray-700 focus:ring-2 focus:ring-green-400">
      <option>Filter by Farm</option>
      <option>GreenLeaf Organics</option>
      <option>RedHarvest Farms</option>
    </select>
    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition">
      <FaFilter /> Apply Filters
    </button>
  </div>
);

export default ProductFilters;
