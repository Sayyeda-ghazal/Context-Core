import React, { useState } from "react";
import LoginCard from "../../Components/auth/LoginCard";
import LeftPanel from "../../Components/auth/LeftPanel"
import { loginUser } from "../../api/auth";

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("🔥 LOGIN CLICKED");

    setLoading(true);
    setError("");

    try {
      const data = await loginUser(email, password)
      // store token
      localStorage.setItem("token", data.token);

      // redirect(temporary)
      window.location.href = "/";
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "Invalid paswword or email. Please try again."
      );
      } finally {
        setLoading(false);
    }
  };

  return (
    <div className="h-screen flex">
      <LeftPanel />

      <LoginCard
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      loading={loading}
      error={error}
      handleLogin={handleLogin}

      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
    />
    </div>
  );
};

export default Login;