const express = require("express")
const TuyAPI = require('tuyapi');
const fs = require('fs')

const port = 8000;

console.log('Initializing webservice.')
const webservice = express()
let deviceState = {};

var humidifierid = process.env.HUMIDIFIER_ID
if (humidifierid == undefined) {
  console.log("You must set a humidifier id in the addon config")
  process.exit(22)
}

var humidifierKey = process.env.HUMIDIFIER_KEY
if (humidifierKey == undefined) {
  console.log("You must set a humidifier keu in the addon config")
  process.exit(22)
}

console.log(`Initializing TuyaApi for id ${humidifierid}.`);

const device = new TuyAPI({
  id: humidifierid,
  key: humidifierKey,
  issueRefreshOnConnect: true,
});

device.find().then(() => {
  device.connect();
  console.log(`Found device!`);
});

device.on('connected', () => {
  console.log('Connected to device!');
});

device.on('data', (data) => {
  console.log('Data from device:', data);
  deviceState = date;
});

webservice.get('/location-mode', async (req, res) => {
  console.log("GET /location-mode")
  res.json(deviceState)
})

webservice.post('/location-mode', express.json(), async (req, res) => {
  console.log("POST /location-mode", req.body)
  device.set({
    multiple: true,
    data: req.body
  });

  res.json(locationMode)
})

/**
 * Listen to defined port. Might be exposed differently depending on addon config.
 **/
console.log(`Starting listener on port ${port}.`)
webservice.listen(port, () => {
  console.log(`Home Assistant BW-SH2 Bridge is running on port ${port}.`);
})
