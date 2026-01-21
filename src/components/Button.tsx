import type { ButtonProps } from "../types/components/Button"

export default function Button({
    type = "submit",
    buttonContainerDesign = "bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer",
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