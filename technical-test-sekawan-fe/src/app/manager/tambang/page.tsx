"use client";

import Modal from "@/components/Modal";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

interface Tambang {
  id: number;
  name: string;
  daerah_id: number;
  mine_code: string;
  created_at: Date;
  updated_at: Date;
}

interface Daerah {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export default function TambangPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [tambang, setTambang] = useState<Tambang[]>([]);
  const [daerah, setDaerah] = useState<Daerah[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // start of fetch data
  const fetchTambang = async () => {
    try {
      const [daerahResponse, tambangResponse] = await Promise.all([
        fetch(`${apiUrl}/manager/daerah`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
        fetch(`${apiUrl}/manager/tambang`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
      ]);

      if (!daerahResponse.ok || !tambangResponse.ok) {
        throw new Error(
          "HTTP error, status = " +
            daerahResponse.status +
            " or " +
            tambangResponse.status
        );
      }

      const dataDaerah = await daerahResponse.json();
      const dataTambang = await tambangResponse.json();

      setLoading(false);
      setDaerah(Array.isArray(dataDaerah.data) ? dataDaerah.data : []);
      setTambang(Array.isArray(dataTambang.data) ? dataTambang.data : []);
    } catch (e) {
      console.error("Error fetching tambang data ", e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTambang();
  }, [apiUrl]);

  // end of fetch data

  // start of handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleReset = () => setSearch("");

  const filteredData = tambang.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  // end of handle search

  // start of columns definition
  const columns = [
    {
      name: "No",
      selector: (row: Tambang, index: number) => ++index,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row: Tambang) => row.name,
      sortable: true,
    },
    {
      name: "Daerah",
      selector: (row: Tambang) => {
        const daerahName = daerah.find((d) => d.id === row.daerah_id)?.name;
        return daerahName;
      },
      sortable: true,
    },
    {
      name: "Mine Code",
      selector: (row: Tambang) => row.mine_code,
      sortable: true,
    },
  ];
  // end of columns definition

  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold mb-4">Tambang</h1>
      <div className="border rounded-md p-4">
        <div className="flex items-center justify-end mb-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Cari nama tambang"
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
              Data tambang "{search}" tidak ditemukan
            </p>
          }
          persistTableHead
        />
      </div>
    </div>
  );
}
