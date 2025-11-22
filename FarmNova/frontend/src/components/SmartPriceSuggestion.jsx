import React, { useState } from "react";
import axios from "axios";

const SmartPriceSuggestion = ({ productName }) => {
  const [suggestedPrice, setSuggestedPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getSuggestion = async () => {
    setLoading(true);
    setError("");
    setSuggestedPrice(null);
    try {
      const res = await axios.post("/api/price-suggestion", { productName });
      setSuggestedPrice(res.data.suggestedPrice);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Could not fetch price suggestion. Please try again."
      );
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded shadow p-4 mb-4">
      <h3 className="font-semibold mb-2">Smart Price Suggestion</h3>
      <button
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold"
        onClick={getSuggestion}
        disabled={loading}
      >
        {loading ? "Calculating..." : "Get Suggested Price"}
      </button>
      {suggestedPrice && (
        <div className="mt-3 text-green-700 font-bold">
          Suggested Price: ₹{suggestedPrice} /kg
        </div>
      )}
      {error && (
        <div className="mt-3 text-red-600">{error}</div>
      )}
    </div>
  );
};

export default SmartPriceSuggestion;
