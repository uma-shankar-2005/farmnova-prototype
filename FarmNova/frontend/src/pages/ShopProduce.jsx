import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ProductFilters from "../components/ProductFilters";
import ProductCard from "../components/ProductCard";

const products = [
  {
    name: "Fresh Spinach",
    farm: "GreenLeaf Organics",
    category: "Leafy Greens",
    price: "₹40.00",
    unit: "/bunch",
    weight: "250g",
    reviews: 120,
    rating: 5,
    badge: "Organic",
    description: "Crisp and tender organic spinach, perfect for salads and cooking.",
    image: "https://via.placeholder.com/300x300?text=300+x+300",
  },
  {
    name: "Cherry Tomatoes",
    farm: "RedHarvest Farms",
    category: "Vegetables",
    price: "₹60.00",
    unit: "/pack",
    weight: "200g",
    reviews: 95,
    rating: 4,
    badge: "",
    description: "Sweet and juicy cherry tomatoes, bursting with flavor.",
    image: "https://via.placeholder.com/300x300?text=300+x+300",
  },
  // ...add more products as needed
];

const ShopProduce = () => (
  <div className="flex min-h-screen bg-green-50">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <Navbar />
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2 text-green-900">
          <span role="img" aria-label="cart">🛒</span> Fresh Produce Market
        </h1>
        <p className="mb-6 text-green-800">Order fresh fruits, vegetables, and more for fast delivery to your doorstep.</p>
        <ProductFilters />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((prod, idx) => (
            <ProductCard key={idx} {...prod} onAddToCart={() => alert(`Added ${prod.name} to cart!`)} />
          ))}
        </div>
      </main>
    </div>
  </div>
);

export default ShopProduce;
