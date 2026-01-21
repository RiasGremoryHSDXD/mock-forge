import type { CardContainerProps } from "../../types/components/modal/CardContainer";

export default function CardContainer({
    children,
    cardContainerDesign = "bg-white rounded-lg p-6 mx-auto",
}: CardContainerProps) {
    return <div className={cardContainerDesign}>{children}</div>;
}