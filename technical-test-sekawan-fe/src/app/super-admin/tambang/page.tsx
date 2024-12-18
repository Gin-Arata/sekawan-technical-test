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
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addModalEdit, setAddModalEdit] = useState(false);
  const [addModalDelete, setAddModalDelete] = useState(false);
  const [selectedTambang, setSelectedTambang] = useState<Tambang | null>(null);

  // start of fetch data
  const fetchTambang = async () => {
    try {
      const [daerahResponse, tambangResponse] = await Promise.all([
        fetch(`${apiUrl}/super-admin/daerah`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
        fetch(`${apiUrl}/super-admin/tambang`, {
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

  // start of handle modal
  const openAddModal = (e: any) => {
    setAddModalOpen(true);
  };

  const openEditModal = (tambang: Tambang) => {
    setSelectedTambang(tambang);
    setAddModalEdit(true);
  };

  const openDeleteModal = (tambang: Tambang) => {
    setSelectedTambang(tambang);
    setAddModalDelete(true);
  };

  const closeModal = () => {
    setAddModalOpen(false);
    setAddModalEdit(false);
    setAddModalDelete(false);
    setSelectedTambang(null);
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
          mine_code: e.currentTarget.mine_code.value,
          daerah_id: e.currentTarget.daerah_id.value,
        }),
      });

      if (!response.ok) {
        throw new Error("HTTP error, status = " + response.status);
      } else {
        closeModal();
        fetchTambang();
      }
    } catch (error) {
      console.error("Failed to add data", error);
    }
  };

  const handleAddDataSubmit = (e: any) => {
    handleSubmit(e, `${apiUrl}/super-admin/tambang`, "POST");
  };

  const handleEditDataSubmit = (e: any) => {
    handleSubmit(
      e,
      `${apiUrl}/super-admin/tambang/${selectedTambang?.id}`,
      "PATCH"
    );
  };

  const handleDeleteDataSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${apiUrl}/super-admin/tambang/${selectedTambang?.id}`,
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
        fetchTambang();
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
    {
      name: "Detail",
      cell: (row: Tambang) => (
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
      <h1 className="text-3xl font-bold mb-4">Tambang</h1>
      <div className="border rounded-md p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 p-2 rounded-md text-sm md:text-base"
              onClick={openAddModal}
            >
              + Tambang
            </button>
          </div>
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
              Data daerah "{search}" tidak ditemukan
            </p>
          }
          persistTableHead
        />
      </div>

      {/* Add modal */}
      <Modal isOpen={addModalOpen} onClose={closeModal} title="Tambah Tambang">
        <div>
          <form method="POST" onSubmit={handleAddDataSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nama Tambang
              </label>
              <input
                type="text"
                name="name"
                placeholder="Nama Tambang"
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">
                Kode Tambang
              </label>
              <input
                type="text"
                name="mine_code"
                placeholder="Nama Tambang"
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">
                Nama Daerah
              </label>
              <select
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
                name="daerah_id"
              >
                <option value="">Pilih Daerah</option>
                {daerah.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
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

      {/* Edit modal */}
      <Modal isOpen={addModalEdit} onClose={closeModal} title="Edit Tambang">
        <div>
          <form method="POST" onSubmit={handleEditDataSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nama Tambang
              </label>
              <input
                type="text"
                name="name"
                placeholder="Nama Tambang"
                value={selectedTambang?.name}
                onChange={(e) =>
                  setSelectedTambang({
                    ...selectedTambang,
                    name: e.target.value,
                  } as Tambang)
                }
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">
                Nama Tambang
              </label>
              <input
                type="text"
                name="mine_code"
                placeholder="Kode Tambang"
                value={selectedTambang?.mine_code}
                onChange={(e) =>
                  setSelectedTambang({
                    ...selectedTambang,
                    mine_code: e.target.value,
                  } as Tambang)
                }
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">
                Nama Daerah
              </label>
              <select
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
                name="daerah_id"
                defaultValue={selectedTambang?.daerah_id}
              >
                <option value="">Pilih Daerah</option>
                {daerah.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
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

      {/* Delete modal */}
      <Modal isOpen={addModalDelete} onClose={closeModal} title="Hapus Tambang">
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
