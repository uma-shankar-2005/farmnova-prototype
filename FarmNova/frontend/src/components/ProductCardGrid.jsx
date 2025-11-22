import React from "react";

const placeholderImg = "https://via.placeholder.com/120?text=No+Image";

const ProductCardGrid = ({ products = [], onAddToCart }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {products.map((product) => (
      <div
        key={product.id || product._id}
        className="bg-white rounded-xl shadow p-4 flex flex-col items-center"
      >
        <img
          src={product.image || placeholderImg}
          alt={product.name}
          className="w-24 h-24 object-cover rounded mb-2"
        />
        <div className="font-bold text-lg mb-1">{product.name}</div>
        <div className="text-green-700 font-semibold mb-2">
          ₹{product.price}/kg
        </div>
        {product.avgRating && (
          <div className="mb-1 text-yellow-500 font-bold">
            {"★".repeat(Math.round(product.avgRating))}
            {"☆".repeat(5 - Math.round(product.avgRating))}
            <span className="ml-1 text-gray-700 text-sm">
              ({product.avgRating})
            </span>
          </div>
        )}
        <button
          className="bg-green-600 text-white px-4 py-2 rounded font-semibold mt-2"
          onClick={() => onAddToCart && onAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    ))}
  </div>
);

export default ProductCardGrid;
