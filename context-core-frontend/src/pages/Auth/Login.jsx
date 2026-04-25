import React , {useState} from "react";

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setloading(true);

    setTimeout(()=>{
      setloading(false);
      alert("Login API will come here");

    setError("Inavlid Email or password. Please Try again!")
    }, 2000);

  };

  return (
    <div className="h-screen flex">
        
        {/* Left Side */}
      <div className="flex-1 bg-[#1A3C5E] text-white flex items-center justify-center">
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center font-bold text-xl">
              CC
            </div>
            <h1 className="text-2xl font-semibold">ContextCore</h1>
          </div>

          {/* Heading */}
          <h2 className="text-5xl font-bold leading-tight mb-10">
            Power your <br />
            product with AI <br />
            knowledge
          </h2>

          {/* Features */}
          <div className="space-y-4">
            <p>✓ Isolated vector stores</p>
            <p>✓ Real-time streaming responses</p>
            <p>✓ Usage-based billing</p>
          </div>

          {/* Bottom */}
        <p className="text-sm opacity-70">
          Trusted by 500+ engineering teams globally
        </p>

        </div> 
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 bg-gray-50 flex items-center justify-center">
        <div className="w-[420px] bg-white p-10 rounded-2xl shadow-lg border">
        

          {/* Placeholder for now */}
          <div className="text-gray-400 text-center py-10">
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Heading */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Welcome back</h2>
              <p className="text-gray-500">
                Sign in to your ContextCore workspace
              </p>
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="text-left">
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="text-left">
              <div className="flex justify-between items-center">
                <label className="text-sm text-gray-600">Password</label>
                <a 
                href="/forgot-password"
                className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
              </div>
              <div className="relative mt-1">
                <input
                type={showPassword ? "text": "password"}
                placeholder="••••••••"
                className="w-full p-3 pr-16 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* Button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
              {showPassword ? "Hide": "Show"}
            </button>
              </div>  
            </div>
            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2563EB] text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "Signing in ...": "Sign in"}
            </button>
          </form>
          </div>
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-3 text-sm text-gray-400"> or </span>
            <div className=" flex-1 h-px bg-gray-200"></div>
          </div>
          <div>
            <button
            type="button"
            className="w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition font-medium"> Continue with Google</button>
            <p className="text-sm text-gray-500 text-center mt-6">
              Don't have an account?{""}
              <a
              href="/register"
              className="text-blue-600 font-medium hover:underline"> Start free → </a>
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Login;