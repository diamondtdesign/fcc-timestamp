// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/timestamp/', function(req, res) {
  let date = new Date();
  let unix = date.valueOf();
  let utc = date.toGMTString();
  res.json({ unix, utc });
});


app.get('/api/timestamp/:dateString', function(req, res) {
  let dateString = req.params.dateString;
  console.log(typeof dateString);
  
  const numberRegex = /^\d+$/g;
  const dateRegex = /^\d\d\d\d-\d\d-\d\d$/g;
  
  if (numberRegex.test(dateString)) {
    let num = Number(dateString);
    let date = new Date(num);
    let utc = date.toGMTString();
    let unix = date.valueOf();
    if (Number.isNaN(unix)) { res.json({ error: 'Invalid Date' }) }
    res.json({
      unix,
      utc
    });
    
  } else if (dateRegex.test(dateString)) {
    let date = new Date(dateString);
    let utc = date.toGMTString();
    let unix = date.valueOf();
    if (Number.isNaN(unix)) {
      res.json({ error: 'Invalid Date' });
    }
    let json = { unix, utc };
    res.json(json);
    
  } else if (dateString === '') {
    let date = new Date();
    let unix = date.valueOf();
    let utc = date.ToGMTString();
    res.json({ unix, utc });
    
  } else {
    res.json({ error: 'Invalid Date' });
  }
  
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
