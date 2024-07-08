const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/webhook', (req, res) => {
  // Handle webhook data here
  console.log(req.body);
  res.send('869369151142601');
});

app.post('/webhook', (req, res) => {
  // Handle webhook data here
  console.log(req.body);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
