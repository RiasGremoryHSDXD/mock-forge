export interface ButtonProps {
    type?: "button" | "submit" | "reset"
    buttonContainerDesign?: string
    buttonText: string
    onClick?: () => void
}