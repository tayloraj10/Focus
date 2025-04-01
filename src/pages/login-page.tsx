import { supabaseConnection } from '../supabase/supabaseClient';
import React from "react";
import { useNavigate } from "react-router-dom";


const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = React.useState<string | null>(null);

    const handleLogin = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement; }) => {
        event.preventDefault()
        if (validateForm()) {
            const { error: loginError } = await supabaseConnection.auth.signInWithPassword({
                email: (document.getElementById("email") as HTMLInputElement).value.trim(),
                password: (document.getElementById("password") as HTMLInputElement).value.trim(),
            });

            if (loginError) {
                setError(loginError.message);
            } else {
                navigate("/")
            }
        }
    }

    const validateForm = () => {
        const email = (document.getElementById("email") as HTMLInputElement).value.trim();
        const password = (document.getElementById("password") as HTMLInputElement).value.trim();

        if (!email || !password) {
            setError("All fields are required.");
            return false;
        }
        return true;
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-gray-800">Login</h1>
                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your email"
                            style={{ color: "black" }}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your password"
                            style={{ color: "black" }}
                        />
                    </div>
                    <div className="text-red-500 text-sm font-bold" id="error-message">{error}</div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-blue-600 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;