"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPegawaiPage() {
  const [totalRentals, setTotalRentals] = useState({total_histories: 0, total_pending_histories: 0, total_approved_histories: 0, total_rejected_histories: 0});
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchData = async () => {
    const [totalRentalResponse] = await Promise.all([
      fetch(`${apiUrl}/pegawai/statistic/penyewaan`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    ]);

    if (totalRentalResponse.ok) {
      const totalRentalData = await totalRentalResponse.json();
      setTotalRentals(totalRentalData);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log(totalRentals);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-left mb-4">
        Pegawai Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold">Statistik Penyewaan</h2>
          <p>Total Melakukan Penyewaan: {totalRentals.total_histories}</p>
          <p>Total Penyewaan Pending: {totalRentals.total_pending_histories}</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold">Permintaan Penyewaan</h2>
          <Link href="/pegawai/sewa-kendaraan">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-2 rounded">
              View Permintaan Penyewaan
            </button>
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold">List Kendaraan</h2>
          <Link href="/pegawai/kendaraan">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-2 rounded">
              View List Kendaraan
            </button>
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold">History Penyewaan</h2>
          <Link href="/pegawai/history">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-2 rounded">
              View History Penyewaan
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
