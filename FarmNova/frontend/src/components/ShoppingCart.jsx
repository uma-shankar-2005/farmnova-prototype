import React, { useState, useEffect } from "react";
import RazorpayCheckout from "./RazorpayCheckout";

const ShoppingCart = () => {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handlePaymentSuccess = (response) => {
    alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <div className="bg-white rounded shadow p-6 max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <>
          <ul className="divide-y">
            {cart.map((item, idx) => (
              <li key={idx} className="py-2 flex justify-between items-center">
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold">₹{item.price * item.quantity}</span>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => removeItem(idx)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between items-center">
            <span className="font-bold">Total:</span>
            <span className="text-lg font-bold">₹{total}</span>
          </div>
          <RazorpayCheckout amount={total} onSuccess={handlePaymentSuccess} />
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
          