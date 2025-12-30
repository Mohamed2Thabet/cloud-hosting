"use client";

import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import axios, { AxiosError } from "axios";
import { DOMAIN } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
interface AddtextFormProps {
  articleId:number
}
export default function AddtextForm({articleId}:AddtextFormProps) {
  const [text, setText] = useState("");
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!text.trim()) return toast.error("Please write something")
    try {
        await axios.post(`${DOMAIN}/api/comments/`,{text,articleId})
        router.refresh()
        setText('')
    }catch(err){
      const error = err as AxiosError<{message:string}>
      toast.error(error?.response?.data.message)
    }
    if (!text.trim()) return;


    setText(""); // reset input
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative my-6 w-full max-w-md mx-auto"
    >
      <input
        type="text"
        placeholder="Write a text..."
        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition"
      >
        <FaPaperPlane className="w-4 h-4" />
      </button>
    </form>
  );
}
