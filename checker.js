const request = require('request');

const async = require('async');

// Delay of 60 seconds
const delay = 60 * 1000;

function monitor(callback) {
  async.forever((next) => {
    request('https://licensetocarry.com', (err, res) => {
      const pageloads = res && JSON.stringify(res).includes('Applying for a Texas License to Carry (LTC) is a whole lot easier');
      if (err || !pageloads) {
        callback(false);
      } else {
        callback(true);
      }
      setTimeout(() => {
        next();
      }, delay);
    });
  });
}
module.exports = monitor;
