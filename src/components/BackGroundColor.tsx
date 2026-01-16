import type { BackgroundColorProps } from "../types/components/ui/Background"


export default function BackGroundColor({
    children,
    color = "bg-[#020617]"
}: BackgroundColorProps) {
    return (
        <div
            className={`${color} w-[100vw] h-[100vh]`}
        >
            {children}
        </div>
    )
}
