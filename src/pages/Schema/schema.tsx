import SideBar from "../../components/SideBar"
import LeftSideBar from "../../components/leftSideBar/LeftSideBar"

export default function schema() {
    return (
        <div className="flex flex-row justify-between">
            <SideBar pageName="Schema" />
            <LeftSideBar />
        </div>
    )
}
