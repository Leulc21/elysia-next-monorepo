"use client";

import { api } from "@/lib/api";
import type { User } from "@repo/shared";
import { Check, Edit2, Loader2, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.users.get();
      setUsers(data);
    } catch {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const addUser = async () => {
    if (!name.trim()) return;
    setAdding(true);
    try {
      await api.users.create({ id: Date.now(), name: name.trim() });
      setName("");
      fetchUsers();
    } finally {
      setAdding(false);
    }
  };

  const deleteUser = async (id: number) => {
    if (!window.confirm("Delete this user?")) return;
    await api.users.delete(id);
    fetchUsers();
  };

  const saveEdit = async (id: number) => {
    if (!editName.trim()) return;
    await api.users.update(id, editName.trim());
    setEditingId(null);
    setEditName("");
    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 text-gray-800">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          User Management
        </h1>

        {/* Add */}
        <div className="flex gap-2 mb-6">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addUser()}
            className="flex-1 border rounded px-3 py-2 text-gray-800 placeholder:text-gray-400"
            placeholder="User name"
          />
          <button
            onClick={addUser}
            disabled={adding}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {adding ? (
              <Loader2 className="animate-spin w-4 h-4 text-white" />
            ) : (
              <Plus className="text-white" />
            )}
          </button>
        </div>

        {/* Errors */}
        {error && <p className="text-red-700 font-medium mb-4">{error}</p>}

        {/* List */}
        <div className="bg-white rounded shadow divide-y">
          {users.map((user) => (
            <div
              key={user.id}
              className="p-4 flex justify-between items-center text-gray-700"
            >
              {editingId === user.id ? (
                <>
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border px-2 py-1 rounded text-gray-800"
                  />
                  <div className="flex gap-2">
                    <button className="text-green-600 hover:text-green-700">
                      <Check />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span className="font-medium text-gray-800">{user.name}</span>
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-700">
                      <Edit2 />
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
