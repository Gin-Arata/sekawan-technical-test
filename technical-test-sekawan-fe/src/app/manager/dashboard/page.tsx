"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardManagerPage() {
  const [totalRentals, setTotalRentals] = useState({
    total_histories: 0,
    total_pending_histories: 0,
    total_approved_histories: 0,
    total_rejected_histories: 0,
  });
  const [historyPerMonthAndYear, setHistoryPerMonthAndYear] = useState({
    histories_per_month_and_year: [],
  });
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchData = async () => {
    const [totalRentalResponse, historyPerMonthResponse] = await Promise.all([
      fetch(`${apiUrl}/manager/statistic/penyewaan`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      fetch(`${apiUrl}/manager/statistic/history-per-month`, {
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

    if (historyPerMonthResponse.ok) {
      const historyPerMonthData = await historyPerMonthResponse.json();
      setHistoryPerMonthAndYear(historyPerMonthData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // chart options
  const chartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Jumlah Penyewaan Kendaraan",
        data: historyPerMonthAndYear.histories_per_month_and_year,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Jumlah Penyewaan Kendaraan per Bulan",
      },
    },
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-left mb-4">Manager Dashboard</h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold">Statistik Penyewaan</h2>
          <p>Total Penyewaan: {totalRentals.total_histories}</p>
          <p>Total Penyewaan Pending: {totalRentals.total_pending_histories}</p>
          <p>
            Total Penyewaan Approved: {totalRentals.total_approved_histories}
          </p>
          <p>
            Total Penyewaan Rejected: {totalRentals.total_rejected_histories}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4 sm:col-span-1">
          <h2 className="text-xl font-bold">Grafik Penyewaan Kendaraan</h2>
          <Bar
            data={chartData}
            options={chartOptions}
            width={100}
            height={50}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold">Kelola Permintaan Penyewaan</h2>
          <Link href="/manager/acc-sewa">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-2 rounded">
              View Permintaan Penyewaan
            </button>
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold">Laporan Kendaraan</h2>
          <Link href="/manager/kendaraan">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-2 rounded">
              View Laporan Kendaraan
            </button>
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold">Laporan Tambang</h2>
          <Link href="/manager/tambang">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-2 rounded">
              View Laporan Tambang
            </button>
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold">Laporan Penyewaan</h2>
          <Link href="/manager/history">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-2 rounded">
              View Laporan Penyewaan
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
