"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function LoginPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: e.currentTarget.email.value,
          password: e.currentTarget.password.value,
        }),
      });

      if (!response.ok) {
        throw new Error('HTTP error, status = ' + response.status);
      } else {
        const data = await response.json();
        
        // Save token to local storage
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        // Redirect to dashboard between roles
        if (data.role === "Super Admin") {
          router.push('/super-admin/dashboard');
        } else if (data.role === "Admin") {
          router.push('/admin/dashboard');
        } else if (data.role === "Manager") {
          router.push('/manager/dashboard');
        } else if (data.role === "Pegawai") {
          router.push('/pegawai/dashboard');
        } else {
          router.push('/login');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-96 h-96 box-border bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center">SISEWA</h1>
          <form className="mt-4" method="POST" onSubmit={(e) => handleLogin(e)}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 hover:shadow-lg"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
