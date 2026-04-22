import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiShoppingCart,
} from "react-icons/fi";

let Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Enter a valid email address");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-blue-950 text-white relative">
          <div className="absolute top-10 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-10">
              <FiShoppingCart className="text-orange-500 text-3xl" />
              <span className="text-2xl font-bold">ShopEase</span>
            </div>

            <h2 className="text-4xl font-extrabold leading-tight mb-4">
              Welcome back 👋
            </h2>

            <p className="text-blue-200 text-lg max-w-md">
              Login to access your account, track orders, and explore exclusive
              deals.
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1521334884684-d80222895322?q=80&w=1000&auto=format&fit=crop"
            alt=""
            className="rounded-2xl mt-10 object-cover h-64 opacity-80"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          {/* MOBILE LOGO */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <FiShoppingCart className="text-orange-500 text-2xl" />
              <span className="text-xl font-bold text-blue-950">ShopEase</span>
            </div>
          </div>

          {/* HEADER */}
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-3xl font-bold text-blue-950">Sign In</h1>
            <p className="text-gray-500 mt-2">
              Welcome back! Please enter your details
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Email</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  autoFocus
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* OPTIONS */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="accent-orange-500" />
                Remember me
              </label>

              <a
                href="/forgot-password"
                className="text-orange-500 font-medium hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* BUTTON */}
            <button
              disabled={loading || !email || !password}
              className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition shadow-md disabled:opacity-60 flex justify-center items-center"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* SOCIAL */}
          <div className="grid grid-cols-2 gap-4">
            <button className="border rounded-xl py-3 text-sm hover:bg-gray-50">
              Google
            </button>
            <button className="border rounded-xl py-3 text-sm hover:bg-gray-50">
              Facebook
            </button>
          </div>

          {/* SIGNUP */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-orange-500 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
