
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import './App.css'
import Navbar from './component/Navbar'
import ConfigPage from './page/ConfigPage';
import TemperatureForm from './page/TemperatureForm'
import LogsPage from './page/LogsPage'
import Home from './page/Home';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
    <div className='bg-gray-900'>
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/config" element={<ConfigPage/>} />
        <Route path="/form" element={<TemperatureForm />} />
        <Route path="/logs" element={<LogsPage />} />
      </Routes>
    </AnimatePresence>
    </div>
    </BrowserRouter>
  )
}

export default App
