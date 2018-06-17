const fs = require('fs');

let transporter;

fs.readFile('./password.txt', 'utf8', (err, data) => {
  if (err) throw err;
  transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bfrserviceworker1@gmail.com',
    pass: data,
  },
});
});
const nodemailer = require('nodemailer');

var mailOptions = {
  from: 'bfrserviceworker1@gmail.com', // sender address
  to: ['lordalch@gmail.com', 'support@licensetocarry.com'], // list of receivers
  subject: 'LTC.com Outage Notice', // Subject line
  html: `<p>licensetocarry.com was not reachable at ${new Date()}. Check http://167.99.3.101/ for current status. </p>`, // plain text body
};

function sendAlert() {
  transporter.sendMail(mailOptions, (err) => {
    if (err) { console.log(err); } else { console.log('Sent Alert Email(s)!'); }
  });
}

module.exports = sendAlert;
