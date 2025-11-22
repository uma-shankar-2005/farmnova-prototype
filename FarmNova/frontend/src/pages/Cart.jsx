import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Always load cart from localStorage on mount
    const stored = localStorage.getItem("cart");
    setCart(stored ? JSON.parse(stored) : []);
  }, []);

  const history = useHistory();

  const updateQuantity = (idx, qty) => {
    const updated = [...cart];
    updated[idx].quantity = Math.max(1, Number(qty));
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (idx) => {
    const updated = cart.filter((_, i) => i !== idx);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    history.push("/checkout");
  };

  if (!cart.length) {
    return <div className="max-w-2xl mx-auto mt-10 text-center text-gray-500">Your cart is empty.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white rounded shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <ul className="divide-y">
        {cart.map((item, idx) => (
          <li key={idx} className="flex items-center py-4 gap-4">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
            <div className="flex-1">
              <div className="font-semibold">{item.name}</div>
              <div className="text-sm text-gray-500">₹{item.price} each</div>
              <div className="flex items-center gap-2 mt-1">
                <label className="text-sm">Qty:</label>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={e => updateQuantity(idx, e.target.value)}
                  className="w-16 border rounded px-2 py-1"
                />
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="font-bold">₹{item.price * item.quantity}</span>
              <button
                className="text-red-500 hover:underline text-sm"
                onClick={() => removeItem(idx)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-6">
        <span className="font-bold text-lg">Subtotal:</span>
        <span className="text-xl font-bold">₹{subtotal}</span>
      </div>
      <button
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
        onClick={handleCheckout}
      >
        Checkout
      </button>
    </div>
  );
};

export default Cart;