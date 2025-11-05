import express from 'express';
import 'dotenv/config';
import cors from 'cors'

const app = express();
const port = process.env.PORT;
const config_url = process.env.CONFIG_URL;
const log_url = process.env.LOG_URL;
const itemsPerPage = process.env.PERPAGE;
const api_token = process.env.API_TOKEN;

app.use(cors());
app.use(express.json());

async function getConfigs() {
  try{
    const response = await fetch(config_url);
    const data = await response.json();
    return data;
  }catch (error) {
    console.error('Error fetching config:', error);
    return null;
  }
};

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/',(req, res) => {
  res.send('Hello, World!');
});

app.get('/configs/:droneId',async (req, res) => {
  const droneId = Number(req.params.droneId);
  const droneConfigs = await getConfigs();
  const droneConfig = droneConfigs.data.find((drone) => {return drone.drone_id === droneId});
  delete droneConfig.population;
  delete droneConfig.condition;
  res.send(droneConfig);
});

app.get('/status/:droneId',async (req, res) => {
  const droneId = Number(req.params.droneId);
  const droneConfigs = await getConfigs();
  const droneConfig = droneConfigs.data.find((drone) => {return drone.drone_id === droneId});
  const  myStatus = {
    condition: droneConfig.condition,
  }
  res.send(myStatus);
});

app.get('/logs',async (req, res) => {
  const getLogWithId = async () => {
    const response = await fetch(log_url);
    const data = await response.json()
    return data
  }
  const myLogs = await getLogWithId()
  res.send(myLogs);
});

app.get('/logs/:droneId',async (req, res) => {
  const droneId = Number(req.params.droneId);
  const getLogWithId = async () => {
    const response = await fetch(`${log_url}?filter=(drone_id="${droneId}")&perPage=${itemsPerPage}&sort=-created`);
    const data = await response.json()
    return data
  }
  const myLogs = await getLogWithId()
  const myLogsNew = myLogs.items.map((a) => {
    return {
      drone_id: a.drone_id,
      drone_name: a.drone_name,
      created: a.created,
      country: a.country,
      celsius: a.celsius
    }
  })
  res.send(myLogsNew);
});

app.get('/logs/:droneId/:page',async (req, res) => {
  const droneId = Number(req.params.droneId);
  const page = Number(req.params.page);
  const getLogWithId = async () => {
    const response = await fetch(`${log_url}?filter=(drone_id="${droneId}")&perPage=${itemsPerPage}&sort=-created&page=${page}`);
    const data = await response.json()
    return data
  }
  const myLogs = await getLogWithId()
  const myLogsNew = myLogs.items.map((a) => {
    return {
      drone_id: a.drone_id,
      drone_name: a.drone_name,
      created: a.created,
      country: a.country,
      celsius: a.celsius
    }
  })
  res.send(myLogsNew);
});

app.post('/logs', async (req, res) => {
  const { drone_id, drone_name, country, celsius } = req.body;
  try {
    const response = await fetch(`${log_url}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${api_token}`
      },
      body: JSON.stringify({
        drone_id,
        drone_name,
        country,
        celsius
      })
    });
    const data = await response.json();
    res.status(201).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to create log' });
  }
});
