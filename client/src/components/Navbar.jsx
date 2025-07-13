import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const [showLogout, setShowLogout] = useState(false);

    const user = localStorage.getItem("user");

    const handleAvatarClick = () => {
        setShowLogout((prev) => !prev);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        toast.success("user logged out successfully...")
        navigate("/login");
    };

    return (
        <div className="relative shadow-2xl mt-2 px-4 py-2 flex items-center justify-between rounded-full w-[90%] bg-violet-600">
            {/* Logo/Title */}
            <h1
                onClick={() => navigate("/")}
                className="cursor-pointer bg-white px-4 py-1 rounded-full shadow-md text-blue-500 font-medium hover:bg-black hover:text-white hover:font-semibold hover:scale-110 transition transform duration-300"
            >
                Appointment
            </h1>

            {/* Right side */}
            <div className="flex items-center gap-4 relative">
                <button
                    onClick={() => navigate("/all-appointments")}
                    className="px-5 py-2 text-sm font-semibold text-white border border-white/30 rounded-xl bg-white/10 backdrop-blur-md shadow-lg hover:bg-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
                >
                    All
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
