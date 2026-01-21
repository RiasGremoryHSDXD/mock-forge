import SideBar from "../../components/SideBar"
import LeftSideBar from "../../components/leftSideBar/LeftSideBar"

export default function template() {
    return (
        <div className="flex flex-row justify-between">
            <SideBar pageName="Template" />
            <LeftSideBar />
        </div>
    )
}
