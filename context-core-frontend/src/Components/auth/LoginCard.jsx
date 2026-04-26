import React from "react";

const LoginCard = ({
  showPassword,
  setShowPassword,
  loading,
  error,
  handleLogin,
  email,
  password,
  setEmail,
  setPassword
}) => {
  return (
    <div className="flex-1 bg-gray-50 flex items-center justify-center">
      
      <div className="w-[420px] bg-white p-10 rounded-2xl shadow-lg border">

        <form onSubmit={handleLogin} className="space-y-4">

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Heading */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Welcome back</h2>
            <p className="text-gray-500">
              Sign in to your ContextCore workspace
            </p>
          </div>

          {/* Email */}
          <div className="text-left">
            <label className="block text-sm text-gray-600">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="text-left">
            <div className="flex justify-between items-center">
              <label className="text-sm text-gray-600">
                Password
              </label>

              <a
                href="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 pr-16 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-blue-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2563EB] text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-3 text-sm text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google
          <button
            type="button"
            className="w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition"
          >
            Continue with Google
          </button> */}

          {/* Footer */}
          <p className="text-sm text-gray-500 text-center mt-6">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Start free →
            </a>
          </p>

        </form>

      </div>

    </div>
  );
};

export default LoginCard;