const { Worker } = require('worker_threads');
const util = require('minecraft-server-util');
const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.static('../frontend/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 8080; // Our default port
const MCPORT = 25565;

if (!fs.existsSync('./ips.txt')) {
  fs.writeFileSync('./ips.txt', '');
}

const text = fs.readFileSync('./ips.txt', 'utf-8');
let iparray = text.split('\n');
iparray.pop();
// console.log(iparray);

// The worker that grabs ips
const worker = new Worker('./getips', {workerData: {PORT: MCPORT}});
worker.on('message', async (ip) => {
  iparray.push(ip);
});

app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname + "/../frontend/dist/index.html"));
});

// Get the ips
app.get('/api/getIps', async (req, res) => {
  res.status(200).json(
      iparray[Math.floor(Math.random() * iparray.length)]
    );
});

// Get the port
app.get('/api/port', async (req, res) => {
  res.status(200).send(MCPORT.toString());
});

// Get the server info
app.get('/api/getServerInfo', async (req, res) => {
  // console.log(JSON.stringify(req.body, null, 2));
  // res.send(req.query);

  if (req.query.ip) {
    const options = {
      timeout: 1000 * 5,
      enableSRV: true,
    };
    
    util.status(req.query.ip, MCPORT, options)
      .then((resp) => {
        res.status(200).json(resp);
      })
      .catch((e) => {
        res.sendStatus(500);
        console.log(e);
      });
  }
});

// Listen to a port
app.listen(PORT, () => {
  console.log(`Webserver to port ${8080}`);
});
