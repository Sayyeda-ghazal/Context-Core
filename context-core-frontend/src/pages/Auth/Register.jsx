import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import LeftPanel from '../../Components/auth/LeftPanel';
import RegisterCard from '../../Components/auth/RegisterCard'
import { registerUser } from '../../api/auth';

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  //Step - 1
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  //Common States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = async (e) =>{
    e.preventDefault();
    setError("");

    //Simple Validation First
    if (!fullname || !email || !password || !confirmPassword){
      setError("Please fill all fields");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword){
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (!agreeTerms){
      setError("Please accept Terms and Conditions");
      return;
    }
    setLoading(true);
    try {
      await registerUser({
        fullname,
        email,
        password,
      });
      // Redirect to verification sent page
      window.location.href = '/verification-sent';
    } catch (err) {
      // Handle different error response formats
      const errorMessage = err.response?.data?.detail || 
                           err.response?.data?.message || 
                           err.response?.data?.error || 
                           "Signup failed. Please check your input and try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="h-screen flex">
      <LeftPanel />
      <RegisterCard
        step={step}
        setStep={setStep}
        agreeTerms={agreeTerms}
        setAgreeTerms={setAgreeTerms}
        fullname={fullname}
        setFullname={setFullname}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        loading={loading}
        error={error}
        handleContinue={handleContinue}
      />
    </div>
  )
}
