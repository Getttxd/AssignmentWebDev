import { useEffect, useState } from "react";
import { getConfig, postLog } from "../api";

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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Temperature Log Form</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded-xl max-w-md">
        <input
          type="number"
          step="0.1"
          placeholder="Temperature (°C)"
          value={celsius}
          onChange={(e) => setCelsius(e.target.value)}
          className="border w-full p-2 rounded mb-3"
          required
        />
        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
          Submit
        </button>
        {message && <p className="text-green-600 mt-2">{message}</p>}
      </form>
    </div>
  );
}
