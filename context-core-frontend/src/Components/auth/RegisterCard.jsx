import React from 'react'

const RegisterCard =({
    step,
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
    handlContinue,
}) => {
    return(
        <div className='w-1/2 bg-white flex items-center justify-center px-12'>
            <div className='w-full max-w-lg'>
                {/* Step Indicator */}
                <div className='flex gap-3 mb-8'>
                    <div className='px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium'> Account </div>
                    <div className='px-4 py-2 rounded-full bg-gray-200 text-gray-600 text-sm font-medium'> Workspace </div>
                    <div className='px-4 py-2 rounded-full bg-gray-200 text-gray-600 text-sm font-medium'> Plan </div>
                </div>

                {/* Heading */}
                <h1 className='text-3xl font-bold text-gray-900 mb-2'> Create your Account </h1>
                <p className='text-gray-500 mb-8'> Start your ContextCore workspace in minutes. </p>

                {/* Error */}
                {error && (
                    <div className='mb-4 p-3 rounded-lg bg-red-100 text-red-600 text-sm'>
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handlContinue} className='space-y-5'>
                    {/* Fullname */}
                    <div>
                        <label className='block text-sm font-medium mb-2'> FullName </label>
                        <input type='text'
                        placeholder='Enter Your Fullname'
                        value={fullname}
                        onChange={(e)=>setFullname(e.target.value)}
                        className='w-full border rounded-xl px4 py-3 outline-none focus:ring-2 focus:ring-blue-500'></input>
                    </div>
                    {/* Email */}
                    <div>
                        <label className='block text-sm font-medium mb-2'>Work Email</label>
                        <input
                        type='email'
                        placeholder='Enter you email'
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"></input>
                    </div>
                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium mb-2"> Password </label>
                        <input
                        type='Password'
                        placeholder='Create Password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"></input>
                        {/* Strength Meter */}
                        <div className="mt-2 h-2 rounded-full bg-gray-200 overflow-hidden">
                        <div className="w-1/2 h-full bg-yellow-400"></div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                        Password strength: Fair
                        </p>
                    </div>
                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                        Confirm Password
                        </label>
                        <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {/* Checkbox */}
                    <div className="flex items-start gap-3">
                        <input type="checkbox" className="mt-1" />
                        <p className="text-sm text-gray-600">
                        I agree to Terms of Service and Privacy Policy
                        </p>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition"
                    >
                        {loading ? "Please wait..." : "Continue →"}
                    </button>
                    
                </form>
            </div>
        </div>
    )
}

export default RegisterCard;