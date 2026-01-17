import { forwardRef } from "react";

interface UserProfileProps {
    isChatOpen: boolean;
    onToggle: () => void;
}

const UserProfile = forwardRef<HTMLDivElement, UserProfileProps>(({ isChatOpen, onToggle }, ref) => {
    const photoURL = localStorage.getItem("user_photoURL");
    const userName = localStorage.getItem("user_name");
    const initials = userName ? userName.charAt(0).toUpperCase() : "U";

    return (
        <div className={`relative transition-all duration-500 z-50 ${isChatOpen ? "self-end mr-4" : "self-center"}`}>
            <div className="relative group cursor-pointer" ref={ref} onClick={(e) => {
                e.stopPropagation();
                onToggle();
            }}>
                {/* Rotating Gradient Border Container */}
                <div className="relative w-11 h-11 flex items-center justify-center">
                    {/* Animated Gradient Background */}
                    <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow"></div>

                    {/* Google Colors Gradient Ring - Always visible but subtle, brighter on hover */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#4285F4] via-[#DB4437] to-[#0F9D58] blur-[2px] opacity-40 group-hover:opacity-100 group-hover:blur-md transition-all duration-500"></div>

                    {/* Profile Image Container */}
                    <div className="relative w-[calc(100%-4px)] h-[calc(100%-4px)] rounded-full overflow-hidden border border-gray-700/50 bg-[#0f172a] z-10 group-hover:scale-95 transition-transform duration-300">
                        {photoURL ? (
                            <img
                                src={photoURL}
                                alt="User Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                                {initials}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default UserProfile;
