/**
 * Defines the properties for the BackGroundColor component.
 *
 * @interface BackGroundColorProps
 * @property {string} [color] - Optional custom TailwindCSS class string to modify the background's color. Defaults to "bg-[#020617]".
 * @property {React.ReactNode} children - The content to be rendered inside the background component.
 */
export interface BackGroundColorProps {
    children: React.ReactNode
    color?: string
}