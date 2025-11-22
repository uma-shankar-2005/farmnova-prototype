import React from "react";
import { FaBoxOpen, FaShoppingBag, FaHeart, FaCog, FaListAlt, FaUser } from "react-icons/fa";

const consumerLinks = [
  { name: "Dashboard", icon: <FaUser />, active: false },
  { name: "Shop Produce", icon: <FaShoppingBag />, active: true },
  { name: "Weekly Subscription", icon: <FaBoxOpen />, active: false },
  { name: "My Orders", icon: <FaListAlt />, active: false },
  { name: "Wishlist", icon: <FaHeart />, active: false },
  { name: "Settings", icon: <FaCog />, active: false },
];

const Sidebar = ({ title = "Consumer Hub", links = consumerLinks }) => (
  <aside className="bg-green-50 min-h-screen w-64 p-6 flex flex-col shadow-md">
    <div className="text-xl font-bold text-green-600 mb-8">{title}</div>
    <nav className="flex-1">
      <ul className="space-y-2">
        {links.map(link => (
          <li key={link.name}>
            <button
              type="button"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                link.active
                  ? "bg-green-300/70 text-green-900 font-semibold"
                  : "hover:bg-green-100 text-gray-700"
              }`}
            >
              <span>{link.icon}</span>
              <span>{link.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
