const path = require('path');
const express = require('express');

module.exports = function (app) {
  app.use(express.static(path.join(__dirname, '../frontend/shortPolling')));

  app.get('/polling', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/shortPolling/index.html'));
  });

  let shortPollingData = 'Initial Data';

  app.get('/getData', (req, res) => {
    return res.json({ message: shortPollingData });
  });

  app.post('/updateData', (req, res) => {
    shortPollingData = req.body.userInput;
    return res.json({ update: true });
  });
};
