import React from "react";

const mockRecommended = [
  { name: "Organic Spinach", image: "https://via.placeholder.com/100?text=Spinach" },
  { name: "Fresh Apples", image: "https://via.placeholder.com/100?text=Apples" },
  { name: "Carrots", image: "https://via.placeholder.com/100?text=Carrots" },
];

const ProductRecommendations = ({ userHistory }) => (
  <section className="my-8">
    <h2 className="text-xl font-bold mb-4">Recommended for You</h2>
    <div className="flex gap-4 flex-wrap">
      {mockRecommended.map((prod, idx) => (
        <div key={idx} className="bg-white rounded shadow p-4 flex flex-col items-center w-40">
          <img src={prod.image} alt={prod.name} className="w-20 h-20 object-cover rounded mb-2" />
          <span className="font-medium">{prod.name}</span>
        </div>
      ))}
    </div>
  </section>
);

export default ProductRecommendations;
