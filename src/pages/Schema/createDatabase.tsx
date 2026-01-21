import type { CreateDatabaseProps } from "../../types/pages/Schema/CreateDatabase"

const labelDesign = "block text-sm font-medium text-gray-700 mb-2"
const inputDesign = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 bg-gray-50 hover:bg-white"

export default function CreateDatabase({
    databaseName,
    setDatabaseName
}: CreateDatabaseProps) {

    return (
        <div>
            <label htmlFor="databaseName" className={labelDesign}>
                Database Name
            </label>
            <input
                id="databaseName"
                type="text"
                value={databaseName}
                placeholder="e.g. users_db"
                className={inputDesign}
                onChange={(e) => setDatabaseName(e.target.value)}
            />
        </div>
    )
}