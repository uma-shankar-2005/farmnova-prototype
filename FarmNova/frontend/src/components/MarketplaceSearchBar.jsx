import React, { useState, useEffect, useRef } from "react";

const MarketplaceSearchBar = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [show, setShow] = useState(false);
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [organic, setOrganic] = useState("");
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setShow(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    // Replace with your API endpoint for product search
    let url = `/api/products/search?q=${encodeURIComponent(query)}`;
    if (price) url += `&maxPrice=${price}`;
    if (location) url += `&location=${encodeURIComponent(location)}`;
    if (organic) url += `&organic=${organic}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setSuggestions(data))
      .catch(() => setSuggestions([]));
  }, [query, price, location, organic]);

  const handleSelect = (item) => {
    setQuery(item.name);
    setShow(false);
    if (onSelect) onSelect(item);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto mb-6" ref={ref}>
      <form className="flex flex-col md:flex-row gap-2 items-center">
        <input
          type="text"
          className="w-full px-4 py-2 border rounded focus:outline-none"
          placeholder="Search products..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShow(true);
          }}
          onFocus={() => setShow(true)}
        />
        <input
          type="number"
          className="w-28 px-2 py-2 border rounded"
          placeholder="Max Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min={0}
        />
        <input
          type="text"
          className="w-32 px-2 py-2 border rounded"
          placeholder="Farmer Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <select
          className="w-28 px-2 py-2 border rounded"
          value={organic}
          onChange={(e) => setOrganic(e.target.value)}
        >
          <option value="">All</option>
          <option value="true">Organic</option>
          <option value="false">Non-Organic</option>
        </select>
      </form>
      {show && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border rounded shadow z-10 mt-1">
          {suggestions.map((item, idx) => (
            <li
              key={idx}
              className="px-4 py-2 hover:bg-green-100 cursor-pointer flex justify-between"
              onClick={() => handleSelect(item)}
            >
              <span>{item.name}</span>
              <span className="text-xs text-gray-500">{item.category}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MarketplaceSearchBar;
