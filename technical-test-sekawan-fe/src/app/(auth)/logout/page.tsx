"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await fetch(`${apiUrl}/logout`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to logout");
        }

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        router.push("/login");
      } catch (error) {
        console.error("Logout failed", error);
      }
    };

    logout();
  }, [apiUrl]);
}