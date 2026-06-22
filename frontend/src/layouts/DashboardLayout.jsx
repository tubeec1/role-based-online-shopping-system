import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "../components/dashboard/Sidebar";

import { getMe } from "../features/auth/authSlice";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const { user, token, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(getMe());
    }
  }, [dispatch, token, user]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (user && user.role_id !== 1 && user.role_id !== 2) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-all duration-300 lg:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      <div className="flex h-full">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className="flex flex-col flex-1 h-full">
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="w-full">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
