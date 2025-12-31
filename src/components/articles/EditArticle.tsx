"use client";
import { DOMAIN } from "@/utils/constants";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface EditArticleProps {
  title: string;
  description: string;
    articleId: number;
}

function EditArticle({ title, description ,articleId}: EditArticleProps) {
  const [showAction, setShowAction] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const router = useRouter();
  const handleSave = async () => {
    try {
        if (editedTitle.trim() === "") return toast.error("Title is required");
        if (editedDescription.trim() === "") return toast.error("Description is required");

        await axios.put(`${DOMAIN}/api/articles/${articleId}`, {
            title: editedTitle,
            description: editedDescription
        });

        toast.success("Article updated successfully");
        setShowAction(false);
        router.refresh();
    } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleCancel = () => {
    // Reset to original values
    setEditedTitle(title);
    setEditedDescription(description);
    setShowAction(false);
  };

  return (
    <div>
      <button
        onClick={() => setShowAction(!showAction)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Edit
      </button>
      
      {showAction && (
  <>
    {/* Backdrop overlay with blur effect */}
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
      onClick={handleCancel}
    />
    
    {/* Modal content */}
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-8 space-y-6 transform transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
        {/* Header */}
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Edit Article</h2>
          <p className="text-sm text-gray-500 mt-1">Update your article details below</p>
        </div>
        
        {/* Form fields */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-gray-800"
              placeholder="Enter article title..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-gray-800"
              rows={5}
              placeholder="Enter article description..."
            />
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={handleCancel}
            className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 shadow-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </>
)}
    </div>
  );
}

export default EditArticle;