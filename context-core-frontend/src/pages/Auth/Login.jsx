import React from "react";

const Login = () => {
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
          
          <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
          <p className="text-gray-500 mb-6">
            Sign in to your ContextCore workspace
          </p>

          {/* Placeholder for now */}
          <div className="text-gray-400 text-center py-10">
            Login Form Coming Next
          </div>

        </div>
      </div>

    </div>
  );
};

export default Login;