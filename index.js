var express = require('express'),
  bodyParser = require('body-parser'),
  fs = require('fs'),
  app = express(),
  path = require('path')
  port = process.env.PORT || 4000;
 
var dest = path.join(__dirname, 'data')
if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest)
}

app.use(bodyParser.json({limit: '5mb'}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'ok' });
});

app.post('/save', (req, res) => {
    var {name, image} = req.body
    var data = image.split(",")[1]
    var buffer = Buffer.from(data, 'base64')
    var dest = path.join(__dirname, 'data', name)
    fs.writeFileSync(dest, buffer)
    res.status(200).json({ msg: `Saved as ${name}` });
    console.log(`${name} saved`)
})

app.listen(port, () => {
  console.log('Server started on: ' + port);
});