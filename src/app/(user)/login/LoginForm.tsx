"use client"
import { useRouter } from 'next/navigation';
import React ,{useState} from 'react'
import axios ,{AxiosError } from "axios"
import {toast} from "react-toastify"
import { DOMAIN } from '@/utils/constants';
import ButtonSpinner from '@/components/ButtonSpinner';
const LoginForm =  () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading,setLoading] = useState(false)
    const router = useRouter();
    const handleSubmit =async (e: React.FormEvent) => {
        e.preventDefault();
        if(!email)return toast.error("email is required")
        if(!password)return toast.error("password is required")

        try {
            setLoading(true)
            await axios.post(`${DOMAIN}/api/users/login`,{email,password})
             toast.success(" Login successful!");
             setLoading(false)
             router.replace("/"); 
             router.refresh();

        }catch(err)
        {
          const error = err as AxiosError<{ message?: string }>;
          toast.error(error?.response?.data?.message || "Login failed")
          setLoading(false)
        }

      }
  return (
       <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <input 
                type="email" 
                id="email"
                placeholder='Enter your email address'
                className='w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white'
                
                onChange={(e) => setEmail(e.target.value)}
                    value={email}
                
              />
              <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input 
                type="password" 
                id="password"
                placeholder='Enter your password'
                className='w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white'
                
                onChange={(e) => setPassword(e.target.value)}
                    value={password}
              />
              <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 focus:ring-2" />
              <span className="ml-2 text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-purple-600 hover:text-purple-700 font-medium hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button 
            disabled={loading}
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
          
          >
            {loading ? <ButtonSpinner/>: "Sign In"}
          </button>

         
        </form>
  )
}

export default LoginForm