import { Hono } from "hono";
import frontendapp from "./routes/frontendapp";
import apis from "./routes/apis/index";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import { Database } from "bun:sqlite"

const port = Bun.env.PORT || 3999

const app = new Hono();

// middlewares
app.use(logger())

// file endpoints
app.route("/api", apis);
app.route("/", frontendapp)
app.get('/img/*', serveStatic({ root: 'assets' }))


const db = new Database("db/db1.sqlite");

db.run(`
            CREATE TABLE IF NOT EXISTS records (
                id INTEGER PRIMARY KEY AUTOINCREMENT,           -- Auto-incrementing primary key
                parent_name TEXT NOT NULL UNIQUE,               -- Parent's name (required, unique)
                parent_email TEXT NOT NULL UNIQUE,              -- Parent's email (required, unique)
                parent_phone_number TEXT NOT NULL UNIQUE,       -- Parent's phone number (required, unique)
                parent_pickup_code TEXT NOT NULL UNIQUE,        -- Unique pickup code for the parent (required)
                child_name TEXT NOT NULL UNIQUE,                -- Child's name (required, unique)
                timestamp TEXT DEFAULT CURRENT_TIMESTAMP,       -- Timestamp of record creation
                parent_img_url TEXT,                            -- Parent's image URL (optional)
                child_img_url TEXT,                             -- Child's image URL (optional)
                status BOOLEAN DEFAULT 0                        -- Status field (default to 0)
            )
`);

// BUN SERVER TO SERVE THE APP
Bun.serve({
    port: port,
    fetch: (() => {
        console.log(`server Started on http://localhost:${port}\n`)
        return app.fetch
    })()
})