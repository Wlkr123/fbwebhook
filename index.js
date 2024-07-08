const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/webhook', (req, res) => {
  // Handle webhook data here
  console.log('test webhook')
  console.log(req.body);
  res.send(req.query['hub.challenge']);
});

app.post('/webhook', (req, res) => {
  // Handle webhook data here
  console.log('dasfdgsasdsa')
      const data = req.body;

  console.log({data});
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
