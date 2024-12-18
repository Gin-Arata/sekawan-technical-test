"use client";

import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface Tambang {
  id: number;
  name: string;
}

interface Kendaraan {
  id: number;
  name: string;
}

export default function SewaKendaraanPage() {
  const [user, setUser] = useState<User | null>(null);
  const [tambang, setTambang] = useState<Tambang[]>([]);
  const [kendaraan, setKendaraan] = useState<Kendaraan[]>([]);
  const [formData, setFormData] = useState({
    kendaraan_id: "",
    tambang_tujuan_id: "",
    tanggal_sewa: "",
    tanggal_kembali: "",
    status: "Pending",
  });
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // fetch current user
  const fetchUser = async () => {
    const response = await fetch(`${apiUrl}/user/current`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch current user");
    }

    const data = await response.json();

    setUser(data.user);
  };

  // fetch data tambang
  const fetchTambang = async () => {
    const response = await fetch(`${apiUrl}/pegawai/tambang`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch data tambang");
    }

    const data = await response.json();

    setTambang(Array.isArray(data.data) ? data.data : []);
  };

  // fetch data kendaraan
  const fetchKendaraan = async () => {
    const response = await fetch(`${apiUrl}/pegawai/kendaraan`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch data kendaraan");
    }
    const data = await response.json();

    setKendaraan(Array.isArray(data.data) ? data.data : []);
  };

  useEffect(() => {
    fetchTambang();
    fetchKendaraan();
    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(`${apiUrl}/pegawai/history-penyewaan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        user_id: user?.id,
        ...formData,
      }),
    });

    if (!response.ok) {
      console.error("Failed to submit sewa");
    } else {
      // Reset form fields
      setFormData({
        kendaraan_id: "",
        tambang_tujuan_id: "",
        tanggal_sewa: "",
        tanggal_kembali: "",
        status: "Pending",
      });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Sewa Kendaraan</h1>
      <div className="flex justify-center w-full">
        <form className="space-y-4 w-full border rounded-md p-4" method="POST" onSubmit={handleSubmit}>
          <input type="hidden" value={formData.status} name="status" />
          <div>
            <label htmlFor="kendaraan_id">Kendaraan</label>
            <select
              name="kendaraan_id"
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              value={formData.kendaraan_id}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Kendaraan</option>
              {kendaraan.map((kendaraan) => (
                <option key={kendaraan.id} value={kendaraan.id}>
                  {kendaraan.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="tambang_tujuan_id">Tambang Tujuan</label>
            <select
              name="tambang_tujuan_id"
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              value={formData.tambang_tujuan_id}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Tambang Tujuan</option>
              {tambang.map((tambang) => (
                <option key={tambang.id} value={tambang.id}>
                  {tambang.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="tanggal_sewa">Tanggal Sewa</label>
            <input
              type="date"
              name="tanggal_sewa"
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              value={formData.tanggal_sewa}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="tanggal_kembali">Tanggal Dikembalikan</label>
            <input
              type="date"
              name="tanggal_kembali"
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              value={formData.tanggal_kembali}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}