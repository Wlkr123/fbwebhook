const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.post('webhook/', function (req, res) {

    const{body} = req
    console.log({body})

  res.send('Hello World');
});

app.listen(3000,()=>{
    console.log('listening on port 3000')
});
