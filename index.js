require('dotenv').config();
const bot = require('./src/bot');
const addSuperPowers = require('./src/commands');

// add commands to bot
addSuperPowers(bot);

bot.on('start', function() {
  console.log('bot started');
});
