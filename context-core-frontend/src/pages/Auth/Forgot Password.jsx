import React, {useState} from "react";
import { forgotPassword } from "../../api/auth";
import formatApiError from "../../api/formatApiError";

export default function ForgotPassword(){
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");

        try {
            const response = await forgotPassword(email);
            setMessage(response.data.message);
            console.log("Forgot Password Request", email);
        } catch (err){
            setError(formatApiError(err, "Something went wrong."))
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-4">Forgot Password</h2>
                <p className="text-sm text-gray-500 text-center mb-6">Enter your email and we’ll send you a reset link.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                    type="email"
                    placeholder="user@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                    <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
                        {loading? "Sending...": "Send Reset Link"}
                    </button>
                </form>
                {message && (
                    <p className="text-green-600 text-sm mt-4 text-center"> {message} </p>
                )}
                { error && (
                    <p className="text-red-600 text-sm mt-4 text-center"> {error} </p>
                )}
            </div>
        </div>
    )
}
