"use clinet";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { DOMAIN } from "@/utils/constants";
import { useState } from "react";
import ButtonSpinner from "../ButtonSpinner";
export default function Logout() {
  const router = useRouter();
  const [loading,setLoading] = useState(false)
  const logoutHandler = async () => {
    try {
        setLoading( true)
        await axios.get(`${DOMAIN}/api/users/logout`);
        toast.success("You have been logged out successfully!");
        setLoading( false)
        router.replace("/");
        router.refresh();
    } catch (err) {
        setLoading( false)
        const error = err as AxiosError<{ message: string }>;
        return toast.warning(error?.response?.data?.message);
    }
  };
  return (
    <Button
      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
      onClick={logoutHandler}
    >
      {loading ?  <ButtonSpinner/>:"Log out" }
    </Button>
  );
}
