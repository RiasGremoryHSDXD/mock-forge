
/**
 * Defines the properties for the CreateDatabase component.
 *
 * @interface CreateDatabaseProps
 * @property {string} databaseName - The current value of the database name input.
 * @property {(name: string) => void} setDatabaseName - State setter function to update the database name.
 */
export interface CreateDatabaseProps {
    databaseName: string;
    setDatabaseName: (name: string) => void;
}