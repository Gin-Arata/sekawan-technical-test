import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faMapMarkedAlt,
  faIndustry,
  faCar,
  faHistory,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons/faAngleDown";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { useState } from "react";
import { faList } from "@fortawesome/free-solid-svg-icons/faList";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";

interface NavbarSuperAdminProps {
  openSideBar: boolean;
  closeSidebar: () => void;
}

export default function NavbarAdmin({
  openSideBar,
  closeSidebar,
}: NavbarSuperAdminProps) {
  const pathname = usePathname();
  const [isKendaraanOpen, setIsKendaraanOpen] = useState(false);

  // handle dropdown kendaraan
  const handleKendaraan = () => {
    setIsKendaraanOpen(!isKendaraanOpen);
  };

  return (
    <>
      {/* Navbar */}
      <div
        className={`w-72 top-0 bg-sky-700 text-white flex flex-col justify-between ${
          openSideBar ? "fixed top-0 left-0 h-screen z-50" : "hidden"
        } md:sticky md:top-0 md:z-10`}
      >
        <div className="mt-4 flex flex-col justify-between h-full">
          <div className="">
            <div className="text-4xl mb-2">
              <h1 className="text-center">SISEWA</h1>
            </div>
            <hr />
            <div className="">
              <ul>
                <Link href={"/admin/dashboard"}>
                  <li
                    className={`p-4 hover:bg-sky-800 flex items-center ${
                      pathname === "/admin/dashboard" ? "bg-sky-800" : ""
                    }`}
                  >
                    <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
                    Dashboard
                  </li>
                </Link>
                <Link href={"/admin/verifikasi-driver"}>
                  <li
                    className={`p-4 hover:bg-sky-800 flex items-center ${
                      pathname === "/admin/verifikasi-driver" ? "bg-sky-800" : ""
                    }`}
                  >
                    <FontAwesomeIcon icon={faListCheck} className="mr-2" />
                    Verifikasi Driver
                  </li>
                </Link>
                <Link href={"/admin/daerah"}>
                  <li
                    className={`p-4 hover:bg-sky-800 flex items-center ${
                      pathname === "/admin/daerah" ? "bg-sky-800" : ""
                    }`}
                  >
                    <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2" />
                    Daerah
                  </li>
                </Link>
                <Link href={"/admin/tambang"}>
                  <li
                    className={`p-4 hover:bg-sky-800 flex items-center ${
                      pathname === "/admin/tambang" ? "bg-sky-800" : ""
                    }`}
                  >
                    <FontAwesomeIcon icon={faIndustry} className="mr-2" />
                    Tambang
                  </li>
                </Link>
                <Link href={"/admin/kendaraan"} onClick={handleKendaraan}>
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
                    <Link href={"/admin/kendaraan"}>
                      <li
                        className={`p-4 pl-8 hover:bg-sky-800 flex items-center ${
                          pathname === "/admin/kendaraan" ? "bg-sky-800" : ""
                        }`}
                      >
                        <FontAwesomeIcon icon={faCar} className="mr-2" />
                        Detail Kendaraan
                      </li>
                    </Link>
                    <Link href={"/admin/kendaraan/jenis"}>
                      <li
                        className={`p-4 pl-8 hover:bg-sky-800 flex items-center ${
                          pathname === "/admin/kendaraan/jenis"
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
                <Link href={"/admin/history"}>
                  <li
                    className={`p-4 hover:bg-sky-800 flex items-center ${
                      pathname === "/admin/history" ? "bg-sky-800" : ""
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
      {/* End of Navbar */}
    </>
  );
}
