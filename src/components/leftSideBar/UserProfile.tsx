import { forwardRef } from "react";

interface UserProfileProps {
    isChatOpen: boolean;
    onToggle: () => void;
}

const UserProfile = forwardRef<HTMLDivElement, UserProfileProps>(({ isChatOpen, onToggle }, ref) => {
    const photoURL = localStorage.getItem("user_photoURL");

    return (
        <div className={`relative transition-all duration-500 z-50 ${isChatOpen ? "self-end mr-4" : "self-center"}`}>
            {photoURL && (
                <div className="relative" ref={ref}>
                    <img
                        src={photoURL}
                        alt="User Profile"
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggle();
                        }}
                        className="cursor-pointer w-8 h-8 rounded-full object-cover mb-4 border border-gray-600 hover:border-gray-400 transition-colors"
                    />
                </div>
            )}
        </div>
    );
});

export default UserProfile;
