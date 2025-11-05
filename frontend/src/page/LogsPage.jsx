import { useEffect, useState } from "react";
import { getLogs } from "../api";
import { LuLoaderCircle } from "react-icons/lu";
import { motion } from "framer-motion";
import { FaHistory } from "react-icons/fa";

const PER_PAGE = 12;

export default function LogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(undefined);
  const [hasMore, setHasMore] = useState(false);

  const fetchLogs = async (page) => {
    setLoading(true);
    try {
      const data = await getLogs(page); 
      const pageLogs = data.logs || [];

      setLogs(pageLogs);

      // ถ้ามี totalPages ใน response ให้เซ็ต
      if (typeof data.totalPages === "number") {
        setTotalPages(data.totalPages);
        setHasMore(page < data.totalPages);
      } else {
        setTotalPages(undefined);
        setHasMore(pageLogs.length === PER_PAGE);
      }
    } catch (err) {
      console.error("Failed to fetch logs:", err);
      setLogs([]);
      setTotalPages(undefined);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(currentPage);
  }, [currentPage]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
        <LuLoaderCircle className="text-5xl animate-spin mb-4" />
        <p className="text-lg font-semibold">Loading logs...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="p-6 bg-gray-800 min-h-screen text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <h2 className="text-4xl font-bold mb-4 flex justify-center items-center"><FaHistory className="mr-4" />Logs History (ประวัติการบันทึกอุณหภูมิ)</h2>

      <div className="overflow-x-auto mt-7">
        <table className="table-auto border-collapse w-full bg-white text-gray-800 shadow overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2 text-center">#</th>
              <th className="border p-2">Created</th>
              <th className="border p-2">Country</th>
              <th className="border p-2">Drone ID</th>
              <th className="border p-2">Drone Name</th>
              <th className="border p-2">Celsius</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">
                  No logs found.
                </td>
              </tr>
            ) : (
              logs.map((log, index) => (
                <tr key={log.created + "-" + index} className="text-center hover:bg-gray-50 transition">
                  <td className="border p-2 font-semibold">
                    {(currentPage - 1) * PER_PAGE + index + 1}
                  </td>
                  <td className="border p-2">{new Date(log.created).toLocaleString()}</td>
                  <td className="border p-2">{log.country}</td>
                  <td className="border p-2">{log.drone_id}</td>
                  <td className="border p-2">{log.drone_name}</td>
                  <td className="border p-2">{log.celsius}°C</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6 space-x-2 items-center">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md border border-gray-400 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700 hover:text-white cursor-pointer"
          }`}
        >
          Prev
        </button>

        {typeof totalPages === "number" ? (
          [...Array(totalPages)].map((_, i) => {
            const p = i + 1;
            return (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`px-3 py-1 rounded-md border border-gray-400 transition ${
                  currentPage === p ? "bg-white text-gray-900 font-bold" : "hover:bg-gray-700 hover:text-white"
                }`}
              >
                {p}
              </button>
            );
          })
        ) : (
          <div className="text-sm text-gray-300 px-3 py-1 border border-gray-700 rounded">
            Page {currentPage}
          </div>
        )}

        <button
          onClick={() => {
            if (!hasMore) return;
            setCurrentPage((p) => p + 1);
          }}
          disabled={!hasMore}
          className={`px-3 py-1 rounded-md border border-gray-400 ${
            !hasMore ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700 hover:text-white cursor-pointer"
          }`}
        >
          Next
        </button>
      </div>
    </motion.div>
  );
}
