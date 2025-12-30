"use client";
import React, { useState } from "react";
import { Trash2, Edit3, Mail, MoreHorizontal } from "lucide-react";
import { CommentWithUser } from "@/utils/types";
import { DOMAIN } from "@/utils/constants";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";



const CommentItem = ({ 
  comment, 
  userId,
  onDelete, 
  onEdit 
}: { 
  comment: CommentWithUser;
  userId:number |undefined 
  onDelete?: (id: number) => void;
  onEdit?: (id: number, newBody: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);
  const [showActions, setShowActions] = useState(false);
  const router = useRouter()
  const handleSave = async (e:React.FormEvent) => {
     e.preventDefault();

    try {
      console.log(editText)
      await axios.put(`${DOMAIN}/api/comments/${comment.id}`,{text:editText})
      setEditText("")
      router.refresh()
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error?.response?.data?.message );
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(comment.content);
    setIsEditing(false);
  };

  const handleDelete = async() => {
    if ( window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await axios.delete(`${DOMAIN}/api/comments/${comment.id}`)
        router.refresh()
      }catch(err){
         const error = err as AxiosError<{ message?: string }>;
        toast.error(error?.response?.data?.message );
      }
    }
  };

  return (
    <div className="group w-full max-w-2xl mx-auto my-4 p-6 border border-gray-200 rounded-2xl shadow-sm bg-white hover:shadow-md transition-all duration-200 hover:border-gray-300">
      <div className="flex gap-4 items-start">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {/* <img
            src={comment.image}
            alt={comment.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 hover:ring-blue-200 transition-all duration-200"
            onError={(e) => {
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.name)}&background=6366f1&color=ffffff`;
            }}
          /> */}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 truncate hover:text-blue-600 transition-colors duration-300 ease-out">
                {comment.user.username}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1 hover:text-gray-700 transition-colors duration-200">
                <Mail className="w-4 h-4 hover:text-blue-500 transition-colors duration-200" />
                <span className="truncate">{comment.user.email}</span>
              </div>
            </div>

            {/* Actions Menu */}
            <div className="relative">
             {userId && userId ===comment.userId && (
               <button
                onClick={() => setShowActions(!showActions)}
                className="opacity-0 group-hover:opacity-100 p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
                aria-label="Comment actions"
              >
                <MoreHorizontal className="w-4 h-4 text-gray-500" />
              </button>
             )}

              {showActions && (
                <div className="absolute right-0 top-10 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 min-w-[120px]">
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setShowActions(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleDelete();
                      setShowActions(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Comment Body */}
          {isEditing ? (
            <div className="space-y-3">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                rows={3}
                placeholder="Edit your comment..."
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700 leading-relaxed mb-3">
              {comment.content}
            </p>
          )}

          {/* Timestamp placeholder */}
          <div className="text-xs text-gray-400">
            {new Date(comment.updatedAt).toDateString()}
          </div>
        </div>
      </div>

      {/* Click outside handler for actions menu */}
      {showActions && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setShowActions(false)}
        />
      )}
    </div>
  );
};

export default CommentItem;