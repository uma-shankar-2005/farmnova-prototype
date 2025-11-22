import React from "react";
import { FaShoppingCart, FaStar } from "react-icons/fa";

const ProductCard = ({
  image = "https://via.placeholder.com/300x300?text=300+x+300",
  name,
  farm,
  category,
  price,
  unit,
  weight,
  reviews,
  rating,
  badge,
  description,
  onAddToCart,
}) => (
  <div className="bg-white rounded-xl shadow hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 flex flex-col items-center p-4 group">
    <img
      src={image}
      alt={name}
      className="w-20 h-20 object-contain mb-2 rounded-lg shadow-sm group-hover:scale-110 transition"
      loading="lazy"
    />
    <div className="font-bold text-base mb-1 text-gray-900">{name}</div>
    <div className="text-xs text-gray-500 mb-2 text-center">
      From: <span className="underline">{farm}</span>
    </div>
    <span className="inline-block bg-green-200 text-green-900 text-xs px-2 py-1 rounded mb-2">
      {category}
    </span>
    <div className="flex items-center gap-1 mb-1">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={`text-yellow-400 ${
            i < Math.round(rating) ? "" : "opacity-30"
          }`}
        />
      ))}
      <span className="text-xs text-gray-500 ml-1">
        ({reviews} reviews)
      </span>
    </div>
    <div className="text-sm text-gray-700 mb-2">{description}</div>
    <div className="flex items-end justify-between mt-auto">
      <div>
        <div className="font-bold text-lg text-green-900">{price}</div>
        <div className="text-xs text-gray-500">
          {unit} ({weight})
        </div>
      </div>
      <button
        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
        onClick={onAddToCart}
      >
        <FaShoppingCart /> Add to Cart
      </button>
    </div>
    {badge && (
      <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-0.5 rounded shadow">
        {badge}
      </span>
    )}
  </div>
);

export default ProductCard;
