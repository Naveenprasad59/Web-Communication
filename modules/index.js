module.exports = function (app) {
  switch (process.env.EXAMPLE) {
    case 'SHORT_POLLING':
      require('./shortPolling')(app);
      break;

    case 'LONG_POLLING':
      require('./longPolling')(app);
      break;

    default:
      require('./shortPolling')(app);
      break;
  }
};
