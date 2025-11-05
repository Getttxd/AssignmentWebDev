import { IoHome } from "react-icons/io5";

export default function Navbar() {
  return (
    <nav className="px-10 h-[82px] flex justify-between items-center text-sm font-medium bg-gray-900">
        <a href="/" className="text-[35px] font-extrabold text-gray-300 tracking-wider flex items-center space-x-4 hover:text-white transition duration-200">
        <div><IoHome className="h-[35px] w-[35px]" /></div>
        <div>66010583</div>
        </a>
        <div className="hidden sm:flex space-x-[80px] text-gray-300 text-[20px]">
          <a href="/config" className="hover:text-white transition duration-200 ">View Config</a>
          <a href="/form" className="hover:text-white transition duration-200">Temperature Form</a>
          <a href="/logs" className="hover:text-white transition duration-200">View Logs</a>
        </div>
        
      </nav>
  );
}
