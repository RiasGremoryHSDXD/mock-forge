import type { ButtonProps } from "../types/components/Button"

export default function Button({
    type = "submit",
    buttonContainerDesign = "bg-blue-500/10 hover:bg-blue-500/20 text-blue-100 border border-blue-500/20 font-medium py-2 px-4 rounded-lg backdrop-blur-sm transition-all duration-300 cursor-pointer",
    buttonText,
    onClick,

}: ButtonProps) {
    return (
        <button
            type={type}
            className={buttonContainerDesign}
            style={{ fontFamily: 'Roboto, sans-serif' }}
            onClick={onClick}
        >
            {buttonText}
        </button>
    )
}