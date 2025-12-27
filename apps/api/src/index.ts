import { cors } from "@elysiajs/cors";
import type { User } from "@repo/shared";
import { Elysia, t } from "elysia";
import { db } from "./db";

export const app = new Elysia()
  .use(cors())
  .get("/users", () => db.getAll())
  .get("/users/:id", ({ params }) => db.getById(Number(params.id)))
  .post(
    "/users",
    ({ body }) => {
      const user: User = body;
      return db.create(user);
    },
    {
      // Add schema validation
      body: t.Object({
        id: t.Number(),
        name: t.String(),
      }),
    }
  )
  .put(
    "/users/:id",
    ({ params, body }) => {
      return db.update(Number(params.id), body.name);
    },
    {
      body: t.Object({
        name: t.String(),
      }),
    }
  )
  .delete("/users/:id", ({ params }) => db.delete(Number(params.id)))
  .listen(3001);

console.log("API running at http://localhost:3001");
