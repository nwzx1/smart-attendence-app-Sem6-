import { Database } from "bun:sqlite";

export default (c: any, db: Database) => {
    try {
        const childName = c.req.query("childName"); // Get the child name from query parameters
        const parentName = c.req.query("parentName"); // Get the parent name from query parameters
        const status = c.req.query("status");

        if (!childName || !parentName) {
            return c.json({ error: "Both childName and parentName must be provided." }, 400);
        }

        // Query the record with the specified childName and parentName
        const stmt = db.query(
            `SELECT * FROM records WHERE child_name = ? AND parent_name = ? AND status = ?`
        );
        const records = stmt.all(childName, parentName, status); // Fetch all matching rows

        // Check if records exist
        if (records.length === 0) {
            return c.json({ error: `No records found for childName: ${childName} and parentName: ${parentName}.` }, 404);
        }

        return c.json(records);
    } catch (error: any) {
        return c.json({ error: "Failed to fetch records.", details: error.message }, 500);
    }
};
