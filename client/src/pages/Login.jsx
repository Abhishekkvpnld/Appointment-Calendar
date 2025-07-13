import { useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useChangeTheme } from "../context/ThemeContext";

const Login = () => {
  const [form, setForm] = useState({ email: "staff@clinic.com", password: "123456" });
  const navigate = useNavigate();
  const { darkTheme } = useChangeTheme();

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
    <div className={`min-h-screen flex flex-col gap-4 items-center ${darkTheme ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <Navbar />

      <form
        onSubmit={handleSubmit}
        className={`p-8 rounded-2xl shadow-xl w-full max-w-sm ${
          darkTheme ? "bg-gray-800 text-white" : "bg-white"
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            placeholder="user@gmail.com"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg border ${
              darkTheme
                ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-400"
                : "bg-white text-gray-800 border-gray-300 focus:ring-blue-400"
            } focus:outline-none focus:ring-2`}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            placeholder="enter password..."
            name="password"
            value={form.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg border ${
              darkTheme
                ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-400"
                : "bg-white text-gray-800 border-gray-300 focus:ring-blue-400"
            } focus:outline-none focus:ring-2`}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
