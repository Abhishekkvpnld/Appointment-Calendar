import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useChangeTheme } from "../context/ThemeContext";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";

const Navbar = () => {

    const navigate = useNavigate();
    const [showLogout, setShowLogout] = useState(false);
    const { darkTheme, setDarkTheme } = useChangeTheme();

    console.log(darkTheme)

    const user = localStorage.getItem("user");

    const handleAvatarClick = () => {
        setShowLogout((prev) => !prev);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        toast.success("user logged out successfully...")
        navigate("/login");
    };

    const handleThemeChange = () => {
        setDarkTheme(theme => !theme)
    }

    return (
        <div className="relative shadow-2xl mt-2 px-4 py-2 flex items-center justify-between rounded-full w-[100%] bg-violet-600">
            {/* Logo/Title */}
            <img
                src="/icon.png"
                onClick={() => navigate("/")}
                className="cursor-pointer bg-white w-10 h-10 rounded-full shadow-md text-blue-500 font-medium hover:bg-black hover:text-white hover:font-semibold hover:scale-110 transition transform duration-300"
            />

            {/* Right side */}
            <div className="flex items-center gap-4 relative">
                <div onClick={handleThemeChange} className={`border-2 rounded-full p-0.5 w-8 h-8 flex items-center justify-center cursor-pointer hover:scale-110 transition bg-gray-200 hover:bg-white border-white`}>
                    {
                        darkTheme ? <MdDarkMode color="black" /> : <MdOutlineDarkMode />
                    }
                </div>
                <button
                    onClick={() => navigate("/all-appointments")}
                    className="flex items-center gap-2 px-5 py-2 cursor-pointer text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
                >
                    All Appointments
                </button>


                {user ? (
                    <div className="relative">
                        <div
                            onClick={handleAvatarClick}
                            className="w-10 h-10 flex items-center justify-center bg-white text-blue-600 font-bold rounded-full cursor-pointer hover:scale-110 transition"
                        >
                            AK
                        </div>

                        {showLogout && (
                            <div
                                onClick={handleLogout}
                                className="absolute right-0 mt-2 px-5 py-2 text-sm font-semibold text-red-600 cursor-pointer
                  rounded-xl border border-white/30 shadow-xl
                  backdrop-blur-lg bg-white/20
                  hover:bg-white/30 hover:text-red-700
                  transition-all duration-300 ease-in-out animate-fade-in"
                            >
                                Logout
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={() => navigate("/login")}
                        className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-full shadow-md 
              hover:bg-black hover:text-white hover:scale-105 transition duration-300"
                    >
                        Login
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
