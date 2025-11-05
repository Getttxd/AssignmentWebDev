const API_URL = import.meta.env.VITE_API_URL;
const DRONE_ID = import.meta.env.VITE_DRONE_ID;

export async function getConfig() {
  const res = await fetch(`${API_URL}configs/${DRONE_ID}`);
  return res.json();
}

export async function getLogs(page = 1) {
  const res = await fetch(`${API_URL}logs/${DRONE_ID}/${page}`);
  const data = await res.json();

  if (Array.isArray(data)) {
    return { logs: data };
  }

  return data;
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