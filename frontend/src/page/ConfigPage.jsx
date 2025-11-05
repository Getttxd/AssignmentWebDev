import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getConfig } from "../api";
import mountainImage from '../assets/mountainWallPaper01.jpg'
import { LuLoaderCircle } from "react-icons/lu";
import { GiDeliveryDrone } from "react-icons/gi";
import { CiLight } from "react-icons/ci";
import { BiWorld } from "react-icons/bi";

export default function ConfigPage() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    getConfig().then(setConfig);
  }, []);

  if (!config) return (
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
        <p className="p-6 text-[70px] text-white font-bold flex flex-col justify-center items-center mt-[-82px]">
          <div ><LuLoaderCircle className="animate-spin" /></div>
          <div className="animate-pulse text-[30px]">Loading</div>
        </p>
      </div>
    </motion.div>

  );

  return (


    <div
      className="h-screen flex justify-center items-center "
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(18, 18, 18, 0.7), rgba(18, 18, 18, 0.9)), url(${mountainImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundBlendMode: 'multiply'
      }}
    >
      <motion.div
        className=""
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mt-[-140px] flex flex-col items-center">
          <h2 className="sm:text-[55px] text-[40px] text-white font-bold mb-[50px]">Drone Configuration</h2>
          <div className="grid grid-cols-2 sm:flex sm:flex-row space-x-2 space-y-2">

            <div className="bg-gray-700/50 text-white p-4 rounded-xl max-w-md  w-[200px] h-[200px] shadow-xl hover:w-[210px] hover:h-[210px] hover:bg-gray-800/50 transition duration-300">
              <div className="border-[1px] rounded-[8px] h-[60px] w-[60px] flex justify-center items-center"><GiDeliveryDrone className="h-[50px] w-[50px]" /> </div>
              <div className="text-[22px] font-bold tracking-tighter mt-4">Drone ID :</div>
              <p className="text-[22px] font-semibold">{config.drone_id}</p>
            </div>
            <div className="bg-gray-700/50 text-white p-4 rounded-xl max-w-md  w-[200px] h-[200px] shadow-xl hover:w-[210px] hover:h-[210px] hover:bg-gray-800/50 transition duration-300">
              <div className="border-[1px] rounded-[8px] h-[60px] w-[60px] flex justify-center items-center"><GiDeliveryDrone className="h-[50px] w-[50px]" /> </div>
              <div className="text-[22px] font-bold tracking-tighter mt-4">drone Name :</div>
              <p className="text-[22px] font-semibold">{config.drone_name}</p>
            </div>
            <div className="bg-gray-700/50 text-white p-4 rounded-xl max-w-md  w-[200px] h-[200px] shadow-xl hover:w-[210px] hover:h-[210px] hover:bg-gray-800/50 transition duration-300">
              <div className="border-[1px] rounded-[8px] h-[60px] w-[60px] flex justify-center items-center"><CiLight className="h-[50px] w-[50px]" /> </div>
              <div className="text-[22px] font-bold tracking-tighter mt-4">Light :</div>
              <p className="text-[22px] font-semibold">{config.light}</p>
            </div>
            <div className="bg-gray-700/50 text-white p-4 rounded-xl max-w-md  w-[200px] h-[200px] shadow-xl hover:w-[210px] hover:h-[210px] hover:bg-gray-800/50 transition duration-300">
              <div className="border-[1px] rounded-[8px] h-[60px] w-[60px] flex justify-center items-center"><BiWorld className="h-[50px] w-[50px]" /> </div>
              <div className="text-[22px] font-bold tracking-tighter mt-4">Country :</div>
              <p className="text-[22px] font-semibold">{config.country}</p>
            </div>

          </div>

        </div>
      </motion.div>
    </div>

  );
}
