/**
 * Defines the properties for the CardContainer component.
 *
 * @interface CardContainerProps
 * @property {React.ReactNode} children - The content to be rendered inside the card container.
 * @property {string} [cardContainerDesign] - Optional custom TailwindCSS class string to modify the card's visual style.
 */
export interface CardContainerProps {
    children: React.ReactNode;
    cardContainerDesign?: string;
}