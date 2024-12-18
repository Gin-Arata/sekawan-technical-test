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

interface HistoryPenyewaan {
  id: number;
  user_id: number;
  kendaraan_id: number;
  tanggal_sewa: string;
  tanggal_kembali: string;
  tambang_tujuan_id: number;
  driver_id: number;
  status: string;
  created_at: Date;
  updated_at: Date;
}

interface User {
  id: number;
  name: string;
  role_id: number;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

interface Driver {
  id: number;
  name: string;
  role_id: number;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export default function DaerahPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [history, setHistory] = useState<HistoryPenyewaan[]>([]);
  const [driver, setDriver] = useState<Driver[]>([]);
  const [user, setUser] = useState<User[]>([]);
  const [tambang, setTambang] = useState<Tambang[]>([]);
  const [kendaraan, setKendaraan] = useState<Kendaraan[]>([]);
  const [kantor, setKantor] = useState<Kantor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [addModalEdit, setAddModalEdit] = useState(false);
  const [addModalDelete, setAddModalDelete] = useState(false);
  const [selectedHistory, setSelectedHistory] =
    useState<HistoryPenyewaan | null>(null);

  //   fetch api daerah data
  const fetchData = async () => {
    try {
      const [
        historyResponse,
        tambangResponse,
        kendaraanResponse,
        kantorResponse,
        userResponse,
      ] = await Promise.all([
        fetch(`${apiUrl}/admin/pending-sewa`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
        fetch(`${apiUrl}/admin/tambang`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
        fetch(`${apiUrl}/admin/kendaraan`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
        fetch(`${apiUrl}/admin/kantor`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
        fetch(`${apiUrl}/admin/user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
      ]);

      if (!historyResponse.ok) {
        throw new Error("HTTP error, status = " + historyResponse.status);
      }

      const dataHistory = await historyResponse.json();
      const dataTambang = await tambangResponse.json();
      const dataKendaraan = await kendaraanResponse.json();
      const dataKantor = await kantorResponse.json();
      const dataUser = await userResponse.json();
      const filteredDataUser = dataUser.data.filter((u) => u.role_id === 5);
      setLoading(false);
      setHistory(Array.isArray(dataHistory.data) ? dataHistory.data : []);
      setTambang(Array.isArray(dataTambang.data) ? dataTambang.data : []);
      setKendaraan(Array.isArray(dataKendaraan.data) ? dataKendaraan.data : []);
      setKantor(Array.isArray(dataKantor.data) ? dataKantor.data : []);
      setUser(Array.isArray(dataUser.data) ? dataUser.data : []);
      setDriver(Array.isArray(filteredDataUser) ? filteredDataUser : []);
    } catch (e) {
      console.error("Error fetching daerah data ", e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiUrl]);

  // start of handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleReset = () => setSearch("");

  const filteredData = history.filter(
    (item) =>
      kendaraan
        .find((k) => k.id === item.kendaraan_id)
        ?.name.toLowerCase()
        .includes(search.toLowerCase()) ||
      tambang
        .find((t) => t.id === item.tambang_tujuan_id)
        ?.name.toLowerCase()
        .includes(search.toLowerCase()) ||
      user
        .find((u) => u.id === item.user_id)
        ?.name.toLowerCase()
        .includes(search.toLowerCase())
  );
  // end of handle search

  // start of handle modal
  const openEditModal = (historyPenyewaan: HistoryPenyewaan) => {
    setSelectedHistory(historyPenyewaan);
    setAddModalEdit(true);
  };

  const closeModal = () => {
    setAddModalEdit(false);
    setAddModalDelete(false);
    setSelectedHistory(null);
  };
  // end of handle modal

  // start of handle submit
  const handleSubmit = async (e: any, url: string, method: string) => {
    e.preventDefault();

    try {
      const response = await fetch(`${url}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          driver_id: e.currentTarget.driver_id.value,
        }),
      });

      if (!response.ok) {
        throw new Error("HTTP error, status = " + response.status);
      } else {
        closeModal();
        fetchData();
      }
    } catch (error) {
      console.error("Failed to add data", error);
    }
  };

  const handleEditDataSubmit = (e: any) => {
    handleSubmit(
      e,
      `${apiUrl}/admin/history-penyewaan/${selectedHistory?.id}`,
      "PATCH"
    );
  };
  // end of handle submit

  // start of columns definition
  const columns = [
    {
      name: "No",
      selector: (row: HistoryPenyewaan, index: number) => ++index,
      sortable: true,
    },
    {
      name: "Penyewa",
      selector: (row: HistoryPenyewaan) => {
        const userName = user.find((u) => u.id === row.user_id)?.name;
        return userName;
      },
      sortable: true,
    },
    {
      name: "Kendaraan",
      selector: (row: HistoryPenyewaan) => {
        const kendaraanName = kendaraan.find(
          (k) => k.id === row.kendaraan_id
        )?.name;
        return kendaraanName;
      },
      sortable: true,
    },
    {
      name: "Tambang Tujuan",
      selector: (row: HistoryPenyewaan) => {
        const tambangName = tambang.find(
          (t) => t.id === row.tambang_tujuan_id
        )?.name;
        return tambangName;
      },
      sortable: true,
    },
    {
      name: "Driver",
      selector: (row: HistoryPenyewaan) => {
        const driverName = user.find((u) => u.id === row.driver_id)?.name;
        return driverName;
      },
      sortable: true,
    },
    {
      name: "Garasi",
      selector: (row: HistoryPenyewaan) => {
        const garasiName = kantor.find(
          (k) =>
            k.id ===
            kendaraan.find((k) => k.id === row.kendaraan_id)
              ?.lokasi_penyimpanan_id
        )?.name;
        return garasiName;
      },
      sortable: true,
    },
    {
      name: "Tanggal Sewa",
      selector: (row: HistoryPenyewaan) => row.tanggal_sewa,
      sortable: true,
    },
    {
      name: "Tanggal Kembali",
      selector: (row: HistoryPenyewaan) => row.tanggal_kembali,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: HistoryPenyewaan) => (
        <span
          className={`text-white font-bold py-2 px-2 ${
            row.status === "Pending"
              ? "bg-yellow-500"
              : row.status === "Approved"
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Detail",
      cell: (row: HistoryPenyewaan) => (
        <div className="flex space-x-2">
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-2 rounded"
            onClick={() => openEditModal(row)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: "true",
    },
  ];
  // end of columns definition

  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold mb-4">Verifikasi Driver</h1>
      <div className="border rounded-md p-4">
        <div className="flex items-center justify-end mb-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Cari nama kendaraan, tambang, atau penyewa"
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
              Data history "{search}" tidak ditemukan
            </p>
          }
          persistTableHead
        />
      </div>

      {/* Edit modal */}
      <Modal
        isOpen={addModalEdit}
        onClose={closeModal}
        title={`Pilih Driver Penyewa ${
          user.find((u) => u.id === selectedHistory?.user_id)?.name
        }`}
      >
        <div>
          <form method="POST" onSubmit={handleEditDataSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">
                Driver
              </label>
              <select
                name="driver_id"
                value={selectedHistory?.driver_id || ""}
                onChange={(e) =>
                  setSelectedHistory({
                    ...selectedHistory,
                    driver_id: parseInt(e.target.value),
                  } as HistoryPenyewaan)
                }
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              >
                <option value="">Pilih Driver</option>
                {driver.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold px-4 p-2 rounded-md mr-2"
              >
                &times; Batal
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 p-2 rounded-md"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
