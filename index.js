require('dotenv').config();
const {App} = require('@slack/bolt');

const quotes = require('./quotes.json');

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

(async () => {
  const server = await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!', server.address());
})();

app.error((error) => {
  const message = `DOES NOT COMPUTE: ${error.toString()}`;
  console.error(message);
});

app.event('message', async (event) => {
  const conversation = event.context.conversation !== undefined ? event.context.conversation : {channel: {}};
  let message = event.message;
  if (!message.text) { return }
  event.say(`${quotes.floyd[Math.floor(Math.random() * quotes.floyd.length)]}`);
});
