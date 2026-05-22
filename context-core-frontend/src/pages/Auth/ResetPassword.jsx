import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { resetPassword } from "../../api/auth";

export default function ResettPassword(){
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [newPassword, setNewPassword] = useState("");
    const [confirPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        console.log("RESET PASSWORD SUBMIT CLICKED");
        e.preventDefault();
        setMessage("");
        setError("");

        if (newPassword !== confirPassword){
            setError("Passwords donot match!");
            return;
        }

        setLoading(true);

        try{
            const response = await resetPassword({
                token,
                new_password: newPassword
            });
            setMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "Something Went Wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-4">Reset Password</h2>
            <p className="text-sm text-gray-500 text-center mb-6"> Enter your password below </p>
            <form
            onSubmit={handleSubmit}
            className="space-y-4">
                <input
                type="password"
                placeholder="Enter Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required/>
                <input
                type="password"
                placeholder="Enter Confirm Password"
                value={confirPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required/>
                <button
                type="submit"
                disabled={loading}
                className="
                            w-full
                            bg-blue-600
                            text-white
                            py-2
                            rounded-lg
                            hover:bg-blue-700
                            disabled:opacity-50
                        ">{loading? "Reseting...." : "Reset Password" }</button>
            </form>
            {message && (
                <p className="text-green-600 text-sm mt-4 text-center"> {message} </p>
            )}
            {error && (
                <p className=" text-red-600 text-sm mt-4 text-center"> {error} </p>
            )}
        </div>
    </div>
);

}

