import React from "react";

const FarmerProfileCard = ({ name, location, rating, avatar }) => (
  <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center w-64">
    <img
      src={avatar || "https://randomuser.me/api/portraits/men/1.jpg"}
      alt={name}
      className="w-20 h-20 rounded-full mb-3 object-cover"
    />
    <h3 className="text-lg font-bold mb-1">{name}</h3>
    <div className="text-sm text-gray-500 mb-2">{location}</div>
    <div className="flex items-center mb-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i <= Math.round(rating) ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <polygon points="9.9,1.1 12.3,6.6 18.2,7.3 13.8,11.3 15,17.1 9.9,14.1 4.8,17.1 6,11.3 1.6,7.3 7.5,6.6" />
        </svg>
      ))}
      <span className="ml-2 text-xs text-gray-600">{rating.toFixed(1)}</span>
    </div>
  </div>
);

export default FarmerProfileCard;
