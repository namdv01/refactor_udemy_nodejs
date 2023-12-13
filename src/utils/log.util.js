const winston = require('winston');
const optionsLog = {
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'src/logs/info.log',
      level: 'info',
    }),
  ],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.timestamp(),
    winston.format.prettyPrint(),
    winston.format.colorize()
  ),
}

module.exports = {
  optionsLog
}