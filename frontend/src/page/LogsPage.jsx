import { useEffect, useState } from "react";
import { getLogs } from "../api";

export default function LogsPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    getLogs().then(setLogs);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Recent Logs</h2>
      <table className="table-auto border-collapse w-full bg-white shadow rounded-xl">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Created</th>
            <th className="border p-2">Country</th>
            <th className="border p-2">Drone ID</th>
            <th className="border p-2">Drone Name</th>
            <th className="border p-2">Celsius</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.created} className="text-center hover:bg-gray-50">
              <td className="border p-2">{new Date(log.created).toLocaleString()}</td>
              <td className="border p-2">{log.country}</td>
              <td className="border p-2">{log.drone_id}</td>
              <td className="border p-2">{log.drone_name}</td>
              <td className="border p-2">{log.celsius}°C</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
