const sendAlerts = require('./alerter');
const checker = require('./checker');

const FAILURE_LIMIT = 2;

let consecutiveFailedRequests = 0;
let consecutiveGoodRequests = 0;
let lastChecked = '';
let lastFailure = 'unknown';
let lastSuccess = 'unknown';

function controller(requestResult) {
  lastChecked = new Date();
  if (requestResult) {
    consecutiveFailedRequests = 0;
    consecutiveGoodRequests += 1;
    lastSuccess = new Date();
    console.log(`Sucessful Request at ${lastSuccess}`);
  } else {
    consecutiveGoodRequests = 0;
    consecutiveFailedRequests += 1;
    lastFailure = new Date();
    if (consecutiveFailedRequests === FAILURE_LIMIT) sendAlerts();
    console.log(`Failed Request at ${lastFailure}`);
  }
}

function main() {
  checker(controller);
}

function status() {
  return {
    consecutiveFailedRequests,
    consecutiveGoodRequests,
    lastChecked: lastChecked.toString(),
    lastFailure: lastFailure.toString(),
    lastSuccess: lastSuccess.toString(),
  };
}
module.exports.start = main;
module.exports.status = status;
