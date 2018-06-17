const request = require('request');



const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: 'bfrserviceworker1@gmail.com',
         pass: ''
     }
 });

 const mailOptions = {
  from: 'bfrserviceworker1@gmail.com', // sender address
  to: ['lordalch@gmail.com', 'chuck@blackforestreservellc.com'], // list of receivers
  subject: 'LTC.com Outage Notice', // Subject line
  html: `<p>licensetocarry.com was not reachable at ${new Date()}.</p>`// plain text body
};

function sendAlert(){
  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
 });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function monitor(){
  while (true){
    request('https://licensetocarry.com', (err, res, body) => {
   
    var pageloads =  res && JSON.stringify(res).includes("Applying for a Texas License to Carry (LTC) is a whole lot easier");
    console.log('Pageloads: ' + pageloads + ' at ' + new Date());
    if (err || !pageloads){
     sendAlert();
    }
  } 
  );
  await sleep (1 * 60 * 1000);
  }
}

monitor().then(
  text => {
      console.log(text); 
  },
  err => {
      // Deal with the fact the chain failed
  }
);