import { Database } from "bun:sqlite";

export default (c: any, db: Database) => {
    const id = c.req.param("id"); // Get the record ID from the route parameter

    try {
        // Query the record with the specified ID
        const stmt = db.query(`SELECT * FROM records WHERE id = ?`);
        const record = stmt.get(id); // Fetch one row

        // Check if the record exists
        if (!record) {
            return c.json({ error: "Record not found." }, 404);
        }

        return c.json(record);
    } catch (error: any) {
        return c.json({ error: "Failed to fetch record.", details: error.message }, 500);
    }
};
