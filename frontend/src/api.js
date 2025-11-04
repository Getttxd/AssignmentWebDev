const API_URL = import.meta.env.VITE_API_URL;
const DRONE_ID = import.meta.env.VITE_DRONE_ID;

export async function getConfig() {
  const res = await fetch(`${API_URL}configs/${DRONE_ID}`);
  return res.json();
}

export async function getLogs() {
  const res = await fetch(`${API_URL}logs/${DRONE_ID}`);
  const data = await res.json();
  return data.slice(0, 12); // limit 12 logs
}

export async function postLog({ drone_name, country, celsius }) {
  const body = {
    drone_id: Number(DRONE_ID),
    drone_name,
    country,
    celsius: Number(celsius)
  };

  const res = await fetch(`${API_URL}logs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return res.json();
}