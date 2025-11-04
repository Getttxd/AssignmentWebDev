export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">Drone Dashboard</h1>
      <div className="space-x-4">
        <a href="/" className="hover:underline">Config</a>
        <a href="/form" className="hover:underline">Submit</a>
        <a href="/logs" className="hover:underline">Logs</a>
      </div>
    </nav>
  );
}
