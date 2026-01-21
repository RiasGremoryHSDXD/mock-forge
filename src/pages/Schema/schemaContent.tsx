import Button from "../../components/Button"
import ModalContent from "../../components/modal/ModalContent"
import CreateDatabase from "./createDatabase"
import { useState } from "react"

const modalButtonDesign = "bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"

export default function schemaContent() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [databaseName, setDatabaseName] = useState<string>("")

    return (
        <div className="m-2">
            <Button
                buttonText="Add DB"
                onClick={() => setIsModalOpen(true)}
            />
            {isModalOpen && (
                <ModalContent>
                    <CreateDatabase
                        databaseName={databaseName}
                        setDatabaseName={setDatabaseName}
                    />

                    <div className="flex justify-between gap-2 mt-4">
                        <Button
                            buttonText="Close"
                            buttonContainerDesign={modalButtonDesign}
                            onClick={() => setIsModalOpen(false)}
                        />

                        <Button
                            buttonText="Create"
                            buttonContainerDesign={modalButtonDesign}
                            onClick={() => alert(`Create ${databaseName}`)}
                        />
                    </div>
                </ModalContent>
            )}
        </div>
    )
}