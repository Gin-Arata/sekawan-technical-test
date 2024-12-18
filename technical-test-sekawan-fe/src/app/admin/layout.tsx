"use client";

import withAuth from "@/components/withAuth";
import React, { useEffect, useState } from "react";
import NavbarAdmin from "./NavbarComponent";
import Image from "next/image";
import Link from "next/link";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface userCurrent {
  id: number;
  name: string;
  email: string;
  role: string;
}

function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState({} as userCurrent);

  // handle sidebar open
  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const fetchUser = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${apiUrl}/user/current`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();
    setUser(data.user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="h-screen flex">
      <NavbarAdmin openSideBar={isSidebarOpen} closeSidebar={closeSidebar} />
      <div className="w-full">
        {/* Start of navbar */}
        <div className="w-full bg-gray-100 border-solid p-3 flex justify-between items-center mb-2">
          <div className="flex items-center gap-x-4">
            <div className="cursor-pointer" onClick={handleSidebar}>
              <FontAwesomeIcon icon={faBars} className="text-2xl" />
            </div>
            <h1 className="text-2xl font-bold">Admin</h1>
          </div>
          <div className="flex gap-x-6">
            <div className="flex gap-x-2 items-center">
              <Image
                src={"/image/user-profile.png"}
                alt="User Profile Image"
                width={40}
                height={40}
              ></Image>
              <p>Welcome, {user.name}</p>
            </div>
            <Link
              href="/logout"
              className="bg-red-500 hover:bg-red-700 hover:shadow-md text-white hover:text-slate-300 font-bold px-4 rounded flex items-center"
            >
              <p>Logout</p>
            </Link>
          </div>
        </div>
        {/* End of navbar */}
        {children}
      </div>
    </div>
  );
}

export default withAuth(AdminLayout, ["Admin"]);
