const fs = require('fs');

let password;

fs.readFile('password.txt', (err, data) => {
  if (err) throw err;
  password = data;
});
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bfrserviceworker1@gmail.com',
    pass: password,
  },
});

const mailOptions = {
  from: 'bfrserviceworker1@gmail.com', // sender address
  to: ['lordalch@gmail.com', 'chuck@blackforestreservellc.com'], // list of receivers
  subject: 'LTC.com Outage Notice', // Subject line
  html: `<p>licensetocarry.com was not reachable at ${new Date()}.</p>`, // plain text body
};

function sendAlert() {
  transporter.sendMail(mailOptions, (err) => {
    if (err) { console.log(err); } else { console.log('Sent Alert Email(s)!'); }
  });
}

module.exports = sendAlert;
