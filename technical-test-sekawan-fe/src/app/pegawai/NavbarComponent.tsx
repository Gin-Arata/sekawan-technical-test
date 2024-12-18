import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faCar,
  faHistory,
  faCarSide,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";

interface NavbarPegawaiProps {
  openSideBar: boolean;
  closeSidebar: () => void;
}

export default function NavbarPegawai({
  openSideBar,
  closeSidebar,
}: NavbarPegawaiProps) {
  const pathname = usePathname();

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
            <ul>
              <Link href={"/pegawai/dashboard"}>
                <li
                  className={`p-4 hover:bg-sky-800 flex items-center ${
                    pathname === "/pegawai/dashboard" ? "bg-sky-800" : ""
                  }`}
                >
                  <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
                  Dashboard
                </li>
              </Link>
              <Link href={"/pegawai/sewa-kendaraan"}>
                <li
                  className={`p-4 hover:bg-sky-800 flex items-center ${
                    pathname === "/pegawai/sewa-kendaraan" ? "bg-sky-800" : ""
                  }`}
                >
                  <FontAwesomeIcon icon={faCarSide} className="mr-2" />
                  Sewa Kendaraan
                </li>
              </Link>
              <Link href={"/pegawai/kendaraan"}>
                <li
                  className={`p-4 hover:bg-sky-800 flex items-center ${
                    pathname === "/pegawai/kendaraan" ? "bg-sky-800" : ""
                  }`}
                >
                  <FontAwesomeIcon icon={faCar} className="mr-2" />
                  Kendaraan
                </li>
              </Link>
              <Link href={"/pegawai/history"}>
                <li
                  className={`p-4 hover:bg-sky-800 flex items-center ${
                    pathname === "/pegawai/history" ? "bg-sky-800" : ""
                  }`}
                >
                  <FontAwesomeIcon icon={faHistory} className="mr-2" />
                  History
                </li>
              </Link>
            </ul>
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
