import React, { useEffect, useState } from "react";

const MarketPriceTicker = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with dummy data
    setPrices([
      { name: "Tomato", price: 40 },
      { name: "Potato", price: 25 },
      { name: "Onion", price: 30 },
      { name: "Banana", price: 50 },
      { name: "Apple", price: 150 },
      { name: "Organic Rice", price: 68 },
      { name: "Califlower", price: 60 },
      { name: "Cucumber", price: 30 },
      { name: "Carrot", price: 50 }
    ]);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="bg-green-50 text-green-800 px-4 py-2 rounded mb-4 animate-pulse">
        Loading market prices...
      </div>
    );
  }

  return (
    <div className="bg-green-50 text-green-800 px-4 py-2 rounded mb-4 overflow-x-auto whitespace-nowrap">
      <div className="flex items-center gap-8 animate-marquee">
        {prices.map((item, idx) => (
          <span key={idx} className="font-semibold">
            {item.name}: <span className="text-green-700 font-bold">₹{item.price}/kg</span>
          </span>
        ))}
      </div>
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(100%);}
            100% { transform: translateX(-100%);}
          }
          .animate-marquee {
            display: flex;
            animation: marquee 18s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default MarketPriceTicker;
           