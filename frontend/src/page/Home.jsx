import React from 'react';
import mountainImage from '../assets/mountainWallPaper01.jpg'
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

const PrimaryButton = ({ children }) => (
  <button 
    className="w-[200px] px-6 py-3 bg-white text-gray-900 font-bold rounded-lg 
               hover:bg-gray-200 transition duration-300 shadow-xl cursor-pointer
               transform hover:scale-[1.05] active:scale-[0.98]" 
  >
    {children}
  </button>
);

export default function HomePage() {
  return (
    <motion.div
      className=""
      initial={{ opacity: 0, y: 0 }}   
      animate={{ opacity: 1, y: 0 }}    
      exit={{ opacity: 0, y: -20 }}    
      transition={{ duration: 2 }}
    >
    
    <div className="flex flex-col justify-center bg-gray-900 text-white font-sans">     
      <div
        className="relative pt-12 pb-24 md:pt-24 md:pb-32 overflow-hidden h-[90vh]"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(18, 18, 18, 0.7), rgba(18, 18, 18, 0.9)), url(${mountainImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundBlendMode: 'multiply'
        }}
      >
        <div className="container mx-auto px-6 relative z-10">
          
          <div className="max-w-3xl pt-16">
            <h2 className="text-6xl md:text-[60px] font-black uppercase mb-4 leading-tight tracking-tighter">
              Walcome to my website 
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-xl">
              Hello my name is Peeranat Chongrakdee,I am studying for a Faculty of Engineering, King Mongkut's Institute of Technology Ladkrabang
              Bachelor of Engineering in Internet of Things and Information Technology,And this is a project for my Web Development course.
            </p>
            
            <a href="/config"><PrimaryButton>My Drone</PrimaryButton></a>
          </div>

        </div>
      </div>
      <div className='flex items-center justify-between h-[100px] px-10'>
        <div className='text-xl font-bold'>Thank you for using.</div>
        <a href="https://github.com/Getttxd/AssignmentWebDev.git" target='_blank' className='h'><FaGithub className='h-[41px] w-[41px] hover:text-gray-400'/></a>
      </div>
      
    </div>
    </motion.div>
    
  );
}