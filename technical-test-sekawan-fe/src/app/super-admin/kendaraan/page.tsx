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

  //   fetch api Kendaraan data
  const fetchKendaraan = async () => {
    try {
      const [kendaraanResponse, jenisKendaraanResponse, KantorResponse] =
        await Promise.all([
          fetch(`${apiUrl}/super-admin/kendaraan`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          fetch(`${apiUrl}/super-admin/jenis-kendaraan`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          fetch(`${apiUrl}/super-admin/kantor`, {
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

  // start of handle modal
  const openAddModal = (e: any) => {
    setAddModalOpen(true);
  };

  const openEditModal = (kendaraan: Kendaraan) => {
    setSelectedKendaraan(kendaraan);
    setAddModalEdit(true);
  };

  const openDeleteModal = (kendaraan: Kendaraan) => {
    setSelectedKendaraan(kendaraan);
    setAddModalDelete(true);
  };

  const closeModal = () => {
    setAddModalOpen(false);
    setAddModalEdit(false);
    setAddModalDelete(false);
    setSelectedKendaraan(null);
  };
  // end of handle modal

  // start of handle submit
  const handleSubmit = async (e: any, url: string, method: string) => {
    e.preventDefault();

    try {
      const response = await fetch(`${url}`, {
        method: method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: e.target.name.value,
          license_plate: e.target.license_plate.value,
          fuel_consumption: e.target.fuel_consumption.value,
          jenis_kendaraan_id: e.target.jenis_kendaraan_id.value,
          lokasi_penyimpanan_id: e.target.lokasi_penyimpanan_id.value,
          service_date: e.target.service_date.value,
          last_used: e.target.last_used.value,
        }),
      });

      if (!response.ok) {
        throw new Error("HTTP error, status = " + response.status);
      } else {
        closeModal();
        fetchKendaraan();
      }
    } catch (error) {
      console.error("Failed to add data", error);
    }
  };

  const handleAddDataSubmit = (e: any) => {
    handleSubmit(e, `${apiUrl}/super-admin/kendaraan`, "POST");
  };

  const handleEditDataSubmit = (e: any) => {
    handleSubmit(
      e,
      `${apiUrl}/super-admin/kendaraan/${selectedKendaraan?.id}`,
      "PATCH"
    );
  };

  const handleDeleteDataSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${apiUrl}/super-admin/kendaraan/${selectedKendaraan?.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("HTTP error, status = " + response.status);
      } else {
        closeModal();
        fetchKendaraan();
      }
    } catch (error) {
      console.error("Failed to add data", error);
    }
  };
  // end of handle submit

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
    },
    {
      name: "Detail",
      cell: (row: Kendaraan) => (
        <div className="flex space-x-2">
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-2 rounded"
            onClick={() => openEditModal(row)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded"
            onClick={() => openDeleteModal(row)}
          >
            <FontAwesomeIcon icon={faTrashCan} />
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
      <h1 className="text-3xl font-bold mb-4">Kendaraan</h1>
      <div className="border rounded-md p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 p-2 rounded-md text-sm md:text-base"
              onClick={openAddModal}
            >
              + Kendaraan
            </button>
          </div>
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

      {/* Add modal */}
      <Modal
        isOpen={addModalOpen}
        onClose={closeModal}
        title="Tambah Kendaraan"
      >
        <div>
          <form method="POST" onSubmit={handleAddDataSubmit} encType="multipart/form-data">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nama Kendaraan
              </label>
              <input
                type="text"
                name="name"
                placeholder="Nama Kendaraan"
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">
                Plat Nomor
              </label>
              <input
                type="text"
                name="license_plate"
                placeholder="Plat Nomor"
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">
                Konsumsi BBM (L/100km)
              </label>
              <input
                type="text"
                name="fuel_consumption"
                placeholder="Konsumsi BBM (L/100km)"
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">
                Jenis Kendaraan
              </label>
              <select
                name="jenis_kendaraan_id"
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              >
                <option value="">Pilih Jenis Kendaraan</option>
                {jenisKendaraan.map((jenis) => (
                  <option key={jenis.id} value={jenis.id}>
                    {jenis.name}
                  </option>
                ))}
              </select>
              <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">
                Garasi
              </label>
              <select
                name="lokasi_penyimpanan_id"
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              >
                <option value="">Pilih Garasi</option>
                {kantor.map((garasi) => (
                  <option key={garasi.id} value={garasi.id}>
                    {garasi.name}
                  </option>
                ))}
              </select>
              <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">
                Tanggal Servis
              </label>
              <input
                type="date"
                name="service_date"
                placeholder="Tanggal Servis"
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">
                Terakhir Digunakan
              </label>
              <input
                type="date"
                name="last_used"
                placeholder="Terakhir Digunakan"
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              />
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

      {/* Edit modal */}
      <Modal isOpen={addModalEdit} onClose={closeModal} title="Edit Kendaraan">
        <div>
          <form method="PATCH" onSubmit={handleEditDataSubmit} encType="multipart/form-data">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nama Kendaraan
              </label>
              <input
                type="text"
                name="name"
                placeholder="Nama Kendaraan"
                value={selectedKendaraan?.name}
                onChange={(e) =>
                  setSelectedKendaraan({
                    ...selectedKendaraan,
                    name: e.target.value,
                  } as Kendaraan)
                }
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">
                Plat Nomor
              </label>
              <input
                type="text"
                name="license_plate"
                value={selectedKendaraan?.license_plate}
                onChange={(e) =>
                  setSelectedKendaraan({
                    ...selectedKendaraan,
                    name: e.target.value,
                  } as Kendaraan)
                }
                placeholder="Plat Nomor"
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">
                Konsumsi BBM (L/100km)
              </label>
              <input
                type="text"
                name="fuel_consumption"
                value={selectedKendaraan?.fuel_consumption}
                onChange={(e) =>
                  setSelectedKendaraan({
                    ...selectedKendaraan,
                    name: e.target.value,
                  } as Kendaraan)
                }
                placeholder="Konsumsi BBM (L/100km)"
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">
                Jenis Kendaraan
              </label>
              <select
                name="jenis_kendaraan_id"
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
                defaultValue={selectedKendaraan?.jenis_kendaraan_id}
                onChange={(e) =>
                  setSelectedKendaraan({
                    ...selectedKendaraan,
                    name: e.target.value,
                  } as Kendaraan)
                }
              >
                <option value="">Pilih Jenis Kendaraan</option>
                {jenisKendaraan.map((jenis) => (
                  <option key={jenis.id} value={jenis.id}>
                    {jenis.name}
                  </option>
                ))}
              </select>
              <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">
                Garasi
              </label>
              <select
                name="lokasi_penyimpanan_id"
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
                defaultValue={selectedKendaraan?.lokasi_penyimpanan_id}
                onChange={(e) =>
                  setSelectedKendaraan({
                    ...selectedKendaraan,
                    name: e.target.value,
                  } as Kendaraan)
                }
              >
                <option value="">Pilih Garasi</option>
                {kantor.map((garasi) => (
                  <option key={garasi.id} value={garasi.id}>
                    {garasi.name}
                  </option>
                ))}
              </select>
              <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">
                Tanggal Servis
              </label>
              <input
                type="date"
                name="service_date"
                defaultValue={selectedKendaraan?.service_date}
                onChange={(e) =>
                  setSelectedKendaraan({
                    ...selectedKendaraan,
                    name: e.target.value,
                  } as Kendaraan)
                }
                placeholder="Tanggal Servis"
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">
                Terakhir Digunakan
              </label>
              <input
                type="date"
                name="last_used"
                defaultValue={selectedKendaraan?.last_used}
                onChange={(e) =>
                  setSelectedKendaraan({
                    ...selectedKendaraan,
                    name: e.target.value,
                  } as Kendaraan)
                }
                placeholder="Terakhir Digunakan"
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              />
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

      {/* Delete modal */}
      <Modal
        isOpen={addModalDelete}
        onClose={closeModal}
        title="Hapus Kendaraan"
      >
        <div>
          <form method="DELETE" onSubmit={handleDeleteDataSubmit}>
            <div className="mb-4">
              <p>Apakah anda yakin ingin menghapus data ini?</p>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 p-2 rounded-md"
              >
                Hapus
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold px-4 p-2 rounded-md ml-2"
              >
                &times; Batal
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
