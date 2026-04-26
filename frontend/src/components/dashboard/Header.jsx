import React from "react";
import { FiMenu, FiBell, FiSearch } from "react-icons/fi";

export default function Header({ setIsOpen }) {
  return (
    <header className="h-[70px] px-4 sm:px-6 lg:px-8 flex items-center justify-between bg-white border-b border-gray-200">
      {/* LEFT */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* HAMBURGER (ONLY MOBILE) */}
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-orange-500 transition"
        >
          <FiMenu className="w-6 h-6" />
        </button>

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
            M
          </div>
          <h1 className="text-base sm:text-lg font-semibold text-[#0B1C3F] whitespace-nowrap">
            Miro Market
          </h1>
        </div>
      </div>

      {/* SEARCH (DESKTOP ONLY) */}
      <div className="hidden lg:flex flex-1 justify-center px-6">
        <div className="relative w-full max-w-md">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products, orders..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* SEARCH ICON (ONLY MOBILE/TABLET) */}
        <button className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-orange-500 transition">
          <FiSearch className="w-5 h-5" />
        </button>

        {/* NOTIFICATIONS */}
        <button className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-orange-500 transition">
          <FiBell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        {/* USER */}
        <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-gray-200">
          <div className="w-9 h-9 bg-[#0B1C3F] rounded-lg flex items-center justify-center text-white font-bold text-sm">
            A
          </div>

          {/* NAME ONLY ON >= SM */}
          <div className="hidden sm:block leading-tight">
            <p className="text-sm font-semibold text-[#0B1C3F]">Admin</p>
            <p className="text-xs text-gray-400">Manager</p>
          </div>
        </div>
      </div>
    </header>
  );
}
