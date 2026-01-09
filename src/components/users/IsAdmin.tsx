"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface AdminSelectMenuProps {
  isAdmin: boolean;
  userId: number;
}

export default function AdminSelectMenu({
  isAdmin,
  userId,
}: AdminSelectMenuProps) {
  const [value, setValue] = useState(isAdmin);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newValue = e.target.value === "true";
    setValue(newValue);

    try {
      setLoading(true);

      await fetch(`/api/users/${userId}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isAdmin: newValue }),
      });
      router.refresh();
    } catch (error) {
      console.error("Failed to update role", error);
      setValue(isAdmin); // rollback
    } finally {
      setLoading(false);
    }
  }

  return (
    <select
      id="admin-select"
      value={value.toString()}
      onChange={handleChange}
      disabled={loading}
      className="max-w-2xl px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
      transition-all cursor-pointer disabled:opacity-50"
    >
      <option value="false">Not Admin</option>
      <option value="true">Admin</option>
    </select>
  );
}
