import { Database } from "bun:sqlite";

export default async (c: any, db: Database) => {
    const {
        parent_name,
        parent_email,
        parent_phone_number,
        parent_pickup_code,
        child_name,
        parent_img_url,
        child_img_url,
        status
    } = await c.req.json();


    // Validate required fields
    if (
        !parent_name ||
        !parent_email ||
        !parent_phone_number ||
        !parent_pickup_code ||
        !child_name
    ) {
        return c.json(
            { error: "All fields (except images and status) are required." },
            400
        );
    }

    try {
        // Insert the record into the database
        const stmt = db.query(`
            INSERT INTO records 
            (parent_name, parent_email, parent_phone_number, parent_pickup_code, child_name, parent_img_url, child_img_url, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `);
        stmt.run(
            parent_name,
            parent_email,
            parent_phone_number,
            parent_pickup_code,
            child_name,
            parent_img_url || null,
            child_img_url || null,
            status ?? 0
        );

        return c.json({ message: "Record added successfully." }, 201);
    } catch (error: any) {
        // Handle unique constraint violations and other errors
        if (error.message.includes("UNIQUE constraint failed")) {
            return c.json(
                { error: "One or more unique fields already exist." },
                409
            );
        }
        return c.json({ error: "Failed to add record.", details: error.message }, 500);
    }
};
