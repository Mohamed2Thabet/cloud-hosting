"use client";

import { useState } from "react";
import { Button } from "../ui/button";

export default function AddComment() {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ comment }); // بعدين تستدعي API
    setComment("");
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 max-w-md w-full">
      <h2 className="text-lg font-semibold mb-3">Add Comment</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border rounded-xl p-2 h-24 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <Button type="submit" className="w-full">
          Post Comment
        </Button>
      </form>
    </div>
  );
}
