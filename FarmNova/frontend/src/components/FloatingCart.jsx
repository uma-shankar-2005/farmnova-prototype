import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";

const FloatingCart = ({ count, open, onOpen, onClose, children }) => (
  <>
    <button
      className="fixed bottom-6 right-6 z-50 bg-green-600 text-white rounded-full p-4 shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
      aria-label="Open cart"
      onClick={onOpen}
    >
      <FaShoppingCart className="text-2xl" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
          {count}
        </span>
      )}
    </button>
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed top-0 right-0 w-full max-w-xs h-full bg-white dark:bg-gray-900 shadow-lg z-50 flex flex-col"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="self-end m-4 text-gray-400 hover:text-red-500 text-xl focus:outline-none focus:ring-2 focus:ring-red-400"
            onClick={onClose}
            aria-label="Close cart"
          >
            &times;
          </button>
          <div className="flex-1 overflow-y-auto px-4">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </>
);

export default FloatingCart;
