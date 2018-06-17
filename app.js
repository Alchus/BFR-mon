const controller = require('./controller');
const express = require('express');

controller.start();
const app = express();

app.get('/', (req, res) => res.send(JSON.stringify(controller.status())));

app.listen(80, () => console.log('Server started.'));

