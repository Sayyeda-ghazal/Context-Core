import React from "react";

const RegisterCard = ({
  step,
  setStep,
  agreeTerms,
  setAgreeTerms,
  fullname,
  setFullname,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  loading,
  error,
  handleContinue,
}) => {

  // ✅ MUST be declared BEFORE usage
  const getPasswordStrength = (password) => {
    if (password.length < 4) {
      return { text: "Weak", width: "25%", color: "bg-red-400" };
    }

    if (password.length < 8) {
      return { text: "Fair", width: "50%", color: "bg-yellow-400" };
    }

    if (password.length < 12) {
      return { text: "Good", width: "75%", color: "bg-blue-400" };
    }

    return { text: "Strong", width: "100%", color: "bg-green-500" };
  };

  const strength = getPasswordStrength(password);

  return (
    <div className="w-1/2 bg-white flex items-center justify-center px-12">
      <div className="w-full max-w-lg">

        {/* Step Indicator */}
        <div className="flex gap-3 mb-8">
          <div className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium">
            Account
          </div>
          <div className="px-4 py-2 rounded-full bg-gray-200 text-gray-600 text-sm font-medium">
            Workspace
          </div>
          <div className="px-4 py-2 rounded-full bg-gray-200 text-gray-600 text-sm font-medium">
            Plan
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create your Account
        </h1>

        <p className="text-gray-500 mb-8">
          Start your ContextCore workspace in minutes.
        </p>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={handleContinue} className="space-y-5">

            {/* Fullname */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>

              <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Work Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Strength Meter */}
              <div className="mt-2 h-2 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className={`h-full ${strength.color}`}
                  style={{ width: strength.width }}
                />
              </div>

              <p className="text-sm text-gray-500 mt-1">
                Password strength: {strength.text}
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1"
              />

              <p className="text-sm text-gray-600">
                I agree to Terms of Service and Privacy Policy
              </p>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition disabled:opacity-50"
            >
              {loading ? "Please wait..." : "Continue →"}
            </button>

          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="text-center">
            <h2 className="text-2xl font-bold">Workspace Setup</h2>

            <p className="text-gray-500 mt-2">
              Step 2 started successfully
            </p>

            <button
              onClick={() => setStep(1)}
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl"
            >
              Back
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default RegisterCard;