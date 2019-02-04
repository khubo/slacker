const { channel, botId, projectDir } = require('../config');
const { promisify } = require('util');
const nodeCmd = require('node-cmd');

const cmd = promisify(nodeCmd.get, { multiArgs: true, context: nodeCmd });

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
    case 'deploy':
      deployBranch(bot, words[1]);
    case 'update':
      updateBranch(bot);
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

/*
 * deploy a particular branch of the project
 */
const deployBranch = async (bot, branch = null) => {
  // if branch is not specified
  if (branch === null) {
    bot.postMessageToChannel(channel, 'undefined branch!');
    return;
  }

  let result = await cmd(`
    cd ${projectDir}&&
    git fetch origin ${branch}&&
    git checkout origin/${branch}
    yarn install
  `);
  console.log(result);
  bot.postMessageToChannel(channel, 'branch successfully deployed');
};
module.exports = addSuperPowers;

/*
 * update the current branch
 */
const udpateBranch = async bot => {
  let result = await cmd(`
    cd ${projectDir}&&
    git pull &&
    yarn install
  `);
  console.log(result);
  bot.postMessageToChannel(channel, 'branch updated');
};
