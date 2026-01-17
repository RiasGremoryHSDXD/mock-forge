import { useState, useRef, useEffect } from "react";
import UserProfile from "./UserProfile";
import AIChat from "./AIChat";
import LogoutMenu from "./LogoutMenu";

export default function LeftSideBar() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(event.target as Node) &&
                triggerRef.current &&
                !triggerRef.current.contains(event.target as Node)
            ) {
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

    return (
        <div className={`h-[100vh] border-l border-gray-700 flex flex-col items-center py-4 relative transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isChatOpen ? "w-[25vw]" : "w-[4vw]"}`}>
            <UserProfile
                isChatOpen={isChatOpen}
                onToggle={() => setShowLogout(!showLogout)}
                ref={triggerRef}
            />

            {showLogout && (
                <div
                    ref={popoverRef}
                    className="absolute top-4 right-full mr-2 z-50 animate-in fade-in slide-in-from-right-4 duration-200"
                >
                    <LogoutMenu />
                </div>
            )}

            <div className="flex-1 w-full relative overflow-hidden flex flex-col items-center">
                <AIChat isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
            </div>
        </div>
    )
}
