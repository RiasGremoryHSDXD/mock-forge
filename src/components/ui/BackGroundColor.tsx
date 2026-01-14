import type { BackGroundColorProps } from "../../types/components/ui/Background"


export default function BackGroundColor({
    children,
    color = "bg-[#020617]"
}: BackGroundColorProps) {
    return (
        <div
            className={`${color} w-[100vw] h-[100vh]`}
        >
            {children}
        </div>
    )
}
