import { useEffect, useState } from "react";
import { getConfig } from "../api";

export default function ConfigPage() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    getConfig().then(setConfig);
  }, []);

  if (!config) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Drone Configuration</h2>
      <div className="bg-white shadow p-4 rounded-xl max-w-md">
        <p><strong>Drone ID:</strong> {config.drone_id}</p>
        <p><strong>Drone Name:</strong> {config.drone_name}</p>
        <p><strong>Light:</strong> {config.light}</p>
        <p><strong>Country:</strong> {config.country}</p>
      </div>
    </div>
  );
}
