import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const RAZORPAY_KEY = "YOUR_RAZORPAY_KEY_ID"; // Replace with your Razorpay key

const Checkout = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
    slot: "",
  });
  const [cart, setCart] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    setCart(stored ? JSON.parse(stored) : []);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loadScript = (src) =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handleProceed = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address || !form.pincode || !form.slot) {
      alert("Please fill all fields.");
      return;
    }

    const loaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!loaded) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: RAZORPAY_KEY,
      amount: total * 100,
      currency: "INR",
      name: "FarmNova",
      description: "Order Payment",
      handler: async function (response) {
        try {
          const token = localStorage.getItem("authToken");
          await fetch("/api/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              address: form.address,
              phone: form.phone,
              pincode: form.pincode,
              slot: form.slot,
              items: cart,
              total,
              paymentId: response.razorpay_payment_id,
              paymentStatus: "Paid"
            }),
          });

          localStorage.setItem("orderDetails", JSON.stringify({
            ...form,
            cart,
            total,
            paymentId: response.razorpay_payment_id,
            paymentStatus: "Paid"
          }));

          // Optionally clear cart
          localStorage.removeItem("cart");

          history.push("/order-confirmation");
        } catch {
          alert("Failed to place order.");
        }
      },
      prefill: {
        name: form.name,
        contact: form.phone,
      },
      theme: {
        color: "#22c55e",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white rounded shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      <form className="flex flex-col gap-4 mb-8" onSubmit={handleProceed}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="border rounded px-3 py-2"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className="border rounded px-3 py-2"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <textarea
          name="address"
          placeholder="Delivery Address"
          className="border rounded px-3 py-2"
          value={form.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          className="border rounded px-3 py-2"
          value={form.pincode}
          onChange={handleChange}
          required
          maxLength={6}
        />
        <select
          name="slot"
          className="border rounded px-3 py-2"
          value={form.slot}
          onChange={handleChange}
          required
        >
          <option value="">Select Delivery Slot</option>
          <option value="8am-11am">8am - 11am</option>
          <option value="11am-2pm">11am - 2pm</option>
          <option value="2pm-5pm">2pm - 5pm</option>
          <option value="5pm-8pm">5pm - 8pm</option>
        </select>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
        >
          Proceed to Payment
        </button>
      </form>

      <div>
        <h3 className="text-lg font-bold mb-2">Order Summary</h3>
        <ul className="divide-y mb-4">
          {cart.map((item, idx) => (
            <li key={idx} className="flex justify-between py-2">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>₹{total}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
