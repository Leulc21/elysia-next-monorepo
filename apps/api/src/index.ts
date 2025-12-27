import type { User } from "@repo/shared";
import { Elysia } from "elysia";

export const app = new Elysia()
  .get("/users", () => {
    const users: User[] = [{ id: 1, name: "Leul" }];
    return users;
  })
  .listen(3001);

export type App = typeof app;
