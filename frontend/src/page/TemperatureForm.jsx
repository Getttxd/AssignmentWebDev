import { useEffect, useState } from "react";
import { getConfig, postLog } from "../api";
import { motion } from "framer-motion";
import { FaTemperatureHigh } from "react-icons/fa";
import mountainImage from '../assets/mountainWallPaper01.jpg'

export default function TemperatureForm() {
  const [config, setConfig] = useState(null);
  const [celsius, setCelsius] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getConfig().then(setConfig);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!config) return;
    const res = await postLog({ 
      drone_name: config.drone_name, 
      country: config.country, 
      celsius 
    });
    setMessage("✅ Log saved!");
    setCelsius("");
  };

  return (
    <motion.div
          className=""
          initial={{ opacity: 0, y: 0 }}   
          animate={{ opacity: 1, y: 0 }}    
          exit={{ opacity: 0, y: -20 }}    
          transition={{ duration: 0.5 }}
        >
    <div
          className="h-screen flex justify-center items-center"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(18, 18, 18, 0.7), rgba(18, 18, 18, 0.9)), url(${mountainImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundBlendMode: 'multiply'
          }}
        >
    <div className="p-6 h-screen flex flex-col items-center">
      <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded-xl h-auto w-[80vw] sm:w-[600px] flex flex-col items-center mt-[100px]">
      <div className="text-2xl font-bold mb-4 text-black text-[40px] flex items-center ">Temperature Log Form <FaTemperatureHigh className="ml-4"/></div>
      <div className="mt-[35px] text-2xl">การบันทึกอุณหภูมิ</div>
        <input
          type="number"
          step="0.1"
          placeholder="Temperature (°C)"
          value={celsius}
          onChange={(e) => setCelsius(e.target.value)}
          className="border w-full p-2 rounded mb-3 mt-[20px]"
          required
        />
        <button type="submit" className="bg-blue-900 text-white w-full py-2 rounded hover:bg-blue-700 cursor-pointer">
          Submit
        </button>
        {message && <p className="text-green-600 mt-2">{message}</p>}
      </form>
      </div>
    </div>
    </div>
    </motion.div>
  );
}
