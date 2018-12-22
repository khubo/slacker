const { channel, botId } = require('../config');

/*
 * read bot messages and attach commands to them
 * @params bot {obj} - the slack bot object
 */
const addSuperPowers = bot => {
  bot.on('message', ({ type, text }) => {
    // Ima listen to only my message!
    if (type === 'message' && text.includes(botId)) {
      let msg = text.replace(botId, '');
      let words = msg
        .split(' ')
        .map(m => m.trim())
        .filter(m => m);
      handleMessage(bot, words);
    }
  });
};

/* handle message split as array
 * @params bot {obj} - the slack bot object
 * @params words {[]string} - message split into strings
 */
const handleMessage = (bot, words) => {
  let action = words[0];
  switch (action) {
    case 'hi':
    case 'hello':
      sayHello(bot);
      break;
    default:
      what(bot);
  }
};

/*
 * say hello
 */
const sayHello = bot => {
  bot.postMessageToChannel(channel, 'hola');
};

/*
 * what are you talking about?
 */
const what = bot => {
  bot.postMessageToChannel(channel, 'sorry I dont understand');
};

module.exports = addSuperPowers;
