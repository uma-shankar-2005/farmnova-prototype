import React, { useState } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Marketplace", href: "#marketplace" },
  { label: "Subscription", href: "#subscription" },
  { label: "Farmers", href: "#farmers" },
];

const locations = ["Chennai", "Bangalore", "Hyderabad", "Delhi"];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/assets/farmnova-logo.svg" alt="FarmNova" className="h-8 w-auto" />
          <span className="font-extrabold text-green-700 text-xl tracking-tight">FarmNova</span>
        </div>
        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a href={item.href} className="hover:text-green-700 transition border-b-2 border-transparent hover:border-green-600 py-1 px-2">
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a href="/about" className="hover:text-green-700 transition">
              About
            </a>
          </li>
        </ul>
        {/* Location Select & CTA + Hamburger */}
        <div className="flex items-center gap-3">
          <select className="border rounded px-2 py-1 focus:ring-green-400 hidden md:block">
            {locations.map((loc) => (
              <option key={loc}>{loc}</option>
            ))}
          </select>
          <a href="/farmer-login" className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2">
            <FaUser /> Farmer Login
          </a>
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>
      </nav>
      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t shadow px-4 py-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="block py-2 text-gray-700 font-medium hover:text-green-700 transition">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href="/farmer-login" className="block bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition mt-2 flex items-center gap-2">
                <FaUser /> Farmer Login
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;



