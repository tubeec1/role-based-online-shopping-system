import React from "react";
import {
  FiShoppingCart,
  FiMail,
  FiPhone,
  FiMapPin,
  FiTwitter,
  FiFacebook,
  FiInstagram,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const quickLinks = [
  { name: "Home", to: "/" },
  { name: "Products", to: "/products" },
  { name: "Cart", to: "/cart" },
  { name: "Checkout", to: "/checkout" },
];

const supportLinks = [
  { name: "Login", to: "/login" },
  { name: "Signup", to: "/signup" },
];

const socialLinks = [
  { icon: FiFacebook, to: "https://www.facebook.com", label: "Facebook" },
  { icon: FiTwitter, to: "https://www.twitter.com", label: "Twitter" },
  { icon: FiInstagram, to: "https://www.instagram.com", label: "Instagram" },
];

let PublicFooter = () => {
  return (
    <footer className="bg-slate-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* BRAND */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-5">
              <FiShoppingCart className="text-orange-500 text-2xl" />
              <span className="text-xl font-bold text-blue-950 tracking-tight">
                ShopEase
              </span>
            </a>

            <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-xs">
              Your one-stop destination for premium products. Quality, style,
              and convenience delivered right to your door.
            </p>

            {/* SOCIAL */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    to={social.to}
                    aria-label={social.label}
                    className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 hover:scale-105"
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-blue-950 font-semibold text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-gray-600 hover:text-orange-500 text-sm transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-blue-950 font-semibold text-sm uppercase tracking-wider mb-5">
              Support
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-gray-600 hover:text-orange-500 text-sm transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-blue-950 font-semibold text-sm uppercase tracking-wider mb-5">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMail className="w-5 h-5 text-orange-500 mt-0.5" />
                <span className="text-gray-600 text-sm">
                  support@shopease.com
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FiPhone className="w-5 h-5 text-orange-500 mt-0.5" />
                <span className="text-gray-600 text-sm">+252 687 196 221</span>
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin className="w-5 h-5 text-orange-500 mt-0.5" />
                <span className="text-gray-600 text-sm">
                  123 Bakara Street, Mogadishu, Somalia
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-200 mt-14 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} ShopEase. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-gray-500 hover:text-orange-500 text-sm transition"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-orange-500 text-sm transition"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
