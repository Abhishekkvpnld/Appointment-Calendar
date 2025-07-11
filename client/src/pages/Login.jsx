
import { useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [form, setForm] = useState({ email: "staff@clinic.com", password: "123456" });
    const navigate = useNavigate()

    const validate = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!form?.email || !form?.password) {
            toast.error("All fields are required.");
            return false;
        }

        if (!emailRegex.test(form.email)) {
            toast.error("Invalid email format.");
            return false;
        }

        if (form.password.length < 6) {
            toast.error("Password must be at least 6 characters.");
            return false;
        }

        return true;
    };


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        if (form.email === "staff@clinic.com" && form.password === "123456") {
            localStorage.setItem("user", JSON.stringify(form));
            toast.success("Login successful!");
            navigate("/");
        } else {
            toast.error("Invalid credentials");
        }
    };


    return (
        <div className="min-h-screen flex flex-col gap-4 items-center bg-gray-100">

            <Navbar />

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Login
                </h2>

                <div className="mb-4">
                    <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="user@gmail.com"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="enter password..."
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Log In
                </button>
            </form>
        </div>
    );
};

export default Login;
