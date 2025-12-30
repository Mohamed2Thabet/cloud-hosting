"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid place-items-center bg-gray-900 h-[calc(100vh-148px)]  ">
      <div className="text-center">
        <p className="text-6xl font-extrabold text-indigo-500">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg leading-7 text-gray-400">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
          >
            Go back home
          </Link>
          <Link
            href="/contact"
            className="text-sm font-semibold text-gray-300 transition-colors hover:text-white"
          >
            Contact support <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
