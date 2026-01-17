

export default function LeftSideBar() {
    const photoURL = localStorage.getItem("user_photoURL")

    return (
        <div className="w-[4vw] h-[100vh] border-l border-gray-700 flex flex-col items-center py-4">
            {photoURL && (
                <img
                    src={photoURL}
                    alt="User Profile"
                    className="cursor-pointer w-8 h-8 rounded-full object-cover mb-4 border border-gray-600"
                />
            )}
        </div>
    )
}
