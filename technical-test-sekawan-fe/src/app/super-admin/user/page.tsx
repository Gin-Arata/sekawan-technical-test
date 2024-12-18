"use client";

import Modal from "@/components/Modal";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role_id: number;
  created_at: Date;
  updated_at: Date;
}

interface Role {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export default function UserPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [user, setUser] = useState<User[]>([]);
  const [role, setRole] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addModalEdit, setAddModalEdit] = useState(false);
  const [addModalDelete, setAddModalDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  //   fetch api user data
  const fetchData = async () => {
    try {
      const [userResponse, roleResponse] = await Promise.all([
        fetch(`${apiUrl}/super-admin/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
        fetch(`${apiUrl}/super-admin/role`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
      ]);

      if (!userResponse.ok || !roleResponse.ok) {
        throw new Error(
          "HTTP error, status = " +
            "user response: " +
            userResponse.status +
            "role response: " +
            roleResponse.status
        );
      }

      const userData = await userResponse.json();
      const roleData = await roleResponse.json();
      setLoading(false);
      setUser(Array.isArray(userData.data) ? userData.data : []);
      setRole(Array.isArray(roleData.data) ? roleData.data : []);
    } catch (e) {
      console.error("Error fetching user/role data ", e);
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

  const filteredData = user.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  // end of handle search

  // start of handle modal
  const openAddModal = (e: any) => {
    setAddModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setAddModalEdit(true);
  };

  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setAddModalDelete(true);
  };

  const closeModal = () => {
    setAddModalOpen(false);
    setAddModalEdit(false);
    setAddModalDelete(false);
    setSelectedUser(null);
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
          email: e.currentTarget.email.value,
          password: e.currentTarget.password.value,
          role_id: e.currentTarget.role_id.value,
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

  const handleAddDataSubmit = (e: any) => {
    handleSubmit(e, `${apiUrl}/super-admin/user`, "POST");
  };

  const handleEditDataSubmit = (e: any) => {
    handleSubmit(e, `${apiUrl}/super-admin/user/${selectedUser?.id}`, "PATCH");
  };

  const handleDeleteDataSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${apiUrl}/super-admin/user/${selectedUser?.id}`,
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
        fetchData();
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
      selector: (row: User, index: number) => ++index,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row: User) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: User) => row.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row: User) => {
        const roleName = role.find((r) => r.id === row.role_id)?.name;
        return roleName;
      },
      sortable: true,
    },
    {
      name: "Detail",
      cell: (row: User) => (
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
      <h1 className="text-3xl font-bold mb-4">User</h1>
      <div className="border rounded-md p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 p-2 rounded-md text-sm md:text-base"
              onClick={openAddModal}
            >
              + User
            </button>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Cari nama user"
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
              Data user "{search}" tidak ditemukan
            </p>
          }
          persistTableHead
        />
      </div>

      {/* Add modal */}
      <Modal isOpen={addModalOpen} onClose={closeModal} title="Tambah User">
        <div>
          <form method="POST" onSubmit={handleAddDataSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nama User
              </label>
              <input
                type="text"
                name="name"
                placeholder="Nama User"
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
                Email
              </label>
              <input
                type="text"
                name="email"
                placeholder="Email User"
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password User"
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
                Role User
              </label>
              <select className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400" name="role_id">
                <option value="">Pilih Role User</option>
                {role.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
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
      <Modal isOpen={addModalEdit} onClose={closeModal} title="Edit User">
        <div>
          <form method="POST" onSubmit={handleEditDataSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nama User
              </label>
              <input
                type="text"
                name="name"
                placeholder="Nama User"
                value={selectedUser?.name}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    name: e.target.value,
                  } as User)
                }
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email User
              </label>
              <input
                type="text"
                name="email"
                placeholder="Email User"
                value={selectedUser?.email}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    email: e.target.value,
                  } as User)
                }
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
                Password User
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password User"
                value={selectedUser?.password}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    password: e.target.value,
                  } as User)
                }
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
                Password User
              </label>
              <select
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-blue-400"
                name="role_id"
                defaultValue={selectedUser?.role_id}
              >
                {role.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
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
      <Modal isOpen={addModalDelete} onClose={closeModal} title="Hapus User">
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
