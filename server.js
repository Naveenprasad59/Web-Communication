const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/shortPolling', (req, res) => {
  res.sendFile(__dirname + '/frontend/index.html');
});

let data = 'Initial Data';

app.get('/getData', (req, res) => {
  return res.json({ message: data });
});

app.post('/updateData', (req, res) => {
  data = req.body.userInput;
  return res.json({ update: true });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
