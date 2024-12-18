"use client";

import Modal from "@/components/Modal";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

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

export default function KantorPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [kantor, setKantor] = useState<Kantor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addModalEdit, setAddModalEdit] = useState(false);
  const [addModalDelete, setAddModalDelete] = useState(false);
  const [selectedKantor, setSeletectedKantor] = useState<Kantor | null>(null);

  //   fetch api kantor data
  const fetchKantor = async () => {
    try {
      const response = await fetch(`${apiUrl}/super-admin/kantor`, {
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
      setKantor(Array.isArray(data.data) ? data.data : []);
    } catch (e) {
      console.error("Error fetching kantor data ", e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKantor();
  }, [apiUrl]);

  // start of handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleReset = () => setSearch("");

  const filteredData = kantor.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  // end of handle search

  // start of handle modal
  const openAddModal = (e: any) => {
    setAddModalOpen(true);
  };

  const openEditModal = (kantor: Kantor) => {
    setSeletectedKantor(kantor);
    setAddModalEdit(true);
  };

  const openDeleteModal = (kantor: Kantor) => {
    setSeletectedKantor(kantor);
    setAddModalDelete(true);
  };

  const closeModal = () => {
    setAddModalOpen(false);
    setAddModalEdit(false);
    setAddModalDelete(false);
    setSeletectedKantor(null);
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
          office_code: e.currentTarget.office_code.value,
          address: e.currentTarget.address.value,
          city: e.currentTarget.city.value,
          office_type: e.currentTarget.office_type.value,
        }),
      });

      if (!response.ok) {
        throw new Error("HTTP error, status = " + response.status);
      } else {
        closeModal();
        fetchKantor();
      }
    } catch (error) {
      console.error("Failed to add data", error);
    }
  };

  const handleAddDataSubmit = (e: any) => {
    handleSubmit(e, `${apiUrl}/super-admin/kantor`, "POST");
  };

  const handleEditDataSubmit = (e: any) => {
    handleSubmit(
      e,
      `${apiUrl}/super-admin/kantor/${selectedKantor?.id}`,
      "PATCH"
    );
  };

  const handleDeleteDataSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${apiUrl}/super-admin/kantor/${selectedKantor?.id}`,
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
        fetchKantor();
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
      selector: (row: Kantor, index: number) => ++index,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row: Kantor) => row.name,
      sortable: true,
    },
    {
      name: "Kode Kantor",
      selector: (row: Kantor) => row.office_code,
      sortable: true,
    },
    {
      name: "Alamat",
      selector: (row: Kantor) => row.address,
      sortable: true,
    },
    {
      name: "Kota",
      selector: (row: Kantor) => row.city,
      sortable: true,
    },
    {
      name: "Jenis Kantor",
      selector: (row: Kantor) => row.office_type,
      sortable: true,
    },
    {
      name: "Detail",
      cell: (row: Kantor) => (
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
      <h1 className="text-3xl font-bold mb-4">Kantor</h1>
      <div className="border rounded-md p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 p-2 rounded-md text-sm md:text-base"
              onClick={openAddModal}
            >
              + Kantor
            </button>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Cari nama kantor"
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
              Data kantor "{search}" tidak ditemukan
            </p>
          }
          persistTableHead
        />
      </div>

      {/* Add modal */}
      <Modal isOpen={addModalOpen} onClose={closeModal} title="Tambah Kantor">
        <div>
          <form method="POST" onSubmit={handleAddDataSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nama Kantor
              </label>
              <input
                type="text"
                name="name"
                placeholder="Nama Kantor"
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">
                Kode Kantor
              </label>
              <input
                type="text"
                name="office_code"
                placeholder="Kode Kantor"
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">
                Alamat
              </label>
              <input
                type="text"
                name="address"
                placeholder="Alamat"
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">
                Kota
              </label>
              <input
                type="text"
                name="city"
                placeholder="Kota"
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">
                Jenis Kantor
              </label>
              <select
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
                name="office_type"
              >
                <option value="">Pilih Jenis (Pusat/Cabang)</option>
                <option value="Kantor Cabang">Kantor Cabang</option>
                <option value="Kantor Pusat">Kantor Pusat</option>
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

      {/* Edit modal */}
      <Modal isOpen={addModalEdit} onClose={closeModal} title="Edit Kantor">
        <div>
          <form method="POST" onSubmit={handleEditDataSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nama Kantor
              </label>
              <input
                type="text"
                name="name"
                placeholder="Nama Kantor"
                value={selectedKantor?.name}
                onChange={(e) =>
                  setSeletectedKantor({
                    ...selectedKantor,
                    name: e.target.value,
                  } as Kantor)
                }
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">
                Kode Kantor
              </label>
              <input
                type="text"
                name="office_code"
                placeholder="Kode Kantor"
                value={selectedKantor?.office_code}
                onChange={(e) =>
                  setSeletectedKantor({
                    ...selectedKantor,
                    office_code: e.target.value,
                  } as Kantor)
                }
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">
                Alamat
              </label>
              <input
                type="text"
                name="address"
                placeholder="Alamat"
                value={selectedKantor?.address}
                onChange={(e) =>
                  setSeletectedKantor({
                    ...selectedKantor,
                    address: e.target.value,
                  } as Kantor)
                }
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">
                Kota
              </label>
              <input
                type="text"
                name="city"
                placeholder="Kota"
                value={selectedKantor?.city}
                onChange={(e) =>
                  setSeletectedKantor({
                    ...selectedKantor,
                    city: e.target.value,
                  } as Kantor)
                }
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">
                Jenis Kantor
              </label>
              <select
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
                name="office_type"
                defaultValue={selectedKantor?.office_type}
              >
                <option value="">Pilih Jenis (Pusat/Cabang)</option>
                <option value="Kantor Cabang">Kantor Cabang</option>
                <option value="Kantor Pusat">Kantor Pusat</option>
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

      {/* Delete modal */}
      <Modal isOpen={addModalDelete} onClose={closeModal} title="Hapus Kantor">
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
