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

export default function JenisKendaraanPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [jenisKendaraan, setJenisKendaraan] = useState<JenisKendaraan[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addModalEdit, setAddModalEdit] = useState(false);
  const [addModalDelete, setAddModalDelete] = useState(false);
  const [selectedJenisKendaraan, setSelectedJenisKendaraan] = useState<JenisKendaraan | null>(null);

  //   fetch api jenis kendaraan data
  const fetchJenisKendaraan = async () => {
    try {
      const response = await fetch(`${apiUrl}/admin/jenis-kendaraan`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("HTTP error, status = " + response.status);
      }

      const data = await response.json();
      setLoading(false);
      setJenisKendaraan(Array.isArray(data.data) ? data.data : []);
    } catch (e) {
      console.error("Error fetching daerah data ", e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJenisKendaraan();
  }, [apiUrl]);

  // start of handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleReset = () => setSearch("");

  const filteredData = jenisKendaraan.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  // end of handle search

  // start of handle modal
  const openAddModal = (e: any) => {
    setAddModalOpen(true);
  };

  const openEditModal = (jenisKendaraan: JenisKendaraan) => {
    setSelectedJenisKendaraan(jenisKendaraan);
    setAddModalEdit(true);
  };

  const openDeleteModal = (jenisKendaraan: JenisKendaraan) => {
    setSelectedJenisKendaraan(jenisKendaraan);
    setAddModalDelete(true);
  };

  const closeModal = () => {
    setAddModalOpen(false);
    setAddModalEdit(false);
    setAddModalDelete(false);
    setSelectedJenisKendaraan(null);
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
          name: e.currentTarget.name.value,
        }),
      });

      if (!response.ok) {
        throw new Error("HTTP error, status = " + response.status);
      } else {
        closeModal();
        fetchJenisKendaraan();
      }
    } catch (error) {
      console.error("Failed to add data", error);
    }
  };

  const handleAddDataSubmit = (e: any) => {
    handleSubmit(e, `${apiUrl}/admin/jenis-kendaraan`, "POST");
  };

  const handleEditDataSubmit = (e: any) => {
    handleSubmit(
      e,
      `${apiUrl}/admin/jenis-kendaraan/${selectedJenisKendaraan?.id}`,
      "PATCH"
    );
  };

  const handleDeleteDataSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${apiUrl}/admin/jenis-kendaraan/${selectedJenisKendaraan?.id}`,
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
        fetchJenisKendaraan();
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
      selector: (row: JenisKendaraan, index: number) => ++index,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row: JenisKendaraan) => row.name,
      sortable: true,
    },
    {
      name: "Detail",
      cell: (row: JenisKendaraan) => (
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
      <h1 className="text-3xl font-bold mb-4">Jenis Kendaraan</h1>
      <div className="border rounded-md p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 p-2 rounded-md"
              onClick={openAddModal}
            >
              + Tambah Jenis Kendaraan
            </button>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Cari nama jenis kendaraan"
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
              Data jenis kendaraan "{search}" tidak ditemukan
            </p>
          }
          persistTableHead
        />
      </div>

      {/* Add modal */}
      <Modal isOpen={addModalOpen} onClose={closeModal} title="Tambah Jenis Kendaraan">
        <div>
          <form method="POST" onSubmit={handleAddDataSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nama Jenis Kendaraan
              </label>
              <input
                type="text"
                name="name"
                placeholder="Nama Jenis Kendaraan"
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
      <Modal isOpen={addModalEdit} onClose={closeModal} title="Edit Jenis Kendaraan">
        <div>
          <form method="POST" onSubmit={handleEditDataSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nama Jenis Kendaraan
              </label>
              <input
                type="text"
                name="name"
                placeholder="Nama Jenis Kendaraan"
                value={selectedJenisKendaraan?.name}
                onChange={(e) =>
                  setSelectedJenisKendaraan({
                    ...selectedJenisKendaraan,
                    name: e.target.value,
                  } as JenisKendaraan)
                }
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
      <Modal isOpen={addModalDelete} onClose={closeModal} title="Hapus Jenis Kendaraan">
        <div>
          <form method="POST" onSubmit={handleDeleteDataSubmit}>
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
