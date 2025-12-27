import type { User } from "@repo/shared";

const BASE = "http://localhost:3001";

export const api = {
  users: {
    get: async (): Promise<User[]> => {
      const res = await fetch(`${BASE}/users`, { cache: "no-store" });
      if (!res.ok) throw new Error("Fetch failed");
      return res.json();
    },

    create: async (user: User) => {
      const res = await fetch(`${BASE}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      return res.json();
    },

    update: async (id: number, name: string) => {
      const res = await fetch(`${BASE}/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      return res.json();
    },

    delete: async (id: number) => {
      await fetch(`${BASE}/users/${id}`, { method: "DELETE" });
    },
  },
};
