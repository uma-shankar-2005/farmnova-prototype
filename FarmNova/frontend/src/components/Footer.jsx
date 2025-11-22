import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-gray-900 text-white pt-10 pb-4">
    <div className="border-t border-gray-700 mb-8"></div>
    <div className="container mx-auto flex flex-col md:flex-row justify-between gap-8 px-4">
      <div>
        <h4 className="font-bold mb-2">Links</h4>
        <ul>
          <li>
            <a href="/marketplace" className="hover:underline">
              Marketplace
            </a>
          </li>
          <li>
            <a href="/subscription" className="hover:underline">
              Subscription
            </a>
          </li>
          <li>
            <a href="/farmers" className="hover:underline">
              Farmers
            </a>
          </li>
          <li>
            <a href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/terms" className="hover:underline">
              Terms
            </a>
          </li>
        </ul>
      </div>
      <div>
        <div className="font-bold text-lg mb-3">Contact</div>
        <ul className="space-y-1">
          <li>
            Email:
            <a
              href="mailto:info@farmnova.com"
              className="hover:underline"
            >
              info@farmnova.com
            </a>
          </li>
          <li>
            Phone:
            <a href="tel:+911234567890" className="hover:underline">
              +91 12345 67890
            </a>
          </li>
        </ul>
      </div>
      <div>
        <div className="font-bold text-lg mb-3">Social</div>
        <div className="flex gap-4 mt-2">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400"
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </div>
    <div className="text-center text-xs text-gray-400 mt-8">
      &copy; {new Date().getFullYear()} FarmNova. All rights reserved.
    </div>
  </footer>
);

export default Footer;
