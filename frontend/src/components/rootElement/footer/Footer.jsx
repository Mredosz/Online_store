import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

export default function Footer() {
  return (
    <footer className="bg-navbar h-28">
      <div className="flex flex-col items-end pr-5 pt-3">
        <h2 className="pr-20">Contact</h2>
        <div className="flex justify-center items-center pt-2">
          <FaPhoneAlt className="mr-2" size={22} />
          <p>+48 567 586 568</p>
        </div>
        <div className="flex justify-center items-center pt-2">
          <IoIosMail size={26} className="mr-2" />
          <p>capy@store.com</p>
        </div>
      </div>
    </footer>
  );
}
