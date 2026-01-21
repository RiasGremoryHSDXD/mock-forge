import SideBar from "../../components/SideBar"
import LeftSideBar from "../../components/leftSideBar/LeftSideBar"
import SchemaContent from "../Schema/schemaContent"

export default function schema() {
    return (
        <div className="flex flex-row">
            <SideBar pageName="Schema" />
            <div className="flex-1">
                <SchemaContent />
            </div>
            <LeftSideBar />
        </div>
    )
}
