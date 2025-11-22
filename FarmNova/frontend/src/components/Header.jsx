import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import logo from '../assets/logo.png'; // Make sure logo.png exists at frontend/src/assets/logo.png
import GlobalSearchBar from './GlobalSearchBar';

const navItems = [
  { name: "Home", to: "/" },
  { name: "Marketplace", to: "/marketplace" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" }
];

const Header = () => {
  const [dark, setDark] = useState(() => {
    // Persist dark mode preference in localStorage
    const stored = localStorage.getItem("theme");
    return stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const history = useHistory();

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.reduce((sum, item) => sum + (item.quantity || 1), 0));
    };
    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  return (
    <header className="bg-white dark:bg-gray-900 shadow border-b sticky top-0 z-50 transition-shadow" role="banner">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3" aria-label="Main navigation">
        <div className="flex items-center gap-2">
          {/* Logo */}
          <img src={logo} alt="FarmNova Logo" className="h-8 w-8 object-contain" />
          <span className="font-bold text-xl text-green-700 dark:text-green-300">
            FarmNova
          </span>
        </div>
        <div className="flex-1 w-full md:w-auto md:mx-8">
          <GlobalSearchBar />
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-4 items-center">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `hover:text-green-700 font-medium px-2 py-1 rounded transition ${
                    isActive ? "text-green-700 border-b-2 border-green-700 font-bold" : ""
                  }`
                }
                {...(item.to === '/' ? { end: true } : {})}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink to="/products" className="font-medium px-2 py-1 rounded hover:text-green-700">
              Product Listing
            </NavLink>
          </li>
          <li>
            <NavLink to="/farmer-upload" className="font-medium px-2 py-1 rounded hover:text-green-700">
              Farmer Upload
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin-approval" className="font-medium px-2 py-1 rounded hover:text-green-700">
              Admin Approval
            </NavLink>
          </li>
        </ul>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Hamburger Menu */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-1 w-6 bg-green-700 rounded transition-all duration-200 ${
                mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block h-1 w-6 bg-green-700 rounded my-1 transition-all duration-200 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block h-1 w-6 bg-green-700 rounded transition-all duration-200 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            aria-label="Toggle dark mode"
            className="ml-4 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            onClick={() => setDark(d => !d)}
            type="button"
          >
            {dark ? "🌙" : "☀️"}
          </button>

          {/* Farmer Login */}
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold flex items-center gap-2 transition"
            onClick={() => history.push('/farmer-login')}
          >
            <span className="material-icons">person</span>
            Farmer Login
          </button>

          {/* Cart Icon with Badge */}
          <NavLink to="/cart" className="relative flex items-center">
            <span className="material-icons">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full px-2 py-0.5">
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <ul className="flex flex-col gap-2 px-4 py-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `block py-2 font-medium hover:text-green-700 ${
                      isActive ? "text-green-700 font-bold" : ""
                    }`
                  }
                  end={item.to === "/"}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
