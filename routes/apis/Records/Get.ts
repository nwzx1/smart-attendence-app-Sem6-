import { Database } from "bun:sqlite";

export default (c: any, db: Database) => {
    try {
        // Query all records from the database
        const stmt = db.query(`SELECT * FROM records`);
        const records = stmt.all(); // Fetch all rows

        return c.json(records);
    } catch (error: any) {
        return c.json({ error: "Failed to fetch records.", details: error.message }, 500);
    }
};
