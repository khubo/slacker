const SlackBot = require('slackbots');
const { token } = require('./config');
const bot = new SlackBot({
  token,
  name: 'mangal b0t'
});

module.exports = bot;
