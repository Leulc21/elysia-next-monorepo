import type { User } from "@repo/shared";

let users: User[] = [
  { id: 1, name: "Leul" },
  { id: 2, name: "Maya" },
];

export const db = {
  getAll: () => users,
  getById: (id: number) => users.find((u) => u.id === id),
  create: (user: User) => {
    users.push(user);
    return user;
  },
  update: (id: number, name: string) => {
    const user = users.find((u) => u.id === id);
    if (user) user.name = name;
    return user;
  },
  delete: (id: number) => {
    users = users.filter((u) => u.id !== id);
    return true;
  },
};
