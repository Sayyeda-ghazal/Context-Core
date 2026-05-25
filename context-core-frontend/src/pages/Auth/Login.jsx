import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import LoginCard from "../../Components/auth/LoginCard";
import LeftPanel from "../../Components/auth/LeftPanel"
import { loginUser } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import formatApiError from "../../api/formatApiError";

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();

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
      await loginUser({email, password});
      await auth.login();

      // redirect to home page
      navigate("/dashboard/home");
    } catch (err) {
      setError(formatApiError(err, "Invalid password or email. Please try again."));
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
