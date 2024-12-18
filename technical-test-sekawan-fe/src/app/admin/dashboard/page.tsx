"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardAdminPage() {
  const [totalUsers, setTotalUsers] = useState({ total_users: 0, total_roles: 0 });
  const [totalRentals, setTotalRentals] = useState({total_sewa: 0});
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchData = async () => {
    const [totalUserResponse, totalRentalResponse] = await Promise.all([
      fetch(`${apiUrl}/admin/statistic/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      fetch(`${apiUrl}/admin/statistic/penyewaan`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    ]);

    if (totalUserResponse.ok) {
      const totalUserData = await totalUserResponse.json();
      setTotalUsers(totalUserData);
    }

    if (totalRentalResponse.ok) {
      const totalRentalData = await totalRentalResponse.json();
      setTotalRentals(totalRentalData);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-left mb-4">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold">Statistik User</h2>
          <p>Total Users: {totalUsers.total_users}</p>
          <p>Total Roles: {totalUsers.total_roles}</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold">Statistik Penyewaan</h2>
          <p>Total Penyewaan: {totalRentals.total_sewa}</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold">Verifikasi Driver Sewa</h2>
          <Link href="/admin/verifikasi-driver">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-2 rounded">
              View Verifikasi Driver
            </button>
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold">Kelola Daerah</h2>
          <Link href="/admin/daerah">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-2 rounded">
              View Daerah
            </button>
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold">Kelola Kendaraan</h2>
          <Link href="/admin/kendaraan">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-2 rounded">
              View Vehicles
            </button>
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold">Kelola Tambang</h2>
          <Link href="/admin/tambang">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-2 rounded">
              View Mines
            </button>
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold">Laporan</h2>
          <Link href="/admin/history">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-2 rounded">
              View History
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
