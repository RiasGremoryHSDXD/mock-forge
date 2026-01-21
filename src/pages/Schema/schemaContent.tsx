import Button from "../../components/Button"
import ModalContent from "../../components/modal/ModalContent"
import { useState } from "react"

export default function schemaContent() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <div className="m-2">
            <Button
                buttonText="Add DB"
                onClick={() => setIsModalOpen(true)}
            />
            {isModalOpen && (
                <ModalContent>
                    <div>Modal Content</div>

                    <Button
                        buttonText="Close"
                        onClick={() => setIsModalOpen(false)}
                    />
                </ModalContent>
            )}
        </div>
    )
}