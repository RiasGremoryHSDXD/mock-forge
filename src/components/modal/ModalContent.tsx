import FullScreenOverlay from "../modal/FullScreenOverlay"
import CardContainer from "../modal/CardContainer"
import type { ModalProps } from "../../types/components/modal/ModalContent"


export default function ModalContent({
    fullScreenOverlayDesign,
    cardContainerDesign,
    children,
}: ModalProps) {
    return (
        <FullScreenOverlay
            fullScreenOverlayDesign={fullScreenOverlayDesign}
        >
            <CardContainer
                cardContainerDesign={cardContainerDesign}
            >
                {children}
            </CardContainer>
        </FullScreenOverlay>
    )
}