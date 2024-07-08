const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const debug = require('debug');

const app = express();
const PORT = process.env.PORT || 3000;

const NGROK_URL = 'https://8ff6-59-153-112-82.ngrok-free.app';

const debugFacebook = debug('erxes-facebook:facebook');
const debugRequest = (debugInstance, req) =>
  debugInstance(`
        Receiving ${req.path} request from ${req.headers.origin}
        body: ${JSON.stringify(req.body || {})}
        queryParams: ${JSON.stringify(req.query)}
    `);

app.use(bodyParser.json());

app.use((req, _res, next) => {
  debugRequest(debugFacebook, req);

  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/webhook', (req, res) => {
  let VERIFY_TOKEN = 'your_verify_token';

  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

app.post('/webhook', async (req, res) => {
  console.log('Webhook POST request received');

  const data = req.body;
  if (data.object !== 'page') {
    return;
  }

  try {
    const response = await axios({
      method: 'POST',
      url: `${NGROK_URL}/pl:facebook/facebook/receive`,
      headers: {
        ...req.headers,
      },
      data,
      params: req.query,
    });

    console.log('Forwarded to Ngrok:', response.data);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error forwarding to Ngrok:', error);
    res.sendStatus(500);
  }
});

app.use((error, _req, res, _next) => {
  console.error(error.stack);
  res.status(500).send(error.message);
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
