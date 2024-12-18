"use client";

import Modal from "@/components/Modal";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

interface JenisKendaraan {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

interface Kantor {
  id: number;
  name: string;
  office_code: string;
  address: string;
  city: string;
  office_type: string;
  created_at: Date;
  updated_at: Date;
}

interface Kendaraan {
  id: number;
  name: string;
  license_plate: string;
  fuel_consumption: number;
  image: string;
  jenis_kendaraan_id: number;
  lokasi_penyimpanan_id: number;
  service_date: Date;
  last_used: Date;
  created_at: Date;
  updated_at: Date;
}

export default function KendaraanPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [kendaraan, setKendaraan] = useState<Kendaraan[]>([]);
  const [jenisKendaraan, setJenisKendaraan] = useState<JenisKendaraan[]>([]);
  const [kantor, setKantor] = useState<Kantor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addModalEdit, setAddModalEdit] = useState(false);
  const [addModalDelete, setAddModalDelete] = useState(false);
  const [selectedKendaraan, setSelectedKendaraan] = useState<Kendaraan | null>(
    null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // handle file change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  //   fetch api Kendaraan data
  const fetchKendaraan = async () => {
    try {
      const [kendaraanResponse, jenisKendaraanResponse, KantorResponse] =
        await Promise.all([
          fetch(`${apiUrl}/manager/kendaraan`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          fetch(`${apiUrl}/manager/jenis-kendaraan`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          fetch(`${apiUrl}/manager/kantor`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
        ]);

      if (
        !kendaraanResponse.ok ||
        !jenisKendaraanResponse.ok ||
        !KantorResponse.ok
      ) {
        throw new Error(
          "HTTP error, status = " +
            "Kendaraan code: " +
            kendaraanResponse.status +
            "Jenis Kendaraan code: " +
            jenisKendaraanResponse.status +
            "Kantor code: " +
            KantorResponse.status
        );
      }

      const dataKendaraan = await kendaraanResponse.json();
      const dataJenisKendaraan = await jenisKendaraanResponse.json();
      const dataKantor = await KantorResponse.json();
      setLoading(false);
      setJenisKendaraan(
        Array.isArray(dataJenisKendaraan.data) ? dataJenisKendaraan.data : []
      );
      setKantor(Array.isArray(dataKantor.data) ? dataKantor.data : []);
      setKendaraan(Array.isArray(dataKendaraan.data) ? dataKendaraan.data : []);
    } catch (e) {
      console.error("Error fetching Kendaraan data ", e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKendaraan();
  }, [apiUrl]);

  // start of handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleReset = () => setSearch("");

  const filteredData = kendaraan.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  // end of handle search

  // start of columns definition
  const columns = [
    {
      name: "No",
      selector: (row: Kendaraan, index: number) => ++index,
      sortable: true,
    },
    {
      name: "Nama Kendaraan",
      selector: (row: Kendaraan) => row.name,
      sortable: true,
    },
    {
      name: "Plat Nomor",
      selector: (row: Kendaraan) => row.license_plate,
      sortable: true,
    },
    {
      name: "Konsumsi BBM (L/100km)",
      selector: (row: Kendaraan) => row.fuel_consumption,
      sortable: true,
    },
    {
      name: "Garasi Kantor",
      selector: (row: Kendaraan) => {
        const kantorName = kantor.find(
          (garasi) => garasi.id === row.lokasi_penyimpanan_id
        )?.name;
        return kantorName;
      },
      sortable: true,
    },
    {
      name: "Tanggal Servis",
      selector: (row: Kendaraan) => row.service_date,
      sortable: true,
    },
    {
      name: "Terakhir Digunakan",
      selector: (row: Kendaraan) => row.last_used,
      sortable: true,
    }
  ];
  // end of columns definition

  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold mb-4">Kendaraan</h1>
      <div className="border rounded-md p-4">
        <div className="flex items-center justify-end mb-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Cari nama kendaraan"
              value={search}
              onChange={handleSearch}
              className="border border-gray-300 p-2 rounded-l-md focus:outline-blue-400"
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 p-2 rounded-r-md"
              onClick={handleReset}
            >
              &times;
            </button>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={filteredData}
          progressPending={loading}
          pagination
          highlightOnHover
          pointerOnHover
          noDataComponent={
            <p className="text-center mt-2">
              Data Kendaraan "{search}" tidak ditemukan
            </p>
          }
          persistTableHead
        />
      </div>
    </div>
  );
}
