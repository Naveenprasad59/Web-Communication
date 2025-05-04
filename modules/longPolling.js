const path = require('path');
const express = require('express');

module.exports = function (app) {
  app.use(express.static(path.join(__dirname, '../frontend/longPolling')));

  app.get('/polling', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/longPolling/index.html'));
  });

  let longPollingData = 'Initial Data';
  const connections = [];

  app.get('/subscribe', (req, res) => {
    if (req.query.data !== longPollingData) {
      return res.status(200).json({ message: longPollingData });
    }
    connections.push(res);
    // return res.json({ message: longPollingData });
  });

  app.post('/updateData', (req, res) => {
    longPollingData = req.body.userInput;
    connections.forEach((connection) => {
      connection.status(200).json({ message: longPollingData });
    });
    connections.length = 0;
    res.send('Update sent to all clients');
  });
};
