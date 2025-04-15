import { Database } from "bun:sqlite";

export default async (c: any, db: Database) => {
    const id = c.req.param("id"); // Get the record ID from the route parameter
    const { status } = c.req.query(); // Extract the 'status' field from query parameters

    if (!status) {
        return c.json({ error: "The 'status' field is required for update." }, 400);
    }

    try {
        // Prepare and execute the SQL query for updating the 'status' field
        const stmt = db.query(`
            UPDATE records 
            SET status = ? 
            WHERE id = ?
        `);

        const result = stmt.run(status, id);

        // Check if any rows were updated
        if (result.changes === 0) {
            return c.json({ error: "Record not found or no changes made." }, 404);
        }

        return c.json({ message: "Status updated successfully." });
    } catch (error: any) {
        // Handle unique constraint violations and other errors
        if (error.message.includes("UNIQUE constraint failed")) {
            return c.json(
                { error: "Unique constraint violated while updating the status." },
                409
            );
        }
        return c.json({ error: "Failed to update status.", details: error.message }, 500);
    }
};
