import { Database } from "bun:sqlite";

export default (c: any, db: Database) => {
    try {
        const status = c.req.param("status")
        console.log(status);

        if (!status) {
            return c.json({ error: "ID must be provided." }, 400);
        }

        // Query the record with the specified ID
        const stmt = db.query(`SELECT * FROM records WHERE status = ?`);
        const record = stmt.all(status); // Fetch one row

        // Check if the record exists
        if (!record) {
            return c.json({ error: `Record with status ${status} not found.` }, 404);
        }

        return c.json(record);
    } catch (error: any) {
        return c.json({ error: "Failed to fetch record.", details: error.message }, 500);
    }
};