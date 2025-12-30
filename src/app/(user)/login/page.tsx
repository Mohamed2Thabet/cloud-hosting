import React from 'react'
import LoginForm from './LoginForm'
import Link from 'next/link'


export default  function LoginPage() {
  
  return (
    <section className='min-h-[calc(100vh-148px)] flex justify-center items-center p-4 md:p-8 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50'>
      <div className='w-full max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 md:p-10'>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2'>
            Welcome Back
          </h1>
          <p className="text-gray-600 text-sm">Sign in to your account to continue</p>
        </div>

        {/* Form */}
        <LoginForm />

        {/* Sign Up Link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-medium text-purple-600 hover:text-purple-700 hover:underline">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}