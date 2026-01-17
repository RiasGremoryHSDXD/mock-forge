import SideBar from "../../components/SideBar"
import LeftSideBar from "../../components/LeftSideBar"

export default function dashboard() {
    return (
        <div className="flex flex-row justify-between">
            <SideBar pageName="Dashboard" />
            <LeftSideBar />
        </div>
    )
}
