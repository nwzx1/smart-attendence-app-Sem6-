import { Database } from "bun:sqlite";

export const Delete = async (c: any, db: Database) => {
    const id = c.req.param("id"); // Get the record ID from the route parameter

    try {
        // Delete the record with the specified ID
        const stmt = db.query(`DELETE FROM records WHERE id = ?`);
        const result = stmt.run(id);

        // Check if any rows were deleted
        if (result.changes === 0) {
            return c.json({ error: "Record not found." }, 404);
        }

        return c.json({ message: "Record deleted successfully." });
    } catch (error: any) {
        return c.json({ error: "Failed to delete record.", details: error.message }, 500);
    }
};


export const DeleteALL = async (c: any, db: Database) => {
    try {
        // Delete all records from the table
        const stmt = db.query(`DELETE FROM records`);
        const result = stmt.run();

        // Check if any rows were deleted
        if (result.changes === 0) {
            return c.json({ message: "No records to delete." });
        }

        return c.json({ message: "All records deleted successfully." });
    } catch (error: any) {
        return c.json({ error: "Failed to delete records.", details: error.message }, 500);
    }
};
