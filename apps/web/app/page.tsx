import { api } from "@/lib/api";

export default async function Home() {
  const users = await api.users.get();

  return (
    <div>
      <h1>Users</h1>
      <pre>{JSON.stringify(users.data, null, 2)}</pre>
    </div>
  );
}
