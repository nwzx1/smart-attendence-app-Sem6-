import { Hono } from "hono";
import { Database } from "bun:sqlite";
import Post from "./Post";
import Put from "./Put";
import { Delete, DeleteALL } from "./Delete";
import Get from "./Get";
import GetById from "./GetById";
import ImagePost from "./ImagePost";
import GetByAny from "./GetBystatus";
import GetByNames from "./GetbyNames";



const db = new Database("db/db1.sqlite");


const app = new Hono()

app.get("/",(c) => Get(c, db));
app.get("/:id", (c) => GetById(c, db));
app.get("/status/:status", (c) => GetByAny(c, db));

app.post("/", (c) => Post(c, db));
app.put("/:id", (c) => Put(c, db));
app.delete("/:id", (c) => Delete(c, db));
app.delete("/", (c) => DeleteALL(c, db));
app.post('/uploadChild', (c) => ImagePost(c, "Child"));
app.post('/uploadParent', (c) => ImagePost(c, "Parent"));

export default app