var express = require('express');

var app = express();

app.get('/', (req, res, next) => {
  res.send('Hello World');
});

app.listen(3000);