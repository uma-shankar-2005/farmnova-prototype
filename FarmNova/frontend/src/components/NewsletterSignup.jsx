import React, { useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      // Remove extra spaces from email before saving
      const cleanEmail = email.trim().toLowerCase();
      await addDoc(collection(db, "subscribers"), {
        email: cleanEmail,
        timestamp: serverTimestamp(),
      });
      toast.success("Subscribed successfully!");
      setEmail("");
    } catch {
      toast.error("Subscription failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <section className="flex flex-col items-center py-8 px-2">
      <h3 className="text-lg font-semibold mb-2">Subscribe to our Newsletter</h3>
      <form className="flex flex-col sm:flex-row gap-2 items-center" onSubmit={handleSubmit}>
        <input
          type="email"
          className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700 transition"
          disabled={loading}
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
    </section>
  );
};

export default NewsletterSignup;
