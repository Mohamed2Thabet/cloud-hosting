"use client";

import { DOMAIN } from '@/utils/constants';
import axios, { Axios, AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';

interface DeleteArticleProps {
  articleId: number;
}
function DeleteArticle({ articleId }: DeleteArticleProps) {
    const router = useRouter();
    const handleDelete = async () => {
        try {
            if(confirm("Are you sure you want to delete this article?")) {
                await axios.delete(`${DOMAIN}/api/articles/${articleId}`);
                router.refresh();
                toast.success("Article deleted successfully");
            }
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            toast.error(error?.response?.data.message || "Failed to delete the article");
        }
    }
  return (
    <button onClick={handleDelete}  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">Delete</button>
  )
}

export default DeleteArticle