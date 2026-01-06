"use client";

import { DOMAIN } from '@/utils/constants';
import axios, {  AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface DeleteUserProps {
  userId: number;
}
function DeleteUser({ userId }: DeleteUserProps) {
    const router = useRouter();
    const handleDelete = async () => {
        try {
            if(confirm("Are you sure you want to delete this User?")) {
                await axios.delete(`${DOMAIN}/api/users/${userId}`); 
                router.refresh();
                toast.success("User deleted successfully");
            }
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            toast.error(error?.response?.data.message || "Failed to delete the User");
        }
    }
  return (
    <button onClick={handleDelete}  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">Delete</button>
  )
}

export default DeleteUser