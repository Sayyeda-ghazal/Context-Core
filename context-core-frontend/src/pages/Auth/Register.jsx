import React, { useState } from 'react'
import LeftPanel from '../../Components/auth/LeftPanel';
import RegisterCard from '../../Components/auth/RegisterCard'
import { registerUser } from '../../api/auth';

export default function Register() {
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
    setLoading(true);

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
    try {
      await registerUser({
        fullname,
        email,
        password,
      });
      // Step - 1 Complete Move to Step - 2
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Signup Failed")
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className='h-screen flex'>
      <LeftPanel/>
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
      handleContinue={handleContinue}/>
    </div>
  )
}
