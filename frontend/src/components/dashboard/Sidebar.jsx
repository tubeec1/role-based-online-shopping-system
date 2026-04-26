import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FiHome,
  FiBox,
  FiLayers,
  FiShoppingCart,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiUser,
  FiLogOut,
  FiX,
  FiShoppingBag,
} from "react-icons/fi";

const navConfig = {
  admin: [
    { name: "Dashboard", icon: FiHome, path: "/dashboard" },
    { name: "Products", icon: FiBox, path: "/dashboard/products" },
    { name: "Categories", icon: FiLayers, path: "/dashboard/categories" },
    { name: "Orders", icon: FiShoppingCart, path: "/dashboard/orders" },
    { name: "Users", icon: FiUsers, path: "/dashboard/users" },
    { name: "Reports", icon: FiBarChart2, path: "/dashboard/reports" },
    { name: "Settings", icon: FiSettings, path: "/dashboard/settings" },
  ],
  staff: [
    { name: "Dashboard", icon: FiHome, path: "/dashboard" },
    { name: "Orders", icon: FiShoppingCart, path: "/dashboard/orders" },
    { name: "Products", icon: FiBox, path: "/dashboard/products" },
    { name: "Customers", icon: FiUsers, path: "/dashboard/customers" },
  ],
  customer: [
    { name: "Dashboard", icon: FiHome, path: "/dashboard" },
    { name: "My Orders", icon: FiShoppingCart, path: "/dashboard/my-orders" },
    { name: "Cart", icon: FiShoppingBag, path: "/cart" },
    { name: "Profile", icon: FiUser, path: "/dashboard/profile" },
  ],
};

export default function Sidebar({ userRole = "staff", isOpen, setIsOpen }) {
  const location = useLocation();
  const links = navConfig[userRole];

  return (
    <aside
      className={`
        fixed lg:static top-0 left-0 z-50
        h-full w-[260px]
        bg-[#0B1C3F]
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      <div className="flex flex-col h-full">
        {/* HEADER */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
              M
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              Miro Market
            </span>
          </div>

          {/* CLOSE BTN (MOBILE) */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-white/70 hover:text-white transition"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
          <p className="px-3 text-xs text-white/30 uppercase tracking-widest mb-3">
            Navigation
          </p>

          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === "/dashboard"} // 🔥 important
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                {link.name}
              </NavLink>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => {
              setIsOpen(false);
              // TODO: logout logic here
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200"
          >
            <FiLogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
