import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { clearUserStorage } from "../utils/storage";

export default function LeftSideBar() {
    const photoURL = localStorage.getItem("user_photoURL");
    const userName = localStorage.getItem("user_name");
    const userEmail = localStorage.getItem("user_email");
    const [showLogout, setShowLogout] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setShowLogout(false);
            }
        }

        if (showLogout) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showLogout]);

    const handleLogout = () => {
        clearUserStorage();
        navigate("/");
    };

    return (
        <div className="w-[4vw] h-[100vh] border-l border-gray-700 flex flex-col items-center py-4 relative">
            {photoURL && (
                <div className="relative" ref={popoverRef}>
                    <img
                        src={photoURL}
                        alt="User Profile"
                        onClick={() => setShowLogout(!showLogout)}
                        className="cursor-pointer w-8 h-8 rounded-full object-cover mb-4 border border-gray-600 hover:border-gray-400 transition-colors"
                    />
                    {showLogout && (
                        <div className="absolute top-0 right-full mr-6 w-80 bg-[#1e293b] rounded-2xl shadow-2xl border border-gray-700 overflow-hidden z-50">
                            {/* Header - Email */}
                            <div className="px-4 py-3 text-center border-b border-gray-700/50">
                                <p className="text-sm text-gray-400 truncate">{userEmail}</p>
                            </div>

                            {/* Body - Profile Info */}
                            <div className="flex flex-col items-center p-6 gap-3">
                                <div className="relative">
                                    <img
                                        src={photoURL}
                                        alt="User Profile"
                                        className="w-20 h-20 rounded-full object-cover border-4 border-gray-700"
                                    />
                                </div>
                                <h2 className="text-xl text-white font-medium">Hi, {userName || "User"}!</h2>
                            </div>

                            {/* Footer - Actions */}
                            <div className="flex justify-center p-4 bg-gray-900/50 border-t border-gray-700/50">
                                <button
                                    onClick={handleLogout}
                                    className="cursor-pointer flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                    <LogOut size={18} />
                                    <span>Sign out</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
