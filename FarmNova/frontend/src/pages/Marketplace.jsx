import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetch("/api/products?status=Approved")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      })
      .catch(() => setProducts([]));
  }, []);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const idx = cart.findIndex((item) => item._id === product._id);
    if (idx > -1) {
      cart[idx].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Marketplace</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No products available.
            <br />
            {/* If you are using a real backend, ensure there are approved products in your database. */}
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product._id || product.id}
              className="bg-white rounded shadow p-4 flex flex-col items-center"
            >
              <img
                src={product.image || "https://via.placeholder.com/100"}
                alt={product.name}
                className="w-24 h-24 object-cover mb-2"
              />
              <div className="font-bold text-lg">{product.name}</div>
              <div className="text-green-700 font-semibold mb-1">
                ₹{product.price}/kg
              </div>
              <div className="text-sm text-gray-500 mb-1">{product.farm}</div>
              <div className="mb-2">
                {product.available !== false && product.quantity > 0 ? (
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                    Available
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                    Out of Stock
                  </span>
                )}
              </div>
              <button
                type="button"
                className="bg-green-600 text-white px-4 py-2 rounded font-semibold mt-2 cursor-pointer transition hover:bg-green-700"
                onClick={() => handleAddToCart(product)}
                disabled={
                  product.available === false || product.quantity <= 0
                }
              >
                Add to Cart
              </button>
              <button
                type="button"
                className="text-blue-600 underline mt-2 cursor-pointer"
                onClick={() =>
                  history.push(`/products/${product._id || product.id}`)
                }
              >
                View Details
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Marketplace;
