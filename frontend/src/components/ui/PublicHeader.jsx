import React, { useState, useEffect } from "react";
import { FiMenu, FiX, FiShoppingCart, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

let PublicHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-slate-900 transition-shadow duration-300 ${isScrolled ? "shadow-lg shadow-black/30" : ""}`}
    >
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-slate-900 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <FiShoppingCart className="text-orange-500 text-2xl" />
            <span className="text-white text-xl font-bold tracking-tight">
              ShopEase
            </span>
          </div>
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            className="text-white hover:text-orange-500 transition-colors duration-300"
          >
            <FiX className="text-2xl" />
          </button>
        </div>
        <nav className="p-6">
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                onClick={closeMenu}
                className="block text-orange-500 text-lg font-medium border-b-2 border-orange-500 pb-1 w-fit transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                onClick={closeMenu}
                className="block text-white/80 text-lg font-medium hover:text-orange-500 transition-colors duration-300"
              >
                Products
              </Link>
            </li>
            <li className="pt-6 mt-6 border-t border-slate-700">
              <Link
                to="/login"
                href="#"
                onClick={closeMenu}
                className="block text-white/80 text-lg font-medium hover:text-orange-500 transition-colors duration-300"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                onClick={closeMenu}
                className="block mt-2 text-center bg-orange-500 text-white text-lg font-medium py-2.5 rounded-md hover:bg-orange-600 transition-colors duration-300"
              >
                Signup
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <FiShoppingCart className="text-orange-500 text-2xl" />
          <span className="text-white text-xl font-bold tracking-tight">
            ShopEase
          </span>
        </a>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            <li>
              <Link
                to="/"
                className="text-orange-500 font-medium border-b-2 border-orange-500 pb-1 transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="text-white/80 hover:text-orange-500 font-medium transition-colors duration-300"
              >
                Products
              </Link>
            </li>
          </ul>
        </nav>

        <div className="hidden md:flex items-center gap-5">
          <button
            aria-label="Shopping cart"
            className="relative text-white/80 hover:text-orange-500 transition-colors duration-300"
          >
            <FiShoppingCart className="text-xl" />
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </button>
          <button
            aria-label="User account"
            className="text-white/80 hover:text-orange-500 transition-colors duration-300"
          >
            <FiUser className="text-xl" />
          </button>
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-medium text-white border border-white/30 rounded-md hover:border-orange-500 hover:text-orange-500 transition-all duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 transition-colors duration-300"
          >
            Signup
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          className="md:hidden text-white hover:text-orange-500 transition-colors duration-300"
        >
          <FiMenu className="text-2xl" />
        </button>
      </div>
    </header>
  );
};

export default PublicHeader;
