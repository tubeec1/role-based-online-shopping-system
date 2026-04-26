import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      {/* OVERLAY (MOBILE) */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-all duration-300 lg:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* MAIN LAYOUT */}
      <div className="flex h-full">
        {/* SIDEBAR */}
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} userRole="admin" />

        {/* RIGHT SIDE */}
        <div className="flex flex-col flex-1 h-full">
          {/* HEADER */}
          <Header setIsOpen={setIsOpen} />

          {/* CONTENT */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {/* REMOVE max-w-7xl ❗ */}
            <div className="w-full">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
