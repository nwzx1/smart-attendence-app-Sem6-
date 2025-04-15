import { Hono } from "hono";
import { serveStatic } from "hono/bun";

export default new Hono()
    .get('/', serveStatic({ path: './Frontend/dist/index.html' }))
    .get('/*', serveStatic({ root: './Frontend/dist' }))