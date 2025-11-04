import { useState } from 'react'
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './component/Navbar'
import ConfigPage from './page/ConfigPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ConfigPage />} />
        <Route path="/form" element={<TemperatureForm />} />
        <Route path="/logs" element={<LogsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
