import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faMapMarkedAlt,
  faIndustry,
  faBuilding,
  faCar,
  faUsers,
  faHistory,
  faAngleRight,
  faAngleDown,
  faList,
  faUserShield,
  faArrowLeftLong,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavbarSuperAdminProps {
  openSideBar: boolean;
  closeSidebar: () => void;
}

export default function NavbarSuperAdmin({
  openSideBar,
  closeSidebar,
}: NavbarSuperAdminProps) {
  const pathname = usePathname();
  const [isKendaraanOpen, setIsKendaraanOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  // handle dropdown kendaraan
  const handleKendaraan = () => {
    setIsKendaraanOpen(!isKendaraanOpen);
  };

  // handle dropdown user
  const handleUser = () => {
    setIsUserOpen(!isUserOpen);
  };

  return (
    <div
      className={`w-72 top-0 bg-sky-700 text-white flex flex-col justify-between ${
        openSideBar ? "fixed top-0 left-0 h-screen z-50" : "hidden"
      } md:sticky md:top-0`}
    >
      <div className="mt-4 flex flex-col justify-between h-full">
        <div className="">
          <div className="text-4xl mb-2">
            <h1 className="text-center">SISEWA</h1>
          </div>
          <hr />
          <div className="">
            <ul>
              <Link href={"/super-admin/dashboard"}>
                <li
                  className={`p-4 hover:bg-sky-800 flex items-center ${
                    pathname === "/super-admin/dashboard" ? "bg-sky-800" : ""
                  }`}
                >
                  <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
                  Dashboard
                </li>
              </Link>
              <Link href={"/super-admin/daerah"}>
                <li
                  className={`p-4 hover:bg-sky-800 flex items-center ${
                    pathname === "/super-admin/daerah" ? "bg-sky-800" : ""
                  }`}
                >
                  <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2" />
                  Daerah
                </li>
              </Link>
              <Link href={"/super-admin/tambang"}>
                <li
                  className={`p-4 hover:bg-sky-800 flex items-center ${
                    pathname === "/super-admin/tambang" ? "bg-sky-800" : ""
                  }`}
                >
                  <FontAwesomeIcon icon={faIndustry} className="mr-2" />
                  Tambang
                </li>
              </Link>
              <Link href={"/super-admin/kantor"}>
                <li
                  className={`p-4 hover:bg-sky-800 flex items-center ${
                    pathname === "/super-admin/kantor" ? "bg-sky-800" : ""
                  }`}
                >
                  <FontAwesomeIcon icon={faBuilding} className="mr-2" />
                  Kantor
                </li>
              </Link>
              <Link href={"/super-admin/kendaraan"} onClick={handleKendaraan}>
                <li className={`p-4 hover:bg-sky-800 flex items-center`}>
                  <FontAwesomeIcon icon={faCar} className="mr-2" />
                  Kendaraan
                  <button className="ml-auto">
                    {isKendaraanOpen ? (
                      <FontAwesomeIcon icon={faAngleDown} />
                    ) : (
                      <FontAwesomeIcon icon={faAngleRight} />
                    )}
                  </button>
                </li>
              </Link>
              {isKendaraanOpen && (
                <ul className="">
                  <Link href={"/super-admin/kendaraan"}>
                    <li
                      className={`p-4 pl-8 hover:bg-sky-800 flex items-center ${
                        pathname === "/super-admin/kendaraan"
                          ? "bg-sky-800"
                          : ""
                      }`}
                    >
                      <FontAwesomeIcon icon={faCar} className="mr-2" />
                      Detail Kendaraan
                    </li>
                  </Link>
                  <Link href={"/super-admin/kendaraan/jenis"}>
                    <li
                      className={`p-4 pl-8 hover:bg-sky-800 flex items-center ${
                        pathname === "/super-admin/kendaraan/jenis"
                          ? "bg-sky-800"
                          : ""
                      }`}
                    >
                      <FontAwesomeIcon icon={faList} className="mr-2" />
                      Jenis Kendaraan
                    </li>
                  </Link>
                </ul>
              )}
              <Link href={"/super-admin/user"}>
                <li
                  className={`p-4 hover:bg-sky-800 flex items-center`}
                  onClick={handleUser}
                >
                  <FontAwesomeIcon icon={faUsers} className="mr-2" />
                  User
                  <button className="ml-auto">
                    {isUserOpen ? (
                      <FontAwesomeIcon icon={faAngleDown} />
                    ) : (
                      <FontAwesomeIcon icon={faAngleRight} />
                    )}
                  </button>
                </li>
              </Link>
              {isUserOpen && (
                <ul className="">
                  <Link href={"/super-admin/user"}>
                    <li
                      className={`p-4 pl-8 hover:bg-sky-800 flex items-center ${
                        pathname === "/super-admin/user" ? "bg-sky-800" : ""
                      }`}
                    >
                      <FontAwesomeIcon icon={faUsers} className="mr-2" />
                      User
                    </li>
                  </Link>
                  <Link href={"/super-admin/user/role"}>
                    <li
                      className={`p-4 pl-8 hover:bg-sky-800 flex items-center ${
                        pathname === "/super-admin/user/role"
                          ? "bg-sky-800"
                          : ""
                      }`}
                    >
                      <FontAwesomeIcon icon={faUserShield} className="mr-2" />
                      Role
                    </li>
                  </Link>
                </ul>
              )}
              <Link href={"/super-admin/history"}>
                <li
                  className={`p-4 hover:bg-sky-800 flex items-center ${
                    pathname === "/super-admin/history" ? "bg-sky-800" : ""
                  }`}
                >
                  <FontAwesomeIcon icon={faHistory} className="mr-2" />
                  History
                </li>
              </Link>
            </ul>
          </div>
        </div>
        <div
          className="w-full flex justify-center mt-4 pb-10 cursor-pointer"
          onClick={closeSidebar}
        >
          <FontAwesomeIcon icon={faTimes} fontSize={30} />
        </div>
      </div>
    </div>
  );
}
