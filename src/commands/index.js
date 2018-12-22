const { channel } = require('../config');

const addSuperPowers = bot => {
  bot.on('message', (message, details) => {
    console.log(message);
    console.log(details);
  });
};

module.exports = addSuperPowers;
