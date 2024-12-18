import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faMapMarkedAlt,
  faIndustry,
  faBuilding,
  faCar,
  faUsers,
  faHistory,
  faCheckDouble,
  faCheckSquare,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";

interface NavbarManagerProps {
  openSideBar: boolean;
  closeSidebar: () => void;
}

export default function NavbarManager({
  openSideBar,
  closeSidebar,
}: NavbarManagerProps) {
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
            <div className="">
              <ul>
                <Link href={"/manager/dashboard"}>
                  <li
                    className={`p-4 hover:bg-sky-800 flex items-center ${
                      pathname === "/manager/dashboard" ? "bg-sky-800" : ""
                    }`}
                  >
                    <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
                    Dashboard
                  </li>
                </Link>
                <Link href={"/manager/acc-sewa"}>
                  <li
                    className={`p-4 hover:bg-sky-800 flex items-center ${
                      pathname === "/manager/acc-sewa" ? "bg-sky-800" : ""
                    }`}
                  >
                    <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                    Terima Sewa
                  </li>
                </Link>
                <Link href={"/manager/tambang"}>
                  <li
                    className={`p-4 hover:bg-sky-800 flex items-center ${
                      pathname === "/manager/tambang" ? "bg-sky-800" : ""
                    }`}
                  >
                    <FontAwesomeIcon icon={faIndustry} className="mr-2" />
                    Tambang
                  </li>
                </Link>
                <Link href={"/manager/kendaraan"}>
                  <li
                    className={`p-4 hover:bg-sky-800 flex items-center ${
                      pathname === "/manager/kendaraan" ? "bg-sky-800" : ""
                    }`}
                  >
                    <FontAwesomeIcon icon={faCar} className="mr-2" />
                    Kendaraan
                  </li>
                </Link>
                <Link href={"/manager/history"}>
                  <li
                    className={`p-4 hover:bg-sky-800 flex items-center ${
                      pathname === "/manager/history" ? "bg-sky-800" : ""
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
