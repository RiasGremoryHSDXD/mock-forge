import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, LayoutDashboard, Sheet, FileText } from "lucide-react"


interface SideBarProps {
    pageName: string;
}

export default function SideBar({ pageName = "Dashboard" }: SideBarProps) {
    const [isSideBarOpen, setIsSideBarOpen] = useState(() => {
        const saved = localStorage.getItem("isSideBarOpen");
        return saved !== null ? JSON.parse(saved) : true;
    });

    useEffect(() => {
        localStorage.setItem("isSideBarOpen", JSON.stringify(isSideBarOpen));
    }, [isSideBarOpen]);



    const menuItems = [
        { name: "Dashboard", icon: LayoutDashboard, path: "/home" },
        { name: "Schema", icon: Sheet, path: "/schema" },
        { name: "Template", icon: FileText, path: "/template" },
    ];

    return (
        <div
            className={`border-r border-gray-700 h-[100vh] transition-all duration-300 ease-in-out shrink-0 ${isSideBarOpen ? "w-64" : "w-20"}`}
        >

            <div
                className={`border-b border-gray-700 h-[10vh] flex items-center justify-between transition-all duration-300 ${isSideBarOpen ? "p-4" : "px-2"}`}
            >
                <div className="flex items-center">
                    <h1
                        className={`text-white text-xl font-semibold transition-all duration-300 overflow-hidden whitespace-nowrap 
                        ${isSideBarOpen ? "max-w-[200px] opacity-100" : "max-w-0 opacity-0"}`}
                    >
                        {pageName}
                    </h1>
                    <span
                        className={`text-white text-xl font-bold bg-gray-800 rounded-md w-8 h-8 flex items-center justify-center transition-all duration-300
                        ${!isSideBarOpen ? "opacity-100 scale-100" : "opacity-0 scale-0 hidden"}`}
                    >
                        {pageName.charAt(0)}
                    </span>
                </div>

                {
                    isSideBarOpen ?
                        (
                            <ChevronLeft onClick={() => { setIsSideBarOpen(false) }} className="cursor-pointer w-7 h-7 text-white hover:text-gray-300 transition-colors" />
                        ) :
                        (
                            <ChevronRight onClick={() => { setIsSideBarOpen(true) }} className="cursor-pointer w-7 h-7 text-white hover:text-gray-300 transition-colors" />
                        )
                }
            </div>

            <div className="flex flex-col h-[90vh] pt-8 gap-6">
                {menuItems.map((item) => (
                    <Link
                        to={item.path}
                        key={item.name}
                        className={`flex items-center p-3 mx-2 rounded-xl cursor-pointer transition-all duration-300 group
                            ${isSideBarOpen ? "justify-start px-4" : "justify-center"}
                            hover:bg-gray-800 hover:shadow-lg hover:translate-x-1
                        `}
                    >
                        <item.icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300 min-w-6" />
                        <span
                            className={`ml-4 font-medium text-lg text-gray-400 group-hover:text-white transition-all duration-300 overflow-hidden whitespace-nowrap
                                ${isSideBarOpen ? "max-w-[150px] opacity-100" : "max-w-0 opacity-0"}
                            `}
                        >
                            {item.name}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    )
}
