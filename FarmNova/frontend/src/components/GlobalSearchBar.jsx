import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Mock product list for demo; replace with API fetch if needed
const mockProducts = [
  { id: 1, name: "Tomatoes", category: "Vegetable", farm: "Green Valley" },
  { id: 2, name: "Carrots", category: "Vegetable", farm: "Sunny Farms" },
  { id: 3, name: "Apples", category: "Fruit", farm: "Orchard Fresh" },
  { id: 4, name: "Spinach", category: "Leafy", farm: "Green Valley" },
  { id: 5, name: "Milk", category: "Dairy", farm: "Dairy Best" },
];

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const highlightMatch = (text, query) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "ig");
  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="bg-yellow-200">{part}</span>
    ) : (
      part
    )
  );
};

const GlobalSearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [show, setShow] = useState(false);
  const ref = useRef();
  const history = useHistory();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setShow(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Debounced search/filter
  const doSearch = debounce((val) => {
    if (!val) {
      setSuggestions([]);
      return;
    }
    const lower = val.toLowerCase();
    setSuggestions(
      mockProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.category.toLowerCase().includes(lower) ||
          p.farm.toLowerCase().includes(lower)
      )
    );
  }, 200);

  const handleChange = (e) => {
    setQuery(e.target.value);
    setShow(true);
    doSearch(e.target.value);
  };

  const handleSelect = (item) => {
    setQuery("");
    setShow(false);
    // Navigate to product page or filtered results (customize as needed)
    history.push(`/marketplace?product=${encodeURIComponent(item.name)}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(false);
    history.push(`/marketplace?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto" ref={ref}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded focus:outline-none"
          placeholder="Search products, categories, or farms..."
          value={query}
          onChange={handleChange}
          onFocus={() => setShow(true)}
        />
      </form>
      {show && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border rounded shadow z-10 mt-1 max-h-64 overflow-y-auto">
          {suggestions.map((item, idx) => (
            <li
              key={item.id}
              className="px-4 py-2 hover:bg-green-100 cursor-pointer flex flex-col"
              onClick={() => handleSelect(item)}
            >
              <span>
                {highlightMatch(item.name, query)}
                <span className="text-xs text-gray-500 ml-2">
                  {highlightMatch(item.category, query)}
                </span>
              </span>
              <span className="text-xs text-gray-400">
                {highlightMatch(item.farm, query)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GlobalSearchBar;
