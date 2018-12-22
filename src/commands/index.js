const { channel, botId } = require('../config');

const addSuperPowers = bot => {
  bot.on('message', ({ type, text }) => {
    // Ima listen to only my message!
    if (type === 'message' && text.includes(botId)) {
      let msg = text.replace(botId, '');
      console.log(msg);
    }
  });
};

module.exports = addSuperPowers;
