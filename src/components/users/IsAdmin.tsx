"use client";
import { useState } from "react";
interface AdminSelectMenuProps {
  isAdmin: boolean;
}
export default function AdminSelectMenu({isAdmin}: AdminSelectMenuProps) {


  return (
    <select
      id="admin-select"
      value={isAdmin.toString()}
      className="max-w-2xl px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
    >
      <option value="false">Not Admin</option>
      <option value="true">Admin</option>
    </select>
  );
}
