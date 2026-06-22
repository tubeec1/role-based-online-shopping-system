import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FiHome,
  FiBox,
  FiLayers,
  FiShoppingCart,
  FiUsers,
  FiBarChart2,
  FiUser,
  FiLogOut,
  FiX,
  FiShield,
} from "react-icons/fi";

import { logout } from "../../features/auth/authSlice";

export default function Sidebar({ isOpen, setIsOpen }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const roleId = user?.role_id;

  const adminLinks = [
    {
      name: "Dashboard",
      icon: FiHome,
      path: "/dashboard",
    },
    {
      name: "Categories",
      icon: FiLayers,
      path: "/dashboard/categories",
    },
    {
      name: "Products",
      icon: FiBox,
      path: "/dashboard/products",
    },
    {
      name: "Orders",
      icon: FiShoppingCart,
      path: "/dashboard/orders",
    },
    {
      name: "Customers",
      icon: FiUsers,
      path: "/dashboard/customers",
    },
    {
      name: "Staff",
      icon: FiShield,
      path: "/dashboard/staff",
    },
    {
      name: "Reports",
      icon: FiBarChart2,
      path: "/dashboard/reports",
    },
    {
      name: "Profile",
      icon: FiUser,
      path: "/dashboard/profile",
    },
  ];

  const staffLinks = [
    {
      name: "Dashboard",
      icon: FiHome,
      path: "/dashboard",
    },
    {
      name: "Categories",
      icon: FiLayers,
      path: "/dashboard/categories",
    },
    {
      name: "Products",
      icon: FiBox,
      path: "/dashboard/products",
    },
    {
      name: "Orders",
      icon: FiShoppingCart,
      path: "/dashboard/orders",
    },
    {
      name: "Profile",
      icon: FiUser,
      path: "/dashboard/profile",
    },
  ];

  const links = roleId === 1 ? adminLinks : staffLinks;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <aside
      className={`
        fixed lg:static top-0 left-0 z-50
        h-full w-[280px]
        bg-slate-950
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="h-16 border-b border-white/10 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-orange-500 flex items-center justify-center font-bold text-white shadow-lg">
              M
            </div>

            <div>
              <h2 className="text-white font-bold">Miro Market</h2>

              <p className="text-xs text-gray-400">
                {roleId === 1 ? "Administrator" : "Staff"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-white"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* User */}
        <div className="px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img
              src={
                user?.profile_image
                  ? `http://localhost/online-shopping-system/backend/public/${user.profile_image}`
                  : `https://ui-avatars.com/api/?name=${user?.full_name}`
              }
              alt={user?.full_name}
              className="w-12 h-12 rounded-full object-cover border-2 border-orange-500"
            />

            <div>
              <h4 className="text-white font-semibold">{user?.full_name}</h4>

              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-5">
          <p className="text-xs uppercase text-gray-500 tracking-wider px-3 mb-4">
            Main Menu
          </p>

          <div className="space-y-2">
            {links.map((link) => {
              const Icon = link.icon;

              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end={link.path === "/dashboard"}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                      isActive
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`
                  }
                >
                  <Icon size={20} />

                  <span>{link.name}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Logout */}
        <div className="border-t border-white/10 p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition"
          >
            <FiLogOut size={20} />

            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
