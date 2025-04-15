import { Hono } from "hono";
import Records from "./Records/Records";
import DetectedliveStream from "./DetectedliveStream";
import DetectedDataliveStream from "./DetectedDataliveStream";
import GetbyNames from "./Records/GetbyNames";
import {Database} from 'bun:sqlite'
import GetDetectedDataCheck from "./GetDetectedDataCheck";

const db = new Database("db/db1.sqlite");

export default new Hono()
    .route("/records", Records)
    .get("/names", (c) => GetbyNames(c, db))
    .get("/getrowstatus", async (c) => await GetDetectedDataCheck(c, db) as any)
    .get("/LiveConsole", async (c) => await DetectedliveStream(c) as any)
    .get("/LiveStatus", async (c) => await DetectedDataliveStream(c) as any)
