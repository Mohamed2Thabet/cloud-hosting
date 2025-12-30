"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { DOMAIN } from "@/utils/constants";
export default  function AddArticle() {
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading,setLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      setLoading(true);
      await axios.post(`${DOMAIN}/api/articles`,{title,description})
    toast.success("adding successful!")
      setTitle("");
      setDescription("");
      setLoading(false);
    }catch(err) {
      const error = err as AxiosError<{message:string}>
      toast.error(error?.response?.data.message)
      setLoading(false);

    }
    
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 max-w-lg w-full">
      <h2 className="text-xl font-bold mb-4">Add New Article</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Article Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Article Content"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-xl p-2 h-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "laoding..." :"Add Article"}
        </Button>
      </form>
    </div>
  );
}
