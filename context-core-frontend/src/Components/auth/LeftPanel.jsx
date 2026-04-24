import React from "react";

const features = [
  "Isolated vector stores",
  "Real-time streaming responses",
  "Usage-based billing",
];

const LeftPanel = () => {
  return (
    <div className="flex-1 bg-[#143B63] text-white flex flex-col justify-between px-20 py-16 h-full">
      
      {/* Top */}
      <div>
        
        {/* Logo */}
        <div className="flex items-center gap-3 mb-20">
          <div className="w-14 h-14 rounded-xl bg-blue-500 flex items-center justify-center text-2xl font-bold">
            CC
          </div>
          <h2 className="text-3xl font-medium">ContextCore</h2>
        </div>

        {/* Heading */}
        <h1 className="text-6xl font-bold leading-tight mb-16">
          Power your <br />
          product with AI <br />
          knowledge
        </h1>

        {/* Features */}
        <div className="space-y-8">
          {features.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-7 h-7 rounded-full bg-white text-[#143B63] flex items-center justify-center font-bold">
                ✓
              </div>
              <span className="text-lg">{item}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom */}
      <p className="text-sm tracking-[4px] uppercase text-gray-300">
        Trusted by 500+ engineering teams globally
      </p>

    </div>
  );
};

export default LeftPanel;