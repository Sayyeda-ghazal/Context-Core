import React, { useState } from 'react'
import LeftPanel from '../../Components/auth/LeftPanel';
import RegisterCard from '../../Components/auth/RegisterCard'

export default function Register() {
  const [step, setStep] = useState(1);

  //Step - 1
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //Common States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlContinue = async (e) =>{
    e.preventDefault();
    setError("");

    //Simple Validation First
    if (!fullname || !email || !password || !confirmPassword){
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmPassword){
      setError("Passwords do not match.")
      return;
    }

    // Step - 1 Complete Move to Step - 2
    setStep(2);
  };
  
  return (
    <div className='h-screen flex'>
      <LeftPanel/>
      <RegisterCard
      step={step}
      setStep={setStep}
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
      handlContinue={handlContinue}/>
    </div>
  )
}
