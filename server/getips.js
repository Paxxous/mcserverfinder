/* eslint no-unused-vars: 0 */
const { parentPort, workerData } = require('worker_threads');
const fs = require('fs');
const util = require('minecraft-server-util');
const SPEED = 5;

// parentPort.postMessage("amongus");

// Now, we generate ips'
// So there's a range of 10.0.0.0 to 10.255.255.255 -- great stuff

function generateIp() {

  // first part
  let ip = '' +
    Math.floor(Math.random() * 256) + '.' +
    Math.floor(Math.random() * 256) + '.' +
    Math.floor(Math.random() * 256) + '.' +
    Math.floor(Math.random() * 256);

  // parentPort.postMessage(ip);
  return ip;
}

// Ping our server
const options = {
  timeout: 1000 * 5,
  enableSRV: true,
};

let timeOutCount = 0;
setInterval(() => {
  const ip = generateIp();
  util.status(ip, workerData.PORT, options)
    .then(() => {
      fs.appendFileSync('ips.txt', ip + '\n');
      parentPort.postMessage(ip);
      // console.log(`We've got one bois:\n${JSON.stringify(res, null, 2)}\nAt ip: ${ip}`);
    })
    .catch(() => timeOutCount += 1);

}, SPEED);
